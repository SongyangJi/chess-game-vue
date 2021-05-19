export default {
    showStep(data) {
        this.$store.commit("step", data.dot)
    },
    gameOver(data) {
        this.$store.commit("updateGameState",data.opt)
        this.$store.commit("setWinner",data.role)
    }
}