<template>
  <main>
    <div class="main">
      <h3>Kriterien</h3>
      <!-- <table id="criteriumList">
        <tr>
          <th>Kriterium</th>
          <th>xPath</th>
        </tr>
        <tr v-bind:key="criteria.id" v-for="criteria in criterias">
          <NewStudyCriteriaItem v-bind:criteria="criteria" />
        </tr>
      </table> -->

      <a-table :columns="columns" :dataSource="criterias">
        <a slot="action" slot-scope="text" href="javascript:;">Delete</a>

      </a-table>
    </div>
  </main>
</template>

<script>
import NewStudyCriteriaItem from "./NewStudyCriteriaItem.vue";

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'xPath', dataIndex: 'xPath', key: 'xPath' },
  { title: 'Action', dataIndex: '', key: 'x', scopedSlots: { customRender: 'action' } },
];




export default {
  name: "NewStudyCriteriaList",
  components: {
    NewStudyCriteriaItem,
  },
  props: ["criterias"],
   data() {
    return {
      columns  
    };
   }
};


</script>

<style>


th {
  overflow: hidden;
}
</style>
