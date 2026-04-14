import { motion } from 'motion/react';
import { useState } from 'react';
import { Bell, Flame, Droplet, Activity, Wind, AlertTriangle, Info, Filter } from 'lucide-react';

const allAlerts = [
  {
    id: 1,
    type: 'flood',
    severity: 'critical',
    title: 'Severe Flooding Warning',
    location: 'Zone A - Riverside District',
    description: 'Water levels rising rapidly. Immediate evacuation recommended.',
    time: '5 minutes ago',
    timestamp: new Date(Date.now() - 5 * 60000),
  },
  {
    id: 2,
    type: 'fire',
    severity: 'warning',
    title: 'Wildfire Risk Elevated',
    location: 'Zone B - Forest Hills',
    description: 'High winds and dry conditions creating fire hazard.',
    time: '12 minutes ago',
    timestamp: new Date(Date.now() - 12 * 60000),
  },
  {
    id: 3,
    type: 'earthquake',
    severity: 'info',
    title: 'Seismic Activity Detected',
    location: 'Zone C - Downtown',
    description: 'Minor tremors recorded. Monitoring situation.',
    time: '25 minutes ago',
    timestamp: new Date(Date.now() - 25 * 60000),
  },
  {
    id: 4,
    type: 'storm',
    severity: 'warning',
    title: 'Severe Storm Alert',
    location: 'Zone D - Industrial Park',
    description: 'Strong winds and heavy rain expected in next 2 hours.',
    time: '35 minutes ago',
    timestamp: new Date(Date.now() - 35 * 60000),
  },
  {
    id: 5,
    type: 'flood',
    severity: 'info',
    title: 'Flash Flood Watch',
    location: 'Zone E - Valley Region',
    description: 'Conditions favorable for flash flooding. Stay alert.',
    time: '1 hour ago',
    timestamp: new Date(Date.now() - 60 * 60000),
  },
  {
    id: 6,
    type: 'fire',
    severity: 'critical',
    title: 'Active Wildfire',
    location: 'Zone F - Mountain Range',
    description: 'Fire spreading rapidly. Multiple evacuation orders issued.',
    time: '2 hours ago',
    timestamp: new Date(Date.now() - 120 * 60000),
  },
];

const disasterIcons = {
  flood: Droplet,
  fire: Flame,
  earthquake: Activity,
  storm: Wind,
};

const severityConfig = {
  critical: {
    color: 'border-red-500 bg-red-50',
    badge: 'bg-red-500 text-white',
    icon: AlertTriangle,
  },
  warning: {
    color: 'border-orange-500 bg-orange-50',
    badge: 'bg-orange-500 text-white',
    icon: AlertTriangle,
  },
  info: {
    color: 'border-sky-500 bg-sky-50',
    badge: 'bg-sky-500 text-white',
    icon: Info,
  },
};

export function Alerts() {
  const [filterType, setFilterType] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  const filteredAlerts = allAlerts.filter((alert) => {
    if (filterType !== 'all' && alert.type !== filterType) return false;
    if (filterSeverity !== 'all' && alert.severity !== filterSeverity) return false;
    return true;
  });

  const alertCounts = {
    critical: allAlerts.filter((a) => a.severity === 'critical').length,
    warning: allAlerts.filter((a) => a.severity === 'warning').length,
    info: allAlerts.filter((a) => a.severity === 'info').length,
  };

  return (
    <div className="p-6 space-y-6 pb-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">Alerts & Notifications Center</h1>
        <p className="text-muted-foreground">Monitor and manage all disaster alerts in real-time</p>
      </motion.div>

      {/* Alert Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-red-500">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Critical</div>
                <div className="text-3xl font-bold text-red-600">{alertCounts.critical}</div>
              </div>
            </div>
            <motion.div
              className="w-3 h-3 rounded-full bg-red-500"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>

        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-orange-500">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Warning</div>
                <div className="text-3xl font-bold text-orange-600">{alertCounts.warning}</div>
              </div>
            </div>
            <motion.div
              className="w-3 h-3 rounded-full bg-orange-500"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            />
          </div>
        </motion.div>

        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-sky-500">
                <Info className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Info</div>
                <div className="text-3xl font-bold text-sky-600">{alertCounts.info}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </h2>

          <div className="space-y-6">
            {/* Type Filter */}
            <div>
              <label className="text-sm font-medium mb-3 block">Disaster Type</label>
              <div className="space-y-2">
                {[
                  { value: 'all', label: 'All Types' },
                  { value: 'flood', label: 'Flood' },
                  { value: 'fire', label: 'Fire' },
                  { value: 'earthquake', label: 'Earthquake' },
                  { value: 'storm', label: 'Storm' },
                ].map((option) => (
                  <motion.button
                    key={option.value}
                    onClick={() => setFilterType(option.value)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                      filterType === option.value
                        ? 'bg-gradient-to-r from-emerald-500 to-sky-500 text-white'
                        : 'bg-white/50 hover:bg-white'
                    }`}
                    whileHover={{ x: 4 }}
                  >
                    {option.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Severity Filter */}
            <div>
              <label className="text-sm font-medium mb-3 block">Severity Level</label>
              <div className="space-y-2">
                {[
                  { value: 'all', label: 'All Levels' },
                  { value: 'critical', label: 'Critical' },
                  { value: 'warning', label: 'Warning' },
                  { value: 'info', label: 'Info' },
                ].map((option) => (
                  <motion.button
                    key={option.value}
                    onClick={() => setFilterSeverity(option.value)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                      filterSeverity === option.value
                        ? 'bg-gradient-to-r from-emerald-500 to-sky-500 text-white'
                        : 'bg-white/50 hover:bg-white'
                    }`}
                    whileHover={{ x: 4 }}
                  >
                    {option.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Alerts List */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {filteredAlerts.length} Alert{filteredAlerts.length !== 1 ? 's' : ''}
            </h2>
            <motion.button
              className="px-4 py-2 rounded-lg glass-card hover:bg-white transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-4 h-4" />
              Mark All Read
            </motion.button>
          </div>

          <div className="space-y-4">
            {filteredAlerts.map((alert, index) => {
              const Icon = disasterIcons[alert.type as keyof typeof disasterIcons];
              const SeverityIcon =
                severityConfig[alert.severity as keyof typeof severityConfig].icon;
              const config = severityConfig[alert.severity as keyof typeof severityConfig];

              return (
                <motion.div
                  key={alert.id}
                  className={`p-6 rounded-xl border-2 ${config.color}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.01, boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)' }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-xl ${
                        alert.severity === 'critical'
                          ? 'bg-red-500'
                          : alert.severity === 'warning'
                          ? 'bg-orange-500'
                          : 'bg-sky-500'
                      }`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold">{alert.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs ${config.badge}`}>
                              {alert.severity.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <span>{alert.location}</span>
                            <span>•</span>
                            <span>{alert.time}</span>
                          </div>
                        </div>
                        {alert.severity === 'critical' && (
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            <SeverityIcon className="w-5 h-5 text-red-500" />
                          </motion.div>
                        )}
                      </div>

                      <p className="text-sm mb-4">{alert.description}</p>

                      <div className="flex gap-2">
                        <motion.button
                          className="px-4 py-2 rounded-lg bg-white text-sm font-medium hover:bg-gray-50"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Details
                        </motion.button>
                        <motion.button
                          className="px-4 py-2 rounded-lg glass text-sm font-medium"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Acknowledge
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
