<template>
  <form>
    <h3>Basis Informationen</h3>
    <div class="columns">
      <div class="column">
        <b-input id="study-name" type="text" placeholder="Name der Studie" disabled/>
      </div>
      <div class="column">
        <b-input id="study-description" type="text" placeholder="Kurzbeschreibung / Hinweise" disabled/>
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
