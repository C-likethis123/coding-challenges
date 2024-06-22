import './styles.css'
const attachEventHandler = ((dropdownId) => {
    // at the start find the element using javascript
    // attach an event listener at the start
    const button = document.querySelector(`#${dropdownId} > button`)
    const menu = document.querySelector(`#${dropdownId} > nav`)
    let isActive = false;
    button.addEventListener('click', () => {
        if (isActive) {
            menu.classList.remove("active");
            button.textContent = "Inactive";
        } else {
            menu.classList.add("active");
            button.textContent = "Active";
        }
        isActive = !isActive;
    })
});

// technically i don't need a dropdown object? I just need to attach the relevant event handler.

(() => {
    const dropdowns = document.querySelectorAll("div[id^='dropdown']");
    dropdowns.forEach(dropdown => attachEventHandler(dropdown.id))
})()