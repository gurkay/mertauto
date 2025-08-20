import SignUpForm from "./signUpForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Mert Auto Servis | Üye Ol",
  description: "Mert Auto Servis Üye Ol Sayfası",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function SignUpPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }
  return (
    <div>
      Hi There
      <div>
        <SignUpForm />
      </div>
    </div>
  );
}
