import { defineStore } from "pinia";
import { IDatepickerState } from "../interfaces/store/datepicker/IDatepickerState";

export const useDatepickerStore = defineStore("datepickerStore", {
  state: (): IDatepickerState => {
    return {
      currentMonthState: new Date(new Date().getFullYear(), new Date().getMonth()),
      previousMonthState: new Date(new Date().getMonth() === 0 ? new Date().getFullYear() - 1 : new Date().getFullYear(), new Date().getMonth() === 0 ? 11 : new Date().getMonth() - 1),
      dateFromState: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
      dateToState: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
      selectedPeriodState: [],
      allDaysInPreviousMonthState: undefined,
      allDaysInCurrentMonthState: undefined,
      isDisabledDatepickerState: false,
      isVisibleDatepickerState: false,
    };
  },
  getters: {
    getLastWeekOfPreviousMonth: () => (selectedYear: number, selectedMonth: number): Array<Date> => {
      const lastWeek: Array<Date> = [];
      const year: number = selectedMonth === 0 ? selectedYear - 1 : selectedYear;
      const month: number = selectedMonth === 0 ? 11 : selectedMonth - 1;
      const daysInMonth: number = 32 - new Date(year, month, 32).getDate();

      for(let i = daysInMonth; i > 1; i--) {
        const date: Date = new Date(year, month, i);
        lastWeek.push(date);
        if (daysInMonth != i && date.getDay() === 0) {
          break;
        }
      }
      return lastWeek.reverse();
    },
    getFullMonth: () => (selectedYear: number, selectedMonth: number): Array<Date> => {
      const daysInMonth = 32 - new Date(selectedYear, selectedMonth, 32).getDate();
      const days: Array<Date> = [];
      for (let i = 1; i <= daysInMonth + 1; i++) {
        const date: Date = new Date(selectedYear, selectedMonth, i);
        days.push(date);
      }
      return days;
    },
    firstWeekOfNextMonth: () => (selectedYear: number, selectedMonth: number): Array<Date> => {
      const firstWeek: Array<Date> = [];
      const year: number = selectedMonth === 11 ? selectedYear + 1 : selectedYear;
      const month: number = selectedMonth === 11 ? 0 : selectedMonth + 1;

      for(let i = 2; i < 10; i++) {
        const date: Date = new Date(year, month, i);
        if (i != 2 && date.getDay() === 0) {
          break;
        }
        firstWeek.push(date);
      }

      return firstWeek;
    },
    getPeriod: (state) => (dateFrom, dateTo) => {
      const indexOfStartDateFromPreviousMonth = state.allDaysInPreviousMonthState.findIndex((item) => item.getTime() === dateFrom.getTime());
      const indexOfStartDateFromCurrentMonth = state.allDaysInCurrentMonthState.findIndex((item) => item.getTime() === dateFrom.getTime());
      const indexOfEndDateFromPreviousMonth = state.allDaysInPreviousMonthState.findIndex((item) => item.getTime() === dateTo.getTime());
      const indexOfEndDateFromCurrentMonth = state.allDaysInCurrentMonthState.findIndex((item) => item.getTime() === dateTo.getTime());
      if(indexOfStartDateFromPreviousMonth === -1) {
        /** it is in current month */
        return state.allDaysInCurrentMonthState.slice(indexOfStartDateFromCurrentMonth, indexOfEndDateFromCurrentMonth);
      }
      if(indexOfEndDateFromPreviousMonth > -1) {
        return state.allDaysInPreviousMonthState.slice(indexOfStartDateFromPreviousMonth, indexOfEndDateFromPreviousMonth);
      }
      /** End date is in current month */
      return state.allDaysInPreviousMonthState.slice(indexOfStartDateFromPreviousMonth, indexOfEndDateFromCurrentMonth);
    },
  },
  actions: {
    setCurrentMonthState(currentMonth: Date): void {
      this.currentMonthState = currentMonth;
    },
    setPreviousMonthState(previousMonth: Date): void {
      this.previousMonthState = previousMonth;
    },
    setDateFromState(dateFrom: Date): void {
      this.$patch({
        dateFromState: dateFrom
      });
    },
    setDateToState(dateTo: Date): void {
      this.$patch({
        dateToState: dateTo
      });
    },
    setSelectedPeriodState(data: Array<Date>): void {
      this.selectedPeriodState = data;
    },
    resetSelectedPeriodState(): void {
      this.selectedPeriodState = [];
    },
    setAllDaysInPreviousMonthState(data: Array<Date>): void {
      this.allDaysInPreviousMonthState = data;
    },
    setAllDaysInCurrentMonthState(data: Array<Date>): void {
      this.allDaysInCurrentMonthState = data;
    },
    setIsDisabledDatepickerState(value: boolean): void {
      this.isDisabledDatepickerState = value;
    },
    setIsVisibleDatepickerState(value: boolean): void {
      this.isVisibleDatepickerState = value;
    }
  }
});
