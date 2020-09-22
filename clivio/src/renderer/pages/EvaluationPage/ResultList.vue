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
        detail-key="patient_id"
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
            :centered="true"
            width="500"
          >
            5/25
          </b-table-column>

          <b-table-column
            :visible="columnsVisible['ak'].display"
            :label="columnsVisible['ak'].title"
            width="500"
            :centered="true"
          >
          </b-table-column>
        </template>

        <template slot="detail" slot-scope="props">
          <template v-for="item in props.row.criterium_results">
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
                    greenFillClass: item.criterium_summary_result == 'hit',
                    greyFillClass: item.criterium_summary_result == 'no_hit',
                    redFillClass:
                      item.criterium_summary_result == 'negative_hit',
                  }"
                  class="has-text-centered"
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
                    greenFillClass:
                      item.criterium_summary_result == 'negative_hit',
                    greyFillClass: item.criterium_summary_result == 'no_hit',
                    redFillClass: item.criterium_summary_result == 'hit',
                  }"
                  class="has-text-centered"
                >
                  ⬤
                </td>
              </template>
            </tr>
            <tr v-for="condition in item.conditions" :key="condition.name">
              <td class="condition-td" @click="openSource(condition, item)">
                &emsp;&emsp;&emsp;{{ condition.name }}
              </td>
              <template v-if="item.criterium_type == 'EK'">
                <td
                  v-show="columnsVisible['ek'].display"
                  :class="{
                    greenFillClass:
                      condition.evaluation_results.hits.length > 0,
                    greyFillClass:
                      condition.evaluation_results.hits.length == 0,
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
                    redFillClass: condition.evaluation_results.hits.length > 0,
                    greyFillClass:
                      condition.evaluation_results.hits.length == 0,
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
           <ConditionDetails :currentCondition="currentCondition" :currentCriterium="currentCriterium"/>
          </div>
        </transition>
      </div>
    </div>
  </main>
</template>

<script>
import ConditionDetails from "./ConditionDetails"


export default {
  name: "ResultList",
  components: {ConditionDetails},
  props: ["response"],
  data() {
    return {
      showModal: false,
      columnsVisible: {
        name: { title: "Patientenname", display: true },
        conditionName: { title: "Bedingung", display: true },
        ek: { title: "Einschlusskriterien", display: true }, 
        ak: { title: "Ausschlusskriterien", display: true },
      },
     
      currentCondition: {},
    };
  },
  created: function() {
    console.log(this.response);
  },
  methods: {
    toggle(row) {
      this.$refs.table.toggleDetails(row);
    },
    openSource(condition, item) {
      this.showModal = true;
      this.currentCondition = condition;
      this.currentCriterium = item;
    },
  },
};
</script>

<style lang="scss">
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
