

import ImageCarousel from "@/components/ImageCarousel";
import LoginForm from "@/components/LoginForm";


const Login = () => {
    
  return (
    <>
    <main className="h-screen flex w-full">
      <div className="bg-primary-foreground dark:bg-slate-900 w-full h-full hidden lg:flex flex-col items-center justify-center p-16">
        <ImageCarousel />
      </div>
      <section className="flex items-center justify-center bg-background h-full w-full p-6">
        <LoginForm />
      </section>
    </main>
    </>
  );
};

export default Login;
