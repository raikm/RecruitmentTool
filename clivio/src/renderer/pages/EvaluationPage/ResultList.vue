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
            :visible="columnsVisible['ek'].display"
            :label="columnsVisible['ek'].title"
            :centered=true
            width="500"
          >
          </b-table-column>

          <b-table-column
            :visible="columnsVisible['ak'].display"
            :label="columnsVisible['ak'].title"
            width="500"
            :centered=true
          >
          </b-table-column>
        </template>

        <template slot="detail" slot-scope="props">
          <template v-for="item in props.row.criterium_results" >
          <tr :key="item.name">
            <td v-show="columnsVisible['name'].display">
              <div
                class="type-tag"
                :class="{
                  greenBackgroundClass: item.criterium_type == 'EK',
                  redBackgroundClass: item.criterium_type == 'AK',
                }"
              >
                {{ item.criterium_type }}
              </div>
              {{ item.name }}
            </td>

            <template v-if="item.criterium_type == 'EK'">
              <td
                v-show="columnsVisible['ek'].display"
                :class="{
                  greenFillClass: item.criterium_summary_result == 0,
                  
                }"
                class="has-text-centered"
              >
              <!-- redFillClass: item.criterium_type == 1, -->
                ⬤
              </td>
              <td v-show="columnsVisible['ak'].display"></td>
            </template>

            <template v-else>
              <td v-show="columnsVisible['ek'].display"></td>
              <td
                v-show="columnsVisible['ak'].display"
                :class="{
                  
                  redFillClass: item.criterium_summary_result == 0,    
                }"
                class="has-text-centered"
              >
              <!-- greenFillClass: item.criterium_summary_result == 1, -->
              
                ⬤
              </td>
            </template>
          </tr>
          <tr v-for="condition in item.conditions" :key="condition.name">
            <td class="condition-td">
             &emsp;&emsp;&emsp;{{ condition.name }}
            </td>
            <template v-if="item.criterium_type == 'EK'">
              <td
                v-show="columnsVisible['ek'].display"
                :class="{
                  greenFillClass: Array.isArray(condition.evaluation_result) && condition.evaluation_result.length > 0,
                  redFillClass: condition.evaluation_result.length == 0,
                }"
                class="has-text-centered condition-details" 
              >
                ⬤
              </td>
              <td v-show="columnsVisible['ak'].display"></td>
            </template>

            <template v-else>
              <td v-show="columnsVisible['ek'].display"></td>
              <td
                v-show="columnsVisible['ak'].display"
               :class="{
                  greenFillClass: condition.evaluation_result.length == 0,
                  redFillClass: Array.isArray(condition.evaluation_result) && condition.evaluation_result.length > 0,
                }"
                class="has-text-centered condition-details" 
              >
                ⬤
              </td>
            </template>
          </tr>
          </template>
        </template>
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
        name: { title: "Patientenname", display: true },
        conditionName: { title: "Bedingung", display: true },
        ek: { title: "Einschlusskriterien", display: true },
        ak: { title: "Ausschlusskriterien", display: true },
      },
    };
  },
  created: function() {
    console.log(this.response);
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
.greenBackgroundClass {
  background-color: rgb(4, 196, 90);
}

.redBackgroundClass {
  background-color: rgb(223, 51, 51);
}

.greenFillClass {
  color: rgb(4, 196, 90);
}

.redFillClass {
  color: rgb(223, 51, 51);
}

.condition-details{
  font-size: small;

}
</style>
