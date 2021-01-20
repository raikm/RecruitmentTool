<template>
  <main>
    <AppHeader v-bind:headerName="headerName" />
    <div class="boxContainer">
      <h1 class="title is-4" id="table-title">Klinische Studien</h1>
      <CurrentStudiesList
        id="currentStudiesList"
        :currentStudies="currentStudies"
      />
    </div>
    <div class="button-line">
      <b-button rounded id="btn-new-study" @click="openStudyEditorPage()"
        >Neue Studie anlegen</b-button
      >
      <b-button rounded id="btn-upload-testdata" @click="uploadTestData()"
        >Testdaten hochladen</b-button
      >
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
    getAllStudies() {
      axios({
        method: "get",
        url: "http://127.0.0.1:8000/api/getAllStudies/",
        // headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          this.responseJson = response.data;
          this.currentStudies = this.responseJson;
        })
        .catch((response) => {
          this.showToastError(response);
        });
    },
    openStudyEditorPage() {
      this.$router.push({
        name: "study-editor-page",
      });
    },
    uploadTestData() {
      this.showToastInfo("CDA Files werden hochgeladen ...");
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/prepareTestData/",
      })
        .then((response) => {
          this.showToastInfo("Upload der Testdaten abgeschlossen!");
        })
        .catch((response) => {
          this.showToastError(response);
        });
    },
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

#table-title {
  margin: 2vh 0;
  letter-spacing: 2px;
}

#btn-upload-testdata {
}


.button-line{
  margin: 10px 30px;
  float: right;
}
</style>
