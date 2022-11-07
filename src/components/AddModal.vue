<script>
import axios from 'axios';
import { mapWritableState } from "pinia";
import { useModalStore } from "../stores/modal";

export default {
  props: ['id'],
  emits:["getActivityDetail"],
  data() {
    return {
      items: [
        {
          text: 'Very High',
          value: 'very-high',
          color: "#F2F2F2"
        },
        {
          text: 'High',
          value: 'high',
          color: "#F8A541",
        },
        {
          text: 'Medium',
          value: 'normal',
          color: "#00A790",
        },
        {
          text: 'Low',
          value: 'low',
          color: "#428BC1",
        },
        {
          text: 'Very Low',
          value: 'very-low',
          color: "#8942C1"
        }
      ],
    };
  },
  methods: {
    async createTodo() {
      console.log(this.id, this.editedText, this.editedStatus);
      try {
        await axios.post('https://todo.api.devcode.gethired.id/todo-items', {
          "activity_group_id": this.id,
          "title": this.editedText,
          "priority": this.editedStatus
        })
        this.addModalState=false
        this.editedStatus='very-high'
        this.editedText=''
      } catch (error) {
        console.log(error);
      }

      this.$emit("getActivityDetail")
      this.show=false
    },
    async editTodo(){
      try {
        await axios.patch(`https://todo.api.devcode.gethired.id/todo-items/${this.editedId}`, {
          "title": this.editedText,
          "priority": this.editedStatus
        })
        this.addModalState=false
        this.editedStatus='very-high'
        this.editedText=''
      } catch (error) {
        console.log(error);
      }

      this.$emit("getActivityDetail")
      this.show=false
    },
    clickSubmit(){
      if(this.addModalStatus == "Add"){
        this.createTodo()
      } else {
        this.editTodo()
      }
    }
  },
  computed:{
    ...mapWritableState(useModalStore, ["deleteModalState","deletedText","deletedId","addModalState","editedId","editedText","editedStatus",'addModalStatus']),
  }
};
</script>

<template>
  <v-dialog v-model="this.addModalState" activator="#add-mdl-button" transition="none">
    <div class="relative mx-auto w-full max-w-4xl">
      <div class="bg-white w-full max-w-screen-lg rounded rounded-xl shadow-2xl flex flex-col">
        <div class="modal-header flex justify-between items-center py-6 px-7">
          <h2
          data-cy="modal-add-title"
           class="font-bold">Tambah List Item</h2>
          <img data-cy="modal-add-close-button" @click="this.addModalState = false" class="h-5 w-5 hover:cursor-pointer" src="../assets/modal-add-close-button.png" />
        </div>
        <hr />
        <div class="modal-body flex flex-col py-6 px-7">
          <div class="mb-4">
            <label
            data-cy="modal-add-name-title"
             class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="username">
              NAMA LIST ITEM
            </label>
            <v-text-field
            data-cy="modal-add-name-input"
            v-model="this.editedText" density="comfortable" placeholder="Tambahkan Nama Activity"
              variant="solo"></v-text-field>
          </div>
          <div>
            <label
            data-cy="modal-add-priority-title"
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="username">
              PRIORITY
            </label>
            <select class="w-44" v-model="this.editedStatus" data-cy="modal-add-priority-dropdown">
              <option v-for="(item,id) in items" :key="id" :value="item.value" data-cy="modal-add-priority-item">{{ item.text }}</option>
            </select>

            <!-- <v-select 
            data-cy="modal-add-priority-dropdown"
            class="w-44" 
            :items="items" 
            density="comfortable" 
            variant="solo" 
            v-model="this.editedStatus"
            item-title="text"
            item-value="value">

            </v-select> -->
          </div>
        </div>
        <hr />
        <div class="modal-footer py-6 px-7 flex flex-row-reverse">
          <button data-cy="modal-add-save-button"
            class="text-xl bg-main enabled: hover:bg-sky-600 text-white font-semibold py-3 px-7 rounded-full disabled:opacity-20 disabled:pointer-events-none"
            :disabled="this.editedText == ''" @click="clickSubmit">
            Simpan
          </button>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<style>

</style>
