import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe2,
  LayoutDashboard,
  Zap,
  Ambulance,
  Bell,
  Settings,
  Menu,
  X,
} from 'lucide-react';
import { AIAssistant } from './AIAssistant';

const navItems = [
  { path: '/', icon: Globe2, label: 'Home' },
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/simulation', icon: Zap, label: 'Simulation' },
  { path: '/response', icon: Ambulance, label: 'Response' },
  { path: '/alerts', icon: Bell, label: 'Alerts' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const isMobile = window.innerWidth < 768;

  return (
    <div className="min-h-screen atmospheric-bg">
      {/* Floating particles background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: i % 3 === 0 ? 'rgba(16, 185, 129, 0.3)' : i % 3 === 1 ? 'rgba(14, 165, 233, 0.3)' : 'rgba(20, 184, 166, 0.3)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {!isLanding && (
        <>
          {/* Top Navbar */}
          <motion.header
            className="fixed top-0 left-0 right-0 z-50 glass"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 hover:bg-emerald-100 rounded-lg transition-colors"
                >
                  {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center">
                    <Globe2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold">Terra Sentinel</h1>
                    <p className="text-xs text-muted-foreground">Real-time Disaster Intelligence System</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <motion.div
                  className="px-4 py-2 rounded-full glass-card flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm">System Active</span>
                </motion.div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-emerald-400 flex items-center justify-center text-white font-semibold">
                  AI
                </div>
              </div>
            </div>
          </motion.header>

          {/* Sidebar */}
          <AnimatePresence>
            {sidebarOpen && (
              <motion.aside
                className="fixed left-0 top-20 bottom-0 z-40 w-72 glass p-4"
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              >
                <nav className="space-y-2">
                  {navItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <Link key={item.path} to={item.path}>
                        <motion.div
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                            isActive
                              ? 'bg-gradient-to-r from-emerald-500 to-sky-500 text-white shadow-lg'
                              : 'hover:bg-white/50'
                          }`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ x: 4 }}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{item.label}</span>
                        </motion.div>
                      </Link>
                    );
                  })}
                </nav>

                {/* Quick Stats */}
                <motion.div
                  className="mt-8 space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="glass-card p-4">
                    <div className="text-xs text-muted-foreground mb-1">Active Alerts</div>
                    <div className="text-2xl font-bold text-emerald-600">12</div>
                  </div>
                  <div className="glass-card p-4">
                    <div className="text-xs text-muted-foreground mb-1">Regions Monitored</div>
                    <div className="text-2xl font-bold text-sky-600">247</div>
                  </div>
                  <div className="glass-card p-4">
                    <div className="text-xs text-muted-foreground mb-1">Response Rate</div>
                    <div className="text-2xl font-bold text-teal-600">98.5%</div>
                  </div>
                </motion.div>
              </motion.aside>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Main Content */}
      <main className={isLanding ? '' : sidebarOpen && !isMobile ? 'ml-72 pt-20 pb-20' : 'pt-20 pb-20 md:pb-0'}>
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      {!isLanding && isMobile && (
        <motion.nav
          className="fixed bottom-0 left-0 right-0 z-40 glass p-2"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          <div className="flex justify-around items-center">
            {navItems.slice(1, 5).map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    className={`p-3 rounded-xl ${
                      isActive ? 'bg-gradient-to-r from-emerald-500 to-sky-500 text-white' : ''
                    }`}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </motion.nav>
      )}

      {/* AI Assistant Widget */}
      <AIAssistant />
    </div>
  );
}
