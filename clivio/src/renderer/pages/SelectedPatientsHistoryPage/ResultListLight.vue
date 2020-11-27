<template>
  <main>
    <div class="main">
      <b-table :data="currentSelectedPatients" ref="table">
        <template slot-scope="props">
          <b-table-column
            :visible="columnsVisible['name'].display"
            :label="columnsVisible['name'].title"
            width="100%"
            :class="props.row.patient_id.toString()"
          >
            {{ props.row.patient_first_name }} {{ props.row.patient_last_name }}
          </b-table-column>

          <b-table-column
            :visible="columnsVisible['icAchieved'].display"
            :label="columnsVisible['icAchieved'].title"
            :subheading="columnsVisible['icAchieved'].subheading"
            :headerClass="columnsVisible['icAchieved'].headerClass"
            :centered="true"
            :class="props.row.patient_id.toString()"
            >{{ props.row.criterion_results_overview_ic }}</b-table-column
          >

          <b-table-column
            label="icnotachieved"
            :visible="columnsVisible['icNotAchieved'].display"
            :subheading="columnsVisible['icNotAchieved'].subheading"
            :headerClass="columnsVisible['icNotAchieved'].headerClass"
            :centered="true"
            :class="props.row.patient_id.toString()"
            >{{
              props.row.criterion_results_overview_ic_negative
            }}</b-table-column
          >

          <b-table-column
            label="icnodata"
            :visible="columnsVisible['icNoData'].display"
            :subheading="columnsVisible['icNoData'].subheading"
            :headerClass="columnsVisible['icNoData'].headerClass"
            :centered="true"
            :class="props.row.patient_id.toString()"
            >{{
              props.row.criterion_results_overview_ic_no_data
            }}</b-table-column
          >

          <b-table-column
            :visible="columnsVisible['ecAchieved'].display"
            :label="columnsVisible['ecAchieved'].title"
            :subheading="columnsVisible['ecAchieved'].subheading"
            :headerClass="columnsVisible['ecAchieved'].headerClass"
            :centered="true"
            :class="props.row.patient_id.toString()"
            >{{ props.row.criterion_results_overview_ec }}</b-table-column
          >

          <b-table-column
            label="ecNotAchieved"
            :visible="columnsVisible['ecNotAchieved'].display"
            :subheading="columnsVisible['ecNotAchieved'].subheading"
            :headerClass="columnsVisible['ecNotAchieved'].headerClass"
            :centered="true"
            :class="props.row.patient_id.toString()"
            >{{
              props.row.criterion_results_overview_ec_negative
            }}</b-table-column
          >
          <b-table-column
            label="ecNoData"
            :visible="columnsVisible['ecNoData'].display"
            :subheading="columnsVisible['ecNoData'].subheading"
            :headerClass="columnsVisible['ecNoData'].headerClass"
            :centered="true"
            :class="props.row.patient_id.toString()"
            >{{
              props.row.criterion_results_overview_ec_no_data
            }}</b-table-column
          >
          <b-table-column
            :visible="columnsVisible['check'].display"
            :label="columnsVisible['check'].title"
            
            :centered="true"
            class="checkbox-patient"
          >
            <b-button rounded
              :id="'checkbox-t-' + props.row.patient_id"
              class="is-success"
              @click="checkPatient(props.row.patient_id, true)"
              size="is-small"
            >
              <b-icon icon="check" size="is-small"> </b-icon
            ></b-button>
          </b-table-column>
          <b-table-column
            :visible="columnsVisible['uncheck'].display"
            :label="columnsVisible['uncheck'].title"
            :centered="true"
            class="checkbox-patient"
          >
            <b-button rounded
              :id="'checkbox-f-' + props.row.patient_id"
              @click="checkPatient(props.row.patient_id, false)"
              size="is-small"
            >
              <b-icon icon="close" size="is-small"> </b-icon
            ></b-button>
          </b-table-column>
        </template>
      </b-table>
    </div>
  </main>
</template>

<script>
export default {
  name: "ResultListLight",
  props: ["currentSelectedPatients"],
  data() {
    return {
      showModal: false,
      selectedPatients: [],
      rejectedPatients: [],
      defaultOpenedDetails: [1],
      columnsVisible: {
        name: { title: "Patientenname", display: true },
        icAchieved: {
          title: "EK",
          display: true,
          headerClass: "ic-achieved",
          subheading: "erfüllt",
        },
        icNotAchieved: {
          subheading: "nicht erfüllt",
          display: true,
          headerClass: "ic-not-achieved",
        },
        icNoData: {
          subheading: "keine Daten",
          display: true,
          headerClass: "ic-no-data",
        },
        ecAchieved: {
          title: "AK",
          subheading: "erfüllt",
          display: true,
          headerClass: "ec-achieved",
        }, //BUG: same name not valid
        ecNotAchieved: {
          subheading: "nicht erfüllt",
          display: true,
          headerClass: "ec-not-achieved",
        },
        ecNoData: {
          subheading: "keine Daten",
          display: true,
          headerClass: "ec-no-data",
        },
        check: {
          title: "✓",
          display: true,
        },
        uncheck: {
          title: "⨉",
          display: true,
        },
      },

      patientID: 0,
    };
  },
  created: function () {
    for (var i = 0; i < this.currentSelectedPatients.length; i++) {
      this.selectedPatients.push(this.currentSelectedPatients[i].patient_id);

    }
  },
  methods: {
    checkPatient(patient_id, check_type) {
      if (check_type == true && !this.selectedPatients.includes(patient_id)) {
        var checkboxTrueElement = document.getElementById(
          "checkbox-t-" + patient_id
        );
        checkboxTrueElement.classList.add("is-success");
        this.selectedPatients.push(patient_id);
        if (this.rejectedPatients.includes(patient_id)) {
          const index = this.rejectedPatients.indexOf(patient_id);
          if (index > -1) {
            this.rejectedPatients.splice(index, 1);
          }
          var checkboxFalseElement = document.getElementById(
            "checkbox-f-" + patient_id
          );
          checkboxFalseElement.classList.remove("is-danger");
        }
      }
      if (check_type == false && !this.rejectedPatients.includes(patient_id)) {
        var checkboxFalseElement = document.getElementById(
          "checkbox-f-" + patient_id
        );
        checkboxFalseElement.classList.add("is-danger");
        this.rejectedPatients.push(patient_id);
        if (this.selectedPatients.includes(patient_id)) {
          const index = this.selectedPatients.indexOf(patient_id);
          if (index > -1) {
            this.selectedPatients.splice(index, 1);
          }
          var checkboxTrueElement = document.getElementById(
            "checkbox-t-" + patient_id
          );
          checkboxTrueElement.classList.remove("is-success");
        }
      }
    },
  },
};
</script>

<style lang="scss">
</style>
