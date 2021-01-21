<template>
  <main>
    <AppHeader :headerName="headerName" />
    <div class="boxContainer">
      <div class="upperContainer">
        <NewStudyAddBasicinfos :basicInfos="basicInfos" />
      </div>
      <div>
        <NewStudyAddCriterion
          ref="addCriterion"
          v-on:add-criteria="addCriteria"
        />
        <NewStudyCriterionList
          id="criteriaList"
          :criterions="criterions"
          :editRowParent="editRow"
        />
        <NewStudyAddInformation
          ref="addInformation"
          v-on:add-information="addInformation"
        />
        <NewStudyInformationList
          id="criteriaList"
          :informations="informations"
          :editInformationNeedRowParent="editInformationNeedRow"
        />
      </div>
      <b-button rounded id="btnSave" @click="validateData()"
        >Studie speichern</b-button
      >
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

export default {
  name: "StudyEditorPage",
  created: function () {
    if (this.$route.query.length > 0) {
      const {
        name,
        head_of_study,
        head_of_study_contact,
        criterion_count,
        criterions,
        eudraCT_number,
        information_needed,
      } = this.$route.query[0];
      this.basicInfos.studyName = name;
      this.basicInfos.studyCriteriaCount = criterion_count;
      this.basicInfos.headOfStudy = head_of_study;
      this.basicInfos.studyNumber = eudraCT_number;
      this.basicInfos.headOfStudyContact = head_of_study_contact;
      this.criterions = criterions;
      this.informations = information_needed;
    }
  },
  data() {
    return {
      criterions: [],
      informations: [],
      headerName: "EDITOR",
      responseJson: [],
      basicInfos: {
        studyName: "",
        studyCriteriaCount: "",
        studyNumber: "",
        headOfStudy: "",
        headOfStudyContact: "",
      },
    };
  },

  components: {
    AppHeader,
    NewStudyAddBasicinfos,
    NewStudyAddCriterion,
    NewStudyCriterionList,
    NewStudyAddInformation,
    NewStudyInformationList,
  },
  methods: {
    editRow(row) {
      const { name, criterion_type, conditions } = row;

      //add data to edit formular
      this.$refs.addCriterion.name = name;
      this.$refs.addCriterion.criterion_type = criterion_type;
      this.$refs.addCriterion.conditions = [];
      for (var counter = 0; counter < conditions.length; counter++) {
        let element = conditions[counter];
        this.$refs.addCriterion.conditions.push({
          conditionId: `condition-${counter}`,
          xPathId: `xPath-${counter}`,
          xpathId: `neg-xPath-${counter}`,
          rough_xpathId: `value-xPath-${counter}`,
          rough_xpath_descriptionId: `value-desc-xPath-${counter}`,
          name: element.name,
          xpath: element.xpath,
          neg_xpath: element.negative_xpath,
          rough_xpath: element.rough_xpath,
          rough_xpath_description: element.rough_xpath_description,
        });
      }

      this.criterions = this.criterions.filter(function (obj) {
        return obj.name !== row.name;
      });
    },
    editInformationNeedRow(row) {
      const { name, xpath } = row;

      //add data to edit formular
      this.$refs.addInformation.name = name;
      this.$refs.addInformation.xpath = xpath;

      this.informations = this.informations.filter(function (obj) {
        return obj.name !== row.name;
      });
    },
    addCriteria(newCriteria) {
      this.criterions = [...this.criterions, newCriteria];
    },
    addInformation(newInformation) {
      this.informations = [...this.informations, newInformation];
    },
    validateData() {
      const formData = new FormData();

      formData.append("Study_Name", this.basicInfos.studyName);
      formData.append("Study_number", this.basicInfos.studyNumber);
      formData.append("head_of_study", this.basicInfos.headOfStudy);
      formData.append("criterion_count", this.basicInfos.studyCriteriaCount);
      formData.append(
        "criterion_elga_count",
        this.criterions.length.toString()
      );
      formData.append(
        "head_of_study_contact",
        this.basicInfos.headOfStudyContact
      );

      var criterionsJson = JSON.stringify(this.criterions);
      var informationsJson = JSON.stringify(this.informations);

      formData.append("Criterions[]", criterionsJson);
      formData.append("Information_Needs[]", informationsJson);

      axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/createOrEdit/",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          this.responseJson = response.data;
          this.$router.push({
            name: "dashboard-page",
           
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
.boxContainer {
  background-color: rgba(245, 245, 245, 0.3);
  margin: 0px 50px 0px 50px;
  padding: 10px;
  /* overflow: hidden;  */
}
#btnSave {
  margin-top: 25px;
  float: right;
  /* margin: 1%; */
  /* background-color: var(--main-color); */
}
#criteriaList #addFile {
  margin-top: 80px;
}
</style>
