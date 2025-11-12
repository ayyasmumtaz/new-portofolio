"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({ name: "", email: "", message: "" })
  }

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="py-20 px-6 bg-secondary/30">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary font-medium mb-2">Connect with me</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Get in touch</h2>
          <p className="text-foreground/70 text-lg">
            I'd love to hear from you! If you have any questions, comments, or feedback, please use the form below.
          </p>
        </motion.div>

        <motion.form
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-6 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary transition-colors"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-6 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary transition-colors"
              />
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <textarea
              name="message"
              placeholder="Enter your message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-6 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary transition-colors resize-none"
            />
          </motion.div>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Send Message
          </motion.button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-border text-center"
        >
          <p className="text-foreground/70 mb-4">Or connect with me on social media</p>
          <div className="flex justify-center gap-6">
            {["LinkedIn", "GitHub", "Twitter", "Instagram"].map((social) => (
              <motion.a
                key={social}
                href="#"
                whileHover={{ scale: 1.1 }}
                className="text-foreground/60 hover:text-primary transition-colors font-medium"
              >
                {social}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
