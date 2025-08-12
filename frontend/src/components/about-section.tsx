import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Home, Shield, Users, Award } from "lucide-react"

const features = [
  {
    icon: Home,
    title: "Smart Discovery",
    description: "AI-powered search that understands your preferences and finds perfect matches in seconds."
  },
  {
    icon: Shield,
    title: "Legal Protection",
    description: "Complete legal rights library and expert guidance to protect you throughout your rental journey."
  },
  {
    icon: Users,
    title: "Community Reviews",
    description: "Honest reviews from real tenants sharing their authentic experiences and insights."
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description: "Verified listings with detailed property information and transparent pricing."
  }
]

export function AboutSection() {
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
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"
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
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              About Rentivity Spark
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing the rental experience with cutting-edge technology, 
            comprehensive legal support, and a community-driven platform that puts 
            transparency and trust at the forefront of every interaction.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50, rotateX: 45 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ 
                delay: index * 0.2, 
                duration: 0.8, 
                ease: "easeOut" 
              }}
              className="section-3d p-8 text-center group"
            >
              <motion.div
                whileHover={{ 
                  scale: 1.1, 
                  rotateY: 10,
                  rotateX: 5 
                }}
                transition={{ duration: 0.3 }}
                className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 
                         flex items-center justify-center group-hover:shadow-[0_0_30px_hsl(var(--shadow-glow-primary))]
                         transition-all duration-300"
              >
                <feature.icon className="h-8 w-8 text-primary group-hover:text-primary-glow transition-colors duration-300" />
              </motion.div>
              
              <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: "50K+", label: "Happy Tenants" },
            { number: "10K+", label: "Verified Properties" },
            { number: "500+", label: "Cities Covered" },
            { number: "98%", label: "Satisfaction Rate" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
              className="text-center p-6 glass-card"
            >
              <div className="text-3xl md:text-4xl font-bold text-glow bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}