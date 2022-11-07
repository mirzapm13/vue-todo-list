<script>
import { mapWritableState } from "pinia";
import { useModalStore } from "../stores/modal";
import axios from "axios";

export default {
  props: ["item","idx"],
  data() {
    return {
      checked: this.item.is_active,
      priorColor: {
        "very-high": "red",
        high: "orange",
        normal: "green",
        low: "blue",
        "very-low": "purple",
      },
    };
  },
  computed: {
    ...mapWritableState(useModalStore, [
      "deleteModalState",
      "deletedText",
      "deletedId",
      "addModalState",
      "editedId",
      "editedText",
      "editedStatus",
      "addModalStatus",
    ]),
  },
  methods: {
    deleteItem() {
      this.deleteModalState = true;
      this.deletedText = this.item.title;
      this.deletedId = this.item.id;
    },
    async patchChecked(id) {
      await axios.patch(
        `https://todo.api.devcode.gethired.id/todo-items/${id}`,
        { is_active: this.item.is_active === 0 ? 1 : 0 }
      );
    },
    editItem() {
      this.editedId = this.item.id
      this.editedText = this.item.title
      this.editedStatus = this.item.priority
      this.addModalState = true
      this.addModalStatus="Edit"
    },
  },
};
</script>

<template>
  <div
    class="activity-card flex justify-between bg-white rounded-2xl p-5 shadow-xl"
    :data-cy="`todo-item-${idx}`"
  >
    <div class="activity-body">
      <div class="flex items-center gap-5">
        <input
          type="checkbox"
          true-value="0"
          false-value="1"
          v-model="checked"
          @change="patchChecked(this.item.id)"
        />
        <div
          class="h-3 w-3 border-solid border border-black rounded-full"
          data-cy="todo-item-priority-indicator"
          :class="[`bg-${this.priorColor[this.item.priority]}`]"
        ></div>
        <p
          data-cy="todo-item-title"
          class="text-lg font-bold"
          :class="{ 'line-through': this.checked == 0 }"
        >
          {{ item.title }}
        </p>
        <div
          @click="editItem"
          data-cy="todo-item-edit-button"
          class="bg-[url('../assets/todo-item-edit-button.svg')] w-6 h-6 bg-no-repeat hover:cursor-pointer"
        ></div>
      </div>
    </div>
    <div>
      <img
        class="h-6 w-6 hover:cursor-pointer"
        @click="deleteItem"
        data-cy="todo-item-delete-button"
        src="../assets/trash.png"
        alt="Dltbtn"
      />
    </div>
  </div>
</template>

<style></style>
