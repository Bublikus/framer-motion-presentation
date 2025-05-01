import { Box, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.15,
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
    scale: 0.8,
    rotateX: -10
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      mass: 0.8
    }
  }
};

const MotionPaper = motion.create(Paper);

export default function Slide1() {
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
        style={{ width: '100%', textAlign: 'center' }}
      >
        <motion.div variants={itemVariants}>
          <Typography variant="h2" gutterBottom sx={{ mb: 4 }}>
            Framer Motion
          </Typography>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Typography variant="h4" gutterBottom color="primary" sx={{ mb: 3 }}>
            The Most Powerful Animation Library for React
          </Typography>
        </motion.div>

        <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', mt: 6 }}>
          {[
            'Simple API',
            'Powerful Features',
            'Production Ready'
          ].map((text, index) => (
            <motion.div key={text} variants={itemVariants}>
              <MotionPaper
                elevation={3}
                initial={false}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 10
                  }
                }}
                whileTap={{
                  scale: 0.95,
                  y: 5,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 10
                  }
                }}
                sx={{
                  p: 3,
                  minWidth: 200,
                  textAlign: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  transformOrigin: 'center center'
                }}
              >
                <Typography variant="h6">{text}</Typography>
              </MotionPaper>
            </motion.div>
          ))}
        </Box>
      </motion.div>
    </Box>
  );
} 