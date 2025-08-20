import React from "react";

import Flex from "../Common/Flex";

const Footer = () => {
    return (
        <Flex className="mt-10 h-[132px] bg-gradient-to-r from-[#3652E1] via-[#8057F5] to-[#7851E9] text-white">
            {new Date().getFullYear()} RiseBlog. All rights reserved
        </Flex>
    );
};

export default Footer;
