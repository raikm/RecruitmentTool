<template>
  <main>
    <AppHeader v-bind:headerName="headerName" />
    <ResultList ref="ResultList" :response="response" />
    <b-button id="btn-save-selected-patients" @click="saveSelectedPatients()"
      >Speichern und Beenden</b-button
    >
  </main>
</template>

<script>
import AppHeader from "../../components/AppHeader";
import ResultList from "./ResultList";

export default {
  name: "EvaluationPage",
  components: {
    AppHeader,
    ResultList,
  },
  created: function () {
    this.response = this.$route.query.patients
     },
  data() {
    return {
      headerName: "AUSWERTUNG",
      response: [],
    };
  },
  methods: {
    saveSelectedPatients() {
      console.log(this.$refs.ResultList.selectedPatients);

      const formData = new FormData();
      const selectedData = this.$refs.ResultList.selectedPatients;

      var selectedDataJson = JSON.stringify(selectedData);
      formData.append("Study_Id", this.$route.query.study_id);
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
        this.$router.push({ name:"dashboard-page" });
    },
  },
};
</script>

<style>
#btnNewStudy {
  margin-top: 25px;
}

#btn-save-selected-patients {
  margin-top: 25px;
  margin-right: 25px;
  float: right;
}
</style>
