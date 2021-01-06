import cmsMap from './cmsMap'

function resolveComponent(blockType, contentType) {
  if (cmsMap[blockType] && cmsMap[blockType][contentType])
    return cmsMap[blockType][contentType]
  return 'CmsNoComponent'
}

export function getCmsSectionComponent(content) {
  return resolveComponent('sections', content.type)
}

export function getCmsBlockComponent(content) {
  return resolveComponent('blocks', content.type)
}

export function getCmsElementComponent(content) {
  return resolveComponent('elements', content.type)
}
