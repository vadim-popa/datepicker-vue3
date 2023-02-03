<template>
  <div class="flex text-unhighlighted">
    <div class="flex items-center p-4">
      {{ periodSummaryFrom }}
      <span class="px-4">
        <TimeSelector v-model="modelDateFromTime" />
      </span>
    </div>
    <div class="flex items-center p-4">
      {{ periodSummaryTo }}
      <span class="px-4">
        <TimeSelector v-model="modelDateToTime" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { storeToRefs } from "pinia";
import { useDatepickerStore } from "@/store/datepickerStore.ts";
import TimeSelector from "@/components/Home/Calendar/Footer/TimeSelector.vue";

const datepickerStore = useDatepickerStore();

/** Data */
const { dateFromState, dateToState } = storeToRefs(datepickerStore);

const periodSummaryFrom = computed(() => {
  const fromDate = formatDate(dateFromState.value);
  return `From: ${fromDate}`;
});
const periodSummaryTo = computed(() => {
  const toDate = formatDate(dateToState.value);
  return `To: ${toDate}`;
});

const prependZero = (value: number) => ("0" + value).slice(-2);

/** Computed */
const modelDateFromTime = computed({
  get() {
    const hours: number = dateFromState.value.getHours();
    const minutes: number = dateFromState.value.getMinutes();
    return `${prependZero(hours)}:${prependZero(minutes)}`;
  },
  set(newValue) {
    const dateFrom = new Date(dateFromState.value);
    const [hours, minutes] = newValue.split(":");
    dateFrom.setHours(Number(hours));
    dateFrom.setMinutes(Number(minutes));
    datepickerStore.setDateFromState(dateFrom);
  }
});
const modelDateToTime = computed({
  get() {
    const hours: number = dateToState.value.getHours();
    const minutes: number = dateToState.value.getMinutes();
    return `${prependZero(hours)}:${prependZero(minutes)}`;
  },
  set(newValue) {
    const dateFrom = new Date(dateToState.value);
    const [hours, minutes] = newValue.split(":");
    dateFrom.setHours(Number(hours));
    dateFrom.setMinutes(Number(minutes));
    datepickerStore.setDateToState(dateFrom);
  }
});

/** Watch */
watch(modelDateFromTime, (newValue) => {
  const startDate = new Date(dateFromState.value);
  const [hours, minutes] = newValue.split(":");
  startDate.setHours(Number(hours));
  startDate.setMinutes(Number(minutes));
  datepickerStore.setDateFromState(startDate);
});

watch(modelDateToTime, (newValue) => {
  const endDate = new Date(dateToState.value);
  const [hours, minutes] = newValue.split(":");
  endDate.setHours(Number(hours));
  endDate.setMinutes(Number(minutes));
  datepickerStore.setDateToState(endDate);
});

/** Methods */
const fullNameOfMonth = (year, month) => new Date(year, month).toLocaleString("default", { month: "long" });
const formatDate = (date) => {
  const month = fullNameOfMonth(date?.getFullYear(), date?.getMonth());
  const getDate = date?.getDate();
  const year = date?.getFullYear();
  return `${month} ${getDate}, ${year}`;
};
</script>

<style scoped>

</style>