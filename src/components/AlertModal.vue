<script>
import { mapWritableState } from "pinia";
import { useModalStore } from "../stores/modal";

export default {
   computed:{
    ...mapWritableState(useModalStore, [
      "alertModalState"
    ]),
   }
}
</script>

<template>
    <v-dialog
    v-model="alertModalState"
    transition="none"
    data-cy="modal-infromation"
  >
    <div class="relative mx-auto w-full max-w-lg">
      <div class="bg-white w-full rounded rounded-xl shadow-2xl flex flex-col">
        <div class="modal-header py-3 px-7">
          <h2 data-cy="modal-information-title">
            Activity berhasil dihapus
          </h2>
        </div>
      </div>
    </div>
    </v-dialog>
</template>

<style>

</style>