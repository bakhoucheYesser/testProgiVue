<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="flex items-center justify-between p-4 bg-slate-800">
      <div>
        <RouterLink :to="{ name: 'home' }" class="nav-link">Home</RouterLink>
      </div>
      <div class="flex space-x-4">
        <RouterLink :to="{ name: 'login' }" class="nav-link">Sign In</RouterLink>
        <RouterLink :to="{ name: 'settings' }" class="nav-link">Settings</RouterLink>
      </div>
    </nav>
  </header>
  <RouterView />
</template>


