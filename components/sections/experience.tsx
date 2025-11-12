"use client"

import { motion } from "framer-motion"

export default function Experience() {
  const experiences = [
    {
      title: "Senior Frontend Engineer",
      company: "Tech Company",
      period: "2022 - Present",
      description: "Led the development of customer-facing applications and mentored junior developers.",
    },
    {
      title: "Frontend Developer",
      company: "Digital Agency",
      period: "2020 - 2022",
      description: "Built responsive web applications and worked with design teams on UI/UX improvements.",
    },
    {
      title: "Junior Developer",
      company: "Startup Hub",
      period: "2018 - 2020",
      description: "Started my career building web components and learning modern web technologies.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="py-20 px-6 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium mb-2">Experience</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">My Journey</h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ x: 10 }}
              className="p-6 bg-background rounded-lg border border-border hover:border-primary transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{exp.title}</h3>
                  <p className="text-primary">{exp.company}</p>
                </div>
                <span className="text-sm text-foreground/60 whitespace-nowrap ml-4">{exp.period}</span>
              </div>
              <p className="text-foreground/70">{exp.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
