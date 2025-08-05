<script setup>
import UITableRow from './UITableRow.vue';
import UITableTh from './UITableTh.vue';

defineProps({
  tableData: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <table data-testid="ui-table" class="w-full text-sm">
    <thead class="border-b">
      <UITableRow>
        <UITableTh
          v-for="column in tableData.columns"
          :key="column.id"
          :column="column"
          :sort="tableData.sort"
          :sort-function="tableData.sortFunction"
        />
      </UITableRow>
    </thead>
    <tbody>
      <slot />
    </tbody>
  </table>
</template>

<style scoped>

</style>
