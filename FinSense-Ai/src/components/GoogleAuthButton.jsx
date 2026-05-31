import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios'

function GoogleAuthButton() {
  const handleSuccess = async (credentialResponse) => {
    try {
      console.log("API URL:", import.meta.env.VITE_API_BASE_URL)
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'}/auth/google`,
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