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
