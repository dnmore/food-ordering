"use client"

import { motion } from "motion/react"

const valueStripes = [
  {
    title: "Direct ordering",
    description: "Sell directly to your customers.",
  },
  {
    title: "Own your data",
    description: "Your business data stays yours.",
  },
  {
    title: "Simple operations",
    description: "Manage orders and menus from one place.",
  },
  {
    title: "Actionable insights",
    description: "Understand what's actually selling.",
  },
]

export function ValueStripe() {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-8  px-4 py-12 text-center md:px-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-2xl font-bold md:text-4xl"
      >
        Take control of your ordering
      </motion.h2>

      <div className="grid grid-cols-1 items-center justify-center gap-8 p-4">
        {valueStripes.map(({ title, description }, index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="flex w-full flex-col gap-2 p-4"
          >
            <div className="flex flex-col gap-1">
              <p className="text-xl font-bold">{title}</p>
              <p className="text-sm">{description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
