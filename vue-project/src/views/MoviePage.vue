<template>
  <div>
    <Header />
    <MoviePageCard v-if="movie" :movie="movie" />
    <Footer />
  </div>
</template>

<script>
import MoviePageCard from "../components/MoviePageCard.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default {
  components: {
    Header,
    MoviePageCard,
    Footer,
  },
  data() {
    return {
      movie: null,
    };
  },
  async created() {
    await this.fetchMovieDetails();
  },
  methods: {
    async fetchMovieDetails() {
      const movieId = this.$route.params.id;
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}`,
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
        this.movie = data;
      } catch (error) {
        console.error("Error fetching movie details: ", error);
      }
    },
  },
};
</script>

<style lang=""></style>
