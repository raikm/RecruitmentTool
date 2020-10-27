<template>
  <main>
    <h3>Patienten/Patientinnen auswählen</h3>
  
      <button
        class="is-danger"
        @click="checkedRows = []"
        :disabled="!checkedRows.length"
      >
        <span>Auswahl zurücksetzen</span>
      </button>


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
    <span id="note-repository">Hinweis: Diese Patienten/Patientinnen sind im Repository hinterlegt.</span>
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
