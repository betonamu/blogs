import { Suspense } from "react";

import Home from "@/components/Page/Home";
import { getProducts } from "@/services/product";

const HomePage = async ({ params, searchParams }) => {
    const query = await searchParams;
    const products = await getProducts({ params: query });
    console.log({ products });

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Home
                data={{
                    products,
                }}
            />
        </Suspense>
    );
};

export default HomePage;
