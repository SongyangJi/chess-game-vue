<template>
  <div class="container">
    <div class="header">
      <span class="title">对局信息</span>
    </div>
  </div>
</template>

<script>
export default {
name: "GameDetail"
}
</script>

<style scoped>
.container {
  margin-top: 3%;
}
.scrollbar {
  height: calc(60vh);
  min-height: 180px;
}
.header {
  border-bottom: 1px solid lightgrey;
  padding: 2% 0 2% 5%;
}
.title {
  padding-top: 100px;
}
.line {
  margin-top: 5px;
  margin-left: 3%;
  font-size: small;
}
.input {
  width: 80%;
}
.send-button {
  width: 20%;
}
</style>