const root = document.documentElement;
let isDark = true;

const darkTheme = 'highlight/styles/tokyo-night-dark.css';
const lightTheme = 'highlight/styles/tokyo-night-light.css';

function toggleTheme() {
    isDark = !isDark;
    console.log(isDark);

    root.setAttribute('color-scheme', isDark ? '' : 'light');
    document.getElementById('themeLabel').innerHTML = isDark ? 'O' : '|';

    toggleCodeTheme();
}

// TODO: Adjust swatch label color to contrast with background




// Switch code block theme between dark/light
function toggleCodeTheme() {
    document.getElementById('codeTheme').href = isDark ? darkTheme : lightTheme;
}



// const swatches = [
//     document.getElementById('background-swatches'), 
//     document.getElementById('accent-swatches'), 
//     document.getElementById('semantic-swatches')
// ]

// const backgroundTokenArr = ['--bg-base', '--bg-surface', '--bg-elevated', '--bg-subtle'];
// const accentTokenArr = [
//     '--purple-900', '--purple-800', '--purple-600', '--purple-500', 
//     '--purple-400', '--purple-300', '--purple-100'
// ];
// const semanticTokenArr = ['--success', '--warning', '--error', '--info'];

// const tokenArrs = [backgroundTokenArr, accentTokenArr, semanticTokenArr];
// const rootStyles = window.getComputedStyle(root);

// swatches.forEach((swatchRow, rowID) => {
//     if (!swatchRow) return;

//     let loadedTokenArr = tokenArrs[rowID];

//     loadedTokenArr.forEach((colorToken, tokenID) => {
//         let swatch = document.createElement('div');
//         swatch.className = 'palette-swatch';

//         const colorValue = rootStyles.getPropertyValue(colorToken).trim();
//         swatch.style.backgroundColor = colorValue;

//         const nameValue = colorToken.replace(/^--(bg-|purple-)?/, '');

//         let labelSpan = document.createElement('span');
//         labelSpan.className = 'palette-swatch-label';
//         labelSpan.textContent = nameValue;
        
//         // don't judge me ._.
//         if(tokenID > 3 || rowID == 2) {
//             labelSpan.style.color = 'var(--gray-800)';
//         }
        
//         swatch.appendChild(labelSpan);
//         swatchRow.appendChild(swatch);
//     });
// });
