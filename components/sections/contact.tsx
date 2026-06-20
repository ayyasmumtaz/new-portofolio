"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [popup, setPopup] = useState<{
    show: boolean
    type: "success" | "error"
    message: string
  }>({ show: false, type: "success", message: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch("/api/contact-messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setPopup({
          show: true,
          type: "success",
          message: "Message sent successfully! I'll get back to you soon.",
        })
        setFormData({ name: "", email: "", message: "" })
      } else {
        throw new Error("Failed to send message")
      }
    } catch {
      setPopup({
        show: true,
        type: "error",
        message: "Failed to send message. Please try again or email me directly.",
      })
    } finally {
      setIsSubmitting(false)
      setTimeout(() => {
        setPopup((prev) => ({ ...prev, show: false }))
      }, 5000)
    }
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
    <section id="contact" className="py-20 px-6 bg-secondary/30">
      {/* Popup Notification */}
      <AnimatePresence>
        {popup.show && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -50, x: "-50%" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed top-6 left-1/2 z-[100] w-[90%] max-w-md"
          >
            <div
              className="px-6 py-5 rounded-lg shadow-2xl border border-border bg-background/95 backdrop-blur-xl flex items-start gap-4"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  popup.type === "success"
                    ? "bg-primary text-primary-foreground"
                    : "bg-destructive/20 text-destructive-foreground"
                }`}
              >
                <span className="text-lg font-bold">
                  {popup.type === "success" ? "✓" : "!"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="font-bold text-foreground text-base"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {popup.type === "success" ? "Message Sent!" : "Something Went Wrong"}
                </p>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  {popup.message}
                </p>
              </div>
              <button
                onClick={() => setPopup((prev) => ({ ...prev, show: false }))}
                className="text-muted-foreground hover:text-foreground transition-colors text-lg shrink-0 mt-0.5"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
                required
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
                required
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
              required
              className="w-full px-6 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary transition-colors resize-none"
            />
          </motion.div>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
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
            {[
              { name: "LinkedIn", href: "https://linkedin.com/in/ayyasmumtazyudha" },
              { name: "GitHub", href: "https://github.com/ayyasmumtaz" },
              { name: "Instagram", href: "https://instagram.com/ayyasmumtaz_" },
            ].map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-foreground/60 hover:text-primary transition-colors font-medium"
              >
                {social.name}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
