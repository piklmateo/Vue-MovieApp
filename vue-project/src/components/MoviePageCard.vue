<script>
const JSON_SERVER_API = import.meta.env.VITE_JSON_SERVER_API;

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
        const ratingText = this.ratingText;

        const regex = /^(10([.,]0)?|[1-9]([.,][0-9])?)$/;

        if (!regex.test(ratingText)) {
          alert(
            "Please enter a number between 1 and 10, with or without only one decimal place."
          );
          this.ratingText = "";
          return;
        }

        const movieAndRating = {
          movieId: this.movie.id,
          movieTitle: this.movie.title,
          movieOverview: this.movie.overview,
          movieImg: this.movie.poster_path,
          rating: ratingText,
        };

        const res = await fetch(JSON_SERVER_API, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(movieAndRating),
        });

        if (res.status !== 201) {
          alert("Unsuccessful insert");
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
  height: auto;
}

.movie-image > img {
  border-radius: 16px;
}

.movie-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 600px;
  color: #fff;
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
  background: #29364d;
  border: none;
  border-radius: 8px;
  color: #fff;
  outline: none;
  padding: 0.4rem;
}

.btn {
  text-transform: uppercase;
  padding: 0.4rem;
  cursor: pointer;
}

.btn-rating {
  background-color: #1e293b;
  color: #ffffff;
  font-weight: bold;
  padding: 1rem;
  border: none;
  border-radius: 16px;
  width: fit-content;
  transition: 300ms ease-in-out;
}

.btn-rating:hover {
  background-color: #29364d;
  color: #fff;
}
</style>
