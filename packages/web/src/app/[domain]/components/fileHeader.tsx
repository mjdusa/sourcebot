
import { getCodeHostInfoForRepo } from "@/lib/utils";
import { LaptopIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

interface FileHeaderProps {
    fileName: string;
    fileNameHighlightRange?: {
        from: number;
        to: number;
    }
    repo: {
        name: string;
        codeHostType: string;
        displayName?: string;
        webUrl?: string;
    },
    branchDisplayName?: string;
    branchDisplayTitle?: string;
}

export const FileHeader = ({
    repo,
    fileName,
    fileNameHighlightRange,
    branchDisplayName,
    branchDisplayTitle,
}: FileHeaderProps) => {
    const info = getCodeHostInfoForRepo({
        name: repo.name,
        codeHostType: repo.codeHostType,
        displayName: repo.displayName,
        webUrl: repo.webUrl,
    });

    return (
        <div className="flex flex-row gap-2 items-center w-full overflow-hidden">
            {info?.icon ? (
                <Image
                    src={info.icon}
                    alt={info.codeHostName}
                    className={`w-4 h-4 ${info.iconClassName}`}
                />
            ): (
                <LaptopIcon className="w-4 h-4" />
            )}
            <Link
                className={clsx("font-medium", {
                    "cursor-pointer hover:underline": info?.repoLink,
                })}
                href={info?.repoLink ?? ""}
            >
                {info?.displayName}
            </Link>
            {branchDisplayName && (
                <p
                    className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-[3px] flex items-center gap-0.5"
                    title={branchDisplayTitle}
                >
                    {/* hack since to make the @ symbol look more centered with the text */}
                    <span
                        style={{
                            fontSize: "0.60rem",
                            lineHeight: "1rem",
                            marginBottom: "0.1rem",
                        }}
                    >
                        @
                    </span>
                    {`${branchDisplayName}`}
                </p>
            )}
            <span>·</span>
            <div
                className="flex-1 flex items-center overflow-hidden mt-0.5"
            >
                <span className="inline-block w-full truncate-start font-mono text-sm">
                    {!fileNameHighlightRange ?
                        fileName
                        : (
                            <>
                                {fileName.slice(0, fileNameHighlightRange.from)}
                                <span className="bg-yellow-200 dark:bg-blue-700">
                                    {fileName.slice(fileNameHighlightRange.from, fileNameHighlightRange.to)}
                                </span>
                                {fileName.slice(fileNameHighlightRange.to)}
                            </>
                        )}
                </span>
            </div>
        </div>
    )
}