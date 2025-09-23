'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AdminLayout } from '../components/AdminLayout';
import { useTranslations } from 'next-intl';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';

interface User {
  id: number;
  name: string | null;
  email: string;
  phone: string | null;
  createdAt: string;
  _count: {
    companyDossiers: number;
    tourismDossiers: number;
  };
}

interface UsersResponse {
  users: User[];
  total: number;
  pages: number;
}

export default function AdminUsers() {
  const router = useRouter();
  const t = useTranslations('Admin.users');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [creating, setCreating] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(searchInput);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.replace('/admin/login');
      return;
    }

    fetchUsers();
  }, [router, currentPage, searchTerm]);

  const fetchUsers = async () => {
    const token = localStorage.getItem('adminToken');
    setLoading(true);
    
    try {
      const searchParam = searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : '';
      const res = await fetch(`${API}/admin/users?page=${currentPage}&limit=20${searchParam}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!res.ok) {
        throw new Error('Unauthorized');
      }
      
      const data: UsersResponse = await res.json();
      setUsers(data.users);
      setTotalPages(data.pages);
      setTotalUsers(data.total);
    } catch (err) {
      localStorage.removeItem('adminToken');
      router.replace('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(searchInput);
    setCurrentPage(1);
  };

  const createUser = async () => {
    if (!createForm.name || !createForm.email || !createForm.password) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setCreating(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API}/admin/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(createForm)
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Erreur lors de la création');
      }

      setShowCreateModal(false);
      setCreateForm({ name: '', email: '', phone: '', password: '' });
      fetchUsers();
      alert('Utilisateur créé avec succès');
    } catch (err) {
      console.error('Error creating user:', err);
      alert(err instanceof Error ? err.message : 'Erreur lors de la création');
    } finally {
      setCreating(false);
    }
  };

  const handleUserClick = async (user: User) => {
    setSelectedUser(user);
    setLoadingDetails(true);
    
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API}/admin/users/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.ok) {
        const details = await res.json();
        setUserDetails(details);
        setShowUserDetails(true);
      }
    } catch (err) {
      console.error('Error fetching user details:', err);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleEditUser = (user: User) => {
    setEditForm({
      name: user.name || '',
      email: user.email,
      phone: user.phone || ''
    });
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    setUpdating(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API}/admin/users/${selectedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editForm)
      });

      if (res.ok) {
        setShowEditModal(false);
        fetchUsers(); // Refresh the list
        alert('Utilisateur mis à jour avec succès!');
      } else {
        const error = await res.json();
        alert(error.message || 'Erreur lors de la mise à jour');
      }
    } catch (err) {
      console.error('Error updating user:', err);
      alert('Erreur lors de la mise à jour');
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const confirmDeleteUser = async () => {
    if (!userToDelete) return;

    setDeleting(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API}/admin/users/${userToDelete.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        setShowDeleteModal(false);
        setUserToDelete(null);
        fetchUsers(); // Refresh the list
        alert('Utilisateur supprimé avec succès!');
      } else {
        const error = await res.json();
        alert(error.message || 'Erreur lors de la suppression');
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Erreur lors de la suppression');
    } finally {
      setDeleting(false);
    }
  };

  const exportUsers = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API}/admin/users/export`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `utilisateurs_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (err) {
      console.error('Error exporting users:', err);
      alert('Erreur lors de l\'export');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#F66B4C]/30 border-t-[#F66B4C] rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#071B1E]" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('loading')}</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>

      {/* Search and filters */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#F66B4C]/10 to-[#e55a43]/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row gap-6 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-[#071B1E] mb-3" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#F66B4C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>{t('searchLabel')}</span>
                </div>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder={t('searchPh')}
                  className="w-full pl-4 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#F66B4C] focus:border-transparent bg-gray-50/50 transition-all duration-300 hover:bg-white"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                />
                {searchInput && (
                  <button
                    onClick={() => setSearchInput('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              
            </div>
            
            
          </div>
        </div>
      </div>


      {/* Users table */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="flex items-center justify-between">
            <h3 
              className="text-lg font-semibold text-[#071B1E] flex items-center space-x-2"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              <svg className="w-5 h-5 text-[#F66B4C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              <span>{t('listTitle')}</span>
            </h3>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-[#F66B4C] to-[#e55a43] text-white rounded-2xl hover:from-[#e55a43] hover:to-[#d14a3a] transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105 transform"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="font-semibold">{t('newUser')}</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-[#F66B4C]/5 to-[#e55a43]/5">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#071B1E] uppercase tracking-wider" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>{t('colUser')}</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#071B1E] uppercase tracking-wider" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{t('colContact')}</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#071B1E] uppercase tracking-wider" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>{t('colDossiers')}</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#071B1E] uppercase tracking-wider" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h6m-6 0l-3 3m3-3l3 3m-3-3v10a2 2 0 002 2h4a2 2 0 002-2V7" />
                    </svg>
                    <span>{t('colRegistered')}</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#071B1E] uppercase tracking-wider" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{t('colActions')}</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user, index) => (
                <tr key={user.id} className={`hover:bg-gradient-to-r hover:from-[#F66B4C]/5 hover:to-[#e55a43]/5 transition-all duration-300 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                  <td className="px-6 py-6 whitespace-nowrap">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#F66B4C] to-[#e55a43] rounded-2xl flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-lg" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                            {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-[#071B1E]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                          {user.name || 'Non renseigné'}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center space-x-2" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">ID: #{user.id}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-[#071B1E] font-medium" style={{ fontFamily: 'Satoshi, sans-serif' }}>{user.email}</span>
                      </div>
                      {user.phone && (
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span className="text-gray-600" style={{ fontFamily: 'Satoshi, sans-serif' }}>{user.phone}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap">
                    <div className="flex space-x-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#F66B4C]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                          {user._count.companyDossiers}
                        </div>
                        <div className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                          {t('company')}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#e55a43]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                          {user._count.tourismDossiers}
                        </div>
                        <div className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                          {t('tourism')}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h6m-6 0l-3 3m3-3l3 3m-3-3v10a2 2 0 002 2h4a2 2 0 002-2V7" />
                      </svg>
                      <span className="text-[#071B1E] font-medium" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                        {new Date(user.createdAt).toLocaleDateString('en-US')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleUserClick(user)}
                        className="p-2 text-[#F66B4C] hover:text-white hover:bg-[#F66B4C] rounded-xl transition-all duration-300 hover:scale-110"
                        title={t('detailsTitle')}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleEditUser(user)}
                        className="p-2 text-blue-600 hover:text-white hover:bg-blue-600 rounded-xl transition-all duration-300 hover:scale-110"
                        title={t('editTitle')}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user)}
                        className="p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-xl transition-all duration-300 hover:scale-110"
                        title={t('delete')}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 flex items-center justify-between border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-700" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                <span className="font-semibold text-[#071B1E]">{t('pageXofY', { current: currentPage, total: totalPages })}</span>
              </div>
              <div className="text-sm text-gray-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                {t('totalUsers', { total: totalUsers })}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm border border-gray-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:border-[#F66B4C] hover:text-[#F66B4C] transition-all duration-300 flex items-center space-x-2"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
                <span>{t('first')}</span>
              </button>
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm border border-gray-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:border-[#F66B4C] hover:text-[#F66B4C] transition-all duration-300 flex items-center space-x-2"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>{t('prev')}</span>
              </button>
              
              {/* Page numbers */}
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-4 py-2 text-sm rounded-xl transition-all duration-300 font-semibold ${
                        currentPage === pageNum
                          ? 'bg-gradient-to-r from-[#F66B4C] to-[#e55a43] text-white shadow-lg'
                          : 'border border-gray-300 hover:bg-white hover:border-[#F66B4C] hover:text-[#F66B4C]'
                      }`}
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm border border-gray-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:border-[#F66B4C] hover:text-[#F66B4C] transition-all duration-300 flex items-center space-x-2"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                <span>{t('next')}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm border border-gray-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:border-[#F66B4C] hover:text-[#F66B4C] transition-all duration-300 flex items-center space-x-2"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                <span>{t('last')}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {showUserDetails && selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 
                  className="text-2xl font-bold text-[#071B1E]"
                  style={{ fontFamily: '"Gascogne Serial", serif' }}
                >
                  {t('detailsTitle')}
                </h3>
                <button
                  onClick={() => setShowUserDetails(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {loadingDetails ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-8 h-8 border-4 border-[#F66B4C]/30 border-t-[#F66B4C] rounded-full animate-spin"></div>
                </div>
              ) : userDetails ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                        {t('fullName')}
                      </label>
                      <p className="text-lg text-[#071B1E]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                        {userDetails.name || '—'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                        {t('email')}
                      </label>
                      <p className="text-lg text-[#071B1E]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                        {userDetails.email}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                        {t('phone')}
                      </label>
                      <p className="text-lg text-[#071B1E]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                        {userDetails.phone || 'Non renseigné'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                        {t('registeredAt')}
                      </label>
                      <p className="text-lg text-[#071B1E]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                        {new Date(userDetails.createdAt).toLocaleDateString('en-US')}
                      </p>
                    </div>
                  </div>
                  
                  {userDetails.companyDossiers && userDetails.companyDossiers.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-[#071B1E] mb-4" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                        {t('companyDossiers')}
                      </h4>
                      <div className="space-y-2">
                        {userDetails.companyDossiers.map((dossier: any) => (
                          <div key={dossier.id} className="p-4 bg-gray-50 rounded-2xl">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium text-[#071B1E]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                                  Dossier #{dossier.id}
                                </p>
                                <p className="text-sm text-gray-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                                  {t('stepStatus', { step: dossier.currentStep, status: dossier.status })}
                                </p>
                              </div>
                              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                dossier.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                dossier.status === 'PAID' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`} style={{ fontFamily: 'Satoshi, sans-serif' }}>
                                {dossier.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {userDetails.tourismDossiers && userDetails.tourismDossiers.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-[#071B1E] mb-4" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                        {t('tourismDossiers')}
                      </h4>
                      <div className="space-y-2">
                        {userDetails.tourismDossiers.map((dossier: any) => (
                          <div key={dossier.id} className="p-4 bg-gray-50 rounded-2xl">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium text-[#071B1E]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                                  Dossier #{dossier.id}
                                </p>
                                <p className="text-sm text-gray-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                                  {t('stepStatus', { step: dossier.currentStep, status: dossier.status })}
                                </p>
                              </div>
                              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                dossier.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                dossier.status === 'PAID' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`} style={{ fontFamily: 'Satoshi, sans-serif' }}>
                                {dossier.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('detailsError')}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 
                  className="text-2xl font-bold text-[#071B1E]"
                  style={{ fontFamily: '"Gascogne Serial", serif' }}
                >
                  {t('editTitle')}
                </h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <form onSubmit={handleUpdateUser} className="p-6 space-y-4">
              <div>
                <label 
                  className="block text-sm font-medium text-[#071B1E] mb-2"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  {t('fullName')}
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#F66B4C] focus:border-transparent"
                  placeholder={t('namePh')}
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                />
              </div>

              <div>
                <label 
                  className="block text-sm font-medium text-[#071B1E] mb-2"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  {t('email')}
                </label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#F66B4C] focus:border-transparent"
                  placeholder={t('emailPh')}
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                />
              </div>

              <div>
                <label 
                  className="block text-sm font-medium text-[#071B1E] mb-2"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  {t('phone')}
                </label>
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#F66B4C] focus:border-transparent"
                  placeholder={t('phonePh')}
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-colors"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#F66B4C] to-[#e55a43] text-white rounded-2xl hover:from-[#e55a43] hover:to-[#d14a3a] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  {updating ? t('updating') : t('update')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete User Modal */}
      {showDeleteModal && userToDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 
                  className="text-2xl font-bold text-[#071B1E]"
                  style={{ fontFamily: '"Gascogne Serial", serif' }}
                >
                  {t('deleteTitle')}
                </h3>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <p 
                className="text-gray-600 mb-6"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                {t('deleteConfirm', { name: userToDelete.name || userToDelete.email })}
              </p>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-colors"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  {t('cancel')}
                </button>
                <button
                  onClick={confirmDeleteUser}
                  disabled={deleting}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-2xl hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  {deleting ? t('deleting') : t('delete')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 
                  className="text-2xl font-bold text-[#071B1E]"
                  style={{ fontFamily: '"Gascogne Serial", serif' }}
                >
                  {t('createTitle')}
                </h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label 
                    className="block text-sm font-medium text-[#071B1E] mb-2"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    {t('nameReq')}
                  </label>
                  <input
                    type="text"
                    value={createForm.name}
                    onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#F66B4C] focus:border-transparent"
                    placeholder={t('namePh')}
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  />
                </div>

                <div>
                  <label 
                    className="block text-sm font-medium text-[#071B1E] mb-2"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    {t('emailReq')}
                  </label>
                  <input
                    type="email"
                    value={createForm.email}
                    onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#F66B4C] focus:border-transparent"
                    placeholder={t('emailPh')}
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  />
                </div>

                <div>
                  <label 
                    className="block text-sm font-medium text-[#071B1E] mb-2"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    {t('phone')}
                  </label>
                  <input
                    type="tel"
                    value={createForm.phone}
                    onChange={(e) => setCreateForm({ ...createForm, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#F66B4C] focus:border-transparent"
                    placeholder={t('phonePh')}
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  />
                </div>

                <div>
                  <label 
                    className="block text-sm font-medium text-[#071B1E] mb-2"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    {t('passwordReq')}
                  </label>
                  <input
                    type="password"
                    value={createForm.password}
                    onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#F66B4C] focus:border-transparent"
                    placeholder={t('passwordPh')}
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  />
                </div>
              </div>
              
              <div className="flex space-x-4 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-colors"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  {t('cancel')}
                </button>
                <button
                  onClick={createUser}
                  disabled={creating}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#F66B4C] to-[#e55a43] text-white rounded-2xl hover:from-[#e55a43] hover:to-[#d14a3a] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  {creating ? t('creating') : t('create')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}