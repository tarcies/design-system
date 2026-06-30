const root = document.documentElement;
let isDark = true;

const darkTheme = 'highlight/styles/tokyo-night-dark.css';
const lightTheme = 'highlight/styles/tokyo-night-light.css';

document.getElementById('themeToggleBtn').addEventListener('click', toggleTheme);

function toggleTheme() {
    isDark = !isDark;

    root.setAttribute('color-scheme', isDark ? '' : 'light');

    toggleThemeIcon();
    toggleCodeTheme();
}

// Removes and loads the icon for the theme toggle button
function toggleThemeIcon() {
    const toggleIcon = document.getElementById('themeToggleIcon');

    toggleIcon.style.transform = 'scale(0.7)';
    toggleIcon.style.opacity = '0';

    setTimeout(() => {
        toggleIcon.innerHTML = '';
        const newIcon = document.createElement('i');
        newIcon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
        toggleIcon.appendChild(newIcon);
        lucide.createIcons();

        toggleIcon.style.opacity = '1';
        toggleIcon.style.transform = 'scale(1)';
    }, 150);
    

    document.querySelectorAll('code').forEach (element => {
        element.style.backgroundColor = isDark ? '' : 'var(--bg-base)';
    });
}

// Switch code block theme between dark/light
function toggleCodeTheme() {
    document.getElementById('codeTheme').href = isDark ? darkTheme : lightTheme;
}

// TODO: Adjust swatch label color to contrast with background


// TODO: Copy color from swatches on click



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
