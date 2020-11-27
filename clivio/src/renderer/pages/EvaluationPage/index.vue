<template>
  <main>
    <AppHeader v-bind:headerName="headerName" />
    <div class="boxContainer">
      <StudyBasicinfos :study="this.$route.query[1]" />
    </div>
    <div class="boxContainer">
      <ResultList
        id="resulst-list-container"
        ref="ResultList"
        :patientListDefault="patientListDefault"
      />
    </div>
    <b-button
      rounded
      id="btn-save-selected-patients"
      @click="saveSelectedPatients()"
      >Speichern und Beenden</b-button
    >
  </main>
</template>

<script>
import AppHeader from "../../components/AppHeader";
import ResultList from "./ResultList";
import StudyBasicinfos from "../StudyPage/StudyBasicinfos";

export default {
  name: "EvaluationPage",
  components: {
    AppHeader,
    StudyBasicinfos,
    ResultList,
  },
  created: function () {
    if (this.$route.query.length > 0) {
      var _list = this.$route.query[0].patients.sort((a, b) =>
        a.criterion_results_overview_ic < b.criterion_results_overview_ic
          ? 1
          : -1
      );
      this.patientListDefault = _list.sort((a, b) =>
        a.criterion_results_overview_ec > b.criterion_results_overview_ec
          ? 1
          : -1
      );
    }
  },
  data() {
    return {
      headerName: "AUSWERTUNG",
      patientListDefault: [],
      study: {},
    };
  },
  methods: {
    saveSelectedPatients() {
      const formData = new FormData();
      const selectedData = this.$refs.ResultList.selectedPatients;

      var selectedDataJson = JSON.stringify(selectedData);
      formData.append("Study_Id", this.$route.query[0].study_id);
      formData.append("Selected_Patients[]", selectedDataJson);
      this.showToastInfo("Auswahl wird gespeichert");
      axios({
        method: "POST",
        url: "http://127.0.0.1:8000/api/saveSelectedPatients/",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          this.showToastInfo(response.data);
        })
        .catch((response) => {
          this.showToastInfo(response.data);
        });
      this.$router.push({ name: "dashboard-page" });
    },
  },
};
</script>

<style>
#resulst-list-container {
  margin-top: 30px;
}
#btnNewStudy {
  margin-top: 25px;
}

#btn-save-selected-patients {
  margin-top: 25px;
  margin-right: 25px;
  float: right;
}
</style>
