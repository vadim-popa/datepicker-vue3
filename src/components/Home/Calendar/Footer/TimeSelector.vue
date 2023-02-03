<template>
  <span class="time-selector">
    <input
      v-model="timeModel"
      type="time"
    >
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface IEmit {
  (e: "update:modelValue", value: string): void
}

const props = defineProps({
  modelValue: {
    type: String,
    default: "00:00"
  }
});
const emit = defineEmits<IEmit>();

const timeModel = computed({
  get () {
    return props.modelValue;
  },
  set (value) {
    emit("update:modelValue", value);
  }
});
</script>

<style scoped>

</style>