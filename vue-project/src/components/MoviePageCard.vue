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
      ratingText: "",
    };
  },
  methods: {
    async addMovieAndRating() {
      try {
        const movieAndRating = {
          movieId: this.movie.id,
          movieTitle: this.movie.title,
          movieOverview: this.movie.overview,
          movieImg: this.movie.poster_path,
          rating: this.ratingText,
        };

        const res = await fetch("http://localhost:12413/rated-movies", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(movieAndRating),
        });

        if (res.status !== 201) {
          alert("Neuspjesan insert");
          return;
        }

        window.location.href = "/";
      } catch (error) {
        console.error("Error: ", error);
      }
    },
  },
};
</script>

<template>
  <div class="movie-container" v-if="movie">
    <div class="movie-image">
      <img
        :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
        :alt="movie.title"
      />
    </div>
    <div class="movie-info">
      <h2 class="movie-title">
        {{ movie.title }} ({{ movie.release_date.split("-")[0] }})
      </h2>
      <p class="movie-description">{{ movie.overview }}</p>
      <div class="rating-container">
        <input v-model="ratingText" type="text" name="rating" id="rating" />
        <p>/ 10</p>
      </div>
      <button @click="addMovieAndRating" class="btn btn-rating">
        Add rating
      </button>
    </div>
  </div>
</template>

<style scoped>
.movie-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 4rem;
}

.movie-image {
  width: 400px;
  height: auto;
}

.movie-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 600px;
}

.rating-container {
  display: flex;
  gap: 1rem;
  justify-content: start;
  align-items: center;
}

.rating-container > input {
  text-align: center;
  max-width: 50px;
}

.btn {
  text-transform: uppercase;
  padding: 0.4rem;
  cursor: pointer;
}

.btn-rating {
  background-color: #ffffff;
  color: #000000;
  font-weight: bold;
  border: 1px solid #000000;
  width: 200px;
  transition: 300ms ease-in-out;
}

.btn-rating:hover {
  background-color: #000000;
  color: #fff;
}
</style>
