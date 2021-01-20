<template>
  <!-- <div class="main"> -->
  <form>
    <b-field label="Neues Informationsbedürfniss"></b-field>

    <div class="columns">
      <div class="column">
        <b-input
          id="information-input-text"
          type="text"
          v-model="name"
          placeholder="Information"
        />
      </div>

      <div class="column is-half">
        <b-input
          id="xPath-input-text"
          type="text"
          v-model="xpath"
          placeholder="xPath"
        />
      </div>
    </div>

    <b-button rounded id="btn_add" @click="addInformation">Hinzufügen</b-button>
  </form>
  <!-- </div> -->
</template>

<script>
export default {
  name: "NewStudyAddInformation",
  data() {
    return {
      name: "",
      xpath: "",
    };
  },
  methods: {
    addInformation(e) {
      e.preventDefault();
      const newInformation = {
        name: this.name,
        xpath: this.xpath,
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
