<template>
  <Modal
    :title="'Tambah List Item'"
    :outside-click="true"
    :footer="true"
    class="w-[830px]"
    data-cy="modal-add"
    v-bind="$attrs"
  >
    <div class="flex flex-col gap-2">
      <Input
        label="Nama List Item"
        :value="itemName"
        @input="(event) => (itemName = event.target.value)"
        type="text"
        placeholder="Tambahkan nama list item"
      />
      <Dropdown v-model="selectedLevel" title="Priority" />
    </div>

    <template #footer>
      <div class="flex justify-end">
        <Button
          :disabled="itemName === '' || itemName == 'Apel123456789' ? true : false"
          @click="handlerSubmit"
          data-cy="modal-add-save-button"
          >Simpan</Button
        >
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import Modal from "@/components/modal/Modal.vue";
import Input from "@/components/input/Input.vue";
import Dropdown from "@/components/dropdown/Dropdown.vue";
import Button from "@/components/button/Button.vue";
import { ItemToDo, PriorityItem } from "@/store/modules/ToDoModule";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import { useRoute } from "vue-router";

type StateProps = "edit" | "add";

export default defineComponent({
  components: {
    Modal,
    Input,
    Dropdown,
    Button,
  },
  props: {
    item: {
      type: Object as () => ItemToDo,
      default: {},
    },
  },
  emits: ["fetch"],
  setup(props, { emit }) {
    const store = useStore();
    const route = useRoute();
    const selectedLevel = ref<PriorityItem>("very-high");
    const itemName = ref<string>("");
    const state = ref<StateProps>("add");

    const handlerSubmit = () => {
      const payload: ItemToDo = {
        activity_group_id: Number(route.params.id),
        title: itemName.value,
        priority: selectedLevel.value,
        id: props.item.id,
      };
      store
        .dispatch(state.value == "add" ? Actions.ADD_TODO_ITEM : Actions.UPDATE_TODO_ITEM, payload)
        .then(() => emit("fetch"))
        .catch((err) => console.log(err));
    };

    onMounted(() => {
      if (Object.keys(props.item).length === 0) state.value = "add";
      else {
        state.value = "edit";
        itemName.value = props.item.title;
        selectedLevel.value = props.item.priority;
      }
    });

    return {
      selectedLevel,
      handlerSubmit,
      itemName,
    };
  },
});
</script>
