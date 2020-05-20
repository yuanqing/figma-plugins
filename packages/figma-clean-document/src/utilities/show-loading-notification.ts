export function showLoadingNotification(message: string): () => void {
  const notificationHandler = figma.notify(message, {
    timeout: 60000
  })
  return function (): void {
    notificationHandler.cancel()
  }
}
