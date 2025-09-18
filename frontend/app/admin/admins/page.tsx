'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AdminLayout } from '../components/AdminLayout';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';

interface Admin {
  id: number;
  name: string | null;
  email: string;
  phone: string | null;
  createdAt: string;
  role: string;
}

export default function AdminAdmins() {
  const router = useRouter();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateAdmin, setShowCreateAdmin] = useState(false);
  const [adminForm, setAdminForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [creatingAdmin, setCreatingAdmin] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.replace('/admin/login');
      return;
    }

    fetchAdmins();
  }, [router]);

  const fetchAdmins = async () => {
    const token = localStorage.getItem('adminToken');
    setLoading(true);
    
    try {
      const res = await fetch(`${API}/admin/admins`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!res.ok) {
        throw new Error('Unauthorized');
      }
      
      const data = await res.json();
      setAdmins(data);
    } catch (err) {
      localStorage.removeItem('adminToken');
      router.replace('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const createAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingAdmin(true);

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API}/admin/create-admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(adminForm)
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Erreur lors de la création de l\'administrateur');
      }

      // Reset form and close modal
      setAdminForm({ name: '', email: '', phone: '', password: '' });
      setShowCreateAdmin(false);
      
      // Refresh the list
      fetchAdmins();
      
      // Show success message
      alert('Administrateur créé avec succès!');
    } catch (err) {
      console.error('Error creating admin:', err);
      alert(err instanceof Error ? err.message : 'Erreur lors de la création de l\'administrateur');
    } finally {
      setCreatingAdmin(false);
    }
  };

  const handleEditAdmin = (admin: Admin) => {
    setEditForm({
      name: admin.name || '',
      email: admin.email,
      phone: admin.phone || ''
    });
    setSelectedAdmin(admin);
    setShowEditModal(true);
  };

  const handleUpdateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAdmin) return;

    setUpdating(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API}/admin/admins/${selectedAdmin.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editForm)
      });

      if (res.ok) {
        setShowEditModal(false);
        fetchAdmins(); // Refresh the list
        alert('Administrateur mis à jour avec succès!');
      } else {
        const error = await res.json();
        alert(error.message || 'Erreur lors de la mise à jour');
      }
    } catch (err) {
      console.error('Error updating admin:', err);
      alert('Erreur lors de la mise à jour');
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteAdmin = (admin: Admin) => {
    setSelectedAdmin(admin);
    setShowDeleteModal(true);
  };

  const confirmDeleteAdmin = async () => {
    if (!selectedAdmin) return;

    setDeleting(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API}/admin/admins/${selectedAdmin.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        setShowDeleteModal(false);
        setSelectedAdmin(null);
        fetchAdmins(); // Refresh the list
        alert('Administrateur supprimé avec succès!');
      } else {
        const error = await res.json();
        alert(error.message || 'Erreur lors de la suppression');
      }
    } catch (err) {
      console.error('Error deleting admin:', err);
      alert('Erreur lors de la suppression');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#F66B4C]/30 border-t-[#F66B4C] rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#071B1E]" style={{ fontFamily: 'Satoshi, sans-serif' }}>Chargement des administrateurs...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Admins table */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="flex items-center justify-between">
            <h3 
              className="text-lg font-semibold text-[#071B1E] flex items-center space-x-2"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              <svg className="w-5 h-5 text-[#F66B4C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Liste des Administrateurs</span>
            </h3>
            <button
              onClick={() => setShowCreateAdmin(true)}
              className="px-6 py-3 bg-gradient-to-r from-[#F66B4C] to-[#e55a43] text-white rounded-2xl hover:from-[#e55a43] hover:to-[#d14a3a] transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105 transform"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="font-semibold">Nouvel Administrateur</span>
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
                    <span>Administrateur</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#071B1E] uppercase tracking-wider" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Contact</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#071B1E] uppercase tracking-wider" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Rôle</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#071B1E] uppercase tracking-wider" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h6m-6 0l-3 3m3-3l3 3m-3-3v10a2 2 0 002 2h4a2 2 0 002-2V7" />
                    </svg>
                    <span>Création</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#071B1E] uppercase tracking-wider" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Actions</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {admins.map((admin, index) => (
                <tr key={admin.id} className={`hover:bg-gradient-to-r hover:from-[#F66B4C]/5 hover:to-[#e55a43]/5 transition-all duration-300 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                  <td className="px-6 py-6 whitespace-nowrap">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#F66B4C] to-[#e55a43] rounded-2xl flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-lg" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                            {admin.name ? admin.name.charAt(0).toUpperCase() : admin.email.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-[#071B1E]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                          {admin.name || 'Non renseigné'}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center space-x-2" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">ID: #{admin.id}</span>
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
                        <span className="text-[#071B1E] font-medium" style={{ fontFamily: 'Satoshi, sans-serif' }}>{admin.email}</span>
                      </div>
                      {admin.phone && (
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span className="text-gray-600" style={{ fontFamily: 'Satoshi, sans-serif' }}>{admin.phone}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-green-100 to-green-200 text-green-800" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      {admin.role}
                    </span>
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h6m-6 0l-3 3m3-3l3 3m-3-3v10a2 2 0 002 2h4a2 2 0 002-2V7" />
                      </svg>
                      <span className="text-[#071B1E] font-medium" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                        {new Date(admin.createdAt).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditAdmin(admin)}
                        className="p-2 text-blue-600 hover:text-white hover:bg-blue-600 rounded-xl transition-all duration-300 hover:scale-110"
                        title="Modifier"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteAdmin(admin)}
                        className="p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-xl transition-all duration-300 hover:scale-110"
                        title="Supprimer"
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
      </div>

      {/* Create Admin Modal */}
      {showCreateAdmin && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 
                  className="text-2xl font-bold text-[#071B1E]"
                  style={{ fontFamily: '"Gascogne Serial", serif' }}
                >
                  Créer un administrateur
                </h3>
                <button
                  onClick={() => setShowCreateAdmin(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <form onSubmit={createAdmin} className="p-6 space-y-4">
              <div>
                <label 
                  className="block text-sm font-medium text-[#071B1E] mb-2"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  Nom complet *
                </label>
                <input
                  type="text"
                  required
                  value={adminForm.name}
                  onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#F66B4C] focus:border-transparent"
                  placeholder="Nom de l'administrateur"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                />
              </div>

              <div>
                <label 
                  className="block text-sm font-medium text-[#071B1E] mb-2"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={adminForm.email}
                  onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#F66B4C] focus:border-transparent"
                  placeholder="admin@formalitys.ma"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                />
              </div>

              <div>
                <label 
                  className="block text-sm font-medium text-[#071B1E] mb-2"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={adminForm.phone}
                  onChange={(e) => setAdminForm({ ...adminForm, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#F66B4C] focus:border-transparent"
                  placeholder="+212 6XX XXX XXX"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                />
              </div>

              <div>
                <label 
                  className="block text-sm font-medium text-[#071B1E] mb-2"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  Mot de passe *
                </label>
                <input
                  type="password"
                  required
                  value={adminForm.password}
                  onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#F66B4C] focus:border-transparent"
                  placeholder="Mot de passe sécurisé"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateAdmin(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-colors"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={creatingAdmin}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#F66B4C] to-[#e55a43] text-white rounded-2xl hover:from-[#e55a43] hover:to-[#d14a3a] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  {creatingAdmin ? 'Création...' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Admin Modal */}
      {showEditModal && selectedAdmin && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 
                  className="text-2xl font-bold text-[#071B1E]"
                  style={{ fontFamily: '"Gascogne Serial", serif' }}
                >
                  Modifier l'administrateur
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
            
            <form onSubmit={handleUpdateAdmin} className="p-6 space-y-4">
              <div>
                <label 
                  className="block text-sm font-medium text-[#071B1E] mb-2"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  Nom complet
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#F66B4C] focus:border-transparent"
                  placeholder="Nom de l'administrateur"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                />
              </div>

              <div>
                <label 
                  className="block text-sm font-medium text-[#071B1E] mb-2"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  Email
                </label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#F66B4C] focus:border-transparent"
                  placeholder="admin@formalitys.ma"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                />
              </div>

              <div>
                <label 
                  className="block text-sm font-medium text-[#071B1E] mb-2"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#F66B4C] focus:border-transparent"
                  placeholder="+212 6XX XXX XXX"
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
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#F66B4C] to-[#e55a43] text-white rounded-2xl hover:from-[#e55a43] hover:to-[#d14a3a] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  {updating ? 'Mise à jour...' : 'Mettre à jour'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Admin Modal */}
      {showDeleteModal && selectedAdmin && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 
                  className="text-2xl font-bold text-[#071B1E]"
                  style={{ fontFamily: '"Gascogne Serial", serif' }}
                >
                  Supprimer l'administrateur
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
              <div className="flex items-start space-x-3 mb-6">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div>
                  <h5 
                    className="text-lg font-semibold text-red-800 mb-2"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    Attention
                  </h5>
                  <p 
                    className="text-sm text-red-700"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    Cette action est irréversible. L'administrateur sera définitivement supprimé. Vous ne pouvez pas supprimer le dernier administrateur du système.
                  </p>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-colors"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  Annuler
                </button>
                <button
                  onClick={confirmDeleteAdmin}
                  disabled={deleting}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-2xl hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  {deleting ? 'Suppression...' : 'Supprimer'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}