import { FormData } from '@/types/wedding';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface DressCodeSectionProps {
  formData: FormData;
  onDressCodeItemChange: (index: number, value: string, type: 'formalWear' | 'avoidColors') => void;
  onAddDressCodeItem: (type: 'formalWear' | 'avoidColors') => void;
  onRemoveDressCodeItem: (index: number, type: 'formalWear' | 'avoidColors') => void;
}

export const DressCodeSection = ({
  formData,
  onDressCodeItemChange,
  onAddDressCodeItem,
  onRemoveDressCodeItem
}: DressCodeSectionProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-medium mb-4" style={{ color: formData.themeColors.primary }}>
        Código de Vestimenta
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <Label>Vestimenta Formal</Label>
            <Button 
              onClick={() => onAddDressCodeItem('formalWear')} 
              variant="outline" 
              size="sm"
              style={{ borderColor: formData.themeColors.secondary, color: formData.themeColors.primary }}
            >
              Añadir
            </Button>
          </div>
          
          <div className="space-y-3">
            {formData.dressCode.formalWear.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input 
                  value={item} 
                  onChange={(e) => onDressCodeItemChange(index, e.target.value, 'formalWear')}
                  placeholder="Ej. Hombres: Traje formal"
                  className="flex-1"
                />
                <Button 
                  variant="destructive" 
                  size="icon" 
                  onClick={() => onRemoveDressCodeItem(index, 'formalWear')}
                >
                  X
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <Label>Colores a Evitar</Label>
            <Button 
              onClick={() => onAddDressCodeItem('avoidColors')} 
              variant="outline" 
              size="sm"
              style={{ borderColor: formData.themeColors.secondary, color: formData.themeColors.primary }}
            >
              Añadir
            </Button>
          </div>
          
          <div className="space-y-3">
            {formData.dressCode.avoidColors.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input 
                  value={item} 
                  onChange={(e) => onDressCodeItemChange(index, e.target.value, 'avoidColors')}
                  placeholder="Ej. Blanco (reservado para la novia)"
                  className="flex-1"
                />
                <Button 
                  variant="destructive" 
                  size="icon" 
                  onClick={() => onRemoveDressCodeItem(index, 'avoidColors')}
                >
                  X
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 