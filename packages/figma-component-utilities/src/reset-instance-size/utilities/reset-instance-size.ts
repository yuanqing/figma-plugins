export function resetInstanceSize(instance: InstanceNode): boolean {
  const component = instance.mainComponent
  if (
    component.width === instance.width &&
    component.height === instance.height
  ) {
    return false
  }
  instance.resize(component.width, component.height)
  return true
}
