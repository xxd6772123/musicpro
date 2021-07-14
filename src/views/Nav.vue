<template>
  <div id="nav">
    <router-link to="/recommend">推荐</router-link> |
    <router-link to="/singer">歌手</router-link>|
    <router-link to="/search">搜索</router-link>|
    <router-link to="/collect">收藏</router-link>
  </div>
</template>

<style scoped>
#nav {
  display: flex;
  padding: 0.6rem 0;
  font-size: 1rem;
}

#nav > a {
  flex: 1;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>