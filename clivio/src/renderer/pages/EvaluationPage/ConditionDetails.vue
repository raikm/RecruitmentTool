<template>
  <div>
    <div id="overview-header">
      <b-button rounded @click="showConditionDetails">Zurück</b-button>
    </div>
    <div v-if="currentCriterion" id="overview-container">
      <div
        class="type-tag"
        :class="{
          greenBackgroundClass: currentCriterion.criterion_type == 'EK',
          redBackgroundClass: currentCriterion.criterion_type == 'AK',
        }"
      >
        {{ currentCriterion.criterion_type }}
      </div>
      <h1 id="condition-name">{{ currentCondition.name }}</h1>
        <div
         v-if="currentCondition.evaluation_results.positive_hits.length > 0"
        class="type-tag"
        :class="{
          greenFillClass: currentCriterion.criterion_type == 'EK',
          redFillClass: currentCriterion.criterion_type == 'AK',
        }"
      >
       ⬤
      </div>
      <h2
        v-if="currentCondition.evaluation_results.positive_hits.length > 0"
        class="matches-subtitle"
      >
        Positive Treffer
      </h2>

      <div
        class="hit-container"
        v-for="result in currentCondition.evaluation_results.positive_hits"
        :key="result.document_id"
        @click="openCDA(result.document_id, result.document_hit_position[0])"
        @mouseover="showToolTip(result.document_id, 1)"
        @mouseleave="hideToolTip(result.document_id, 1)"
      >
        <div class="cda-detail-container">
          <div class="cda-detail-container">
            <div class="cda-meta-infos">
              <b-icon icon="file-document" size="is-small"> </b-icon>
              <span>ELGA Dokument vom&nbsp;</span>
            </div>
          </div>
          <h2 class="cda-datum">
            <span>
              {{ new Date(result.document_date).toLocaleDateString("en-GB") }}
              ({{ calculateMonths(new Date(result.document_date)) }}
              Monate)
            </span>
          </h2>
        </div>

        <ul>
          <li class="hit-result" v-for="hit in result.hit_result" :key="hit">
            {{ hit }}
          </li>
        </ul>
        <div
          class="cda-detail-container-tooltip"
          :id="'cda-detail-container-tooltip-' + result.document_id"
        >
          <b-icon icon="file-download-outline" size="is-small"> </b-icon>

          <span>ELGA Dokument öffnen </span>
        </div>
      </div>
       <div
        v-if="currentCondition.evaluation_results.negative_hits.length > 0"
        class="type-tag"
        :class="{
          redFillClass: currentCriterion.criterion_type == 'EK',
          greenFillClass: currentCriterion.criterion_type == 'AK',
        }"
      >
       ⬤
      </div>
      <h2
        v-if="currentCondition.evaluation_results.negative_hits.length > 0"
        class="matches-subtitle"
      >
        Negative Treffer
      </h2>

      <div
        class="hit-container"
        v-for="result in currentCondition.evaluation_results.negative_hits"
        :key="result.document_id"
        @click="openCDA(result.document_id, result.document_hit_position[0])"
        @mouseover="showToolTip(result.document_id, 2)"
        @mouseleave="hideToolTip(result.document_id, 2)"
      >
        <div class="cda-detail-container">
          <div class="cda-meta-infos">
            <b-icon icon="file-document" size="is-small"> </b-icon>
            <span>ELGA Dokument vom&nbsp;</span>
          </div>
          <div class="cda-datum">
            <span>
              {{ new Date(result.document_date).toLocaleDateString("en-GB") }}
              ({{ calculateMonths(new Date(result.document_date)) }}
              Monate)
            </span>
          </div>
        </div>
        <ul>
          <li class="hit-result" v-for="hit in result.hit_result" :key="hit">
            {{ hit }}
          </li>
        </ul>
        <div
          class="cda-detail-container-tooltip"
          :id="'cda-detail-container-tooltip-negative-' + result.document_id"
        >
          <b-icon icon="file-download-outline" size="is-small"> </b-icon>

          <span>ELGA Dokument öffnen </span>
        </div>
      </div>

      <h2
        v-if="currentCondition.value_results.values.length > 0"
        class="matches-subtitle information-need-title"

      >
        Informationsbedürfnisse
      </h2>

      <div
        class="hit-container"
        v-for="result in currentCondition.value_results.values"
        :key="result.document_id"
        @click="openCDA(result.document_id, null)"
        @mouseover="showToolTip(result.document_id, 3)"
        @mouseleave="hideToolTip(result.document_id, 3)"
      >
        <div class="cda-detail-container">
          <div class="cda-meta-infos">
            <b-icon icon="file-document" size="is-small"> </b-icon>
            <span>ELGA Dokument vom&nbsp;</span>
          </div>

          <div class="cda-datum">
            <span>
              {{ new Date(result.document_date).toLocaleDateString("en-GB") }}
              ({{ calculateMonths(new Date(result.document_date)) }}
              Monate)
            </span>
          </div>
        </div>

        <div class="value-description">
          <span>{{ result.value_result_description }}</span>
        </div>

        <ul>
          <li class="hit-result" v-for="hit in result.value_result" :key="hit">
            {{ hit }}
          </li>
        </ul>
        <div
          class="cda-detail-container-tooltip"
          :id="'cda-detail-container-tooltip-rough-' + result.document_id"
        >
          <b-icon icon="file-download-outline" size="is-small"> </b-icon>

          <span>ELGA Dokument öffnen </span>
        </div>
      </div>
    </div>
    <div v-if="currentInformation" id="overview-container">
      <h2
        class="matches-subtitle"
      >
        Informationsbedürfnisse für: {{currentInformation.information}}
      </h2>

      <div
        class="hit-container"
        v-for="result in currentInformation.results_for_documents"
        :key="result.document_id"
        @click="openCDA(result.document_id, null)"
        @mouseover="showToolTip(result.document_id, 3)"
        @mouseleave="hideToolTip(result.document_id, 3)"
      >
        <div class="cda-detail-container">
          <div class="cda-meta-infos">
            <b-icon icon="file-document" size="is-small"> </b-icon>
            <span>ELGA Dokument vom&nbsp;</span>
          </div>

          <div class="cda-datum">
            <span>
              {{ new Date(result.document_date).toLocaleDateString("en-GB") }}
              ({{ calculateMonths(new Date(result.document_date)) }}
              Monate)
            </span>
          </div>
        </div>


        <ul>
          <li class="hit-result" v-for="hit in result.value_results" :key="hit">
            {{ hit }}
          </li>
        </ul>
        <div
          class="cda-detail-container-tooltip"
          :id="'cda-detail-container-tooltip-rough-' + result.document_id"
        >
          <b-icon icon="file-download-outline" size="is-small"> </b-icon>

          <span>ELGA Dokument öffnen </span>
        </div>
      </div>
    </div>

    <div v-if="htmlCDAFile" id="cda-viewer" v-html="htmlCDAFile"></div>
  </div>
</template>

<script>
export default {
  name: "ConditionDetails",
  components: {},
  props: [
    "currentCondition",
    "currentCriterion",
    "currentInformation",
    "patientID",
  ],
  data() {
    return {
      htmlCDAFile: null,
      scrollId: "",
    };
  },
  updated() {
    if (this.htmlCDAFile != null && this.scrollId != null) {
      //find id
      document.getElementById(this.scrollId).scrollIntoView();
      //TODO: try find plain text for marking it yellow
    }
  },

  methods: {
    openCDA(document_id, hitPositionId) {
      this.showToastInfo("CDA Datei wird heruntergeladen");
      axios({
        method: "GET",
        url:
          "http://127.0.0.1:8000/api/getVisualizedCda/patient_id=" +
          this.patientID +
          "/document_id=" +
          document_id.toString(),
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          this.htmlCDAFile = response.data;
          var overviewContainer = document.getElementById("overview-container");
          overviewContainer.style.display = "None";
          var overviewHeader = document.getElementById("overview-header");
          overviewHeader.style.display = "inline";
        })
        .catch((response) => {});
      if (hitPositionId != null){
      this.scrollId = hitPositionId;
      }else{
         this.scrollId = "IDPatientContainer";
      }
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
    },
    showToolTip(document_id, type) {
      if (type == 1) {
        document.getElementById(
          "cda-detail-container-tooltip-" + document_id
        ).style.display = "inline";
      } else if (type == 2) {
        document.getElementById(
          "cda-detail-container-tooltip-negative-" + document_id
        ).style.display = "inline";
      } else if (type == 3) {
        document.getElementById(
          "cda-detail-container-tooltip-rough-" + document_id
        ).style.display = "inline";
      }
    },
    hideToolTip(document_id, type) {
      if (type == 1) {
        document.getElementById(
          "cda-detail-container-tooltip-" + document_id
        ).style.display = "none";
      } else if (type == 2) {
        document.getElementById(
          "cda-detail-container-tooltip-negative-" + document_id
        ).style.display = "none";
      } else if (type == 3) {
        document.getElementById(
          "cda-detail-container-tooltip-rough-" + document_id
        ).style.display = "none";
      }
    },
  },
};
</script>

<style>
.overview-container {
  background: white;
}

#condition-name {
  font-size: large;
}
.matches-subtitle {
  margin-left: 6%;
  font-size: medium;
  font-weight: 600;
}

.hit-container {
  width: 88%;
  margin: 10px 6%;
  padding: 1%;
  border: 1px solid rgba(168, 165, 165, 0.487);
  border-radius: 5px;
  display: inline-block;
  cursor: pointer;
  background: white;
}
.hit-container:hover {
  background: rgba(128, 128, 128, 0.09);
}

.hit-container:hover ~ #file-document-icon {
  display: none;
}

.cda-detail-container {
  display: flex;
  justify-content: flex-end;
}
.cda-meta-infos {
  float: left;
}

.cda-datum {
}
.hit-result {
  margin-top: 1vh;
  width: 100%;
  padding: 2px 5px;
  border: 0.1px solid rgba(168, 165, 165, 0.179);
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

.cda-detail-container-tooltip {
  margin-top: 5px;
  display: none;
  float: right;
}

.information-need-title{
  color: var(--main-blue-transparent-color);
}
</style>
