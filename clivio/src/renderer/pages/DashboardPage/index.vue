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
  created: function() {
    //TODO: get saved studies
  },
  data() {
    return {
      headerName: "DASHBOARD",
      currentStudies: [
        {
          id: 1, //db-id
          name: "Studie A",
          investigator: "Prof. X",
          lastCheck: "Date()",
        },
        {
          id: 2,
          name: "Studie B",
          investigator: "Prof. X",
          lastCheck: "Date()",
        },
      ],
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
