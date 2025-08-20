
export async function apiAuthSignUp(credentials: {
  email: string;
  password: string;
}) {
  try {
    console.log(`backendSignUp:::${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`);
    console.log("credentials", credentials);
    // TODO: backend url'i değiştir container-to-container için NEXT_PUBLIC_BACKEND_API_URL kullan
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    console.log("credentials", credentials);
    if (!response.ok) {
      return new Error("Sign-up failed");
    }

    const data = await response.json();
    console.log("data", data);
    if (data.error) {
      return { error: data.message };
    }

    return data; // Return the response data on successful sign-up
  } catch (error) {

    console.log((error as Error)?.message, "No connection to Backend");
    return error;
  }

}
export const BAPI = process.env.NEXT_PUBLIC_BACKEND_API_URL as string;
export const Token = process.env.BEARER as string;
