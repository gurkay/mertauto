import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DefaultSession } from "next-auth";
import { getServerSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    accessToken?: string;
    roles?: string[];
  }
  
  interface Session {
    user: {
      id?: string;
      accessToken?: string;
      roles?: string[];
    } & DefaultSession["user"]
  }

  interface JWT {
    id?: string;
    accessToken?: string;
    roles?: string[];
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          console.error('[Auth] Email veya şifre boş');
          throw new Error('Email ve şifre gereklidir');
        }

        try {
          // Production ortamında doğru URL'yi kullan
          let apiUrl;
          if (typeof window === 'undefined') {
            // Server-side rendering durumunda (Docker içinde)
            if (process.env.NODE_ENV === 'production') {
              apiUrl = 'http://spring-backend:8080'; // Direct container-to-container communication
            } else {
              apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:8080';
            }
            console.log('[Auth] Server-side giriş URL yapısı kullanılıyor (Container-to-container)');
          } else {
            // Client-side rendering durumunda
            apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL || '';
            console.log('[Auth] Client-side giriş URL yapısı kullanılıyor');
          }
          
          console.log('[Auth] Kullanılan API URL:', apiUrl);
          console.log('[Auth] NODE_ENV:', process.env.NODE_ENV);
          
          // Direk olarak signin endpoint'ine istek yap
          const signinUrl = `${apiUrl}/api/auth/signin`;
          console.log('[Auth] Giriş URL:', signinUrl);
          
          const res = await fetch(signinUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!res.ok) {
            const errorMsg = `Giriş başarısız: HTTP ${res.status}`;
            console.error('[Auth] Hata:', errorMsg);
            throw new Error(errorMsg);
          }

          const data = await res.json();
          console.log('[Auth] Backend yanıtı:', data);
          
          if (!data.accessToken) {
            console.error('[Auth] Token bulunamadı');
            throw new Error('Kimlik doğrulama başarısız oldu');
          }

          // Kullanıcı nesnesini oluştur
          const user = {
            id: String(data.id || '0'),
            email: data.email,
            name: data.email,
            accessToken: data.accessToken,
            roles: data.roles || [],
          };
          
          console.log('[Auth] Oluşturulan kullanıcı:', user);
          return user;
        } catch (error) {
          console.error('[Auth] Hata:', error);
          throw new Error('Giriş başarısız oldu');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // User objesi sadece ilk giriş yapıldığında mevcut olur
      if (user) {
        console.log('[Auth] JWT - Yeni giriş:', {
          user: {
            id: user.id,
            email: user.email,
            hasAccessToken: !!user.accessToken
          }
        });
        
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.roles = user.roles;
      } else {
        console.log('[Auth] JWT - Mevcut token:', {
          id: token.id,
          email: token.email,
          hasAccessToken: !!token.accessToken
        });
      }
      
      return token;
    },
    async session({ session, token }) {
      // Önemli: Bu callback her session oluşturulduğunda çağrılır
      console.log('[Auth] Session oluşturuluyor:', {
        session: !!session,
        token: !!token
      });

      // Token'dan session'a veri aktarımı
      session.user.id = token.id as string;
      session.user.accessToken = token.accessToken as string;
      session.user.roles = token.roles as string[];

      console.log('[Auth] Session oluşturuldu:', {
        userId: session.user.id,
        hasAccessToken: !!session.user.accessToken
      });

      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 gün
  },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  },
  debug: true,
}

export const getServerAuthSession = () => getServerSession(authOptions);
