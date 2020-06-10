<template>
  <div class="main">
    <h3>Neue CDA Files hinzufügen</h3>
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
                <p>Drop your files here or click to upload</p>
              </div>
            </section>
          </b-upload>
        </b-field>
      </section>
    </div>
    <div class="fileList">
      <b-table :data="dropFiles">
        <template slot-scope="props">
          <b-table-column label="File">
            {{ props.row.name }}
          </b-table-column>

          <b-table-column label="" width="50px">
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
  </div>
</template>
<script>
export default {
  name: "NewStudyAddFile",
  props: ["dropFiles"],
  data() {
    return {
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
</style>
