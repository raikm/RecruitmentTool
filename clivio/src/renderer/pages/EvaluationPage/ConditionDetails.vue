<template>
  <div>
    <div
      class="type-tag"
      :class="{
        greenBackgroundClass: currentCriterium.criterium_type == 'EK',
        redBackgroundClass: currentCriterium.criterium_type == 'AK',
      }"
    >
      {{ currentCriterium.criterium_type }}
    </div>
    <h1 id="condition-name">{{ currentCondition.name }}</h1>
    <h2 class="matches-subtitle">Matches</h2>

    <div
      class="hit-container"
      v-for="result in currentCondition.evaluation_results.hits"
      :key="result.cda_id"
      @click="openCDA(result.cda_id)"
    >
      <div class="cda-datum">12.05.2020 (3d)</div>
      

      <ul>
      <li class="hit-result" v-for="hit in result.hit_result" :key="hit">
        {{ hit }}
      </li>

      </ul>
    </div>
    <h2 class="matches-subtitle">Negative Matches</h2>

    <div
      class="hit-container"
      v-for="result in currentCondition.evaluation_results.hits"
      :key="result.cda_id"
      @click="openCDA(result.cda_id)"
    >
      <div class="cda-datum">12.05.2020 (3d)</div>
      

      <ul>
      <li class="hit-result" v-for="hit in result.hit_result" :key="hit">
        {{ hit }}
      </li>

      </ul>
    </div>


  </div>
</template>

<script>
export default {
  name: "ConditionDetails",
  components: {},
  props: ["currentCondition", "currentCriterium"],
  methods: {
    openCDA(cda_id) {
      console.log("open" + cda_id);
    },
  },
};
</script>

<style>
.matches-subtitle{
    margin-left: 5%;
}


.hit-container {
  width: 90%;
  margin: 0 5%;
  padding: 1%;
  border-width: 0.5px;
  border-color: teal;
  border-style: solid;
  display: inline-block;
}



.cda-datum {
  float: right;
  
}
.hit-result{
    
}


</style>
