"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function Hero() {
  const [typedText, setTypedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const fullText = "loper"

  useEffect(() => {
    const typingSpeed = isDeleting ? 75 : 200
    const pauseTime = isDeleting ? 1000 : 2000

    const timer = setTimeout(() => {
      if (!isDeleting && typedText.length < fullText.length) {
        setTypedText(fullText.substring(0, typedText.length + 1))
      } else if (!isDeleting && typedText.length === fullText.length) {
        setTimeout(() => setIsDeleting(true), pauseTime)
      } else if (isDeleting && typedText.length > 0) {
        setTypedText(fullText.substring(0, typedText.length - 1))
      } else if (isDeleting && typedText.length === 0) {
        setIsDeleting(false)
      }
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [typedText, isDeleting])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as any },
    },
  }

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated grid background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(0deg, rgba(0, 0, 0, 0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 0, 0, 0.08) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
              animation: "gridMove 20s linear infinite",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(0deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: "100px 100px",
              animation: "gridMove 30s linear infinite reverse",
            }}
          />
        </div>

        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none" />

        {/* Blur circles for depth */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-secondary/30 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl opacity-20"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full md:px-48 md:flex md:justify-around text-center relative z-10"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <motion.div whileHover={{ scale: 1.05 }} className="inline-block mb-6">
            <div className="w-64 h-64 md:w-96 md:h-128 mx-auto relative rounded-lg overflow-hidden ">
              <Image
                src="/assets/profile.png"
                alt="William Mark"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          <motion.p variants={itemVariants} className="text-xl text-foreground font-medium tracking-wide">
            Hi! I'm Ayyas Mumtaz
          </motion.p>
        </motion.div>

        <motion.div className="flex-col content-center">
          <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl text-signature mb-8 leading-tight">
            <span className="line-accent">
              Software Deve{typedText}
              <span className="animate-pulse">|</span>
            </span>
            <br />
            <span className="text-foreground/80">based in Jakarta</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg text-foreground/70 mb-12 leading-relaxed max-w-lg mx-auto font-light"
          >
            I am a software developer from Jakarta, Indonesia, with over 3 years of experience contributing to various software projects.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-foreground text-foreground rounded-full font-medium hover:bg-foreground hover:text-background transition-colors "
            >
              My resume ↓
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}