<template>
  <div class="main">

    

    <b-table
      :hoverable="true"
      :columns="columns"
      :data="currentStudies"
    >
      <template slot-scope="props">
        <b-table-column field="name" label="Studienname" width="40%">
          {{ props.row.name }}
        </b-table-column>
         <b-table-column field="investigator" label="Verantwortlicher" width="30%">
          {{ props.row.investigator }}
        </b-table-column>
         <b-table-column field="lastAnalyse" label="Letzte Analyse" width="30%">
          {{ props.row.lastCheck }}
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
};
</script>

<style></style>
