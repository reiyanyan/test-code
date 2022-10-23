<template>
  <div class="flex flex-row gap-4 items-center" ref="wrapper">
    <p v-if="!isEditable" class="text-3xl font-bold" data-cy="todo-title" @click="toggleEditable">
      {{ modelValue }}
    </p>
    <Input
      v-else
      :value="modelValue"
      @input="(event) => $emit('update:modelValue', event.target.value)"
      class="border-0 bg-transparent !p-0 font-bold text-3xl"
      :flat="true"
    />
    <Icon
      class="text-gray-400 cursor-pointer"
      @click="toggleEditable"
      data-cy="todo-title-edit-button"
      >edit</Icon
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import Icon from "@/components/icon/Icon.vue";
import Input from "@/components/input/Input.vue";

export default defineComponent({
  components: {
    Icon,
    Input,
  },
  props: {
    modelValue: {
      type: String,
      default: null,
    },
  },
  emits: ["update", "update:modelValue"],
  setup(props, { emit }) {
    const wrapper = ref<HTMLDivElement>();
    const isEditable = ref<boolean>(false);
    // const inputModel = ref<string | undefined>(props.);

    const toggleEditable = () => (isEditable.value = !isEditable.value);

    watch(
      () => isEditable.value,
      (val) => {
        if (!val) {
          // console.log(inputModel.value);
          emit("update");
        }
      }
    );

    onMounted(() => {
      ["mousedown", "touchstart"].forEach((evtName: string) =>
        document.addEventListener(evtName, (e: Event) => {
          if (wrapper.value && !wrapper.value.contains(e.target as Node)) isEditable.value = false;
        })
      );
    });

    return {
      isEditable,
      toggleEditable,
      wrapper,
      // inputModel,
    };
  },
});
</script>
