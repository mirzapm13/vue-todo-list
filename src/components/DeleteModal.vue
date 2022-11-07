<script>
import { mapWritableState } from "pinia";
import { useModalStore } from "../stores/modal";

export default {
  data() {
    return {};
  },
  emits: ["deleteActivity"],
  computed: {
    ...mapWritableState(useModalStore, [
      "deleteModalState",
      "deletedText",
      "deletedId",
      "alertModalState"
    ]),
  },
  methods: {
    deleteItem() {
      this.$emit("deleteActivity", this.deletedId)
      this.deleteModalState = false
      if(this.$route.path=='/'){
          this.alertModalState = true
      }
    },
  },
};
</script>

<template>
  <v-dialog
    v-model="deleteModalState"
    activator=".dlt-button"
    transition="none"
    data-cy="modal-delete"
  >
    <div class="relative mx-auto w-full max-w-lg">
      <div class="bg-white w-full rounded rounded-xl shadow-2xl flex flex-col">
        <div class="modal-header flex justify-center items-center py-6 px-7">
          <h2 class="text-xl text-center" data-cy="modal-delete-title">
            Apakah anda yakin ingin menghapus activity "<span
              class="font-bold"
              >{{ this.deletedText }}</span
            >"?
          </h2>
        </div>
        <div
          class="modal-footer flex justify-center gap-4 items-center px-7 pb-6"
        >
          <button
          data-cy="modal-delete-cancel-button"
            class="text-xl bg-gray-200 text-gray-800 font-semibold py-3 px-7 rounded-full"
            @click="this.deleteModalState=false"
          >
            Batal
          </button>
          <button
            data-cy="modal-delete-confirm-button"
            class="text-xl bg-red-400 text-white font-semibold py-3 px-7 rounded-full"
            @click="deleteItem"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<style></style>
