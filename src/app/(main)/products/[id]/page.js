import Breadcrumb from "@/components/Common/Breadcrumb";
import Container from "@/components/Common/Container";
import Flex from "@/components/Common/Flex";
import ProductOptions from "@/components/Page/Product/ProductOptions";
import { paths } from "@/constants/paths";
import { getProductDetail } from "@/services/product";

const ProductDetailPage = async ({ params }) => {
    const { id } = await params;
    const product = await getProductDetail({ pathParams: { id } });
    console.log({ product });
    let variants = product.data.variants || [];
    const category = product.data.productCategory;

    return (
        <Container>
            <Flex className="mt-4 mb-6" justify="start" align="center">
                <Breadcrumb
                    items={[
                        { name: "Categories", link: paths.categories },
                        {
                            name: category?.name,
                            link: paths.categoryDetail.replace(":slug", category?.slug),
                        },
                        { name: product.data.name },
                    ]}
                />
            </Flex>
            <Flex className="flex-col xl:flex-row">
                <div className="xl:w-1/2 w-full">
                    <img
                        src={product.data.image}
                        alt={product.data.name}
                        className="w-full h-auto object-cover max-w-[400px] mx-auto"
                    />
                </div>
                <div className="xl:w-1/2 w-full p-4">
                    <h2 className="text-2xl font-bold">{product.data.name}</h2>
                    <p className="text-gray-600">{product.data.description}</p>
                    <ProductOptions variants={variants} />
                </div>
            </Flex>
        </Container>
    );
};

export default ProductDetailPage;
