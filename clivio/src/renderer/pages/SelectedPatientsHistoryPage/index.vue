<template>
  <main>
    <AppHeader :headerName="headerName" />
    <ResultListLight :selectedPatients="selectedPatients"/>
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
      selectedPatients: this.$route.query,
    };
  },
}

</script>