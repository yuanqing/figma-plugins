export function readBytesFromCanvasElement(
  canvasElement: HTMLCanvasElement
): Promise<Uint8Array> {
  return new Promise<Uint8Array>(function (resolve, reject) {
    canvasElement.toBlob(function (blob) {
      const reader = new FileReader()
      reader.onload = function (): void {
        resolve(new Uint8Array(reader.result as ArrayBuffer))
      }
      reader.onerror = reject
      reader.readAsArrayBuffer(blob as Blob)
    })
  })
}
