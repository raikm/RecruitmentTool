<template>
  <main>
    <b-field label="Neues Kriterium"></b-field>
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
          v-model="condition.name"
          type="text"
          placeholder="Bedingung"
        />
      </div>

      <div class="column is-half">
        <b-input
          class="input-xPath"
          :id="condition.xPathId"
          type="text"
          v-model="condition.xpath"
          placeholder="xPath"
        />
       <b-input
        class="input-xPath"
          :id="condition.xpathId"
          type="text"
          v-model="condition.neg_xpath"
          placeholder="Negative xPath"
        />
        <b-input
         class="input-xPath"
          :id="condition.rough_xpathId"
          type="text"
          v-model="condition.rough_xpath"
          placeholder="Grober xPath"
        />
          <b-input
           class="input-xPath"
          :id="condition.rough_xpath_descriptionId"
          type="text"
          v-model="condition.rough_xpath_description"
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
          xpathId: "neg-xPath-0",
          rough_xpathId: "value-xPath-0",
          rough_xpath_descriptionId: "value-desc-xPath-0",
          name: "",
          xpath: "",
          neg_xpath: "",
          rough_xpath: "",
          rough_xpath_description: "",
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
          xpathId: "neg-xPath-0",
          rough_xpathId: "value-xPath-0",
          rough_xpath_descriptionId: "value-desc-xPath-0",
          name: "",
          xpath: "",
          neg_xpath: "",
          rough_xpath: "",
          rough_xpath_description: "",
        },]
    },
    addNewLine() {
      this.conditions.push({
        conditionId: `condition-${++this.counter}`,
        xPathId: `xPath-${++this.counter}`,
        xpathId: `neg-xPath-${++this.counter}`,
        rough_xpathId:`value-xPath-${++this.counter}`,
        rough_xpath_descriptionId:`value-desc-xPath-${++this.counter}`,
        name: "",
        xpath: "",
        neg_xpath: "",
        rough_xpath: "",
        rough_xpath_description: "",
      }); 
    },
    removeLastLine() {
        this.conditions.pop(); 
    }
  },
};
</script>

<style lang="scss">


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

.input-xPath{
  margin-bottom: 25px;
}
</style>
