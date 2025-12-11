import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

export const BentoGrid = ({ className, children }) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon,
    image,
    link,
}) => {
    return (
        <div
            className={cn(
                "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
                className
            )}
        >
            <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 overflow-hidden relative">
                {image ? (
                    <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover/bento:scale-110" />
                ) : header ? (
                    <div className="w-full h-full object-cover">{header}</div>
                ) : null}

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/bento:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <a href={link} target="_blank" rel="noreferrer" className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium flex items-center gap-2 transform translate-y-4 group-hover/bento:translate-y-0 transition-transform duration-300">
                        View Project <ArrowUpRight className="w-4 h-4" />
                    </a>
                </div>
            </div>
            <div className="group-hover/bento:translate-x-2 transition duration-200">
                <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
                    {title}
                </div>
                <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
                    {description}
                </div>
            </div>
        </div>
    );
};
