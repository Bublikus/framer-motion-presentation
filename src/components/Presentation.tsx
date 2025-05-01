import { useState, useRef, useEffect } from 'react';
import { Box, IconButton, Container } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import Slide1 from './slides/Slide1';
import Slide2 from './slides/Slide2';
import Slide3 from './slides/Slide3';

const SlideContainer = styled(Container)({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden'
});

const NavigationButton = styled(IconButton)({
  position: 'fixed',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 10
});

const MotionBox = motion.create(Box);

const SlideWrapper = styled(MotionBox)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  willChange: 'transform',
  transformStyle: 'preserve-3d',
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden'
});

const slides = [
  { component: Slide1, title: 'Introduction to Framer Motion' },
  { component: Slide2, title: 'Basic Animations' },
  { component: Slide3, title: 'Advanced Features' },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction >= 0 ? '100%' : '-100%',
    opacity: 0,
    rotateY: direction >= 0 ? 45 : -45,
    scale: 0.9,
    zIndex: 0,
    transition: {
      x: { type: "tween", duration: 0.5, ease: "easeInOut" },
      opacity: { duration: 0.3 },
      rotateY: { duration: 0.3 },
      scale: { duration: 0.3 }
    }
  }),
  center: {
    x: 0,
    opacity: 1,
    rotateY: 0,
    scale: 1,
    zIndex: 1,
    transition: {
      x: { 
        type: "spring",
        stiffness: 300,
        damping: 30,
        restDelta: 0.001
      },
      opacity: { duration: 0.4 },
      scale: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        restDelta: 0.001
      },
      rotateY: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        restDelta: 0.001
      }
    }
  },
  exit: (direction: number) => ({
    x: direction >= 0 ? '-40%' : '40%',
    opacity: 0,
    rotateY: direction >= 0 ? -25 : 25,
    scale: 0.8,
    zIndex: 0,
    transition: {
      x: { type: "tween", duration: 0.5, ease: "easeInOut" },
      opacity: { duration: 0.3, ease: "easeOut" },
      rotateY: { duration: 0.3, ease: "easeOut" },
      scale: { duration: 0.3, ease: "easeOut" }
    }
  })
};

const getInitialPage = () => {
  const params = new URLSearchParams(window.location.search);
  const slideParam = params.get('slide');
  const slideIndex = slideParam ? parseInt(slideParam, 10) - 1 : 0;
  return Math.min(Math.max(0, slideIndex), slides.length - 1);
};

export default function Presentation() {
  const [[page, direction], setPage] = useState([getInitialPage(), 0]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const paginate = (newDirection: number) => {
    if (isAnimating) return;
    
    const newPage = page + newDirection;
    if (newPage >= 0 && newPage < slides.length) {
      setIsAnimating(true);
      setPage([newPage, newDirection]);
      // Update URL without refreshing the page
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('slide', String(newPage + 1));
      window.history.pushState({}, '', newUrl);
    }
  };

  // Handle direct URL changes
  useEffect(() => {
    const handlePopState = () => {
      const currentPage = getInitialPage();
      const newDirection = currentPage > page ? 1 : -1;
      setPage([currentPage, newDirection]);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [page]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      paginate(1);
    } else if (event.key === 'ArrowLeft') {
      paginate(-1);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [page, isAnimating]);

  const CurrentSlide = slides[page].component;

  return (
    <SlideContainer maxWidth={false} disableGutters>
      <NavigationButton
        onClick={() => paginate(-1)}
        sx={{ left: 20 }}
        disabled={page === 0 || isAnimating}
      >
        <ChevronLeft />
      </NavigationButton>

      <Box 
        ref={containerRef}
        sx={{ 
          width: '100%', 
          height: '100%', 
          position: 'relative',
          perspective: '1200px',
          transformStyle: 'preserve-3d'
        }}
      >
        <AnimatePresence
          mode="popLayout" 
          initial={false} 
          custom={direction}
          onExitComplete={() => setIsAnimating(false)}
        >
          <SlideWrapper
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{
              transformOrigin: direction >= 0 ? 'left center' : 'right center'
            }}
          >
            <Box sx={{ 
              width: '100%',
              height: '100%',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <CurrentSlide />
            </Box>
          </SlideWrapper>
        </AnimatePresence>
      </Box>

      <NavigationButton
        onClick={() => paginate(1)}
        sx={{ right: 20 }}
        disabled={page === slides.length - 1 || isAnimating}
      >
        <ChevronRight />
      </NavigationButton>
    </SlideContainer>
  );
} 