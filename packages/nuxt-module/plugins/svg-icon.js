import Vue from 'vue'
import SvgIcon from '@aidol/svg-icon' // svg component

Vue.component('SvgIcon', SvgIcon) // register globally

const req = require.context('~/assets/icons/svg', false, /\.svg$/)
const requireAll = (requireContext) => requireContext.keys().map(requireContext)
requireAll(req)
