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
            <div :title="props.row.xpath">
            {{ props.row.name }}
            </div>
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
  background-color:  var(--main-blue-color);
}

</style>
