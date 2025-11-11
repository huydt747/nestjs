import React, { useState } from 'react';
import axios from '../api/axiosClient';

type Mode = 'signin' | 'signup' | 'reset';

const passwordValid = (pw: string) => {
  const minLen = 8;
  const hasNumber = /\d/.test(pw);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pw);
  return pw.length >= minLen && hasNumber && hasSpecial;
};

const AuthModal: React.FC<{ open: boolean; onClose: () => void; mode?: Mode; }> = ({ open, onClose, mode = 'signin' }) => {
  const [m, setM] = useState<Mode>(mode);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const close = () => {
    setError(null);
    setPassword('');
    setConfirm('');
    setUsername('');
    onClose();
  };

  const handleSignup = async () => {
    setError(null);
    if (!username) return setError('Vui lòng nhập username');
    if (!password) return setError('Vui lòng nhập mật khẩu');
    if (password !== confirm) return setError('Mật khẩu không trùng khớp');
    if (!passwordValid(password)) return setError('Mật khẩu cần tối thiểu 8 ký tự, có số và ký tự đặc biệt');
    setLoading(true);
    try {
      const res = await axios.post('/auth/register', { username, password, confirmPassword: confirm });
      console.log(res.data);
      close();
    } catch (e: any) {
      setError(e?.response?.data?.message || e.message || 'Lỗi đăng ký');
    } finally { setLoading(false); }
  };

  const handleSignin = async () => {
    setError(null);
    if (!username || !password) return setError('Vui lòng nhập username và mật khẩu');
    setLoading(true);
    try {
      const res = await axios.post('/auth/login', { username, password });
      console.log('login', res.data);
      close();
    } catch (e: any) {
      setError(e?.response?.data?.message || e.message || 'Lỗi đăng nhập');
    } finally { setLoading(false); }
  };

  const handleReset = async () => {
    setError(null);
    if (!username) return setError('Vui lòng nhập username');
    if (!password) return setError('Vui lòng nhập mật khẩu mới');
    if (password !== confirm) return setError('Mật khẩu không trùng khớp');
    if (!passwordValid(password)) return setError('Mật khẩu cần tối thiểu 8 ký tự, có số và ký tự đặc biệt');
    setLoading(true);
    try {
      const res = await axios.post('/auth/reset', { username, newPassword: password, confirmNewPassword: confirm });
      console.log('reset', res.data);
      close();
    } catch (e: any) {
      setError(e?.response?.data?.message || e.message || 'Lỗi đặt lại mật khẩu');
    } finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={close} />
      <div className="relative w-full max-w-md bg-white rounded shadow-lg p-6 z-60">
        <h3 className="text-xl font-semibold mb-4">{m === 'signin' ? 'Sign in' : m === 'signup' ? 'Sign up' : 'Reset password'}</h3>

        <label className="block text-sm text-gray-700">Username</label>
        <input value={username} onChange={e => setUsername(e.target.value)} className="w-full border rounded px-3 py-2 mb-3" />

        {(m === 'signup' || m === 'signin') && (
          <>
            <label className="block text-sm text-gray-700">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border rounded px-3 py-2 mb-3" />
          </>
        )}

        {m === 'signup' && (
          <>
            <label className="block text-sm text-gray-700">Confirm password</label>
            <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} className="w-full border rounded px-3 py-2 mb-3" />
          </>
        )}

        {m === 'reset' && (
          <>
            <label className="block text-sm text-gray-700">New password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border rounded px-3 py-2 mb-3" />
            <label className="block text-sm text-gray-700">Confirm new password</label>
            <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} className="w-full border rounded px-3 py-2 mb-3" />
          </>
        )}

        {error && <div className="text-sm text-red-600 mb-3">{error}</div>}

        <div className="flex items-center justify-between">
          <div className="flex space-x-3">
            {m === 'signin' && (
              <button onClick={handleSignin} disabled={loading} className={`px-4 py-2 bg-[#8927f4] text-white rounded`}>Sign in</button>
            )}
            {m === 'signup' && (
              <button onClick={handleSignup} disabled={loading} className={`px-4 py-2 bg-[#8927f4] text-white rounded`}>Sign up</button>
            )}
            {m === 'reset' && (
              <button onClick={handleReset} disabled={loading} className={`px-4 py-2 bg-[#8927f4] text-white rounded`}>Reset</button>
            )}
          </div>

          <div className="text-sm">
            {m !== 'signup' && <button className="underline text-blue-600" onClick={() => setM('signup')}>Create account</button>}
            {m !== 'signin' && <button className="ml-3 underline text-blue-600" onClick={() => setM('signin')}>Sign in</button>}
            {m !== 'reset' && <button className="ml-3 underline text-blue-600" onClick={() => setM('reset')}>Forgot password?</button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
