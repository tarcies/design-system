const root = document.documentElement;
let isDark = true;

const darkTheme = 'tokyo-night-dark.css';
const lightTheme = 'tokyo-night-light.css';

const STATUS_COLORS = {
    success: '--success',
    warn: '--warning',
    warning: '--warning',
    error: '--danger',
    danger: '--danger',
    info: '--info',
    information: '--info',
};

const STATUS_ICONS = {
    success: 'circle-check',
    warn: 'circle-alert',
    warning: 'circle-alert',
    error: 'circle-x',
    danger: 'circle-x',
    info: 'circle-question-mark',
    information: 'circle-question-mark',
};
const paletteSwatches = [...document.getElementsByClassName('palette-swatch'), ...document.getElementsByClassName('color-token-preview')];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Toggles highlight on nav bar
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navigation a');

function setActiveLink(activeId) {
    navLinks.forEach((link) => {
        link.classList.remove('active');
        link.classList.toggle(
            'active',
            link.getAttribute('href').slice(1) === activeId
        );
    });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const activeId = entry.target.getAttribute('id');
            setActiveLink(activeId);
        }
    });
}, {
    root: null,
    rootMargin: '-45% 0px -45% 0px',
    threshold: 0
});

sections.forEach((section) => observer.observe(section));

navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        if (!targetSection) return;

        targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
});

// place this right before </body>, or reuse your footer's closing edge
const bottomSentinel = document.createElement('div');
bottomSentinel.style.height = '1px';
document.body.appendChild(bottomSentinel);

const lastLink = navLinks[navLinks.length - 1];

const bottomObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    setActiveLink(lastLink.getAttribute('href').slice(1));
  }
}, {
  root: null,
  threshold: 0
});

bottomObserver.observe(bottomSentinel);

// Toggles dark/light theme
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
    let link = document.getElementById('codeTheme').href;
    link = link.replace(!isDark ? darkTheme : lightTheme, isDark ? darkTheme : lightTheme);
    
    document.getElementById('codeTheme').href = link;
}

// Adjust swatch label color to contrast with background
function swatchContrastGenerator() {

    paletteSwatches.forEach(function(swatch) {
        const rgbString = window.getComputedStyle(swatch).backgroundColor;
        const [r, g, b] = rgbString.slice(4, -1).split(', ');

        // https://www.w3.org/TR/AERT/#color-contrast
        colorDiff = ((r * 299) + (g * 587) + (b * 114)) / 1000;

        swatch.style.color = colorDiff > 125 ? 'black' : 'white';
    });
}

function clickCopySwatches() {
    paletteSwatches.forEach(swatch => {
        swatch.addEventListener('click', (e) => {
            const target = e.target.closest('.palette-swatch, .color-token-preview');
            if (target) setClipboard(window.getComputedStyle(target).backgroundColor);
        }); 
    });
}

async function setClipboard(text) {
    await navigator.clipboard.writeText(text);
    notify('success', 'Copied');
}

async function notify(status, text) {
    const icon = STATUS_ICONS[status];
    const color = STATUS_COLORS[status];
    if (!icon || !color) { console.log(`Unknown status: ${status}`); return; }

    const notifyTab = document.createElement('div');
    notifyTab.classList.add('notification', 'card', 'h2');
    notifyTab.style.color = `var(${color})`;
    
    const newIcon = document.createElement('i');
    newIcon.setAttribute('data-lucide', icon);
    notifyTab.append(newIcon);
    notifyTab.append(text);

    notifyTab.addEventListener('animationend', () => notifyTab.remove(), { once: true });
    
    document.body.append(notifyTab);
    lucide.createIcons();
}

swatchContrastGenerator();
clickCopySwatches();

document.getElementById('themeToggleBtn').addEventListener('click', toggleTheme);