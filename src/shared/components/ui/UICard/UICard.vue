<script setup lang="ts">
import { computed, ref } from 'vue';

defineProps({
  padding: {
    type: Boolean,
    default: true,
  },
});

const cardHeaderRef = ref();

const contentHeight = computed(() => {
  if (cardHeaderRef.value) {
    return `calc(100% - ${cardHeaderRef.value.offsetHeight}px)`;
  }
  return '100%';
});
</script>

<template>
  <div
    data-testid="ui-card"
    class="rounded-lg border text-card-foreground shadow-sm max-w-2xl mx-auto bg-background/95 backdrop-blur text-center"
  >
    <div v-if="$slots.header" ref="cardHeaderRef" data-testid="ui-card-header" class="p-6 bg-gradient-winner">
      <h3 data-testid="ui-card-header-title" class="text-2xl font-semibold leading-none tracking-tight text-accent-foreground">
        <slot name="header" />
      </h3>
    </div>
    <div data-testid="ui-card-content" class="overflow-auto" :class="[padding ? 'p-6 md:p-12' : '']" :style="`height: ${contentHeight};`">
      <slot />
    </div>
  </div>
</template>

<style scoped>

</style>
