import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Trash2, Edit3, Save, X, RefreshCw, ArrowLeft, Shield, CheckCircle2,
  LogOut, Lock, User, AlertCircle, KeyRound, Upload, Image as ImageIcon,
  Sun, Moon, Layers, Users, FolderKanban, MessageSquareQuote, ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  getServices, createService, updateService, deleteService,
  getTeam, createTeamMember, updateTeamMember, deleteTeamMember,
  getProjects, createProject, updateProject, deleteProject,
  getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial,
  loginAdmin, getAdminProfile, logoutAdmin, getStoredAdminUser, AdminUser,
  uploadImage
} from '../../services/api';
import { Service, TeamMember, Project, Testimonial } from '../../types';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'services' | 'team' | 'projects' | 'testimonials'>('services');
  const [isDark, setIsDark] = useState(true);

  // Data Collections
  const [services, setServices] = useState<Service[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState('');

  // Auth State
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(getStoredAdminUser());
  const [authLoading, setAuthLoading] = useState(true);
  const [loginEmail, setLoginEmail] = useState('admin@qorvex.com');
  const [loginPassword, setLoginPassword] = useState('admin123456');
  const [authError, setAuthError] = useState('');
  const [submittingAuth, setSubmittingAuth] = useState(false);

  // Editing State Modals
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [editingTeam, setEditingTeam] = useState<Partial<TeamMember> | null>(null);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<Testimonial> | null>(null);

  // Image Uploading State
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadNotice, setUploadNotice] = useState('');

  // Theme Sync on Mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('qorvex_theme');
    const initialDark = savedTheme ? savedTheme === 'dark' : true;
    setIsDark(initialDark);
    if (initialDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    localStorage.setItem('qorvex_theme', nextDark ? 'dark' : 'light');
    if (nextDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const checkAuthAndLoad = async () => {
    setAuthLoading(true);
    try {
      const profile = await getAdminProfile();
      if (profile) {
        setCurrentUser(profile);
      } else {
        const stored = getStoredAdminUser();
        if (stored) setCurrentUser(stored);
      }
    } catch {
      // Ignore auth error, user will see login form
    } finally {
      setAuthLoading(false);
    }
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [sData, tData, pData, testData] = await Promise.all([
        getServices(), getTeam(), getProjects(), getTestimonials()
      ]);
      setServices(sData);
      setTeam(tData);
      setProjects(pData);
      setTestimonials(testData);
    } catch (err: any) {
      setStatusMsg('Error fetching data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthAndLoad();
    loadAllData();
  }, []);

  const flashStatus = (msg: string) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(''), 4000);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setSubmittingAuth(true);

    try {
      const user = await loginAdmin(loginEmail, loginPassword);
      setCurrentUser(user);
      flashStatus(`Welcome back, ${user.name}!`);
      loadAllData();
    } catch (err: any) {
      setAuthError(err.message || 'Invalid admin credentials');
    } finally {
      setSubmittingAuth(false);
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setCurrentUser(null);
    flashStatus('Logged out successfully.');
  };

  // Direct Image Upload Handler (Cloudinary with Fallback)
  const handleImageFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccessUrl: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setUploadNotice('');

    try {
      const res = await uploadImage(file);
      onSuccessUrl(res.url);
      if (res.provider === 'cloudinary') {
        setUploadNotice('✓ Uploaded directly to Cloudinary!');
      } else {
        setUploadNotice('✓ Image processed and linked!');
      }
      setTimeout(() => setUploadNotice(''), 4000);
    } catch (err: any) {
      alert('Image upload failed: ' + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  // Service CRUD Handlers
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService?.title || !editingService?.shortDescription) return;

    try {
      if (editingService._id) {
        await updateService(editingService._id, editingService);
        flashStatus('✓ Service updated successfully in MongoDB Atlas!');
      } else {
        await createService(editingService);
        flashStatus('✓ New Service created successfully in MongoDB Atlas!');
      }
      setEditingService(null);
      loadAllData();
    } catch (err: any) {
      flashStatus('Failed to save service: ' + err.message);
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!window.confirm('Delete this service/skill?')) return;
    try {
      await deleteService(id);
      flashStatus('✓ Service deleted.');
      loadAllData();
    } catch (err: any) {
      flashStatus('Delete failed: ' + err.message);
    }
  };

  // Team CRUD Handlers
  const handleSaveTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeam?.name || !editingTeam?.role) return;

    try {
      if (editingTeam._id) {
        await updateTeamMember(editingTeam._id, editingTeam);
        flashStatus('✓ Team Profile updated successfully in MongoDB Atlas!');
      } else {
        await createTeamMember(editingTeam);
        flashStatus('✓ New Team Profile added to MongoDB Atlas!');
      }
      setEditingTeam(null);
      loadAllData();
    } catch (err: any) {
      flashStatus('Failed to save team member: ' + err.message);
    }
  };

  const handleDeleteTeam = async (id: string) => {
    if (!window.confirm('Delete this team profile?')) return;
    try {
      await deleteTeamMember(id);
      flashStatus('✓ Team profile deleted.');
      loadAllData();
    } catch (err: any) {
      flashStatus('Delete failed: ' + err.message);
    }
  };

  // Project CRUD Handlers
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title || !editingProject?.client) return;

    try {
      const payload = {
        ...editingProject,
        problem: editingProject.problem || 'Standard problem definition',
        approach: editingProject.approach || 'Technical solution & execution',
        result: editingProject.result || 'Performance and user impact'
      };

      if (editingProject._id) {
        await updateProject(editingProject._id, payload);
        flashStatus('✓ Project Showcase updated in MongoDB Atlas!');
      } else {
        await createProject(payload);
        flashStatus('✓ New Project Showcase created in MongoDB Atlas!');
      }
      setEditingProject(null);
      loadAllData();
    } catch (err: any) {
      flashStatus('Failed to save project: ' + err.message);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm('Delete this project showcase?')) return;
    try {
      await deleteProject(id);
      flashStatus('✓ Project deleted.');
      loadAllData();
    } catch (err: any) {
      flashStatus('Delete failed: ' + err.message);
    }
  };

  // Testimonial CRUD Handlers
  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial?.quote || !editingTestimonial?.author) return;

    try {
      if (editingTestimonial._id) {
        await updateTestimonial(editingTestimonial._id, editingTestimonial);
        flashStatus('✓ Client Testimonial updated in MongoDB Atlas!');
      } else {
        await createTestimonial(editingTestimonial);
        flashStatus('✓ New Client Testimonial added to MongoDB Atlas!');
      }
      setEditingTestimonial(null);
      loadAllData();
    } catch (err: any) {
      flashStatus('Failed to save testimonial: ' + err.message);
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await deleteTestimonial(id);
      flashStatus('✓ Testimonial deleted.');
      loadAllData();
    } catch (err: any) {
      flashStatus('Delete failed: ' + err.message);
    }
  };

  // High Contrast Form Input Class
  const formInputClass = "w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-950 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 font-bold text-sm focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-500/20 transition-all";
  const modalInputClass = "w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-950 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 font-bold text-sm focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-500/20 transition-all";

  // If not authenticated, render Login Screen
  if (!authLoading && !currentUser) {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-[#0B111E] text-slate-900 dark:text-white p-4 sm:p-8 pt-28 font-body flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-300">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="w-full max-w-md bg-white dark:bg-[#152436] border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex p-4 rounded-2xl bg-violet-600 text-white shadow-lg mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-extrabold text-2xl text-slate-950 dark:text-white">Admin CMS Portal</h1>
            <p className="text-xs font-mono text-slate-600 dark:text-slate-400 font-semibold mt-1">
              MongoDB Atlas Authenticated Gateway
            </p>
          </div>

          {authError && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/40 text-red-700 dark:text-red-400 text-xs font-mono flex items-center gap-2 font-bold">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600 dark:text-red-400" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-mono text-slate-900 dark:text-slate-200 block mb-1.5 flex items-center gap-1.5 font-extrabold">
                <User className="w-4 h-4 text-violet-600 dark:text-electric-cyan" />
                ADMIN EMAIL
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@qorvex.com"
                className={formInputClass}
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-900 dark:text-slate-200 block mb-1.5 flex items-center gap-1.5 font-extrabold">
                <Lock className="w-4 h-4 text-violet-600 dark:text-electric-violet" />
                ADMIN PASSWORD
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••••••"
                className={formInputClass}
              />
            </div>

            <button
              type="submit"
              disabled={submittingAuth}
              className="w-full py-4 rounded-xl bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white font-mono text-xs font-black tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              {submittingAuth ? (
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
              ) : (
                <>
                  <KeyRound className="w-4 h-4 text-white" />
                  <span className="text-white font-black">AUTHENTICATE & LOG IN</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Credential Preset Helper */}
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 text-center">
            <div className="text-[11px] font-mono text-slate-600 dark:text-slate-400 mb-2 font-extrabold">DEFAULT ADMIN CREDENTIALS</div>
            <button
              type="button"
              onClick={() => {
                setLoginEmail('admin@qorvex.com');
                setLoginPassword('admin123456');
              }}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-violet-700 dark:text-violet-300 font-mono text-xs font-extrabold hover:underline inline-flex items-center gap-1 shadow-sm"
            >
              <span>admin@qorvex.com • admin123456 (Fill)</span>
            </button>
          </div>

          <div className="mt-6 text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-violet-600 font-bold">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B111E] text-slate-900 dark:text-white p-4 sm:p-8 pt-24 font-body transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation Back, Title & Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-xs font-mono text-violet-600 dark:text-electric-cyan hover:underline font-bold mb-2">
              <ArrowLeft className="w-4 h-4" />
              <span>RETURN TO PUBLIC WEBSITE</span>
            </Link>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-950 dark:text-white flex items-center gap-3">
              <Shield className="w-8 h-8 text-violet-600 dark:text-electric-violet" />
              <span>Qorvex Studio Admin CMS</span>
            </h1>
            <p className="text-xs font-mono text-slate-600 dark:text-slate-400 font-medium">
              MongoDB Atlas & Cloudinary Direct Sync Engine
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-3">
            {/* Dark/Light Mode Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-white dark:bg-[#152436] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-electric-cyan hover:border-violet-600 transition-all shadow-sm flex items-center gap-2"
              title="Toggle Light / Dark Admin Interface"
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-mono font-bold hidden sm:inline">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-slate-800" />
                  <span className="text-xs font-mono font-bold hidden sm:inline">Dark Mode</span>
                </>
              )}
            </button>

            {/* Authenticated Admin Profile Pill */}
            {currentUser && (
              <div className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#152436] border border-slate-300 dark:border-slate-700 text-xs font-mono flex items-center gap-2 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-950 dark:text-white font-bold">{currentUser.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-violet-600/20 text-violet-700 dark:text-electric-violet font-extrabold uppercase">
                  {currentUser.role}
                </span>
              </div>
            )}

            <button
              onClick={loadAllData}
              className="p-2.5 rounded-xl bg-white dark:bg-[#152436] border border-slate-300 dark:border-slate-700 hover:border-violet-600 text-slate-800 dark:text-slate-200 font-mono text-xs flex items-center gap-2 shadow-sm font-bold"
              title="Refresh MongoDB API Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh API</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 hover:border-red-500 text-red-600 dark:text-red-400 font-mono text-xs flex items-center gap-2 shadow-sm font-bold"
              title="Logout from Admin CMS"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Status Notification Toast */}
        {statusMsg && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500 text-emerald-800 dark:text-emerald-300 font-mono text-xs flex items-center gap-2 font-extrabold">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{statusMsg}</span>
          </div>
        )}

        {/* CMS Tabs */}
        <div className="flex flex-wrap gap-3 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
          <button
            onClick={() => setActiveTab('services')}
            className={`px-5 py-3 rounded-xl font-mono text-xs tracking-wider font-extrabold transition-all flex items-center gap-2 ${
              activeTab === 'services'
                ? 'bg-violet-600 text-white shadow-lg'
                : 'bg-white dark:bg-[#152436] text-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:border-violet-600'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>SERVICES & SKILLS ({services.length})</span>
          </button>
          
          <button
            onClick={() => setActiveTab('team')}
            className={`px-5 py-3 rounded-xl font-mono text-xs tracking-wider font-extrabold transition-all flex items-center gap-2 ${
              activeTab === 'team'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white dark:bg-[#152436] text-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:border-purple-600'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>TEAM PROFILES ({team.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-5 py-3 rounded-xl font-mono text-xs tracking-wider font-extrabold transition-all flex items-center gap-2 ${
              activeTab === 'projects'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-white dark:bg-[#152436] text-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:border-emerald-600'
            }`}
          >
            <FolderKanban className="w-4 h-4" />
            <span>PROJECT SHOWCASE ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('testimonials')}
            className={`px-5 py-3 rounded-xl font-mono text-xs tracking-wider font-extrabold transition-all flex items-center gap-2 ${
              activeTab === 'testimonials'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-white dark:bg-[#152436] text-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:border-amber-500'
            }`}
          >
            <MessageSquareQuote className="w-4 h-4" />
            <span>TESTIMONIALS ({testimonials.length})</span>
          </button>
        </div>

        {/* SERVICES MANAGEMENT */}
        {activeTab === 'services' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display text-xl font-extrabold text-slate-950 dark:text-white">Services & Skills List</h2>
              <button
                onClick={() => setEditingService({
                  title: '',
                  slug: '',
                  shortDescription: '',
                  fullDescription: '',
                  iconMesh: 'cube',
                  techStack: ['React', 'TypeScript'],
                  deliverables: ['Custom Solution'],
                  order: services.length + 1
                })}
                className="px-4 py-2.5 rounded-xl bg-violet-600 text-white font-bold text-xs font-mono flex items-center gap-2 hover:bg-violet-700 transition-colors shadow-md cursor-pointer"
              >
                <Plus className="w-4 h-4 text-white" />
                <span className="text-white">ADD NEW SERVICE</span>
              </button>
            </div>

            <div className="space-y-4">
              {services.map((s) => (
                <div key={s._id} className="p-6 rounded-2xl bg-white dark:bg-[#152436] border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-violet-600 dark:text-electric-cyan font-extrabold">[{s.iconMesh.toUpperCase()}]</span>
                      <h3 className="font-display font-extrabold text-lg text-slate-950 dark:text-white">{s.title}</h3>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 font-medium">{s.shortDescription}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {s.techStack.map(t => (
                        <span key={t} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-[10px] font-mono text-slate-800 dark:text-slate-200 font-bold border border-slate-200 dark:border-slate-800">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setEditingService(s)}
                      className="p-2.5 rounded-xl bg-violet-100 dark:bg-slate-800 text-violet-700 dark:text-electric-cyan hover:bg-violet-600 hover:text-white transition-all"
                      title="Edit Service"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteService(s._id)}
                      className="p-2.5 rounded-xl bg-red-100 dark:bg-slate-800 text-red-700 dark:text-red-400 hover:bg-red-600 hover:text-white transition-all"
                      title="Delete Service"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TEAM MANAGEMENT */}
        {activeTab === 'team' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display text-xl font-extrabold text-slate-950 dark:text-white">Team Member Profiles</h2>
              <button
                onClick={() => setEditingTeam({
                  name: '',
                  role: '',
                  pillar: 'Core',
                  bio: '',
                  philosophy: '',
                  photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
                  socials: { github: '', linkedin: '', twitter: '' },
                  order: team.length + 1
                })}
                className="px-4 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs font-mono flex items-center gap-2 hover:bg-purple-700 transition-colors shadow-md cursor-pointer"
              >
                <Plus className="w-4 h-4 text-white" />
                <span className="text-white">ADD TEAM PROFILE</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {team.map((t) => (
                <div key={t._id} className="p-6 rounded-2xl bg-white dark:bg-[#152436] border border-slate-200 dark:border-slate-800 flex items-start gap-4 shadow-sm">
                  <img src={t.photoUrl} alt={t.name} className="w-16 h-16 rounded-xl object-cover border border-slate-300 dark:border-slate-700 shrink-0" />
                  <div className="flex-1">
                    <div className="font-mono text-[10px] text-purple-600 dark:text-electric-cyan font-extrabold uppercase">{t.pillar} PILLAR</div>
                    <h3 className="font-display font-extrabold text-lg text-slate-950 dark:text-white">{t.name}</h3>
                    <div className="text-xs text-slate-700 dark:text-slate-300 font-bold">{t.role}</div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 italic mt-2">"{t.philosophy}"</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => setEditingTeam(t)}
                      className="p-2 rounded-xl bg-purple-100 dark:bg-slate-800 text-purple-700 dark:text-electric-cyan hover:bg-purple-600 hover:text-white transition-all"
                      title="Edit Profile"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteTeam(t._id)}
                      className="p-2 rounded-xl bg-red-100 dark:bg-slate-800 text-red-700 dark:text-red-400 hover:bg-red-600 hover:text-white transition-all"
                      title="Delete Profile"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROJECTS MANAGEMENT */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display text-xl font-extrabold text-slate-950 dark:text-white">Selected Projects & Case Studies</h2>
              <button
                onClick={() => setEditingProject({
                  title: '',
                  slug: '',
                  client: '',
                  category: 'Software & Web UI',
                  summary: '',
                  problem: '',
                  approach: '',
                  result: '',
                  metrics: [{ label: 'Render Speed', value: '< 10ms' }],
                  imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
                  tags: ['React', 'TypeScript', 'Node.js'],
                  liveUrl: 'https://example.com',
                  featured: true,
                  order: projects.length + 1
                })}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs font-mono flex items-center gap-2 hover:bg-emerald-700 transition-colors shadow-md cursor-pointer"
              >
                <Plus className="w-4 h-4 text-white" />
                <span className="text-white">ADD NEW PROJECT</span>
              </button>
            </div>

            <div className="space-y-4">
              {projects.map((p) => (
                <div key={p._id} className="p-6 rounded-2xl bg-white dark:bg-[#152436] border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
                  <div className="flex items-start gap-4">
                    <img src={p.imageUrl} alt={p.title} className="w-24 h-16 rounded-xl object-cover border border-slate-300 dark:border-slate-700 shrink-0" />
                    <div>
                      <div className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-extrabold uppercase">{p.category} • {p.client}</div>
                      <h3 className="font-display font-extrabold text-lg text-slate-950 dark:text-white">{p.title}</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">{p.summary}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setEditingProject(p)}
                      className="p-2.5 rounded-xl bg-emerald-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all"
                      title="Edit Project"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(p._id)}
                      className="p-2.5 rounded-xl bg-red-100 dark:bg-slate-800 text-red-700 dark:text-red-400 hover:bg-red-600 hover:text-white transition-all"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TESTIMONIALS MANAGEMENT */}
        {activeTab === 'testimonials' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display text-xl font-extrabold text-slate-950 dark:text-white">Client Testimonials</h2>
              <button
                onClick={() => setEditingTestimonial({
                  author: '',
                  title: '',
                  company: '',
                  quote: '',
                  order: testimonials.length + 1
                })}
                className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 hover:bg-amber-600 transition-colors shadow-md cursor-pointer"
              >
                <Plus className="w-4 h-4 text-slate-950" />
                <span className="text-slate-950">ADD TESTIMONIAL</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testimonials.map((t) => (
                <div key={t._id} className="p-6 rounded-2xl bg-white dark:bg-[#152436] border border-slate-200 dark:border-slate-800 flex flex-col justify-between gap-4 shadow-sm">
                  <div>
                    <p className="text-xs text-slate-700 dark:text-slate-200 italic mb-3">"{t.quote}"</p>
                    <div className="font-display font-extrabold text-sm text-slate-950 dark:text-white">{t.author}</div>
                    <div className="text-[11px] font-mono text-slate-600 dark:text-slate-400 font-bold">{t.title}, {t.company}</div>
                  </div>

                  <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                    <button
                      onClick={() => setEditingTestimonial(t)}
                      className="p-2 rounded-xl bg-amber-100 dark:bg-slate-800 text-amber-700 dark:text-amber-400 hover:bg-amber-500 hover:text-slate-950 transition-all"
                      title="Edit Testimonial"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteTestimonial(t._id)}
                      className="p-2 rounded-xl bg-red-100 dark:bg-slate-800 text-red-700 dark:text-red-400 hover:bg-red-600 hover:text-white transition-all"
                      title="Delete Testimonial"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* SERVICE EDIT MODAL */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 dark:bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <form onSubmit={handleSaveService} className="bg-white dark:bg-[#152436] border-2 border-slate-300 dark:border-slate-700 text-slate-950 dark:text-white rounded-2xl p-6 sm:p-8 max-w-xl w-full space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-4">
              <h3 className="font-display font-extrabold text-lg text-slate-950 dark:text-white">{editingService._id ? 'Edit Service & Skill' : 'Add New Service & Skill'}</h3>
              <button type="button" onClick={() => setEditingService(null)}><X className="w-5 h-5 text-slate-500 dark:text-slate-400" /></button>
            </div>

            <div>
              <label className="text-xs font-mono text-slate-950 dark:text-slate-200 block mb-1 font-extrabold">SERVICE TITLE</label>
              <input
                type="text"
                required
                value={editingService.title || ''}
                onChange={e => setEditingService({ ...editingService, title: e.target.value })}
                className={modalInputClass}
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-950 dark:text-slate-200 block mb-1 font-extrabold">SHORT DESCRIPTION</label>
              <input
                type="text"
                required
                value={editingService.shortDescription || ''}
                onChange={e => setEditingService({ ...editingService, shortDescription: e.target.value })}
                className={modalInputClass}
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-950 dark:text-slate-200 block mb-1 font-extrabold">FULL DESCRIPTION</label>
              <textarea
                rows={3}
                required
                value={editingService.fullDescription || ''}
                onChange={e => setEditingService({ ...editingService, fullDescription: e.target.value })}
                className={`${modalInputClass} resize-none`}
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-950 dark:text-slate-200 block mb-1 font-extrabold">TECH STACK / SKILLS (comma-separated)</label>
              <input
                type="text"
                value={editingService.techStack ? editingService.techStack.join(', ') : ''}
                onChange={e => setEditingService({ ...editingService, techStack: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                className={modalInputClass}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-slate-950 dark:text-slate-200 block mb-1 font-extrabold">3D ICON MESH</label>
                <select
                  value={editingService.iconMesh || 'cube'}
                  onChange={e => setEditingService({ ...editingService, iconMesh: e.target.value as any })}
                  className={modalInputClass}
                >
                  <option value="cube" className="bg-white text-slate-950 dark:bg-slate-900 dark:text-white font-bold">Cube</option>
                  <option value="knot" className="bg-white text-slate-950 dark:bg-slate-900 dark:text-white font-bold">Torus Knot</option>
                  <option value="sphere" className="bg-white text-slate-950 dark:bg-slate-900 dark:text-white font-bold">Sphere</option>
                  <option value="wireframe" className="bg-white text-slate-950 dark:bg-slate-900 dark:text-white font-bold">Wireframe Octahedron</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-mono text-slate-950 dark:text-slate-200 block mb-1 font-extrabold">ORDER / PRIORITY</label>
                <input
                  type="number"
                  value={editingService.order || 1}
                  onChange={e => setEditingService({ ...editingService, order: Number(e.target.value) })}
                  className={modalInputClass}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button type="button" onClick={() => setEditingService(null)} className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-mono font-bold text-slate-800 dark:text-white">CANCEL</button>
              <button type="submit" className="px-5 py-2.5 rounded-xl bg-violet-600 text-white font-black text-xs font-mono cursor-pointer shadow-md">SAVE TO MONGODB</button>
            </div>
          </form>
        </div>
      )}

      {/* TEAM EDIT MODAL WITH DIRECT CLOUDINARY UPLOAD */}
      {editingTeam && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 dark:bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <form onSubmit={handleSaveTeam} className="bg-white dark:bg-[#152436] border-2 border-slate-300 dark:border-slate-700 text-slate-950 dark:text-white rounded-2xl p-6 sm:p-8 max-w-xl w-full space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-4">
              <h3 className="font-display font-extrabold text-lg text-slate-950 dark:text-white">{editingTeam._id ? 'Edit Team Profile' : 'Add Team Profile'}</h3>
              <button type="button" onClick={() => setEditingTeam(null)}><X className="w-5 h-5 text-slate-500 dark:text-slate-400" /></button>
            </div>

            {/* Direct Image Upload Box */}
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 space-y-3">
              <label className="text-xs font-mono text-purple-700 dark:text-electric-violet block font-black flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4" />
                DIRECT PHOTO UPLOAD (CLOUDINARY)
              </label>

              <div className="flex items-center gap-4">
                {editingTeam.photoUrl && (
                  <img src={editingTeam.photoUrl} alt="Preview" className="w-16 h-16 rounded-xl object-cover border border-slate-300 dark:border-slate-700 shrink-0" />
                )}
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageFileChange(e, (url) => setEditingTeam({ ...editingTeam, photoUrl: url }))}
                    className="text-xs text-slate-950 dark:text-white file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-mono file:font-bold file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer"
                  />
                  {uploadingImage && <div className="text-xs font-mono text-purple-600 dark:text-electric-cyan mt-1 flex items-center gap-1 font-bold"><RefreshCw className="w-3 h-3 animate-spin" /> Uploading image...</div>}
                  {uploadNotice && <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 mt-1 font-bold">{uploadNotice}</div>}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-700 dark:text-slate-400 block mb-1 font-bold">IMAGE URL LINK</label>
                <input
                  type="text"
                  value={editingTeam.photoUrl || ''}
                  onChange={e => setEditingTeam({ ...editingTeam, photoUrl: e.target.value })}
                  placeholder="https://..."
                  className={modalInputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-slate-950 dark:text-slate-200 block mb-1 font-extrabold">FULL NAME</label>
                <input
                  type="text"
                  required
                  value={editingTeam.name || ''}
                  onChange={e => setEditingTeam({ ...editingTeam, name: e.target.value })}
                  className={modalInputClass}
                />
              </div>
              <div>
                <label className="text-xs font-mono text-slate-950 dark:text-slate-200 block mb-1 font-extrabold">ROLE / TITLE</label>
                <input
                  type="text"
                  required
                  value={editingTeam.role || ''}
                  onChange={e => setEditingTeam({ ...editingTeam, role: e.target.value })}
                  className={modalInputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-slate-950 dark:text-slate-200 block mb-1 font-extrabold">PILLAR</label>
                <select
                  value={editingTeam.pillar || 'Core'}
                  onChange={e => setEditingTeam({ ...editingTeam, pillar: e.target.value as any })}
                  className={modalInputClass}
                >
                  <option value="Core" className="bg-white text-slate-950 dark:bg-slate-900 dark:text-white font-bold">Core</option>
                  <option value="Vision" className="bg-white text-slate-950 dark:bg-slate-900 dark:text-white font-bold">Vision</option>
                  <option value="Execution" className="bg-white text-slate-950 dark:bg-slate-900 dark:text-white font-bold">Execution</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-mono text-slate-950 dark:text-slate-200 block mb-1 font-extrabold">ORDER / PRIORITY</label>
                <input
                  type="number"
                  value={editingTeam.order || 1}
                  onChange={e => setEditingTeam({ ...editingTeam, order: Number(e.target.value) })}
                  className={modalInputClass}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-slate-950 dark:text-slate-200 block mb-1 font-extrabold">BIO / BACKGROUND</label>
              <textarea
                rows={2}
                required
                value={editingTeam.bio || ''}
                onChange={e => setEditingTeam({ ...editingTeam, bio: e.target.value })}
                className={`${modalInputClass} resize-none`}
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-950 dark:text-slate-200 block mb-1 font-extrabold">PERSONAL PHILOSOPHY QUOTE</label>
              <input
                type="text"
                required
                value={editingTeam.philosophy || ''}
                onChange={e => setEditingTeam({ ...editingTeam, philosophy: e.target.value })}
                className={modalInputClass}
              />
            </div>

            {/* Dynamic Social Media & Contact Links */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <div className="text-xs font-mono text-purple-700 dark:text-electric-violet font-extrabold uppercase">
                DYNAMIC SOCIAL MEDIA & CONTACT LINKS (Leave blank to hide on profile)
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-slate-950 dark:text-slate-200 block mb-1 font-bold">LINKEDIN URL</label>
                  <input
                    type="text"
                    value={editingTeam.socials?.linkedin || ''}
                    onChange={e => setEditingTeam({
                      ...editingTeam,
                      socials: { ...(editingTeam.socials || {}), linkedin: e.target.value }
                    })}
                    placeholder="https://linkedin.com/in/..."
                    className={modalInputClass}
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate-950 dark:text-slate-200 block mb-1 font-bold">EMAIL ADDRESS</label>
                  <input
                    type="text"
                    value={editingTeam.socials?.email || ''}
                    onChange={e => setEditingTeam({
                      ...editingTeam,
                      socials: { ...(editingTeam.socials || {}), email: e.target.value }
                    })}
                    placeholder="name@domain.com"
                    className={modalInputClass}
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate-950 dark:text-slate-200 block mb-1 font-bold">GITHUB URL</label>
                  <input
                    type="text"
                    value={editingTeam.socials?.github || ''}
                    onChange={e => setEditingTeam({
                      ...editingTeam,
                      socials: { ...(editingTeam.socials || {}), github: e.target.value }
                    })}
                    placeholder="https://github.com/..."
                    className={modalInputClass}
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate-950 dark:text-slate-200 block mb-1 font-bold">FACEBOOK URL</label>
                  <input
                    type="text"
                    value={editingTeam.socials?.facebook || ''}
                    onChange={e => setEditingTeam({
                      ...editingTeam,
                      socials: { ...(editingTeam.socials || {}), facebook: e.target.value }
                    })}
                    placeholder="https://facebook.com/..."
                    className={modalInputClass}
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate-950 dark:text-slate-200 block mb-1 font-bold">INSTAGRAM URL</label>
                  <input
                    type="text"
                    value={editingTeam.socials?.instagram || ''}
                    onChange={e => setEditingTeam({
                      ...editingTeam,
                      socials: { ...(editingTeam.socials || {}), instagram: e.target.value }
                    })}
                    placeholder="https://instagram.com/..."
                    className={modalInputClass}
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate-950 dark:text-slate-200 block mb-1 font-bold">TWITTER / X URL</label>
                  <input
                    type="text"
                    value={editingTeam.socials?.twitter || ''}
                    onChange={e => setEditingTeam({
                      ...editingTeam,
                      socials: { ...(editingTeam.socials || {}), twitter: e.target.value }
                    })}
                    placeholder="https://x.com/..."
                    className={modalInputClass}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button type="button" onClick={() => setEditingTeam(null)} className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-mono font-bold text-slate-800 dark:text-white">CANCEL</button>
              <button type="submit" className="px-5 py-2.5 rounded-xl bg-purple-600 text-white font-black text-xs font-mono cursor-pointer shadow-md">SAVE PROFILE</button>
            </div>
          </form>
        </div>
      )}

      {/* PROJECT EDIT MODAL WITH DIRECT CLOUDINARY UPLOAD */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 dark:bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <form onSubmit={handleSaveProject} className="bg-white dark:bg-[#152436] border-2 border-slate-300 dark:border-slate-700 text-slate-950 dark:text-white rounded-2xl p-6 sm:p-8 max-w-xl w-full space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-4">
              <h3 className="font-display font-extrabold text-lg text-slate-950 dark:text-white">{editingProject._id ? 'Edit Project Showcase' : 'Add Project Showcase'}</h3>
              <button type="button" onClick={() => setEditingProject(null)}><X className="w-5 h-5 text-slate-500 dark:text-slate-400" /></button>
            </div>

            {/* Direct Image Upload Box */}
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 space-y-3">
              <label className="text-xs font-mono text-emerald-600 dark:text-emerald-400 block font-black flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4" />
                PROJECT COVER IMAGE UPLOAD (CLOUDINARY)
              </label>

              <div className="flex items-center gap-4">
                {editingProject.imageUrl && (
                  <img src={editingProject.imageUrl} alt="Preview" className="w-24 h-14 rounded-xl object-cover border border-slate-300 dark:border-slate-700 shrink-0" />
                )}
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageFileChange(e, (url) => setEditingProject({ ...editingProject, imageUrl: url }))}
                    className="text-xs text-slate-950 dark:text-white file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-mono file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 cursor-pointer"
                  />
                  {uploadingImage && <div className="text-xs font-mono text-purple-600 dark:text-electric-cyan mt-1 flex items-center gap-1 font-bold"><RefreshCw className="w-3 h-3 animate-spin" /> Uploading image...</div>}
                  {uploadNotice && <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 mt-1 font-bold">{uploadNotice}</div>}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-700 dark:text-slate-400 block mb-1 font-bold">IMAGE URL LINK</label>
                <input
                  type="text"
                  value={editingProject.imageUrl || ''}
                  onChange={e => setEditingProject({ ...editingProject, imageUrl: e.target.value })}
                  placeholder="https://..."
                  className={modalInputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-slate-950 dark:text-slate-200 block mb-1 font-extrabold">PROJECT TITLE</label>
                <input
                  type="text"
                  required
                  value={editingProject.title || ''}
                  onChange={e => setEditingProject({ ...editingProject, title: e.target.value })}
                  className={modalInputClass}
                />
              </div>
              <div>
                <label className="text-xs font-mono text-slate-950 dark:text-slate-200 block mb-1 font-extrabold">CLIENT NAME</label>
                <input
                  type="text"
                  required
                  value={editingProject.client || ''}
                  onChange={e => setEditingProject({ ...editingProject, client: e.target.value })}
                  className={modalInputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-slate-950 dark:text-slate-200 block mb-1 font-extrabold">CATEGORY</label>
                <input
                  type="text"
                  value={editingProject.category || 'Software & Web UI'}
                  onChange={e => setEditingProject({ ...editingProject, category: e.target.value })}
                  className={modalInputClass}
                />
              </div>
              <div>
                <label className="text-xs font-mono text-slate-950 dark:text-slate-200 block mb-1 font-extrabold">LIVE URL</label>
                <input
                  type="text"
                  value={editingProject.liveUrl || ''}
                  onChange={e => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                  placeholder="https://..."
                  className={modalInputClass}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-slate-950 dark:text-slate-200 block mb-1 font-extrabold">EXECUTIVE SUMMARY</label>
              <textarea
                rows={2}
                required
                value={editingProject.summary || ''}
                onChange={e => setEditingProject({ ...editingProject, summary: e.target.value })}
                className={`${modalInputClass} resize-none`}
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-950 dark:text-slate-200 block mb-1 font-extrabold">TAGS (comma-separated)</label>
              <input
                type="text"
                value={editingProject.tags ? editingProject.tags.join(', ') : ''}
                onChange={e => setEditingProject({ ...editingProject, tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                className={modalInputClass}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button type="button" onClick={() => setEditingProject(null)} className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-mono font-bold text-slate-800 dark:text-white">CANCEL</button>
              <button type="submit" className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-black text-xs font-mono cursor-pointer shadow-md">SAVE PROJECT</button>
            </div>
          </form>
        </div>
      )}

      {/* TESTIMONIAL EDIT MODAL */}
      {editingTestimonial && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 dark:bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <form onSubmit={handleSaveTestimonial} className="bg-white dark:bg-[#152436] border-2 border-slate-300 dark:border-slate-700 text-slate-950 dark:text-white rounded-2xl p-6 sm:p-8 max-w-xl w-full space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-4">
              <h3 className="font-display font-extrabold text-lg text-slate-950 dark:text-white">{editingTestimonial._id ? 'Edit Client Testimonial' : 'Add Client Testimonial'}</h3>
              <button type="button" onClick={() => setEditingTestimonial(null)}><X className="w-5 h-5 text-slate-500 dark:text-slate-400" /></button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-slate-950 dark:text-slate-200 block mb-1 font-extrabold">AUTHOR NAME</label>
                <input
                  type="text"
                  required
                  value={editingTestimonial.author || ''}
                  onChange={e => setEditingTestimonial({ ...editingTestimonial, author: e.target.value })}
                  className={modalInputClass}
                />
              </div>
              <div>
                <label className="text-xs font-mono text-slate-950 dark:text-slate-200 block mb-1 font-extrabold">AUTHOR TITLE</label>
                <input
                  type="text"
                  required
                  value={editingTestimonial.title || ''}
                  onChange={e => setEditingTestimonial({ ...editingTestimonial, title: e.target.value })}
                  className={modalInputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-slate-950 dark:text-slate-200 block mb-1 font-extrabold">COMPANY NAME</label>
                <input
                  type="text"
                  required
                  value={editingTestimonial.company || ''}
                  onChange={e => setEditingTestimonial({ ...editingTestimonial, company: e.target.value })}
                  className={modalInputClass}
                />
              </div>
              <div>
                <label className="text-xs font-mono text-slate-950 dark:text-slate-200 block mb-1 font-extrabold">ORDER / PRIORITY</label>
                <input
                  type="number"
                  value={editingTestimonial.order || 1}
                  onChange={e => setEditingTestimonial({ ...editingTestimonial, order: Number(e.target.value) })}
                  className={modalInputClass}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-slate-950 dark:text-slate-200 block mb-1 font-extrabold">CLIENT QUOTE</label>
              <textarea
                rows={3}
                required
                value={editingTestimonial.quote || ''}
                onChange={e => setEditingTestimonial({ ...editingTestimonial, quote: e.target.value })}
                className={`${modalInputClass} resize-none`}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button type="button" onClick={() => setEditingTestimonial(null)} className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-mono font-bold text-slate-800 dark:text-white">CANCEL</button>
              <button type="submit" className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs font-mono cursor-pointer shadow-md">SAVE TESTIMONIAL</button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
