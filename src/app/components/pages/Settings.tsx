import { motion } from 'motion/react';
import { useState } from 'react';
import {
  Settings as SettingsIcon,
  Palette,
  Zap,
  RefreshCw,
  User,
  Bell,
  Globe,
  Shield,
  Moon,
  Sun,
  Droplets,
  Trees,
} from 'lucide-react';

const themes = [
  {
    id: 'nature-light',
    name: 'Nature Light',
    description: 'Clean and fresh with green accents',
    icon: Trees,
    gradient: 'from-emerald-400 to-sky-400',
  },
  {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    description: 'Calm blue tones inspired by water',
    icon: Droplets,
    gradient: 'from-sky-400 to-blue-500',
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    description: 'Deep greens with earthy tones',
    icon: Trees,
    gradient: 'from-emerald-600 to-green-700',
  },
];

export function Settings() {
  const [selectedTheme, setSelectedTheme] = useState('nature-light');
  const [animationIntensity, setAnimationIntensity] = useState(75);
  const [refreshRate, setRefreshRate] = useState(5);
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <div className="p-6 space-y-6 pb-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">Settings & Customization</h1>
        <p className="text-muted-foreground">Personalize your disaster management experience</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Section */}
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-500" />
            Profile
          </h2>

          <div className="text-center mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-sky-400 mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
              AI
            </div>
            <h3 className="font-semibold text-lg">Response Coordinator</h3>
            <p className="text-sm text-muted-foreground">admin@disaster-ai.com</p>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-lg glass-card">
              <div className="text-xs text-muted-foreground">Role</div>
              <div className="font-medium">System Administrator</div>
            </div>
            <div className="p-3 rounded-lg glass-card">
              <div className="text-xs text-muted-foreground">Region</div>
              <div className="font-medium">Multi-Regional</div>
            </div>
            <div className="p-3 rounded-lg glass-card">
              <div className="text-xs text-muted-foreground">Access Level</div>
              <div className="font-medium">Full Access</div>
            </div>
          </div>

          <motion.button
            className="w-full mt-6 px-6 py-3 rounded-xl glass-card hover:bg-white font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Edit Profile
          </motion.button>
        </motion.div>

        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Theme Customization */}
          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Palette className="w-5 h-5 text-sky-500" />
              Theme Customization
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
              {themes.map((theme, index) => {
                const Icon = theme.icon;
                return (
                  <motion.button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedTheme === theme.id
                        ? 'border-emerald-500 shadow-lg'
                        : 'border-transparent bg-white/50 hover:bg-white'
                    }`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div
                      className={`w-full h-24 rounded-lg bg-gradient-to-br ${theme.gradient} mb-3 flex items-center justify-center`}
                    >
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="font-semibold mb-1">{theme.name}</div>
                    <div className="text-xs text-muted-foreground">{theme.description}</div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Performance Settings */}
          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-500" />
              Performance
            </h2>

            <div className="space-y-6">
              {/* Animation Intensity */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="font-medium">Animation Intensity</label>
                  <span className="text-sm text-muted-foreground">{animationIntensity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={animationIntensity}
                  onChange={(e) => setAnimationIntensity(Number(e.target.value))}
                  className="w-full h-2 bg-gradient-to-r from-gray-200 to-emerald-500 rounded-full appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Minimal</span>
                  <span>Standard</span>
                  <span>Maximum</span>
                </div>
              </div>

              {/* Data Refresh Rate */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="font-medium">Data Refresh Rate</label>
                  <span className="text-sm text-muted-foreground">{refreshRate}s</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={refreshRate}
                  onChange={(e) => setRefreshRate(Number(e.target.value))}
                  className="w-full h-2 bg-gradient-to-r from-gray-200 to-sky-500 rounded-full appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>1s (Fast)</span>
                  <span>15s</span>
                  <span>30s (Slow)</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Bell className="w-5 h-5 text-teal-500" />
              Notifications
            </h2>

            <div className="space-y-4">
              {[
                {
                  label: 'Push Notifications',
                  description: 'Receive alerts for critical events',
                  enabled: notifications,
                  setter: setNotifications,
                },
                {
                  label: 'Sound Alerts',
                  description: 'Play sound for new notifications',
                  enabled: soundEnabled,
                  setter: setSoundEnabled,
                },
              ].map((setting, index) => (
                <motion.div
                  key={setting.label}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/50"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div>
                    <div className="font-medium">{setting.label}</div>
                    <div className="text-sm text-muted-foreground">{setting.description}</div>
                  </div>
                  <button
                    onClick={() => setting.setter(!setting.enabled)}
                    className={`relative w-14 h-7 rounded-full transition-colors ${
                      setting.enabled ? 'bg-emerald-500' : 'bg-gray-300'
                    }`}
                  >
                    <motion.div
                      className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md"
                      animate={{ x: setting.enabled ? 28 : 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* System Info */}
          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <SettingsIcon className="w-5 h-5 text-purple-500" />
              System Information
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/50">
                <div className="text-xs text-muted-foreground mb-1">Version</div>
                <div className="font-semibold">v2.5.1</div>
              </div>
              <div className="p-4 rounded-xl bg-white/50">
                <div className="text-xs text-muted-foreground mb-1">Last Updated</div>
                <div className="font-semibold">Apr 14, 2026</div>
              </div>
              <div className="p-4 rounded-xl bg-white/50">
                <div className="text-xs text-muted-foreground mb-1">Server Status</div>
                <div className="font-semibold flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Online
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/50">
                <div className="text-xs text-muted-foreground mb-1">Data Sync</div>
                <div className="font-semibold">Real-time</div>
              </div>
            </div>

            <motion.button
              className="w-full mt-6 px-6 py-3 rounded-xl glass-card hover:bg-white font-medium flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RefreshCw className="w-5 h-5" />
              Check for Updates
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
