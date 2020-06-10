<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import DashboardPage from './pages/DashboardPage'
import NewStudyPage from './pages/NewStudyPage'
import EvaluationPage from './pages/EvaluationPage'


  export default {




    name: 'clivio', 
    components: {
        NewStudyPage,
        EvaluationPage,
        DashboardPage
      }
    
  }
</script>

<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
$primary: #8c67ef;

:root{
    --main-color: #028482;
    --main-text-color: rgb(253, 249, 249);
    --main-text-font: arial; 
    $secondary-color: #e46c21;
}

  body {
    font-family: "Arial";

}

input[type="text"], textarea{
    /* background-color: cyan; */
    height: 24px;
    font-size: 15px;
    font-weight: 600;
    
}

::placeholder { 
  color: var(--main-color);
  opacity: 0.4;
}
h {
  color: var(--main-color);
}


h3 {
  color: var(--main-color);
  margin: 1%;
}



@import "~bulma";
@import "~buefy/src/scss/buefy";


</style>
