import mongoose from "mongoose";

const ProductVariantSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        attributes: {
            type: Map,
            of: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            default: 0,
        },
        sku: {
            type: String,
            unique: true,
        },
        image: String, // nếu variant có hình riêng
    },
    { timestamps: true, collection: "product_variants" },
);

const ProductVariant =
    mongoose.models.ProductVariants || mongoose.model("ProductVariants", ProductVariantSchema);

export default ProductVariant;
