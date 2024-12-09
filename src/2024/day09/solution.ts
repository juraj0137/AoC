const FREE_SPACE_CHAR = '.';

type Block = {
    size: number;
    fileId?: number; // `undefined` indicates free space
};

const isFileBlock = (block: Block): boolean => block.fileId !== undefined;
const isFreeSpaceBlock = (block: Block): boolean => block.fileId === undefined;

const flattenBlocks = (blocks: Block[]) =>
    blocks.flatMap(({ size, fileId }) =>
        Array(size).fill(fileId ?? FREE_SPACE_CHAR),
    );

const parseInput = (input: string): Block[] =>
    input.split('').map((char, index) => {
        const size = Number(char);
        return index % 2 === 0
            ? { size, fileId: index / 2 }
            : { size, fileId: undefined };
    });

export const getChecksum = (blocks: string[]): number =>
    blocks.reduce((acc, block, currentIndex) => {
        if (block === FREE_SPACE_CHAR) {
            return acc;
        }
        return acc + currentIndex * Number(block);
    }, 0);

const defragmentation = ({
    blocks,
    supportPartialCopy = false,
}: {
    blocks: Block[];
    supportPartialCopy?: boolean;
}) => {
    const result: Block[] = [];

    blocks.forEach((block, index) => {
        if (isFileBlock(block)) {
            result.push(block);
            return;
        }

        const freeSpaceBlock = block;

        for (
            let lastItemIndex = blocks.length - 1;
            lastItemIndex > index;
            lastItemIndex--
        ) {
            if (freeSpaceBlock.size === 0) {
                break;
            }

            const candidate = blocks[lastItemIndex];
            if (isFreeSpaceBlock(candidate)) {
                // don't move free space blocks
                continue;
            }

            if (candidate.size <= freeSpaceBlock.size) {
                // copy whole file block
                result.push({ ...candidate });
                freeSpaceBlock.size -= candidate.size;
                candidate.fileId = undefined;
                continue;
            }

            if (supportPartialCopy) {
                // copy part of file block
                freeSpaceBlock.fileId = candidate.fileId;
                candidate.size -= freeSpaceBlock.size;
                result.push(freeSpaceBlock);
                return;
            }
        }

        if (freeSpaceBlock.size > 0) {
            // partial copy not supported, and we ended up with empty space where no file block could be copied
            result.push(freeSpaceBlock);
        }
    });
    return result;
};

export const solvePart1 = (input: string): any => {
    const blocks: Block[] = parseInput(input);
    const defragmented = defragmentation({
        blocks,
        supportPartialCopy: true,
    });
    return getChecksum(flattenBlocks(defragmented));
};

export const solvePart2 = (input: string): any => {
    const blocks: Block[] = parseInput(input);
    const defragmented = defragmentation({
        blocks,
        supportPartialCopy: false,
    });
    return getChecksum(flattenBlocks(defragmented));
};
