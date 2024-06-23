<script>
export default {};
</script>

<template>
  <div class="container">
    <div class="header-flex-container">
      <router-link class="router-link heading" to="/">
        <h1>Movie Project</h1>
      </router-link>
      <h3>
        <router-link class="route-link" to="/rated-movies"
          >Rated Movies</router-link
        >
      </h3>
    </div>
    <div class="header-line"></div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
}

.heading {
  color: #93c5fd;
  text-decoration: none;
}

.header-flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: 1660px;
  padding: 2rem;
}

.header-line {
  max-width: 1660px;
  margin: 0 auto;
  border-bottom: 1px solid rgb(71, 71, 71);
  border-top: none;
  border-inline: none;
}

@media (max-width: 800px) {
  .header-flex-container {
    flex-direction: column;
  }
}
</style>
