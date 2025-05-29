import { cn } from "@/utils";
import * as RadixPopover from "@radix-ui/react-popover";

const Popover = ({ children, className }) => {
    return (
        <RadixPopover.Root>
            <RadixPopover.Trigger>
                open
            </RadixPopover.Trigger>
            <RadixPopover.Portal>
                <RadixPopover.Content
                    className={cn(
                        "w-[260px] rounded-[8px] bg-white p-[20px] shadow-[0px_10px_38px_-10px_hsl(206_22%_7%_/_0.35),_0px_10px_20px_-15px_hsl(206_22%_7%_/_0.2)]",
                        className,
                    )}
                >
                    {children}
                </RadixPopover.Content>
            </RadixPopover.Portal>
        </RadixPopover.Root>
    );
};

const Close = ({ className, props, children }) => {
    return (
        <RadixPopover.Close
            {...props}
            className={twMerge(
                "absolute top-[5px] right-[5px] inline-flex h-[25px] w-[25px] cursor-pointer items-center justify-center rounded-full text-[#6550b9]",
                className,
            )}
        >
            {children}
        </RadixPopover.Close>
    );
};

Popover.Close = Close;

export default Popover;
