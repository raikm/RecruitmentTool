<template>
    <main>
        <AppHeader />
        <div class="mainContainer">
            <div class="upperContainer">
                <NewStudyAddBasicinfos />
            </div>
            <div class="leftMainContainer container">
               
                <NewStudyAddCriteria v-on:add-criteria="addCriteria"/>
                 <NewStudyCriteriaList v-bind:criterias="criterias"/>
                
            </div>


            <div class="rightMainContainer container" >
              <NewStudyAddFile />    
            </div>
            <a-button id="btnValidate" type ="primary">Validieren</a-button>
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
    overflow: hidden; /* will contain if #first is longer than #second */
}
.container {
    width: 48%;
    margin: 1%;
    float: left;
    display: flex;
    flex-flow: column;
    -ms-flex-align: center;
}

#btnValidate {
    float: right;
    margin: 1%;
    /* background-color: var(--main-color); */
}






.leftMainContainer {
    /* background-color: darkorange; */
}
.rightMainContainer {
    /* background-color: orangered; */
}





</style>