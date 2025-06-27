"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageCircle } from "lucide-react";
import Image from "next/image";

export default function NewsCard({ article }) {
    return (
        <Card className="rounded-3xl overflow-hidden shadow-md w-[220px] bg-white">
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
                <Badge
                    variant="default"
                    className="absolute bottom-3 left-3 rounded-full bg-blue-600 text-white"
                >
                    {article.category}
                </Badge>
            </div>

            <CardContent className="p-4 space-y-3">
                <div className="space-y-1">
                    <h3 className="text-base font-semibold leading-snug">{article.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {article.description}
                    </p>
                </div>

                <div className="flex items-center justify-between text-muted-foreground text-sm">
                    <span>{article.timeAgo}</span>
                    <Button size="sm" className="rounded-full px-4 text-sm">
                        {article.buttonText}
                    </Button>
                </div>

                <div className="flex items-center gap-6 text-sm text-muted-foreground">
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
