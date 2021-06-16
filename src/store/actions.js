export const connectUser = ( {commit}, token ) => {
  commit('connectUser', token)
}