<template>
  <main>
    <AppHeader :headerName="headerName" />
    <ResultListLight :currentSelectedPatients="currentSelectedPatients"/>


      <b-button id="btn-save-selected-patients" @click="saveSelectedPatients()"
      >Speichern und Beenden</b-button
    >

  </main>
</template>

<script>
import AppHeader from "../../components/AppHeader";
import ResultListLight from "./ResultListLight"

export default {
  name: "SelectedPatientsHistoryPage",
   components: {
    AppHeader, ResultListLight},
  data() {
    return {    
      headerName: "HISTORIE: AUSGEWÄHLTE PATIENTEN/PATIENTINNEN",
      currentSelectedPatients: this.$route.query,
    };
  },
}

</script>

<style lang="scss">
#btn-save-selected-patients {
  margin-top: 25px;
  margin-right: 25px;
  float: right;
}
</style>