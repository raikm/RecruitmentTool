<template>
  <form>
    <h3>Basis Informationen</h3>
    <div class="columns">
      <div class="column">
        <b-field label="Name" label-position="inside">
          <b-input
            class="input-field-basic"
            id="study-name"
            type="text"
            disabled
          />
        </b-field>
        <b-field label="Verantwortliche Partei" label-position="inside">
          <b-input
            class="input-field-basic"
            id="head-of-study"
            type="text"
            disabled
          />
        </b-field>
        <b-field label="Kontakt" label-position="inside">
          <b-input
            class="input-field-basic"
            id="head-of-study-contact"
            type="text"
            disabled
          />
        </b-field>
      </div>
      <div class="column">
        <b-field label="Studien-Nummer" label-position="inside">
          <b-input
            class="input-field-basic"
            id="study-number"
            type="text"
            disabled
          />
        </b-field>
        <b-field label="Anzahl Ges. Kriterien" label-position="inside">
          <b-input
            class="input-field-basic"
            id="criterion-count"
            type="text"
            disabled
          />
        </b-field>
        <b-field label="Anzahl ELGA Kriterien" label-position="inside">
          <b-input
            class="input-field-basic"
            id="criterion-elga-count"
            type="text"
            disabled
          />
        </b-field>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "NewStudyAddBasicinfos",
};
</script>

<style lang="scss">
.input-field-basic {
  margin-top: 5px;
}
</style>
