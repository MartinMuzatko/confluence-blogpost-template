import './less/main.less'
//import './flex.scss'

import riot from 'riot'
import './js/tags/app.html'

document.body.innerHTML += '<app></app>'
riot.mount('*')
