import Link from "next/link";

import { paths } from "@/constants/paths";
import Flex from "../Flex";

const Breadcrumb = ({ items = [] }) => {
    const routes = [{ name: "Home", link: paths.home }, ...items];

    return (
        <Flex className="breadcrumb" justify="start" gap={5}>
            {routes.map((item, index) => (
                <Flex key={index} className="breadcrumb-item items-center gap-1">
                    {item.link ? (
                        <Link href={item.link} className="hover:text-black text-gray-600">
                            {item.name}
                        </Link>
                    ) : (
                        <span className="text-gray-900 font-bold">{item.name}</span>
                    )}
                    {index !== routes.length - 1 && <span className="text-gray-400 ml-2">•</span>}
                </Flex>
            ))}
        </Flex>
    );
};

export default Breadcrumb;
