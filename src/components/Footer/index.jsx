import { Separator } from "../ui/separator";

const Footer = () => {
  return (
    <div className="sm:mt-24">
      <Separator className="w-full" />
      <footer className="py-6 md:px-8 md:py-0 w-full">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground">
            © 2024 Datahub - Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
