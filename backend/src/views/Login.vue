<template>
    <GuestLayout title="Sign in to your account">
        <form class="mt-8 space-y-6" action="#" method="POST" @submit.prevent="login">
            <input type="hidden" name="remember" value="true"/>
            <div class="-space-y-px rounded-md shadow-sm">
                <div>
                    <label for="email-address" class="sr-only">Email address</label>
                    <input id="email-address" name="email" type="email" autocomplete="email" required="" v-model="user.email"
                           class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                           placeholder="Email address"/>
                </div>
                <div>
                    <label for="password" class="sr-only">Password</label>
                    <input id="password" name="password" type="password" autocomplete="current-password" required="" v-model="user.password"
                           class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                           placeholder="Password"/>
                </div>
            </div>

            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" v-model="user.remember"
                           class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                    <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
                </div>

                <div class="text-sm">
                    <router-link :to="{name: 'requestPassword'}"
                                 class="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?
                    </router-link>
                </div>
            </div>

            <div>
                <button type="submit"
                        class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true"/>
            </span>
                    Sign in
                </button>
            </div>
        </form>
    </GuestLayout>
</template>

<script setup>
import {ref} from "vue";
import {LockClosedIcon} from '@heroicons/vue/20/solid';
import GuestLayout from "../components/GuestLayout.vue";
import store from "../store/index.js";
import router from "../router";

let loading = ref(false);
let errorMsg = ref("");

const user = {
    email: '',
    password: '',
    remember: false
}

function login() {
    loading.value = true;
    store.dispatch('/login', user)
        .then(() => {
            loading.value = false;
            router.push({name: 'app.dashboard'})
        })
        .catch(err => {
            console.log('loginCatch', err)
            console.log('Error object:', JSON.stringify(err, null, 2));
            loading.value = false;
            errorMsg.value = err.response?.data?.message || 'An error occurred during login';
        })
}

</script>

<style scoped>

</style>
