<template>
  <!-- <div class="main"> -->
    <form>
      <h3>Neues Kriterium</h3>
      <!-- TODO: put in new divs and change margin instead of br -->
      <div class="columns">
        <div class="column">
        <b-input
          id="criterium"
          type="text"
          v-model="name"
          placeholder="Kriterium"
        />
        </div>
        <div class="column">
        <b-input
          id="xPathInputText"
          type="text"
          v-model="xPath"
          placeholder="xPath"
        />
        </div>
      </div>
        
        <b-button id="btn" @click="addCriteria">Hinzufügen</b-button>
    </form>
  <!-- </div> -->
</template>

<script>



export default {
  name: "NewStudyAddCriteria",
  data() {
    return {
      name: "",
      xPath: "",
    };
  },
  methods: {
    addCriteria(e) {
      e.preventDefault();
      const newCriteria = {
        name: this.name,
        xPath: this.xPath,
      };
      this.$emit("add-criteria", newCriteria);
    },
  },
};
</script>

<style lang="scss">
/* .inputContainer {
  display: inline-flex;
  width: 100%;
  margin-bottom: 1%;
  /* background-color:green; */
/* }  */


#btn{
    float: right;
    margin: 0 0 1% 1%;
}
</style>
