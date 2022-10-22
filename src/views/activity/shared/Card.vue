<template>
  <div
    class="flex flex-col justify-between bg-white rounded-md shadow h-[230px] p-5 cursor-pointer"
    v-bind="$attrs"
    @click.self="$emit('detail')"
  >
    <p>{{ item.title }}</p>
    <div class="flex flex-row justify-between items-center text-inactive">
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
      @close="handlerClose"
      @delete="handlerDelete"
    />
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

export default defineComponent({
  inheritAttrs: false,
  components: {
    Icon,
    ModalDelete,
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

    const handlerClose = () => {
      isModalDelete.value = false;
    };

    const handlerDelete = async () => {
      await store
        .dispatch(Actions.DELETE_ACTIVITY_GROUP, props.item.id)
        .then(() => (isModalDelete.value = false))
        .catch((err) => console.log(err));

      await store.dispatch(Actions.FETCH_ACTIVITY_GROUPS);
    };

    return {
      formatTime,
      handlerClose,
      isModalDelete,
      handlerDelete,
    };
  },
});
</script>
