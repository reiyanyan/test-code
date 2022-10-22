<template>
  <Transition name="fade">
    <div
      v-if="showing"
      class="flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 fixed inset-0 w-screen h-screen"
      @click.self="outsideClick ? $emit('close') : () => {}"
    >
      <div
        class="flex flex-col relative max-h-screen w-full max-w-2xl bg-white shadow-lg rounded-lg gap-5"
        v-bind="$attrs"
      >
        <div
          id="modal__title__wrapper"
          class="flex flex-row justify-between px-6 py-4"
          :class="{ 'border-b': title }"
        >
          <p>{{ title }}</p>
          <Icon
            v-if="outsideClick"
            class="text-xl text-gray-500 cursor-pointer"
            @click="$emit('close')"
          >
            close
          </Icon>
        </div>
        <div class="max-h-screen w-full py-4 px-8">
          <slot />
        </div>
        <div v-if="footer" class="px-6 py-4 border-t">
          <slot name="footer" />
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
    title: {
      type: String,
      required: false,
      default: "",
    },
    showing: {
      type: Boolean,
      default: false,
    },
    outsideClick: {
      type: Boolean,
      default: true,
    },
    footer: {
      type: Boolean,
      default: false,
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
