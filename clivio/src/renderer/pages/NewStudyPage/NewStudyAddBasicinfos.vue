<template>
  <form>
    <h3>Suchanfrage</h3>
    <div class="columns">
      <div class="column">
        <b-input id="analysename" type="text" placeholder="Name der Analyse" />
      </div>
      <div class="column">
        <b-input id="description" type="text" placeholder="Kurzbeschreibung" />
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "NewStudyAddBasicinfos",
};
</script>

<style lang="scss">
#analysename,
#description {
  // display: block;
}
</style>
