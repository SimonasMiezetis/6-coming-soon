import { clock } from './components/clock.js';

import { renderSocials } from './components/renderSocials.js';
import { socialsData } from './data/socialsData.js';

import { renderProgressBars } from './components/renderProgressBars.js';
import { progressBarData } from './data/progressBarData.js';

clock('.clock', '12-14 18:00:00');
renderProgressBars('.left-column', progressBarData);
renderSocials('footer > .socials', socialsData);