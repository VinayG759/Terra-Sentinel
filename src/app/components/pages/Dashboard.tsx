import { motion } from 'motion/react';
import { useState } from 'react';
import {
  MapPin,
  TrendingUp,
  AlertTriangle,
  Brain,
  Package,
  Flame,
  Droplet,
  Activity,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const predictionData = [
  { time: '00:00', flood: 20, fire: 15, earthquake: 10 },
  { time: '04:00', flood: 35, fire: 20, earthquake: 12 },
  { time: '08:00', flood: 45, fire: 25, earthquake: 18 },
  { time: '12:00', flood: 60, fire: 35, earthquake: 25 },
  { time: '16:00', flood: 75, fire: 45, earthquake: 30 },
  { time: '20:00', flood: 65, fire: 40, earthquake: 28 },
];

const alerts = [
  {
    id: 1,
    type: 'flood',
    severity: 'critical',
    location: 'Zone A - Riverside District',
    time: '5 min ago',
    probability: 89,
  },
  {
    id: 2,
    type: 'fire',
    severity: 'warning',
    location: 'Zone B - Forest Hills',
    time: '12 min ago',
    probability: 67,
  },
  {
    id: 3,
    type: 'earthquake',
    severity: 'info',
    location: 'Zone C - Downtown',
    time: '25 min ago',
    probability: 45,
  },
];

const resources = [
  { name: 'Ambulances', available: 45, total: 60, percentage: 75 },
  { name: 'Shelters', available: 12, total: 15, percentage: 80 },
  { name: 'Supplies', available: 850, total: 1000, percentage: 85 },
  { name: 'Personnel', available: 230, total: 280, percentage: 82 },
];

const aiInsights = [
  'Recommend immediate evacuation in Zone A within 2 hours',
  'Deploy 3 additional ambulances to Riverside District',
  'Weather conditions favorable for fire spread in Forest Hills',
  'Optimal supply distribution route calculated',
];

export function Dashboard() {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const disasterIcons = {
    flood: Droplet,
    fire: Flame,
    earthquake: Activity,
  };

  const severityColors = {
    critical: 'border-red-500 bg-red-50',
    warning: 'border-orange-500 bg-orange-50',
    info: 'border-sky-500 bg-sky-50',
  };

  return (
    <div className="p-6 space-y-6 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold">Mission Control Dashboard</h1>
        <p className="text-muted-foreground">Real-time disaster monitoring and response coordination</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Live Map Section - Main Centerpiece */}
        <motion.div
          className="lg:col-span-2 glass-card p-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-500" />
              Live Threat Map
            </h2>
            <div className="flex gap-2">
              <div className="flex items-center gap-1 text-xs">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span>Critical</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <div className="w-3 h-3 rounded-full bg-orange-500" />
                <span>Warning</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <div className="w-3 h-3 rounded-full bg-sky-500" />
                <span>Info</span>
              </div>
            </div>
          </div>

          {/* Simulated Map */}
          <div className="relative h-96 bg-gradient-to-br from-emerald-50 to-sky-50 rounded-xl overflow-hidden">
            {/* Grid overlay */}
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 gap-px opacity-20">
              {[...Array(48)].map((_, i) => (
                <div key={i} className="border border-gray-400" />
              ))}
            </div>

            {/* Heatmap zones */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-red-400/40 blur-2xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-1/2 right-1/3 w-24 h-24 rounded-full bg-orange-400/40 blur-xl"
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-1/4 left-1/2 w-20 h-20 rounded-full bg-sky-400/40 blur-xl"
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Alert markers */}
            {[
              { x: '25%', y: '30%', severity: 'critical', zone: 'Zone A' },
              { x: '60%', y: '45%', severity: 'warning', zone: 'Zone B' },
              { x: '50%', y: '70%', severity: 'info', zone: 'Zone C' },
            ].map((marker, i) => (
              <motion.div
                key={i}
                className="absolute cursor-pointer"
                style={{ left: marker.x, top: marker.y }}
                onClick={() => setSelectedZone(marker.zone)}
                whileHover={{ scale: 1.2 }}
              >
                <motion.div
                  className={`w-6 h-6 rounded-full ${
                    marker.severity === 'critical'
                      ? 'bg-red-500'
                      : marker.severity === 'warning'
                      ? 'bg-orange-500'
                      : 'bg-sky-500'
                  } shadow-lg`}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />
                <motion.div
                  className={`absolute inset-0 w-6 h-6 rounded-full ${
                    marker.severity === 'critical'
                      ? 'bg-red-500'
                      : marker.severity === 'warning'
                      ? 'bg-orange-500'
                      : 'bg-sky-500'
                  } opacity-50`}
                  animate={{ scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />
              </motion.div>
            ))}

            {/* Zone labels */}
            <div className="absolute top-4 left-4 glass px-3 py-1 text-sm font-medium">Zone A</div>
            <div className="absolute top-4 right-4 glass px-3 py-1 text-sm font-medium">Zone B</div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass px-3 py-1 text-sm font-medium">
              Zone C
            </div>
          </div>
        </motion.div>

        {/* Alerts Feed */}
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            Active Alerts
          </h2>
          <div className="space-y-3">
            {alerts.map((alert, index) => {
              const Icon = disasterIcons[alert.type as keyof typeof disasterIcons];
              return (
                <motion.div
                  key={alert.id}
                  className={`p-4 rounded-xl border-2 ${severityColors[alert.severity as keyof typeof severityColors]}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      alert.severity === 'critical' ? 'bg-red-500' :
                      alert.severity === 'warning' ? 'bg-orange-500' : 'bg-sky-500'
                    }`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold capitalize">{alert.type}</div>
                      <div className="text-sm text-muted-foreground">{alert.location}</div>
                      <div className="text-xs text-muted-foreground mt-1">{alert.time}</div>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 h-2 bg-white/50 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full ${
                              alert.severity === 'critical' ? 'bg-red-500' :
                              alert.severity === 'warning' ? 'bg-orange-500' : 'bg-sky-500'
                            }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${alert.probability}%` }}
                            transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                          />
                        </div>
                        <span className="text-xs font-semibold">{alert.probability}%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Prediction Panel */}
        <motion.div
          className="lg:col-span-2 glass-card p-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-sky-500" />
            24-Hour Prediction Timeline
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={predictionData}>
              <defs>
                <linearGradient id="flood" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="fire" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="earthquake" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="flood"
                stroke="#0ea5e9"
                fillOpacity={1}
                fill="url(#flood)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="fire"
                stroke="#f97316"
                fillOpacity={1}
                fill="url(#fire)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="earthquake"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#earthquake)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* AI Insights Panel */}
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-teal-500" />
            AI Insights
          </h2>
          <div className="space-y-3">
            {aiInsights.map((insight, index) => (
              <motion.div
                key={index}
                className="p-3 rounded-lg bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ x: 4 }}
              >
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-teal-500 mt-2" />
                  <p className="text-sm flex-1">{insight}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Resource Tracker */}
        <motion.div
          className="lg:col-span-3 glass-card p-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Package className="w-5 h-5 text-emerald-500" />
            Resource Availability
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.name}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    <motion.circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#10b981"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
                      animate={{
                        strokeDashoffset: 2 * Math.PI * 56 * (1 - resource.percentage / 100),
                      }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 1 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <div className="text-2xl font-bold">{resource.percentage}%</div>
                    <div className="text-xs text-muted-foreground">
                      {resource.available}/{resource.total}
                    </div>
                  </div>
                </div>
                <div className="font-semibold">{resource.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
