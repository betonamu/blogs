import Carousel, {
    CarouselContainer,
    CarouselSlide,
    CarouselViewPort,
} from "@/components/Common/Carousel";
import Container from "@/components/Common/Container";
import Flex from "@/components/Common/Flex";
import ProductItem from "../Product/ProductItem";
import NewsCard from "@/components/Common/News/NewsCard";

const Home = ({ data }) => {
    const { products } = data;
    const productContents = products?.data?.contents || [];

    const fakeArticles = [
        {
            id: 1,
            author: {
                name: "Joana",
                avatar: "/images/home/article-author.png", // ảnh đại diện giả
            },
            category: "Tech",
            title: "Elon Musk shows off updates to his brain chips",
            description: "Elon Musk’s health tech venture Neuralink shared updates to its brain...",
            image: "/images/home/article-image.png",
            timeAgo: "10h ago",
            likes: 32,
            comments: 12,
            buttonText: "Read More",
        },
        {
            id: 2,
            author: {
                name: "Alice",
                avatar: "/images/home/article-author.png",
            },
            category: "Science",
            title: "NASA prepares for Mars 2026 mission",
            description:
                "The next generation of Mars rovers will go deeper and further than ever...",
            image: "/images/home/article-image.png",
            timeAgo: "5h ago",
            likes: 45,
            comments: 18,
            buttonText: "Explore",
        },
        {
            id: 3,
            author: {
                name: "Michael",
                avatar: "/images/home/article-author.png",
            },
            category: "AI",
            title: "OpenAI announces GPT-5 with multimodal capabilities",
            description: "The next step in generative AI is here with enhanced understanding...",
            image: "/images/home/article-image.png",
            timeAgo: "1h ago",
            likes: 120,
            comments: 37,
            buttonText: "Learn More",
        },
        {
            id: 4,
            author: {
                name: "Alice",
                avatar: "/images/home/article-author.png",
            },
            category: "Science",
            title: "NASA prepares for Mars 2026 mission",
            description:
                "The next generation of Mars rovers will go deeper and further than ever...",
            image: "/images/home/article-image.png",
            timeAgo: "5h ago",
            likes: 45,
            comments: 18,
            buttonText: "Explore",
        },
        {
            id: 5,
            author: {
                name: "Michael",
                avatar: "/images/home/article-author.png",
            },
            category: "AI",
            title: "OpenAI announces GPT-5 with multimodal capabilities",
            description: "The next step in generative AI is here with enhanced understanding...",
            image: "/images/home/article-image.png",
            timeAgo: "1h ago",
            likes: 120,
            comments: 37,
            buttonText: "Learn More",
        },
    ];

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
            >
                <Flex className="flex-col md:flex-row gap-10 h-full">
                    <Flex className="shrink-0 w-1/3" direction="col">
                        <h1 className="text-3xl font-semibold">Latest Articles</h1>
                        <p className="mt-2">
                            Here are a few of our latest articles, check them out!
                        </p>
                    </Flex>
                    <Flex className="flex-wrap gap-10 w-2/3" justify="start">
                        <Carousel slideToShow={3.5} options={{ align: "start" }}>
                            <CarouselViewPort>
                                <CarouselContainer>
                                    {fakeArticles.map((article) => (
                                        <CarouselSlide key={article.id}>
                                            <NewsCard article={article} />
                                        </CarouselSlide>
                                    ))}
                                </CarouselContainer>
                            </CarouselViewPort>
                        </Carousel>
                    </Flex>
                </Flex>
            </Container>
        </>
    );
};

export default Home;
