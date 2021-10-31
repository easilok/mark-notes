export interface NoteInformation {
  filename: string
  title: string
  favorite: boolean
}

export interface NoteInterface {
  filename: string
  content: string
}

export function convertFilepath(filename: string): string {
  if (filename.endsWith('.md')) {
    return filename
  }
  return filename + '.md'
}

export function convertTitle(content: string): string {
  if (content.length > 0) {
    const title = content.split('\n')[0]
    const regex = /#/g
    return title.replace(regex, '').trim()
  }
  return ''
}
