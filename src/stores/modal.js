import { defineStore } from "pinia";
import axios from "axios";

export const useModalStore = defineStore("modal", {
  state() {
    return {
      deletedId: "",
      deletedText: "",
      editedId: "",
      editedText: "",
      editedStatus:"very-high",
      addModalStatus:"Add",
      addModalState:false,
      deleteModalState: false,
      alertModalState: false,
    };
  },
  actions: {
    async deleteActivity(id) {
      try {
        await axios.delete(
          `https://todo.api.devcode.gethired.id/activity-groups/${id}`
        );
      } catch (error) {
        console.log(error);
      }
    },
  },
});
