<template>
  <div class="test-cont">

    <div class="title has-text-centered">
      To Do List
    </div>

    <form
      @submit.prevent="addToDo"
    >
        <div class="field has-addons mb-5" style="justify-content: center;">
          <div class="control">
            <input 
            v-model="newToDoCont"
            class="input" 
            type="text" 
            placeholder="Add a To Do" 
            />
          </div>
          <div class="control">
            <button 
            :disabled="!newToDoCont"
            class="button is-info"
            > ↓ 
            </button>
          </div>
      </div>
    </form>
    
    <div 
    v-for="todo in todos"
    class="card mb-5"
    :class="{'has-background-success-light':todo.done}"
    >
      <div class="card-content">
        <div class="content">

          <div class="columns is-mobile is-vcentered">
            <div 
            class="column"
            :class="{'has-text-success line-through' : todo.done}"
            >
              {{ todo.content }}
            </div>
            <div class="column is-5 has-text-right">
              <button 
              @click="toggleDone(todo.id)"
              class="button"
              :class="todo.done ? 'is-success' : 'is-light'"
              >
                &check;
              </button>
              <button 
              @click="delToDo(todo.id)"
              class="button is-danger ml-2"
              >
                &cross;
              </button>
            </div>
          </div>
        </div>
      </div><p style="position: absolute; bottom: 0px; left: 5px; color: black; opacity: .5;">{{ (new Date(todo.date)).toLocaleDateString(undefined, { day: '2-digit', month: 'long', year: 'numeric' })  }}</p>
    </div>

  </div>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue'
import { db } from '@/firebase';
import { collection, onSnapshot, 
         addDoc, doc, deleteDoc, updateDoc,
         query, orderBy, where
        } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


const ToDoDbCollRef = collection(db, 'ToDoDb')
const OrderedToDoDbCollRef = query(ToDoDbCollRef, orderBy("ord", "desc"))

const todos = ref([
  {
  //   id:'id1',
  //   content:'Finish Project',
  //   done: false
  //   date: 24.09.2004
  // }
  }
])

// Get data from Cloud Firebase
onMounted(() => {
  // Fetch user authentication state
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is logged in, retrieve userID
      const userID = user.uid;
      const OrderedToDoDbCollRef = query(
        ToDoDbCollRef,
        where('todoid', '==', userID), // Filter todos where "todoID" equals "userID"
        orderBy('ord', 'desc')
      );

      onSnapshot(OrderedToDoDbCollRef, (querySnapshot) => {
        const dbToDoDb = [];
        querySnapshot.forEach((doc) => {
          const todo = {
            id: doc.id,
            content: doc.data().content,
            done: doc.data().done,
            date: doc.data().date,
          };
          dbToDoDb.push(todo);
        });
        todos.value = dbToDoDb;
      });
    } else {
      // User is not logged in or has logged out, handle accordingly
      // For example, you could clear the todos list in this case
      todos.value = [];
    }
  });
});

const newToDoCont = ref ('')
const addToDo = () => {
  addDoc(ToDoDbCollRef, {
  content: newToDoCont.value,
  done: false,
  date: (new Date()).toString(),
  ord: Date.now(),
  todoID: userID
});
  newToDoCont.value = '';
}

const delToDo = id => {
  deleteDoc(doc(ToDoDbCollRef, id));
}

const toggleDone = id => {
  const index = todos.value.findIndex(todo => todo.id === id)
  updateDoc(doc(ToDoDbCollRef, id), {
    done: !todos.value[index].done
  })
}

const firebaseConfig = {
  apiKey: 'AIzaSyD1RVqKugmKyZ1iUmE-Zj2T6tVV9TnrS6Y',
  authDomain: 'test-ggsc.firebaseapp.com',
  projectId: 'test-ggsc',
  storageBucket: 'test-ggsc.appspot.com',
  messagingSenderId: '239008133966',
  appId: '1:239008133966:web:f4043b5b425b3bec00241f',
  measurementId: 'G-JRT9TZSMX3'
}

</script>

<style scoped>
@import 'bulma/css/bulma.min.css';
body{
  background-color: white;
}
.test-cont{
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}
.line-through{
  text-decoration: line-through;
}
</style>
