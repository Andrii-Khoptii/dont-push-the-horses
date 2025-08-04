<script setup lang="ts">
import { UICard } from '@ui';
import GameHorseListTable from './table/GameHorseListTable.vue';
</script>

<template>
  <UICard class="w-full" :padding="false">
    <template #header>
      Horse List (1-20)
    </template>
    <GameHorseListTable />
  </UICard>
</template>

<style scoped>

</style>
