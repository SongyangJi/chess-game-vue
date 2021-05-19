<template>
  <div class="container">
    <div class="header">
      <span class="title">在线玩家</span>
    </div>
    <div class="scrollbar">
      <el-table :data="players" :show-header="false" size="mini">
        <el-table-column prop="name"/>
        <el-table-column align="right">
          <template slot-scope="scope">
            {{ '状态' + scope.row.status }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayersTable",
  data() {
    return {
      players: []
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
.container {
  margin-top: 3%;
}

.scrollbar {
  height: calc(72vh);
  min-height: 180px;
}

.header {
  border-bottom: 1px solid lightgrey;
  padding: 3% 0 2% 5%;
}

.title {
  padding-top: 10px;
}
</style>