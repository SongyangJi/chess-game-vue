import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        dot: {
            x: null,
            y: null,
            color: null
        },
        id: {
            uid: null,
            nickname: null
        },
        gameState: "",
        winner: null,
        roomList: []
    },
    getters: {
        dot: state => state.dot,
        id: state => state.id,
        gameState: state => state.gameState,
        winner: state => state.winner,
        roomList: state => state.roomList
    },
    mutations: {
        step(state, dot) {
            state.dot = dot
        },
        setId(state, id) {
            state.id = id
        },
        updateGameState(state, gameState) {
            state.gameState = gameState
        },
        setWinner(state, winner) {
            state.winner = winner
        }
    },
    actions: {},
    modules: {}
})
