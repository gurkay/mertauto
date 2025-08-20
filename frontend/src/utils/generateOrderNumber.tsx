export function generateOrderNumber() {
    const now = new Date();
    const datePart = now.toISOString().split('T')[0]; // "2025-05-04"
  
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase(); // 6 karakter (harf + rakam)
  
    return `${datePart}-${randomPart}`;
  }