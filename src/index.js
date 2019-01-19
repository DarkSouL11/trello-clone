import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { addStickyHoverFix } from './stickyHover';
import api from './api';

// On mobiles/touch enabled devices `:hover` is not removed on touch release.
// So we handle it using below function.
addStickyHoverFix();
api.configure();

ReactDOM.render(<App />, document.getElementById('root'));