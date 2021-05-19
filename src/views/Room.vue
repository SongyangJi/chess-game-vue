<template>
  <el-row>
    <el-col :span="5">
      <Dialog dialog-title="聊天对话框"></Dialog>
    </el-col>
    <el-col :span="14">
      <ChessBoard></ChessBoard>
    </el-col>
    <el-col :span="5">
      <GameDetail></GameDetail>
    </el-col>
  </el-row>
</template>

<script>
import ChessBoard from "@/components/ChessBoard";
import Dialog from "@/components/Dialog";
import GameDetail from "@/components/GameDetail";

export default {
  name: "Room",
  components: {ChessBoard, Dialog, GameDetail}
}
</script>

<style scoped>

</style>