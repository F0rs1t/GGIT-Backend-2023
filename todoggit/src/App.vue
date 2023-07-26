<template>
  <div v-if="isMainPage" class="menu" style="display: grid;justify-items: center;">
    <img alt="Vue logo" class="logo" src="@/assets/user.svg" width="40" height="40" />
    <p v-if="user" class="email">{{ user.email ? user.email : 'Logged in, but no email available' }}</p>
    <button v-if="user" @click="logout" class="button is-danger is-outlined is-small">Log Out</button>
  </div>

<!-- Make thid app.vue as principal based site, where is adding different info depending on path(url)-->
<RouterView />  
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { RouterView, useRoute } from 'vue-router'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import router from '@/router'; 

const $route = useRoute(); // Use the useRoute hook to get access to the current route

const logout = async () => {
  try {
    const auth = getAuth();
    console.log(auth);
    await signOut(auth);
    user.value = null;
    router.push('/login');
  } catch (e) {
    console.error('Error during logout:', e);
  }
}

const user = ref(null);
onMounted(() => {
  // Check if the user is logged in on component mount
  const auth = getAuth();
  onAuthStateChanged(auth, (firebaseUser) => {
    user.value = firebaseUser;
  });
});

const isMainPage = computed(() => $route.path === '/');
</script>

<style scoped>
@import 'bulma/css/bulma.min.css';
.email{
  color: white;
  padding-bottom: 10px;
}
.menu{
  position: absolute;
  left: 20px;
  top: 20px;
  display: grid;
  justify-items: center;
  position: absolute;
  padding: 20px;
  background: linear-gradient(#141e30, #243b55);
  border-radius: 20px;
}
</style>
