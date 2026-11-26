import { useCallback, useEffect, useRef, useState } from 'react';
import './ScrollBox.css';

const ScrollBox = ({ children, color }) => {
  const scrollRef = useRef(null);
  const [scrollState, setScrollState] = useState({
    canScrollUp: false,
    canScrollDown: false,
  });

  const updateScrollMasks = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const tolerance = 4;
    const canScrollUp = el.scrollTop > tolerance;
    const canScrollDown =
      el.scrollTop + el.clientHeight < el.scrollHeight - tolerance;

    setScrollState((prev) =>
      prev.canScrollUp === canScrollUp && prev.canScrollDown === canScrollDown
        ? prev
        : { canScrollUp, canScrollDown },
    );
  }, []);

  useEffect(() => {
    updateScrollMasks();
    window.addEventListener('resize', updateScrollMasks);
    return () => window.removeEventListener('resize', updateScrollMasks);
  }, [children, updateScrollMasks]);

  const classes = [
    'scroll-container',
    scrollState.canScrollUp && 'can-scroll-up',
    scrollState.canScrollDown && 'can-scroll-down',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={scrollRef}
      onScroll={updateScrollMasks}
      className={classes}
      scroll-color={color}
    >
      {children}
    </div>
  );
};

export default ScrollBox;
