import { useState } from "react"
import { Menu, X, Home, User, Bell, FileText, Scale, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion, AnimatePresence } from "framer-motion"

const navigationItems = [
  { name: "Profile", icon: User, href: "#profile" },
  { name: "Notifications", icon: Bell, href: "#notifications" },
  { name: "Issue Reporting", icon: FileText, href: "#issues" },
  { name: "Legal Rights Library", icon: Scale, href: "#legal" },
  { name: "Settings", icon: Settings, href: "#settings" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-nav"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Drawer Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="glass-button hover-glow">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="glass-card border-glass-border">
              <SheetHeader>
                <SheetTitle className="text-2xl font-bold text-glow">
                  Rentivity Spark
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-8 space-y-4">
                {navigationItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className="flex items-center space-x-3 p-3 rounded-xl glass-button hover-lift text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </motion.a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Center - Logo */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <Home className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-3d text-glow bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Rentivity Spark
            </span>
          </motion.div>

          {/* Right side - Theme Toggle */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <ThemeToggle />
          </motion.div>
        </div>
      </div>
    </motion.nav>
  )
}