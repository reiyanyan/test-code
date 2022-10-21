<template>
  <div class="container flex flex-col gap-4">
    <div class="flex flex-row justify-between w-full items-center my-3">
      <p class="text-xl font-bold">Activity</p>
      <Button data-cy="activity-add-button" @click="handlerClick">
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
    <div v-else>
      <p>ada isi</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Button from "@/components/button/Button.vue";
import Icon from "@/components/icon/Index.vue";

export default defineComponent({
  components: {
    Button,
    Icon,
  },
  setup() {
    const listData = ref<Array<unknown>>([]);

    const handlerClick = () => {
      console.log("hai rei");
    };

    return {
      handlerClick,
      listData,
    };
  },
});
</script>
