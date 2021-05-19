<template>
  <el-row>
    <el-col :span="5">
      <Dialog dialog-title="大厅闲聊"/>
    </el-col>
    <el-col :span="14">
      <RoomsTable></RoomsTable>
    </el-col>
    <el-col :span="5">
      <PlayersTable></PlayersTable>
    </el-col>
  </el-row>
</template>

<script>

import RoomsTable from "@/components/RoomsTable"
import Dialog from "@/components/Dialog";
import PlayersTable from "@/components/PlayersTable";

export default {
  name: "Hall",
  components: {
    RoomsTable,
    Dialog,
    PlayersTable
  }
}
</script>

<style scoped>

</style>