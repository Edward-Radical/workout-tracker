<script setup>
import HelloWorld from './components/HelloWorld.vue'

function login(){
  console.log('login clicked');
  
}
function signup(){
  console.log('signup clicked');

}
</script>

<template>
  <main>
    <div class="mobile-view">
      <button @click=login()>Login</button>
      <button @click=signup()>Signup</button>
    </div>
  </main>
</template>

<style scoped>
.mobile-view{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 50px;
}
</style>


