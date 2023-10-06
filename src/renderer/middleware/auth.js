export default function ({ store, redirect }) {
  console.log('auth middleware', store.state.data.isAuthed)
  if (!store.state.data.isAuthed) {
    return redirect('/')
  }
}
