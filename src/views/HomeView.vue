<script setup>
import { reactive, ref, onMounted } from "vue";
import axios from 'axios';
import { useAuthStore } from "@/stores/auth.js"; // Import the auth store

const authStore = useAuthStore();
const formData = reactive({
  basePrice: '',
  vehicleTypeId: null,
});

const vehicleTypes = ref([]);

const calculationResult = ref(null);

const fetchVehicleTypes = async () => {
  try {
    const response = await axios.get('/api/vehicle-types');
    vehicleTypes.value = response.data;
  } catch (error) {
    console.error('Error fetching vehicle types:', error);
  }
};

const calculatePrice = async () => {
  try {
    const token = authStore.token || localStorage.getItem('token');

    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const response = await axios.post(
        '/api/calculate',
        {
          base_price: formData.basePrice,
          vehicle_type_id: formData.vehicleTypeId,
        },
        {
          headers,
        }
    );

    calculationResult.value = response.data.fees;
  } catch (error) {
    console.error('Error calculating vehicle price:', error);
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized: JWT token is missing or invalid.');
    }
  }
};


onMounted(() => {
  fetchVehicleTypes();
});
</script>
<template>
  <div class="flex  flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-[#090c10]">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
        Vehicle Price Calculator
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="calculatePrice" class="space-y-6">
        <!-- Vehicle Base Price -->
        <div>
          <label for="basePrice" class="block text-sm font-medium leading-6 text-gray-300">
            Vehicle Base Price ($)
          </label>
          <div class="mt-2">
            <input
                v-model="formData.basePrice"
                id="basePrice"
                name="basePrice"
                type="number"
                placeholder="Enter vehicle price"
                step="0.01"
                required
                class="block w-full rounded-md border-0 py-1.5 bg-[#2f3a51] text-white shadow-sm ring-1 ring-inset ring-[#415071] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <!-- Vehicle Type -->
        <div>
          <label for="vehicleType" class="block text-sm font-medium leading-6 text-gray-300">
            Vehicle Type
          </label>
          <div class="mt-2">
            <select
                v-model="formData.vehicleTypeId"
                id="vehicleType"
                name="vehicleType"
                required
                class="block w-full rounded-md border-0 py-1.5 bg-[#2f3a51] text-white shadow-sm ring-1 ring-inset ring-[#415071] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="" disabled>Select a vehicle type</option>
              <option v-for="type in vehicleTypes" :key="type.id" :value="type.id">
                {{ type.name }}
              </option>
            </select>
          </div>
        </div>

        <!-- Submit Button -->
        <div>
          <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Calculate
          </button>
        </div>
      </form>
      <div v-if="calculationResult" class="mt-10 space-y-2 text-white">
        <div class="text-lg font-bold">Calculation Result:</div>
        <table class="w-full text-sm text-left rounded-md shadow-lg overflow-hidden mb-6 table-auto bg-white text-gray-900">
          <thead>
          <tr>
            <th class="px-6 py-4">Item</th>
            <th class="px-6 py-4">Amount ($)</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td class="px-6 py-4">Base Price</td>
            <td class="px-6 py-4">{{ calculationResult.base_price }}</td>
          </tr>
          <tr>
            <td class="px-6 py-4">Basic Fee</td>
            <td class="px-6 py-4">{{ calculationResult.basic_fee }}</td>
          </tr>
          <tr>
            <td class="px-6 py-4">Special Fee</td>
            <td class="px-6 py-4">{{ calculationResult.special_fee }}</td>
          </tr>
          <tr>
            <td class="px-6 py-4">Association Fee</td>
            <td class="px-6 py-4">{{ calculationResult.association_fee }}</td>
          </tr>
          <tr>
            <td class="px-6 py-4">Storage Fee</td>
            <td class="px-6 py-4">{{ calculationResult.storage_fee }}</td>
          </tr>
          <tr class="font-bold">
            <td class="px-6 py-4">Total Cost</td>
            <td class="px-6 py-4">{{ calculationResult.total_cost }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
