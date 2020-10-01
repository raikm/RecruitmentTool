<template>
  <div>
    <div id="overview-header">
      <b-button @click="showConditionDetails">Zurück</b-button>
    </div>
    <div id="overview-container">
      <div
        class="type-tag"
        :class="{
        greenBackgroundClass: currentCriterion.criterion_type == 'EK',
        redBackgroundClass: currentCriterion.criterion_type == 'AK',
      }"
      >{{ currentCriterion.criterion_type }}</div>
      <h1 id="condition-name">{{ currentCondition.name }}</h1>
      <h2 v-if="currentCondition.evaluation_results.positive_hits.length > 0" class="matches-subtitle">Positive Treffer</h2>

      <div
        class="hit-container"
        v-for="result in currentCondition.evaluation_results.positive_hits"
        :key="result.document_id"
        @click="openCDA(result.document_id)"
      >
        <div class="cda-datum-container">
          <h2
            class="cda-datum"
          >{{new Date(result.document_date).toLocaleDateString('en-GB')}} ({{calculateMonths(new Date(result.document_date))}} Monate)</h2>
        </div>

        <ul>
          <li class="hit-result" v-for="hit in result.hit_result" :key="hit">{{ hit }}</li>
        </ul>
      </div>
      <h2 v-if="currentCondition.evaluation_results.negative_hits.length > 0" class="matches-subtitle">Negative Treffer</h2>

      <div
        class="hit-container"
        v-for="result in currentCondition.evaluation_results.negative_hits"
        :key="result.document_id"
        @click="openCDA(result.document_id)"
      >
        <div
          class="cda-datum"
        >>{{new Date(result.document_date).toLocaleDateString('en-GB')}} ({{calculateMonths(new Date(result.document_date))}} Monate)</div>

        <ul>
          <li class="hit-result" v-for="hit in result.hit_result" :key="hit">{{ hit }}</li>
        </ul>
      </div>
    </div>

    <div id="cda-viewer" v-html="htmlCDAFile"></div>
  </div>
</template>

<script>
export default {
  name: "ConditionDetails",
  components: {},
  props: ["currentCondition", "currentCriterion", "patientID"],
  data() {
    return {
      htmlCDAFile: null
    };
  },
  methods: {
    openCDA(document_id) {
      this.showToastInfo("CDA Datei wird heruntergeladen");
      axios({
        method: "GET",
        url:
          "http://127.0.0.1:8000/api/getVisualizedCda/patient_id=" +
          this.patientID +
          "/document_id=" +
          document_id.toString(),
        headers: { "Content-Type": "multipart/form-data" }
      })
        .then(response => {
          this.htmlCDAFile = response.data;
          var overviewContainer = document.getElementById("overview-container");
          overviewContainer.style.display = "None";
          var overviewHeader = document.getElementById("overview-header");
          overviewHeader.style.display = "inline";
        })
        .catch(response => {
          console.log(response);
        });
    },
    showConditionDetails() {
      var overviewContainer = document.getElementById("overview-container");
      overviewContainer.style.display = "inline";
      this.htmlCDAFile = null;
      var overviewHeader = document.getElementById("overview-header");
      overviewHeader.style.display = "None";
    },
    calculateMonths(document_date) {
      var current_date = new Date();
      var months =
        current_date.getFullYear() * 12 +
        current_date.getMonth() -
        (document_date.getFullYear() * 12 + document_date.getMonth());
      return months;
    }
  }
};
</script>

<style>


#condition-name{
   font-size: large;
}
.matches-subtitle {
  margin-left: 6%;
  font-size: medium;
  font-weight: 600;
}

.hit-container {
  width: 90%;
  margin: 0 6%;
  padding: 1%;
  border-width: 0.5px;
  border-color: teal;
  border-style: solid;
  display: inline-block;
   cursor: pointer;

}
.hit-container:hover {
  background: rgba(128, 128, 128, 0.09);
}


.cda-datum-container {
  float: right;
}
.cda-datum {
  font-style: italic;
}
.hit-result {
  margin-top: 1vh;
  width: 100%;
  border-width: 0.1px;
  border-color: rgba(0, 128, 128, 0.513);
  border-style: dotted;
  display: inline-block;

}

#overview-header {
  display: None;
}

#cda-viewer {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  max-height: 80vh;
  background: white;
  padding: 1%;
  
}
</style>
