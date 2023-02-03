<template>
  <div class="date-footer">
    <TimeInfo v-if="isVisibleDatepickerState && !isHiddenTimeState" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useHideTimeStore } from "@/store/hideTimeStore";
import { useDatepickerStore } from "@/store/datepickerStore.ts";
import TimeInfo from "./TimeInfo.vue";

const hideTimeState = useHideTimeStore();
const datepickerStore = useDatepickerStore();

const { isHiddenTimeState } = storeToRefs(hideTimeState);
const { isVisibleDatepickerState } = storeToRefs(datepickerStore);
</script>

<style scoped>

</style>