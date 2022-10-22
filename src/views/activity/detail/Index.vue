<template>
  <div class="container">
    <Button :variant="'danger'">hehe</Button>

    <ModalForm :showing="Boolean(true)" @close="handlerClose" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "@/components/button/Button.vue";
import ModalForm from "./ModalForm.vue";

export default defineComponent({
  components: {
    Button,
    ModalForm,
  },
  setup() {
    const handlerClose = () => {
      console.log("hai");
    };

    return {
      handlerClose,
    };
  },
});
</script>
