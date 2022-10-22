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

<script setup lang="ts">
type ButtonVariantProps = "primary" | "light" | "danger";
interface Props {
  variant: ButtonVariantProps;
}

withDefaults(defineProps<Props>(), {
  variant: "primary",
});
</script>
