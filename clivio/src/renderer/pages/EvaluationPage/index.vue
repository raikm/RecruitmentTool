<template>
  <main>
    <AppHeader v-bind:headerName="headerName" />
    <ResultList :response="response" />
  </main>
</template>

<script>
import AppHeader from "../../components/AppHeader";
import ResultList from "./ResultList"

export default {
  name: "EvaluationPage",
  components: {
    AppHeader,
    ResultList
  },
  created: function() {
    this.response = this.$route.query.patients
   
  },
  data() {
    return {
      headerName: "AUSWERTUNG",
      response: [],
    };
  },
};
</script>

<style>
#btnNewStudy {
  margin-top: 25px;
}
</style>
