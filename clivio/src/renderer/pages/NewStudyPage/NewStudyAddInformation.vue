<template>
  <!-- <div class="main"> -->
  <form>
    <h3>Neues Informationsbedürfniss</h3>

    <div class="columns">
      <div class="column">
        <b-input
          id="information-input-text"
          type="text"
          v-model="informationName"
          placeholder="Information"
        />
      </div>

      <div class="column is-half">
        <b-input
          id="xPath-input-text"
          type="text"
          v-model="informationXPath"
          placeholder="xPath"
        />
      </div>
    </div>

    <b-button id="btn_add" @click="addInformation">Hinzufügen</b-button>
  </form>
  <!-- </div> -->
</template>

<script>
export default {
  name: "NewStudyAddInformation",
  data() {
    return {
      informationName: "",
      informationXPath: "",
    };
  },
  methods: {
    addInformation(e) {
      e.preventDefault();
      const newInformation = {
        informationName: this.informationName,
        informationXPath: this.informationXPath,
      };
      this.$emit("add-information", newInformation);
      document.getElementById("information-input-text").value = "";
      document.getElementById("xPath-input-text").value = "";
    },
  },
};
</script>

<style lang="scss">

// #btn_add {
//   float: right;
//   margin: 0 0 1% 1%;
// }

</style>
