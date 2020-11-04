<template>
  <div class="header-line">
    <!-- TODO: {{}} -->

    <h1 id="clivioheader">{{ headerName }}</h1>

    <div class="menu">
      <router-link :to="{ name: 'dashboard-page' }">
        <a class="menu-link">DASHBOARD</a>
      </router-link>

      <router-link :to="{ name: 'newstudy-page' }">
        <a class="menu-link">NEUE STUDIE ANLEGEN</a>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppHeader",
  props: ["headerName"],
};
</script>
<style lang="scss" scoped>
.header-line {
  background-color: var(--main-color);
  margin: 40px 0px 40px 0px;
  display: flex;
   line-height: 4vh;
    font-size: 3vh;
      letter-spacing: 3px;

}

#clivioheader {
  /* background-color: var(--main-color); */
  color: var(--main-text-color);
  -webkit-margin-before: 0;
  padding-left: 20px;
  width: 30%;

  
}

.menu{
display: flex;
justify-content: flex-end;
  width: 70%;
   

}
.menu-link { 
  color: var(--main-text-color);
  margin: 0 2vh;
   

}

a:hover {
  color: rgb(208, 208, 208);
  background-color: transparent;
}

a:active {
  color: rgba(255, 102, 0, 0.796);
  background-color: transparent;
}

h1 {
}
</style>
