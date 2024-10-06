<script setup>
import VehicleTypesTable from '@/views/settings/VehicleTypesTable.vue'
</script>
<template>
  <main>
    <h1 class="title text-indigo-300 text-left">Bid Settings</h1>
    <section class="vehicle-type-section ">
      <div class="flex flex-row space-x-2">
        <button class="rounded-md bg-indigo-500 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Vehicle Types
        </button>
        <button class="rounded-md bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Association Fees
        </button>
        <button class="rounded-md bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Users
        </button>
        <button class="rounded-md bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Settings
        </button>
      </div>
      <VehicleTypesTable />
    </section>
  </main>
</template>

<style scoped>
</style>
