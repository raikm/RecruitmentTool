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
    <b-button id="btn-upload-testdata" @click="uploadTestData()">Upload Testdata</b-button>
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
        url: "http://127.0.0.1:8000/api/getAllStudies/",
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
    },
    uploadTestData(){
       axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/prepareTestData/",
      })
      .then((response) => {
         alert("Testdata successfuly uploaded!")
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

#btn-upload-testdata{
  float: right;
  margin-right: 1.5%;
}




</style>
