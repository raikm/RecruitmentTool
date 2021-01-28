<template>
  <div class="popup-window-status">
    <div class="center-dialog">
      <div class="please-wait-dialog">Bitte warten</div>
      <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
      <div class="please-wait-dialog">
        <b-icon icon="file-document" size="is-medium"> </b-icon> ELGA Dokumente werden
        verarbeitet
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StudyStatusInformation",
};
</script>

<style lang="scss">
.popup-window-status {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  transform: translate(0%, 0%);
  z-index: 99;
  background-color: rgba(255, 255, 255, 0.555);
  display: grid;
  place-items: center;
}

/*Huge thanks to @tobiasahlin at http://tobiasahlin.com/spinkit/ */
.spinner {
  margin: 2.5%;
}

.spinner > div {
  width: 12px;
  height: 12px;
  background-color: var(--main-color);

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
  }
}

@keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

.please-wait-dialog {
  font-size: xx-large;
  font-weight: 800;
}

.center-dialog {
  background: white;
  width: 70%;
  border-radius: 10px;
  text-align: center;
  padding: 10%;
}
</style>
