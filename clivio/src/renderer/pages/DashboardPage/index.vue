<template>
  <main>
    <AppHeader v-bind:headerName="headerName" />
    <div class="mainContainer">
      <h1 class="title is-4" id="table-title">AKTUELLE STUDIEN</h1>
    <CurrentStudiesList
      id="currentStudiesList"
      :currentStudies="currentStudies"
    />
    </div>
  </main>
</template>

<script>
import AppHeader from "../../components/AppHeader";
import CurrentStudiesList from "./CurrentStudiesList";

export default {
  name: "EvaluationPage",
  //   props: ["responseJson"],
  components: {
    AppHeader,
    CurrentStudiesList,
  },
  mounted() {
    this.getAllStudies();
  },
  methods: {
    getAllStudies(){
      axios({
        method: "get",
        url: "http://192.168.0.71:8000/api/getAllStudies/",
        // headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
          this.responseJson = response.data
          this.currentStudies = this.responseJson
      })
      .catch((response) => {
          //TODO: handle error: toast
          console.log(response);
      });
    }
  },
  data() {
    return {
      headerName: "DASHBOARD",
      currentStudies: [],
    };
  },
};
</script>

<style>
td:first-child {
  width: 600px;
}

#table-title{
  margin: 2vh 0 ;
letter-spacing: 2px;
}



</style>
