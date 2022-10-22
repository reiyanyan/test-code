<template>
  <Transition name="fade">
    <div
      v-if="showing"
      class="flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 fixed inset-0 w-screen h-screen"
      @click.self="outsideClick ? $emit('close') : () => {}"
    >
      <div
        class="flex relative max-h-screen w-full max-w-2xl bg-white shadow-lg rounded-lg p-8"
        v-bind="$attrs"
      >
        <Icon
          v-if="outsideClick"
          class="absolute top-0 right-0 text-xl text-gray-500 my-2 mx-4 cursor-pointer"
          @click="$emit('close')"
        >
          close
        </Icon>
        <div class="overflow-auto max-h-screen w-full">
          <slot />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Icon from "@/components/icon/Icon.vue";

export default defineComponent({
  inheritAttrs: false,
  components: {
    Icon,
  },
  props: {
    showing: {
      type: Boolean,
      default: false,
    },
    outsideClick: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["close"],
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
