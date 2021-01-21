<template>
  <main>
    <div class="main">
      <b-table :hoverable="true" :data="informations">
        <template slot-scope="props">
          <b-table-column field="information" label="Information" width="400">
            <div
              class="type-tag blueBackgroundClass"
              title="Informationsbedürfnis"
            >
              IB
            </div>
            {{ props.row.name }}
          </b-table-column>

          <b-table-column field="xPath" label="xPath" width="400">
            {{ props.row.xpath }}
          </b-table-column>

          <b-table-column field="edit" label="Edit" width="50">
            <b-button
              rounded
              @click="edit(props.row)"
              size="is-small"
              title="Editor"
            >
              <b-icon icon="pencil" size="is-small"> </b-icon
            ></b-button>
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
  props: ["informations", "editInformationNeedRowParent"], 
  methods: {
    edit(row) {
     this.editInformationNeedRowParent(row)
    },
  },
};
</script>

<style></style>
