<template>
  <div>
    <ToggleButton
      v-model="modelHideTime"
      prepend-label="Hide Time"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import ToggleButton from "@/components/Forms/ToggleButton.vue";
import { useHideTimeStore } from "@/store/hideTimeStore";

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