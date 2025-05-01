import { Box, Typography, Paper } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useState, useRef, useLayoutEffect, useEffect } from 'react';

const DraggableBox = () => {
  const [isDragging, setDragging] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      setIsReady(true);
    });

    return () => {
      setIsReady(false);
    };
  }, []);

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <motion.div
        ref={boxRef}
        style={{
          width: 100,
          height: 100,
          backgroundColor: '#f48fb1',
          borderRadius: '20%',
          cursor: isDragging ? 'grabbing' : 'grab',
          position: 'relative'
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: 1,
          scale: isDragging ? 1.2 : 1,
          rotate: isDragging ? [-2, 2] : 0,
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 20,
            rotate: {
              duration: 0.2,
              repeat: Infinity,
              repeatType: "reverse"
            }
          }
        }}
        drag={isReady}
        dragConstraints={{
          top: -80,
          left: -120,
          right: 120,
          bottom: 80
        }}
        dragElastic={0.8}
        dragTransition={{ 
          bounceStiffness: 400,
          bounceDamping: 20 
        }}
        onDragStart={() => setDragging(true)}
        onDragEnd={() => setDragging(false)}
        whileHover={isReady ? { 
          scale: 1.1,
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 10
          }
        } : undefined}
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

const KeyframeBox = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const springControls = useAnimation();

  useEffect(() => {
    return () => {
      controls.stop();
      springControls.stop();
    };
  }, [controls, springControls]);

  const startAnimation = async () => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    controls.stop();
    springControls.stop();

    requestAnimationFrame(async () => {
      await controls.start({
        scale: [1, 2, 2, 1],
        rotate: [0, 0, 270, 0],
        borderRadius: ["20%", "20%", "50%", "20%"],
        transition: { 
        duration: 2,
        times: [0, 0.4, 0.8, 1],
          ease: "easeInOut"
        }
      });

      setIsPlaying(false);
    });
  };

  return (
    <motion.div
      animate={springControls}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <motion.div
        initial={{ scale: 1, rotate: 0, borderRadius: "20%" }}
        animate={isPlaying ? controls : { scale: isHovered ? 1.1 : 1 }}
        onClick={isPlaying ? undefined : startAnimation}
        onHoverStart={() => {
          setIsHovered(true);
          if (!isPlaying) {
            springControls.start({ scale: 1.1 });
          }
        }}
        onHoverEnd={() => {
          setIsHovered(false);
          if (!isPlaying) {
            springControls.start({ scale: 1 });
          }
        }}
        style={{
          width: 100,
          height: 100,
          backgroundColor: '#90caf9',
          cursor: isPlaying ? 'default' : 'pointer',
          borderRadius: '20%',
          originX: 0.5,
          originY: 0.5
        }}
        whileHover={!isPlaying ? {
          rotate: 5,
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 10
          }
        } : undefined}
        whileTap={!isPlaying ? {
          rotate: -5,
          scale: 0.95
        } : undefined}
      />
    </motion.div>
  );
};

export default function Slide3() {
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
            Advanced Features
          </Typography>
        </motion.div>

        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
          <motion.div variants={itemVariants}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                width: 400,
                height: 400,
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.05)'
              }}
            >
              <Typography variant="h6" gutterBottom>
                Keyframe Animations
              </Typography>
              <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <KeyframeBox />
              </Box>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Click to start animation
              </Typography>
            </Paper>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                width: 400,
                height: 400,
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                position: 'relative'
              }}
            >
              <Typography variant="h6" gutterBottom>
                Drag & Gesture
              </Typography>
              <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <DraggableBox />
              </Box>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Drag me around!
              </Typography>
            </Paper>
          </motion.div>
        </Box>
      </motion.div>
    </Box>
  );
} 