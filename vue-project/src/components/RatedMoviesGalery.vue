<script>
import RatedMovieCard from "../components/RatedMovieCard.vue";
export default {
  components: {
    RatedMovieCard,
  },
  data() {
    return {
      ratedMovies: [],
    };
  },
  methods: {
    async fetchRatedMovies() {
      try {
        const res = await fetch("http://localhost:12413/rated-movies", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        });

        const data = await res.json();
        console.log("DEJTA: ", data);
        return data;
      } catch (error) {
        console.error("Error: ", error);
      }
    },
  },
  async created() {
    this.ratedMovies = await this.fetchRatedMovies();
  },
};
</script>

<template>
  <div class="container">
    <div>
      <div class="movie-gallery">
        <RatedMovieCard
          v-for="movie in ratedMovies"
          :key="movie.id"
          :movie="movie"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  /*border: 1px solid purple;*/
}

.movie-gallery {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  max-width: 1660px;
  margin: 0 auto;
  padding-top: 5rem;
}

@media (max-width: 1660px) {
  .movie-gallery {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 1400px) {
  .movie-gallery {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1050px) {
  .movie-gallery {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 700px) {
  .movie-gallery {
    grid-template-columns: 1fr;
  }
}
</style>
