<template>
  <div class="main">
    <div class="dragfield">
      <section>
        <b-field>
          <b-upload
            v-model="dropFiles"
            @input="validataFiles(dropFiles)"
            multiple
            drag-drop
          >
            <section class="section">
              <div class="content has-text-centered">
                <p>Legen Sie Ihre Dateien hier ab oder klicken Sie zum Hochladen</p>
              </div>
            </section>
          </b-upload>
        </b-field>
      </section>
    </div>
    <div v-if="dropFiles.length > 0" class="fileList">
      <b-table :data="dropFiles">
        <template slot-scope="props">
          <b-table-column label="Ausgewählte ELGA-Dokumente:" width=97%>
            {{ props.row.name }}
          </b-table-column>

          <b-table-column label="" width=3%>
            <button
              class="button is-small is-danger"
              @click.prevent="deleteDropFile(props.row)"
            >
              <b-icon icon="delete" size="is-small"></b-icon>
            </button>
          </b-table-column>
        </template>
      </b-table>
    </div>
    <br/>
    <b-checkbox id="decision-checkbox" v-model="repositorySave" size="is-small">Daten im Repository abspeichern</b-checkbox>
  </div>
</template>
<script>
export default {
  name: "NewStudyAddFile",
  props: ["dropFiles"],
  data() {
    return {
      repositorySave: false,
      columns: [
        {
          field: "name",
          label: "name",
          width: "50%",
        },
        {
          field: "index",
          label: "index",
          width: "50%",
        },
      ],
    };
  },
  methods: {
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1);
    },
    validataFiles(files) {
      var foundInvalidData = false;
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        if (file.type != "text/xml") {
          files.splice(i);
          foundInvalidData = true;
        }
      }
      //Bugfix: bei PDFs und XML wird gar nichts hinzugefuegt
      if (foundInvalidData) {
        this.$buefy.toast.open({
          duration: 5000,
          message: "nonkonforme CDA's wurden nicht hinzugefügt",
          position: "is-bottom",
          type: "is-danger",
        });
      }
    },
    //event.stop
  },
};
</script>

<style lang="scss">
.upload {
  width: 100%;
}
.upload-draggable {
  width: 100%;
}


#decision-checkbox{
  float: right;
}
</style>
