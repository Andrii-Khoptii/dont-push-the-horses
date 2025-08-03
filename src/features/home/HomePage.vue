<script setup>
import { UIButton, UICard, UIInput } from '@ui';
import { ROUTE_NAMES } from '@utils/constants';
import { LucideInfo } from 'lucide-vue-next';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();

const playerName = ref('');

const store = useStore();

function startGame() {
  store.dispatch('initPlayer', playerName.value);
  console.log(store.state.player);
  router.push({ name: ROUTE_NAMES.GAME });
}
</script>

<template>
  <div class="flex flex-col w-full items-center gap-4 mt-32 text-center">
    <UICard>
      <h1 class="text-4xl font-bold text-primary mb-6 tracking-tight">
        Don't Push the Horses
      </h1>
      <p class="text-xl text-muted-foreground mb-8 max-w-lg mx-auto">
        Experience the thrill of the track with our horse racing simulation
      </p>
      <UIInput
        v-model="playerName"
        placeholder="Enter your name"
        class="w-sm mx-auto text-center text-lg"
      />
      <div class="flex space-x-2 w-sm mt-8 mx-auto">
        <UIButton class="w-full" variant="primary" :disabled="!playerName" @click="startGame()">
          Start
        </UIButton>
        <UIButton v-tooltip="'Coming soon'" class="w-full" variant="foreground" disabled>
          Settings
          <LucideInfo size="16" />
        </UIButton>
      </div>
    </UICard>
  </div>
</template>

<style scoped>

</style>
