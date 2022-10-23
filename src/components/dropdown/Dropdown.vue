<template>
  <div
    class="relative flex w-full flex-col gap-2"
    ref="wrapper"
    data-cy="modal-add-priority-dropdown"
  >
    <p class="pl-3" data-cy="modal-add-priority-title">{{ title }}</p>
    <button
      class="flex w-full flex-row justify-between rounded-lg px-5 py-4 text-white"
      :class="{
        'border-none ring-2 ring-blue-600 text-slate-900 bg-gray-200': isActive,
        'text-slate-900 border border-gray-500': !isActive,
      }"
      :data-cy="`modal-add-priority-item${isActive ? 'a' : ''}`"
      @click="isActive = !isActive"
    >
      <div class="flex flex-row gap-2 items-center">
        <div class="h-3.5 w-3.5 rounded-full" :class="BindingClassPriority(modelValue)"></div>
        <p class="capitalize">
          {{ String(modelValue === "normal" ? "medium" : modelValue).replaceAll("-", " ") }}
        </p>
      </div>
      <Icon class="transition-transform duration-300" :class="{ 'rotate-180': isActive }">
        expand_more
      </Icon>
    </button>
    <div
      v-if="isActive"
      class="absolute bottom-[-1.25rem] z-[60] flex h-max w-full translate-y-full flex-col items-start gap-y-5 rounded-lg bg-slate-200 px-5 py-3 text-black outline backdrop-blur transition-all duration-1000"
      @focusout="isActive = false"
    >
      <div class="w-full text-black">
        <div class="flex w-full flex-col gap-y-2 px-5">
          <div
            v-for="item in options"
            :key="item"
            class="flex flex-row gap-2 items-center"
            :data-cy="`modal-add-priority-item`"
            @click="handleSelect(item)"
          >
            <div class="h-3.5 w-3.5 rounded-full" :class="BindingClassPriority(item)"></div>
            <p
              class="capitalize transition-color w-full cursor-pointer rounded-md px-5 py-2 duration-200 hover:bg-slate-400 hover:text-slate-600"
            >
              {{ String(item).replaceAll("-", " ") }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Icon from "@/components/icon/Icon.vue";
import { PriorityItem } from "@/store/modules/ToDoModule";
import { BindingClassPriority } from "@/core/helpers/index";

export default defineComponent({
  components: {
    Icon,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String as () => PriorityItem,
      default: "very-high",
    },
  },
  emits: ["update:modelValue"],
  setup(_, { emit }) {
    const wrapper = ref<HTMLDivElement>();
    const isActive = ref<boolean>(false);
    const options = ref<Array<PriorityItem>>(["very-high", "high", "normal", "low", "very-low"]);

    const handleSelect = (level: PriorityItem) => {
      emit("update:modelValue", level);
      isActive.value = false;
    };

    onMounted(() => {
      ["mousedown", "touchstart"].forEach((evtName: string) =>
        document.addEventListener(evtName, (e: Event) => {
          if (wrapper.value && !wrapper.value.contains(e.target as Node)) isActive.value = false;
        })
      );
    });

    return {
      isActive,
      handleSelect,
      wrapper,
      options,
      BindingClassPriority,
    };
  },
});
</script>
