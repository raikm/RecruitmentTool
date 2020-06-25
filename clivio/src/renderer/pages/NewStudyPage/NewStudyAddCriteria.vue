<template>
  <main>
    <h3>Neues Kriterium</h3>
    <!-- TODO: put in new divs and change margin instead of br -->

    <div class="columns">
      <div id="parent" class="column">
        <div class="cleft">
          <b-select
            id="selector"
            v-model="criteria_type"
            placeholder="Typ"
            size="is-small"
          >
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
          v-model="condition.condtionxPath"
          placeholder="xPath"
        />
        <b-input
          :id="condition.valuexPathId"
          type="text"
          v-model="condition.valuexPath"
          placeholder="Value xPath"
        />
        
      </div>
    </div>
    <b-button id="btn_add" @click="addNewLine">+</b-button>
    <b-button id="btn_add" @click="removeLastLine">-</b-button>
    <b-button id="btn_add" @click="addCriteria">Hinzufügen</b-button>

  </main>
</template>

<script>
export default {
  name: "NewStudyAddCriteria",
  data() {
    return {
      // TODO: make to one object
      criteria_type: "",
      name: "",
      counter: 0,
      conditions: [
        {
          conditionId: "condition-0",
          xPathId: "xPath-0",
          valuexPathId: "value-xPath-0",
          conditionName: "",
          condtionxPath: "",
          valuexPath: ""
        },
      ],
    };
  },
  methods: {
    addCriteria(e) {
      e.preventDefault();
      const newCriteria = {
        criteria_type: this.criteria_type,
        name: this.name,
        conditions: this.conditions
      };
      this.$emit("add-criteria", newCriteria);
      this.name = ""
      this.criteria_type = ""
      this.conditions = [{
          conditionId: "condition-0",
          xPathId: "xPath-0",
          valuexPathId: "value-xPath-0",
          conditionName: "",
          condtionxPath: "",
          valuexPath: ""
        },]
    },
    addNewLine() {
      this.conditions.push({
        conditionId: `condition-${++this.counter}`,
        xPathId: `xPath-${++this.counter}`,
        valuexPathId:`value-xPath-${++this.counter}`,
        conditionName: "",
        condtionxPath: "",
        valuexPath: "",
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
