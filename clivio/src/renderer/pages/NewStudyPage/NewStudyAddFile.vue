<template>
  <div class="main">
    <h3>Neue CDA Files hinzufügen</h3>
    <div class="dragfield">
      <section>
        <b-field>
          <b-upload v-model="dropFiles" multiple drag-drop>
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
      <!-- <label v-for="(file, index) in dropFiles" :key="index">
        {{ file.name }}
      </label> -->
      <!-- <b-table :columns="columns" :data="dropFiles">

      </b-table> -->
      <b-table :data="dropFiles">
        <template slot-scope="props">
          <b-table-column label="File">
            {{ props.row.name }}
          </b-table-column>


        <b-table-column label="" width="50px">
          <button
            class="button is-small is-danger"
            @click.prevent="onDelete(props.row)"
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
  data() {
    return {
      dropFiles: [],
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

.file-list {
}
</style>
