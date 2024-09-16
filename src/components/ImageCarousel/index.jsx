import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import data from "@/assets/data.svg";
import datawomen from "@/assets/data-women.svg";
import logo from "@/assets/logo.svg";

const ImageCarousel = () => {
  return (
    <Carousel
      className="w-full max-w-lg bg-transparent"
      opts={{
        align: "start",
        loop: true,
      }}>
      <CarouselContent>
        <CarouselItem>
          <div className="flex aspect-square rounded flex-col">
            <img src={logo} alt="Logo Datahub" />
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="flex aspect-square rounded flex-col items-center">
            <img src={data} alt="Análise de Dados" />
            <h1 className="text-2xl">
              Transforme dados em{" "}
              <span className="text-primary font-bold tracking-tighter">
                insights valiosos.
              </span>
            </h1>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="flex aspect-square rounded flex-col items-center">
            <img src={datawomen} alt="Análise de Dados" />
            <h1 className="text-2xl">
              Dados organizados,{" "}
              <span className="text-primary font-bold tracking-tighter">
                decisões inteligentes.
              </span>
            </h1>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default ImageCarousel;
