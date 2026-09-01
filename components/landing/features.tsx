"use client"

import { motion } from "motion/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Folders, ShoppingBag, CreditCard, SearchIcon } from "lucide-react"

const features = [
  {
    icon: Folders,
    title: "Menu management",
    description:
      "Create, edit, organize, and remove categories and menu items in seconds.",
  },
  {
    icon: ShoppingBag,
    title: "Order management",
    description:
      "View order details and update statuses from one centralized dashboard.",
  },
  {
    icon: CreditCard,
    title: "Checkout",
    description:
      "Persistent shopping cart and a streamlined flow powered by Stripe.",
  },
  {
    icon: SearchIcon,
    title: "Search & filtering",
    description:
      "Powerful table utilities for growing menus and order histories",
  },
]

export function Features() {
  return (
    <Card className="w-full bg-zinc-50 py-12 text-center md:px-8 dark:bg-neutral-900">
      <CardHeader>
        <CardTitle>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl font-bold md:text-4xl"
          >
            Everything in one workspace
          </motion.h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {features.map(({ title, description, icon: Icon }, index) => (
            <motion.li
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center gap-4 p-4"
            >
              <Icon />
              <p className="text-lg font-bold">{title}</p>
              <p className="text-sm">{description}</p>
            </motion.li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
