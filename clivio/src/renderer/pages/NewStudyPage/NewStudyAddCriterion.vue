<template>
  <main>
    <h3>Neues Kriterium</h3>
    <!-- TODO: put in new divs and change margin instead of br -->

    <div class="columns">
      <div id="parent" class="column">
        <div class="cleft">
          <b-select
            id="selector"
            v-model="criterion_type"
            placeholder="Typ"
            size="is-small"
          >
            <option value="EK">Einschlusskriterium</option>
            <option value="AK">Ausschlusskriterium</option>
          </b-select>
        </div>

        <div class="cright">
          <b-input
            id="criterion"
            type="text"
            v-model="name"
            placeholder="Kriterium"
          />
        </div>
      </div>
    </div>

    <div
      class="input-area columns"
      v-for="condition in conditions"
      :key="condition.conditionId"
    >
      <div class="column">
        <b-input
          :id="condition.conditionId"
          v-model="condition.conditionName"
          type="text"
          placeholder="Bedingung"
        />
      </div>

      <div class="column is-half">
        <b-input
          :id="condition.xPathId"
          type="text"
          v-model="condition.condtionXpath"
          placeholder="xPath"
        />
       <b-input
          :id="condition.condtionNegativeXpathId"
          type="text"
          v-model="condition.condtionNegativeXpath"
          placeholder="Negative xPath"
        />
        <b-input
          :id="condition.roughXpathId"
          type="text"
          v-model="condition.roughXpath"
          placeholder="Grober xPath"
        />
          <b-input
          :id="condition.roughDescriptionXpathId"
          type="text"
          v-model="condition.roughDescriptionXpath"
          placeholder="Grober xPath Beschreibung"
        />

        
      </div>
    </div>
    <b-button rounded id="btn_add" @click="addNewLine">+</b-button>
    <b-button rounded id="btn_add" @click="removeLastLine">-</b-button>
    <b-button rounded id="btn_add" @click="addCriteria">Hinzufügen</b-button>

  </main>
</template>

<script>
export default {
  name: "NewStudyAddCriterion",
  data() {
    return {
      criterion_type: "",
      name: "",
      counter: 0,
      conditions: [
        {
          conditionId: "condition-0",
          xPathId: "xPath-0",
          condtionNegativeXpathId: "neg-xPath-0",
          roughXpathId: "value-xPath-0",
          roughDescriptionXpathId: "value-desc-xPath-0",
          conditionName: "",
          condtionXpath: "",
          condtionNegativeXpath: "",
          roughXpath: "",
          roughDescriptionXpath: "",
        },
      ],
    };
  },
  methods: {
    addCriteria(e) {
      e.preventDefault();
      const newCriteria = {
        criterion_type: this.criterion_type,
        name: this.name,
        conditions: this.conditions
      };
      this.$emit("add-criteria", newCriteria);
      this.name = ""
      this.criterion_type = ""
      this.conditions = [{
          conditionId: "condition-0",
          xPathId: "xPath-0",
          condtionNegativeXpathId: "neg-xPath-0",
          roughXpathId: "value-xPath-0",
          roughDescriptionXpathId: "value-desc-xPath-0",
          conditionName: "",
          condtionXpath: "",
          condtionNegativeXpath: "",
          roughXpath: "",
          roughDescriptionXpath: "",
        },]
    },
    addNewLine() {
      this.conditions.push({
        conditionId: `condition-${++this.counter}`,
        xPathId: `xPath-${++this.counter}`,
        condtionNegativeXpathId: `neg-xPath-${++this.counter}`,
        roughXpathId:`value-xPath-${++this.counter}`,
        roughDescriptionXpathId:`value-desc-xPath-${++this.counter}`,
        conditionName: "",
        condtionXpath: "",
        condtionNegativeXpath: "",
        roughXpath: "",
        roughDescriptionXpath: "",
      }); 
    },
    removeLastLine() {
        this.conditions.pop(); 
    }
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

#btn_add,
#btn_import {
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
