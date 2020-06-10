<template>
  <main>
    <div class="main">
      <b-table :sort-icon="arrow-up" :hoverable="true" :columns="columns" :data="criterias">
        <template slot-scope="props">
          <b-table-column field="type" label="Typ" width="5%" sortable>
            {{ props.row.criteria_type }}
          </b-table-column>

          <b-table-column field="name" label="Kriterium" width="45%" sortable>
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
  name: "NewStudyCriteriaList",
  components: {},
  props: ["criterias"],
};
</script>

<style></style>
