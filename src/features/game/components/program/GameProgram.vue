<script setup lang="ts">
import { UICard } from '@ui';
import { computed } from 'vue';
import { useStore } from 'vuex';
import GameProgramTable from './table/GameProgramTable.vue';

const store = useStore();

const programList = computed(() => {
  return store.state.gameStore.programList;
});
</script>

<template>
  <UICard class="w-full max-w-full" :padding="false">
    <template #header>
      Race Program
    </template>
    <div data-testid="program-grid" class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div v-for="program in programList" :key="program.lap" class="flex flex-col border">
        <div data-testid="program-info" class="bg-primary text-primary-foreground px-3 py-1">
          {{ program.lap }}st Lap {{ program.distance }}m
        </div>
        <div class="overflow-auto">
          <GameProgramTable :program="program" />
        </div>
      </div>
    </div>
  </UICard>
</template>

<style scoped>

</style>
