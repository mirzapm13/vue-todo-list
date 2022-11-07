<script>

import { mapWritableState } from "pinia";
import { useModalStore } from "../stores/modal";

export default {
  props: ["title", "date", "id", "idx"],
  emits: ["deleteActivity"],
  computed: {
    formatDate() {
      let formatted = new Date(this.date)
      return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(formatted)
    },
    ...mapWritableState(useModalStore, ["deleteModalState","deletedText","deletedId"]),
  },
  methods:{
    toDetail(){
      this.$router.push(`/detail/${this.id}`)
    },
    deleteItem(){
      this.deleteModalState=true
      this.deletedText=this.title 
      this.deletedId = this.id
    }
  },
}
</script>

<template>
  <div class="activity-card bg-white rounded-2xl p-5 shadow-xl" :data-cy="`activity-item-${idx}`">
    <div class="activity-body h-40 hover:cursor-pointer" @click="toDetail">
      <p data-cy="activity-item-title" class="text-lg font-bold">
        {{ title }}
      </p>
    </div>

    <div class="activity-footer flex justify-between">
      <span data-cy="activity-item-date">{{ formatDate }}</span>
      <img class="h-6 w-6 hover:cursor-pointer" @click="deleteItem"
        data-cy="activity-item-delete-button" src="../assets/trash.png" alt="Dltbtn" />
    </div>
  </div>
</template>

<style>

</style>