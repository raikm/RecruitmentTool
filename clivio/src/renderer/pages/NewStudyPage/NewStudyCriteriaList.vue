<template>
  <main>
    <div class="main">
      <b-table :columns="columns" :data="criterias"> </b-table>
    </div>
  </main>
</template>

<script>

export default {
  name: "NewStudyCriteriaList",
  components: {

  },
  props: ["criterias"],
  data() {
    return {
      columns: [
        {
          field: "name",
          label: "Kriterium",
          width: "50%",
        },
        {
          field: "xPath",
          label: "xPath",
          width: "50%",
        },
      ],
    };
  },
};
</script>

<style>
</style>
