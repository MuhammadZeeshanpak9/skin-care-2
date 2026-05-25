import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from '@/lib/animations';

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  animate?: boolean;
  delay?: number;
  children: React.ReactNode;
}

export function Display({
  className,
  animate = false,
  delay = 0,
  children,
  ...props
}: TypographyProps) {
  if (animate) {
    return (
      <motion.h1
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeUp(delay)}
        className={cn(
          'font-cormorant font-light text-display text-text-primary',
          className
        )}
        {...(props as any)}
      >
        {children}
      </motion.h1>
    );
  }
  return (
    <h1
      className={cn(
        'font-cormorant font-light text-display text-text-primary',
        className
      )}
      {...(props as any)}
    >
      {children}
    </h1>
  );
}

export function H1({
  className,
  animate = false,
  delay = 0,
  children,
  ...props
}: TypographyProps) {
  if (animate) {
    return (
      <motion.h1
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeUp(delay)}
        className={cn(
          'font-cormorant font-light text-h1 text-text-primary tracking-[-0.02em]',
          className
        )}
        {...(props as any)}
      >
        {children}
      </motion.h1>
    );
  }
  return (
    <h1
      className={cn(
        'font-cormorant font-light text-h1 text-text-primary tracking-[-0.02em]',
        className
      )}
      {...(props as any)}
    >
      {children}
    </h1>
  );
}

export function H2({
  className,
  animate = false,
  delay = 0,
  children,
  ...props
}: TypographyProps) {
  if (animate) {
    return (
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeUp(delay)}
        className={cn(
          'font-cormorant text-h2 text-text-primary',
          className
        )}
        {...(props as any)}
      >
        {children}
      </motion.h2>
    );
  }
  return (
    <h2
      className={cn(
        'font-cormorant text-h2 text-text-primary',
        className
      )}
      {...(props as any)}
    >
      {children}
    </h2>
  );
}

export function H3({
  className,
  animate = false,
  delay = 0,
  children,
  ...props
}: TypographyProps) {
  if (animate) {
    return (
      <motion.h3
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeUp(delay)}
        className={cn(
          'font-cormorant text-h3 text-text-primary',
          className
        )}
        {...(props as any)}
      >
        {children}
      </motion.h3>
    );
  }
  return (
    <h3
      className={cn(
        'font-cormorant text-h3 text-text-primary',
        className
      )}
      {...(props as any)}
    >
      {children}
    </h3>
  );
}

export function Body({
  className,
  animate = false,
  delay = 0,
  children,
  ...props
}: TypographyProps) {
  if (animate) {
    return (
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeUp(delay)}
        className={cn(
          'font-jost font-light text-base leading-relaxed text-text-muted',
          className
        )}
        {...(props as any)}
      >
        {children}
      </motion.p>
    );
  }
  return (
    <p
      className={cn(
        'font-jost font-light text-base leading-relaxed text-text-muted',
        className
      )}
      {...(props as any)}
    >
      {children}
    </p>
  );
}

export function BodyLarge({
  className,
  animate = false,
  delay = 0,
  children,
  ...props
}: TypographyProps) {
  if (animate) {
    return (
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeUp(delay)}
        className={cn(
          'font-jost font-light text-body-lg leading-relaxed text-text-muted',
          className
        )}
        {...(props as any)}
      >
        {children}
      </motion.p>
    );
  }
  return (
    <p
      className={cn(
        'font-jost font-light text-body-lg leading-relaxed text-text-muted',
        className
      )}
      {...(props as any)}
    >
      {children}
    </p>
  );
}

export function Caption({
  className,
  animate = false,
  delay = 0,
  children,
  ...props
}: TypographyProps) {
  if (animate) {
    return (
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeUp(delay)}
        className={cn(
          'font-jost font-normal text-xs text-text-light tracking-wide',
          className
        )}
        {...(props as any)}
      >
        {children}
      </motion.span>
    );
  }
  return (
    <span
      className={cn(
        'font-jost font-normal text-xs text-text-light tracking-wide',
        className
      )}
      {...(props as any)}
    >
      {children}
    </span>
  );
}

export function Overline({
  className,
  animate = false,
  delay = 0,
  children,
  ...props
}: TypographyProps) {
  if (animate) {
    return (
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeUp(delay)}
        className={cn(
          'overline text-text-light block',
          className
        )}
        {...(props as any)}
      >
        {children}
      </motion.span>
    );
  }
  return (
    <span
      className={cn(
        'overline text-text-light block',
        className
      )}
      {...(props as any)}
    >
      {children}
    </span>
  );
}
