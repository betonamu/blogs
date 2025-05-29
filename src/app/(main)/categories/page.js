import Link from "next/link";

import Breadcrumb from "@/components/Common/Breadcrumb";
import Container from "@/components/Common/Container";
import Flex from "@/components/Common/Flex";
import { paths } from "@/constants/paths";
import { getCategories } from "@/services/category";

const CategoriesPage = async () => {
    const categories = await getCategories();

    return (
        <Container>
            <Flex className="mt-4 mb-6" justify="start" align="center">
                <Breadcrumb items={[{ name: "Categories", link: "/categories" }]} />
            </Flex>
            <h1>Categories</h1>
            <Flex className="flex-wrap" gap={10} justify="start">
                {categories.data?.map((category) => (
                    <Flex
                        key={category._id}
                        direction="col"
                        className="w-[calc(50%-10px)]
                            xl:w-[calc(25%-10px)]
                            min-h-[150px] flex-shink-0 shadow-md rounded-md
                            cursor-pointer"
                    >
                        <Link href={paths.categoryDetail.replace(":slug", category.slug)}>
                            <h2>{category.name}</h2>
                            <p>{category.description}</p>
                        </Link>
                    </Flex>
                ))}
            </Flex>
        </Container>
    );
};

export default CategoriesPage;
