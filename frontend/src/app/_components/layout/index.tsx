
import Header from "./header";

export default function Layout({ children }: any) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
