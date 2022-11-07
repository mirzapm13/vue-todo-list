<script>
import TodoCard from '../components/TodoCard.vue'
import DeleteModal from '../components/DeleteModal.vue' 
import AlertModal from '../components/AlertModal.vue';
import axios from 'axios'

export default {
  components: {
    TodoCard,
    DeleteModal,
    AlertModal
  },
  data() {
    return {
      activities: [],
      loading : false
    }
  },
  methods: {
    async getActivities() {
      try {
        const { data } = await axios.get("https://todo.api.devcode.gethired.id/activity-groups?email=testmirza%40gmail.com")
        this.activities = data.data
      } catch (error) {
        console.log(error);
      }
    },
    async createActivity() {
      try {
        const { data } = await axios.post("https://todo.api.devcode.gethired.id/activity-groups", {
          "title": "New Activity",
          "email": "testmirza@gmail.com",
          "_comment": "email digunakan untuk membedakan list data yang digunakan antar aplikasi"
        })
        this.activities = data.data
        this.getActivities()
      } catch (error) {
        console.log(error);
      }
    },
    async deleteActivity(id){
      try {
        await axios.delete(`https://todo.api.devcode.gethired.id/activity-groups/${id}`)
        this.getActivities()
      } catch (error) {
        console.log(error)
      }
    },
  },
  created() {
    this.getActivities()
  }
};
</script>

<template>
  <div class="todo-section">
    <div class="todo-header py-12 flex justify-between">
      <p data-cy="activity-title" class="text-4xl font-bold">Activity</p>
      <button data-cy="activity-add-button"
        class="text-xl bg-main hover:bg-sky-600 text-white font-semibold py-3 px-7 rounded-full"
        @click="createActivity">+ Tambah</button>
    </div>

    <div v-if="activities?.length > 0" class="todo-list grid grid-cols-4 gap-4">
      <TodoCard v-for="(activity,idx) in activities" 
      :key="activity.id" 
      :idx ="idx"
      :id ="activity.id"
      :title="activity.title" 
      :date="activity.created_at"
      @deleteActivity="deleteActivity" />
    </div>

    <div data-cy="activity-empty-state" v-else class="list-empty-state flex justify-center">
      <img src="../assets/activity-empty-state.png" alt="activity-empty-state">
    </div>

    <DeleteModal @deleteActivity="deleteActivity"/>
    <AlertModal />
  </div>
</template> 

<style>

</style>
