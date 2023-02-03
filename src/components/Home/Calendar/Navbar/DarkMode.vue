<template>
  <ToggleButton
    v-model="toggleDarkMode"
    prepend-label="Light"
    append-label="Dark"
  />
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useDarkModeStore } from "@/store/darkModeStore";
import ToggleButton from "@/components/Forms/ToggleButton.vue";

const darkModeStore = useDarkModeStore();

const toggleDarkMode = ref(false);

watch(toggleDarkMode, (newValue) => {
  darkModeStore.setThemeState(newValue ? "dark-theme" : "");
});
</script>

<style scoped>

</style>