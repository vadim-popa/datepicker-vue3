<template>
  <div>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
// import { RouterLink, RouterView } from "vue-router";
import { useDarkModeStore } from "./store/darkModeStore";

const darkModeStore = useDarkModeStore();
const { themeState } = storeToRefs(darkModeStore);

onMounted(() => {
  changeTheme("");
});

watch(themeState, (theme) => {
  changeTheme(theme);
});

const changeTheme = (theme: string) => {
  document.documentElement.className = theme;
};
</script>

<style scoped lang="scss">

</style>
