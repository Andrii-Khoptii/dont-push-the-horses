<script setup>
import { UIButton } from '@ui';
import { TRACK_LINES } from '@utils/constants';
import { computed, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import GameHorseList from './components/horseList/GameHorseList.vue';
import GameProgram from './components/program/GameProgram.vue';
import GameTrack from './components/track/GameTrack.vue';

const trackHeight = computed(() => {
  const paddingY = 32;
  const header = 32 + 16;
  const trackline = 48;
  const tracklineGap = 16;

  return paddingY + header + (trackline * TRACK_LINES) + (tracklineGap * (TRACK_LINES - 1));
});

const store = useStore();

const currentProgram = computed(() => {
  return store.state.gameStore.currentProgram;
});

const isProgramRunning = computed(() => {
  return !!store.state.gameStore.raceInterval;
});

function handleRaceAction() {
  const action = isProgramRunning.value ? 'pauseRace' : 'startRace';

  return store.dispatch(action);
}

onBeforeMount(async () => {
  store.dispatch('fetchHorses');
  store.dispatch('generateProgramList');
});
</script>

<template>
  <div class="container h-full mx-auto px-4 py-6 flex flex-col gap-4">
    <div v-if="currentProgram" class="flex justify-end items-center gap-4">
      <UIButton
        variant="outline"
        :disabled="isProgramRunning"
        @click="store.dispatch('generateProgramList')"
      >
        Generate Program
      </UIButton>
      <UIButton @click="handleRaceAction">
        {{ isProgramRunning ? 'Pause' : "Start" }}
      </UIButton>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <GameHorseList class="max-w-full" :style="`max-height: ${trackHeight}px`" />
      <GameTrack class="lg:col-span-2" :style="`max-height: ${trackHeight}px`" />
    </div>
    <GameProgram />
  </div>
</template>

<style scoped>

</style>
