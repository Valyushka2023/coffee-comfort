import fs from 'fs';
import { render } from '@aduh95/viz.js';

const dot = fs.readFileSync('graph.dot', 'utf-8');
const html = render(dot);

fs.writeFileSync('dependency-graph.html', html);

console.log('Графік згенеровано в dependency-graph.html');
