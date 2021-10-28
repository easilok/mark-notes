export interface NoteInterface {
  filename: string;
  content: string;
};


export function convertFilepath(filename: string): string {
  if (filename.endsWith(".md")) {
    return filename;
  }
  return filename + ".md";
}

export function convertTitle(content: string): string {
  if (content.length > 0) {
    const title = content.split('\n')[0];
    return title.replace('#', '').trim();
  }
  return '';
}

