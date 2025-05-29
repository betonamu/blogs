import classNames from "classnames";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";

import createContext from "@/utils/create-context";

const [CarouselProvider, useContext] = createContext({});

const Carousel = ({
    children,
    slideToShow = 1,
    slideSpacing = "10px",
    onInit,
}) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
    });

    useEffect(() => {
        if (!emblaApi) return;

        onInit?.(emblaApi);
        emblaApi.on("reInit", onInit);

        return () => emblaApi.off("reInit", onInit);
    }, [emblaApi]);

    return (
        <div
            style={{
                "--slide-size": `calc(100% / ${slideToShow})`,
                "--slide-spacing": slideSpacing,
            }}
            className="relative w-full"
        >
            <CarouselProvider
                value={{ emblaRef, emblaApi }}
            >
                {children}
            </CarouselProvider>
        </div>
    );
};

const ViewPort = ({ children, className, ...props }) => {
    const { emblaRef } = useContext();

    return (
        <div
            ref={emblaRef}
            className={classNames(
                "h-full w-full overflow-hidden",
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
};

const Container = ({ children, className, ...props }) => {
    return (
        <div
            className={classNames(
                "flex flex-row gap-[var(--slide-spacing)] will-change-transform",
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
};

const Slide = ({ children, className, ...props }) => {
    return (
        <div
            className={classNames(
                "shrink-0 grow-0 basis-[var(--slide-size)]",
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
};

const Button = ({
    children,
    direction = "prev",
    className,
    ...props
}) => {
    const directionClass = {
        prev: "left-[-15px]",
        next: "right-[-15px]",
    };

    return (
        <button
            className={classNames(
                "absolute top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/25 p-2 transition-colors hover:bg-black/40 cursor-pointer",
                directionClass[direction],
                className,
            )}
            {...props}
        >
            {children}
        </button>
    );
};

Carousel.ViewPort = ViewPort;
Carousel.Container = Container;
Carousel.Slide = Slide;
Carousel.Button = Button;

export default Carousel;
