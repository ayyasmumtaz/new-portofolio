"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function Navigation() {
  const menuItems = ["Home", "About me", "Services", "My Work", "Contact me"]

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="#" className="text-2xl font-bold text-foreground">
          William<span className="text-primary">.</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item, index) => (
            <motion.a
              key={item}
              href="#"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              {item}
            </motion.a>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="px-6 py-2 border border-foreground text-foreground rounded-full hover:bg-foreground hover:text-background transition-colors text-sm font-medium"
        >
          Contact →
        </motion.button>
      </div>
    </motion.nav>
  )
}
