import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw,
} from "vue-router";
import DefaultLayout from "@/components/layouts/DefaultLayout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/views/home/Index.vue"),
    meta: { layout: DefaultLayout },
  },
  {
    path: "/about",
    component: () => import("@/views/About.vue"),
    meta: { layout: DefaultLayout },
  },
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((): void => {
  window.scroll({ top: 0, left: 0 });
});

export default router;
