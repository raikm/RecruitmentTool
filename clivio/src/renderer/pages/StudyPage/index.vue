<template>
  <main>
    <AppHeader :headerName="headerName" />
    <div class="boxContainer">
      <StudyBasicinfos :study="this.$route.query" />
    </div>

    <div class="boxContainer">
      <StudyCriterionList id="criteriaList" :criterions="criterions" />
    </div>
    <div v-if="informations.length > 0" class="boxContainer">
      <StudyInformationList id="criteriaList" :informations="informations" />
    </div>

    <div id="next-step-container">
      <b-button rounded
        title="Aus Repository auswählen"
        class="btn-next-step"
        id="btnShowPatients"
        @click="collectPatients()"
        >Patienten/Patientinnen auswählen</b-button
      >

      <b-button rounded
        title=""
        class="btn-next-step"
        id="btnShowPatients"
        @click="uploadCDALocal()"
        >ELGA Dokumente auswählen</b-button
      >
    </div>

    <div id="upload-container">
      <div class="boxContainer">
        <NewStudyAddFile
          ref="NewStudyAddFile"
          id="addFile"
          :dropFiles="dropFiles"
        />
        <br />
        <div class="button-line-validate-files">
          <b-button rounded id="button-validate-cda-files" @click="validateCDAFiles()"
            >Dateien überprüfen</b-button
          >
        </div>
      </div>
    </div>

    <div id="patienten-collection-list-container">
      <div class="boxContainer">
        <StudyPatientCollectionList
          ref="StudyPatientCollectionList"
          :patientData="patientData"
        />
      </div>
    </div>
  <div class="button-line-validate">
    <b-button rounded
      title="Studienkritieren mit ELGA Dokumenten gegenprüfen"
      id="btn-start-validate"
      @click="validateData()"
      >Patienten und Patientinnen überprüfen</b-button
    >
    </div>
  </main>
</template>

<script>
import AppHeader from "../../components/AppHeader";
import StudyBasicinfos from "./StudyBasicinfos";
import StudyCriterionList from "./StudyCriterionList";
import StudyInformationList from "./StudyInformationList";
import NewStudyAddFile from "../StudyEditorPage/NewStudyAddFile";
import StudyPatientCollectionList from "./StudyPatientCollectionList";

export default {
  name: "StudyEditorPage",
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

      this.showToastInfo("ELGA Daten werden geprüft", 1000);
      axios({
        method: "POST",
        url: "http://127.0.0.1:8000/api/validateSelectedCdaFiles/",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          this.patientData = response.data;

          document.getElementById("btn-start-validate").style.display = "inline";
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
      document.getElementById("btn-start-validate").style.display = "inline";
      setTimeout(function(){ 
      window.scrollTo(0,document.body.scrollHeight); }, 100);

    },
    uploadCDALocal() {
      
      document.getElementById("upload-container").style.display = "inline";
      document.getElementById(
        "patienten-collection-list-container"
      ).style.display = "none";
      document.getElementById("btn-start-validate").style.display = "none";
      this.localAnalysis = true;
       window.scrollTo(0,document.body.scrollHeight);
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
      const patientDataSelected = this.$refs.StudyPatientCollectionList
        .checkedRows;
      if (patientDataSelected.length == 0) {
        this.showToastError("Keine Personen ausgewählt");
        return;
      }

      const formData = new FormData();

      const studyName =this.study.name

      const files = this.dropFiles;

      var patientDataSelectedJson = JSON.stringify(patientDataSelected);

      for (const file of files) {
        formData.append("file", file);
      }

      formData.append("Study_Name", studyName);
      formData.append("Local_Analysis", this.localAnalysis);
      formData.append("Selected_Patients[]", patientDataSelectedJson);

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
            query: [this.responseJson, this.study],
          });
        })
        .catch((response) => {
          this.showToastError(response);
        });
    },
    fillData() {
      this.study = this.$route.query;
      this.criterions = this.study.criterions.sort((a, b) =>
        a.criterion_type < b.criterion_type ? 1 : -1
      );
      this.informations = this.study.information_needed;
    },
  },
  mounted() {
    this.fillData();
  },
};
</script>

<style>
#button-validate-cda-files {
  justify-self: center;
}
#btn-start-validate {

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
  justify-content: center;
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
  margin-left: 8px;
  float: right;
}

.button-line-validate-files {
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-line-validate{
   display: flex;
  justify-content: center;
  margin: 5px;
}
</style>
