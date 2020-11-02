<template>
  <main>
    <AppHeader v-bind:headerName="headerName" />
    <ResultList ref="ResultList" :response="response" />
    <b-button id="btn-save-selected-patients" @click="saveSelectedPatients()">Speichern</b-button>
  </main>
</template>

<script>
import AppHeader from "../../components/AppHeader";
import ResultList from "./ResultList"

export default {
  name: "EvaluationPage",
  components: {
    AppHeader,
    ResultList
  },
  created: function() {
   //this.response = this.$route.query.patients
   this.response =[{"patient_id":2222222222,"birthdate":"1961-12-24T00:00:00","first_name":"Thomas","last_name":"Karlsen","title":"","criterion_results":[{"name":"Einschlusskriterien für Patienten mit primärem Offenwinkelglaukom\t\t","criterion_type":"EK","conditions":[{"name":"Diagnose mit ICD-Code H.40.*","value_results":{"values":[{"value_result":["Gelenkerguss: Unterschenkel","Rückenschmerzen, nicht näher bezeichnet"],"document_id":"2222222.1","document_date":"2020-07-17T12:15:00+01:00"}]},"evaluation_results":{"positive_hits":[],"negative_hits":[],"evaluation_result_summary":"no_hit"}},{"name":"Medikation Allgemein mit ATC Codes Einschränkung (ohne Trennung von empfohlen, verabreicht usw.)","value_results":{"values":[{"value_result":["Diazepam Actavis","Zithromax","Nasivin","Nasivin","Ciproxin",{},{},{}],"document_id":"2222222.1","document_date":"2020-07-17T12:15:00+01:00"}]},"evaluation_results":{"positive_hits":[],"negative_hits":[],"evaluation_result_summary":"no_hit"}}],"criterion_summary_result":"no_hit"},{"name":"Männer und Frauen älter als 18 Jahre","criterion_type":"EK","conditions":[{"name":"Männer und Frauen älter als 18 Jahre","value_results":{"values":[{"value_result":["19611224"],"document_id":"2222222.1","document_date":"2020-07-17T12:15:00+01:00"}]},"evaluation_results":{"positive_hits":[{"hit_result":["19611224"],"document_id":"2222222.1","document_date":"2020-07-17T12:15:00+01:00"}],"negative_hits":[],"evaluation_result_summary":"positive_hit"}}],"criterion_summary_result":"positive_hit"},{"name":"Diagnose M.25.46","criterion_type":"AK","conditions":[{"name":"Diagnose: Gelenkerguss: Unterschenkel (M25.46)","value_results":{"values":[{"value_result":["Gelenkerguss: Unterschenkel","Rückenschmerzen, nicht näher bezeichnet"],"document_id":"2222222.1","document_date":"2020-07-17T12:15:00+01:00"}]},"evaluation_results":{"positive_hits":[{"hit_result":["Gelenkerguss: Unterschenkel"],"document_id":"2222222.1","document_date":"2020-07-17T12:15:00+01:00"}],"negative_hits":[],"evaluation_result_summary":"positive_hit"}},{"name":"Medikationen für Gelenkergüsse mit ATC Codes ","value_results":{"values":[{"value_result":["Diazepam Actavis","Zithromax","Nasivin","Nasivin","Ciproxin","Augmentin 3 x 2g i.v. von 1.8.2016 bis 5.8.2016","Ciproxin 400mg 2 x tgl. i.v.","Fosfomycin 3 x 2g i.v. von 1.8. bis 13.8.2016"],"document_id":"2222222.1","document_date":"2020-07-17T12:15:00+01:00"}]},"evaluation_results":{"positive_hits":[],"negative_hits":[],"evaluation_result_summary":"no_hit"}}],"criterion_summary_result":"positive_hit"},{"name":"Antidialeptika in Medikation (ATC Code N05BA01)","criterion_type":"EK","conditions":[{"name":"Antidialeptika in Medikation (ATC Code N05BA01)","value_results":{"values":[{"value_result":["Diazepam Actavis","Zithromax","Nasivin","Nasivin","Ciproxin","Augmentin 3 x 2g i.v. von 1.8.2016 bis 5.8.2016","Ciproxin 400mg 2 x tgl. i.v.","Fosfomycin 3 x 2g i.v. von 1.8. bis 13.8.2016"],"document_id":"2222222.1","document_date":"2020-07-17T12:15:00+01:00"}]},"evaluation_results":{"positive_hits":[{"hit_result":["N05BA01"],"document_id":"2222222.1","document_date":"2020-07-17T12:15:00+01:00"}],"negative_hits":[],"evaluation_result_summary":"positive_hit"}}],"criterion_summary_result":"positive_hit"},{"name":"EK mit positive und Negative","criterion_type":"EK","conditions":[{"name":"Condition Postive","value_results":{"values":[{"value_result":["Gelenkerguss: Unterschenkel","Rückenschmerzen, nicht näher bezeichnet"],"document_id":"2222222.1","document_date":"2020-07-17T12:15:00+01:00"}]},"evaluation_results":{"positive_hits":[{"hit_result":["Gelenkerguss: Unterschenkel"],"document_id":"2222222.1","document_date":"2020-07-17T12:15:00+01:00"}],"negative_hits":[],"evaluation_result_summary":"positive_hit"}},{"name":"Condition Negative","value_results":{"values":[{"value_result":["Gelenkerguss: Unterschenkel","Rückenschmerzen, nicht näher bezeichnet"],"document_id":"2222222.1","document_date":"2020-07-17T12:15:00+01:00"}]},"evaluation_results":{"positive_hits":[],"negative_hits":[{"hit_result":["Gelenkerguss: Unterschenkel"],"document_id":"2222222.1","document_date":"2020-07-17T12:15:00+01:00"}],"evaluation_result_summary":"negative_hit"}}],"criterion_summary_result":"positive_and_negative_hit"}],"criterion_results_overview_ic":"2","criterion_results_overview_ic_negative":"0","criterion_results_overview_ic_no_data":"2","criterion_results_overview_ec":"1","criterion_results_overview_ec_negative":"0","criterion_results_overview_ec_no_data":"0","information_needed_results":{}}]
   
  },
  data() {
    return {
      headerName: "AUSWERTUNG",
      response: [],
    };
  },
  methods: {
    saveSelectedPatients(){
 
 console.log(this.$refs.ResultList.selectedPatients)
    }
  }
};
</script>

<style>
#btnNewStudy {
  margin-top: 25px;
}

#btn-save-selected-patients{
  margin-top: 25px;
  margin-right: 25px;
  float: right;


}
</style>
