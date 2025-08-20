import mongoose from "mongoose";

import Category from "../models/Category.js";
import Product from "../models/Product.js";
import ProductVariant from "../models/ProductVariant.js";

const MONGODB_URI = "mongodb://root:Anhquoc2020@localhost:27017/nextjs-mongodb?authSource=admin";

function getCombinations(attrSet) {
    const keys = Object.keys(attrSet);
    const values = Object.values(attrSet);

    function combine(index, current) {
        if (index === keys.length) return [current];
        const result = [];
        for (const val of values[index]) {
            result.push(...combine(index + 1, { ...current, [keys[index]]: val }));
        }
        return result;
    }

    return combine(0, {});
}

async function seed() {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // 1. Xóa dữ liệu cũ (tuỳ chọn)
    await Category.deleteMany({});
    await Product.deleteMany({});
    await ProductVariant.deleteMany({});
    console.log("🧹 Cleared old data");

    // 2. Tạo Category trước
    const categories = await Category.insertMany([
        {
            name: "Điện thoại",
            description: "Smartphone mới nhất",
            image: "https://example.com/phone.jpg",
            slug: "dien-thoai",
        },
        {
            name: "Laptop",
            description: "Laptop các hãng nổi tiếng",
            image: "https://example.com/laptop.jpg",
            slug: "laptop",
        },
        {
            name: "Phụ kiện",
            description: "Phụ kiện điện tử",
            image: "https://example.com/accessories.jpg",
            slug: "phu-kien",
        },
        {
            name: "Máy ảnh",
            description: "Máy ảnh kỹ thuật số",
            image: "https://example.com/camera.jpg",
            slug: "may-anh",
        },
        {
            name: "Thiết bị gia dụng",
            description: "Đồ gia dụng thông minh",
            image: "https://example.com/home.jpg",
            slug: "thiet-bi-gia-dung",
        },
    ]);
    console.log("📦 Seeded Categories");

    // Dữ liệu sản phẩm realistic
    const productsData = {
        "Điện thoại": [
            {
                name: "iPhone 15 Pro Max",
                description:
                    "Điện thoại cao cấp của Apple với chip A17 Bionic, màn hình Super Retina XDR 6.7 inch.",
                image: "/images/iphone-15-pro-max.jpg",
                price: 1099,
            },
            {
                name: "Samsung Galaxy S23 Ultra",
                description:
                    "Flagship của Samsung với camera 200MP, pin 5000mAh và màn hình Dynamic AMOLED 2X.",
                image: "/images/s23u-blue.png",
                price: 1199,
            },
            // ... thêm 18 sản phẩm tương tự
        ],
        Laptop: [
            {
                name: "MacBook Air M2 2023",
                description:
                    "Laptop siêu mỏng nhẹ với chip Apple M2, pin 18 giờ, màn hình Retina 13.6 inch.",
                image: "https://example.com/macbookairm2.jpg",
                price: 999,
            },
            {
                name: "Dell XPS 13 Plus",
                description:
                    "Laptop Windows cao cấp với màn hình OLED, CPU Intel thế hệ 12, bàn phím cảm ứng.",
                image: "https://example.com/dellxps13.jpg",
                price: 1299,
            },
            // ... thêm 18 sản phẩm tương tự
        ],
        "Phụ kiện": [
            {
                name: "Tai nghe AirPods Pro 2",
                description:
                    "Tai nghe true wireless chống ồn chủ động với âm thanh chất lượng cao từ Apple.",
                image: "https://example.com/airpodspro2.jpg",
                price: 249,
            },
            {
                name: "Chuột Logitech MX Master 3",
                description:
                    "Chuột không dây cao cấp với thiết kế công thái học và khả năng kết nối đa thiết bị.",
                image: "https://example.com/logitechmx3.jpg",
                price: 99,
            },
            // ... thêm 18 sản phẩm tương tự
        ],
        "Máy ảnh": [
            {
                name: "Canon EOS R5",
                description: "Máy ảnh mirrorless chuyên nghiệp với cảm biến 45MP, quay video 8K.",
                image: "https://example.com/canoneosr5.jpg",
                price: 3899,
            },
            {
                name: "Sony A7 IV",
                description:
                    "Máy ảnh full-frame mirrorless đa dụng với cảm biến 33MP và hệ thống lấy nét nhanh.",
                image: "https://example.com/sonya7iv.jpg",
                price: 2499,
            },
            // ... thêm 18 sản phẩm tương tự
        ],
        "Thiết bị gia dụng": [
            {
                name: "Robot hút bụi Roomba i7+",
                description:
                    "Robot hút bụi thông minh với khả năng tự động đổ rác và điều khiển qua app.",
                image: "https://example.com/roombai7.jpg",
                price: 799,
            },
            {
                name: "Nồi chiên không dầu Philips Airfryer XXL",
                description:
                    "Nồi chiên sử dụng công nghệ Rapid Air giúp nấu nhanh, giữ dinh dưỡng.",
                image: "https://example.com/philipsairfryer.jpg",
                price: 299,
            },
            // ... thêm 18 sản phẩm tương tự
        ],
    };

    const products = [];
    for (const cat of categories) {
        const list = productsData[cat.name];
        if (!list) continue;
        for (let i = 0; i < 20; i++) {
            // Nếu list chưa đủ 20 sp, quay vòng lại
            const product = list[i % list.length];
            products.push({
                name: product.name + (i > 0 ? ` (Bản ${i + 1})` : ""),
                description: product.description,
                image: product.image,
                productCategory: cat._id,
                price: product.price,
            });
        }
    }

    await Product.insertMany(products);
    console.log("📦 Seeded 100 realistic Products");

    const allProducts = await Product.find({}).populate("productCategory");

    const variants = [];

    for (const product of allProducts) {
        const cat = product.productCategory.name;

        let attributesList = [];

        switch (cat) {
            case "Điện thoại":
                attributesList = [
                    {
                        Colors: ["Đen", "Trắng", "Xanh"],
                        Storages: ["128GB", "256GB", "512GB"],
                    },
                ];
                break;
            case "Laptop":
                attributesList = [{ RAM: ["8GB", "16GB"], SSD: ["256GB", "512GB", "1TB"] }];
                break;
            case "Phụ kiện":
                attributesList = [{ "Color": ["Đen", "Trắng", "Hồng"] }];
                break;
            case "Máy ảnh":
                attributesList = [
                    { Lens: ["Kit", "Body Only", "50mm f/1.8"], Colors: ["Đen", "Bạc"] },
                ];
                break;
            case "Thiết bị gia dụng":
                attributesList = [
                    { Versions: ["Standard", "Pro"], Colors: ["Trắng", "Xám"] },
                ];
                break;
            default:
                attributesList = [];
        }

        for (const attrSet of attributesList) {
            const keys = Object.keys(attrSet);
            const combinations = getCombinations(attrSet);

            for (const combo of combinations) {
                const attrMap = new Map(Object.entries(combo));

                variants.push({
                    product: product._id,
                    attributes: attrMap,
                    price: product.price + Math.floor(Math.random() * 100),
                    stock: Math.floor(Math.random() * 30) + 5,
                    sku: `${product._id.toString().slice(-6)}-${Object.values(combo).join("-")}`,
                    image: product.image,
                });
            }
        }
    }

    await ProductVariant.insertMany(variants);
    console.log("🧬 Seeded Product Variants");

    // Hàm tạo tổ hợp attributes
    await mongoose.disconnect();
    console.log("✅ Disconnected");
}

seed().catch((err) => {
    console.error("❌ Seeding failed:", err);
});
