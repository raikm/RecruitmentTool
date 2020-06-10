<template>
  <form>
    <h3>Basis Informationen</h3>
    <div class="columns">
      <div class="column">
        <b-input id="analysename" type="text" placeholder="Name der Studie" />
      </div>
      <div class="column">
        <b-input id="description" type="text" placeholder="Kurzbeschreibung / Hinweise" />
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

</style>
