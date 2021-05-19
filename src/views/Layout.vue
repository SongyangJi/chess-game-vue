<template>
  <div class="shadow-container">
    <el-container>
      <el-header>
        <span class="brand-name">在线五子棋</span>
      </el-header>
      <el-main>
        <el-tabs>
          <el-tab-pane label="大厅" name="first">
            <Hall></Hall>
          </el-tab-pane>
          <el-tab-pane label="房间" name="second">
            <Room></Room>
          </el-tab-pane>
        </el-tabs>
      </el-main>

    </el-container>
  </div>
</template>

<script>
import Hall from "@/views/Hall";
import Room from "@/views/Room";

export default {
  name: "Layout",
  components: {Room, Hall}
}
</script>

<style scoped>
.shadow-container {
  height: calc(97vh);
  min-height: 600px;
  min-width: 1200px;
}

.brand-name {
  font-size: x-large;
  font-style: italic;
  /*float: right;*/
  margin-top: 1%;
}
</style>