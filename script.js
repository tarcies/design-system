const root = document.documentElement;
let isDark = true;

const darkTheme = 'highlight/styles/tokyo-night-dark.css';
const lightTheme = 'highlight/styles/tokyo-night-light.css';

const paletteSwatches = [...document.getElementsByClassName('palette-swatch')];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function toggleTheme() {
    isDark = !isDark;

    root.setAttribute('color-scheme', isDark ? '' : 'light');

    toggleThemeIcon();
    toggleCodeTheme();
    swatchContrastGenerator();
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

// Adjust swatch label color to contrast with background
function swatchContrastGenerator() {
    paletteSwatches.forEach(function(swatch) {
        const rgbString = window.getComputedStyle(swatch).backgroundColor;

        const [r, g, b] = rgbString.slice(4, -1).split(', ');

        // https://www.w3.org/TR/AERT/#color-contrast
        colorDiff = ((r * 299) + (g * 587) + (b * 114)) / 1000

        swatch.style.color = colorDiff > 125 ? 'black' : 'white';
    });
}

swatchContrastGenerator();

document.getElementById('themeToggleBtn').addEventListener('click', toggleTheme);