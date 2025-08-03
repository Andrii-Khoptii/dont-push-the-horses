<script setup lang="ts">
import HeaderComponent from './components/HeaderComponent.vue';
</script>

<template>
  <div class="flex flex-col min-h-screen bg-background text-foreground">
    <HeaderComponent />
    <main class="min-h-[90vh]">
      <slot />
    </main>
  </div>
</template>

<style scoped>

</style>
