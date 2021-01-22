import CmsPage from './components/CmsPage'
import CmsGenericSection from './components/CmsGenericSection'
import CmsGenericBlock from './components/CmsGenericBlock'
import CmsGenericElement from './components/CmsGenericElement'
import CmsSectionDefault from './components/sections/CmsSectionDefault'
import CmsSectionSidebar from './components/sections/CmsSectionSidebar'
import CmsNoComponent from './components/CmsNoComponent'
import CmsBlockDefault from './components/blocks/CmsBlockDefault'
import CmsElementText from './components/elements/CmsElementText'

export function install (Vue) {
  ;[
    CmsNoComponent,
    CmsPage,
    CmsGenericSection,
    CmsGenericBlock,
    CmsGenericElement,
    CmsSectionDefault,
    CmsSectionSidebar,
    CmsBlockDefault,
    CmsElementText
  ].forEach((v) => {
    Vue.component(v.name, v)
  })
}

export default {
  install
}
