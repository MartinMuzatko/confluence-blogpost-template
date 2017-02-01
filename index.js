import './less/main.less'
import './flex.scss'

import riot from 'riot'
import './js/tags/app.html'

document.querySelector('#footer').outerHTML += '<app></app>'
riot.mount('*')
