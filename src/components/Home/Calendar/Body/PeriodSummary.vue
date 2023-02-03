<template>
  <span>
    {{ periodSummary }}
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useDatepickerStore } from "@/store/datepickerStore.ts";

const datepickerStore = useDatepickerStore();

/** Data */
const { dateFromState, dateToState } = storeToRefs(datepickerStore);

const prependZero = (value: number) => ("0" + value).slice(-2);

/** Computed */
const periodSummary = computed(() => {
  const fromDate = formatDate(dateFromState.value);
  const toDate = formatDate(dateToState.value);
  return dateFromState.value.getTime() >= dateToState.value.getTime() ? fromDate : `${fromDate} - ${toDate}`;
});

/** Methods */
const formatDate = (date) => {
  const getDate = date.getDate();
  const getMonth = date.toLocaleString("default", { month: "short" });
  const getYear = date.getFullYear();
  const getHour = prependZero(date.getHours());
  const getMinutes = date.toLocaleString("default", { minute: "2-digit" });
  return `${getMonth} ${getDate}, ${getYear}, ${getHour}:${getMinutes}`;
};
</script>

<style scoped>

</style>