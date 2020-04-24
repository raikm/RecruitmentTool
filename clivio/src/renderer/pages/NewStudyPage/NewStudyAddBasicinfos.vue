<template>
  <div class="main">
    <a-input
      id="analysename"
      type="text"
      placeholder="Name der Analyse"
    />
    <a-input id="description" type="text" placeholder="Kurzbeschreibung" />
  </div>
</template>

<script>
export default {
  name: "NewStudyAddBasicinfos",
};
</script>

<style scoped>
div {
  display: inline-flex;
  width: 100%;
}

#analysename,
#description {
  width: 50%;
  margin: 1%;
}
</style>
