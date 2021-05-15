<template>
  <div>
    <ChessBoard room-id="123"></ChessBoard>
  </div>
</template>

<script>

import ChessBoard from "@/components/ChessBoard";

export default {
  name: 'App',
  components: {
    ChessBoard
  }
}
</script>
