<script setup>
import { UITable } from '@ui';
import { computed } from 'vue';
import GameProgramTableRow from './GameProgramTableRow.vue';

const props = defineProps({
  program: {
    type: Object,
    required: true,
  },
});

const TABLE_COLUMNS = [
  {
    id: 'number',
    title: '#',
  },
  {
    id: 'name',
    title: 'Name',
  },
  {
    id: 'coef',
    title: 'Coef',
    align: 'center',
  },
  {
    id: 'bets',
    title: 'Bets',
    align: 'center',
  },
  {
    id: 'time',
    title: `Time`,
    align: 'center',
  },
  {
    id: 'place',
    title: `Place`,
    align: 'center',
  },
];

const tableData = computed(() => ({
  values: props.program.horses,
  columns: TABLE_COLUMNS,
}));
</script>

<template>
  <UITable :table-data="tableData">
    <GameProgramTableRow v-for="row in tableData.values" :key="row.id" :row="row" :program="program" />
  </UITable>
</template>

<style scoped>
</style>
