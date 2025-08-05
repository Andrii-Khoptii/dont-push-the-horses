<script setup>
import { computed } from 'vue';

const props = defineProps({
  align: {
    type: String,
    default: 'left',
  },
});

const textAlignment = computed(() => {
  if (props.align === 'center') {
    return 'text-center';
  }
  if (props.align === 'right') {
    return 'text-right';
  }
  return 'text-left';
});
</script>

<template>
  <td data-testid="ui-table-td" class="p-2 md:p-4 align-middle font-medium" :class="textAlignment">
    <slot />
  </td>
</template>

<style scoped>

</style>
