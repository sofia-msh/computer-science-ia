import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="p-10">
      <motion.h1 
        className="text-4xl font-bold text-blue-600 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Welcome to Music Recommender
      </motion.h1>
      <p className="text-gray-700">
        Explore music, add favorites, and get personalized recommendations!
      </p>
    </div>
  );
}
