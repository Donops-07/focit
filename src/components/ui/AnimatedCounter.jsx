import { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

/**
 * AnimatedCounter
 * 
 * High-performance count-up animation component.
 * Uses requestAnimationFrame and direct DOM mutation to bypass React's render cycle,
 * preventing VDOM diffing overhead during the 60fps animation.
 */
export function AnimatedCounter({ 
  value, 
  duration = 2000, 
  prefix = "", 
  suffix = "", 
  start = false,
  className 
}) {
  const textRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    // Don't animate until told to start, and ensure we have a ref
    if (!start || !textRef.current) return;
    
    // Safety check for invalid targets
    const target = parseInt(value, 10);
    if (isNaN(target) || target <= 0) {
      textRef.current.textContent = `${prefix}${target || 0}${suffix}`;
      return;
    }

    let startTime = null;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // easeOutQuart easing function
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeProgress * target);
      
      // DIRECT DOM MUTATION: Bypasses React reconciliation
      textRef.current.textContent = `${prefix}${currentCount}${suffix}`;

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        // Ensure final exact value
        textRef.current.textContent = `${prefix}${target}${suffix}`;
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [value, duration, start, prefix, suffix]);

  // Screen reader only text for accessibility
  const srText = `${prefix}${value}${suffix}`;

  return (
    <span className={cn("inline-block tabular-nums", className)}>
      <span className="sr-only">{srText}</span>
      <span aria-hidden="true" ref={textRef}>
        {prefix}0{suffix}
      </span>
    </span>
  );
}
