<template>
  <main>
    <div class="main">
      <b-table :hoverable="true" :data="informations">
        <template slot-scope="props">

          <b-table-column field="information" label="Information" width="50%">
            {{ props.row.name }}
          </b-table-column>

          <b-table-column field="xPath" label="xPath"  width="50%">
            {{ props.row.xPath }}
          </b-table-column>
        </template>
      </b-table>
    </div>
  </main>
</template>

<script>
export default {
  name: "NewStudyInformationList",
  components: {},
  props: ["informations"],
};
</script>

<style></style>
