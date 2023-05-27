import { Breadcrumb } from "@/types";

export const generateBreadcrumbs = (path: string): Breadcrumb[] => {
    const parts = path.split('/').filter(Boolean); // Split the path and remove empty parts
    let currentPath = '';

    return parts.map(part => {
        currentPath += `${part}/`;
        return { name: part, path: currentPath };
    });
};