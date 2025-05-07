
export const parseCSV = (csv: string): Array<{ name: string; phone?: string; passes: number }> => {
  try {
    const lines = csv.split('\n').filter(line => line.trim() !== '');
    
    return lines.map(line => {
      const [name = '', phone = '', passesStr = '1'] = line.split(',').map(item => item.trim());
      const passes = parseInt(passesStr, 10) || 1; // Default to 1 if not valid number
      
      return {
        name,
        phone: phone || undefined,
        passes
      };
    }).filter(guest => guest.name !== ''); // Filter out entries without names
  } catch (error) {
    console.error('Error parsing CSV:', error);
    return [];
  }
};
