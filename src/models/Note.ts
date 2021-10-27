export class Note {
  constructor(public filename: string, public content: string) { };

  static getFilepath(filename: string) {
    if (filename.endsWith(".md")) {
      return filename;
    }
    return filename + ".md";
  }
}
