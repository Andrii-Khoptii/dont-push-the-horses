<script setup>
import { UIButton, UITableRow, UITableTd } from '@ui';
import { DEFAULT_BET } from '@utils/constants';
import { secondsToHHMMSS } from '@utils/helpers';
import { computed } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
  row: {
    type: Object,
    required: true,
  },
  program: {
    type: Object,
    required: true,
  },
});

const store = useStore();

const hideBets = computed(() => {
  if (props.program.raceStarted || props.program.horses.some(({ bet }) => bet) || store.state.player.balance < DEFAULT_BET) {
    return true;
  }
  return false;
});

const betStatus = computed(() => {
  if (props.program.raceFinished && props.row.bet) {
    return props.row.place === 1 ? 'text-green-500' : 'text-red-500';
  }
  return '';
});

const placeStatus = computed(() => {
  if (props.program.raceStarted) {
    return props.row.place ? props.row.place : 'Running...';
  }

  return 'Waiting...';
});

const placeClasses = computed(() => {
  if (props.row.place === 1) {
    return 'bg-yellow-400';
  }

  if (props.row.place === 2) {
    return 'bg-gray-300';
  }

  if (props.row.place === 3) {
    return 'bg-amber-700';
  }

  return '';
});

function placeBet() {
  const data = {
    bet: DEFAULT_BET,
    lap: props.program.lap,
    horseId: props.row.id,
  };

  store.dispatch('updateBalance', store.state.player.balance - data.bet);
  store.dispatch('horseBet', data);
}
</script>

<template>
  <UITableRow>
    <UITableTd class="h-20">
      <span :style="`color: ${row.color.value}`">{{ row.id }}</span>
    </UITableTd>
    <UITableTd class="h-20">
      <span :style="`color: ${row.color.value}`">{{ row.name }}</span>
    </UITableTd>
    <UITableTd class="h-20" align="center">
      {{ row.coef }}
    </UITableTd>
    <UITableTd class="h-20" align="center">
      <UIButton v-if="!hideBets" variant="primary" size="sm" @click="placeBet">
        Bet
      </UIButton>
      <span v-if="row.bet" :class="betStatus">
        {{ row.bet }}
      </span>
    </UITableTd>
    <UITableTd align="center" class="w-[150px] h-20">
      {{ row.runningTime ? secondsToHHMMSS(row.runningTime) : '-' }}
    </UITableTd>
    <UITableTd align="center" class="w-[125px] h-20">
      <div v-if="[1, 2, 3].includes(row.place)" :class="placeClasses" class="w-8 h-8 mx-auto text-primary-foreground shadow-md rounded-full flex items-center justify-center text-sm font-bold">
        {{ row.place }}
      </div>
      <template v-else>
        {{ placeStatus }}
      </template>
    </UITableTd>
  </UITableRow>
</template>

<style scoped>

</style>
