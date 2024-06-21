<template>
  <div class="card-container">
    <img
      class="movie-image"
      :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
      :alt="movie.title"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    />
    <div
      class="movie-info"
      v-show="isHovered"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <h2 class="movie-title">{{ movie.title }}</h2>
      <p class="movie-description">
        {{ shortenedDescription }}
      </p>
      <router-link :to="'/movie-page/' + movie.id" class="movie-page-link"
        >More...</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isHovered: false,
    };
  },
  computed: {
    shortenedDescription() {
      if (this.movie.overview.length > 200) {
        return this.movie.overview.substring(0, 200) + "...";
      } else {
        return this.movie.overview;
      }
    },
  },
  methods: {
    handleMouseEnter() {
      this.isHovered = true;
    },
    handleMouseLeave() {
      this.isHovered = false;
    },
  },
};
</script>

<style scoped>
.card-container {
  position: relative;
  width: 300px;
  margin: 0 auto;
  border: 1px solid rgba(0, 0, 0, 0.664);
}

.movie-image {
  width: 100%;
  height: auto;
}

.movie-info {
  background-color: #ffffffd7;
  color: #000000;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 999;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.movie-title {
  margin: 0;
  font-size: 18px;
}

.movie-description {
  margin: 0;
  font-size: 14px;
}

.movie-page-link {
  text-decoration: underline;
  text-underline-offset: 2px;
  justify-content: flex-end;
  cursor: pointer;
}
</style>
