<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">持仓</RouterLink>
        <RouterLink to="/trade">买卖记录</RouterLink>
        <RouterLink to="/profit">PnL盈亏</RouterLink>
        <RouterLink to="/about">投研计算器</RouterLink>
        <RouterLink to="/data">数据导入导出</RouterLink>
      </nav>
    </div>
  </header>
  <br>
  <RouterView />
</template>

<style scoped>
header {
  margin-top:20px;
  line-height: 1.5;
  max-height: 100vh;
}

body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 20px;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  color:black;
  border-left: 1px solid var(--color-border);
}

/* Styling for selected (active) RouterLink */
nav a.router-link-active {
  font-weight: 600;
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: left;

  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
