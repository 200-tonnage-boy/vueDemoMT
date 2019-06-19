const state = () => {
  position: {
    
  }
}

const mutations = {
  setPosition (state,position) {
    state.position = position
  }
}

const actions = {
  setPosition ({commit}, position) {
    commit('setPosition', position)
  }
}

export default {namespaced: true, state, mutations, actions}