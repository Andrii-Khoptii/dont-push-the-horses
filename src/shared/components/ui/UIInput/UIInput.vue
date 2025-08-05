<script setup lang="ts">
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: '',
  },
});

const model = defineModel();
</script>

<template>
  <input
    v-model="model"
    :disabled="disabled"
    :placeholder="placeholder"
    type="text"
    class="flex w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-base placeholder:text-muted-foreground text-accent-foreground focus:border-accent-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
  >
</template>

<style scoped>

</style>
