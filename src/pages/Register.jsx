
import ImageCarousel from "@/components/ImageCarousel";
import RegisterForm from "@/components/RegisterForm";

const Register = () => {
  return (
    <>

    <main className="h-screen flex w-full">
      <div className="bg-primary-foreground w-full h-full hidden lg:flex flex-col items-center justify-center p-16">
        <ImageCarousel />
      </div>
      <section className="flex items-center justify-center bg-background h-auto sm:h-full w-full p-6">
        <RegisterForm />
      </section>
    </main>
    </>
  );
};

export default Register;
