import Breadcrumb from "@/components/Common/Breadcrumb";
import Container from "@/components/Common/Container";
import Flex from "@/components/Common/Flex";
import ProductItem from "@/components/Page/Product/ProductItem";
import { paths } from "@/constants/paths";
import { getCategoryBySlug } from "@/services/category";
import { getProducts } from "@/services/product";

const CategorySlugPage = async ({ params, searchParams }) => {
    const { slug } = await params;
    const { page, size } = await searchParams;
    const category = await getCategoryBySlug({ pathParams: { slug } });
    const products = await getProducts({
        params: { categoryId: category.data?._id, page, size },
    });
    const productContents = products.data?.contents || [];

    return (
        <Container>
            <Flex className="mt-4 mb-6" justify="start" align="center">
                <Breadcrumb
                    items={[
                        { name: "Categories", link: paths.categories },
                        { name: category.data?.name },
                    ]}
                />
            </Flex>
            <h1 className="mx-auto w-fit text-2xl uppercase">{category.data?.name}</h1>
            <h2>Products in this category:</h2>
            <Flex className="flex-wrap" justify="start" gap={10}>
                {productContents.length > 0 ? (
                    productContents.map((product) => (
                        <ProductItem product={product} key={product._id} />
                    ))
                ) : (
                    <p>No products found</p>
                )}
            </Flex>
        </Container>
    );
};

export default CategorySlugPage;
