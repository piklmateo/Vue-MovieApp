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
      isHovered: false,
      isHighRated: this.movie.rating >= 8,
      isMidRated: this.movie.rating < 8,
      isLowRated: this.movie.rating < 5,
    };
  },
  methods: {
    handleMouseEnter() {
      this.isHovered = true;
    },
    handleMouseLeave() {
      this.isHovered = false;
    },
    async removeMovie() {
      try {
        const res = await fetch(`${JSON_SERVER_API}/${this.movie.id}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        });

        if (!res.ok) {
          alert("Error while removing the movie...");
        }

        alert("Succesfully removed movie:)");

        window.location.reload();
      } catch (error) {
        console.error("Error: ", error);
      }
    },
  },
  computed: {
    shortedOverview() {
      return this.movie.movieOverview.substring(0, 200);
    },
  },
};
</script>

<template>
  <div class="card-container">
    <img
      class="movie-image"
      :src="'https://image.tmdb.org/t/p/w500' + movie.movieImg"
      :alt="movie.movieTitle"
    />
    <div @click="removeMovie" class="remove-icon-container">
      <img
        class="remove-icon"
        src="../../public/images/close.svg"
        alt="close-icon"
      />
    </div>
    <div class="movie-info">
      <h2 class="movie-title">{{ movie.movieTitle }}</h2>
      <p class="movie-description">
        {{ shortedOverview }}
      </p>

      <div class="rating-container">
        <div
          :class="
            isLowRated
              ? 'rating-indicator red-rating'
              : isMidRated
              ? 'rating-indicator yellow-rating'
              : isHighRated
              ? 'rating-indicator green-rating '
              : 'rating-indicator'
          "
        >
          <p>{{ movie.rating }} / 10</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  position: relative;
  width: 300px;
  margin: 0 auto;
}

.movie-image {
  width: 100%;
  height: auto;
  border-radius: 16px;
}

.remove-icon-container {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
  background-color: #1e293b;
  width: fit-content;
  padding: 0.4rem;
  border-radius: 0 8px 0 16px;
  border: none;
  cursor: pointer;
  transition: 200ms ease-in-out;
}

.remove-icon-container:hover {
  background-color: #344663;
}

.remove-icon {
  width: 32px;
  height: 32px;
}

.movie-info {
  background-color: #1e293bea;
  color: #ffffff;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 999;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 0 0 16px 16px;
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

.rating-container {
  display: flex;
  justify-content: end;
}

.rating-indicator {
  padding: 0.8rem;
  border-radius: 100px;
  font-weight: bold;
}

.green-rating {
  background-color: #22c55e;
  color: #fff;
}

.yellow-rating {
  background-color: #f57e29;
  color: #fff;
}

.red-rating {
  background-color: #dc2621;
  color: #fff;
}
</style>
