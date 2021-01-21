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
            :visible="columnsVisible['criteriaName'].display"
            :label="columnsVisible['criteriaName'].title"
            width="50"
            sortable
          >
            <template>
              <div
                class="type-tag"
                :class="{
                  greenBackgroundClass: props.row.criterion_type == 'EK',
                  redBackgroundClass: props.row.criterion_type == 'AK',
                }"
              >
                {{ props.row.criterion_type }}
              </div>
              <a @click="toggle(props.row)">{{
                props.row.name
              }}</a>
            </template>
          </b-table-column>

          <b-table-column
            :visible="columnsVisible['name'].display"
            :label="columnsVisible['name'].title"
            width="500"
          ></b-table-column>

          <b-table-column
            :visible="columnsVisible['xpath'].display"
            :label="columnsVisible['xpath'].title"
            width="400"
          ></b-table-column>

          <b-table-column
            :visible="columnsVisible['neg_xpath'].display"
            :label="columnsVisible['neg_xpath'].title"
            width="400"
          ></b-table-column>

          <b-table-column
            :visible="true"
            label="Edit"
            width="50"
          >
            <b-button
              rounded
              @click="edit(props.row)"
              size="is-small"
              title="Editor"
            >
              <b-icon icon="pencil" size="is-small"> </b-icon
            ></b-button>
          </b-table-column>

          <!--     <b-table-column
            :visible="columnsVisible['rough_xpath'].display"
            :label="columnsVisible['rough_xpath'].title"
            width="400"
          ></b-table-column>
          <b-table-column
            :visible="columnsVisible['rough_xpath_description'].display"
            :label="columnsVisible['rough_xpath_description'].title"
            width="400"
          ></b-table-column> -->
        </template>

        <template slot="detail" slot-scope="props">
          <tr v-for="item in props.row.conditions" :key="item.name">
            <td width="50" v-show="columnsVisible['criteriaName'].display">
              &nbsp;&nbsp;&nbsp;&nbsp;
            </td>
            <td
              contenteditable=""
              width="500"
              v-show="columnsVisible['name'].display"
            >
              {{ item.name }}
            </td>
            <td td width="400" v-show="columnsVisible['xpath'].display">
              {{ item.xpath }}
            </td>
            <td td width="400" v-show="columnsVisible['neg_xpath'].display">
              {{ item.xpath }}
            </td>
            <!-- <td td width="400" v-show="columnsVisible['rough_xpath'].display">
              {{ item.rough_xpath }}
            </td>
            <td
              td
              width="400"
              v-show="columnsVisible['rough_xpath_description'].display"
            >
              {{ item.rough_xpath_description }}
            </td> -->
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
  props: ["criterions", "editRowParent"],
  data() {
    return {
      columnsVisible: {
        criteriaName: { title: "Name", display: true },
        name: { title: "Bedingung", display: true },
        xpath: { title: "xPath", display: true },
        neg_xpath: { title: "Negative xPath", display: true },
        rough_xpath: { title: "Grober xPath", display: true },
        rough_xpath_description: {
          title: "Grober xPath Beschreibung",
          display: true,
        },
      },
    };
  },
  methods: {
    toggle(row) {
      this.$refs.table.toggleDetails(row);
      //this.editRowParent(row)
    },
    edit(row) {
      this.editRowParent(row)
    },
  },
};
</script>

<style>
</style>
