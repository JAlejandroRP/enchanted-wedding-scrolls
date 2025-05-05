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
    imageUrl?: string;
    mapIframe?: string;
  };
  receptionLocation: {
    name: string;
    address: string;
    time: string;
    mapUrl: string;
    imageUrl?: string;
    mapIframe?: string;
  };
  backgroundImageUrl: string;
  mobileBackgroundImageUrl?: string;
  galleryImages: string[];
  dressCode: {
    formalWear: string[];
    avoidColors: string[];
  };
  giftsInfo: {
    giftRegistries: Array<{name: string, url: string}>;
    bankInfo: {
      bank: string;
      accountHolder: string;
      accountNumber: string;
    };
    wishlist: string[];
  };
  themeColors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
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
    mapUrl: 'https://maps.google.com',
    imageUrl: 'https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2731&q=80',
    mapIframe: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3455.3557095756165!2d-101.00339072454566!3d22.999158715779458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d22c09b584903b%3A0xd13d019c5e0d427!2sCatedral%20de%20San%20Luis%20Potos%C3%AD!5e0!3m2!1ses-419!2smx!4v1683656191329!5m2!1ses-419!2smx" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
  },
  receptionLocation: {
    name: 'Salón de Eventos Club La Loma',
    address: 'Carretera Norte km 15, Ciudad',
    time: '18:00 hrs',
    mapUrl: 'https://maps.google.com',
    imageUrl: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2671&q=80',
    mapIframe: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18427.711817074403!2d-101.05742334766953!3d22.12035661713663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842a9963cb199a5d%3A0x11caaa03316b14b7!2sSal%C3%B3n%20de%20Eventos%20Club%20La%20Loma!5e1!3m2!1ses-419!2smx!4v1746476028675!5m2!1ses-419!2smx" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
  },
  backgroundImageUrl: 'https://i.pinimg.com/736x/dd/55/d9/dd55d91f2b11d742cc6cf24e5590d2f3.jpg',
  mobileBackgroundImageUrl: 'https://i.pinimg.com/736x/dd/55/d9/dd55d91f2b11d742cc6cf24e5590d2f3.jpg',
  galleryImages: [
    "https://i.pinimg.com/736x/e9/bb/fd/e9bbfd9f03acd634ff70a2a3e3af1157.jpg",
    "https://i.pinimg.com/736x/7f/59/8c/7f598cdfba265fe4367d75abe8468f95.jpg",
    "https://i.pinimg.com/736x/ce/9d/c3/ce9dc3c4081ccc762c1c928119405d89.jpg",
    "https://i.pinimg.com/736x/0e/a6/de/0ea6dee891335f18416a8b6cf9148445.jpg",
    "https://i.pinimg.com/736x/f2/89/81/f289810ccc03cca40b06eacd89177137.jpg",
    "https://i.pinimg.com/736x/88/a5/95/88a595f98f36abca34f5c8049163941b.jpg"
  ],
  dressCode: {
    formalWear: [
      "Hombres: Traje formal o smoking",
      "Mujeres: Vestido de cóctel o largo"
    ],
    avoidColors: [
      "Blanco (reservado para la novia)",
      "Negro completo",
      "Rojo intenso"
    ]
  },
  giftsInfo: {
    giftRegistries: [
      { name: "Liverpool", url: "#" },
      { name: "Palacio de Hierro", url: "#" },
      { name: "Amazon", url: "#" }
    ],
    bankInfo: {
      bank: "Ejemplo",
      accountHolder: "Nombres de los novios",
      accountNumber: "1234 5678 9012 3456"
    },
    wishlist: [
      "Electrodomésticos para el hogar",
      "Artículos de decoración",
      "Utensilios de cocina",
      "Experiencias para nuestra luna de miel"
    ]
  },
  themeColors: {
    primary: "#3E000C",
    secondary: "#D4B2A7", 
    accent: "#B3B792",
    background: "#E5E0D8"
  }
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
