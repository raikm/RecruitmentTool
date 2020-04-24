<template>
<div class="main">
  <h3>Neue CDA Files hinzufügen</h3>
  <div class="dragfield">
  <a-upload-dragger
    name="file"
    :multiple="true"
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    @change="handleChange"
  >
    <p class="ant-upload-drag-icon">
      <a-icon type="inbox" />
    </p>
    <p class="ant-upload-text">Click oder drag file to this area to upload</p>
  </a-upload-dragger>
  </div>
  </div>
</template>
<script>
export default {
  name: "NewStudyAddFile",
  data() {
    return {};
  },
  methods: {
    handleChange(info) {
      const status = info.file.status;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
  },
};
</script>

<style>
.dragfield{
 margin-top: 80px;   
}

</style>