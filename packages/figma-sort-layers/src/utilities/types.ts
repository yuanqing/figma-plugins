export type MainFactoryOptions = {
  sortNodes: SortNodes
  successMessage: string
}

export type SortNodes = (
  nodes: Array<SceneNode>
) =>
  | null
  | Array<SceneNode>
  | { fixedNodes: Array<SceneNode>; scrollingNodes: Array<SceneNode> }
