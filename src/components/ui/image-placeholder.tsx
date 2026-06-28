import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type AspectOption = "square" | "video" | "portrait";

const aspectClassMap: Record<AspectOption, string> = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
};

interface ImagePlaceholderProps {
  aspect?: AspectOption;
  className?: string;
  iconSize?: number;
  label?: string;
}

function ImagePlaceholder({
  aspect = "square",
  className,
  iconSize = 32,
  label,
}: ImagePlaceholderProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <div
        className={cn(
          "flex w-full items-center justify-center rounded-xl bg-primary/10 text-primary/60",
          aspectClassMap[aspect],
          className,
        )}
      >
        <ImageIcon size={iconSize} />
      </div>
      {label ? <span className="text-xs text-gray-400">{label}</span> : null}
    </div>
  );
}

export { ImagePlaceholder };
export type { AspectOption };
