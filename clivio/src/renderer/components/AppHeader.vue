<template>
  <div class="header-line">
    <router-link id="home-icon" :to="{ name: 'dashboard-page' }">
      <b-icon type="is-black" icon="table-of-contents" size="is-small"></b-icon>
    </router-link>

    <h1 id="clivioheader">{{ headerName }}</h1>
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
  margin: 10px 30px;
  border: 0px solid;
  border-radius: 10px;
  background-color: white;

  backdrop-filter: blur(10px);
  padding: 0 10px;
  line-height: 30px;
  display: grid;
  grid-template-columns: 20px auto;
  font-size: 18px;
  letter-spacing: 3px;
}

#home-icon {
}

#clivioheader {
  color: var(--main-text-color);
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
  cursor: default;
  justify-self: right;
}
</style>
