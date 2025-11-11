import React, { useState } from 'react';
import { registerUser, loginUser, validatePasswordRules, resetPassword, validateUsername } from '@/auth/AuthContext';

const Field: React.FC<{
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  showToggle?: boolean;
}> = ({ label, type = 'text', value, onChange, showToggle = false }) => {
  const [visible, setVisible] = useState(false);
  const inputType = type === 'password' && !visible ? 'password' : 'text';
  return (
    <div className='flex flex-col gap-1'>
      <label className='text-sm text-gray-200'>{label}</label>
      <div className='flex items-center gap-2'>
        <input
          className='p-2 rounded input-primary flex-1'
          value={value}
          type={inputType}
          onChange={e => onChange(e.target.value)}
        />
        {showToggle && (
          <button
            type='button'
            aria-label={visible ? 'Hide password' : 'Show password'}
            onClick={() => setVisible(v => !v)}
            className='pw-toggle'
          >
            {visible ? (
              <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' aria-hidden>
                <path d='M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/>
                <path d='M17 7l-10 10' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/>
              </svg>
            ) : (
              <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' aria-hidden>
                <path d='M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/>
                <circle cx='12' cy='12' r='3' fill='currentColor' />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<'login'|'register'>('login');

  // login
  const [liUser, setLiUser] = useState('');
  const [liPass, setLiPass] = useState('');
  const [liErr, setLiErr] = useState<string | null>(null);

  // register
  const [reUser, setReUser] = useState('');
  const [rePass, setRePass] = useState('');
  const [rePass2, setRePass2] = useState('');
  const [reErr, setReErr] = useState<string | null>(null);

  // reset
  const [showReset, setShowReset] = useState(false);
  const [rsUser, setRsUser] = useState('');
  const [rsNew, setRsNew] = useState('');
  const [rsNew2, setRsNew2] = useState('');
  const [rsErr, setRsErr] = useState<string | null>(null);

  const doLogin = () => {
    setLiErr(null);
    const r = loginUser(liUser.trim(), liPass);
    if (!r.ok) setLiErr(r.message || 'Lỗi');
    else alert('Đăng nhập thành công (demo)');
  };

  const doRegister = () => {
    setReErr(null);
    if (rePass !== rePass2) return setReErr('Mật khẩu không trùng khớp.');
    const userVal = validateUsername(reUser);
    if (!userVal.ok) return setReErr(userVal.message);
    const pr = validatePasswordRules(rePass);
    if (!pr.ok) return setReErr(pr.message || 'Mật khẩu không hợp lệ.');
    const r = registerUser(reUser, rePass);
    if (!r.ok) return setReErr(r.message);
    alert('Đăng ký thành công (demo)');
    setReUser('');
    setRePass('');
    setRePass2('');
    setMode('login');
  };

  const doReset = () => {
    setRsErr(null);
    if (rsNew !== rsNew2) return setRsErr('Mật khẩu không trùng khớp.');
    const pr = validatePasswordRules(rsNew);
    if (!pr.ok) return setRsErr(pr.message);
    const r = resetPassword(rsUser.trim(), rsNew);
    if (!r.ok) return setRsErr(r.message);
    alert('Đổi mật khẩu thành công (demo)');
    setShowReset(false);
    setMode('login');
  };

  return (
    <div className='min-h-screen flex items-center justify-center auth-bg p-6'>
      <div className='w-full max-w-2xl auth-card p-6'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-2xl font-semibold'>Quản lý Tài khoản</h2>
          <div className='flex gap-2'>
            <button className={`px-3 py-1 rounded ${mode==='login' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setMode('login')}>Đăng nhập</button>
            <button className={`px-3 py-1 rounded ${mode==='register' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setMode('register')}>Đăng ký</button>
          </div>
        </div>

        {mode === 'login' && (
          <div className='grid gap-3'>
            <Field label='Tên tài khoản' value={liUser} onChange={setLiUser} />
            <Field label='Mật khẩu' type='password' value={liPass} onChange={setLiPass} showToggle />
            {liErr && <div className='error-text'>{liErr}</div>}
            <div className='flex gap-2'>
              <button className='px-4 py-2 rounded btn-primary' onClick={doLogin}>Đăng nhập</button>
              <button className='px-4 py-2 rounded btn-outline' onClick={() => setShowReset(true)}>Quên mật khẩu</button>
            </div>
          </div>
        )}

        {mode === 'register' && (
          <div className='grid gap-3'>
            <Field label='Tên tài khoản' value={reUser} onChange={setReUser} />
            <Field label='Mật khẩu' type='password' value={rePass} onChange={setRePass} showToggle />
            <Field label='Nhập lại mật khẩu' type='password' value={rePass2} onChange={setRePass2} showToggle />
            {reErr && <div className='error-text'>{reErr}</div>}
            <div className='flex gap-2'>
              <button className='px-4 py-2 rounded btn-primary' onClick={doRegister}>Đăng ký</button>
            </div>
            <div className='text-sm text-gray-300'>
              <div className='mb-2 font-semibold'>Yêu cầu tên tài khoản:</div>
              <ul className='list-disc list-inside space-y-1 mb-3'>
                <li>3–20 ký tự</li>
                <li>Bắt đầu bằng chữ hoặc gạch dưới (_), không phải số</li>
                <li>Chỉ chứa chữ, số, gạch dưới (_)</li>
              </ul>
              <div className='font-semibold'>Yêu cầu mật khẩu:</div>
              <ul className='list-disc list-inside space-y-1'>
                <li>6–32 ký tự</li>
                <li>Chữ hoa, chữ thường, số và ký tự đặc biệt</li>
              </ul>
            </div>
          </div>
        )}

        {showReset && (
          <div className='mt-6 p-4 border-t border-gray-700'>
            <h3 className='text-lg mb-2'>Tạo mật khẩu mới</h3>
            <Field label='Tên tài khoản' value={rsUser} onChange={setRsUser} />
            <Field label='Mật khẩu mới' type='password' value={rsNew} onChange={setRsNew} showToggle />
            <Field label='Nhập lại mật khẩu mới' type='password' value={rsNew2} onChange={setRsNew2} showToggle />
            {rsErr && <div className='error-text'>{rsErr}</div>}
            <div className='flex gap-2 mt-2'>
              <button className='px-4 py-2 rounded btn-primary' onClick={doReset}>Tạo mật khẩu mới</button>
              <button className='px-4 py-2 rounded btn-outline' onClick={() => setShowReset(false)}>Hủy</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
