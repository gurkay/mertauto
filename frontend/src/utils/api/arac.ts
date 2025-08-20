// Implement vehicle API utility functions
export async function getAracById(id: string) {
  if (!id) return null;
  try {
    const response = await fetch(`/api/araclar/${id}`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    return null;
  }
} 