"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Container from "@/components/Common/Container";
import { paths } from "@/constants/paths";
import useAuth from "@/hooks/useAuth";
import { getProfile } from "@/services/account";
import { authStore } from "@/store/auth";
import { cn } from "@/utils";

import { Button } from "../Common/Button";
import Flex from "../Common/Flex";
import NavItem from "./NavItem";

const Header = () => {
    const { setUser, user } = authStore();
    const { isAuthenticated, logout } = useAuth();
    const pathname = usePathname();

    const navItems = [
        { url: paths.home, name: "Home" },
        { url: paths.about, name: "Article" },
        { url: paths.categories, name: "About" },
        { url: paths.contact, name: "Contact" },
    ];

    useEffect(() => {
        if (!isAuthenticated) return;

        getProfile().then((res) => {
            setUser(res.data);
        });
    }, [isAuthenticated, setUser]);

    return (
        <Flex
            as="header"
            align="center"
            justify="center"
            className={cn("sticky top-0 z-50 h-[50px] w-full bg-[#EFEFEF] shadow-sm")}
        >
            <Container>
                <Flex className="w-full" gap={5} align="center" justify="between">
                    <h1 className="shrink-0 text-2xl uppercase">
                        <Link href="/">
                            <span className="text-[#1C1C1C]">Rise</span>
                            <span className="bg-gradient-to-r from-[#7851E9] via-[#423ECD] to-[#3652E1] bg-clip-text text-2xl font-medium tracking-tight text-transparent">
                                Blog
                            </span>
                        </Link>
                    </h1>
                    <Flex gap={20}>
                        {navItems.map((item) => (
                            <NavItem key={item.url} url={item.url} name={item.name} />
                        ))}
                    </Flex>
                    <Flex gap={20}>
                        {isAuthenticated ? (
                            <Flex gap={10}>
                                <Link href={paths.profile} className="shink-0 h-fit hover:text-black">
                                    Hello {user?.name}
                                </Link>
                                <Button onClick={logout}>Logout</Button>
                            </Flex>
                        ) : (
                            <Link href={paths.login}>
                                <Button variant="link">Login</Button>
                            </Link>
                        )}
                    </Flex>
                </Flex>
            </Container>
        </Flex>
    );
};

export default Header;
