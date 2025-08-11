import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Clock, DollarSign, Shield, Heart, Zap, Users } from "lucide-react"

const benefits = [
  {
    icon: Clock,
    title: "Save Time",
    description: "Reduce your search time by 90% with AI-powered matching and instant notifications.",
    stats: "90% faster",
    color: "from-primary/20 to-primary/10"
  },
  {
    icon: DollarSign,
    title: "Save Money",
    description: "Find the best deals with price tracking, market analysis, and negotiation support.",
    stats: "$500+ saved",
    color: "from-secondary/20 to-secondary/10"
  },
  {
    icon: Shield,
    title: "Stay Protected",
    description: "Complete legal support, verified listings, and fraud protection for peace of mind.",
    stats: "100% verified",
    color: "from-accent/20 to-accent/10"
  },
  {
    icon: Heart,
    title: "Reduce Stress",
    description: "Streamlined process with expert guidance eliminates rental anxiety and confusion.",
    stats: "98% satisfaction",
    color: "from-primary/20 to-secondary/10"
  },
  {
    icon: Zap,
    title: "Get Instant Results",
    description: "Real-time updates, instant messaging, and immediate property availability notifications.",
    stats: "Real-time updates",
    color: "from-secondary/20 to-accent/10"
  },
  {
    icon: Users,
    title: "Join Community",
    description: "Connect with verified tenants, read honest reviews, and share your experiences.",
    stats: "50K+ members",
    color: "from-accent/20 to-primary/10"
  }
]

export function HowItHelpsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section ref={ref} className="py-32 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-3xl"
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
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              How We Help You
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transform your rental experience with our comprehensive platform designed 
            to make finding your perfect home faster, safer, and more affordable.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 50, rotateX: 45, rotateY: -15 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0, rotateY: 0 } : {}}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.8, 
                ease: "easeOut" 
              }}
              className="section-3d p-8 group relative overflow-hidden"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-100 
                             transition-opacity duration-500 rounded-2xl`} />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  whileHover={{ 
                    scale: 1.2, 
                    rotateY: 20,
                    rotateX: 10 
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 
                           flex items-center justify-center group-hover:shadow-[0_0_30px_hsl(var(--shadow-glow-primary))]
                           transition-all duration-300"
                >
                  <benefit.icon className="h-8 w-8 text-primary group-hover:text-primary-glow transition-colors duration-300" />
                </motion.div>
                
                <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                  {benefit.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {benefit.description}
                </p>

                {/* Stats Badge */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 
                           border border-primary/20 text-primary font-semibold text-sm"
                >
                  {benefit.stats}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Success Stories */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-20 text-center"
        >
          <h3 className="text-3xl font-bold mb-8 text-foreground">
            Real Results from Real People
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { metric: "3 days", label: "Average search time", previous: "vs 30 days traditional" },
              { metric: "$650", label: "Average savings", previous: "per rental transaction" },
              { metric: "24/7", label: "Expert support", previous: "whenever you need it" }
            ].map((result, index) => (
              <motion.div
                key={result.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                className="glass-card p-6"
              >
                <div className="text-4xl font-bold text-glow bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  {result.metric}
                </div>
                <div className="text-foreground font-semibold mb-1">
                  {result.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {result.previous}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}