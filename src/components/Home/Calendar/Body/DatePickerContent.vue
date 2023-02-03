<template>
  <div>
    <p>
      Options API:
    </p>
    <!--
    <div>
      <span
        class="cursor-pointer border-1 border-lightOutline rounded hover-bg-onHover"
        @click="toggleDatePicker"
      >
        <span class="px-05 py-0">
          <PeriodSummary />
        </span>
      </span>
    </div>
    -->
    <div
      class="picker-header cursor-pointer hover-bg-onHover"
      @click="toggleDatePicker"
    >
      <h5>
        <PeriodSummary />
      </h5>
    </div>
    <div
      v-if="isVisibleDatepickerState"
      class="flex"
    >
      <div>
        <div
          class="flex"
          :class="{ 'disabled': isDisabledDatepickerState }"
        >
          <div class="p-4">
            <DatePicker
              v-model:isMousedown="isMousedown"
              :selected-year="previousMonthState.getFullYear()"
              :selected-month="previousMonthState.getMonth()"
              :is-visible-left-arrow="true"
              month-type="previous"
            />
          </div>
          <div class="p-4">
            <DatePicker
              v-model:isMousedown="isMousedown"
              :selected-year="currentMonthState.getFullYear()"
              :selected-month="currentMonthState.getMonth()"
              :is-visible-right-arrow="true"
              month-type="current"
            />
          </div>
        </div>
        <CalendarFooter />
      </div>
      <SidebarWrapper />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref, computed, onMounted, watch } from "vue";
import { useDatepickerStore } from "@/store/datepickerStore.ts";

import DatePicker from "@/components/Home/Calendar/Body/DatePicker.vue";
import SidebarWrapper from "@/components/Home/Calendar/Body/SidebarWrapper.vue";
import CalendarFooter from "@/components/Home/Calendar/Footer/CalendarFooter.vue";
import PeriodSummary from "@/components/Home/Calendar/Body/PeriodSummary.vue";

const datepickerStore = useDatepickerStore();

/** Data */
const {
  currentMonthState,
  previousMonthState,
  isDisabledDatepickerState,
  isVisibleDatepickerState
} = storeToRefs(datepickerStore);

const isMousedown = ref(false);

onMounted(() => {
  setCompleteCurrentMonth();
  setCompletePreviousMonth();
});

/** Methods */
const toggleDatePicker = () => {
  datepickerStore.setIsVisibleDatepickerState(!isVisibleDatepickerState.value);
};

const setCompleteCurrentMonth = () => {
  const yearOfCurrentMonth = currentMonthState.value.getFullYear();
  const currentMonth = currentMonthState.value.getMonth();
  const data: Array<Date> = [
    ...datepickerStore.getLastWeekOfPreviousMonth(yearOfCurrentMonth, currentMonth),
    ...datepickerStore.getFullMonth(yearOfCurrentMonth, currentMonth),
    ...datepickerStore.firstWeekOfNextMonth(yearOfCurrentMonth, currentMonth)
  ];
  datepickerStore.setAllDaysInCurrentMonthState(data);
};

const setCompletePreviousMonth = () => {
  const yearOfPreviousMonth = previousMonthState.value.getFullYear();
  const previousMonth = previousMonthState.value.getMonth();
  const data: Array<Date> = [
    ...datepickerStore.getLastWeekOfPreviousMonth(yearOfPreviousMonth, previousMonth),
    ...datepickerStore.getFullMonth(yearOfPreviousMonth, previousMonth),
    ...datepickerStore.firstWeekOfNextMonth(yearOfPreviousMonth, previousMonth)
  ];
  datepickerStore.setAllDaysInPreviousMonthState(data);
};
</script>

<style scoped>

</style>