// ===========================================================================
// Source
// ===========================================================================
// https://codingbeautydev.com/blog/javascript-dirname-is-not-defined-in-es-module-scope/



// ===========================================================================
// CommonJS
// ===========================================================================
__dirname



// ===========================================================================
// ES Module
// ===========================================================================
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// C:/cb/cb-js
console.log(__dirname);

// C:\cb\cb-js\index.html
console.log(path.join(__dirname, 'index.html'));
