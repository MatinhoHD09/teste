"use client"

import { useEffect, useRef, useState } from "react"

interface UseScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  reverseOnExit?: boolean
}

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const { threshold = 0.1, rootMargin = "0px 0px -100px 0px", triggerOnce = false, reverseOnExit = true } = options
  const [isVisible, setIsVisible] = useState(false)
  const [hasBeenVisible, setHasBeenVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setHasBeenVisible(true)
        } else {
          // Se reverseOnExit for true e o elemento já foi visto, anima saída
          if (reverseOnExit && hasBeenVisible) {
            setIsVisible(false)
          }
          // Se triggerOnce for true, não faz nada na saída
          else if (!triggerOnce) {
            setIsVisible(false)
          }
        }
      },
      {
        threshold,
        rootMargin,
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold, rootMargin, triggerOnce, reverseOnExit, hasBeenVisible])

  return { ref, isVisible, hasBeenVisible }
}
