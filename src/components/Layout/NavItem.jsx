import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/utils";

const NavItem = ({ url, name }) => {
    const pathname = usePathname();

    return (
        <Link
            href={url}
            className={cn("color-[#1C1C1C] text-align-center relative text-sm font-medium", {
                "after:bottom-.5 text-[#3652E1] after:absolute after:left-1/2 after:block after:h-2 after:w-2 after:-translate-x-1/2 after:rounded-full after:bg-[#3652E1] after:content-['']":
                    pathname === url,
            })}
        >
            {name}
        </Link>
    );
};

export default NavItem;
