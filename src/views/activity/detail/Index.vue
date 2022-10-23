<template>
  <div class="container flex flex-col gap-4">
    <div class="flex flex-row justify-between w-full items-center my-5">
      <div class="flex flex-row gap-2 items-center">
        <Icon class="cursor-pointer" @click="$router.back()" data-cy="todo-back-button"
          >arrow_back_ios_new</Icon
        >
        <EditableTitle v-model="titleActivity" @update="handlerUpdateTitle" />
      </div>
      <div class="flex flex-row gap-2 items-center">
        <DropdownSorting v-model="selectedSorting" data-cy="todo-sort-button"></DropdownSorting>
        <Button @click="handleShowModalForm" data-cy="todo-add-button">
          <Icon>add</Icon>
          Tambah
        </Button>
      </div>
    </div>
    <div v-if="isLoading">
      <p>Loading ...</p>
    </div>
    <div
      v-else-if="!isLoading && todoItems.length == 0"
      class="flex flex-row justify-center w-full"
    >
      <img
        class="cursor-pointer"
        src="@/assets/img/todo-empty-state.svg"
        alt=""
        width="767"
        height="490"
        data-cy="todo-empty-state"
        @click="handleShowModalForm"
      />
    </div>
    <div v-else class="flex flex-col gap-5">
      <ItemList
        v-for="(item, index) in todoItems"
        :key="index"
        :item="item"
        @fetch="getData"
        data-cy="todo-item"
      />
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
import { ItemToDo, SortingProps } from "@/store/modules/ToDoModule";
import { useRoute } from "vue-router";
import { ItemActivity } from "@/store/modules/ActivityModule";
import DropdownSorting from "@/components/dropdown/DropdownSorting.vue";

export default defineComponent({
  components: {
    Button,
    ModalForm,
    Icon,
    EditableTitle,
    ItemList,
    DropdownSorting,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const titleActivity = ref<string>("");
    const isModalForm = ref<boolean>(false);
    const selectedSorting = ref<SortingProps>("default");
    const isLoading = ref<boolean>(false);

    const todoItems = computed<Array<ItemToDo>>({
      get: () => store.getters.getTodoItems,
      set: (value) => value,
    });

    const handlerCloseForm = () => {
      isModalForm.value = false;
    };

    const getInfoActivity = () => {
      isLoading.value = true;
      store
        .dispatch(Actions.INFO_ACTIVITY_GROUP, route.params.id)
        .then(({ title }: ItemActivity) => {
          isLoading.value = false;
          titleActivity.value = title;
          getData();
        })
        .catch((err) => console.log(err));
    };

    const getData = () => {
      isLoading.value = true;
      isModalForm.value = false;
      store
        .dispatch(Actions.FETCH_TODO_ITEMS, route.params.id)
        .then(() => (isLoading.value = false))
        .catch((err) => console.log(err));
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

    watch(
      () => selectedSorting.value,
      (val) => {
        if (val === "newer") {
          todoItems.value = store.getters.getTodoItems;
        }
        if (val === "older") {
          todoItems.value = store.getters.getTodoItems.reverse();
        }
        if (val === "nameAsc") {
          todoItems.value = store.getters.getTodoItems.sort((first: ItemToDo, second: ItemToDo) => {
            if (first.title < second.title) return -1;
            if (first.title > second.title) return 1;
            return 0;
          });
        }
        if (val === "nameDesc") {
          todoItems.value = store.getters.getTodoItems.sort((first: ItemToDo, second: ItemToDo) => {
            if (first.title < second.title) return 1;
            if (first.title > second.title) return -1;
            return 0;
          });
        }
        if (val === "default") {
          todoItems.value = store.getters.getTodoItems;
        }
      }
    );

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
      selectedSorting,
      isLoading,
    };
  },
});
</script>
