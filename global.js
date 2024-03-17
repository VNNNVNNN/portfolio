console.log('IT\'S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

const pages = [
  {url: 'index.html', title: 'Home'},
  {url: 'projects_index.html', title: 'Projects'},
  {url: 'resume.html', title: 'Resume'},
  {url: 'contact_index.html', title: 'Contact'},
];

// Create navigation menu
const nav = document.createElement('nav');
document.body.prepend(nav);

for (const p of pages) {
  const url = p.url;
  const title = p.title;
  const link = document.createElement('a');

  const a = link;
  a.href = url;
  a.textContent = title;
  nav.append(a);

  if (a.host === location.host && a.pathname === location.pathname) {
    a.classList.add('current');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Function to dynamically create the dark mode switch
  function createDarkModeSwitch() {
    document.body.insertAdjacentHTML('afterbegin', `
            <label class="color-scheme" >
                Theme:
                <select id="theme-select">
                    <option value="auto">Automatic</option>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </label>`,
    );
    // Get the select element
    const selectElement = document.getElementById('theme-select');

    // Check if the browser prefers dark mode
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (localStorage.colorScheme) {
        selectElement.value = localStorage.colorScheme;
      } else if (prefersDarkMode) {
        selectElement.value = 'auto'; // Set to "Automatic" as it matches OS dark mode
      } else {
        selectElement.value = 'auto'; // Set to "Automatic" by default
      }

      // Function to set color scheme and save it to localStorage
      function setColorScheme(colorScheme) {
        localStorage.colorScheme = colorScheme;
        selectElement.value = colorScheme; // Update select element's value
        if (colorScheme === 'auto') {
          document.documentElement.style.colorScheme = 'auto';
        } else if (colorScheme === 'light') {
          document.documentElement.style.colorScheme = 'light';
        } else if (colorScheme === 'dark') {
          document.documentElement.style.colorScheme = 'dark';
        }
      }

      // Add event listener to detect changes and set color scheme accordingly
      selectElement.addEventListener('change', function(event) {
        console.log("Color scheme changed to", event.target.value); // Log the selected value
        setColorScheme(event.target.value);
      });

      // Set color scheme based on localStorage on page load
      setColorScheme(selectElement.value);
    }

    // Call the function to create the dark mode switch
    createDarkModeSwitch();
});
