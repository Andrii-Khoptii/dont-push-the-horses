<script setup>
import { UITable } from '@ui';
import { reactive, watch } from 'vue';
import { useStore } from 'vuex';
import GameHorseListTableRow from './GameHorseListTableRow.vue';

const TABLE_COLUMNS = [
  {
    id: 'number',
    title: '#',
    isSort: true,
  },
  {
    id: 'name',
    title: 'Name',
    isSort: true,
  },
  {
    id: 'condition',
    title: `Condition`,
    align: 'center',
    isSort: true,
  },
  {
    id: 'color',
    title: 'Color',
    align: 'right',
  },
];

const FIELD_MAPPINGS = {
  number: 'id',
  name: 'name',
  condition: 'condition',
};

const SORT_TYPES = {
  NUMERIC: 'numeric',
  ALPHABETIC: 'alphabetic',
};

const store = useStore();

function getSortType(field) {
  return field === 'name' ? SORT_TYPES.ALPHABETIC : SORT_TYPES.NUMERIC;
}

function getComparableValue(item, field, sortType) {
  const fieldKey = FIELD_MAPPINGS[field];
  const value = item[fieldKey];

  return sortType === SORT_TYPES.ALPHABETIC
    ? value.toLowerCase()
    : value;
}

function compareValues(valueA, valueB, direction, sortType) {
  let result;

  if (sortType === SORT_TYPES.ALPHABETIC) {
    result = valueA.localeCompare(valueB);
  }
  else {
    result = valueA - valueB;
  }

  return direction === 'desc' ? -result : result;
}

function sortItems(items, field, direction) {
  const sortType = getSortType(field);

  return [...items].sort((a, b) => {
    const valueA = getComparableValue(a, field, sortType);
    const valueB = getComparableValue(b, field, sortType);

    return compareValues(valueA, valueB, direction, sortType);
  });
}
const tableData = reactive({
  sort: [],
  values: [],
  columns: TABLE_COLUMNS,
  sortFunction: (field, direction) => {
    tableData.sort[0] = { field, direction };
    tableData.values = sortItems(tableData.values, field, direction);
  },
});

watch(() => store.state.gameStore.horseList, (newValue) => {
  if (newValue.length) {
    tableData.values = newValue;
    tableData.sortFunction('number', 'asc');
  }
}, { immediate: true });
</script>

<template>
  <UITable :table-data="tableData">
    <GameHorseListTableRow v-for="row in tableData.values" :key="row.id" :row="row" />
  </UITable>
</template>

<style scoped>
</style>
