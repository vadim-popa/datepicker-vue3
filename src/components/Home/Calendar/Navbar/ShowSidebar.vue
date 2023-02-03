<template>
  <ToggleButton
    v-model="modelShowSidebar"
    prepend-label="Show Sidebar"
  />
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useShowSidebarStore } from "@/store/showSidebarStore";
import ToggleButton from "@/components/Forms/ToggleButton.vue";

const showSidebarStore = useShowSidebarStore();

/** Data */
const modelShowSidebar = ref(false);

/** Watch */
watch(modelShowSidebar, (newVal) => {
  showSidebarStore.setVisibleSidebarState(newVal);
});
</script>

<style scoped>

</style>