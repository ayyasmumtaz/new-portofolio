"use client"

import { motion } from "framer-motion"

export default function Skills() {
  const skillCategories = [
    {
      category: "Frontend",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
    },
    {
      category: "Backend",
      skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs"],
    },
    {
      category: "Tools & Skills",
      skills: ["Git", "Figma", "Testing", "Performance", "SEO"],
    },
  ]

  const certificates = [
    { name: "Advanced React Patterns", issuer: "Frontend Masters", year: "2023" },
    { name: "Web Performance Optimization", issuer: "Udacity", year: "2022" },
    { name: "Full Stack Development", issuer: "Coursera", year: "2021" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium mb-2">Skills & Education</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">What I Know</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8">Skills</h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {skillCategories.map((category, idx) => (
                <motion.div key={idx} variants={itemVariants}>
                  <h4 className="font-semibold text-foreground mb-3">{category.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.05 }}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8">Certificates</h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {certificates.map((cert, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="p-4 bg-secondary rounded-lg border border-border"
                >
                  <h4 className="font-semibold text-foreground">{cert.name}</h4>
                  <p className="text-sm text-foreground/70">{cert.issuer}</p>
                  <p className="text-xs text-foreground/50 mt-1">{cert.year}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="p-8 bg-secondary rounded-lg border border-border text-center"
        >
          <h3 className="text-2xl font-bold text-foreground mb-3">Education</h3>
          <p className="text-foreground/70 mb-2">Bachelor of Science in Computer Science</p>
          <p className="text-primary font-medium">University of California</p>
          <p className="text-sm text-foreground/60 mt-2">Graduated 2018</p>
        </motion.div>
      </div>
    </section>
  )
}
