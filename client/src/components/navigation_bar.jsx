import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-around">
      {["Home", "MyMusic", "Genres", "Artists", "HotTracks", "SignIn"].map((page) => (
        <motion.div
          key={page}
          whileHover={{ scale: 1.1 }}
          className="text-blue-600 font-semibold"
        >
          <Link to={page === "Home" ? "/" : `/${page.toLowerCase()}`}>{page}</Link>
        </motion.div>
      ))}
    </nav>
  );
}