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
        <input type="radio"  @click="allTodos()" class="filter-radio" v-model="selectedOption" value="all" >All</input>
      </label>
      
      <label :class="{ btn__active: selectedOption === 'active' }">
        <input type="radio"  @click="activeTodos()" class="filter-radio" v-model="selectedOption" value="active">Active</input>
      </label>

      <label :class="{ btn__active: selectedOption === 'completed' }">
        <input type="radio"  @click="completedTodos()" class="filter-radio" v-model="selectedOption" value="completed" >Completed</input>
      </label>

    </div>

</template>
<style scoped>
.btn__active {
  color: #3a7cfd;
}

.todoFilter {
  @apply inline-flex items-center relative py-4  rounded-md
         bg-light-bg text-light-text bg-transparent 
         left-[45%] -translate-x-1/2 -translate-y-[110%] dark:bg-dark-primary ;
}

.todoFilter label {
  @apply bg-transparent translate-x-4  -translate-y-1 pr-6;

}

.filter-radio {
  @apply hidden;
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

}
</style>
