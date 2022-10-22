<template>
  <div
    class="flex flex-row justify-center gap-2 w-max px-4 py-2 rounded-full text-white cursor-pointer"
    :class="{
      'bg-primary': variant === 'primary',
      'bg-danger': variant === 'danger',
      'bg-light text-black': variant === 'light',
    }"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";

type ButtonVariantProps = "primary" | "light" | "danger";

export default defineComponent({
  props: {
    variant: {
      type: String as PropType<ButtonVariantProps>,
      default: "primary",
    },
  },
});
</script>
