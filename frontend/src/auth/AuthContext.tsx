export type User = {
  username: string;
  password: string;
};

const STORAGE_KEY = 'demo_users_v1';

export function getUsers(): User[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as User[];
  } catch {
    return [];
  }
}

export function saveUsers(users: User[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function findUser(username: string): User | undefined {
  return getUsers().find(u => u.username === username);
}

export function validateUsername(username: string): { ok: boolean; message?: string }{
  const trimmed = username.trim();
  if (trimmed.length < 3) return { ok: false, message: 'Tên tài khoản phải ít nhất 3 ký tự.' };
  if (trimmed.length > 20) return { ok: false, message: 'Tên tài khoản tối đa 20 ký tự.' };
  if (/^[0-9]/.test(trimmed)) return { ok: false, message: 'Tên tài khoản không được bắt đầu bằng số.' };
  if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(trimmed)) {
    return { ok: false, message: 'Tên tài khoản chỉ chứa chữ Latin (a–z, A–Z), số (0–9) và gạch dưới (_).' };
  }
  return { ok: true };
}

export function validatePasswordRules(pw: string): { ok: boolean; message?: string }{
  const trimmed = pw.trim();
  if (trimmed.length < 6) return { ok: false, message: 'Mật khẩu phải ít nhất 6 ký tự.' };
  if (trimmed.length > 32) return { ok: false, message: 'Mật khẩu tối đa 32 ký tự.' };
  if (!/[a-zàáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/.test(trimmed)) {
    return { ok: false, message: 'Mật khẩu phải có chữ thường.' };
  }
  if (!/[A-ZÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴĐ]/.test(trimmed)) {
    return { ok: false, message: 'Mật khẩu phải có chữ hoa.' };
  }
  if (!/[0-9]/.test(trimmed)) return { ok: false, message: 'Mật khẩu phải có chữ số.' };
  if (!/[!@#\$%\^&\*\-_+=\[\]{};:'",.<>?/\\|`~]/.test(trimmed)) {
    return { ok: false, message: 'Mật khẩu phải có ký tự đặc biệt như !@#$%^&*-_+=[]{}etc.' };
  }
  return { ok: true };
}

export function registerUser(username: string, password: string): { ok: boolean; message?: string }{
  const trimmedUser = username.trim();
  const trimmedPass = password.trim();
  
  const userVal = validateUsername(trimmedUser);
  if (!userVal.ok) return userVal;
  
  const passVal = validatePasswordRules(trimmedPass);
  if (!passVal.ok) return passVal;
  
  const users = getUsers();
  if (users.find(u => u.username === trimmedUser)) {
    return { ok: false, message: 'Tên tài khoản đã tồn tại. Vui lòng chọn tên khác.' };
  }
  users.push({ username: trimmedUser, password: trimmedPass });
  saveUsers(users);
  return { ok: true };
}

export function loginUser(username: string, password: string): { ok: boolean; message?: string }{
  const u = findUser(username);
  if (!u) return { ok: false, message: 'Sai tên tài khoản.' };
  if (u.password !== password) return { ok: false, message: 'Sai mật khẩu.' };
  return { ok: true };
}

export function resetPassword(username: string, newPassword: string): { ok: boolean; message?: string }{
  const users = getUsers();
  const idx = users.findIndex(u => u.username === username);
  if (idx === -1) return { ok: false, message: 'Tên tài khoản không tồn tại.' };
  users[idx].password = newPassword;
  saveUsers(users);
  return { ok: true };
}