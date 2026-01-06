import { SyncLoader } from 'react-spinners';
import { useEffect, useState } from 'react';

const FormLoader = () => {
  const [loaderColor, setLoaderColor] = useState('var(--text-color)');

  useEffect(() => {
    const root = document.documentElement;
    const color = getComputedStyle(root).getPropertyValue('--text-color').trim();
    setLoaderColor(color);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <SyncLoader
        color={loaderColor}
        loading={true}
        size={12}
        margin={5}
      />
    </div>
  );
};

export default FormLoader;
