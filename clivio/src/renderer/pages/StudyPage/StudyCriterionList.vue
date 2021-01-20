<template>
  <main>
    <div class="main">
      <b-table
        :data="criterions"
        ref="table"
        detailed
        hoverable
        :show-detail-icon="true"
        custom-detail-row
        detail-key="name"
      >
        <template slot-scope="props">
          <b-table-column
            :visible="columnsVisible['name'].display"
            :label="columnsVisible['name'].title"
            width="100%"
            sortable
          >
            <template>
              <div class="type-tag" :class="{greenBackgroundClass: props.row.criterion_type == 'EK', redBackgroundClass: props.row.criterion_type == 'AK'}">
                {{ props.row.criterion_type }}
              </div>

              <a @click="toggle(props.row)">
                {{ props.row.name }}
              </a>
            </template>
          </b-table-column>

        </template>

        <template slot="detail" slot-scope="props">
          <tr v-for="item in props.row.conditions" :key="item.name">
   <td> </td>
            <td v-show="columnsVisible['conditionName'].display" :title="item.xpath">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.name }}
            </td>
            
          </tr>
        </template>
      </b-table>
    </div>
  </main>
</template>

<script>
export default {
  name: "NewStudyCriterionList",
  components: {},
  props: ["criterions"],
  data() {
    return {
      columnsVisible: {
        name: { title: "Kriterium und Bedingung", display: true },
        conditionName: { title: "Bedingung", display: true },
      },
    };
  },
  methods: {
    toggle(row) {
      this.$refs.table.toggleDetails(row);
    },
  },
};
</script>

<style lang="scss">
.type-tag {
  
  border-radius: 4px;
  padding: 0 1vh;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
  margin-right: 2vh;
  color: white;
}
.greenBackgroundClass{
  background-color:  var(--main-green-color);
  
}

.redBackgroundClass{
  background-color:  var(--main-red-color);
}

</style>
