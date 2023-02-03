<template>
  <div>
    <ToggleButton
      v-model="toggleDarkMode"
      prepend-label="Light"
      append-label="Dark"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import ToggleButton from "@/components/Forms/ToggleButton.vue";
import { useDarkModeStore } from "@/store/darkModeStore";
import { storeToRefs } from "pinia";

const darkModeStore = useDarkModeStore();
// const { themeState } = storeToRefs(darkModeStore);

const toggleDarkMode = ref(false);

watch(toggleDarkMode, (newValue) => {
  darkModeStore.setThemeState(newValue ? "dark-theme" : "");
});
</script>

<style scoped>

</style>