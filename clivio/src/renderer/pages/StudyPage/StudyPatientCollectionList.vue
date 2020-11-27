<template>
  <main>
    <div class="main">
      <b-button rounded
         type="is-small"
        @click="checkedRows = []"
        :disabled="!checkedRows.length"
      >
          <b-icon icon="rotate-left" size="is-small" title="Auswahl zurücksetzen"> </b-icon > reset
      </b-button>
  <div id="note-repository">Hinweis: Diese Patienten/Patientinnen sind im Repository hinterlegt.</div>

    <section>
      <b-table
        :data="patientData"
        :columns="columns"
        :checked-rows.sync="checkedRows"
        checkable
        checkbox-position="left"
      >
      </b-table>

  
        </section>
    </div>
  </main>
  
</template>

<script>
export default {
  name: "StudyPatientCollectionList",
  props: ["patientData"],
  data() {
    return {
      checkedRows: [],
      columns: [
        {
          field: "patient_id",
          label: "Patienten ID",
          width: "120",
          numeric: true,
        },
        {
          field: "patient_first_name",
          label: "Vorname",
        },
        {
          field: "patient_last_name",
          label: "Nachname",
        },
      ],
    };
  },
};
</script>

<style lang="scss">

#note-repository{
    float: right;
    font-size: 12px;
    font-style: italic;
}
</style>
