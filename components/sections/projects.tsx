"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function Projects() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Modern online store with advanced filtering and checkout",
      image: "/ecommerce-platform.jpg",
      tags: ["React", "Next.js", "Stripe"],
    },
    {
      title: "Design System",
      description: "Comprehensive component library for enterprise applications",
      image: "/design-system-abstract.png",
      tags: ["TypeScript", "React", "Storybook"],
    },
    {
      title: "Analytics Dashboard",
      description: "Real-time data visualization and reporting tool",
      image: "/analytics-dashboard.png",
      tags: ["React", "D3.js", "Node.js"],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <section className="py-20 px-6 bg-with-pattern relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium mb-2">My Work</p>
          <h2
            className="text-4xl md:text-5xl font-bold text-foreground"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Featured Projects
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={itemVariants} whileHover={{ y: -10 }} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-4 h-64 bg-muted">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
              <p className="text-foreground/70 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-secondary text-foreground/70 text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
