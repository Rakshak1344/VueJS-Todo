<template>
  <div id="app">
    <!-- input text with add button -->
    <div class="field has-addons">
      <div class="control">
        <input
          class="input"
          v-model="content"
          type="text"
          placeholder="Funny!"
        />
      </div>
      <div class="control">
        <a class="button is-primary" @click="addTodo" :disabled="!content">
          Add
        </a>
      </div>
    </div>

    <!-- List of todos -->
    <div class="notification" v-for="(todo, i) in todos" :key="todo._id">
      <div class="columns">
        <input
          class="column input"
          v-if="isTodoSelected(todo)"
          v-model="editTodoContent"
        />
        <p v-else class="column">
          <span class="tag is-primary">{{ i + 1 }}</span>
          <input
            class="todoCheck"
            type="checkbox"
            @change="markCompleted($event, todo)"
          />

          <span v-if="todo.is_completed" style="margin-left: 10px"
            ><strike>{{ todo.content }}</strike></span
          >
          <span v-if="!todo.is_completed" style="margin-left: 10px"
            >{{ todo.content }}
          </span>
          <span v-if="todo.is_completed" style="margin-left: 10px">
            <i
              class="material-icons"
              style="color: green; width: 15px; height: 15px"
            >
              done
            </i>
          </span>

          <!-- {{ todo.content }} -->
        </p>
        <div class="column is-narrow">
          <!--TODO content-->
          <span
            class="icon has-text-primary"
            @click="isTodoSelected(todo) ? unselect() : select(todo)"
          >
            <i class="material-icons">{{
              isTodoSelected(todo) ? "close" : "edit"
            }}</i>
          </span>
          <span
            class="icon has-text-primary"
            @click="
              isTodoSelected(todo) ? updateTodo(todo, i) : deleteTodo(todo, i)
            "
          >
            <i class="material-icons">{{
              isTodoSelected(todo) ? "save" : "delete"
            }}</i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const url = "http://localhost:3000/api/v1";
export default {
  name: "App",
  data() {
    return {
      todos: [],
      content: "",
      editTodoContent: "",
      selectedTodo: {},
    };
  },
  async mounted() {
    const response = await axios.get(`${url}/`);
    this.todos = response.data;
  },
  methods: {
    async addTodo() {
      const response = await axios.post(`${url}/`, { content: this.content });
      this.todos.push(response.data);
      this.content = "";
    },
    async deleteTodo(todo, i) {
      await axios.delete(`${url}/${todo._id}`);
      this.todos.splice(i, 1);
    },
    select(todo) {
      this.selectedTodo = todo;
      this.editTodoContent = todo.content;
    },
    isTodoSelected(todo) {
      return this.selectedTodo._id === todo._id;
    },
    unselect() {
      this.selectedTodo = {};
      this.editTodoContent = "";
    },

    async updateTodo(todo, i) {
      const response = await axios.put(`${url}/${todo._id}`, {
        content: this.editTodoContent,
      });
      this.todos[i] = response.data;
      this.unselect();
    },

    async markCompleted(event, todo) {
      if (todo.is_completed === true) {
        todo.is_completed = false;

        await axios.put(`${url}/${todo._id}`, {
          is_completed: false,
        });
      } else {
        todo.is_completed = true;
        await axios.put(`${url}/${todo._id}`, {
          is_completed: true,
        });
      }
    },
  },
};
</script>

<style>
#app {
  margin: auto;
  max-width: 700px;
  color: #2c3e50;
  margin-top: 60px;
}
.todoCheck {
  margin-left: 10px;
  width: 15px;
  height: 15px;
}
</style>
