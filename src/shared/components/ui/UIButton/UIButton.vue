<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String,
    default: 'md',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const variantClasses = {
  primary: 'bg-primary text-primary-foreground hover:enabled:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground hover:enabled:bg-secondary/80',
  foreground: 'bg-primary-foreground border text-primary hover:enabled:bg-primary-foreground/90',
  destructive: 'bg-destructive text-destructive-foreground hover:enabled:bg-destructive/90',
  outline: 'border border-input bg-transparent hover:enabled:bg-accent hover:enabled:text-accent-foreground',
  ghost: 'hover:enabled:bg-accent hover:enabled:text-accent-foreground',
  link: 'text-primary underline-offset-4 hover:enabled:underline',
};

const sizeClasses = {
  sm: 'h-9 rounded-md px-3',
  md: 'h-10 px-4 py-2',
  lg: 'h-11 rounded-md px-8',
  icon: 'h-10 w-10',
};

const baseClasses = 'inline-flex cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50';

const buttonClasses = computed(() => {
  const parts = [
    baseClasses,
    variantClasses[props.variant],
    sizeClasses[props.size],
  ];
  return parts.join(' ');
});
</script>

<template>
  <button
    data-testid="ui-button"
    :class="buttonClasses"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style>

</style>
