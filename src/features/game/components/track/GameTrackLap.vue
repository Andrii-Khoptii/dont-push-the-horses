<script setup lang="ts">
import HorseGif from '@shared/assets/images/horse-run.gif';
import HorsePng from '@shared/assets/images/horse.png';

import { computed } from 'vue';

const props = defineProps({
  horse: {
    type: Object,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
});

const horseImage = computed(() => {
  if (props.horse.currentDistance && !props.horse.place) {
    return HorseGif;
  }

  return HorsePng;
});

const distanceGone = computed(() => {
  return props.horse.currentDistance / props.distance * 100;
});

const placeClasses = computed(() => {
  if (props.horse.place === 1) {
    return 'bg-yellow-400';
  }

  if (props.horse.place === 2) {
    return 'bg-gray-300';
  }

  if (props.horse.place === 3) {
    return 'bg-amber-700';
  }

  return 'invisible';
});
</script>

<template>
  <div class="flex items-center h-12 border-b border-dashed border-muted-foreground/30">
    <div class="w-8 h-8 text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mr-4" :style="`background: ${horse.color.value}`">
      {{ horse.id }}
    </div>
    <div class="flex-1 relative rounded-full h-2" :style="`background: ${horse.color.value}`">
      <div
        class="absolute transform -translate-y-3/4 transition-all duration-100 z-10"
        :style="`left: ${Math.min(98, distanceGone)}%`"
      >
        <div class="w-6 h-6 text-lg">
          <img :src="horseImage" alt="horse">
        </div>
      </div>
      <div class="absolute -right-3 -translate-y-3/4">
        🏁
      </div>
    </div>
    <div :class="placeClasses" class="w-8 h-8 text-primary-foreground shadow-md rounded-full flex items-center justify-center text-sm font-bold ml-4">
      {{ horse.place }}
    </div>
  </div>
</template>

<style scoped>

</style>
