import Vue from "vue";

Vue.mixin({
  methods: {

    showToastError(text) {
      this.$buefy.toast.open({
        duration: 2000,
        message: text,
        position: "is-bottom",
        type: "is-danger",
      });
    },
    showToastInfo(text) {
      this.$buefy.toast.open({
        duration: 5000,
        message: text,
        position: "is-bottom",
        type: "is-light",
      });
    },
  }
  
});

