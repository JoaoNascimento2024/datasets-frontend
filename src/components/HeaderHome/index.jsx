import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Logo from "@/assets/datahub.svg";
import { ModeToggle } from "../ModeToggle";

const HeaderHome = () => {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <img src={Logo} alt="Acme Inc" className="max-w-8" />
          <h1>
            Datahub<span className="text-primary">.io</span>
          </h1>
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Link
          to="/"
          className="text-muted-foreground transition-colors hover:text-foreground">
          Home
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              to="#"
              className="flex items-center gap-2 text-lg font-semibold md:text-base">
              <img src={Logo} alt="Acme Inc" className="max-w-8" />
              <h1>
                Datahub<span className="text-primary">.io</span>
              </h1>
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link
              to="/home"
              className="text-muted-foreground transition-colors hover:text-foreground">
              Home
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial"></div>
        <Link to="/login">
          <Button className="rounded-full">Fazer login</Button>
        </Link>
        <Link to="/register">
          <Button variant="outline"  className="rounded-full">Cadastre-se</Button>
        </Link>
        <ModeToggle />
      </div>
    </header>
  );
};

export default HeaderHome;
