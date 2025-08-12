import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Search, Filter, Eye, MessageSquare, FileCheck, Key } from "lucide-react"

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Search & Discover",
    description: "Use our AI-powered search to find properties that match your exact preferences and budget.",
    color: "from-primary to-primary-glow"
  },
  {
    icon: Filter,
    step: "02", 
    title: "Filter & Compare",
    description: "Apply advanced filters and compare properties side-by-side with detailed analytics.",
    color: "from-secondary to-secondary-glow"
  },
  {
    icon: Eye,
    step: "03",
    title: "Virtual Tours",
    description: "Take immersive virtual tours and get detailed property insights before visiting.",
    color: "from-accent to-accent-glow"
  },
  {
    icon: MessageSquare,
    step: "04",
    title: "Connect & Negotiate",
    description: "Chat directly with landlords, ask questions, and negotiate terms through our platform.",
    color: "from-primary to-secondary"
  },
  {
    icon: FileCheck,
    step: "05",
    title: "Legal Review",
    description: "Get your lease reviewed by our legal experts and access our rights library.",
    color: "from-secondary to-accent"
  },
  {
    icon: Key,
    step: "06",
    title: "Move In",
    description: "Complete the process with digital signing and get keys to your new home.",
    color: "from-accent to-primary"
  }
]

export function HowItWorksSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section ref={ref} className="py-32 px-4 relative overflow-hidden bg-muted/20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-3d text-glow">
            <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our streamlined process makes finding and securing your perfect rental 
            home simple, secure, and stress-free in just six easy steps.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 50, rotateY: 45 }}
              animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ 
                delay: index * 0.15, 
                duration: 0.8, 
                ease: "easeOut" 
              }}
              className="section-3d p-8 group relative overflow-hidden"
            >
              {/* Step Number */}
              <motion.div
                whileHover={{ scale: 1.1, rotateZ: 5 }}
                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-r from-muted/50 to-muted/30 
                         flex items-center justify-center text-2xl font-bold text-muted-foreground/60"
              >
                {step.step}
              </motion.div>

              {/* Icon */}
              <motion.div
                whileHover={{ 
                  scale: 1.2, 
                  rotateY: 15,
                  rotateX: 10 
                }}
                transition={{ duration: 0.3 }}
                className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${step.color} 
                          flex items-center justify-center group-hover:shadow-[0_0_30px_hsl(var(--shadow-glow-primary))]
                          transition-all duration-300`}
              >
                <step.icon className="h-8 w-8 text-white" />
              </motion.div>
              
              <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                {step.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>

              {/* Connection Line for Desktop */}
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ delay: 1 + index * 0.1, duration: 0.8 }}
                  className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-transparent
                           transform -translate-y-1/2 origin-left"
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-20 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary-glow hover:to-secondary-glow 
                     text-white px-12 py-4 rounded-2xl font-bold text-lg hover-lift hover-glow
                     transform transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}