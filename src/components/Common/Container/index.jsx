import { cn } from "@/utils";
import React from "react";

const Container = ({
    children,
    className,
    asChild,
    style,
    backgroundImage,
    bgClassName,
    bgStyle,
    bgColor,
    props,
}) => {
    if (asChild) {
        return React.cloneElement(children, {
            style,
            className: cn(children.props?.className, className),
            ...props,
        });
    }

    return (
        <div
            style={
                backgroundImage
                    ? {
                          background: `url(${backgroundImage}) no-repeat center center, ${bgColor || "transparent"}`,
                          ...bgStyle,
                      }
                    : { width: "100%" }
            }
            className={bgClassName}
        >
            {/* Container with a gradient background */}
            <div className={cn("container m-auto h-full", className)} style={style} {...props}>
                {children}
            </div>
        </div>
    );
};

export default Container;
