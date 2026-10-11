const clock = document.querySelector("#moscow-time");

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/Moscow",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
})

function updateClock() {
  clock.textContent = formatter.format(new Date());
}

updateClock();
setInterval(updateClock, 1000)

const navLinks = document.querySelectorAll(".topbar a");
const sections = document.querySelectorAll("section[id]");

const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        for (const link of navLinks) {
            const isActive =
                link.getAttribute("href") === `#${entry.target.id}`;

            if (isActive) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        }
    }
}, {
    threshold: 0.55,
});

for (const section of sections) {
    observer.observe(section);
}
