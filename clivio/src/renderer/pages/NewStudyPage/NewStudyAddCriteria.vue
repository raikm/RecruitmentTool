<template>
  <!-- <div class="main"> -->
  <form>
    <h3>Neues Kriterium</h3>
    <!-- TODO: put in new divs and change margin instead of br -->

    <div class="columns">
      <div id = "parent" class="column">
        <div class="cleft">
          <b-select  id="selector" v-model="criteria_type" placeholder="Typ" size="is-small">
            <option value="EK">Einschlusskriterium</option>
            <option value="AK">Ausschlusskriterium</option>
          </b-select>
        </div>

        <div class="cright">
          <b-input
            id="criterium"
            type="text"
            v-model="name"
            placeholder="Kriterium"
          />
        </div>
      </div>

      <div class="column is-half">
        <b-input
          id="xPathInputText"
          type="text"
          v-model="xPath"
          placeholder="xPath"
        />
      </div>
    </div>
    
    <b-button id="btn_add" @click="addCriteria">Hinzufügen</b-button>
    <b-button id="btn_import">Import</b-button>
     
  </form>
  <!-- </div> -->
</template>

<script>
export default {
  name: "NewStudyAddCriteria",
  data() {
    return {
      // TODO: make to one object
      criteria_type: "",
      name: "",
      xPath: "",
    };
  },
  methods: {
    addCriteria(e) {
      e.preventDefault();
      const newCriteria = {
        criteria_type: this.criteria_type,
        name: this.name,
        xPath: this.xPath,
      };
      this.$emit("add-criteria", newCriteria);
      document.getElementById("criterium").value = ""
      document.getElementById("xPathInputText").value = ""
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

#btn_add, #btn_import {
  float: right;
  margin: 0 0 1% 1%;
}

#parent {
  display: flex;
  justify-content: flex-start;
}


.cleft {
  width: 150px;
  margin-right: 12px;
}

.cright {
  width: 100%;
}
</style>
