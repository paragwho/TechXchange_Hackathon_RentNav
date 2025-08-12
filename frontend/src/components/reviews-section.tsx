import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Software Engineer",
    location: "Austin, TX",
    rating: 5,
    review: "Rentivity Spark transformed my apartment hunt! Found my dream place in just 2 days. The legal review feature saved me from a terrible lease clause. Highly recommend!",
    avatar: "SJ",
    date: "2 weeks ago"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Marketing Director",
    location: "Seattle, WA",
    rating: 5,
    review: "The AI search is incredible - it actually understood what I wanted. The virtual tours saved me hours of travel. The whole process was seamless and stress-free.",
    avatar: "MC",
    date: "1 month ago"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Graphic Designer",
    location: "Denver, CO",
    rating: 5,
    review: "As a first-time renter, I was overwhelmed. Rentivity Spark's legal library and expert support guided me through everything. I felt confident and protected throughout.",
    avatar: "ER",
    date: "3 weeks ago"
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Teacher",
    location: "Portland, OR", 
    rating: 5,
    review: "The community reviews were spot-on. I avoided several problematic landlords thanks to honest tenant feedback. Found an amazing place with a great landlord instead!",
    avatar: "DT",
    date: "1 week ago"
  },
  {
    id: 5,
    name: "Lisa Park",
    role: "Nurse",
    location: "San Diego, CA",
    rating: 5,
    review: "Working odd hours made apartment hunting impossible. The instant notifications and 24/7 platform access helped me secure a fantastic place on my schedule.",
    avatar: "LP",
    date: "2 months ago"
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Data Analyst",
    location: "Chicago, IL",
    rating: 5,
    review: "The price tracking feature helped me negotiate $200 off my monthly rent. The market insights gave me confidence in my negotiations. Saved thousands!",
    avatar: "JW",
    date: "3 months ago"
  }
]

export function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const reviewsToShow = 3 // Number of reviews to show at once
  const maxIndex = reviews.length - reviewsToShow

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, maxIndex])

  const nextReview = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    setIsAutoPlaying(false)
  }

  const prevReview = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
    setIsAutoPlaying(false)
  }

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? 'text-accent fill-accent' : 'text-muted-foreground'
          }`}
        />
      ))}
    </div>
  )

  return (
    <section ref={ref} className="py-32 px-4 relative overflow-hidden bg-muted/10">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 right-20 w-72 h-72 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl"
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
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              What Our Users Say
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what real users have to say 
            about their experience with Rentivity Spark.
          </p>
        </motion.div>

        {/* Reviews Slider */}
        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            onClick={prevReview}
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 
                     glass-button w-12 h-12 hover-lift hover-glow"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            onClick={nextReview}
            variant="ghost" 
            size="icon"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 
                     glass-button w-12 h-12 hover-lift hover-glow"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Reviews Container */}
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: -currentIndex * (100 / reviewsToShow) + "%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex"
              style={{ width: `${(reviews.length * 100) / reviewsToShow}%` }}
            >
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="section-3d p-8 mx-4 group relative overflow-hidden"
                  style={{ minWidth: `${100 / reviewsToShow}%` }}
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                >
                  {/* Quote Icon */}
                  <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20 group-hover:text-primary/40 transition-colors duration-300" />
                  
                  {/* Avatar and Info */}
                  <div className="flex items-center space-x-4 mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotateY: 15 }}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary 
                               flex items-center justify-center text-white font-bold text-lg"
                    >
                      {review.avatar}
                    </motion.div>
                    <div>
                      <h4 className="font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {review.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {review.role} • {review.location}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mb-4">
                    <StarRating rating={review.rating} />
                  </div>

                  {/* Review Text */}
                  <p className="text-muted-foreground leading-relaxed mb-4 italic">
                    "{review.review}"
                  </p>

                  {/* Date */}
                  <p className="text-sm text-muted-foreground">
                    {review.date}
                  </p>

                  {/* Hover Effect Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 
                                group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {[...Array(maxIndex + 1)].map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  setIsAutoPlaying(false)
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? 'bg-primary shadow-[0_0_10px_hsl(var(--shadow-glow-primary))]'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Overall Rating */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="glass-card p-8 max-w-md mx-auto">
            <div className="text-5xl font-bold text-glow bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              4.9/5
            </div>
            <div className="flex justify-center mb-4">
              <StarRating rating={5} />
            </div>
            <p className="text-muted-foreground">
              Based on 2,847 verified reviews
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}