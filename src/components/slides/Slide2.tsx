import { Box, Typography } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';

const AnimationDemo = ({ title, animate }: { title: string; animate: any }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (isAnimating) {
      controls.start(animate).then(() => {
        setIsAnimating(false);
        controls.start("idle");
      });
    }
  }, [isAnimating, animate, controls]);

  const boxVariants = {
    idle: {
      scale: 1,
      rotate: 0,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95,
      rotate: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <Box sx={{ textAlign: 'center', mb: 4, width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <motion.div
        variants={boxVariants}
        initial="idle"
        animate={controls}
        whileHover={!isAnimating ? "hover" : undefined}
        whileTap={!isAnimating ? "tap" : undefined}
        onClick={() => !isAnimating && setIsAnimating(true)}
        style={{
          width: 100,
          height: 100,
          backgroundColor: '#90caf9',
          borderRadius: 10,
          margin: 'auto',
          cursor: isAnimating ? 'default' : 'pointer',
          transformOrigin: 'center center'
        }}
      />
    </Box>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  }
};

const itemVariants = {
  hidden: { 
    y: 50,
    opacity: 0,
    scale: 0.8
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  }
};

export default function Slide2() {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        perspective: '1000px'
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Typography variant="h3" gutterBottom sx={{ mb: 6, textAlign: 'center' }}>
            Basic Animations
          </Typography>
        </motion.div>

        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 16, 
            justifyContent: 'center',
            width: '100%',
            maxWidth: 1200
          }}
        >
          <motion.div variants={itemVariants}>
            <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
              <AnimationDemo
                title="Rotate"
                animate={{
                  rotate: [0, 360],
                  transition: {
                    duration: 1,
                    ease: "easeInOut",
                    times: [0, 1],
                    repeat: 1,
                    repeatType: "reverse"
                  }
                }}
              />
            </Box>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
              <AnimationDemo
                title="Scale"
                animate={{
                  scale: [1, 2, 2, 1],
                  transition: {
                    duration: 1,
                    times: [0, 0.4, 0.6, 1],
                    ease: "easeInOut"
                  }
                }}
              />
            </Box>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
              <AnimationDemo
                title="Move"
                animate={{
                  x: [0, 100, 100, 0],
                  y: [0, 0, 50, 0],
                  transition: {
                    duration: 1.5,
                    times: [0, 0.3, 0.7, 1],
                    ease: "easeInOut"
                  }
                }}
              />
            </Box>
          </motion.div>
        </Box>
      </motion.div>

      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <Typography
          variant="body1"
          sx={{ mt: 4, textAlign: 'center', color: 'text.secondary' }}
        >
          Click on any box to see the animation in action!
        </Typography>
      </motion.div>
    </Box>
  );
} 