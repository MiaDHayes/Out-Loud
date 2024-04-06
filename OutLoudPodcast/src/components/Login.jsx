const { useState } = require("react");


function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (event) => {
        event.prevenetDefault()
        
        try {
            const response = await axios.post('http://localhost:3005/user', {
                username, password
            })
            console.log('Login successful:', response.data)
        } catch (error) {
            console.error('Login error', error)
            setError('Invalid username or password. Please try again')
        }
    }


    return (
        <div className="login-container">
          <h2>Login</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      )
}