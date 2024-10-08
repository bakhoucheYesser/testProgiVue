<script setup>
import { reactive, ref, watch } from "vue";
import { useAuthStore } from "@/stores/auth.js";
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const formData = reactive({
  email: '',
  password: '',
});

const errors = reactive({
  email: '',
  password: '',
});

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const validateForm = () => {
  let valid = true;

  if (!formData.email) {
    errors.email = "Email is required";
    valid = false;
  } else if (!validateEmail(formData.email)) {
    errors.email = "Please enter a valid email";
    valid = false;
  } else {
    errors.email = "";
  }

  if (!formData.password) {
    errors.password = "Password is required";
    valid = false;
  } else {
    errors.password = "";
  }

  return valid;
};

const handleLogin = async () => {
  if (!validateForm()) return;

  try {
    await authStore.authenticate('/api/login_check', formData);

    if (authStore.token) {
      await router.push({ name: 'home' });
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
};

watch(() => authStore.token, (newToken) => {
  if (newToken) {
    router.push({ name: 'dashboard' });
  }
});
</script>
<template>
  <div class=" flex-1 flex-col justify-center px-6 lg:px-8 bg-[#090c10]">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Sign in</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="handleLogin" class="space-y-6">
        <!-- Email Field -->
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-300">Email address</label>
          <div class="mt-2">
            <input v-model="formData.email" id="email" name="email" type="email" autocomplete="email" class="block w-full rounded-md border-0 py-1.5 bg-[#2f3a51] text-white shadow-sm ring-1 ring-inset ring-[#415071] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            <p v-if="errors.email" class="text-sm text-red-500 mt-1">{{ errors.email }}</p>
          </div>
        </div>

        <!-- Password Field -->
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-300">Password</label>
          </div>
          <div class="mt-2">
            <input v-model="formData.password" id="password" name="password" type="password" autocomplete="current-password" class="block w-full rounded-md border-0 py-1.5 bg-[#2f3a51] text-white shadow-sm ring-1 ring-inset ring-[#415071] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            <p v-if="errors.password" class="text-sm text-red-500 mt-1">{{ errors.password }}</p>
          </div>
        </div>

        <!-- Submit Button -->
        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
        </div>
      </form>
    </div>
  </div>
</template>
