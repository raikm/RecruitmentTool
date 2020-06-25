<template>
  <main>
    <br />
    <br />
    <div class="main">
      <b-table
        :data="criterias"
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
              <a @click="toggle(props.row)">
                {{ props.row.name }}
              </a>
            </template>
          </b-table-column>

          <b-table-column
            :visible="columnsVisible['conditionName'].display"
            :label="columnsVisible['conditionName'].title"
            width="500"
          >
          </b-table-column>

          <b-table-column
            :visible="columnsVisible['condtionxPath'].display"
            :label="columnsVisible['condtionxPath'].title"
            width="500"
          >
          </b-table-column>

          <b-table-column
            :visible="columnsVisible['valuexPath'].display"
            :label="columnsVisible['valuexPath'].title"
            width="500"
          >
          </b-table-column>
        </template>

        <template slot="detail" slot-scope="props">
          <tr v-for="item in props.row.conditions" :key="item.name">
            <td width="50" v-show="columnsVisible['name'].display">
              &nbsp;&nbsp;&nbsp;&nbsp;
            </td>
            <td width="500" v-show="columnsVisible['conditionName'].display">
              {{ item.conditionName }}
            </td>
            <td td width="500" v-show="columnsVisible['condtionxPath'].display">
              {{ item.condtionxPath }}
            </td>
            <td td width="500" v-show="columnsVisible['valuexPath'].display">
              {{ item.valuexPath }}
            </td>
          </tr>
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
  data() {
    return {
      columnsVisible: {
        name: { title: "Name", display: true },
        conditionName: { title: "Bedingung", display: true },
        condtionxPath: { title: "xPath", display: true },
        valuexPath: { title: "ValuexPath", display: true },
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

<style></style>
