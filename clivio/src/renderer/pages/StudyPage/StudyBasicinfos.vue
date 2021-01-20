<template>
  <form>
    <div class="study-meta-data-container">
      <div>
        <h1 class="title is-5">
          {{ study.name }} [{{ study.eudraCT_number }}]
        </h1>
      </div>
      <div v-if="this.$route.name == 'study-page'">
        <b-button rounded
          id="btn-selected-patients"
          class="is-small"
          title="Patienten die nach Überprüfung gespeichert wurden"
          @click="getSelectedPatients(study.id)"
        >
          <b-icon icon="playlist-check" size="is-small"> </b-icon
        ></b-button>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <b-field label="Primary Investigator" label-position="inside">
          <b-input
            class="input-field-basic"
            id="head-of-study"
            type="text"
            :value="study.head_of_study"
            disabled
          />
        </b-field>
        <b-field label="Kontakt" label-position="inside">
          <b-input
            class="input-field-basic"
            id="head-of-study-contact"
            type="text"
            :value="study.head_of_study_contact"
            disabled
          />
        </b-field>
      </div>
      <div class="column">
        <b-field label="Anzahl Kriterien gesamt" label-position="inside">
          <b-input
            class="input-field-basic"
            id="criterion-count"
            type="text"
            :value="study.criterion_count"
            disabled
          />
        </b-field>
        <b-field label="Anzahl ELGA Kriterien" label-position="inside">
          <b-input
            class="input-field-basic"
            id="criterion-elga-count"
            type="text"
            :value="study.elga_criterion_count"
            disabled
          />
        </b-field>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "StudyBasicinfos",
  props: ["study"],
  methods: {
    getSelectedPatients(id) {
      var study_id = id;
      axios({
        method: "get",
        url:
          "http://127.0.0.1:8000/api/getSelectedPatients/study_id=" +
          study_id.toString(),
      })
        .then((response) => {
          this.$router.push({
            name: "selected-patient-history-page",
            query: [response.data, this.study],
          });
        })
        .catch((response) => {
          this.showToastInfo(response);
        });
    },
  }
};
</script>

<style lang="scss">
.input-field-basic {
  margin-top: 5px;
}

.study-meta-data-container {
  display: inline-flex;
}
</style>
