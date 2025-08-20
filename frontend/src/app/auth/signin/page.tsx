import SignInForm from "./signInForm";
export const metadata = {
  title: "Mert Auto Servis | Giriş Yap",
  description: "Mert Auto Servis Giriş Sayfası",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-3xl font-bold text-gray-900">Mert Auto Servis</h2>
        <SignInForm />
      </div>
    </div>
  );
}
