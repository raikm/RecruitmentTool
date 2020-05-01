<template>
  <main>
    <AppHeader v-bind:headerName="headerName" />
    <!-- <div>{{this.$route.query.patients[0].patient_first_name}}</div> -->

    <div class="mainContainer">
      <section>
        <b-collapse
          class="card"
          animation="slide"
          v-for="(patient, index) of this.$route.query.patients"
          :key="index"
          :open="isOpen == index"
          @open="isOpen = index"
        >
          <div
            slot="trigger"
            slot-scope="props"
            class="card-header"
            role="button"
          >
            <p class="card-header-title">
              {{ patient.patient_first_name }} {{ patient.patient_last_name }}
            </p>
            <p class="card-header-title-overview">
              <!-- overview of the results -->
            </p>
          </div>
          <div class="card-content">
            <table style="width:100%">
              <div
                class="content"
                v-for="(result, index) of patient.results"
                :key="index"
              >
                <tr>
                  <td>{{ result.criterum_name }}</td>
                  <td>{{ result.evaluation_result }}</td>
                </tr>
              </div>
            </table>
          </div>
        </b-collapse>
      </section>
          <router-link :to="{ name: 'newstudy-page' }">
      <b-button id="btnNewStudy">Neue Studie anlegen</b-button>
    </router-link>
    </div>

  </main>
</template>

<script>
import AppHeader from "../../components/AppHeader";

export default {
  name: "EvaluationPage",
  props: ["responseJson"],
  components: {
    AppHeader,
  },
  created: function() {
    console.log("when component created than do this:");
  },
  data() {
    return {
      headerName: "AUSWERTUNG",
      collapses: [
        {
          patientname: "Max Mustermann",
          text: "     ",
        },
      ],
    };
  },
};
</script>

<style>
td:first-child {
 width: 600px;
}

#btnNewStudy {
margin-top: 25px;
}

</style>