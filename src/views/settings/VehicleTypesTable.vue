<template>
  <div class=" flex flex-col justify-center px-3 py-2 lg:px-8 bg-[#090c10]">
    <div class="sm:mx-auto sm:w-full sm:max-w-2xl">
      <h2 class="text-center text-1xl font-bold leading-9 tracking-tight text-white">
        Vehicle Types Table
      </h2>
    </div>
    <div class="mt-10">
      <table class="w-full bg-[#2f3a51] rounded-md shadow-lg overflow-hidden text-white">
        <thead class="bg-[#415071]">
        <tr class="bg-[#2f3a51] hover:bg-[#2f3a51]">
          <th class="px-6 py-4 text-left text-sm font-semibold leading-6 text-gray-300">Vehicle Type</th>
          <th class="px-6 py-4 text-left text-sm font-semibold leading-6 text-gray-300">Basic buyer fee (%)</th>
          <th class="px-6 py-4 text-left text-sm font-semibold leading-6 text-gray-300">Basic Fee Min</th>
          <th class="px-6 py-4 text-left text-sm font-semibold leading-6 text-gray-300">Basic Fee Max</th>
          <th class="px-6 py-4 text-left text-sm font-semibold leading-6 text-gray-300">Seller's special fee (%)</th>
          <th class="px-6 py-4 text-left text-sm font-semibold leading-6 text-gray-300">Action</th>
        </tr>
        </thead>
        <tbody v-if="vehicleTypes && vehicleTypes.length">
        <tr v-for="type in vehicleTypes" :key="type.id" class="bg-[#2f3a51] hover:bg-[#2f3a51]">
          <td class="px-6 py-4 text-sm align-middle">{{ type.name }}</td>
          <td class="px-6 py-4 text-sm align-middle">{{ (type.basic_fee_rate * 100).toFixed(2) }}%</td>
          <td class="px-6 py-4 text-sm align-middle">{{ type.basic_fee_min }}</td>
          <td class="px-6 py-4 text-sm align-middle">{{ type.basic_fee_max }}</td>
          <td class="px-6 py-4 text-sm align-middle">{{ (type.special_fee_rate * 100).toFixed(2) }}%</td>
          <td class="px-6 py-4 text-sm align-middle">
            <div class="flex items-center justify-center space-x-2">
              <!-- Edit Button with SVG -->
              <button
                  @click="editVehicleType(type)"
                  class="p-2 rounded-md transition duration-300 hover:bg-indigo-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-indigo-600">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 3.487a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM10.035 7.329L3.75 13.614v3.712h3.712l6.285-6.285-3.712-3.712z" />
                </svg>
              </button>

              <!-- Delete Button with SVG -->
              <button
                  @click="deleteVehicleType(type.id)"
                  class="p-2 rounded-md transition duration-300 hover:bg-indigo-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-600">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </td>
        </tr>
        </tbody>
        <tbody v-else>
        <tr>
          <td colspan="6" class="px-6 py-4 text-center text-sm text-gray-300">No vehicle types found</td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Add New Vehicle Type Button -->
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <button
          @click="showAddVehicleTypeForm = !showAddVehicleTypeForm"
          class="w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Add New Vehicle Type
      </button>
    </div>

    <!-- New Vehicle Type Form -->
    <div v-if="showAddVehicleTypeForm" class="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="submitNewVehicleType">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-300">Vehicle Type Name</label>
          <input v-model="newVehicleType.name" id="name" class="block w-full mt-1 p-2 bg-gray-700 text-white rounded-md" required />
        </div>
        <div class="mb-4">
          <label for="basicFeeMin" class="block text-sm font-medium text-gray-300">Basic Fee Min</label>
          <input v-model="newVehicleType.basic_fee_min" id="basicFeeMin" type="number" class="block w-full mt-1 p-2 bg-gray-700 text-white rounded-md" required />
        </div>
        <div class="mb-4">
          <label for="basicFeeMax" class="block text-sm font-medium text-gray-300">Basic Fee Max</label>
          <input v-model="newVehicleType.basic_fee_max" id="basicFeeMax" type="number" class="block w-full mt-1 p-2 bg-gray-700 text-white rounded-md" required />
        </div>
        <div class="mb-4">
          <label for="basicFeeRate" class="block text-sm font-medium text-gray-300">Basic Fee Rate (%)</label>
          <input v-model="newVehicleType.basic_fee_rate" id="basicFeeRate" type="number" step="0.01" class="block w-full mt-1 p-2 bg-gray-700 text-white rounded-md" required />
        </div>
        <div class="mb-4">
          <label for="specialFeeRate" class="block text-sm font-medium text-gray-300">Seller's Special Fee Rate (%)</label>
          <input v-model="newVehicleType.special_fee_rate" id="specialFeeRate" type="number" step="0.01" class="block w-full mt-1 p-2 bg-gray-700 text-white rounded-md" required />
        </div>
        <button type="submit" class="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-500">Submit</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useVehicleTypeStore } from '@/stores/vehicleType.js';

const vehicleTypeStore = useVehicleTypeStore();
const vehicleTypes = computed(() => vehicleTypeStore.vehicleTypes);
const showAddVehicleTypeForm = ref(false);

// Object to hold the new vehicle type data
const newVehicleType = ref({
  name: '',
  basic_fee_min: '',
  basic_fee_max: '',
  basic_fee_rate: '',
  special_fee_rate: ''
});

// Fetch vehicle types on component mount
onMounted(async () => {
  await vehicleTypeStore.fetchVehicleTypes();
});

// Submit new vehicle type
const submitNewVehicleType = async () => {
  // Ensure proper conversion from percentage to decimal before sending to backend
  const adjustedVehicleType = {
    ...newVehicleType.value,
    basic_fee_rate: newVehicleType.value.basic_fee_rate / 100,
    special_fee_rate: newVehicleType.value.special_fee_rate / 100
  };

  // Save the adjusted vehicle type using the store's createVehicleType action
  await vehicleTypeStore.createVehicleType(adjustedVehicleType);

  // Reset form fields and hide the form
  newVehicleType.value = { name: '', basic_fee_min: '', basic_fee_max: '', basic_fee_rate: '', special_fee_rate: '' };
  showAddVehicleTypeForm.value = false;
};

// Edit vehicle type function
const editVehicleType = (vehicleType) => {
  console.log(`Editing vehicle type: ${vehicleType.name}`);
  // Logic to edit the vehicle type
};

// Delete vehicle type function
const deleteVehicleType = (id) => {
  vehicleTypeStore.deleteVehicleType(id);
  console.log(`Deleting vehicle type with ID: ${id}`);
};
</script>

