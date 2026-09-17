import { createRouter, createWebHashHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"

import PlaceholderView from "../views/PlaceholderView.vue"

const routes = [
  { path: "/", name: "home", component: PlaceholderView, props: { title: "Home" } },
  { path: "/about", name: "about", component: PlaceholderView, props: { title: "About" } },
  {
    path: "/publications",
    name: "publications",
    component: PlaceholderView,
    props: { title: "Publications" },
  },
  {
    path: "/teaching",
    name: "teaching",
    component: PlaceholderView,
    props: { title: "Teaching" },
  },
  {
    path: "/join-us",
    name: "join-us",
    component: PlaceholderView,
    props: { title: "Join Us" },
  },
] satisfies readonly RouteRecordRaw[]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
