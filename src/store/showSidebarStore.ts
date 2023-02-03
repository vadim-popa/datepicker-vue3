import { defineStore } from "pinia";
import { IShowSidebarState } from "../interfaces/store/showSidebar/IShowSidebarState";

export const useShowSidebarStore = defineStore("showSidebarStore", {
  state: (): IShowSidebarState => {
    return {
      isVisibleSidebarState: false
    };
  },
  actions: {
    setVisibleSidebarState(isVisibleSidebar: boolean) {
      this.isVisibleSidebarState = isVisibleSidebar;
    }
  }
});
