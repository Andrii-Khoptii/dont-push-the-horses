<script setup lang="ts">
import HeaderComponent from './components/HeaderComponent.vue';
</script>

<template>
  <body class="min-h-screen bg-background text-foreground">
    <HeaderComponent />
    <main class="min-h-[90vh]">
      <slot />
    </main>
  </body>
</template>

<style scoped>

</style>
