import { Gift } from 'lucide-react';
import { FormData } from '@/types/wedding';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface GiftsSectionProps {
  formData: FormData;
  onGiftRegistryChange: (index: number, field: 'name' | 'url', value: string) => void;
  onAddGiftRegistry: () => void;
  onRemoveGiftRegistry: (index: number) => void;
  onNestedInputChange: (e: React.ChangeEvent<HTMLInputElement>, parent: keyof FormData, child: string, field: string) => void;
  onWishlistItemChange: (index: number, value: string) => void;
  onAddWishlistItem: () => void;
  onRemoveWishlistItem: (index: number) => void;
}

export const GiftsSection = ({
  formData,
  onGiftRegistryChange,
  onAddGiftRegistry,
  onRemoveGiftRegistry,
  onNestedInputChange,
  onWishlistItemChange,
  onAddWishlistItem,
  onRemoveWishlistItem
}: GiftsSectionProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center mb-4">
        <Gift className="mr-2 h-5 w-5" style={{ color: formData.themeColors.primary }} />
        <h2 className="text-xl font-medium" style={{ color: formData.themeColors.primary }}>
          Mesa de Regalos
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <Label>Tiendas Departamentales</Label>
            <Button 
              onClick={onAddGiftRegistry} 
              variant="outline" 
              size="sm"
              style={{ borderColor: formData.themeColors.secondary, color: formData.themeColors.primary }}
            >
              Añadir
            </Button>
          </div>
          
          <div className="space-y-3">
            {formData.giftsInfo.giftRegistries.map((registry, index) => (
              <div key={index} className="space-y-2">
                <div className="flex gap-2">
                  <Input 
                    value={registry.name} 
                    onChange={(e) => onGiftRegistryChange(index, 'name', e.target.value)}
                    placeholder="Nombre de la tienda"
                    className="flex-1"
                  />
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    onClick={() => onRemoveGiftRegistry(index)}
                  >
                    X
                  </Button>
                </div>
                <Input 
                  value={registry.url} 
                  onChange={(e) => onGiftRegistryChange(index, 'url', e.target.value)}
                  placeholder="URL del sitio web"
                />
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <Label className="mb-2 block">Datos Bancarios</Label>
          <div className="space-y-3">
            <div>
              <Label htmlFor="bankName" className="text-sm">Nombre del Banco</Label>
              <Input 
                id="bankName" 
                value={formData.giftsInfo.bankInfo.bank} 
                onChange={(e) => onNestedInputChange(e, 'giftsInfo', 'bankInfo', 'bank')}
              />
            </div>
            <div>
              <Label htmlFor="accountHolder" className="text-sm">Titular de la Cuenta</Label>
              <Input 
                id="accountHolder" 
                value={formData.giftsInfo.bankInfo.accountHolder} 
                onChange={(e) => onNestedInputChange(e, 'giftsInfo', 'bankInfo', 'accountHolder')}
              />
            </div>
            <div>
              <Label htmlFor="accountNumber" className="text-sm">Número de Cuenta / CLABE</Label>
              <Input 
                id="accountNumber" 
                value={formData.giftsInfo.bankInfo.accountNumber} 
                onChange={(e) => onNestedInputChange(e, 'giftsInfo', 'bankInfo', 'accountNumber')}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <Label>Lista de Deseos</Label>
          <Button 
            onClick={onAddWishlistItem} 
            variant="outline" 
            size="sm"
            style={{ borderColor: formData.themeColors.secondary, color: formData.themeColors.primary }}
          >
            Añadir
          </Button>
        </div>
        
        <div className="space-y-3">
          {formData.giftsInfo.wishlist.map((item, index) => (
            <div key={index} className="flex gap-2">
              <Input 
                value={item} 
                onChange={(e) => onWishlistItemChange(index, e.target.value)}
                placeholder="Elemento de la lista de deseos"
                className="flex-1"
              />
              <Button 
                variant="destructive" 
                size="icon" 
                onClick={() => onRemoveWishlistItem(index)}
              >
                X
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 