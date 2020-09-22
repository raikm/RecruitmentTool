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
    // this.response = this.$route.query.patients
   
  },
  data() {
    return {
      headerName: "AUSWERTUNG",
      response: [],
    };
  },
  mounted: function(){
    // // DEBUG ----------------------
   axios({
        method: "POST",
        url: "http://127.0.0.1:8000/api/debug/",
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {

          //console.log(response.data.patients)
          this.response = response.data.patients
          
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
