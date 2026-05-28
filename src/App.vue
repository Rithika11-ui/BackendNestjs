<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useTodoStore } from '@/stores/todo.store'

const store = useTodoStore()
const title = ref('')
let stopRealtime: (() => void) | null = null

onMounted(async () => {
  await store.fetchTodos()
  stopRealtime = store.startRealtime()
})

onBeforeUnmount(() => stopRealtime?.())

function onAdd() {
  if (!title.value.trim()) return
  store.addTodo(title.value)
  title.value = ''
}
</script>

<template>
  <div style="max-width: 500px; margin: 40px auto; font-family: sans-serif">
    <h1>My Todos</h1>

    <div style="display: flex; gap: 8px; margin-bottom: 16px">
      <input v-model="title" placeholder="New todo..." @keyup.enter="onAdd"
        style="flex: 1; padding: 8px" />
      <button @click="onAdd">Add</button>
    </div>

    <p v-if="store.loading">Loading...</p>
    <p v-if="store.error" style="color: red">{{ store.error }}</p>

    <ul style="list-style: none; padding: 0">
      <li v-for="todo in store.todos" :key="todo.id"
        style="display: flex; align-items: center; gap: 8px; padding: 8px 0; border-bottom: 1px solid #eee">
        <input type="checkbox" :checked="todo.is_done"
          @change="store.toggleTodo(todo)" />
        <span :style="{ textDecoration: todo.is_done ? 'line-through' : 'none', flex: 1 }">
          {{ todo.title }}
        </span>
        <button @click="store.deleteTodo(todo.id)" style="color: red">✕</button>
      </li>
    </ul>
  </div>
</template>