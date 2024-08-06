import React from 'react';
import { motion, type Transition, type Variants } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  className?: string;
  transition?: Transition;
  variants?: Variants;
  initial?: string;
  animate?: string;
}

const initTransition = {
  type: 'spring',
  stiffness: 100,
  damping: 10,
  when: 'beforeChildren',
  staggerChildren: 0.3,
};

const initVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

const TransitionLayout = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      children,
      className,
      transition = initTransition,
      variants = initVariants,
      initial = 'hidden',
      animate = 'visible',
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        {...props}
        initial={initial}
        animate={animate}
        variants={variants}
        transition={transition}
        className={className}
      >
        {children}
      </motion.div>
    );
  }
);

TransitionLayout.displayName = 'TransitionLayout';

export default TransitionLayout;
