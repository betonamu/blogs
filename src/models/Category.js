import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
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
        slug: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const Category =
    mongoose.models.Categories || mongoose.model("Categories", CategorySchema);

export default Category;
