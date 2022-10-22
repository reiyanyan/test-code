<template>
  <div class="flex flex-col gap-2 p-0 border-0">
    <p class="pl-3">{{ label }}</p>
    <input class="w-full rounded-md px-5 py-4" v-bind="$attrs" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true,
      default: "",
    },
  },
});
</script>
