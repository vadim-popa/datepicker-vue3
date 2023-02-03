<template>
  <div>
    <div class="text-center">
      <button
        v-if="props.isVisibleLeftArrow"
        class="rounded-xl p-2 py-3"
        @click="decreasePreviousMonth"
      >
        {{ '<' }}
      </button>
      {{ fullNameOfMonth }} {{ props.selectedYear }}
      <button
        v-if="props.isVisibleRightArrow"
        class="rounded-xl p-2 py-3"
        @click="increaseCurrentMonth"
      >
        {{ '>' }}
      </button>
    </div>
    <div class="grid-container">
      <p
        v-for="(day, index) in days"
        :key="index"
        class="font-semibold p-2"
      >
        {{ day }}
      </p>
      <div
        v-for="(date, dateIndex) in daysInTable"
        :key="dateIndex"
        class="flex items-center justify-center text-center hover-bg-onSelectionHover cursor-pointer"
        :class="{
          'selected': isSelected(date),
          'different-month': isDifferentMonth(date),
          'light-selected': isInSelectedPeriod(date)
        }"
        @mousedown="setDateFrom(date)"
        @mouseover="selectPeriod(date)"
        @mouseup="setDateTo(date)"
      >
        {{ extractDate(date) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRaw } from "vue";
import { useDatepickerStore } from "@/store/datepickerStore.ts";
import { storeToRefs } from "pinia";

interface IEmit {
  (e: "update:isMousedown", value: boolean): void
}

const datepickerStore = useDatepickerStore();

const props = defineProps({
  selectedYear: {
    type: Number,
    required: true,
  },
  selectedMonth: {
    type: Number,
    required: true,
  },
  isVisibleLeftArrow: {
    type: Boolean,
    default: false
  },
  isVisibleRightArrow: {
    type: Boolean,
    default: false
  },
  isMousedown: {
    type: Boolean,
    default: false,
  },
  monthType: {
    type: String,
    validator(value) {
      return ["previous", "current"].includes(value);
    }
  }
});
const emit = defineEmits<IEmit>();

const days = ["SU", "MO", "TO", "WE", "TH", "FR", "SA"];

/** Data */
const {
  currentMonthState,
  previousMonthState,
  dateFromState,
  dateToState,
  selectedPeriodState,
  allDaysInPreviousMonthState,
  allDaysInCurrentMonthState
} = storeToRefs(datepickerStore);

/** Computed */
const daysInTable = computed(()=> props.monthType === "previous" ? allDaysInPreviousMonthState.value : allDaysInCurrentMonthState.value);

const fullNameOfMonth = computed(() => new Date(props.selectedYear, props.selectedMonth).toLocaleString("default", { month: "long" }));

const isMousedownComputed = computed({
  get() {
    return props.isMousedown;
  },
  set(value) {
    emit("update:isMousedown", value);
  },
});

/** Methods */
const excludeDuplicatedDates = (data: Array<Date>): Array<Date> => {
  return data
    .map((date) => date.getTime())
    .filter((date, i, array) => array.indexOf(date) === i)
    .map((time) => new Date(time));
};

const extractDate = (date) => new Date(date).getDate();

const isDifferentMonth = (date) => date.getMonth() != props.selectedMonth;

const increaseCurrentMonth = () => {
  const currentMonth = currentMonthState.value.getMonth();
  const yearOfCurrentMonth = currentMonthState.value.getFullYear();
  const year = currentMonth === 11 ? yearOfCurrentMonth + 1 : yearOfCurrentMonth;
  const month = currentMonth === 11 ? 0 : currentMonth + 1;
  datepickerStore.setCurrentMonthState(new Date(year, month));
  increasePreviousMonth();
  setCompleteCurrentMonth();
};
const increasePreviousMonth = () => {
  const previousMonth = previousMonthState.value.getMonth();
  const yearOfPreviousMonth = previousMonthState.value.getFullYear();
  const year = previousMonth === 11 ? yearOfPreviousMonth + 1 : yearOfPreviousMonth;
  const month = previousMonth === 11 ? 0 : previousMonth + 1;
  datepickerStore.setPreviousMonthState(new Date(year, month));
  setCompletePreviousMonth();
};
const decreasePreviousMonth = () => {
  const previousMonth = previousMonthState.value.getMonth();
  const yearOfPreviousMonth = previousMonthState.value.getFullYear();
  const year = previousMonth === 0 ? yearOfPreviousMonth - 1 : yearOfPreviousMonth;
  const month = previousMonth === 0 ? 11 : previousMonth - 1;
  datepickerStore.setPreviousMonthState(new Date(year, month));
  decreaseCurrentMonth();
  setCompletePreviousMonth();
};
const decreaseCurrentMonth = () => {
  const currentMonth = currentMonthState.value.getMonth();
  const yearOfCurrentMonth = currentMonthState.value.getFullYear();
  const year = currentMonth === 0 ? yearOfCurrentMonth - 1 : yearOfCurrentMonth;
  const month = currentMonth === 0 ? 11 : currentMonth - 1;
  datepickerStore.setCurrentMonthState(new Date(year, month));
  setCompleteCurrentMonth();
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

const setDateFrom = (date: Date): void => {
  isMousedownComputed.value = true;
  datepickerStore.resetSelectedPeriodState();
  datepickerStore.setDateFromState(date);
  datepickerStore.setDateToState(date);
  selectPeriod(date);
};
const setDateTo = (date: Date): void => {
  isMousedownComputed.value = false;
  if(date.getTime() < dateToState.value.getTime()){
    return;
  }
  datepickerStore.setDateToState(date);
};
const selectPeriod = (hoverDate: Date): void => {
  if(!isMousedownComputed.value) {
    return;
  }

  /** Not allow if hover date is less then start date */
  if(dateFromState.value && (hoverDate.getTime() < dateFromState.value.getTime())) {
    return;
  }

  datepickerStore.setDateToState(hoverDate);
  /** Detect month of start date */
  /** First check in previous month */
  const indexOfStartDateFromPreviousMonth = findIndexOfDate(toRaw(allDaysInPreviousMonthState.value), dateFromState.value);
  const indexOfEndDateFromPreviousMonth = findIndexOfDate(toRaw(allDaysInPreviousMonthState.value), hoverDate);
  const indexOfStartDateFromCurrentMonth = findIndexOfDate(toRaw(allDaysInCurrentMonthState.value), dateFromState.value);
  const indexOfEndDateFromCurrentMonth = findIndexOfDate(toRaw(allDaysInCurrentMonthState.value), hoverDate);

  if (indexOfStartDateFromPreviousMonth > -1) {
    /** Detect indexOf endDate from previous month */
    if (indexOfEndDateFromPreviousMonth > -1) {
      /** get all data from start to end from previous month */
      const selectedDatesFromPreviousMonth = toRaw(allDaysInPreviousMonthState.value).slice(indexOfStartDateFromPreviousMonth, indexOfEndDateFromPreviousMonth);
      datepickerStore.setSelectedPeriodState([...selectedDatesFromPreviousMonth]);
      return;
    }
    /** If end date does not exists in previous month then it should to check in current month */
    if (indexOfEndDateFromCurrentMonth === -1) {
      return;
    }
    /** Check again if this date exists in previous month */
    if(indexOfEndDateFromPreviousMonth > -1) {
      const selectedDatesFromPreviousMonthaAgain = toRaw(allDaysInPreviousMonthState.value).slice(indexOfStartDateFromPreviousMonth, indexOfEndDateFromPreviousMonth);
      datepickerStore.setSelectedPeriodState([...selectedDatesFromPreviousMonthaAgain]);
      return;
    }
    /** If endDate exists in current month and start date exists in current month and in previous month */
    if(indexOfEndDateFromCurrentMonth > -1 && indexOfStartDateFromPreviousMonth > -1 && indexOfStartDateFromCurrentMonth > -1) {
      selectDatesFromCurrentMonth(indexOfStartDateFromCurrentMonth, indexOfEndDateFromCurrentMonth);
      return;
    }
    /** If it exists in current month then get all data from previous month started with start date to end of previous month */
    const selectedDatesFromPreviousMonthToEnd = toRaw(allDaysInPreviousMonthState.value).slice(indexOfStartDateFromPreviousMonth, allDaysInPreviousMonthState.value.length - 1);
    /** Also get all data from current month from index 0 to index of hover date */
    const selectedDatesFromCurrentMonthFromStart = toRaw(allDaysInCurrentMonthState.value).slice(0, indexOfEndDateFromCurrentMonth);
    datepickerStore.setSelectedPeriodState(excludeDuplicatedDates([...selectedDatesFromPreviousMonthToEnd, ...selectedDatesFromCurrentMonthFromStart]));
    return;
  }
  /** The start date is in current month */
  /** Get index start date from current month */
  /** Detect indexOf endDate from this month */
  /** check if end date is greater then start date */
  selectDatesFromCurrentMonth(indexOfStartDateFromCurrentMonth, indexOfEndDateFromCurrentMonth);
};
// const isItTheNextMonth = (monthFrom, hoverMonth) => monthFrom === 11 ? monthFrom > hoverMonth : monthFrom < hoverMonth;

const isSelected = (date): boolean => {
  const formatedParamDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const formatedDateFromState = new Date(dateFromState.value.getFullYear(), dateFromState.value.getMonth(), dateFromState.value.getDate());
  const formatedDateToState = new Date(dateToState.value.getFullYear(), dateToState.value.getMonth(), dateToState.value.getDate());
  const currentDate = new Date();
  const formatedCurrentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  if (!(dateFromState.value && dateToState.value)) {
    return formatedParamDate.getTime() === formatedCurrentDate.getTime();
  }
  return formatedDateFromState.getTime() === formatedParamDate.getTime() || formatedDateToState.getTime() === formatedParamDate.getTime();
};
const isInSelectedPeriod = (date: Date): boolean => toRaw(selectedPeriodState.value).find((item) => item.getTime() === date.getTime());
const findIndexOfDate = (array, date) => array.findIndex((item) => item.getTime() === date.getTime());
const selectDatesFromCurrentMonth = (indexOfStartDate, indexOfEndDate) => {
  const selectedDatesFromCurrentMonth = toRaw(allDaysInCurrentMonthState.value).slice(indexOfStartDate, indexOfEndDate);
  datepickerStore.setSelectedPeriodState(excludeDuplicatedDates([...selectedDatesFromCurrentMonth]));
};
</script>

<style scoped>

</style>