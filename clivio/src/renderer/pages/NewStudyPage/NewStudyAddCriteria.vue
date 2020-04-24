<template>
  <div class="main">
    <form>
      <h3>Neues Kriterium</h3>
      <!-- TODO: put in new divs and change margin instead of br -->
      <div class="inputContainer">
        <a-input
          id="criterium"
          type="text"
          v-model="name"
          placeholder="Kriterium"
        />
        <a-input
          id="xPathInputText"
          type="text"
          v-model="xPath"
          placeholder="xPath"
        />
      </div>
        
        <a-button id="btn" @click="addCriteria">Hinzufügen</a-button>
    </form>
  </div>
</template>

<script>



export default {
  name: "NewStudyAddCriteria",
  data() {
    return {
      name: "",
      xPath: "",
    };
  },
  methods: {
    addCriteria(e) {
      e.preventDefault();
      const newCriteria = {
        name: this.name,
        xPath: this.xPath,
      };
      this.$emit("add-criteria", newCriteria);
    },
  },
};
</script>

<style scoped>
.inputContainer {
  display: inline-flex;
  width: 100%;
  margin-bottom: 1%;
  /* background-color:green; */
}

#criterium {
  margin-right: 0.5%;
  width: 30%;
}

#xPathInputText {
  margin-left: 0.5%;
  width: 70%;
}
#btn{
    float: right;
    /* margin: 1%; */
}
</style>
