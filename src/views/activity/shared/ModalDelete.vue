<template>
  <Modal :outside-click="true" class="w-[490px]" v-bind="$attrs">
    <div class="flex flex-col items-center text-center gap-8">
      <img
        src="@/assets/icons/outlined/modal-delete-icon.svg"
        height="84"
        width="84"
        alt="delete_icon"
      />
      <p>
        Apakah anda yakin menghapus activity
        <br />
        <b>"Meeting dengan client"?</b>
      </p>
      <div class="flex flex-row justify-between w-full gap-5">
        <Button class="w-full" variant="light">Close</Button>
        <Button class="w-full" variant="danger">Delete</Button>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Modal from "@/components/modal/Modal.vue";
import Button from "@/components/button/Button.vue";

export default defineComponent({
  components: {
    Modal,
    Button,
  },
});
</script>
