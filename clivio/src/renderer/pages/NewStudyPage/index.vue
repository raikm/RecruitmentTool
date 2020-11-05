<template>
  <main>
    <AppHeader :headerName="headerName" />
    <div class="mainContainer">
      <div class="upperContainer">
        <NewStudyAddBasicinfos />
      </div>
      <div>
        <NewStudyAddCriterion v-on:add-criteria="addCriteria" />
        <NewStudyCriterionList id="criteriaList" :criterions="criterions" />
        <NewStudyAddInformation v-on:add-information="addInformation" />
        <NewStudyInformationList
          id="criteriaList"
          :informations="informations"
        />
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
import NewStudyAddCriterion from "./NewStudyAddCriterion";
import NewStudyCriterionList from "./NewStudyCriterionList";
import NewStudyAddInformation from "./NewStudyAddInformation";
import NewStudyInformationList from "./NewStudyInformationList";
import NewStudyAddFile from "./NewStudyAddFile";

export default {
  name: "NewStudyPage",
  data() {
    return {
      criterions: [],
      informations: [],
      dropFiles: [],
      headerName: "EDITOR",
      responseJson: [],
    };
  },

  components: {
    AppHeader,
    NewStudyAddBasicinfos,
    NewStudyAddCriterion,
    NewStudyCriterionList,
    NewStudyAddInformation,
    NewStudyInformationList,
    NewStudyAddFile,
  },
  methods: {
    addCriteria(newCriteria) {
      this.criterions = [...this.criterions, newCriteria];
    },
    addInformation(newInformation) {
      this.informations = [...this.informations, newInformation];
    },
    validateData() {
      const formData = new FormData();

      const studyName = document.getElementById("study-name").value;
      const description = document.getElementById("study-description").value;

      const criterions = this.criterions;
      const informations = this.informations;
      const files = this.dropFiles;

      //TODO: loop necessary?
      // var criterionArray = [];
      // for (var i = 0; i < criterions.length; i++) {
      //   criterionArray.push([criterions[i].criterion_type, criterions[i].name, criterions[i].xPath]);
      // }
      var criterionsJson = JSON.stringify(criterions);
      var informationsJson = JSON.stringify(informations);

      //TODO: is for loop necessary?
      for (const file of files) {
        formData.append("file", file);
      }

      formData.append("Study_Name", studyName);
      formData.append("Description", description);
      formData.append("Criterions[]", criterionsJson);
      formData.append("Information_Needs[]", informationsJson);

      axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/create/",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          this.responseJson = response.data;
          this.$router.push({
            name: "evaluation-page",
            query: this.responseJson,
          });
        })
        .catch((response) => {
          this.showToastError(response);
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
