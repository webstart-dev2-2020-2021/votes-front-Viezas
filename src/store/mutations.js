export const connectUser = (state, token) => {
  state.user.token = (token)
}