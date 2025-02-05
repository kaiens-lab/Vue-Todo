<script setup>
const props = defineProps({
  todos: Array,
  itemsLeft: Number,
  clearCompleted: Function,
});

const emit = defineEmits(["removeTodo", "toggle-todo"]);

const removeTodo = (id) => {
  emit("removeTodo", id);
};

const toggleCompleted = (id) => {
  emit("toggle-todo", id);
};

const completedTodos = () => {
  emit("filterStatus", "completed");
};
</script>

<template>
  <div class="todo__list">
    <ul>
      <li
        v-for="(todo, index) in todos"
        :key="todo.id"
        @click="toggleCompleted(todo.id)"
      >
        <div
          class="todoBtnAndtext"
          :class="{
            completed: todo.isCompleted,
          }"
        >
          <button
            class="btn btn__check"
            :class="{
              todo__checked: todo.isCompleted,
            }"
          >
            <img src="/images/icon-check.svg" />
          </button>

          {{ todo.text }}
        </div>
        <button class="btn__cross" @click="removeTodo(todo.id)">
          <img src="/images/icon-cross.svg" />
        </button>
      </li>
    </ul>

    <div class="itemsLeftAndClear">
      <p class="btn">
        <span>{{ itemsLeft }}</span> item(s) left
      </p>
      <button class="btn btn--clear" @click="props.clearCompleted">
        Clear Completed
      </button>
    </div>
  </div>
</template>

<style scoped>
.itemsLeftAndClear {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fafafa;
  padding: 2rem 1rem;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.todo__list {
  background-color: #fafafa;
  border-top: 1px solid #e3e4f1;
  border-left: 1px solid #e3e4f1;
  border-right: 1px solid #e3e4f1;

  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

[data-theme="darkTheme"] .todo__list {
  background: #25273d;
}

[data-theme="darkTheme"] .itemsLeftAndClear {
  background: #25273d;
}

.todo__list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #393a4b;
  padding: 1rem 1.5rem;
  margin-bottom: 8px;
  border-bottom: 1px solid #e3e4f1;
}

[data-theme="darkTheme"] .todo__list {
  border-top: 1px solid #393a4b;
  border-left: 1px solid #393a4b;
  border-right: 1px solid #393a4b;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.todo__list li:hover .btn__cross {
  transform: scale(1);
}

[data-theme="darkTheme"] .todo__list li {
  color: #c4c4c5;
  border-bottom: 1px solid #393a4b;
}

.todoBtnAndtext {
  display: flex;
  align-items: center;
  width: 80%;
}

.btn {
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: #9495a5;
  font-size: 1rem;
  line-height: 1%;
  font-family: inherit;
}

.btn__check {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  margin-right: 20px;
  border: 1px solid #e3e4f1 !important;
  border-radius: 50%;
  flex: 0 0 auto;
  cursor: pointer;
  transition: border-color 0.3s ease-in-out;
}

.btn__check:hover {
  border-color: #c058f3 !important;
}

[data-theme="darkTheme"] .btn__check img {
  transform: scale(0);
  transition: transform 0.5s ease-in-out;
}

.completed {
  text-decoration: line-through;
  text-decoration-thickness: 1.5px;
  text-decoration-color: #c4c4c5;
  color: #c4c4c5;
}

[data-theme="darkTheme"] .completed {
  text-decoration-color: #4d5067;
  color: #4d5067;
}

.completed .todoBtnAndtext {
  color: #c4c4c5;
}

.todo__checked {
  background: linear-gradient(to right, #55ddff, #c058f3);
}
[data-theme="darkTheme"] .todo__checked img {
  transform: scale(1);
}

.btn__cross {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border: none;
  background-color: transparent; /* 讓背景透明 */
  cursor: pointer;
  background: transparent;
  border: none;
  transform: scale(0);
  transition: transform 0.5s ease-in-out;
}

[data-theme="darkTheme"] .btn__cross {
  color: #979797;
}
</style>
