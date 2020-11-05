<template>
  <main>
    <AppHeader :headerName="headerName" />
    <div class="mainContainer">
      <div class="upperContainer">
        <StudyBasicinfos />
      </div>
      <b-button
        id="btn-selected-patients"
        class="is-small"
        title="Patienten die nach Überprüfung gespeichert wurden"
        @click="getSelectedPatients()"
        >Gespeicherte Patienten/Patientinnen aufrufen</b-button
      >
      <div>
        <StudyCriterionList id="criteriaList" :criterions="criterions" />
        <StudyInformationList id="criteriaList" :informations="informations" />
      </div>
      <div id="next-step-container">
        <span id="next-step-info">⇾ Nächster Schritt: </span>

        <b-button
          title="Aus Repository auswählen"
          class="btn-next-step"
          id="btnShowPatients"
          @click="collectPatients()"
          >Patienten/Patientinnen auswählen</b-button
        >

        <b-button
          title=""
          class="btn-next-step"
          id="btnShowPatients"
          @click="uploadCDALocal()"
          >ELGA Dokumente auswählen</b-button
        >
      </div>
      <br />

      <div id="upload-container">
        <NewStudyAddFile
          ref="NewStudyAddFile"
          id="addFile"
          :dropFiles="dropFiles"
        />
        <br />
        <b-button id="button-validate-cda-files" @click="validateCDAFiles()"
          >Dateien überprüfen</b-button
        >
        <br />
        <br />
      </div>
      <div id="patienten-collection-list-container">
        <StudyPatientCollectionList
          ref="StudyPatientCollectionList"
          :patientData="patientData"
        />
      </div>
      <br />
      <b-button id="btnValidate" @click="validateData()"
        >Patienten/Patientinnen überprüfen</b-button
      >
    </div>
  </main>
</template>

<script>
import AppHeader from "../../components/AppHeader";
import StudyBasicinfos from "./StudyBasicinfos";
import StudyCriterionList from "./StudyCriterionList";
import StudyInformationList from "./StudyInformationList";
import NewStudyAddFile from "../NewStudyPage/NewStudyAddFile";
import StudyPatientCollectionList from "./StudyPatientCollectionList";

export default {
  name: "NewStudyPage",
  data() {
    return {
      criterions: [],
      informations: [],
      dropFiles: [],
      headerName: "ÜBERPRÜFUNG",
      study: {},
      patientData: [],
      localAnalysis: true,
    }; // responseJson: [],
  },

  components: {
    AppHeader,
    StudyBasicinfos,
    StudyCriterionList,
    StudyInformationList,
    NewStudyAddFile,
    StudyPatientCollectionList,
  },
  methods: {
    validateCDAFiles() {
      const formData = new FormData();

      const files = this.dropFiles;
      const repositorySave = this.$refs.NewStudyAddFile.repositorySave;

      for (const file of files) {
        formData.append("file", file);
      }

      formData.append("Repository_Save", repositorySave);

      this.showToastInfo("Daten werden verarbeitet...");
      axios({
        method: "POST",
        url: "http://127.0.0.1:8000/api/validateSelectedCdaFiles/",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          this.patientData = response.data;
         
          document.getElementById("btnValidate").style.display = "inline";
          document.getElementById("upload-container").style.display = "none";
          document.getElementById(
            "patienten-collection-list-container"
          ).style.display = "inline";
           document.getElementById("next-step-container").style.display = "none";
        })
        .catch((response) => {
          this.showToastInfo(response);
        });
    },
    getSelectedPatients() {
      axios({
        method: "get",
        url:
          "http://127.0.0.1:8000/api/getSelectedPatients/study_id=" +
          this.study.id.toString(),
      })
        .then((response) => {
          this.$router.push({
            name: "selected-patient-history-page",
            query: [response.data, this.study.id],
          });
        })
        .catch((response) => {
          this.showToastInfo(response);
        });
    },
    collectPatients() {
      this.getPatients();
       this.localAnalysis = false;
      document.getElementById(
        "patienten-collection-list-container"
      ).style.display = "inline";
      document.getElementById("upload-container").style.display = "none";
      document.getElementById("btnValidate").style.display = "inline";
    },
    uploadCDALocal() {
      document.getElementById("upload-container").style.display = "inline";
      document.getElementById(
        "patienten-collection-list-container"
      ).style.display = "none";
      document.getElementById("btnValidate").style.display = "none";
       this.localAnalysis = true;
    },
    getPatients() {
      axios({
        method: "get",
        url: "http://127.0.0.1:8000/api/getAllPatients/",
      })
        .then((response) => {
          this.patientData = response.data;
        })
        .catch((response) => {
          this.showToastInfo(response);
        });
    },
    validateData() {
      const formData = new FormData();

      const studyName = document.getElementById("study-name").value;
      const description = document.getElementById("study-description").value;

      const criterions = this.criterions;
      const informations = this.informations;
      const patientData = this.$refs.StudyPatientCollectionList.checkedRows;
      const files = this.dropFiles;

      var criterionsJson = JSON.stringify(criterions);
      var informationsJson = JSON.stringify(informations);
      var patientDataJson = JSON.stringify(patientData);

      for (const file of files) {
        formData.append("file", file);
      }

      formData.append("Study_Name", studyName);
      formData.append("Description", description);
      formData.append("Criterias[]", criterionsJson);
      formData.append("Local_Analysis", this.localAnalysis);
      formData.append("Information_Needs[]", informationsJson);
      formData.append("Selected_Patients[]", patientDataJson);

      this.showToastInfo("Daten werden verarbeitet...");
      axios({
        method: "POST",
        url: "http://127.0.0.1:8000/api/validateData/",
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
          this.showToastInfo(response);
        });
    },
    fillData() {
      this.study = this.$route.query;
      var studyName = (document.getElementById("study-name").value =
        this.study.name);
      var description = (document.getElementById("study-description").value =
        this.study.description);
      this.criterions = this.study.criterions.sort((a, b) => (a.criterion_type < b.criterion_type) ? 1 : -1);
      this.informations = this.study.information_needed;
    },
  },
  mounted() {
    this.fillData();
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

#button-validate-cda-files {
  margin-top: 25px;
  float: right;
}
#btnValidate {
  margin-top: 25px;
  float: right;
  display: none;
  /* margin: 1%; */
  /* background-color: var(--main-color); */
}
#criteriaList #addFile {
  margin-top: 80px;
}
#next-step-container {
  display: flex;
  align-items: center;
  justify-content: right;
  float: right;
}

#next-step-info {
  font-size: 12px;
  font-style: italic;
  margin: 5px;
}
.btn-next-step {
  margin: 5px;
}
#patienten-collection-list-container {
  display: none;
}

#upload-container {
  display: none;
}

#btn-selected-patients {
  margin-top: 25px;
  float: right;
}
</style>
