<template>
  <div>
    <div id="overview-header"><b-button @click="showConditionDetails">Zurück</b-button></div>
    <div id="overview-container">
    <div
      class="type-tag"
      :class="{
        greenBackgroundClass: currentCriterion.criterion_type == 'EK',
        redBackgroundClass: currentCriterion.criterion_type == 'AK',
      }"
    >{{ currentCriterion.criterion_type }}</div>
    <h1 id="condition-name">{{ currentCondition.name }}</h1>
    <h2 class="matches-subtitle">Positive Treffer</h2>

    <div
      class="hit-container"
      v-for="result in currentCondition.evaluation_results.positive_hits"
      :key="result.document_id"
      @click="openCDA(result.document_id)"
    >
      <div class="cda-datum">12.05.2020 (3d)</div>

      <ul>
        <li class="hit-result" v-for="hit in result.hit_result" :key="hit">{{ hit }}</li>
      </ul>
    </div>
    <h2 class="matches-subtitle">Negative Treffer</h2>

    <div
      class="hit-container"
      v-for="result in currentCondition.evaluation_results.negative_hits"
      :key="result.document_id"
      @click="openCDA(result.document_id)"
    >
      <div class="cda-datum">12.05.2020 (3d)</div>

      <ul>
        <li class="hit-result" v-for="hit in result.hit_result" :key="hit">{{ hit }}</li>
      </ul>
    </div>
    </div>
    <!-- TODO: Return Button-->
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
      htmlCDAFile: null,
    }
  },
  methods: {
    openCDA(document_id) {
      console.log("open" + document_id);
   axios({
        method: "GET",
        url: "http://127.0.0.1:8000/api/getVisualizedCda/patient_id="+ this.patientID +"/document_id=" + document_id.toString(),
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
          this.htmlCDAFile = response.data
          var overviewContainer= document.getElementById("overview-container")
          overviewContainer.style.display = 'None'
          var overviewHeader= document.getElementById("overview-header")
          overviewHeader.style.display = 'inline'
      })
      .catch((response) => {
          console.log(response);
            
      });    },
      showConditionDetails(){
         var overviewContainer= document.getElementById("overview-container")
          overviewContainer.style.display = 'inline'
          this.htmlCDAFile = null
          var overviewHeader= document.getElementById("overview-header")
          overviewHeader.style.display = 'None'
      }

      

  },
};
</script>

<style>
.matches-subtitle {
  margin-left: 5%;
}

.hit-container {
  width: 90%;
  margin: 0 5%;
  padding: 1%;
  border-width: 0.5px;
  border-color: teal;
  border-style: solid;
  display: inline-block;
}

.cda-datum {
  float: right;
}
.hit-result {
}

#overview-header{
  display: None;
}

#cda-viewer{
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  max-height: 80vh;
}
</style>
