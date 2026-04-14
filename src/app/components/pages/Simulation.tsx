import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Flame, Droplet, Activity, Play, RotateCcw, TrendingUp, Users, Home } from 'lucide-react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';

const disasterTypes = [
  { id: 'flood', name: 'Flood', icon: Droplet, color: '#0ea5e9' },
  { id: 'wildfire', name: 'Wildfire', icon: Flame, color: '#f97316' },
  { id: 'earthquake', name: 'Earthquake', icon: Activity, color: '#10b981' },
];

export function Simulation() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [intensity, setIntensity] = useState(50);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);

  const handleSimulate = () => {
    setIsSimulating(true);
    setSimulationProgress(0);
    const interval = setInterval(() => {
      setSimulationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  const handleReset = () => {
    setIsSimulating(false);
    setSimulationProgress(0);
  };

  const impactData = [
    {
      name: 'Impact',
      value: intensity,
      fill: selectedType === 'flood' ? '#0ea5e9' : selectedType === 'wildfire' ? '#f97316' : '#10b981',
    },
  ];

  const predictedImpact = {
    population: Math.round((intensity / 100) * 50000),
    buildings: Math.round((intensity / 100) * 1200),
    area: Math.round((intensity / 100) * 250),
  };

  return (
    <div className="p-6 space-y-6 pb-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">Disaster Simulation Lab</h1>
        <p className="text-muted-foreground">
          Model disaster scenarios to prepare response strategies
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Control Panel */}
        <motion.div
          className="lg:col-span-1 space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Disaster Type Selection */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold mb-4">Select Disaster Type</h2>
            <div className="space-y-3">
              {disasterTypes.map((disaster, index) => {
                const Icon = disaster.icon;
                return (
                  <motion.button
                    key={disaster.id}
                    onClick={() => setSelectedType(disaster.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all ${
                      selectedType === disaster.id
                        ? 'border-current shadow-lg scale-105'
                        : 'border-transparent bg-white/50 hover:bg-white'
                    }`}
                    style={{
                      color: selectedType === disaster.id ? disaster.color : undefined,
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: `${disaster.color}20` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: disaster.color }} />
                      </div>
                      <span className="font-semibold">{disaster.name}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Intensity Control */}
          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-lg font-semibold mb-4">Intensity Level</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Severity</span>
                <span className="text-2xl font-bold">{intensity}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="w-full h-3 bg-gradient-to-r from-emerald-200 via-orange-200 to-red-200 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #10b981 0%, #f97316 50%, #dc2626 100%)`,
                }}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Low</span>
                <span>Moderate</span>
                <span>Severe</span>
              </div>

              {/* Impact Visualization */}
              <div className="mt-6">
                <ResponsiveContainer width="100%" height={200}>
                  <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="90%"
                    data={impactData}
                    startAngle={180}
                    endAngle={0}
                  >
                    <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                    <RadialBar
                      background
                      dataKey="value"
                      cornerRadius={10}
                      fill={impactData[0].fill}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              onClick={handleSimulate}
              disabled={!selectedType || isSimulating}
              className={`w-full px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 ${
                !selectedType || isSimulating
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-500 to-sky-500 text-white shadow-lg hover:shadow-xl'
              }`}
              whileHover={!selectedType || isSimulating ? {} : { scale: 1.02 }}
              whileTap={!selectedType || isSimulating ? {} : { scale: 0.98 }}
            >
              <Play className="w-5 h-5" />
              Run Simulation
            </motion.button>

            <motion.button
              onClick={handleReset}
              className="w-full px-6 py-4 rounded-xl glass-card font-semibold flex items-center justify-center gap-2 hover:bg-white"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RotateCcw className="w-5 h-5" />
              Reset
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Visualization Area */}
        <motion.div
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Simulation Canvas */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold mb-4">Impact Visualization</h2>
            <div className="relative h-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden">
              {!selectedType ? (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  Select a disaster type to begin
                </div>
              ) : (
                <>
                  {/* Grid background */}
                  <div className="absolute inset-0 grid grid-cols-10 grid-rows-8 gap-px opacity-10">
                    {[...Array(80)].map((_, i) => (
                      <div key={i} className="border border-gray-400" />
                    ))}
                  </div>

                  {/* Simulated spread animation */}
                  <AnimatePresence>
                    {isSimulating && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <motion.div
                          className="rounded-full blur-2xl"
                          style={{
                            background:
                              selectedType === 'flood'
                                ? 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)'
                                : selectedType === 'wildfire'
                                ? 'radial-gradient(circle, #f97316 0%, transparent 70%)'
                                : 'radial-gradient(circle, #10b981 0%, transparent 70%)',
                          }}
                          initial={{ width: 0, height: 0 }}
                          animate={{
                            width: `${simulationProgress}%`,
                            height: `${simulationProgress}%`,
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Progress indicator */}
                  {isSimulating && (
                    <motion.div
                      className="absolute bottom-4 left-4 right-4 glass p-4 rounded-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Simulation Progress</span>
                        <span className="text-sm font-bold">{simulationProgress}%</span>
                      </div>
                      <div className="h-2 bg-white/50 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${
                            selectedType === 'flood'
                              ? 'bg-sky-500'
                              : selectedType === 'wildfire'
                              ? 'bg-orange-500'
                              : 'bg-emerald-500'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${simulationProgress}%` }}
                        />
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Predicted Impact Stats */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              Predicted Impact
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <motion.div
                className="p-4 rounded-xl bg-gradient-to-br from-sky-50 to-sky-100 border border-sky-200"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-sky-500">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm text-muted-foreground">Population</span>
                </div>
                <div className="text-3xl font-bold text-sky-700">
                  {predictedImpact.population.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground mt-1">people affected</div>
              </motion.div>

              <motion.div
                className="p-4 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-orange-500">
                    <Home className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm text-muted-foreground">Buildings</span>
                </div>
                <div className="text-3xl font-bold text-orange-700">
                  {predictedImpact.buildings.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground mt-1">structures at risk</div>
              </motion.div>

              <motion.div
                className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-emerald-500">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm text-muted-foreground">Area</span>
                </div>
                <div className="text-3xl font-bold text-emerald-700">
                  {predictedImpact.area.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground mt-1">sq km affected</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
