<template>
  <main>
    <div class="main">
      <b-table
        :data="patientListDefault"
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
            width="60%"
            :class="props.row.patient_id.toString()"
          >
            <template>
              <a @click="toggle(props.row)"
                >{{ props.row.first_name }} {{ props.row.last_name }}</a
              >
            </template>
          </b-table-column>

          <b-table-column
            :visible="columnsVisible['icAchieved'].display"
            label="achieved"
            :subheading="columnsVisible['icAchieved'].subheading"
            :headerClass="columnsVisible['icAchieved'].headerClass"
            :centered="true"
            :class="props.row.patient_id.toString()"
            width="4"
            >{{ props.row.criterion_results_overview_ic }}</b-table-column
          >

          <b-table-column
            :label="columnsVisible['icAchieved'].title"
            :visible="columnsVisible['icNotAchieved'].display"
            :subheading="columnsVisible['icNotAchieved'].subheading"
            :headerClass="columnsVisible['icNotAchieved'].headerClass"
            :centered="true"
            :class="props.row.patient_id.toString()"
            width="4"
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
            width="4"
            >{{
              props.row.criterion_results_overview_ic_no_data
            }}</b-table-column
          >

          <b-table-column
            :visible="columnsVisible['ecAchieved'].display"
            label="akachieved"
            :subheading="columnsVisible['ecAchieved'].subheading"
            :headerClass="columnsVisible['ecAchieved'].headerClass"
            :centered="true"
            :class="props.row.patient_id.toString()"
            width="4"
            >{{ props.row.criterion_results_overview_ec }}</b-table-column
          >

          <b-table-column
            :label="columnsVisible['ecAchieved'].title"
            :visible="columnsVisible['ecNotAchieved'].display"
            :subheading="columnsVisible['ecNotAchieved'].subheading"
            :headerClass="columnsVisible['ecNotAchieved'].headerClass"
            :centered="true"
            :class="props.row.patient_id.toString()"
            width="4"
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
            width="4"
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
              rounded
              :id="'checkbox-t-' + props.row.patient_id"
              @click="checkPatient(props.row, true)"
              size="is-small"
              :class="{
                'is-success': pageName.name == 'selected-patient-history-page',
              }"
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
              rounded
              :id="'checkbox-f-' + props.row.patient_id"
              @click="checkPatient(props.row, false)"
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
                  <td
                    title="Eine Bedingung konnte das EK erfüllen"
                    class="greenFillClass has-text-centered"
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
                    item.criterion_summary_result == 'positive_and_negative_hit'
                  "
                >
                  <td
                    title="Positive und negative Treffer bei den zugehörigen Bedingung"
                    class="yellowFillClass has-text-centered"
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
                  v-else-if="item.criterion_summary_result == 'negative_hit'"
                >
                  <td></td>
                  <td
                    title="Eine Bedingung konnte das EK ausschließen"
                    class="redFillClass has-text-centered"
                  >
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
                  <td
                    title="Keine Informationen zum EK wurden gefunden"
                    class="greyFillClass has-text-centered"
                  >
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
                  v-if="item.criterion_summary_result == 'positive_hit'"
                >
                  <td></td>
                  <td></td>
                  <td></td>
                  <td
                    title="Eine Bedingung konnte das AK erfüllen"
                    class="redFillClass has-text-centered"
                  >
                    ⬤
                  </td>
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
                  <td
                    title="Positive und negative Treffer bei den zugehörigen Bedingung"
                    class="yellowFillClass has-text-centered"
                  >
                    ⬤
                  </td>
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
                  <td
                    title="Eine Bedingung konnte das AK ausschließen"
                    class="greenFillClass has-text-centered"
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
                  <td
                    title="Keine Informationen zum AK wurden gefunden"
                    class="greyFillClass has-text-centered"
                  >
                    ⬤
                  </td>
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
                @click="
                  openConditionSource(condition, item, props.row.patient_id)
                "
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
                    title="Positiver Treffer für Bedingung gefunden"
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
                    'positive_and_negative_hits'
                  "
                >
                  <td
                    title="Positive und Negative Treffer für Bedingung gefunden"
                    class="yellowFillClass has-text-centered condition-details"
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
                  <td
                    title="Negativer Treffer für Bedingung gefunden"
                    class="redFillClass has-text-centered condition-details"
                  >
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
                  <td
                    title="Keine Informationen gefunden"
                    class="greyFillClass has-text-centered condition-details"
                  >
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
                  <td
                    title="Positiver Treffer für Bedingung gefunden"
                    class="redFillClass has-text-centered condition-details"
                  >
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
                    'positive_and_negative_hits'
                  "
                >
                  <td></td>
                  <td></td>
                  <td></td>
                  <td
                    title="Positiver und Negative Treffer für Bedingung gefunden"
                    class="yellowFillClass has-text-centered condition-details"
                  >
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
                    title="Negativer Treffer für Bedingung gefunden"
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
                  <td
                    title="Keine Informationen gefunden"
                    class="greyFillClass has-text-centered condition-details"
                  >
                    ⬤
                  </td>
                  <td></td>
                  <td></td>
                </template>
              </template>
            </tr>
          </template>

          <template v-for="item in props.row.information_needed_results">
            <tr
              :key="props.row.patient_id + item.name"
              :class="{
                disabledLineClass: item.results_for_documents.length == 0,
                nondisabledLineClass: item.results_for_documents.length > 0,
              }"
              :title="
                item.results_for_documents.length == 0
                  ? 'Keine Treffer für das Informationsbedürfniss gefunden'
                  : 'Informationsbedrüfnisse gefunden'
              "
            >
              <td></td>

              <td @click="openSource(item, props.row.patient_id)">
                <div
                  class="type-tag blueBackgroundClass"
                  :class="{
                    blueBackgroundClass: item.results_for_documents.length > 0,
                    blueDisabledBackgroundClass:
                      item.results_for_documents.length == 0,
                  }"
                >
                  IB
                </div>
                {{ item.information }}
              </td>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
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
            <div class="popup-window-content">
              <ConditionDetails
                :currentCondition="currentCondition"
                :currentCriterion="currentCriterion"
                :currentInformation="currentInformation"
                :patientID="patientID"
              />
            </div>
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
  props: ["patientListDefault"],
  data() {
    return {
      showModal: false,
      pageName: this.$router.currentRoute,
      defaultOpenedDetails: [1],
      selectedPatients: [],
      rejectedPatients: [],
      columnsVisible: {
        name: { title: "Patientenname", display: true },
        icAchieved: {
          title: "Einschlusskriterien",
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
          title: "Ausschlusskriterien",
          subheading: "erfüllt",
          display: true,
          headerClass: "ec-achieved",
        },
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

      currentCondition: {},
      currentInformation: {},
      patientID: 0,
    };
  },
  created: function () {
    for (var i = 0; i < this.selectedPatients.length; i++) {
      this.selectedPatients.push(this.patientListDefault[i].patient_id);
    }
  },
  mounted() {
    this.filterPatientList();
  },
  methods: {
    checkPatient(patient, check_type) {
      if (check_type == true && !this.selectedPatients.includes(patient)) {
        var checkboxTrueElement = document.getElementById(
          "checkbox-t-" + patient.patient_id
        );
        checkboxTrueElement.classList.add("is-success");
        this.selectedPatients.push(patient);
        if (this.rejectedPatients.includes(patient.patient_id)) {
          const index = this.rejectedPatients.indexOf(patient.patient_id);
          if (index > -1) {
            this.rejectedPatients.splice(index, 1);
          }
          var checkboxFalseElement = document.getElementById(
            "checkbox-f-" + patient.patient_id
          );
          checkboxFalseElement.classList.remove("is-danger");
        }
      }
      if (
        check_type == false &&
        !this.rejectedPatients.includes(patient.patient_id)
      ) {
        console.log("patient rejected und noch nicht eingetragen bisher");
        var checkboxFalseElement = document.getElementById(
          "checkbox-f-" + patient.patient_id
        );
        checkboxFalseElement.classList.add("is-danger");
        this.rejectedPatients.push(patient.patient_id);
        if (this.selectedPatients.includes(patient)) {
          const index = this.selectedPatients.indexOf(patient);
          if (index > -1) {
            this.selectedPatients.splice(index, 1);
          }
        }
        var checkboxTrueElement = document.getElementById(
          "checkbox-t-" + patient.patient_id
        );
        checkboxTrueElement.classList.remove("is-success");
      }
      //this.filterPatientList();
    },
    closeAllOtherDetails(row, index) {
      this.defaultOpenedDetails = [row.patient_id];
    },
    toggle(row) {
      this.$refs.table.toggleDetails(row);
    },
    openConditionSource(condition, item, patientId) {
      if (
        condition.evaluation_results.evaluation_result_summary == "no_hit" &&
        condition.value_results.values.length == 0
      ) {
        return;
      }
      this.showModal = true;
      this.currentInformation = null;
      this.currentCondition = condition;
      this.currentCriterion = item;
      this.patientID = patientId;
    },
    openSource(information, patientId) {
      if (this.currentCondition) {
        this.currentCondition = null;
        this.currentCriterion = null;
      }

      if (information.results_for_documents.length > 0) {
        this.showModal = true;
        this.currentInformation = information;
        this.patientID = patientId;
      }
      //else{
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
    filterPatientList() {
      /*   this.rejectedPatients.forEach((id) => {
        // change background color
        const classList = document.getElementsByClassName(id.toString());
        for (var i = 0; i < classList.length; i++) {
          console.log("change color to red for" + classList[i].toString());
          classList[i].style.backgroundColor = "rgba(255, 61, 61, 0.6)";
        }
      });
      this.selectedPatients.forEach((id) => {
        const classList = document.getElementsByClassName(id.toString());
        for (var i = 0; i < classList.length; i++) {
          console.log("change color to grey for" + classList[i].toString());
          classList[i].style.backgroundColor = "transparent";
        }
      }); */
      this.patientListDefault.forEach((patient) => {
        if (patient.criterion_results_overview_ec > 0) {
          const classList = document.getElementsByClassName(
            patient.patient_id.toString()
          );

          for (var i = 0; i < classList.length; i++) {
            classList[i].style.backgroundColor = "rgba(255, 61, 61, 0.1)";
          }
        }
      });
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

.is-subheading {
  font-size: small;
}
.ic-not-achieved,
.ec-not-achieved {
  color: rgb(0, 0, 0) !important;
  font-size: small;
}

.ic-achieved,
.ic-no-data,
.ec-achieved,
.ec-no-data {
  color: transparent !important;
}

//Table-Header
.ec-achieved,
.ec-not-achieved,
.ec-no-data {
  background-color: var(--main-red-transparent-color) !important;
}

.ic-achieved,
.ic-not-achieved,
.ic-no-data {
  background-color: var(--main-green-transparent-color) !important;
}

.type-tag {
  border-radius: 4px;
  // padding: 0 1vh;
  height: 50%;
  width: 40px;
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
  background-color: var(--main-green-color);
}

.redBackgroundClass {
  background-color: var(--main-red-color);
}

.greenFillClass {
  color: var(--main-green-color);
}

.redFillClass {
  color: var(--main-red-color);
}

.greyFillClass {
  color: var(--main-grey-color);
}

.yellowFillClass {
  color: var(--main-yellow-color);
}
.criterion-name {
  cursor: default;
}
.condition-t {
  background: var(--main-yellow-color);
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
  background-color: rgba(250, 250, 250, 0.05);
}

.popup-window {
  position: absolute;
  border: 1px solid rgb(90, 90, 90);
  border-radius: 10px;
  padding: 1%;
  top: 45%;
  left: 65%;
  transform: translate(-50%, -50%);
  z-index: 99;
  height: 90%;
  width: 60%;
  background-color: white;
}

.popup-window-content {
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
}
.fade-enter-active,
fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
fade-leave-to {
  opacity: 0;
}

.blueDisabledBackgroundClass {
  background-color: var(--main-blue-transparent-color) !important;
}

.disabledLineClass {
  color: gray;
  cursor: default;
}

.nondisabledLineClass {
  cursor: pointer;
}
</style>
