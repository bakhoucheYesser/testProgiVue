<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth' // Adjust the path as needed
import { storeToRefs } from 'pinia'

// Access the auth store
const authStore = useAuthStore()
const { token, isAdmin } = storeToRefs(authStore)  // Use storeToRefs for reactivity

function signOut() {
  authStore.logout()  // Call the logout action from Pinia store
}
</script>

<template>
  <header>
    <nav class="flex items-center justify-between p-4 bg-slate-800">
      <div>
        <RouterLink :to="{ name: 'home' }" class="nav-link">Home</RouterLink>
      </div>
      <div class="flex space-x-4">
        <RouterLink v-if="!token" :to="{ name: 'login' }" class="nav-link">Sign In</RouterLink>
        <button v-else @click="signOut" class="nav-link">Sign Out</button>

        <!-- Only show the Settings link if the user is an admin -->
        <RouterLink v-if="isAdmin" :to="{ name: 'settings' }" class="nav-link">Settings</RouterLink>
      </div>
    </nav>
  </header>
  <RouterView />
</template>
