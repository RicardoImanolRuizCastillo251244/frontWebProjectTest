// Datos dummy para ubicaciones desde JSON (simulando una API real)
export const locationData = [
  
];

// Función para consumir los datos desde el JSON (como si fuera una API real)
export const fetchLocations = async () => {
  try {
    const response = await fetch('/data/locations.json');
    if (!response.ok) throw new Error('Error al cargar ubicaciones');
    return await response.json();
  } catch (error) {
    console.error('Error fetching locations:', error);
    // Fallback a datos locales en caso de error
    return locationData;
  }
};
