const { exec } = require('child_process')
const util = require('util')

const sizes = [
  { name: 'favicon-16', size: '16/16' },
  { name: 'favicon-32', size: '32/32' },
  { name: 'apple-touch-icon', size: '180/180' },
  { name: 'pwa-icon', size: '192/192' },
  { name: 'pwa-icon-large', size: '512/512' },
  { name: 'apple-startup-image-se', size: '640/1136' },
  { name: 'apple-startup-image-se-horizontal', size: '1136/640' },
  { name: 'apple-startup-image-6s', size: '750/1334' },
  { name: 'apple-startup-image-6s-horizontal', size: '1334/750' },
]

sizes.map(item => {
  exec(util.format(
    'npx webshot --window-size=%s ./src/assets/logo/logo.html ./static/img/icons/%s.png',
    item.size,
    item.name
  ))
})
