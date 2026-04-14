import { motion } from 'motion/react';

export function LoadingShimmer({ className = '' }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-gray-200 rounded-xl ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="glass-card p-6 space-y-4">
      <LoadingShimmer className="h-6 w-3/4" />
      <LoadingShimmer className="h-4 w-full" />
      <LoadingShimmer className="h-4 w-5/6" />
      <LoadingShimmer className="h-32 w-full" />
    </div>
  );
}
