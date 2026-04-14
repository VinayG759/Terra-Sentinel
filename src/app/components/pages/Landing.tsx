import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Globe2, TrendingUp, MapPin, Zap, ArrowRight, AlertTriangle } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Landing() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.5) % 360);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { value: '247', label: 'Regions Monitored', icon: MapPin, color: 'emerald' },
    { value: '98.5%', label: 'Response Efficiency', icon: TrendingUp, color: 'sky' },
    { value: '12', label: 'Active Alerts', icon: AlertTriangle, color: 'orange' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-6 py-20 relative overflow-hidden">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{ background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)' }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left: Text Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-4">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-medium">AI-Powered Disaster Preparedness And Response</span>
              </motion.div>

              <motion.h1
                className="text-5xl lg:text-7xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Disaster Intelligence
                <span className="block bg-gradient-to-r from-emerald-500 via-sky-500 to-teal-500 bg-clip-text text-transparent">
                  System
                </span>
              </motion.h1>

              <motion.p
                className="text-xl text-muted-foreground max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Predict, monitor, and respond to disasters in real-time with AI-powered insights
                and intelligent resource allocation.
              </motion.p>
            </div>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link to="/dashboard">
                <motion.button
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 text-white font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Live Dashboard
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>

              <Link to="/simulation">
                <motion.button
                  className="px-8 py-4 rounded-xl glass-card font-semibold flex items-center gap-2 hover:bg-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Simulate Disaster
                  <Zap className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="relative w-full max-w-md aspect-square">
              {/* Outer ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-emerald-500/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
              />

              {/* Middle ring */}
              <motion.div
                className="absolute inset-8 rounded-full border-2 border-sky-500/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
              />

              {/* Globe */}
              <div className="absolute inset-16 rounded-full bg-gradient-to-br from-emerald-400 via-sky-400 to-teal-400 shadow-2xl flex items-center justify-center overflow-hidden">
                <motion.div
                  style={{ transform: `rotate(${rotation}deg)` }}
                  className="w-full h-full relative"
                >
                  {/* Simulated continents */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute bg-white/20 rounded-full"
                      style={{
                        width: `${20 + Math.random() * 30}%`,
                        height: `${15 + Math.random() * 25}%`,
                        top: `${Math.random() * 80}%`,
                        left: `${Math.random() * 80}%`,
                      }}
                    />
                  ))}
                </motion.div>

                <Globe2 className="absolute w-24 h-24 text-white/40" />
              </div>

              {/* Pulsing alert markers */}
              {[
                { top: '20%', left: '30%', delay: 0 },
                { top: '60%', left: '70%', delay: 0.5 },
                { top: '40%', left: '50%', delay: 1 },
              ].map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 rounded-full bg-orange-500"
                  style={{ top: pos.top, left: pos.left }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: pos.delay,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Animated Stats Section */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="glass-card p-8 text-center"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -8, boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)' }}
                >
                  <motion.div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br from-${stat.color}-400 to-${stat.color}-600 mx-auto flex items-center justify-center mb-4`}
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <motion.div
                    className="text-4xl font-bold mb-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1, type: 'spring' }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
