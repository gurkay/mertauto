// Vehicle status API utility functions
export async function getAracDurumlar() {
  try {
    const response = await fetch('/api/arac-durumlar');
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error("Error fetching vehicle statuses:", error);
    return [];
  }
} 