<template>
  <div class="flex items-center">
    <p class="px-2">
      {{ props.prependLabel }}
    </p>
    <label
      class="switch"
    >
      <span
        v-if="isActive"
        class="toggle__label"
      />
      <span
        v-if="!isActive"
        class="toggle__label"
      />
      <input
        id="toggle_button"
        v-model="checkedValue"
        type="checkbox"
      >
      <span class="toggle__switch" />
    </label>
    <p class="px-2">
      {{ props.appendLabel }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface IEmit {
  (e: "update:modelValue", value: boolean): void
}

const props = defineProps({
  prependLabel: {
    type: String,
    default: ""
  },
  appendLabel: {
    type: String,
    default: ""
  },
  modelValue: {
    type: Boolean,
    default: false,
  }
});

const emit = defineEmits<IEmit>();

/** Computed */
const isActive = computed(() => props.modelValue);
const checkedValue = computed({
  get () {
    return props.modelValue;
  },
  set (newValue: boolean) {
    emit("update:modelValue", newValue);
  }
});
</script>

<style scoped lang="scss">
</style>