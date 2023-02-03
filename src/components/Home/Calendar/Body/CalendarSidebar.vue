<template>
  <div class="border-1 border-lightOutline p-4">
    <div class="text-center color-gray font-10">
      Select by:
    </div>
    <div class="mt-10">
      <div
        v-for="timePeriod in timePeriods"
        :key="timePeriod.id"
        class="flex items-center justify-center hover-bg-onSelectionHover cursor-pointer py-7"
        :class="{'selected': selectedPeriod === timePeriod.value}"
        @click="getSelectedTime(timePeriod.value)"
      >
        {{ timePeriod.text }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useDatepickerStore } from "@/store/datepickerStore.ts";

const datepickerStore = useDatepickerStore();

const timePeriods = [
  {
    id: 1,
    value: "today",
    text: "Today"
  },
  {
    id: 2,
    value: "yesterday",
    text: "Yesterday"
  },
  {
    id: 3,
    value: "lastSeven",
    text: "Last 7 Days"
  },
  {
    id: 4,
    value: "lastFourteen",
    text: "Last 14 Days"
  },
  {
    id: 5,
    value: "lastThirty",
    text: "Last 30 Days"
  },
  {
    id: 6,
    value: "whole",
    text: "Whole Period"
  },
  {
    id: 7,
    value: "custom",
    text: "Custom"
  }
];

/** Data */
const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
const selectedPeriod = ref<string>("custom");

/** Methods */
const getSelectedTime = (timePeriod: string) => {
  selectedPeriod.value = timePeriod;
  switch (timePeriod) {
  case "today": {
    datepickerStore.setDateFromState(today);
    datepickerStore.setDateToState(today);
    datepickerStore.setSelectedPeriodState([]);
    datepickerStore.setIsDisabledDatepickerState(true);
    break;
  }
  case "yesterday": {
    datepickerStore.setIsDisabledDatepickerState(true);
    const currentDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    const yesterday = new Date(currentDate.setDate(currentDate.getDate() - 1));
    datepickerStore.setDateFromState(yesterday);
    datepickerStore.setDateToState(yesterday);
    datepickerStore.setSelectedPeriodState([]);
    break;
  }
  case "lastSeven": {
    datepickerStore.setIsDisabledDatepickerState(true);
    const currentDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    const sevenDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 7));
    datepickerStore.setDateFromState(sevenDaysAgo);
    datepickerStore.setDateToState(today);
    const period = datepickerStore.getPeriod(sevenDaysAgo, today);
    datepickerStore.setSelectedPeriodState(period);
    break;
  }
  case "lastFourteen": {
    datepickerStore.setIsDisabledDatepickerState(true);
    const currentDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    const fourteenDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 14));
    datepickerStore.setDateFromState(fourteenDaysAgo);
    datepickerStore.setDateToState(today);
    const period = datepickerStore.getPeriod(fourteenDaysAgo, today);
    datepickerStore.setSelectedPeriodState(period);
    break;
  }
  case "lastThirty": {
    datepickerStore.setIsDisabledDatepickerState(true);
    const currentDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    const thirtyDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 30));
    datepickerStore.setDateFromState(thirtyDaysAgo);
    datepickerStore.setDateToState(today);
    const period = datepickerStore.getPeriod(thirtyDaysAgo, today);
    datepickerStore.setSelectedPeriodState(period);
    break;
  }
  case "whole": {
    datepickerStore.setIsDisabledDatepickerState(true);
    const [firstDayFromPreviousMonth, ...rest] = datepickerStore.allDaysInPreviousMonthState;
    datepickerStore.setDateFromState(firstDayFromPreviousMonth);
    datepickerStore.setDateToState(today);
    const period = datepickerStore.getPeriod(firstDayFromPreviousMonth, today);
    datepickerStore.setSelectedPeriodState(period);
    break;
  }
  case "custom": {
    datepickerStore.setIsDisabledDatepickerState(false);
    datepickerStore.setDateFromState(today);
    datepickerStore.setDateToState(today);
    datepickerStore.setSelectedPeriodState([]);
    break;
  }
  }
};
</script>

<style scoped>

</style>