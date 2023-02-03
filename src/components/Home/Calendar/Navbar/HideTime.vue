<template>
  <ToggleButton
    v-model="modelHideTime"
    prepend-label="Hide Time"
  />
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useHideTimeStore } from "@/store/hideTimeStore";
import ToggleButton from "@/components/Forms/ToggleButton.vue";

const hideTimeState = useHideTimeStore();

/** Data */
const modelHideTime = ref(false);

/** Watch */
watch(modelHideTime, (newValue) => {
  hideTimeState.setTimeHiddenState(newValue);
});
</script>

<style scoped>

</style>