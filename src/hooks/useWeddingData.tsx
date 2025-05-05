
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the wedding data types
export interface WeddingData {
  brideFirstName: string;
  brideLastName: string;
  groomFirstName: string;
  groomLastName: string;
  weddingDate: Date;
  ceremonyLocation: {
    name: string;
    address: string;
    time: string;
    mapUrl: string;
  };
  receptionLocation: {
    name: string;
    address: string;
    time: string;
    mapUrl: string;
  };
  backgroundImageUrl: string;
  galleryImages: string[];
}

// Default wedding data
const defaultWeddingData: WeddingData = {
  brideFirstName: 'Elena',
  brideLastName: 'García',
  groomFirstName: 'Juan',
  groomLastName: 'López',
  weddingDate: new Date('2025-05-15T16:00:00'),
  ceremonyLocation: {
    name: 'Catedral de Santa María',
    address: 'Calle Principal 123, Ciudad',
    time: '16:00 hrs',
    mapUrl: 'https://maps.google.com'
  },
  receptionLocation: {
    name: 'Hacienda Los Laureles',
    address: 'Carretera Norte km 15, Ciudad',
    time: '18:00 hrs',
    mapUrl: 'https://maps.google.com'
  },
  backgroundImageUrl: 'https://i.pinimg.com/736x/dd/55/d9/dd55d91f2b11d742cc6cf24e5590d2f3.jpg',
  galleryImages: [
    "https://i.pinimg.com/736x/e9/bb/fd/e9bbfd9f03acd634ff70a2a3e3af1157.jpg",
    "https://i.pinimg.com/736x/7f/59/8c/7f598cdfba265fe4367d75abe8468f95.jpg",
    "https://i.pinimg.com/736x/ce/9d/c3/ce9dc3c4081ccc762c1c928119405d89.jpg",
    "https://i.pinimg.com/736x/0e/a6/de/0ea6dee891335f18416a8b6cf9148445.jpg",
    "https://i.pinimg.com/736x/f2/89/81/f289810ccc03cca40b06eacd89177137.jpg",
    "https://i.pinimg.com/736x/88/a5/95/88a595f98f36abca34f5c8049163941b.jpg"
  ]
};

interface WeddingDataContextType {
  weddingData: WeddingData;
  updateWeddingData: (data: Partial<WeddingData>) => void;
  resetWeddingData: () => void;
}

const WeddingDataContext = createContext<WeddingDataContextType | undefined>(undefined);

export const WeddingDataProvider = ({ children }: { children: ReactNode }) => {
  const [weddingData, setWeddingData] = useState<WeddingData>(() => {
    // Try to load from localStorage
    const savedData = localStorage.getItem('weddingData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // Convert string date back to Date object
        return {
          ...parsedData,
          weddingDate: new Date(parsedData.weddingDate)
        };
      } catch (error) {
        console.error('Error parsing wedding data from localStorage:', error);
        return defaultWeddingData;
      }
    }
    return defaultWeddingData;
  });

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('weddingData', JSON.stringify(weddingData));
  }, [weddingData]);

  const updateWeddingData = (data: Partial<WeddingData>) => {
    setWeddingData(prev => ({
      ...prev,
      ...data,
    }));
  };

  const resetWeddingData = () => {
    setWeddingData(defaultWeddingData);
  };

  return (
    <WeddingDataContext.Provider value={{ weddingData, updateWeddingData, resetWeddingData }}>
      {children}
    </WeddingDataContext.Provider>
  );
};

export const useWeddingData = () => {
  const context = useContext(WeddingDataContext);
  if (context === undefined) {
    throw new Error('useWeddingData must be used within a WeddingDataProvider');
  }
  return context;
};
