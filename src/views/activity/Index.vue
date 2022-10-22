<template>
  <div class="container flex flex-col gap-4">
    <div class="flex flex-row justify-between w-full items-center my-3">
      <p class="text-xl font-bold">Activity</p>
      <Button @click="handlerClick" data-cy="activity-add-button">
        <Icon>add</Icon>
        Tambah
      </Button>
    </div>
    <div v-if="listData.length == 0" class="flex">
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
      <Card />
    </div>

    <!-- Modal -->
    <ModalDelete :showing="Boolean(isModalDelete)" @close="handlerClose" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Button from "@/components/button/Button.vue";
import Icon from "@/components/icon/Icon.vue";
import Card from "./shared/Card.vue";
import ModalDelete from "./shared/ModalDelete.vue";

export default defineComponent({
  components: {
    Button,
    Icon,
    Card,
    ModalDelete,
  },
  setup() {
    const isModalDelete = ref<Boolean>(true);

    const listData = ref<Array<unknown>>([
      {
        title: "hai",
      },
    ]);

    const handlerClick = () => {
      isModalDelete.value = true;
    };

    const handlerClose = () => {
      isModalDelete.value = false;
      console.log("hai");
    };

    return {
      handlerClick,
      listData,
      isModalDelete,
      handlerClose,
    };
  },
});
</script>
