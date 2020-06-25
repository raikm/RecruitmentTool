<template>
  <main>
    <AppHeader :headerName="headerName" />
    <div class="mainContainer">
      <div class="upperContainer">
        <NewStudyAddBasicinfos />
      </div>
      <div>
        <NewStudyAddCriteria v-on:add-criteria="addCriteria" />
        <NewStudyCriteriaList id="criteriaList" :criterias="criterias" />
        <NewStudyAddInformation v-on:add-information="addInformation" />
        <NewStudyInformationList id="criteriaList" :informations="informations" />
      </div>

      <div>
        <NewStudyAddFile id="addFile" :dropFiles="dropFiles" />
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
import NewStudyAddInformation from "./NewStudyAddInformation";
import NewStudyInformationList from "./NewStudyInformationList"
import NewStudyAddFile from "./NewStudyAddFile";



export default {
  name: "NewStudyPage",
  data() {
    return {
      criterias: [],
      informations: [],
      dropFiles: [],
      headerName: "EDITOR",
      responseJson: []  
    };
  },
  
  components: {
    AppHeader,
    NewStudyAddBasicinfos,
    NewStudyAddCriteria,
    NewStudyCriteriaList,
    NewStudyAddInformation,
    NewStudyInformationList,
    NewStudyAddFile,
  },
  methods: {
    addCriteria(newCriteria) {
      this.criterias = [...this.criterias, newCriteria];
    },
     addInformation(newInformation) {
      this.informations = [...this.informations, newInformation];
    },
    validateData() {
      const formData = new FormData();

      const studyName = document.getElementById("study-name").value;
      const description = document.getElementById("study-description").value;

      const criterias = this.criterias;
      const informations = this.informations
      const files = this.dropFiles;

      //TODO: loop necessary?
      // var criteriumArray = [];
      // for (var i = 0; i < criterias.length; i++) {
      //   criteriumArray.push([criterias[i].criteria_type, criterias[i].name, criterias[i].xPath]);
      // }
      var criteriasJson = JSON.stringify(criterias);
      var informationsJson = JSON.stringify(informations);

      //TODO: is for loop necessary?
      for (const file of files) {
        formData.append("file", file);
      }

      formData.append("Study_Name", studyName);
      formData.append("Description", description);
      formData.append("Criterias[]", criteriasJson);
      formData.append("Information_Needs[]", informationsJson);

      axios({
        method: "post",
        url: "http://192.168.0.33:8000/api/create/",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
          console.log(response)
          this.responseJson = response.data
          console.log(this.responseJson)
          this.$router.push({ name: 'evaluation-page',  query: this.responseJson})
          
      })
      .catch((response) => {
          //TODO: handle error: toast

          console.log(response);
            
      });
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
