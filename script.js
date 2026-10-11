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

const projects = {
    selfad: {
        description: "CTF platform aimed at individual participation in an Attack-Defense format.",
        url: "https://github.com/max-cyou/SelfAD",
    },
    eblangpt: {
        description: "EblanGPT Telegram bot.",
        url: "https://github.com/max-cyou/eblangpt-bot",
    },
    radar: {
        description: "Undetected CS2 browser based radar cheat ported on Linux",
        url: "https://github.com/max-cyou/cs2-linux-webradar",
    },
    ctf: {
        description: "Official challenge source archive for J2W Autumn CTF, organized by the jmp2win team.",
        url: "https://github.com/max-cyou/j2w-autumn-ctf",
    },
};

const projectButtons = document.querySelectorAll(".project-tab");
const projectDescription = document.querySelector("#project-description");
const projectLink = document.querySelector("#project-link")

const projectUnderline = document.querySelector(".project-underline");

function moveProjectUnderline(button) {
    projectUnderline.style.width = `${button.offsetWidth}px`;
    projectUnderline.style.transform =
        `translateX(${button.offsetLeft}px)`;
}

const projectDetails = document.querySelector(".project-details");

function selectProject(key) {
    const project = projects[key];

    projectDescription.textContent = project.description;
    projectLink.href = project.url;

    for (const button of projectButtons) {
        const isSelected = button.dataset.project === key;
        button.setAttribute("aria-pressed", String(isSelected));
    }

  const activeButton = document.querySelector(
    '.project-tab[aria-pressed="true"]'
  );

  moveProjectUnderline(activeButton);

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    for (const animation of projectDetails.getAnimations()) {
      animation.cancel();
    }

    projectDetails.animate(
      [{ opacity: 0 }, { opacity: 1 }],
      { duration: 220, easing: "ease-out" }
    );
  }
}

for (const button of projectButtons) {
    button.addEventListener("click", () => {
        selectProject(button.dataset.project);
    });
}

selectProject("selfad");

window.addEventListener("resize", () => {
  const activeButton = document.querySelector(
    '.project-tab[aria-pressed="true"]'
  );

  moveProjectUnderline(activeButton);
})
