<template>
  <main>
    <AppHeader v-bind:headerName="headerName" />
    <div class="boxContainer">
      <StudyBasicinfos :study="this.$route.query[1]" />
    </div>
    <div class="boxContainer">
      <ResultList
        id="resulst-list-container"
        ref="ResultList"
        :patientListDefault="patientListDefault"
      />
    </div>
    <b-button
      rounded
      id="btn-save-selected-patients"
      @click="saveSelectedPatients()"
      >Speichern und Beenden</b-button
    >
  </main>
</template>

<script>
import AppHeader from "../../components/AppHeader";
import ResultList from "./ResultList";
import StudyBasicinfos from "../StudyPage/StudyBasicinfos";

export default {
  name: "EvaluationPage",
  components: {
    AppHeader,
    StudyBasicinfos,
    ResultList,
  },
  created: function () {
    if (this.$route.query.length > 0) {
      var _list = this.$route.query[0].patients.sort((a, b) =>
        a.criterion_results_overview_ic < b.criterion_results_overview_ic
          ? 1
          : -1
      );
      this.patientListDefault = _list.sort((a, b) =>
        a.criterion_results_overview_ec > b.criterion_results_overview_ec
          ? 1
          : -1
      );
    }
       this.patientListDefault = [{"patient_id":3333333333,"birthdate":"2000-12-24T00:00:00","first_name":"Marta","last_name":"Schenker","title":"","criterion_results":[{"name":"Männer und Frauen älter als 18 Jahre","criterion_type":"EK","conditions":[{"name":"Männer und Frauen älter als 18 Jahre","value_results":{"values":[]},"evaluation_results":{"positive_hits":[{"hit_result":["24.12.2000"],"document_id":"333333.1","document_date":"2020-08-01T12:15:00+01:00","document_hit_position":[]}],"negative_hits":[],"evaluation_result_summary":"no_hit"}}],"criterion_summary_result":"positive_hit"},{"name":"Diagnostizierter Typ II Diabetes","criterion_type":"EK","conditions":[{"name":"Diagnostizierter Typ II Diabetes (ICD-Codes E11*)","value_results":{"values":[{"value_result":["E11.50","M54.9"],"value_result_description":"Alle Diagnosen","document_id":"333333.1","document_date":"2020-08-01T12:15:00+01:00"}]},"evaluation_results":{"positive_hits":[{"hit_result":["Ergebnisse gefunden (siehe ELGA Dokument)"],"document_id":"333333.1","document_date":"2020-08-01T12:15:00+01:00","document_hit_position":["id11535-2"]}],"negative_hits":[],"evaluation_result_summary":"no_hit"}},{"name":"HbA1c-Wert dokumentiert","value_results":{"values":[]},"evaluation_results":{"positive_hits":[],"negative_hits":[],"evaluation_result_summary":"no_hit"}}],"criterion_summary_result":"positive_hit"},{"name":"Unbehandelte arterielle Hypertonie","criterion_type":"AK","conditions":[{"name":"Diastolischer Blutdruck > 90 mmHg","value_results":{"values":[{"value_result":["110mm[Hg]","64mm[Hg]"],"value_result_description":"Alle Werte für diastolischen Blutdruck ohne Einschränkung","document_id":"333333.1","document_date":"2020-08-01T12:15:00+01:00"}]},"evaluation_results":{"positive_hits":[{"hit_result":["110mm[Hg]"],"document_id":"333333.1","document_date":"2020-08-01T12:15:00+01:00","document_hit_position":["id11493-4","id11493-4","id11493-4"]}],"negative_hits":[{"hit_result":["64 mmHg"],"document_id":"333333.1","document_date":"2020-08-01T12:15:00+01:00","document_hit_position":["id11493-4","id11493-4","id11493-4"]}],"evaluation_result_summary":"positive_and_negative_hits"}},{"name":"Systolischer Blutdruck > 145 mmHg","value_results":{"values":[{"value_result":["110mm[Hg]","117mm[Hg]"],"value_result_description":"Alle Werte für systolischen Blutdruck ohne Einschränkung","document_id":"333333.1","document_date":"2020-08-01T12:15:00+01:00"}]},"evaluation_results":{"positive_hits":[],"negative_hits":[{"hit_result":["110 mmHg","117 mmHg"],"document_id":"333333.1","document_date":"2020-08-01T12:15:00+01:00","document_hit_position":["id11493-4","id11493-4","id11493-4","id11493-4","id11493-4","id11493-4"]}],"evaluation_result_summary":"negative_hit"}}],"criterion_summary_result":"positive_and_negative_hit"},{"name":"Vorliegen oder Vorgeschichte einer Epilepsie","criterion_type":"AK","conditions":[{"name":"Diagnostizierte Epilepsie (ICD-Code G40*) ","value_results":{"values":[{"value_result":["Diabetes mellitus, Typ 2 : Mit peripheren vaskulären Komplikationen : Nicht als entgleist bezeichnet","Rückenschmerzen, nicht näher bezeichnet"],"value_result_description":"Alle Diagnosen","document_id":"333333.1","document_date":"2020-08-01T12:15:00+01:00"}]},"evaluation_results":{"positive_hits":[],"negative_hits":[],"evaluation_result_summary":"no_hit"}},{"name":"Medikamente (ATC-Code N03A*)","value_results":{"values":[{"value_result":["Diazepam Actavis","Zithromax","Nasivin","Nasivin","Ciproxin","Ergebnisse gefunden (siehe ELGA Dokument)","Ergebnisse gefunden (siehe ELGA Dokument)","Ergebnisse gefunden (siehe ELGA Dokument)"],"value_result_description":"Alle Medikamente","document_id":"333333.1","document_date":"2020-08-01T12:15:00+01:00"}]},"evaluation_results":{"positive_hits":[],"negative_hits":[],"evaluation_result_summary":"no_hit"}}],"criterion_summary_result":"no_hit"},{"name":"Milde, moderate oder schwere nicht-proliferative diabetische Retinopathie","criterion_type":"AK","conditions":[{"name":"Diagnostizierte Retinopathia diabetica (ICD-Code H36.0)","value_results":{"values":[{"value_result":["Diabetes mellitus, Typ 2 : Mit peripheren vaskulären Komplikationen : Nicht als entgleist bezeichnet","Rückenschmerzen, nicht näher bezeichnet"],"value_result_description":"Alle Diagnosen","document_id":"333333.1","document_date":"2020-08-01T12:15:00+01:00"}]},"evaluation_results":{"positive_hits":[],"negative_hits":[],"evaluation_result_summary":"no_hit"}}],"criterion_summary_result":"no_hit"}],"criterion_results_overview_ic":2,"criterion_results_overview_ic_negative":"0","criterion_results_overview_ic_no_data":"0","criterion_results_overview_ec":"1","criterion_results_overview_ec_negative":"0","criterion_results_overview_ec_no_data":"2","information_needed_results":[{"information":"Alle Diagnosen","results_for_documents":[{"value_results":["Diabetes mellitus, Typ 2 : Mit peripheren vaskulären Komplikationen : Nicht als entgleist bezeichnet","Rückenschmerzen, nicht näher bezeichnet"],"document_id":"333333.1","document_date":"2020-08-01T12:15:00+01:00"}]},{"information":"Alle Diagnosen 2","results_for_documents":[]}]}]

  },
  data() {
    return {
      headerName: "AUSWERTUNG",
      patientListDefault: [],
      study: {},
    };
  },
  methods: {
    saveSelectedPatients() {
      const formData = new FormData();
      const selectedData = this.$refs.ResultList.selectedPatients;

      var selectedDataJson = JSON.stringify(selectedData);
      formData.append("Study_Id", this.$route.query[0].study_id);
      formData.append("Selected_Patients[]", selectedDataJson);
      this.showToastInfo("Auswahl wird gespeichert");
      axios({
        method: "POST",
        url: "http://127.0.0.1:8000/api/saveSelectedPatients/",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          this.showToastInfo(response.data);
        })
        .catch((response) => {
          this.showToastInfo(response.data);
        });
      this.$router.push({ name: "dashboard-page" });
    },
  },
};
</script>

<style>
#resulst-list-container {
  margin-top: 30px;
}
#btnNewStudy {
  margin-top: 25px;
}

#btn-save-selected-patients {
  margin-top: 25px;
  margin-right: 25px;
  float: right;
}
</style>
