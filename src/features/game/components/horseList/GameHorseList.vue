<script setup lang="ts">
import { UICard } from '@ui';
import GameHorseListTable from './table/GameHorseListTable.vue';
</script>

<template>
  <UICard data-testid="horse-list-card" class="w-full" :padding="false">
    <template #header>
      Horse List (1-20)
    </template>
    <div data-testid="horse-list-table-container">
      <GameHorseListTable />
    </div>
  </UICard>
</template>

<style scoped>

</style>
