"use client";

import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";

import { Button } from "@/components/Common/Button";
import { Badge } from "@/components/Common/ui/badge";
import { Card, CardContent } from "@/components/Common/ui/card";

export default function NewsCard({ article }) {
    return (
        <Card className="w-[220px] overflow-hidden rounded-3xl bg-white shadow-md">
            <div className="relative h-[160px]">
                <Image src={article.image} alt={article.title} fill className="object-cover" />
                {/* Avatar */}
                <div className="absolute top-3 left-3 flex items-center gap-2 rounded-full bg-white px-2 py-1 shadow-sm">
                    <Image
                        src={article.author.avatar}
                        alt={article.author.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                    />
                    <span className="text-sm font-medium">{article.author.name}</span>
                </div>
                {/* Category badge */}
                <Badge variant="default" className="absolute bottom-3 left-3 rounded-full bg-blue-600 text-white">
                    {article.category}
                </Badge>
            </div>

            <CardContent className="space-y-3 p-4">
                <div className="space-y-1">
                    <h3 className="text-base leading-snug font-semibold">{article.title}</h3>
                    <p className="text-muted-foreground line-clamp-2 text-sm">{article.description}</p>
                </div>

                <div className="text-muted-foreground flex items-center justify-between text-sm">
                    <span>{article.timeAgo}</span>
                    <Button size="sm" className="rounded-full px-4 text-sm">
                        {article.buttonText}
                    </Button>
                </div>

                <div className="text-muted-foreground flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-1">
                        <Heart size={16} className="fill-muted-foreground/50" />
                        <span>{article.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <MessageCircle size={16} />
                        <span>{article.comments}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
