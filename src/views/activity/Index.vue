<template>
  <div class="container flex flex-col gap-4">
    <div class="flex flex-row justify-between w-full items-center my-5">
      <p class="text-xl font-bold">Activity</p>
      <Button @click="handlerAddActivity" data-cy="activity-add-button">
        <Icon>add</Icon>
        Tambah
      </Button>
    </div>
    <div v-if="isLoading">
      <p>Loading ...</p>
    </div>
    <div v-else-if="!isLoading && listData.length == 0" class="flex">
      <div class="flex flex-row justify-center w-full">
        <img
          src="@/assets/img/activity-empty-state.svg"
          alt=""
          width="767"
          height="490"
          data-cy="activity-empty-state"
        />
      </div>
    </div>
    <div v-else class="grid grid-cols-4 gap-7">
      <Card
        v-for="item in listData"
        :key="item.id"
        :item="item"
        @detail="handlerDetail(item.id)"
        @fetch="getData"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import Button from "@/components/button/Button.vue";
import Icon from "@/components/icon/Icon.vue";
import Card from "./shared/Card.vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import { ItemActivity } from "@/store/modules/ActivityModule";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    Button,
    Icon,
    Card,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const isModalDelete = ref<Boolean>(false);
    const isLoading = ref<Boolean>(false);
    const listData = computed((): Array<ItemActivity> => store.getters.getDataActivityGroups);

    const handlerAddActivity = async () => {
      await store.dispatch(Actions.ADD_ACTIVITY_GROUP);
      getData();
    };

    const handlerClose = () => {
      isModalDelete.value = false;
    };

    const handlerDetail = (id: number) => {
      router.push({
        name: "ActivityDetail",
        params: {
          id,
        },
      });
    };

    const getData = async () => {
      isLoading.value = true;
      await store
        .dispatch(Actions.FETCH_ACTIVITY_GROUPS)
        // .then(() => setTimeout(() => (isLoading.value = false), 1000)) // mock time
        .then(() => (isLoading.value = false))
        .catch((err) => console.log(err));
    };

    onMounted(() => {
      getData();
    });

    return {
      handlerAddActivity,
      listData,
      isModalDelete,
      handlerClose,
      isLoading,
      handlerDetail,
      getData,
    };
  },
});
</script>
