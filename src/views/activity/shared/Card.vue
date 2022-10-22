<template>
  <div
    class="flex flex-col justify-between bg-white rounded-md shadow h-[230px] p-5 cursor-pointer"
    v-bind="$attrs"
    @click.self="$emit('detail')"
  >
    <p>{{ item.title }}</p>
    <div class="flex flex-row justify-between items-center text-inactive cursor-default">
      <p class="text-xs">{{ formatTime(item.created_at) }}</p>
      <Icon
        class="cursor-pointer p-1"
        data-cy="activity-delete-item-button"
        @click="isModalDelete = true"
        >delete</Icon
      >
    </div>

    <ModalDelete
      :title="item.title"
      :showing="Boolean(isModalDelete)"
      @close="handlerDeleteClose"
      @delete="handlerDelete"
    />

    <ModalSuccessDelete :showing="isModalSuccessDelete" @close="handlerSuccessDeleteClose" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Icon from "@/components/icon/Icon.vue";
import { ItemActivity } from "@/store/modules/ActivityModule";
import { formatTime } from "@/core/helpers/index";
import ModalDelete from "./ModalDelete.vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import ModalSuccessDelete from "./ModalSuccessDelete.vue";

export default defineComponent({
  inheritAttrs: false,
  components: {
    Icon,
    ModalDelete,
    ModalSuccessDelete,
  },
  props: {
    item: {
      type: Object as () => ItemActivity,
      required: true,
    },
  },
  emits: ["detail"],
  setup(props) {
    const store = useStore();
    const isModalDelete = ref<Boolean>(false);
    const isModalSuccessDelete = ref<Boolean>(false);

    const handlerDelete = () => {
      store
        .dispatch(Actions.DELETE_ACTIVITY_GROUP, props.item.id)
        .then(() => {
          isModalDelete.value = false;
          isModalSuccessDelete.value = true;
        })
        .catch((err) => console.log(err));
    };

    const handlerDeleteClose = () => (isModalDelete.value = false);

    const handlerSuccessDeleteClose = async () => {
      isModalDelete.value = false;
      await store.dispatch(Actions.FETCH_ACTIVITY_GROUPS);
    };

    return {
      formatTime,
      isModalDelete,
      handlerDelete,
      isModalSuccessDelete,
      handlerDeleteClose,
      handlerSuccessDeleteClose,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(#modal__title__wrapper) {
  display: none;
}
</style>