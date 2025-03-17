import { useState, FormEvent } from 'react';
import { useAuth } from '../../auth/authcontext'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../auth/firebaseConfig';
import { Link } from 'react-router-dom';

export function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login to CrowdFund</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={handleGoogleLogin} className="google-btn">
        Continue with Google
      </button>
      <div className="auth-links">
        <Link to="/forgot-password">Forgot Password?</Link>
        <span> | </span>
        <Link to="/register">Create Account</Link>
      </div>
    </div>
  );
}