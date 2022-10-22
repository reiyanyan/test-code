<template>
  <button
    class="flex flex-row justify-center gap-2 w-max px-4 py-2 rounded-full text-white enabled:cursor-pointer disabled:opacity-40"
    :class="{
      'bg-primary': variant === 'primary',
      'bg-danger': variant === 'danger',
      'bg-light text-black': variant === 'light',
      'bg-transparent text-gray-500 border border-gray-500': variant === 'transparent',
    }"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";

type ButtonVariantProps = "primary" | "light" | "danger" | "transparent";

export default defineComponent({
  props: {
    variant: {
      type: String as PropType<ButtonVariantProps>,
      default: "primary",
    },
  },
});
</script>
