import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios'

function GoogleAuthButton() {
  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/google`,
        {
          credential: credentialResponse.credential,
        }
      )

      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))

      window.location.href = '/dashboard'
    } catch (error) {
      console.error('Google Auth Failed:', error)
    }
  }

  return (
    <div>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          console.log('Google Login Failed')
        }}
      />
    </div>
  )
}

export default GoogleAuthButton