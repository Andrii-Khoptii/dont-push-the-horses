<script setup>
import { UIButton } from '@ui';
import { LOCAL_STORAGE_KEY, ROUTE_NAMES } from '@utils/constants';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();

function exit() {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  router.push({ name: ROUTE_NAMES.HOME });
}
</script>

<template>
  <header
    class="bg-gradient-racing text-primary-foreground"
  >
    <div class="container mx-auto px-4 flex h-16 items-center justify-between">
      <div class="flex items-center space-x-2">
        <span class="font-bold text-xl">Don't push the Horses</span>
      </div>
      <div v-if="store.state.player" class="flex gap-4 items-center">
        <span>{{ store.state.player.name }}'s balance: ${{ store.state.player.balance }}</span>

        <UIButton variant="foreground" size="sm" @click="exit">
          Exit
        </UIButton>
      </div>
    </div>
  </header>
</template>

<style scoped>

</style>
