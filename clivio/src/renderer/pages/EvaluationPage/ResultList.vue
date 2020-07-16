<template>
  <main>
    <div class="main">
      <b-table
        :data="response"
        ref="table"
        detailed
        hoverable
        :show-detail-icon="false"
        custom-detail-row
        detail-key="name"
      >
        <template slot-scope="props">
          <b-table-column
            :visible="columnsVisible['name'].display"
            :label="columnsVisible['name'].title"
          >
            <template>
              <a @click="toggle(props.row)">
                {{ props.row.first_name }} {{ props.row.last_name }}
              </a>
            </template>
          </b-table-column>

          <b-table-column
            width="500"
          >
          </b-table-column>

          <b-table-column
            width="500"
          >
          </b-table-column>

          <b-table-column            
            width="500"
          >
          </b-table-column>
        </template>

        <!-- <template slot="detail" slot-scope="props">
          <tr v-for="item in props.row.conditions" :key="item.name">
            <td width="50" v-show="columnsVisible['name'].display">
              &nbsp;&nbsp;&nbsp;&nbsp;
            </td>
            <td width="500" v-show="columnsVisible['conditionName'].display">
              {{ item.name }}
            </td>
            <td td width="500" v-show="columnsVisible['condtionxPath'].display">
              {{ item.xPath }}
            </td>
            <td td width="500" v-show="columnsVisible['valuexPath'].display">
              {{ item.value_xPath }}
            </td>
          </tr>
        </template> -->
      </b-table>


    </div>
  </main>
</template>

<script>
export default {
  name: "ResultList",
  props: ["response"],
  data() {
    return {
      columnsVisible: {
        name: { title: "Name", display: true },
        ek: { title: "EK", display: true },
        ak: { title: "AK", display: true },
        noData: { title: "keine Daten", display: true },
      },
    };
  },
  created: function(){
    console.log(this.response)
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
  background-color: rgb(4, 196, 90);
  
}

.redBackgroundClass{
  background-color: rgb(223, 51, 51);
}

</style>
