import { useState } from 'react';
import { WeddingData, FormData, Location, GiftsInfo, DressCode, ThemeColors } from '@/types/wedding';

export const useWeddingForm = (initialData: WeddingData) => {
  const [formData, setFormData] = useState<FormData>({
    ...initialData,
    ceremonyLocation: { ...initialData.ceremonyLocation },
    receptionLocation: { ...initialData.receptionLocation },
    galleryImages: [...initialData.galleryImages],
    dressCode: {
      formalWear: [...initialData.dressCode.formalWear],
      avoidColors: [...initialData.dressCode.avoidColors]
    },
    giftsInfo: {
      giftRegistries: [...initialData.giftsInfo.giftRegistries.map(item => ({...item}))],
      bankInfo: {...initialData.giftsInfo.bankInfo},
      wishlist: [...initialData.giftsInfo.wishlist]
    },
    themeColors: {...initialData.themeColors}
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof FormData, nestedField?: string) => {
    if (nestedField) {
      setFormData(prev => {
        const currentValue = prev[field];
        if (typeof currentValue === 'object' && currentValue !== null) {
          return {
            ...prev,
            [field]: {
              ...currentValue,
              [nestedField]: e.target.value
            }
          };
        }
        return prev;
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: e.target.value
      }));
    }
  };

  const handleNestedInputChange = (
    e: React.ChangeEvent<HTMLInputElement>, 
    parent: keyof FormData, 
    child: string, 
    field: string
  ) => {
    setFormData(prev => {
      const parentValue = prev[parent];
      if (typeof parentValue === 'object' && parentValue !== null) {
        const childValue = ((parentValue as unknown) as { [key: string]: unknown })[child];
        if (typeof childValue === 'object' && childValue !== null) {
          return {
            ...prev,
            [parent]: {
              ...parentValue,
              [child]: {
                ...childValue,
                [field]: e.target.value
              }
            }
          };
        }
      }
      return prev;
    });
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setFormData(prev => ({
        ...prev,
        weddingDate: date
      }));
    }
  };

  const handleGalleryImageChange = (index: number, value: string) => {
    const newGalleryImages = [...formData.galleryImages];
    newGalleryImages[index] = value;
    setFormData(prev => ({
      ...prev,
      galleryImages: newGalleryImages
    }));
  };

  const handleAddGalleryImage = () => {
    setFormData(prev => ({
      ...prev,
      galleryImages: [...prev.galleryImages, ""]
    }));
  };

  const handleRemoveGalleryImage = (index: number) => {
    const newGalleryImages = [...formData.galleryImages];
    newGalleryImages.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      galleryImages: newGalleryImages
    }));
  };

  const handleDressCodeItemChange = (index: number, value: string, type: 'formalWear' | 'avoidColors') => {
    const newItems = [...formData.dressCode[type]];
    newItems[index] = value;
    setFormData(prev => ({
      ...prev,
      dressCode: {
        ...prev.dressCode,
        [type]: newItems
      }
    }));
  };

  const handleAddDressCodeItem = (type: 'formalWear' | 'avoidColors') => {
    setFormData(prev => ({
      ...prev,
      dressCode: {
        ...prev.dressCode,
        [type]: [...prev.dressCode[type], ""]
      }
    }));
  };

  const handleRemoveDressCodeItem = (index: number, type: 'formalWear' | 'avoidColors') => {
    const newItems = [...formData.dressCode[type]];
    newItems.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      dressCode: {
        ...prev.dressCode,
        [type]: newItems
      }
    }));
  };

  const handleGiftRegistryChange = (index: number, field: 'name' | 'url', value: string) => {
    const newRegistries = [...formData.giftsInfo.giftRegistries];
    newRegistries[index] = {
      ...newRegistries[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      giftsInfo: {
        ...prev.giftsInfo,
        giftRegistries: newRegistries
      }
    }));
  };

  const handleAddGiftRegistry = () => {
    setFormData(prev => ({
      ...prev,
      giftsInfo: {
        ...prev.giftsInfo,
        giftRegistries: [...prev.giftsInfo.giftRegistries, { name: "", url: "" }]
      }
    }));
  };

  const handleRemoveGiftRegistry = (index: number) => {
    const newRegistries = [...formData.giftsInfo.giftRegistries];
    newRegistries.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      giftsInfo: {
        ...prev.giftsInfo,
        giftRegistries: newRegistries
      }
    }));
  };

  const handleWishlistItemChange = (index: number, value: string) => {
    const newWishlist = [...formData.giftsInfo.wishlist];
    newWishlist[index] = value;
    setFormData(prev => ({
      ...prev,
      giftsInfo: {
        ...prev.giftsInfo,
        wishlist: newWishlist
      }
    }));
  };

  const handleAddWishlistItem = () => {
    setFormData(prev => ({
      ...prev,
      giftsInfo: {
        ...prev.giftsInfo,
        wishlist: [...prev.giftsInfo.wishlist, ""]
      }
    }));
  };

  const handleRemoveWishlistItem = (index: number) => {
    const newWishlist = [...formData.giftsInfo.wishlist];
    newWishlist.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      giftsInfo: {
        ...prev.giftsInfo,
        wishlist: newWishlist
      }
    }));
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>, colorKey: keyof FormData['themeColors']) => {
    setFormData(prev => ({
      ...prev,
      themeColors: {
        ...prev.themeColors,
        [colorKey]: e.target.value
      }
    }));
  };

  const resetForm = (initialData: WeddingData) => {
    setFormData({
      ...initialData,
      ceremonyLocation: { ...initialData.ceremonyLocation },
      receptionLocation: { ...initialData.receptionLocation },
      galleryImages: [...initialData.galleryImages],
      dressCode: {
        formalWear: [...initialData.dressCode.formalWear],
        avoidColors: [...initialData.dressCode.avoidColors]
      },
      giftsInfo: {
        giftRegistries: [...initialData.giftsInfo.giftRegistries.map(item => ({...item}))],
        bankInfo: {...initialData.giftsInfo.bankInfo},
        wishlist: [...initialData.giftsInfo.wishlist]
      },
      themeColors: {...initialData.themeColors}
    });
  };

  return {
    formData,
    handleInputChange,
    handleNestedInputChange,
    handleDateSelect,
    handleGalleryImageChange,
    handleAddGalleryImage,
    handleRemoveGalleryImage,
    handleDressCodeItemChange,
    handleAddDressCodeItem,
    handleRemoveDressCodeItem,
    handleGiftRegistryChange,
    handleAddGiftRegistry,
    handleRemoveGiftRegistry,
    handleWishlistItemChange,
    handleAddWishlistItem,
    handleRemoveWishlistItem,
    handleColorChange,
    resetForm
  };
}; 