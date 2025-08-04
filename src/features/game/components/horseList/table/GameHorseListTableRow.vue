<script setup>
import { UITableRow, UITableTd } from '@ui';

defineProps({
  row: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <UITableRow>
    <UITableTd>
      {{ row.id }}
    </UITableTd>
    <UITableTd>
      {{ row.name }}
    </UITableTd>
    <UITableTd align="center">
      {{ row.condition }}
    </UITableTd>
    <UITableTd align="right">
      <span :style="`color: ${row.color.value};`">
        {{ row.color.name }}
      </span>
    </UITableTd>
  </UITableRow>
</template>

<style scoped>

</style>
