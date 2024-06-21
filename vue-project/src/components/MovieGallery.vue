<script>
import MovieCard from "./MovieCard.vue";

export default {
  components: {
    MovieCard,
  },
  data() {
    return {
      movies: [],
      displayedMovies: [],
      movieName: "",
    };
  },
  async created() {
    await this.fetchAllMovies();
    this.displayedMovies = this.movies;
  },
  methods: {
    async fetchAllMovies() {
      try {
        const res = await fetch("https://api.themoviedb.org/3/movie/popular", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzBjMDAwZTYzYjM2ZTcwZjdhYTdhNmFlNGY3ODNkZSIsInN1YiI6IjY2NzNmOWZlNzhhZjIyZTIxNTE2ZDAyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BKZxvkSxopJe6WfipvNX7Onz1kncLD4yOy90Pi0Im2U",
          },
        });

        const data = await res.json();
        this.movies = data.results;
      } catch (error) {
        console.error("Error fetching movies: ", error);
      }
    },
    async fetchSearchedMovies() {
      if (!this.movieName) {
        this.displayedMovies = this.movies;
        return;
      }
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${this.movieName}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzBjMDAwZTYzYjM2ZTcwZjdhYTdhNmFlNGY3ODNkZSIsInN1YiI6IjY2NzNmOWZlNzhhZjIyZTIxNTE2ZDAyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BKZxvkSxopJe6WfipvNX7Onz1kncLD4yOy90Pi0Im2U",
            },
          }
        );

        const data = await res.json();
        setTimeout(() => {
          this.displayedMovies = data.results;
        }, 300);
      } catch (error) {
        console.error("Error searching movies: ", error);
      }
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="search-container">
      <input
        class="search-bar"
        v-model="movieName"
        @keyup="fetchSearchedMovies"
        type="text"
        placeholder="Search for a movie"
      />
    </div>
    <div v-if="movies.length">
      <div class="movie-gallery">
        <MovieCard
          v-for="movie in displayedMovies"
          :key="movie.id"
          :movie="movie"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-container {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  max-width: 1660px;

  margin: 10px auto;
}

.search-bar {
  padding: 10px;
  background: #1e293b;
  border: none;
  border-radius: 16px;
  color: #ffffff;
  outline: none;
  cursor: pointer;
}

.container {
  /*border: 1px solid purple;*/
}

.movie-gallery {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  max-width: 1660px;
  margin: 0 auto;
}
</style>
