<script setup>
import { useLayout } from '@shared/composables/useLayout';

const currentLayout = useLayout();
</script>

<template>
  <component :is="currentLayout">
    <router-view />
  </component>
</template>
