// User API utility functions
export async function getTeknisyenler() {
  try {
    const response = await fetch('/api/users?role=teknisyen');
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error("Error fetching technicians:", error);
    return [];
  }
}

export async function getDanismanlar() {
  try {
    const response = await fetch('/api/users?role=danisman');
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error("Error fetching consultants:", error);
    return [];
  }
} 