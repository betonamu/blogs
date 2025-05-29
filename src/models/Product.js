import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        productCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Categories",
            required: true,
        },
    },
    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

ProductSchema.virtual("variants", {
  ref: "ProductVariants", // tên model của variant
  localField: "_id",      // field ở Product
  foreignField: "product",// field ở ProductVariant
});

const Product = mongoose.models.Products || mongoose.model("Products", ProductSchema);

export default Product;
