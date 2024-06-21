<script>
export default {};
</script>

<template>
  <div class="container">
    <div class="header-flex-container">
      <h1>Movie Project</h1>
      <h3><router-link to="/rated-movies">Rated Movies</router-link></h3>
    </div>
    <div class="header-line"></div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
}

.header-flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: 1660px;
  padding: 1rem;
}

.header-line {
  max-width: 1660px;
  margin: 0 auto;
  border-bottom: 1px solid rgb(71, 71, 71);
  border-top: none;
  border-inline: none;
}
</style>
