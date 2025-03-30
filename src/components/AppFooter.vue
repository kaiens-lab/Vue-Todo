<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "AppFooter",
});
</script>
<template>
  <footer class="relative w-full py-4 flex justify-center dark:bg-[#171823]">
    <div class="text-[0.85rem] text-[#393a4b]">
      <p>
        Challenge by
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          class="text-[0.85rem] text-[#393a4b]"
          target="_blank"
          >Frontend Mentor</a
        >. Coded by <a href="https://github.com/kaiens-lab">KN Chang</a>.
      </p>
    </div>
  </footer>
</template>
