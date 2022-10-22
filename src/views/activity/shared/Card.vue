<template>
  <div
    class="flex flex-col justify-between bg-white rounded-md shadow h-[230px] p-5"
    v-bind="$attrs"
  >
    <p>Title</p>
    <div class="flex flex-row justify-between items-center text-inactive">
      <p class="text-xs">10 Oktober 2022</p>
      <Icon class="cursor-pointer p-1" data-cy="activity-delete-item-button">delete</Icon>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Icon from "@/components/icon/Icon.vue";

export default defineComponent({
  inheritAttrs: false,
  components: {
    Icon,
  },
  setup() {},
});
</script>
