<template>
  <Modal
    :title="'Tambah List Item'"
    :outside-click="true"
    :footer="true"
    class="w-[830px]"
    v-bind="$attrs"
  >
    <div class="flex flex-col gap-2">
      <Input label="Label Here" type="text" placeholder="Label ku" />
      <Dropdown title="Dropdown" />
    </div>

    <template #footer>
      <div class="flex justify-end">
        <Button>Test</Button>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Modal from "@/components/modal/Modal.vue";
import Input from "@/components/input/Input.vue";
import Dropdown from "@/components/dropdown/Dropdown.vue";
import Button from "@/components/button/Button.vue";

export default defineComponent({
  components: {
    Modal,
    Input,
    Dropdown,
    Button,
  },
});
</script>
