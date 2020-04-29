<template>
    <main>
        <AppHeader />
        <div class="mainContainer">
            <div class="upperContainer">
                <NewStudyAddBasicinfos />
            </div>
            <div>
               
                <NewStudyAddCriteria v-on:add-criteria="addCriteria"/>
                <NewStudyCriteriaList id="criteriaList" v-bind:criterias="criterias"/>
                
            </div>


            <div>
              <NewStudyAddFile id="addFile"/>    
            </div>

            <b-button id="btnValidate">Validieren</b-button>


        </div>
        

    </main>
</template>

<script>
import AppHeader from '../../components/AppHeader'
import NewStudyAddBasicinfos from './NewStudyAddBasicinfos'
import NewStudyAddCriteria from './NewStudyAddCriteria'
import NewStudyCriteriaList from './NewStudyCriteriaList'
import NewStudyAddFile from './NewStudyAddFile'

export default {


  name: 'NewStudyPage',
  data() {
      return {
          criterias: [
          ]
      }
      
  },
  components: {
      AppHeader,
      NewStudyAddBasicinfos,
      NewStudyAddCriteria,
      NewStudyCriteriaList,
      NewStudyAddFile
      
    },
    methods:{
      addCriteria(newCriteria){
          this.criterias = [...this.criterias, newCriteria]
      }  
    }
}
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

#criteriaList #addFile{
    margin-top: 80px;
}



</style>