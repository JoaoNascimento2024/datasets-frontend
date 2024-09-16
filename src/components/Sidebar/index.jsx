import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import { Home, Menu, SheetIcon, User, Users } from "lucide-react";
import Logo from "@/assets/datahub.svg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  

  return (
    <div className="flex w-full flex-col bg-muted/40">
      <aside
        className="fixed inset-y-0 left-0 z-10 hidden w-14 border-r bg-secondary 
      sm:flex sm:flex-col">
        <nav className="flex flex-col items-center gap-4 px-2 py-5">
          <TooltipProvider>
            <Link
              to="/"
              className="flex h-9 w-9 shrink items-center justify-center
">
              <img src={Logo} alt="" className="w-6" />
              <span className="sr-only">Logo Datahub</span>
            </Link>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/"
                  className="flex h-9 w-9 shrink-0 items-center justify-center
                rounded-lg text-muted-foreground transition-colors hover:text-foreground">
                  <Home alt="" className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/datasets"
                  className="flex h-9 w-9 shrink-0 items-center justify-center
                rounded-lg text-muted-foreground transition-colors hover:text-foreground">
                  <SheetIcon alt="" className="h-5 w-5" />
                  <span className="sr-only">Datasets</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Datasets</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>

      <div className="sm:hidden flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header
          className="sticky top-0 z-30 flex h-14 items-center justify-between px-4 border-b 
                bg-background gap-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <Menu />
                <span className="sr-only">Abrir / fechar menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="sm:max-w-x">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  to="/dashboard"
                  className="flex h-10 w-10 bg-secondary rounded-full 
                text-lg items-center justify-center text-primary-foreground md:text-base">
                  <img
                    src={Logo}
                    alt="Acme Inc"
                    className="h-5 w-5 transition-all"
                  />
                  <span className="sr-only">Logo do projeto</span>
                </Link>
                <Link
                  to="/"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                  <Home className="h-5 w-5 transition-all" />
                  Dashboard
                </Link>
                <Link
                  to="/datasets"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                  <SheetIcon className="h-5 w-5 transition-all" />
                  Datasets
                </Link>
                <Link
                  to="/users"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                  <Users className="h-5 w-5 transition-all" />
                  Users
                </Link>
                
              </nav>
            </SheetContent>
          </Sheet>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="overflow-hidden">
              <User
                size="25"
                alt="Avatar"
                className="overflow-hidden rounded-full"
              />
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user.username}</DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <Link to="/profile">Profile</Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
      </div>
    </div>
  );
};

export default Sidebar;
