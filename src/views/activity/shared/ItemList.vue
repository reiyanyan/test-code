<template>
  <div class="flex flex-row justify-between items-center bg-white p-4 rounded-lg shadow">
    <div class="flex flex-row gap-3 items-center">
      <input
        class="form-check-input appearance-none h-4 w-4 border border-inactive rounded-sm bg-white focus:ring-primary focus:bg-primary focus:border-primary focus:checked:bg-primary checked:bg-primary checked:border-primary focus:outline-none transition duration-200 cursor-pointer"
        type="checkbox"
        value=""
      />
      <div class="h-3 w-3 rounded-full" :class="BindingClassPriority(item.priority)"></div>
      <label>{{ item.title }}</label>
      <Icon class="cursor-pointer p-1 text-inactive text-sm" @click="isModalForm = true">edit</Icon>
    </div>
    <Icon class="cursor-pointer p-1 text-inactive" @click="isModalDelete = true">delete</Icon>

    <ModalDelete
      :title="item.title"
      :showing="Boolean(isModalDelete)"
      @close="handlerDeleteClose"
      @delete="handlerDelete"
    ></ModalDelete>

    <ModalForm
      :item="item"
      :showing="Boolean(isModalForm)"
      @close="handlerCloseForm"
      @fetch="handlerFetchModalForm"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Icon from "@/components/icon/Icon.vue";
import { ItemToDo } from "@/store/modules/ToDoModule";
import { BindingClassPriority } from "@/core/helpers/index";
import ModalDelete from "./ModalDelete.vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import ModalForm from "./ModalForm.vue";

export default defineComponent({
  components: {
    Icon,
    ModalDelete,
    ModalForm,
  },
  props: {
    item: {
      type: Object as () => ItemToDo,
      required: true,
    },
  },
  emits: ["fetch"],
  setup(props, { emit }) {
    const store = useStore();
    const isModalDelete = ref<boolean>(false);
    const isModalForm = ref<boolean>(false);

    const handlerDelete = () => {
      store
        .dispatch(Actions.DELETE_TODO_ITEM, props.item.id)
        .then(() => {
          isModalDelete.value = false;
          emit("fetch");
        })
        .catch((err) => console.log(err));
    };

    const handlerDeleteClose = () => (isModalDelete.value = false);
    const handlerCloseForm = () => (isModalForm.value = false);

    const handlerFetchModalForm = () => {
      emit("fetch");
      handlerCloseForm();
    };

    return {
      BindingClassPriority,
      handlerDelete,
      handlerDeleteClose,
      isModalDelete,
      isModalForm,
      handlerCloseForm,
      handlerFetchModalForm,
    };
  },
});
</script>
