<template>
  <main>
    <AppHeader :headerName="headerName" />
   <div class="boxContainer">
      <StudyBasicinfos :study="this.$route.query[1]" />
    </div>

    <div class="boxContainer">
    <ResultListLight
      ref="ResultListLight"
      :currentSelectedPatients="currentSelectedPatients"
    />
 </div>
    <b-button rounded id="btn-save-selected-patients" @click="saveSelectedPatients()"
      >Speichern und Beenden</b-button
    >
   
  </main>
</template>

<script>
import AppHeader from "../../components/AppHeader";
import ResultListLight from "./ResultListLight";
import StudyBasicinfos from "../StudyPage/StudyBasicinfos"

export default {
  name: "SelectedPatientsHistoryPage",
  components: {
    AppHeader,
    StudyBasicinfos,
    ResultListLight,
  },
  data() {
    return {
      headerName: "HISTORIE: AUSGEWÄHLTE PATIENTEN/PATIENTINNEN",
      currentSelectedPatients: this.$route.query[0],
    };
  },
  methods: {
    saveSelectedPatients() {
      const formData = new FormData();
      const rejectedData = this.$refs.ResultListLight.rejectedPatients;
      var rejectedDataJson = JSON.stringify(rejectedData);
      formData.append("Study_Id",  this.$route.query[1]);
      formData.append("Rejected_Patients[]", rejectedDataJson);
      this.showToastInfo("Auswahl wird gespeichert");
      axios({
        method: "POST",
        url: "http://127.0.0.1:8000/api/updateSelectedPatients/",
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

<style lang="scss">
#btn-save-selected-patients {
  margin-top: 25px;
  margin-right: 25px;
  float: right;
}
</style>