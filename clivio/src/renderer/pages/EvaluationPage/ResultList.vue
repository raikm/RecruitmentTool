<template>
  <main>
    <div class="main">
      <b-table
        :data="response"
        ref="table"
        paginated
        per-page="30"
        :opened-detailed="defaultOpenedDetails"
        detailed
        detail-key="patient_id"
        @details-open="(row, index) => closeAllOtherDetails(row, index)"
        :show-detail-icon="true"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
        hoverable
        custom-detail-row
      >
        <template slot-scope="props">
          <b-table-column
            :visible="columnsVisible['name'].display"
            :label="columnsVisible['name'].title"
            width="100%"
          >
            <template>
              <a @click="toggle(props.row)"
                >{{ props.row.first_name }} {{ props.row.last_name }}</a
              >
            </template>
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

        <template slot="detail" slot-scope="props">
          <template v-for="item in props.row.criterion_results">
            <tr
              :key="props.row.patient_id + item.name"
              @click="showCirterionDetails(item.name.replace(/ /g, '-'))"
            >
              <td></td>

              <td
                class="criterion-name"
                v-show="columnsVisible['name'].display"
              >
                <div
                  class="type-tag"
                  :class="{
                    greenBackgroundClass: item.criterion_type == 'EK',
                    redBackgroundClass: item.criterion_type == 'AK',
                  }"
                >
                  {{ item.criterion_type }}
                </div>
                {{ item.name }}
              </td>

              <template v-if="item.criterion_type == 'EK'">
                <template
                  v-if="item.criterion_summary_result == 'positive_hit'"
                >
                  <td class="greenFillClass has-text-centered">⬤</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </template>
                <template
                  v-else-if="
                    item.criterion_summary_result == 'positive_and_negative_hit'
                  "
                >
                  <td class="yellowFillClass has-text-centered">⬤</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </template>
                <template
                  v-else-if="item.criterion_summary_result == 'negative_hit'"
                >
                  <td></td>
                  <td class="redFillClass has-text-centered">⬤</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </template>
                <template v-else>
                  <td></td>
                  <td></td>
                  <td class="greyFillClass has-text-centered">⬤</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </template>
              </template>
              <template v-else>
                <template
                  v-if="item.criterion_summary_result == 'positive_hit'"
                >
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="redFillClass has-text-centered">⬤</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </template>
                <template
                  v-else-if="
                    item.criterion_summary_result == 'positive_and_negative_hit'
                  "
                >
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="yellowFillClass has-text-centered">⬤</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </template>
                <template
                  v-else-if="item.criterion_summary_result == 'negative_hit'"
                >
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="greenFillClass has-text-centered">⬤</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </template>
                <template v-else>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="greyFillClass has-text-centered">⬤</td>
                  <td></td>
                  <td></td>
                </template>
              </template>
            </tr>

            <tr
              v-for="condition in item.conditions"
              :key="props.row.patient_id + '_cond_' + condition.name"
              :class="item.name.replace(/ /g, '-')"
              class="condition-tr"
            >
             <td></td>
              <td
                class="condition-td"
                @click="openSource(condition, item, props.row.patient_id)"
                title="Bedingung"
              >
                &emsp;&emsp;&emsp;{{ condition.name }}
              </td>
              <template v-if="item.criterion_type == 'EK'">
                <template
                  v-if="
                    condition.evaluation_results.evaluation_result_summary ==
                    'positive_hit'
                  "
                >
                  <td
                    class="greenFillClass has-text-centered condition-details"
                  >
                    ⬤
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </template>
                <template
                  v-else-if="
                    condition.evaluation_results.evaluation_result_summary ==
                    'negative_hit'
                  "
                >
                  <td></td>
                  <td class="redFillClass has-text-centered condition-details">
                    ⬤
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </template>
                <template v-else>
                  <td></td>
                  <td></td>
                  <td class="greyFillClass has-text-centered condition-details">
                    ⬤
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </template>
              </template>
              <template v-else>
                <template
                  v-if="
                    condition.evaluation_results.evaluation_result_summary ==
                    'positive_hit'
                  "
                >
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="redFillClass has-text-centered condition-details">
                    ⬤
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </template>
                <template
                  v-else-if="
                    condition.evaluation_results.evaluation_result_summary ==
                    'negative_hit'
                  "
                >
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td
                    class="greenFillClass has-text-centered condition-details"
                  >
                    ⬤
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </template>
                <template v-else>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="greyFillClass has-text-centered condition-details">
                    ⬤
                  </td>
                  <td></td>
                  <td></td>
                </template>
              </template>
            </tr>
          </template>
        </template> 
      </b-table>

      <div class="popup-container">
        <transition name="fade" appear>
          <div
            class="modal-overlay"
            v-if="showModal"
            @click="showModal = false"
          ></div>
        </transition>

        <transition name="slide" appear>
          <div class="popup-window" v-if="showModal">
            <ConditionDetails
              :currentCondition="currentCondition"
              :currentCriterion="currentCriterion"
              :patientID="patientID"
            />
          </div>
        </transition>
      </div>
    </div>
  </main>
</template>

<script>
import ConditionDetails from "./ConditionDetails";

export default {
  name: "ResultList",
  components: { ConditionDetails },
  props: ["response"],
  data() {
    return {
      showModal: false,
      defaultOpenedDetails: [1],
      selectedPatients: [],
      rejectedPatients: [],
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

      currentCondition: {},
      patientID: 0,
    };
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
    closeAllOtherDetails(row, index) {
      this.defaultOpenedDetails = [row.patient_id];
    },
    toggle(row) {
      this.$refs.table.toggleDetails(row);
    },
    openSource(condition, item, patientId) {
      // if (item.criterion_summary_result != "no_hit") {
      this.showModal = true;
      this.currentCondition = condition;
      this.currentCriterion = item;
      this.patientID = patientId;
      // }else{
      //   this.showToastError("Kriterium hat keine Ergebnisse!")
      // }
    },
    showCirterionDetails(criterion_name) {
      var classList = document.getElementsByClassName(criterion_name);
      for (var i = 0; i < classList.length; i++) {
        if (
          classList[i].style.display == "" ||
          classList[i].style.display == "none"
        ) {
          classList[i].setAttribute("style", "display:table-row !important");
        } else {
          classList[i].setAttribute("style", "display:none");
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
