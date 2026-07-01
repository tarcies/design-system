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

function clickCopySwatches() {
    paletteSwatches.forEach(function(swatch) {
        swatch.addEventListener('click', () => setClipboard(window.getComputedStyle(swatch).backgroundColor))
    });
}

async function setClipboard(text) {
    const type = 'text/plain';
    const clipboardItemData = {
        [type]: text,
    };
    const clipboardItem = new ClipboardItem(clipboardItemData);
    await navigator.clipboard.write([clipboardItem])
    notify('success', 'Copied');
}

async function notify(status, text) {
    const notifyTab = document.createElement('div');
    notifyTab.classList.add('card', 'h2', 'notification', 'easing-fast');

    switch (status) {
        case 'success':
            notifyTab.style.color = 'var(--success)';
            break;
        case 'warn':
        case 'warning':
            notifyTab.style.color = 'var(--warning)';
            break;
        case 'error':
        case 'danger':
            notifyTab.style.color = 'var(--danger)';
            break;
        case 'info':
        case 'information':
            notifyTab.style.color = 'var(--info)';
            break;
        default:
            console.error(`Unknown status: ${status}`);
            break;
    }

    // TODO: Add status icon to the left of the text

    notifyTab.append(text);
    document.body.append(notifyTab);

    notifyTab.style.transform = 'translate(-50%, -100%)';
    await sleep(150);
    notifyTab.style.transform = 'translate(-50%, 50%)';
    await sleep(2000);
    notifyTab.style.transform = 'translate(-50%, -100%)';
    await sleep(150);
    notifyTab.remove();
}

swatchContrastGenerator();
clickCopySwatches();

document.getElementById('themeToggleBtn').addEventListener('click', toggleTheme);