"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Calendar, Briefcase, Building2, X } from 'lucide-react'

interface Experience {
  id: string
  role: string
  company: string
  description: any
  startDate: string
  endDate?: string
  isPresent: boolean
}

// Helper function to render rich text content as JSX
const renderRichText = (description: any): React.ReactNode => {
  if (typeof description === 'string') return description

  if (!description?.root?.children) return ''

  const renderNode = (node: any, index: number): React.ReactNode => {
    // Handle text nodes
    if (node.text !== undefined) {
      let text: React.ReactNode = node.text
      if (node.format) {
        if (node.format & 1) text = <strong key={index}>{text}</strong>
        if (node.format & 2) text = <em key={index}>{text}</em>
      }
      return text
    }

    // Handle list items
    if (node.type === 'listitem') {
      return (
        <li key={index} className="ml-4">
          {node.children?.map((child: any, i: number) => renderNode(child, i))}
        </li>
      )
    }

    // Handle lists
    if (node.type === 'list') {
      const ListTag = node.listType === 'number' ? 'ol' : 'ul'
      return (
        <ListTag key={index} className="list-disc list-inside space-y-2 my-2">
          {node.children?.map((child: any, i: number) => renderNode(child, i))}
        </ListTag>
      )
    }

    // Handle paragraphs
    if (node.type === 'paragraph') {
      return (
        <p key={index} className="mb-2">
          {node.children?.map((child: any, i: number) => renderNode(child, i))}
        </p>
      )
    }

    // Handle other nodes with children
    if (node.children) {
      return node.children.map((child: any, i: number) => renderNode(child, i))
    }

    return null
  }

  return (
    <div>
      {description.root.children.map((node: any, index: number) => renderNode(node, index))}
    </div>
  )
}

// Helper function to get plain text preview (for card preview)
const getPlainTextPreview = (description: any): string => {
  if (typeof description === 'string') return description

  if (!description?.root?.children) return ''

  let text = ''
  const traverse = (node: any) => {
    if (node.text) {
      text += node.text + ' '
    }
    if (node.children) {
      node.children.forEach(traverse)
    }
  }

  description.root.children.forEach(traverse)
  return text.trim()
}

export default function Experience() {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ['experiences'],
    queryFn: async () => {
      const res = await fetch('/api/experience')
      return res.json()
    },
  })

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    })
  }

  const getPeriod = (exp: Experience) => {
    const start = formatDate(exp.startDate)
    const end = exp.isPresent ? 'Present' : formatDate(exp.endDate!)
    return `${start} - ${end}`
  }

  const getDuration = (exp: Experience) => {
    const start = new Date(exp.startDate)
    const end = exp.isPresent ? new Date() : new Date(exp.endDate!)
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12

    if (years > 0 && remainingMonths > 0) {
      return `${years} yr${years > 1 ? 's' : ''} ${remainingMonths} mo${remainingMonths > 1 ? 's' : ''}`
    } else if (years > 0) {
      return `${years} yr${years > 1 ? 's' : ''}`
    } else {
      return `${remainingMonths} mo${remainingMonths > 1 ? 's' : ''}`
    }
  }

  const handleCardClick = (exp: Experience) => {
    setSelectedExperience(exp)
    setIsOpen(true)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  if (isLoading) {
    return (
      <section className="py-20 px-6 bg-secondary/30 relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="h-6 w-32 bg-foreground/10 rounded mx-auto mb-4 animate-pulse"></div>
            <div className="h-12 w-64 bg-foreground/10 rounded mx-auto animate-pulse"></div>
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 bg-background/50 rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  const experiences = data?.docs || []

  return (
    <section className="py-20 px-6 bg-secondary/30 relative overflow-hidden" id="experience">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/20 rounded-full blur-3xl"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-primary font-semibold mb-3 text-sm uppercase tracking-wider"
          >
            Professional Journey
          </motion.p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            Work Experience
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            My professional journey and the roles I've taken on
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          {/* Timeline line */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/30 to-transparent"></div>

          <div className="space-y-6">
            {experiences.map((exp: Experience, index: number) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                onClick={() => handleCardClick(exp)}
                className="group relative"
              >
                {/* Timeline dot */}
                <div className="hidden md:block absolute left-8 top-8 w-4 h-4 -ml-[7px] rounded-full bg-primary border-4 border-background z-10 group-hover:scale-125 transition-transform"></div>

                <motion.div
                  whileHover={{ x: 8, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="md:ml-20 relative bg-gradient-to-br from-background to-background/50 rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer overflow-hidden group shadow-lg hover:shadow-xl"
                >
                  {/* Gradient accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  {/* Current job indicator */}
                  {exp.isPresent && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20">
                        Current
                      </span>
                    </div>
                  )}

                  <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 text-foreground/70 mb-2">
                          <Building2 className="w-4 h-4" />
                          <p className="text-lg font-medium">{exp.company}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-foreground/60 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{getPeriod(exp)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        <span>{getDuration(exp)}</span>
                      </div>
                    </div>

                    <p className="text-foreground/70 line-clamp-2 leading-relaxed">
                      {getPlainTextPreview(exp.description)}
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                      <span>View details</span>
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        →
                      </motion.span>
                    </div>
                  </div>

                  {/* Hover gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modal Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          {selectedExperience && (
            <div className="space-y-6">
              <DialogHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <DialogTitle className="text-3xl font-bold mb-2">
                      {selectedExperience.role}
                    </DialogTitle>
                    <div className="flex items-center gap-2 text-lg text-foreground/70 mb-3">
                      <Building2 className="w-5 h-5" />
                      <span className="font-medium">{selectedExperience.company}</span>
                    </div>
                  </div>
                  {selectedExperience.isPresent && (
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20">
                      Current Position
                    </span>
                  )}
                </div>
              </DialogHeader>

              <div className="flex flex-wrap gap-6 py-4 border-y border-border">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-foreground/60 uppercase tracking-wide">Period</p>
                    <p className="font-semibold">{getPeriod(selectedExperience)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-foreground/60 uppercase tracking-wide">Duration</p>
                    <p className="font-semibold">{getDuration(selectedExperience)}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3 text-foreground">Job Description</h4>
                <div className="prose prose-sm max-w-none text-foreground/80 leading-relaxed">
                  {renderRichText(selectedExperience.description)}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}