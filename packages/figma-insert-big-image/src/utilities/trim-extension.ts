export function trimExtension(fileName: string): string {
  return fileName.substr(0, fileName.lastIndexOf('.'))
}
