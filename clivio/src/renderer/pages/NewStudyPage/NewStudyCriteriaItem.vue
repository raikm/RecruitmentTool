<template>
    <div>
        <td>{{criteria.name}}</td>
        <td>{{criteria.xPath}}</td>
    </div>
</template>

<script>
export default {
    name:"NewStudyCriteriaItem",
    props: ["criteria"]
}
</script>

<style scoped>

td {
    overflow: hidden;
  }

</style>>

  