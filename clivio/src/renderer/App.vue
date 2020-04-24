<template>
  <div id="app">
    <!-- <router-view></router-view> -->
    <NewStudyPage />
  </div>
</template>

<script>
import NewStudyPage from './pages/NewStudyPage'
import Vue from 'vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.use(Antd);
  export default {
    name: 'clivio', 
    components: {
        NewStudyPage
      }
    
  }
</script>

<style>
:root{
    --main-color: #028482;
    --main-text-color: rgb(253, 249, 249);
    --main-text-font: arial; 
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

</style>
