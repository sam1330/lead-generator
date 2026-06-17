import { readFile } from "fs/promises";
import { resolve } from "path";

export const loadInstructions = async (path: string): Promise<string> => {
    try {
        const filePath = resolve(path, './instructions.md');

        const instructions = await readFile(filePath, 'utf-8');

        return instructions;
    } catch (error) {
        console.log(error);
        return '';  
    }
};