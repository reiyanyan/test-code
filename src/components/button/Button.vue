<template>
  <div
    class="flex flex-row gap-2 w-max px-4 py-2 rounded-full bg-primary text-white"
    @click="$emit('onClick')"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  inheritAttrs: false,
  props: {
    text: {
      type: String,
      default: "",
    },
  },
  emits: ["onClick"],
});
</script>
