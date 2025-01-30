/*==================== INITIAL PAGE ====================*/

// reveal button, overlay and main content
const revealButton = document.getElementById('reveal-button');
const overlay = document.getElementById('overlay');
const mainContent = document.getElementById('main-content');

revealButton.addEventListener('click', () => {
    // Start css animation for the button
    revealButton.classList.add('enlarge-button');

    // animation = 1 s
    setTimeout(() => {
        // fade out
        overlay.classList.add('fade-out');
        // main content
        mainContent.classList.add('show-content');
    }, 1000); // completes button animation before overlay fades out and main cointent -> revealed
});


/*==================== SHOW MENU ====================*/
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)
    
    // Validate that variables exist
    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            // Add the show-menu class to the div tag with the nav__menu class
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When clicking on each nav__link, the show-menu class s removed
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== SHOW SCROLL TOP ====================*/ 
function scrollTop(){
    const scrollTop = document.getElementById('scroll-top');
    //when the scroll is higher than 560 viewpoint height, add the show-scroll class to the tag with the scroll-top class
    if(this.scrollY >= 200) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)

/*==================== THEME ====================*/  
// Function to check and apply the current theme
function applyTheme() {
    const themeButton = document.getElementById('theme-button');
    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeButton.classList.remove('bxs-yin-yang');
        themeButton.classList.add('bxs-palette');
    } else {
        document.body.classList.remove('dark-theme');
        themeButton.classList.remove('bxs-palette');
        themeButton.classList.add('bxs-yin-yang');
    }
}

// Function to toggle theme
function toggleTheme() {
    const themeButton = document.getElementById('theme-button');
    const isDark = document.body.classList.contains('dark-theme');

    if (isDark) {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
        themeButton.classList.remove('bxs-palette');
        themeButton.classList.add('bxs-yin-yang');
    } else {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
        themeButton.classList.remove('bxs-yin-yang');
        themeButton.classList.add('bxs-palette');
    }
}

// Event listener for the theme button
document.getElementById('theme-button').addEventListener('click', toggleTheme);

// Apply the saved theme when the page loads
applyTheme();


/*==================== DOWNLOAD PDF IN MOBILE OR DESKTOP ====================*/ 

function toggleDownloadButtons() {
    const desktopButton = document.getElementById('downloadButton');
    const mobileButton = document.querySelector('.home__button-movil');

    if (window.innerWidth <= 768) {
        // Hide the desktop button, show the mobile button
        if (desktopButton) desktopButton.style.display = 'none';
        if (mobileButton) mobileButton.style.display = 'block';
    } else {
        // Show the desktop button, hide the mobile button
        if (desktopButton) desktopButton.style.display = 'block';
        if (mobileButton) mobileButton.style.display = 'none';
    }
}

// Run function on page load and when the window is resized
window.addEventListener('load', toggleDownloadButtons);
window.addEventListener('resize', toggleDownloadButtons);