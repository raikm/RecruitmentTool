<template>
  <main>
    <AppHeader :headerName="headerName" />
    <div class="mainContainer">
      <div class="upperContainer">
        <StudyBasicinfos />
      </div>
      <div>
        <StudyCriteriaList id="criteriaList" :criterias="criterias" />
        <StudyInformationList id="criteriaList" :informations="informations" />
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
import StudyBasicinfos from "./StudyBasicinfos";
import StudyCriteriaList from "./StudyCriteriaList";
import StudyInformationList from "./StudyInformationList"
import NewStudyAddFile from "../NewStudyPage/NewStudyAddFile";



export default {
  name: "NewStudyPage",
  data() {
    return {
      criterias: [],
      informations: [],
      dropFiles: [],
      headerName: "VALIDATOR",
      responseJson: []  
    };
  },
  
  components: {
    AppHeader,
    StudyBasicinfos,
    StudyCriteriaList,
    StudyInformationList,
    NewStudyAddFile,
  },
  methods: {
    validateData() {
      const formData = new FormData();

      const studyName = document.getElementById("study-name").value;
      const description = document.getElementById("study-description").value;

      const criterias = this.criterias;
      const informations = this.informations
      const files = this.dropFiles;

      var criteriasJson = JSON.stringify(criterias);
      var informationsJson = JSON.stringify(informations);

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
          console.log(response);
            
      });
    },
    fillData(){
      const study = this.$route.query[0]
      console.log(study)
      var studyName = document.getElementById("study-name").value = study.name
      var description = document.getElementById("study-description").value = study.description
      this.criterias = study.criteriums //TODO: check names are equivalent
      this.informations = study.information_needed
    }
  
  },
  mounted() {
    this.fillData()
  }
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
