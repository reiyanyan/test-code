<template>
  <div class="container flex flex-col gap-4">
    <div class="flex flex-row justify-between w-full items-center my-5">
      <div class="flex flex-row gap-2 items-center">
        <Icon class="cursor-pointer" @click="$router.back()">arrow_back_ios_new</Icon>
        <EditableTitle v-model="titleActivity" @update="handlerUpdateTitle" />
      </div>
      <div class="flex flex-row gap-2 items-center">
        <Button variant="transparent" class="px-2">
          <Icon>filter_list</Icon>
        </Button>
        <Button @click="handleShowModalForm">
          <Icon>add</Icon>
          Tambah
        </Button>
      </div>
    </div>
    <div class="flex flex-col gap-5">
      <ItemList v-for="item in todoItems" :key="item.id" :item="item" @fetch="getData" />
    </div>

    <ModalForm :showing="Boolean(isModalForm)" @close="handlerCloseForm" @fetch="getData" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref, watch } from "vue";
import Button from "@/components/button/Button.vue";
import ModalForm from "../shared/ModalForm.vue";
import Icon from "@/components/icon/Icon.vue";
import EditableTitle from "../shared/EditableTitle.vue";
import ItemList from "../shared/ItemList.vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import { ItemToDo } from "@/store/modules/ToDoModule";
import { useRoute } from "vue-router";
import { ItemActivity } from "@/store/modules/ActivityModule";

export default defineComponent({
  components: {
    Button,
    ModalForm,
    Icon,
    EditableTitle,
    ItemList,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const titleActivity = ref<string>("");
    const isModalForm = ref<boolean>(false);

    const todoItems = computed((): Array<ItemToDo> => store.getters.getTodoItems);

    const handlerCloseForm = () => {
      isModalForm.value = false;
    };

    const getInfoActivity = () => {
      store
        .dispatch(Actions.INFO_ACTIVITY_GROUP, route.params.id)
        .then(({ title }: ItemActivity) => {
          titleActivity.value = title;
          getData();
        })
        .catch((err) => console.log(err));
    };

    const getData = () => {
      isModalForm.value = false;
      store.dispatch(Actions.FETCH_TODO_ITEMS, route.params.id).catch((err) => console.log(err));
    };

    const handlerUpdateTitle = async () => {
      await store.dispatch(Actions.UPDATE_ACTIVITY_GROUP, {
        id: route.params.id,
        title: titleActivity.value,
      });
      getInfoActivity();
    };

    const handleShowModalForm = () => {
      isModalForm.value = true;
    };

    onMounted(() => {
      getInfoActivity();
    });

    return {
      handlerCloseForm,
      todoItems,
      getData,
      handlerUpdateTitle,
      titleActivity,
      isModalForm,
      handleShowModalForm,
    };
  },
});
</script>
