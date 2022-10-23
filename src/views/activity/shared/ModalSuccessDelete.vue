<template>
  <Modal :outside-click="true" class="w-[490px]" v-bind="$attrs" data-cy="modal-information">
    <div class="flex flex-row gap-3">
      <Icon data-cy="modal-information-icon">info</Icon>
      <p data-cy="modal-information-title">Activity berhasil dihapus</p>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Modal from "@/components/modal/Modal.vue";
import Icon from "@/components/icon/Icon.vue";

export default defineComponent({
  components: {
    Modal,
    Icon,
  },
  setup() {},
});
</script>
