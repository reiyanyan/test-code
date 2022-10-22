<template>
  <Modal :outside-click="false" class="w-[490px]" @close="$emit('close')">
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
        <b>{{ `"${title}"?` }}</b>
      </p>
      <div class="flex flex-row justify-between w-full gap-5">
        <Button class="w-full" variant="light" @click="$emit('close')">Close</Button>
        <Button class="w-full" variant="danger" @click="$emit('delete')">Delete</Button>
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
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  emits: ["close", "delete"],
});
</script>
