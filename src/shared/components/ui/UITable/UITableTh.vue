<script setup>
import { computed } from 'vue';
import UITableSortBy from './UITableSortBy.vue';

const props = defineProps({
  column: {
    type: Object,
    required: true,
  },
  sort: {
    type: Object,
    required: false,
  },
  sortFunction: {
    type: Function,
    required: false,
  },
});

const textAlignment = computed(() => {
  if (props.column.align === 'center') {
    return 'justify-center';
  }
  if (props.column.align === 'right') {
    return 'justify-end';
  }
  return 'justify-start';
});

function fieldDirection(fieldName, sort) {
  return sort.find(item => item.field === fieldName)?.direction || '';
}
</script>

<template>
  <th class="h-12 p-2 md:p-4 text-left align-middle font-medium text-primary">
    <div class="flex gap-1 items-center" :class="textAlignment">
      {{ column.title }}

      <UITableSortBy
        v-if="column.isSort"
        :active="fieldDirection(column.id, sort)"
        @sort-asc="sortFunction(column.id, 'asc')"
        @sort-desc="sortFunction(column.id, 'desc')"
      />
    </div>
  </th>
</template>

<style scoped>

</style>
