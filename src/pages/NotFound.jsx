import Image404 from "@/assets/404.svg";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <>
      <main className="h-screen lg:mx-14 w-full flex items-center justify-center flex-col-reverse lg:flex-row">
        <div className="w-full flex flex-col items-center justify-center px-16 lg:p-16">
          <div>
            <h1 className="text-5xl mb-1 font-bold">Sinto muito!</h1>
            <h2 className="text-3xl mb-1">
              A página que você está procurando não existe.
            </h2>
            <p className="mb-6">
              Você pode ter digitado errado ou a página pode ter sido movida.
            </p>
            <Link to="/">
              <Button className="rounded-full p-6 text-lg">Voltar para home</Button>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center bg-background w-full px-6 max-w-lg mb-16 lg:max-w-4xl lg:mb-0 lg:mr-14">
          <img src={Image404} alt="" />
        </div>
      </main>
    </>
  );
};

export default NotFound;
