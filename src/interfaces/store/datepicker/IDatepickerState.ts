export interface IDatepickerState {
    currentMonthState: Date,
    previousMonthState: Date,
    selectedPeriodState: Array<Date>,
    dateFromState: Date,
    dateToState: Date,
    allDaysInPreviousMonthState: Array<Date>,
    allDaysInCurrentMonthState: Array<Date>,
    isDisabledDatepickerState: boolean,
    isVisibleDatepickerState: boolean,
}