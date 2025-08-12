import { useState } from "react"
import { Search, MapPin, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Searching for:", searchQuery)
    // Implement search functionality
  }

  return (
    <section className="relative min-h-screen lg:min-h-[900px] xl:min-h-[1000px] flex items-center justify-center overflow-hidden parallax-bg">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl float-animation"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full blur-3xl float-animation"
          style={{ animationDelay: "3s" }}
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-3xl float-animation"
          style={{ animationDelay: "6s" }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 text-3d text-glow">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Rentivity
            </span>
            <br />
            <span className="bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
              Spark
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Navigate your perfect rental home with AI-powered search, legal protection, and transparent reviews
          </motion.p>
        </motion.div>

        {/* 3D Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <form onSubmit={handleSearch} className="search-3d p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Where do you want to live? (City, neighborhood, address)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg bg-background/50 border-glass-border backdrop-blur-sm 
                           hover:bg-background/70 focus:bg-background/80 transition-all duration-300
                           focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                />
              </div>
              
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="glass-button border-glass-border hover-lift h-14 px-6"
                >
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </Button>
                
                <Button
                  type="submit"
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary-glow hover:to-secondary-glow 
                           text-white h-14 px-8 hover-lift hover-glow transform transition-all duration-300 
                           shadow-lg hover:shadow-xl"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            {/* Quick Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex flex-wrap gap-3 mt-6 justify-center"
            >
              {["Apartments", "Houses", "Condos", "Studios", "Shared"].map((filter, index) => (
                <motion.button
                  key={filter}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4 + index * 0.1, duration: 0.4 }}
                  className="px-4 py-2 rounded-lg glass-button border-glass-border hover-lift text-sm font-medium
                           hover:bg-primary/10 hover:border-primary/30 transition-all duration-300"
                  type="button"
                >
                  {filter}
                </motion.button>
              ))}
            </motion.div>
          </form>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}