import { readFileSync } from "fs";
import { resolve } from "path";

export const loadInstructions = (path: string): string => {
    try {
        const filePath = resolve(path, './instructions.md');

        return readFileSync(filePath, 'utf-8');
    } catch (error) {
        console.log(error);
        return '';  
    }
};