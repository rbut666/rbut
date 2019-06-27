import { rafLoop, go_and_stop } from './forRaf+++.js';

rafLoop(document.getElementsByClassName('box1')[0], document.getElementsByClassName('wrap1')[0], 'top')
rafLoop(document.getElementsByClassName('box2')[0], document.getElementsByClassName('wrap2')[0], 'left')

go_and_stop(document.getElementsByClassName('box1')[0], document.getElementsByClassName('box1')[0], 'click')