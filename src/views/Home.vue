<template>
  <div class="shadow-container">
    <el-container>
      <el-header>
        <span class="brand-name">在线五子棋</span>
      </el-header>
      <el-main>
        <el-tabs v-model="currentTab">

          <el-tab-pane label="大厅" name="hall">
            <Hall></Hall>
          </el-tab-pane>

          <el-tab-pane v-for="item in tabs" :key="item.roomId" :label="'【房间】'+item.roomId" :name="item.roomId">
            <Room :roomId="item.roomId" :self-role="item.selfRole"/>
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
  data() {
    return {}
  },
  components: {Room, Hall},
  computed: {
    tabs() {
      return this.$store.getters.tabRooms
    },
    currentTab: {
      get() {
        return this.$store.getters.currentTab
      },
      set(val) {
        // this.$store.getters.currentTab = val
        this.$store.commit('changeCurrentTab', val)
      }
    }
  }
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