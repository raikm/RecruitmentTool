<template>
  <main>
    <AppHeader />
    <div class="mainContainer">
      <div class="upperContainer">
        <NewStudyAddBasicinfos />
      </div>
      <div>
        <NewStudyAddCriteria v-on:add-criteria="addCriteria" />
        <NewStudyCriteriaList id="criteriaList" v-bind:criterias="criterias" />
      </div>

      <div>
        <NewStudyAddFile id="addFile" v-bind:dropFiles="dropFiles" />
      </div>

      <b-button id="btnValidate" @click="validateData()">Validieren</b-button>
    </div>
  </main>
</template>

<script>
import AppHeader from "../../components/AppHeader";
import NewStudyAddBasicinfos from "./NewStudyAddBasicinfos";
import NewStudyAddCriteria from "./NewStudyAddCriteria";
import NewStudyCriteriaList from "./NewStudyCriteriaList";
import NewStudyAddFile from "./NewStudyAddFile";

export default {
  name: "NewStudyPage",
  data() {
    return {
      criterias: [],
      dropFiles: [],
    };
  },
  components: {
    AppHeader,
    NewStudyAddBasicinfos,
    NewStudyAddCriteria,
    NewStudyCriteriaList,
    NewStudyAddFile,
  },
  methods: {
    addCriteria(newCriteria) {
      this.criterias = [...this.criterias, newCriteria];
    },
    validateData() {
      console.log("start");

      const criteria = document.getElementById("analysename").value;
      const description = document.getElementById("description").value;
      const criterias = this.criterias;
      const files = this.dropFiles;

      const formData = new FormData();
      formData.append("Criteria_Name", criteria);
      formData.append("Description", description);
      // formData.append("Only_current_patient_cohort", only_current_cohort)

      var criteriumArray = [];
      for (var i = 0; i < criterias.length; i++) {
        criteriumArray.push([criterias[i].name, criterias[i].xPath]);
      }

      var json_arr = JSON.stringify(criteriumArray);

      formData.append("Criterium_Names[]", json_arr);

      //TODO: is for loop necessary?
      for (const file of files) {
        formData.append("file", file);
      }
axios({
    method: 'post',
    url: 'http://192.168.0.30:8000/api/create/',
    data: formData,
    headers: {'Content-Type': 'multipart/form-data' }
    })
    // .then(function (response) {
    //     //handle success
    //     console.log(response);
    // })
    // .catch(function (response) {
    //     //handle error
    //     console.log(response);
    // });
    },
  },
};
</script>

<style>
.mainContainer {
  background-color: rgba(245, 245, 245, 0.3);
  margin: 0px 50px 0px 50px;
  padding: 10px;
  /* overflow: hidden;  */
}
#btnValidate {
  margin-top: 25px;
  /* float: right; */
  /* margin: 1%; */
  /* background-color: var(--main-color); */
}
#criteriaList #addFile {
  margin-top: 80px;
}
</style>
