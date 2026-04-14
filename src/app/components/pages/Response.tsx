import { motion } from 'motion/react';
import { useState } from 'react';
import {
  Ambulance,
  Navigation,
  Users,
  Package,
  CheckCircle,
  Clock,
  MapPin,
  TrendingUp,
} from 'lucide-react';

const routes = [
  {
    id: 1,
    from: 'Central Station',
    to: 'Zone A - Riverside',
    distance: '12.5 km',
    eta: '15 min',
    status: 'in-transit',
  },
  {
    id: 2,
    from: 'Hospital West',
    to: 'Zone B - Forest Hills',
    distance: '8.2 km',
    eta: '10 min',
    status: 'in-transit',
  },
  {
    id: 3,
    from: 'Fire Station North',
    to: 'Zone C - Downtown',
    distance: '5.1 km',
    eta: '6 min',
    status: 'reached',
  },
];

const resources = [
  { id: 1, type: 'Ambulance', unit: 'AMB-001', status: 'available', location: 'Central Station' },
  { id: 2, type: 'Ambulance', unit: 'AMB-002', status: 'in-transit', location: 'En route' },
  { id: 3, type: 'Fire Truck', unit: 'FIRE-001', status: 'in-transit', location: 'En route' },
  { id: 4, type: 'Rescue Team', unit: 'RESCUE-A', status: 'available', location: 'Base Camp' },
  { id: 5, type: 'Rescue Team', unit: 'RESCUE-B', status: 'reached', location: 'Zone C' },
  { id: 6, type: 'Supply Van', unit: 'SUPPLY-001', status: 'pending', location: 'Warehouse' },
];

const zones = ['Zone A - Riverside', 'Zone B - Forest Hills', 'Zone C - Downtown', 'Zone D - Industrial'];

export function Response() {
  const [selectedResource, setSelectedResource] = useState<number | null>(null);
  const [selectedZone, setSelectedZone] = useState<string>('');

  const statusColors = {
    available: 'bg-emerald-500',
    'in-transit': 'bg-sky-500',
    reached: 'bg-teal-500',
    pending: 'bg-orange-500',
  };

  const statusLabels = {
    available: 'Available',
    'in-transit': 'In Transit',
    reached: 'Reached',
    pending: 'Pending',
  };

  return (
    <div className="p-6 space-y-6 pb-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">Emergency Response Coordination</h1>
        <p className="text-muted-foreground">Optimize routes and allocate resources in real-time</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Route Optimization */}
        <motion.div
          className="lg:col-span-2 glass-card p-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Navigation className="w-5 h-5 text-emerald-500" />
            Active Routes
          </h2>

          {/* Route Map Visualization */}
          <div className="relative h-80 bg-gradient-to-br from-emerald-50 to-sky-50 rounded-xl mb-6 overflow-hidden">
            {/* Grid overlay */}
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 gap-px opacity-10">
              {[...Array(48)].map((_, i) => (
                <div key={i} className="border border-gray-400" />
              ))}
            </div>

            {/* Route paths */}
            {routes.map((route, index) => (
              <svg key={route.id} className="absolute inset-0 w-full h-full pointer-events-none">
                <motion.path
                  d={`M ${20 + index * 80} 80 Q ${200 + index * 50} ${150 + index * 40} ${
                    300 + index * 70
                  } 250`}
                  stroke={
                    route.status === 'in-transit'
                      ? '#0ea5e9'
                      : route.status === 'reached'
                      ? '#14b8a6'
                      : '#10b981'
                  }
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="8 4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: route.status === 'reached' ? 1 : 0.6 }}
                  transition={{ duration: 2, delay: index * 0.2 }}
                />
              </svg>
            ))}

            {/* Location markers */}
            {[
              { x: '10%', y: '20%', label: 'Central' },
              { x: '40%', y: '40%', label: 'Hospital' },
              { x: '70%', y: '60%', label: 'Fire Station' },
              { x: '30%', y: '75%', label: 'Zone A' },
              { x: '60%', y: '30%', label: 'Zone B' },
              { x: '85%', y: '80%', label: 'Zone C' },
            ].map((marker, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{ left: marker.x, top: marker.y }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}
              >
                <div className="relative">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-lg" />
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium glass px-2 py-1 rounded">
                    {marker.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Route Cards */}
          <div className="space-y-3">
            {routes.map((route, index) => (
              <motion.div
                key={route.id}
                className="p-4 rounded-xl glass-card hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ x: 4 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        statusColors[route.status as keyof typeof statusColors]
                      }`}
                    />
                    <div className="flex-1">
                      <div className="font-semibold flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        {route.from} → {route.to}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Distance: {route.distance} • ETA: {route.eta}
                      </div>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full text-xs font-medium glass">
                    {statusLabels[route.status as keyof typeof statusLabels]}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Resource Allocation */}
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-sky-500" />
            Resource Pool
          </h2>

          <div className="space-y-3 mb-6">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.id}
                className={`p-3 rounded-xl cursor-pointer transition-all ${
                  selectedResource === resource.id
                    ? 'bg-gradient-to-r from-emerald-100 to-sky-100 border-2 border-emerald-500 shadow-lg'
                    : 'glass-card hover:bg-white'
                }`}
                onClick={() => setSelectedResource(resource.id)}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        statusColors[resource.status as keyof typeof statusColors]
                      }`}
                    />
                    <div>
                      <div className="font-semibold text-sm">{resource.unit}</div>
                      <div className="text-xs text-muted-foreground">{resource.type}</div>
                    </div>
                  </div>
                  {resource.status === 'available' && selectedResource === resource.id && (
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Assignment Section */}
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <h3 className="font-semibold text-sm">Assign to Zone</h3>
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl glass-card border-2 border-transparent focus:border-emerald-500 outline-none transition-colors"
            >
              <option value="">Select destination...</option>
              {zones.map((zone) => (
                <option key={zone} value={zone}>
                  {zone}
                </option>
              ))}
            </select>

            <motion.button
              disabled={!selectedResource || !selectedZone}
              className={`w-full px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 ${
                !selectedResource || !selectedZone
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-500 to-sky-500 text-white shadow-lg hover:shadow-xl'
              }`}
              whileHover={!selectedResource || !selectedZone ? {} : { scale: 1.05 }}
              whileTap={!selectedResource || !selectedZone ? {} : { scale: 0.95 }}
            >
              <Navigation className="w-5 h-5" />
              Deploy Resource
            </motion.button>
          </div>
        </motion.div>

        {/* Status Tracking */}
        <motion.div
          className="lg:col-span-3 glass-card p-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-teal-500" />
            Response Metrics
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { label: 'Available', value: '4', icon: CheckCircle, color: 'emerald' },
              { label: 'In Transit', value: '2', icon: Clock, color: 'sky' },
              { label: 'Deployed', value: '1', icon: Ambulance, color: 'teal' },
              { label: 'Pending', value: '1', icon: Package, color: 'orange' },
            ].map((metric, index) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={metric.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br from-${metric.color}-400 to-${metric.color}-600 mx-auto flex items-center justify-center mb-3`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold mb-1">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
