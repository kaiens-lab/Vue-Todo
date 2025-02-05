<script>
export default {
  components: {
    name: "AppFooter",
  },
};
</script>
<template>
  <footer>
    <div class="attribution">
      <p>
        Challenge by
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank"
          >Frontend Mentor</a
        >. Coded by <a href="https://github.com/kaiens-lab">KN Chang</a>.
      </p>
    </div>
  </footer>
</template>
<style scoped>
footer {
  position: relative;
  width: 100%;
  padding: 1rem 0;
  display: flex;
  justify-content: center;
}

.attribution {
  font-size: 0.85rem;
  color: #393a4b;
}

.attribution a {
  font-size: 0.85rem;
  color: #393a4b;
}

[data-theme="darkTheme"] footer a {
  color: inherit;
  font-weight: bold;
}
</style>
