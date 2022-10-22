import { createRouter, createWebHistory, Router, RouteRecordRaw } from "vue-router";
import DefaultLayout from "@/components/layouts/DefaultLayout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "ActivityHome",
    component: () => import("@/views/activity/Index.vue"),
    meta: { layout: DefaultLayout },
  },
  {
    path: "/detail/:id",
    name: "ActivityDetail",
    component: () => import("@/views/activity/detail/Index.vue"),
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
