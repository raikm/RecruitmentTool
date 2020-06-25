<template>
  <div class="main">
    <b-table
      :hoverable="true"
      :data="currentStudies"
      selectable
      @select="select"
    >
      <template slot-scope="props">
        <b-table-column field="name" label="Studienname" width="40%">
          {{ props.row.Study_Name }}
        </b-table-column>
        <b-table-column
          field="investigator"
          label="Verantwortlicher"
          width="30%"
        >
          <!-- {{ props.row.Study_Name }} -->
        </b-table-column>
        <b-table-column field="lastAnalyse" label="Letzte Analyse" width="30%">
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
      console.log(study_id)
      axios({
        method: "get",
        url: "http://192.168.0.33:8000/api/getStudy/study_id=" + study_id,
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

<style></style>
