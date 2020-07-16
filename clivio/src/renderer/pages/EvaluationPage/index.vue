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
  props: ["responseJson"],//TODO: that can be deleted I think
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
  mounted: function(){
    // DEBUG ----------------------
     axios({
        method: "GET",
        url: "http://192.168.0.71:8000/api/debug/",
      })
      .then((response) => {

          this.response = response.data.patients
          console.log(this.response)
      })
      .catch((response) => {
          console.log(response);
            
      });
    // DEBUG ----------------------
  }
};
</script>

<style>
#btnNewStudy {
  margin-top: 25px;
}
</style>
