<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="https://cdn.materialdesignicons.com/5.3.45/css/materialdesignicons.min.css"
    />

    <router-view></router-view>
  </div>
</template>

<script>
import DashboardPage from "./pages/DashboardPage";
import StudyEditorPage from "./pages/StudyEditorPage";
// import EvaluationPage from './pages/EvaluationPage'

export default {
  name: "clivio",
  components: {
    StudyEditorPage,
    // EvaluationPage,
    DashboardPage,
  },
};
</script>

<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
$primary: #8c67ef;

:root {
  --main-color: #2a6f97;
  --main-text-color: black;
  --main-text-font: arial;
  --main-red-color: #d52f20;
  --main-red-transparent-color: rgba(255, 0, 0, 0.1);
  --main-yellow-color: yellow;
  --main-green-color: #20bf55;
  --main-green-transparent-color: rgba(32, 191, 85, 0.1);
  --main-blue-color: #208abf;
  --main-blue-transparent-color: rgba(32, 138, 191, 0.7);
  --main-grey-color: grey;

  $secondary-color: #e46c21;
}
html,
body {
  font-family: "Arial";
  height: 100%;
  min-height: 100%;
  background-image: linear-gradient(to top, #c1dfc4 0%, #deecdd 100%);
}

input[type="text"],
textarea {
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

.boxContainer {
  background-color: rgba(255, 255, 255, 0.844);
  margin: 10px 30px 0px 30px;
  border: 0px solid;
  border-radius: 10px;
  padding: 5px;
  /* overflow: hidden;  */
}
.table,
.b-table,
.table-wrapper {
  background-color: rgba(255, 255, 255, 0.844) !important;
}

@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
