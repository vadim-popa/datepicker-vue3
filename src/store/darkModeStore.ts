import { defineStore } from "pinia";
import { IDarkModeState } from "../interfaces/store/darkMode/IDarkModeState";

export const useDarkModeStore = defineStore("darkModeStore", {
  state: (): IDarkModeState => {
    return {
      themeState: ""
    };
  },
  actions: {
    setThemeState(theme: string) {
      this.themeState = theme;
    }
  }
});
