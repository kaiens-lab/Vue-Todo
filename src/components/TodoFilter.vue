<script setup>
import { defineProps } from "vue";
import { ref } from "vue";

const props = defineProps({
  todos: Array,

});
const selectedOption = ref("");
const emit = defineEmits(["filterStatus"]);

const allTodos = () => {
  emit("filterStatus", "all");
};

const activeTodos = () => {
  emit("filterStatus", "active");
};

const completedTodos = () => {
  emit("filterStatus", "completed");
};
</script>
<template>
    <div class="todoFilter">
      <label :class="{ btn__active: selectedOption === 'all' }">
        <input type="radio"  @click="allTodos()" class="btn filterBtn" v-model="selectedOption" value="all" >All</input>
      </label>
      
      <label :class="{ btn__active: selectedOption === 'active' }">
        <input type="radio"  @click="activeTodos()" class="btn filterBtn"  v-model="selectedOption" value="active">Active</input>
      </label>

      <label :class="{ btn__active: selectedOption === 'completed' }">
        <input type="radio"  @click="completedTodos()" class="btn filterBtn"  v-model="selectedOption" value="completed">Completed</input>
      </label>

    </div>

</template>
<style scoped>
.btn__active {
  color: #3a7cfd;
}

.filterBtn {
  padding: 5px;
}

.btn {
  cursor: pointer; 
  background-color: transparent;
  border: none;
  color: #9495a5;
  font-size: 1rem;
  line-height: 1rem;
  font-family: inherit;
}

.btn--active {
  color: #3a7cfd;
}

.todoFilter {
  background: #fafafa;
  padding: 1rem;
  display: inline-block;
  align-items: center;
  border-radius: 5px;
  position: relative;
  left: 45%;
  transform: translate(-50%, -110%);
  color: #9495a5;
}

[data-theme="darkTheme"] .todoFilter {
  background: transparent;
}

.todoFilter label {
  background: transparent;
  margin: 0 0.8rem;
}

.todoFilter input[type="radio"] {
  display: none;
}


@media (max-width: 738px) {
  .todoFilter {
    position: static;
    display: block;
    transform: none;
    margin-top: 1.5rem;
    text-align: center;
    padding: 1rem 0rem;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  }

  [data-theme="darkTheme"] .todoFilter {
  background: #25273d;




}

}
</style>
