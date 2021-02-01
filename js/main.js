import { renderSocials } from './components/renderSocials.js';
import { socialsData } from './data/socialsData.js';

import { renderProgressBars } from './components/renderProgressBars.js';
import { progressBarData } from './data/progressBarData.js';

renderProgressBars('.left-column', progressBarData);
renderSocials('footer > .socials', socialsData);