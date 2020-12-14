<template>
  <div class="main">
    <b-table
      class="overview-clinical-trails-table"
      :hoverable="true"
      :data="currentStudies"
    >
      <template slot-scope="props">
        <b-table-column
          class="overview-clinical-trails-table-line"
          field="name"
          label="Studienname"
          width="30%"
        >
          <div @click="select(props.row)">{{ props.row.name }}</div>
        </b-table-column>
        <b-table-column
          field="investigator"
          label="Primary Investigator"
          width="30%"
          class="overview-clinical-trails-table-line"
        >
          <div @click="select(props.row)">{{ props.row.head_of_study }}</div>
        </b-table-column>
        <b-table-column
          field="id"
          label="Studien Nummer"
          width="30%"
          class="overview-clinical-trails-table-line"
        >
          <div @click="select(props.row)">{{ props.row.eudraCT_number }}</div>
        </b-table-column>
        <b-table-column
          class="overview-clinical-trails-table-line"
          field="selectedPatients"
          label=""
          width="5%"
          :centered="true"
        >
          <b-button rounded
            @click="getSelectedPatients(props.row)"
            size="is-small"
            title="ausgewählte Personen"        
          >
            <b-icon icon="playlist-check" size="is-small"> </b-icon
          ></b-button>
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
    getSelectedPatients(row) {
      var study_id = row.id;
      axios({
        method: "get",
        url:
          "http://127.0.0.1:8000/api/getSelectedPatients/study_id=" +
          study_id.toString(),
      })
        .then((response) => {
          this.$router.push({
            name: "selected-patient-history-page",
            query: [response.data, row],
          });
        })
        .catch((response) => {
          this.showToastInfo(response);
        });
    },
    select(row) {
      var study_id = row.id;
      axios({
        method: "get",
        url: "http://127.0.0.1:8000/api/getStudy/study_id=" + study_id,
        // headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          this.selectedStudyJson = response.data;
          this.$router.push({
            name: "study-page",
            query: this.selectedStudyJson,
          });
        })
        .catch((response) => {
          this.showToastError(response);
        });
    },
  },
  data() {
    return {
      selectedStudyJson: [],
    };
  },
};
</script>

<style>
.overview-clinical-trails-table {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.overview-clinical-trails-table-line {
  cursor: pointer;
}
</style>
