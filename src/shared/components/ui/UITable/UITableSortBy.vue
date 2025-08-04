<script setup>
import { LucideArrowDown, LucideArrowUp } from 'lucide-vue-next';

const props = defineProps({
  active: { type: String },
});

const emit = defineEmits(['sortAsc', 'sortDesc']);

function sort(direction) {
  if (!props.active) {
    emit(direction);
    return;
  }

  direction === 'sort-asc' ? emit('sortDesc') : emit('sortAsc');
}
</script>

<template>
  <div class="flex items-center ml-0.5 cursor-pointer">
    <LucideArrowUp
      v-if="active === 'asc'"
      size="14"
      class="hover:text-primary transition-colors"
      :class="[active === 'asc' ? 'text-primary' : 'text-muted-foreground/70']"
      @click="sort('sort-asc')"
    />
    <LucideArrowDown
      v-if="active === 'desc' || !active"
      size="14"
      class="hover:text-primary transition-colors"
      :class="[active === 'desc' ? 'text-primary' : 'text-muted-foreground/70']"
      @click="sort('sort-desc')"
    />
  </div>
</template>

<style scoped>

</style>
