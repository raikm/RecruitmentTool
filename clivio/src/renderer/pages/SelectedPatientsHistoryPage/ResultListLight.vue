<template>
  <main>
    <div class="main">
      <b-table :data="selectedPatients" ref="table">
        <template slot-scope="props">
          <b-table-column
            :visible="columnsVisible['name'].display"
            :label="columnsVisible['name'].title"
          >
            {{ props.row.first_name }} {{ props.row.last_name }}
          </b-table-column>

          <b-table-column
            :visible="columnsVisible['icAchieved'].display"
            :label="columnsVisible['icAchieved'].title"
            :headerClass="columnsVisible['icAchieved'].headerClass"
            :centered="true"
            >{{ props.row.criterion_results_overview_ic }}</b-table-column
          >

          <b-table-column
            :visible="columnsVisible['icNotAchieved'].display"
            :label="columnsVisible['icNotAchieved'].title"
            :headerClass="columnsVisible['icNotAchieved'].headerClass"
            :centered="true"
            >{{
              props.row.criterion_results_overview_ic_negative
            }}</b-table-column
          >

          <b-table-column
            :visible="columnsVisible['icNoData'].display"
            :label="columnsVisible['icNoData'].title"
            :headerClass="columnsVisible['icNoData'].headerClass"
            :centered="true"
            >{{
              props.row.criterion_results_overview_ic_no_data
            }}</b-table-column
          >

          <b-table-column
            :visible="columnsVisible['ecAchieved'].display"
            :label="columnsVisible['ecAchieved'].title"
            :headerClass="columnsVisible['ecAchieved'].headerClass"
            :centered="true"
            >{{ props.row.criterion_results_overview_ec }}</b-table-column
          >

          <b-table-column
            :visible="columnsVisible['ecNotAchieved'].display"
            :label="columnsVisible['ecNotAchieved'].title"
            :headerClass="columnsVisible['ecNotAchieved'].headerClass"
            :centered="true"
            >{{
              props.row.criterion_results_overview_ec_negative
            }}</b-table-column
          >
          <b-table-column
            :visible="columnsVisible['ecNoData'].display"
            :label="columnsVisible['ecNoData'].title"
            :headerClass="columnsVisible['ecNoData'].headerClass"
            :centered="true"
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
            <b-button
              :id="'checkbox-t-' + props.row.patient_id"
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
            <b-button
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
  props: ["selectedPatients"],
  data() {
    return {
      showModal: false,
      defaultOpenedDetails: [1],
      columnsVisible: {
        name: { title: "Patientenname", display: true },
        icAchieved: {
          title: "erfüllt",
          display: true,
          headerClass: "ic-achieved",
        },
        icNotAchieved: {
          title: "nicht erfüllt",
          display: true,
          headerClass: "ic-not-achieved",
        },
        icNoData: {
          title: "keine Daten",
          display: true,
          headerClass: "ic-no-data",
        },
        ecAchieved: {
          title: " erfüllt",
          display: true,
          headerClass: "ec-achieved",
        }, //BUG: same name not valid
        ecNotAchieved: {
          title: " nicht erfüllt",
          display: true,
          headerClass: "ec-not-achieved",
        },
        ecNoData: {
          title: " keine Daten",
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
    //console.log(this.response);
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
.ic-ac-main-header.th {
  text-align: center;
}

.checkbox-patient {
  width: 3%;
}

.ic-achieved,
.ic-not-achieved,
.ic-no-data,
.ec-achieved,
.ec-not-achieved,
.ec-no-data {
  width: 5%;
  font-size: small;
  font-weight: 600;
}

.ic-achieved,
.ec-not-achieved {
  color: rgb(4, 196, 90) !important;
}

.ic-not-achieved,
.ec-achieved {
  color: rgb(223, 51, 51) !important;
}

.ec-no-data,
.ic-no-data {
  color: rgb(154, 154, 154) !important;
}

.type-tag {
  border-radius: 4px;
  // padding: 0 1vh;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;

  color: white;
}
.condition-tr {
  display: none;
}

//display: contents;

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

.greyFillClass {
  color: rgb(154, 154, 154);
}

.yellowFillClass {
  color: rgb(204, 180, 41);
}
.criterion-name {
  cursor: default;
}
.condition-t {
  background: yellow;
}

.condition-td {
  cursor: pointer;
  //TODO only if results
}
.condition-details {
  font-size: small;
}

.popup-container {
  justify-content: center;
  align-items: center;
  width: 100%;
  // min-height: 100vh;
  // overflow: hidden;
  // background-color: salmon;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 98;
  background-color: rgba(250, 250, 250, 0.41);
}
.popup-window {
  position: absolute;
  top: 35%;
  left: 70%;
  transform: translate(-50%, -50%);
  z-index: 99;
  height: 50%;
  width: 50%;
  background-color: white;
}
.fade-enter-active,
fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
fade-leave-to {
  opacity: 0;
}
</style>
