import { supabase } from '../client'

export default function Profile({ session }) {
  async function getProfile() {
    try {
      const user = supabase.auth.user()
      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
      }
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="container mx-auto grid min-h-screen place-content-center">
      <p>Oh hi there {session.user.email}</p>
      {console.log(session, 'this is session')}
      <button
        className="mt-4 rounded-lg border-blue-300 bg-blue-500 p-2 pl-5 pr-5 text-lg text-gray-100 focus:border-4"
        onClick={() => supabase.auth.signOut()}
      >
        Logout
      </button>
    </div>
  )
}
