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
    class="w-full max-w-4xl"
    v-model="alertModalState"
    transition="none"
    data-cy="modal-information"
  >
      <div
      @click="this.alertModalState=false"
      class="bg-white w-full rounded rounded-xl shadow-2xl flex flex-col">
        <div class="modal-header py-3 px-7">
          <h2 data-cy="modal-information-title">
            Activity berhasil dihapus
          </h2>
        </div>
      </div>
    </v-dialog>
</template>

<style>

</style>