import Flex from "@/components/Common/Flex";
import { paths } from "@/constants/paths";
import Link from "next/link";

const ProductItem = ({ product }) => {
    return (
        <Flex
            direction="col"
            key={product._id}
            className="p-4 xl:w-[calc(25%-10px)] sm:w-[calc(50%-10px)] w-full flex-shink-0 shadow-md rounded-md cursor-pointer"
        >
            <Link href={paths.productDetail.replace(":id", product._id)}>
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-[200] h-auto object-cover mx-auto"
                />
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>${product.price}</p>
            </Link>
        </Flex>
    );
};
export default ProductItem;
