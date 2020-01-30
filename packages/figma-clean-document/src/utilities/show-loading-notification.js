export function showLoadingNotification (message) {
  const notificationHandler = figma.notify(message, {
    timeout: 60000
  })
  return function () {
    notificationHandler.cancel()
  }
}
