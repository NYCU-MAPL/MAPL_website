import { createRouter, createWebHashHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"

import AboutView from "../views/AboutView.vue"
import HomeView from "../views/HomeView.vue"
import JoinUsView from "../views/JoinUsView.vue"
import PublicationsView from "../views/PublicationsView.vue"
import TeachingView from "../views/TeachingView.vue"

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/about", name: "about", component: AboutView },
  {
    path: "/publications",
    name: "publications",
    component: PublicationsView,
  },
  {
    path: "/teaching",
    name: "teaching",
    component: TeachingView,
  },
  {
    path: "/join-us",
    name: "join-us",
    component: JoinUsView,
  },
] satisfies readonly RouteRecordRaw[]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
