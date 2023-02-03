<template>
  <div>
    <CalendarSidebar v-if="isVisibleSidebarState" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useShowSidebarStore } from "@/store/showSidebarStore";
import CalendarSidebar from "@/components/Home/Calendar/Body/CalendarSidebar.vue";

const showSidebarStore = useShowSidebarStore();

const { isVisibleSidebarState } = storeToRefs(showSidebarStore);
</script>

<style scoped>

</style>