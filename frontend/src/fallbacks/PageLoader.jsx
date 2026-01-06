import { PropagateLoader } from 'react-spinners';
import { useEffect, useState } from 'react';

const PageLoader = () => {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(true);
  const [spinnerSize, setSpinnerSize] = useState(12);

  const handleResize = () => {
    const width = window.innerWidth;
    if (width < 640) setSpinnerSize(12);      
    else if (width < 1024) setSpinnerSize(16); 
    else setSpinnerSize(20);            
  };

  useEffect(() => {
    handleResize(); 
    window.addEventListener('resize', handleResize);

    const hideTimer = setTimeout(() => setVisible(false), 400);
    const unmountTimer = setTimeout(() => setMounted(false), 650);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(unmountTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`
        fixed inset-0 z-[9999]
        flex items-center justify-center
        min-h-screen w-full
        transition-opacity duration-300 ease-out
        ${visible ? 'opacity-100' : 'opacity-0'}
      `}
    >
      <PropagateLoader
        color="white"
        size={spinnerSize}
        margin={5}
      />
    </div>
  );
};

export default PageLoader;
