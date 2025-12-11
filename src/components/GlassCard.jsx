import { motion } from "framer-motion";

export default function GlassCard({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      viewport={{ once: true }}
      className={`glass-panel p-4 ${className}`}
      style={{ overflow: "hidden" }} // Keeps child content inside rounded corners
    >
      {children}
    </motion.div>
  );
}