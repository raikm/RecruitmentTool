<template>
  <div class="main">
    <b-table
    class="overview-clinical-trails-table"
      :hoverable="true"
      :data="currentStudies"
      selectable
      @select="select"
      focusable
    >
      <template slot-scope="props">
        <b-table-column class="overview-clinical-trails-table-line" field="name" label="Studienname" width="40%">
          {{ props.row.Study_Name }}
        </b-table-column>
        <b-table-column
          field="investigator"
          label="Verantwortlicher"
          width="30%"
          class="overview-clinical-trails-table-line"
        >
          <!-- {{ props.row.Study_Name }} -->
        </b-table-column>
        <b-table-column class="overview-clinical-trails-table-line" field="lastAnalyse" label="Letzte Analyse" width="30%">
          <!-- {{ props.row.Study_Name }} -->
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "CurrentStudiesList",
  components: {},
  props: ["currentStudies"],
  methods: {
    select(row) {
      var study_id = row.Study_ID;
      axios({
        method: "get",
        url: "http://127.0.0.1:8000/api/getStudy/study_id=" + study_id,
        // headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          this.selectedStudyJson = response.data;
          this.$router.push({ name: "study-page", query: this.selectedStudyJson });
        })
        .catch((response) => {
          //TODO: handle error: toast
          console.log(response);
        });
     
    },
  },
  data() {
    return {
      selectedStudyJson: []  
    };
  },
};
</script>

<style>
.overview-clinical-trails-table{
   -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
 
}

.overview-clinical-trails-table-line{
  cursor: pointer;
}

</style>
