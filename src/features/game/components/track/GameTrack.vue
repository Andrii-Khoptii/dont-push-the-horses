<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import GameTrackLap from './GameTrackLap.vue';

const store = useStore();

const currentProgram = computed(() => {
  return store.state.gameStore.currentProgram;
});
</script>

<template>
  <div data-testid="track-container" class="relative bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg p-4 shadow-sm border">
    <template v-if="currentProgram">
      <div data-testid="track-program-info" class="bg-primary text-primary-foreground px-3 py-1 rounded mb-4">
        {{ currentProgram.lap }}st Lap {{ currentProgram.distance }}m
      </div>
      <div data-testid="track-laps-container" class="flex flex-col gap-4">
        <GameTrackLap v-for="horse in currentProgram.horses" :key="horse.id" :horse="horse" :distance="currentProgram.distance" />
      </div>
    </template>
  </div>
</template>

<style scoped>

</style>
