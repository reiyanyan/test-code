<template>
  <div class="relative flex w-full flex-col gap-2" ref="wrapper">
    <Button
      variant="transparent"
      class="flex items-center rounded-full p-2 border border-gray-400"
      @click="isActive = !isActive"
      data-cy="sort-selection"
    >
      <Icon>{{ whichIcon }}</Icon>
    </Button>
    <div
      v-if="isActive"
      class="absolute bottom-[-1.25rem] z-[60] flex h-max w-max translate-y-full flex-col items-start gap-y-5 rounded-lg bg-slate-200 px-5 py-3 text-black outline backdrop-blur transition-all duration-1000"
      @focusout="isActive = false"
    >
      <div class="w-full text-black">
        <div class="flex w-full flex-col gap-y-2">
          <div
            v-for="(item, index) in options"
            :key="index"
            class="flex flex-row gap-2 items-center"
            @click="handleSelect(item.mode)"
          >
            <Icon>{{ item.icon }}</Icon>
            <p
              class="capitalize transition-color w-full cursor-pointer rounded-md px-5 py-2 duration-200 hover:bg-slate-400 hover:text-slate-600"
              :data-cy="`sort-${item.cy}`"
            >
              {{ whichValue(item.mode) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import Icon from "@/components/icon/Icon.vue";
import { BindingClassPriority } from "@/core/helpers/index";
import { SortingProps } from "@/store/modules/ToDoModule";
import { propsToAttrMap } from "@vue/shared";

type SortingDropdown = {
  icon: string;
  mode: SortingProps;
  cy: string;
};

export default defineComponent({
  components: {
    Icon,
  },
  props: {
    modelValue: {
      type: String as () => SortingProps,
      default: "newer",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const wrapper = ref<HTMLDivElement>();
    const isActive = ref<boolean>(false);
    const options = ref<Array<SortingDropdown>>([
      {
        icon: "update",
        mode: "newer",
        cy: "latest",
      },
      {
        icon: "history",
        mode: "older",
        cy: "oldest",
      },
      {
        icon: "arrow_upward",
        mode: "nameAsc",
        cy: "az",
      },
      {
        icon: "arrow_downward",
        mode: "nameDesc",
        cy: "za",
      },
      {
        icon: "filter_list",
        mode: "default",
        cy: "unfinished",
      },
    ]);

    const whichIcon = computed(() => {
      return options.value.find((val: SortingDropdown) => val.mode === props.modelValue)!.icon;
    });

    const handleSelect = (level: SortingProps) => {
      isActive.value = false;
      emit("update:modelValue", level);
    };

    const whichValue = (level: SortingProps) => {
      if (level === "newer") return "Terbaru";
      if (level === "older") return "Terlama";
      if (level === "nameAsc") return "A-Z";
      if (level === "nameDesc") return "Z-A";
      if (level === "default") return "Belum Selesai";
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
      whichValue,
      whichIcon,
    };
  },
});
</script>
