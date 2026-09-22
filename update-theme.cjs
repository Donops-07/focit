const fs = require('fs');

const cssPath = './src/index.css';
let css = fs.readFileSync(cssPath, 'utf8');

// Update theme block
css = css.replace(/--color-green-primary: #[0-9a-fA-F]+;/, '--color-blue-primary: #0a1142;');
css = css.replace(/--color-green-dark: #[0-9a-fA-F]+;/, '--color-blue-dark: #070c2e;');
css = css.replace(/--color-green-darker: #[0-9a-fA-F]+;/, '--color-blue-darker: #040617;');
css = css.replace(/--color-green-light: #[0-9a-fA-F]+;/, '--color-blue-light: #16258f;');
css = css.replace(/--color-green-lightest: #[0-9a-fA-F]+;/, '--color-blue-lightest: #e6e8f4;');

css = css.replace(/--color-text-on-green/g, '--color-text-on-blue');

// Update fonts in theme
css = css.replace(/--font-sans: [^;]+;/, '--font-sans: "Inter", system-ui, sans-serif;');
css = css.replace(/--font-heading: [^;]+;/, '--font-heading: "Merriweather", serif;');

// Update class names globally in CSS
css = css.replace(/green/g, 'blue');

fs.writeFileSync(cssPath, css);

console.log('CSS Theme Updated');
