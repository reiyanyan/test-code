<template>
  <div class="relative flex w-full flex-col gap-2">
    <p class="pl-3">{{ title }}</p>
    <button
      class="flex w-full flex-row justify-between rounded-lg px-5 py-4 text-white"
      :class="{
        'border-none ring-2 ring-blue-600 text-slate-900 bg-gray-200': isActive,
        'text-slate-900 border border-gray-500': !isActive,
      }"
      @click="isActive = !isActive"
    >
      <p class="capitalize">
        {{ title }}
      </p>
      <Icon class="transition-transform duration-300" :class="{ 'rotate-180': isActive }">
        expand_more
      </Icon>
    </button>
    <div
      v-if="isActive"
      class="absolute bottom-[-1.25rem] z-[60] flex h-max w-full translate-y-full flex-col items-start gap-y-5 rounded-lg bg-slate-200 px-5 py-3 text-black outline backdrop-blur transition-all duration-1000"
    >
      <div class="w-full text-black">
        <div class="mt-5 flex w-full flex-col gap-y-2 px-5">
          <div
            v-for="item in [0, 1, 2, 3, 4, 5]"
            :key="item"
            class="flex flex-row gap-2 items-center"
          >
            <div class="h-3.5 w-3.5 rounded-full bg-green-500"></div>
            <p
              class="transition-color w-full cursor-pointer rounded-md px-5 py-2 duration-200 hover:bg-slate-400 hover:text-slate-600"
            >
              {{ item }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Icon from "@/components/icon/Icon.vue";

export default defineComponent({
  components: {
    Icon,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    const isActive = ref<boolean>(false);

    return {
      isActive,
    };
  },
});
</script>
