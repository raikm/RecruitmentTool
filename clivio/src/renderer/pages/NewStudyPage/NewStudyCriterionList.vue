<template>
  <main>
    <br />
    <br />
    <div class="main">
      <b-table
        :data="criterions"
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
            width="50"
            sortable
          >
            <template>
              <a @click="toggle(props.row)">{{ props.row.name }}</a>
            </template>
          </b-table-column>

          <b-table-column
            :visible="columnsVisible['conditionName'].display"
            :label="columnsVisible['conditionName'].title"
            width="500"
          ></b-table-column>

          <b-table-column
            :visible="columnsVisible['condtionXpath'].display"
            :label="columnsVisible['condtionXpath'].title"
            width="400"
          ></b-table-column>

          <b-table-column
            :visible="columnsVisible['condtionNegativeXpath'].display"
            :label="columnsVisible['condtionNegativeXpath'].title"
            width="400"
          ></b-table-column>

          <b-table-column
            :visible="columnsVisible['roughXpath'].display"
            :label="columnsVisible['roughXpath'].title"
            width="400"
          ></b-table-column>
            <b-table-column
            :visible="columnsVisible['roughDescriptionXpath'].display"
            :label="columnsVisible['roughDescriptionXpath'].title"
            width="400"
          ></b-table-column>
        </template>

        <template slot="detail" slot-scope="props">
          <tr v-for="item in props.row.conditions" :key="item.name">
            <td width="50" v-show="columnsVisible['name'].display">&nbsp;&nbsp;&nbsp;&nbsp;</td>
            <td
              width="500"
              v-show="columnsVisible['conditionName'].display"
            >{{ item.conditionName }}</td>
            <td
              td
              width="400"
              v-show="columnsVisible['condtionXpath'].display"
            >{{ item.condtionXpath }}</td>
            <td
              td
              width="400"
              v-show="columnsVisible['condtionNegativeXpath'].display"
            >{{ item.condtionNegativeXpath }}</td>
            <td td width="400" v-show="columnsVisible['roughXpath'].display">{{ item.roughXpath }}</td>
            <td td width="400" v-show="columnsVisible['roughDescriptionXpath'].display">{{ item.roughDescriptionXpath }}</td>
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
        name: { title: "Name", display: true },
        conditionName: { title: "Bedingung", display: true },
        condtionXpath: { title: "xPath", display: true },
        condtionNegativeXpath: { title: "Negative xPath", display: true },
        roughXpath: { title: "Grober xPath", display: true },
        roughDescriptionXpath: { title: "Grober xPath Beschreibung", display: true }
      }
    };
  },
  methods: {
    toggle(row) {
      this.$refs.table.toggleDetails(row);
    }
  }
};
</script>

<style></style>
