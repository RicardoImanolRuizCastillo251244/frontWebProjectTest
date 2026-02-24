// Datos dummy para deportes desde JSON (simulando una API real)
export const sportData = [
  
];

// Función para consumir los datos desde el JSON (como si fuera una API real)
export const fetchSports = async () => {
  try {
    const response = await fetch('/data/sports.json');
    if (!response.ok) throw new Error('Error al cargar deportes');
    return await response.json();
  } catch (error) {
    console.error('Error fetching sports:', error);
    // Fallback a datos locales en caso de error
    return sportData;
  }
};
