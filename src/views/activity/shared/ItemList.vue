<template>
  <div class="flex flex-row justify-between items-center bg-white p-4 rounded-lg shadow">
    <div class="flex flex-row gap-3 items-center">
      <input
        class="form-check-input appearance-none h-4 w-4 border border-inactive rounded-sm bg-white focus:ring-primary focus:bg-primary focus:border-primary focus:checked:bg-primary checked:bg-primary checked:border-primary focus:outline-none transition duration-200 cursor-pointer"
        type="checkbox"
        :value="`checked-${item.id}`"
        data-cy="todo-item-checkbox"
        @change="handleCheck"
        :checked="item.is_active == 0 ? true : false"
      />
      <div
        class="h-3 w-3 rounded-full"
        :class="BindingClassPriority(item.priority)"
        data-cy="todo-item-priority-indicator"
      ></div>
      <label :class="{ 'line-through': !item.is_active }" data-cy="todo-item-title">{{
        item.title
      }}</label>
      <Icon
        class="cursor-pointer p-1 text-inactive text-sm"
        @click="isModalForm = true"
        data-cy="todo-item-edit-button"
        >edit</Icon
      >
    </div>
    <Icon
      class="cursor-pointer p-1 text-inactive"
      @click="isModalDelete = true"
      data-cy="todo-item-delete-button"
      >delete</Icon
    >
    <div data-cy="modal-delete" class="hidden"></div>

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

    <ModalSuccessDelete :showing="isModalSuccessDelete" @close="handlerSuccessDeleteClose" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import Icon from "@/components/icon/Icon.vue";
import { ItemToDo } from "@/store/modules/ToDoModule";
import { BindingClassPriority } from "@/core/helpers/index";
import ModalDelete from "./ModalDelete.vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import ModalForm from "./ModalForm.vue";
import ModalSuccessDelete from "./ModalSuccessDelete.vue";

export default defineComponent({
  components: {
    Icon,
    ModalDelete,
    ModalForm,
    ModalSuccessDelete,
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
    const isModalSuccessDelete = ref<boolean>(false);
    const isModalForm = ref<boolean>(false);

    const handlerDelete = () => {
      store
        .dispatch(Actions.DELETE_TODO_ITEM, props.item.id)
        .then(() => {
          isModalSuccessDelete.value = true;
          isModalDelete.value = false;
        })
        .catch((err) => console.log(err));
    };

    const handlerDeleteClose = () => (isModalDelete.value = false);
    const handlerCloseForm = () => (isModalForm.value = false);
    const handlerSuccessDeleteClose = () => {
      isModalSuccessDelete.value = false;
      emit("fetch");
    };

    const handlerFetchModalForm = () => {
      emit("fetch");
      handlerCloseForm();
    };

    const handleCheck = async () => {
      await store.dispatch(Actions.UPDATE_STATUS_TODO_ITEM, {
        id: props.item.id,
        is_active: props.item.is_active ? 0 : 1,
      });
      emit("fetch");
    };

    watch(
      () => isModalSuccessDelete.value,
      (val) => {
        console.log("val", val);
      }
    );

    return {
      BindingClassPriority,
      handlerDelete,
      handlerDeleteClose,
      isModalDelete,
      isModalForm,
      handlerCloseForm,
      handlerFetchModalForm,
      handleCheck,
      isModalSuccessDelete,
      handlerSuccessDeleteClose,
    };
  },
});
</script>
