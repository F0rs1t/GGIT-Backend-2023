import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth();

const isLoggedIn = () => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      resolve(!!user); // Resolve with true if user is logged in, false otherwise
    });
  });
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true // Add a meta field to indicate that this route requires authentication
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
      meta: {
        requiresGuest: true
      }
    }
  ]
});

// Navigation guard to check if the user is logged in before accessing a route that requires authentication
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth && !(await isLoggedIn())) {
    // If the route requires authentication and the user is not logged in, redirect to the login page
    next('/login');
  } else {
    // If the route does not require authentication or the user is logged in, proceed to the next route
    next();
  }
});

// Navigation guard to prevent a logged-in user from accessing the "/login" page
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresGuest && (await isLoggedIn())) {
    // If the route requires a guest (not authenticated) user and the user is logged in, redirect to the home page
    next('/');
  } else {
    // If the route does not require a guest user or the user is not logged in, proceed to the next route
    next();
  }
});

export default router;