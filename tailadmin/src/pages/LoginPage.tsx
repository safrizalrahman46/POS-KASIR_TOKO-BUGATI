import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (!username || !password) { setError('Isi username dan password'); return; }
    setLoading(true);
    setError('');
    try {
      await login(username, password);
      toast.success('Login berhasil');
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      if (userData.role === 'admin') navigate('/admin');
      else navigate('/pos');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login gagal');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-brand-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
          <div className="text-center mb-8">
            <img className="mx-auto mb-4" src="/images/logo/auth-logo.svg" alt="TOKO BUGATI" width={48} height={48} />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">TOKO BUGATI</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Sistem Point of Sale</p>
          </div>
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm rounded-lg p-3 mb-4">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none" placeholder="Masukkan username" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none" placeholder="Masukkan password" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-brand-500 hover:bg-brand-600 disabled:bg-gray-400 text-white font-semibold py-2.5 rounded-lg transition-colors">
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>
          <div className="mt-6 text-center text-xs text-gray-400 space-y-1">
            <p>Demo: admin / admin123 atau kasir / kasir123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
