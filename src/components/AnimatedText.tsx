import { useRef, type CSSProperties } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
}

export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const chars = text.split('');

  return (
    <p ref={ref} className={`relative ${className ?? ''}`} style={style}>
      {chars.map((char, i) => {
        const progress = useTransform(
          scrollYProgress,
          [0, 1],
          [0.2, 0.2 + (1 / chars.length) * (i + 1)]
        );
        const opacity = useTransform(progress, [0.2, 1], [0.2, 1]);

        return (
          <span key={i} className="relative inline-block">
            <span className="invisible">{char}</span>
            <motion.span
              className="absolute inset-0"
              style={{ opacity }}
            >
              {char}
            </motion.span>
          </span>
        );
      })}
    </p>
  );
}
