import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import MoviePage from "../views/MoviePage.vue";
import RatedMoviesPage from "../views/RatedMoviesPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/movie-page/:id",
    name: "MoviePage",
    component: MoviePage,
    props: true,
  },
  {
    path: "/rated-movies",
    name: "RatedMoviesPage",
    component: RatedMoviesPage,
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
