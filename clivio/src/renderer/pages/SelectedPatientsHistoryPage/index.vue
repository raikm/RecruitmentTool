<template>
  <main>
    <AppHeader :headerName="headerName" />
    <div class="boxContainer">
      <StudyBasicinfos :study="this.$route.query[1]" />
    </div>

    <div
      class="boxContainer"
      v-if="
        typeof patientListDefault !== 'undefined' &&
        patientListDefault.length > 0
      "
    >
      <ResultList ref="ResultList" :patientListDefault="patientListDefault" />
    </div>
    <div class="boxContainer" v-else>
      Keine PatientInnen wurden für diese Studie bisher ausgewählt!
    </div>
    <b-button
      rounded
      id="btn-save-selected-patients"
      @click="saveSelectedPatients()"
      >Speichern und Beenden</b-button
    >
    <b-button
      rounded
      id="btn-export-selected-patients"
      @click="exportSelectedPatients()"
      >Export</b-button
    >
  </main>
</template>

<script>
import AppHeader from "../../components/AppHeader";
import ResultList from "../EvaluationPage/ResultList";
import StudyBasicinfos from "../StudyPage/StudyBasicinfos";

export default {
  name: "SelectedPatientsHistoryPage",
  components: {
    AppHeader,
    StudyBasicinfos,
    ResultList,
  },
  data() {
    return {
      headerName: "HISTORIE: AUSGEWÄHLTE PATIENTEN/PATIENTINNEN",
      patientListDefault: this.$route.query[0],
    };
  },
  methods: {
    saveSelectedPatients() {
      const formData = new FormData();
      const rejectedData = this.$refs.ResultList.rejectedPatients;
      var rejectedDataJson = JSON.stringify(rejectedData);

      formData.append("Study_Id", this.$route.query[1].id);
      formData.append("Rejected_Patients[]", rejectedDataJson);

      axios({
        method: "POST",
        url: "http://127.0.0.1:8000/api/saveSelectedPatients/",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          this.showToastInfo("Auswahl gespeichert");
        })
        .catch((response) => {
          this.showToastInfo(response.data);
        });
      this.$router.push({ name: "dashboard-page" });
    },
    exportSelectedPatients() {
      this.showToastInfo("export");
      //create file
      if (
        typeof this.patientListDefault !== "undefined" &&
        this.patientListDefault.length > 0
      ) {
        var dictstring = JSON.stringify(this.patientListDefault);

        const os = require("os");
        const strDesktopPath = os.homedir() + "/Desktop"

        var fs = require("fs");
        fs.writeFile(strDesktopPath + "/export.json", dictstring);
      } else {
        this.showToastError("Liste ist leer");
      }

      //write json into it

      //
    },
  },
};
</script>

<style lang="scss">
#btn-save-selected-patients,
#btn-export-selected-patients {
  margin-top: 25px;
  margin-right: 25px;
  float: right;
}
</style>