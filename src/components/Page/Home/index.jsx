import Container from "@/components/Common/Container";
import Flex from "@/components/Common/Flex";
import ProductItem from "../Product/ProductItem";

const Home = ({ data }) => {
    const { products } = data;
    const productContents = products?.data?.contents || [];

    return (
        <>
            <Container
                className="mt-10"
                backgroundImage="/images/home/bg-circles.png"
                bgStyle={{
                    backgroundSize: "auto calc(603 / 920 * 100vh)",
                    height: "calc(603 / 920 * 100vh)",
                }}
            >
                <Flex
                    className="h-full flex-col md:flex-row"
                    justify="between"
                    align="center"
                    gap={10}
                >
                    <Flex className="w-[55%] shink-0" justify="end">
                        <img src="/images/home/banner.png" />
                    </Flex>
                    <Flex
                        className="w-[45%] shink-0 text-[90px] font-semibold relative left-[-15%] top-[-10%]"
                        direction="col"
                        align="end"
                    >
                        <p className="leading-20">Write Your</p>
                        <p className="leading-28 tracking-tight bg-gradient-to-r from-[#3652E1] via-[#8057F5] to-[#7851E9] bg-clip-text text-transparent">
                            Article
                        </p>
                        <p className="leading-28">Here</p>
                    </Flex>
                </Flex>
            </Container>
            <Container
                className="mt-10"
                backgroundImage="/images/home/shapes.png"
                bgColor="linear-gradient(155deg, #3652E1 15.93%, #7851E8 102.72%)"
                bgStyle={{
                    backgroundSize: "auto calc(813 / 920 * 100vh)",
                    height: "calc(813 / 920 * 100vh)",
                }}
            ></Container>
        </>
    );
};

export default Home;
