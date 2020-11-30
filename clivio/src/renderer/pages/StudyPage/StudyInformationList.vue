<template>
  <main>
    <div class="main">
      <b-table :hoverable="true" :data="informations">
        <template slot-scope="props">
          <b-table-column field="information" label="Informationsbedürfnisse" >
            <div
              class="type-tag blueBackgroundClass"
              title="Informationsbedürfnis"
            >
             IB
            </div>
            {{ props.row.name }}
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

<style lang="scss">
.blueBackgroundClass{
  background-color: rgb(54, 51, 223);
}

</style>
