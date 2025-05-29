import { cn } from "@/utils";

const justifyMap = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
};

const alignMap = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
    baseline: "items-baseline",
};

const Flex = ({
    children,
    className,
    as: Tag = "div",
    gap = 0,
    justify = "center",
    align = "center",
    direction = "row",
    ...props
}) => {
    const justifyClass = justifyMap[justify] || "justify-center";
    const alignClass = alignMap[align] || "items-center";
    const directionClass = `flex-${direction}`; // this is fine because direction is predictable

    const gapStyle = Array.isArray(gap) ? gap.map((g) => `${g}px`).join(" ") : `${gap}px`;

    return (
        <Tag
            className={cn("flex", justifyClass, alignClass, directionClass, className)}
            style={{ gap: gapStyle }}
            {...props}
        >
            {children}
        </Tag>
    );
};

export default Flex;
