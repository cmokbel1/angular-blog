
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {},
  assets: {
    'index.csr.html': {size: 609, hash: 'ab0b683f514e951cafcf976cbb5d5602bef476ca79725769fc64d7372c1192be', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1011, hash: '02a3898d8a77a9eca5bac726a3f45a460b66a1c1eaebc5cfff4cef7c735a6386', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-I7ICID3B.css': {size: 276, hash: '6QtCrqDrtx0', text: () => import('./assets-chunks/styles-I7ICID3B_css.mjs').then(m => m.default)}
  },
};
