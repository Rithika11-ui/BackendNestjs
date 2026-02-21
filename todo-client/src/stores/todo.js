import { defineStore } from "pinia";
import axios from "axios";


const API = 'http://localhost:3000/tasks';

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [],
  }),
  getters: {
    countTodos: (state) => state.todos.length,
  },
  actions: {
    async fetchTodos() {
      try {
        const response = await axios.get(API);
        this.todos = response.data; 
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      }
    },
    async toggleStatus(id) {
      const found = this.todos.find((t) => t.id == id);
      if (!found) return;

      try {
        const response = await axios.put(`${API}/${id}`, {...found,completedAt: found.completedAt ? null : new Date().toISOString(),})
        const index = this.todos.findIndex((t) => t.id == id);
        this.todos[index] = response.data;
      } catch (error) {
        console.error("Failed to toggle status:", error);
      }
    },
    async addTodo(todo) {
      try {
        const response = await axios.post(API, { name: todo, description: "description", });
        this.todos.push(response.data);
      } catch (error) {
        console.log("Failed to add todo: ", error);
      }
    },
    async clearAll() {
      try {
        await Promise.all(this.todos.map((t) => axios.delete(`${API}/${t.id}`)))
        this.todos = [];
      } catch (error) {
        console.log("Failed to clear ", error);

      }
    },
  },
});
