"use client";

import React, { useState, useMemo, useEffect } from "react";
import classNames from "classnames";

const ProductOptions = ({ variants }) => {
    // Tìm biến thể có giá thấp nhất để chọn mặc định
    const defaultVariant = useMemo(() => {
        return variants.reduce((min, curr) => (curr.price < min.price ? curr : min), variants[0]);
    }, [variants]);

    const [selectedColor, setSelectedColor] = useState(defaultVariant?.attributes.Colors);
    const [selectedStorage, setSelectedStorage] = useState(defaultVariant?.attributes.Storages);

    // Tạo danh sách tất cả các màu và dung lượng từ variants
    const allColors = useMemo(() => {
        return Array.from(new Set(variants.map((v) => v.attributes.Colors)));
    }, [variants]);

    const allStorages = useMemo(() => {
        return Array.from(new Set(variants.map((v) => v.attributes.Storages)));
    }, [variants]);

    // Kiểm tra tổ hợp color + storage có tồn tại và còn hàng không
    const isOptionAvailable = (color, storage) => {
        const match = variants.find(
            (v) => v.attributes.Colors === color && v.attributes.Storages === storage,
        );
        return match && match.stock > 0;
    };

    const isColorDisabled = (color) => {
        return !variants.some(
            (v) =>
                v.attributes.Colors === color &&
                v.attributes.Storages === selectedStorage &&
                v.stock > 0,
        );
    };

    const isStorageDisabled = (storage) => {
        return !variants.some(
            (v) =>
                v.attributes.Storages === storage &&
                v.attributes.Colors === selectedColor &&
                v.stock > 0,
        );
    };

    const selectedVariant = useMemo(() => {
        return variants.find(
            (v) =>
                v.attributes.Colors === selectedColor && v.attributes.Storages === selectedStorage,
        );
    }, [variants, selectedColor, selectedStorage]);

    // Cập nhật lựa chọn nếu người dùng chọn tổ hợp không hợp lệ
    useEffect(() => {
        if (!isOptionAvailable(selectedColor, selectedStorage)) {
            const fallback = variants.find((v) => v.stock > 0);
            if (fallback) {
                setSelectedColor(fallback.attributes.Colors);
                setSelectedStorage(fallback.attributes.Storages);
            }
        }
    }, [selectedColor, selectedStorage, variants]);

    return (
        <div className="space-y-4">
            <div>
                <p className="font-semibold mb-1">Màu sắc</p>
                <div className="flex gap-2 flex-wrap">
                    {allColors.map((color) => {
                        const disabled = isColorDisabled(color);
                        return (
                            <label
                                key={color}
                                className={classNames("cursor-pointer", {
                                    "opacity-50 cursor-not-allowed": disabled,
                                })}
                            >
                                <input
                                    type="radio"
                                    name="color"
                                    value={color}
                                    checked={selectedColor === color}
                                    onChange={() => !disabled && setSelectedColor(color)}
                                    disabled={disabled}
                                    className="hidden"
                                />
                                <div
                                    className={classNames("px-4 py-1 rounded border select-none", {
                                        "bg-black text-white border-black":
                                            selectedColor === color && !disabled,
                                        "bg-white text-black border-gray-300":
                                            selectedColor !== color && !disabled,
                                        "bg-gray-200 text-gray-500 border-gray-200": disabled,
                                    })}
                                >
                                    {color}
                                </div>
                            </label>
                        );
                    })}
                </div>
            </div>

            <div>
                <p className="font-semibold mb-1">Dung lượng</p>
                <div className="flex gap-2 flex-wrap">
                    {allStorages.map((storage) => {
                        const disabled = isStorageDisabled(storage);
                        return (
                            <label
                                key={storage}
                                className={classNames("cursor-pointer", {
                                    "opacity-50 cursor-not-allowed": disabled,
                                })}
                            >
                                <input
                                    type="radio"
                                    name="storage"
                                    value={storage}
                                    checked={selectedStorage === storage}
                                    onChange={() => !disabled && setSelectedStorage(storage)}
                                    disabled={disabled}
                                    className="hidden"
                                />
                                <div
                                    className={classNames("px-4 py-1 rounded border select-none", {
                                        "bg-black text-white border-black":
                                            selectedStorage === storage && !disabled,
                                        "bg-white text-black border-gray-300":
                                            selectedStorage !== storage && !disabled,
                                        "bg-gray-200 text-gray-500 border-gray-200": disabled,
                                    })}
                                >
                                    {storage}
                                </div>
                            </label>
                        );
                    })}
                </div>
            </div>
            <p className="text-xl font-semibold mt-4">Price: {selectedVariant?.price}$</p>
        </div>
    );
};

export default ProductOptions;
