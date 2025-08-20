// Helper function to fetch data with authorization
export async function fetchData(url: string, accessToken: string | undefined) {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${accessToken}`
        },
        // Consider adding caching strategy if appropriate (e.g., next: { revalidate: 3600 })
    });

    if (!response.ok) {
        // Handle HTTP errors (e.g., 4xx, 5xx)
        throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }
    return await response.json();
}