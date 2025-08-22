"use client";
import { signIn, SignInResponse } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function SignInForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = "Email adresi gereklidir";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Geçerli bir email adresi giriniz";
    }

    if (!formData.password) {
      newErrors.password = "Şifre gereklidir";
    } else if (formData.password.length < 6) {
      newErrors.password = "Şifre en az 6 karakter olmalıdır";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSignInError = (error: string | null | undefined): void => {
    let message = "Giriş başarısız oldu";
    
    switch (error) {
      case "CredentialsSignin":
        message = "Email veya şifre hatalı";
        break;
      case "Configuration":
        message = "Sistem konfigürasyon hatası";
        break;
      case "AccessDenied":
        message = "Erişim engellendi";
        break;
      case "Verification":
        message = "Doğrulama hatası";
        break;
      default:
        message = error || "Bilinmeyen bir hata oluştu";
    }
    
    setErrors({ general: message });
    toast.error(message);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const result: SignInResponse | undefined = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (!result) {
        setErrors({ general: "Giriş işlemi başlatılamadı" });
        toast.error("Giriş işlemi başlatılamadı");
        return;
      }

      if (!result.ok) {
        handleSignInError(result.error);
        return;
      }

      // Success
      toast.success("Giriş başarılı! Yönlendiriliyorsunuz...");
      
      // Use Next.js router for navigation instead of window.location
      router.push('/dashboard');
      
    } catch (error) {
      console.error('SignIn error:', error);
      setErrors({ general: "Beklenmeyen bir hata oluştu" });
      toast.error("Beklenmeyen bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-md p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Giriş Yap</h1>
      
      {errors.general && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black transition-colors ${
                errors.email 
                  ? 'border-red-500 bg-red-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              type="email"
              name="email"
              id="email"
              placeholder="E-postanızı giriniz"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Şifre
            </label>
            <input
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black transition-colors ${
                errors.password 
                  ? 'border-red-500 bg-red-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              type="password"
              name="password"
              id="password"
              placeholder="Şifrenizi giriniz"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              disabled={isLoading}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>
        </div>
        
        <button
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Giriş Yapılıyor...
            </div>
          ) : (
            "Giriş Yap"
          )}
        </button>
      </form>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        toastClassName="text-sm"
      />
    </div>
  );
}
