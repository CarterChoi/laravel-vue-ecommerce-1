<template>
    <div class="min-h-full bg-gray-200 flex">
        <!--    Side Bar  -->
        <Sidebar :class="{'-ml-[200px]': !sidebarOpened}"/>
        <!--    Side Bar  -->

        <div class="flex-1">
            <Navbar @toggle-sidebar="toggleSidebar"></Navbar>
            <!--            content-->
            <main class="p-6">
                    <router-view></router-view>
            </main>
            <!--            content-->
        </div>
    </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from 'vue'
import Sidebar from "./Sidebar.vue";
import Navbar from "./Navbar.vue";

const {title} = defineProps({
    title: String
})

const sidebarOpened = ref(true);

function toggleSidebar(){
    sidebarOpened.value = !sidebarOpened.value
}

onMounted(()=>{
    handleSidebarOpened();
    window.addEventListener('resize', handleSidebarOpened)
})

onUnmounted(()=>{
    window.removeEventListener('resize', handleSidebarOpened)
})

function handleSidebarOpened() {
    sidebarOpened.value = window.outerWidth > 768;
}

</script>

<style scoped>

</style>
