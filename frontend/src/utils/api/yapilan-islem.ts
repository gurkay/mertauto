// Service operations API utility functions
export async function getYapilanIslemler() {
  try {
    const response = await fetch('/api/yapilan-islemler');
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error("Error fetching service operations:", error);
    return [];
  }
} 