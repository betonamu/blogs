import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/utils";

const NavItem = ({ url, name }) => {
    const pathname = usePathname();

    return (
        <Link
            href={url}
            className={cn("color-[#1C1C1C] text-align-center text-sm font-medium relative", {
                "text-[#3652E1] after:content-[''] after:block after:w-2 after:h-2 after:bg-[#3652E1] after:rounded-full after:absolute after:bottom-.5 after:left-1/2 after:-translate-x-1/2":
                    pathname === url,
            })}
        >
            {name}
        </Link>
    );
};

export default NavItem;
