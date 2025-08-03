<script setup>
import { UIButton } from '@ui';
</script>

<template>
  <header
    class="bg-gradient-racing text-primary-foreground"
  >
    <div class="container mx-auto px-4 flex h-16 items-center justify-between">
      <div class="flex items-center space-x-2">
        <span class="font-bold text-xl">Don't push the Horses</span>
      </div>
      <div class="flex items-center space-x-2">
        <UIButton>Generate Program</UIButton>
        <UIButton variant="secondary">
          Start / Pause
        </UIButton>
      </div>
    </div>
  </header>
</template>

<style scoped>

</style>
