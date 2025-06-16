export interface FileNode {
  id: string;  // <-- Added id
  name: string;
  path: string;
  content?: string;
  children?: FileNode[];
}

interface RawFile {
  path: string;
  content: string;
}

interface InternalNode {
  name: string;
  path: string;
  content?: string;
  children?: Record<string, InternalNode>;
}

export function buildFileTree(files: RawFile[]): FileNode[] {
  const root: Record<string, InternalNode> = {};

  for (const file of files) {
    const parts = file.path.split("/");
    let current = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const id = parts.slice(0, i + 1).join("/");

      if (!current[part]) {
        current[part] = {
          name: part,
          path: id,
          ...(i === parts.length - 1 ? { content: file.content } : { children: {} }),
        };
      }
      if (current[part].children) {
        current = current[part].children!;
      }
    }
  }

  function convert(obj: Record<string, InternalNode>): FileNode[] {
    return Object.values(obj).map((value) => ({
      id: value.path,  // important for Arborist
      name: value.name,
      path: value.path,
      content: value.content,
      children: value.children ? convert(value.children) : undefined,
    }));
  }

  return convert(root);
}
