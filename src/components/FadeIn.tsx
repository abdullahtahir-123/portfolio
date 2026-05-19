import { motion } from 'framer-motion';
import type { ElementType, ReactNode, ComponentPropsWithoutRef } from 'react';

interface FadeInProps<T extends ElementType> {
  as?: T;
  children?: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
}

type Props<T extends ElementType> = FadeInProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof FadeInProps<T>>;

export default function FadeIn<T extends ElementType = 'div'>({
  as,
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
  ...rest
}: Props<T>) {
  const Tag = as || 'div';
  const MotionTag = motion.create(Tag);

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
