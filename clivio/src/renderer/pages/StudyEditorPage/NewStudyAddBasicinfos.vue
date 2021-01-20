<template>
  <form>
    <div id="basics">
      <b-field label="Name der Studie">
        <b-input
          v-model="basicInfos.studyName"
          type="text"
          v-on:input="updateValue($event)"
        />
      </b-field>
      <b-field label="Anzahl der Studienkriterien">
        <b-input v-model="basicInfos.studyCriteriaCount" type="text" />
      </b-field>
      <b-field label="Primary Investigator">
        <b-input v-model="basicInfos.headOfStudy" type="text" />
      </b-field>
      <b-field label="E-Mail">
        <b-input v-model="basicInfos.headOfStudyContact" type="text" />
      </b-field>
    </div>
  </form>
</template>

<script>
export default {
  name: "NewStudyAddBasicinfos",
  props: ["basicInfos"],
};
</script>

<style lang="scss">
#basics {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 25px;
}
</style>
