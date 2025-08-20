import { cn } from "@/utils";

const JUSTIFY_MAP = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
};

const ALIGN_MAP = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    baseline: "items-baseline",
    stretch: "items-stretch",
};

const DIRECTION_MAP = {
    row: "flex-row",
    "row-reverse": "flex-row-reverse",
    col: "flex-col",
    "col-reverse": "flex-col-reverse",
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
    const justifyClass = JUSTIFY_MAP[justify];
    const alignClass = ALIGN_MAP[align];
    const directionClass = DIRECTION_MAP[direction];

    if (!justifyClass || !alignClass || !directionClass) {
        throw new Error("Invalid justify, align, or direction prop provided to Flex component.");
    }

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
