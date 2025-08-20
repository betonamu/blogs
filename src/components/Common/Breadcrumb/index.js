import React from "react";
import Link from "next/link";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/Common/ui/breadcrumb";
import { paths } from "@/constants/paths";

const BreadcrumbContainer = ({ items = [] }) => {
    const routes = [{ name: "Home", link: paths.home }, ...items];

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {routes.map((item, index) =>
                    item.link ? (
                        <React.Fragment key={index}>
                            <BreadcrumbItem>
                                <Link href={item.link || "#"}>{item.name}</Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </React.Fragment>
                    ) : (
                        <BreadcrumbPage key={index}>{item.name}</BreadcrumbPage>
                    ),
                )}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default BreadcrumbContainer;
