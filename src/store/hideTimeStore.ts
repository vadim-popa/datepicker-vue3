import { defineStore } from "pinia";
import { IHideTimeState } from "../interfaces/store/hideTime/IHideTimeState";

export const useHideTimeStore = defineStore("hideTimeStore", {
  state: (): IHideTimeState => {
    return {
      isHiddenTimeState: false
    };
  },
  actions: {
    setTimeHiddenState(isHiddenTime: boolean) {
      this.isHiddenTimeState = isHiddenTime;
    }
  }
});
