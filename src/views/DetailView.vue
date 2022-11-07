<script>
import TodoItem from "../components/TodoItem.vue";
import AddModalVue from "../components/AddModal.vue";
import DeleteModal from "../components/DeleteModal.vue";
import AlertModal from "../components/AlertModal.vue";
import { mapWritableState } from "pinia";
import { useModalStore } from "../stores/modal";
import axios from "axios";

export default {
  data() {
    return {
      sort: 1,
      details: {},
      inputTitle: '',
      id: this.$route.params.id,
      todoItems: [],
      editState: false,
      model: "",
      items: [
        {
          name: 'Terbaru',
          id: 1,
          test: "latest"
        },
        {
          name: 'Terlama',
          id: 2,
          test: "oldest"
        },
        {
          name: 'A-Z',
          id: 3,
          test: "az"
        },
        {
          name: 'Z-A',
          id: 4,
          test: "za"
        },
        {
          name: 'Belum Selesai',
          id: 5,
          test: "unfinished"
        },
      ],
      priorColor: {
        "very-high": "#F2F2F2",
        high: "#F8A541",
        medium: "#00A790",
        low: "#428BC1",
        "very-low": "#8942C1",
      },
    };
  },
  components: {
    TodoItem,
    AddModalVue,
    DeleteModal,
    AlertModal,
  },
  methods: {
    async getActivityDetail() {
      try {
        const { data } = await axios.get(
          `https://todo.api.devcode.gethired.id/activity-groups/${this.id}`
        );
        this.details = data;
        this.todoItems = data.todo_items;
        this.inputTitle = data.title
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteActivity(id) {
      try {
        await axios.delete(
          `https://todo.api.devcode.gethired.id/todo-items/${id}`
        );
        this.getActivityDetail();
      } catch (error) {
        console.log(error);
      }
    },
    openAddModal() {
      this.addModalState = true;
      this.addModalStatus = "Add";
      this.editedStatus = "very-high";
      this.editedText = "";
    },
    setSort(sortIdx) {
      this.sort = sortIdx
      console.log(sortIdx)
    },
    sortItem() {
      if (this.sort == 1) {
        this.todoItems = this.todoItems.sort(function (a, b) {
          var y = a["id"]; var x = b["id"];
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
      }
      else if (this.sort == 2) {
        this.todoItems = this.todoItems.sort(function (a, b) {
          var x = a["id"]; var y = b["id"];
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
      }
      else if (this.sort == 3) {
        this.todoItems = this.todoItems.sort(function (a, b) {
          var x = a["title"]; var y = b["title"];
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
      }
      else if (this.sort == 4) {
        this.todoItems = this.todoItems.sort(function (a, b) {
          var y = a["title"]; var x = b["title"];
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
      }
      else if (this.sort == 5) {
        this.todoItems = this.todoItems.sort(function (a, b) {
          var y = a["is_active"]; var x = b["is_active"];
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
      }
    },
    setEditState() {
      if(this.editState == true) return
      this.editState = true
      this.$nextTick(() =>
        this.$refs.titleipt.focus()
      )
    },
    async updateTitle(){
      this.editState=false
      try {
        await axios.patch(`https://todo.api.devcode.gethired.id/activity-groups/${this.details.id}`,{ title: this.inputTitle })
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    ...mapWritableState(useModalStore, [
      "addModalState",
      "addModalStatus",
      "editedStatus",
      "editedText",
    ]),
  },
  created() {
    this.getActivityDetail();
  },
  watch: {
    sort() {
      this.sortItem()
    },
    todoItems() {
      this.sortItem()
    }
  }
};
</script>

<template>
  <div class="detail-section">
    <div class="detail-header py-12 flex justify-between">
      <div class="todo-title flex items-center">
        <div data-cy="todo-back-button" class="bg-[url('../assets/todo-back-button.svg')] w-8 h-8 bg-no-repeat mr-5 hover:cursor-pointer"
          @click="this.$router.push('/')"></div>
          <input v-show="editState" type="text" name="" ref="titleipt" id="title-input" v-model="inputTitle" @focusout="updateTitle()" />
          <h1 data-cy="todo-title" v-show="!editState" class="text-4xl font-bold mr-5" @click="setEditState()">
            {{ inputTitle }}
          </h1>
        <div data-cy="todo-title-edit-button" class="bg-[url('../assets/todo-title-edit-button.svg')] w-6 h-6 bg-no-repeat" @click="setEditState()"></div>
      </div>

      <div class="flex gap-3">
        <button id="sort-dropdown" class="sort" data-cy="todo-sort-button">
          <div class="bg-[url('../assets/todo-sort-button.svg')] w-14 h-14 bg-no-repeat"></div>
        </button>
        <button @click="openAddModal"
        data-cy="todo-add-button"
          class="text-xl bg-main hover:bg-sky-600 text-white font-semibold py-3 px-7 rounded-full">
          + Tambah
        </button>
      </div>
    </div>

    <div v-if="todoItems?.length > 0" class="flex flex-col gap-4">
      <TodoItem v-for="(item,idx) in todoItems" :key="item.id" :item="item" :idx="idx" />
    </div>

    <div data-cy="todo-empty-state" v-else class="list-empty-state flex justify-center">
      <img src="../assets/todo-empty-state.png" alt="todo-empty-state" />
    </div>

    <v-menu activator="#sort-dropdown">
      <v-card class="mx-auto" max-width="300" data-cy="sort-parent">
        <v-list v-for="(item) in items" :key="item.id">
          <div @click="this.sort = item.id" :data-cy="`sort-`+item.test">
            <v-list-item-title class="p-4 hover:bg-sky-400" active-color="primary">{{ item.name }}</v-list-item-title>
          </div>
        </v-list>
      </v-card>
    </v-menu>

    <AddModalVue :id="this.id" @getActivityDetail="getActivityDetail" />
    <DeleteModal @deleteActivity="deleteActivity" />
    <AlertModal />
  </div>
</template>

<style>

</style>
