const urls = {
  attendance:
    "http://115.241.194.20/sis/Examination/Reports/StudentSearchHTMLReport_student.aspx?R=MjAyMzA5MBI2NTZ4",
  exam:
    "https://narayanagroup.co.in/patient/EngAutonomousReport.aspx/MjAyMjA5MDI2MDgx"
};

const input = document.getElementById("inputText");
const progressBarContainer = document.getElementById("progressBarContainer");
const progressBar = document.getElementById("progressBar");
const popup = document.getElementById("accessPopup");
const clickSound = document.getElementById("clickSound");
const popupSound = document.getElementById("popupSound");
const darkModeToggle = document.getElementById("darkModeToggle");

function animateProgressBar() {
  progressBarContainer.style.display = "block";
  progressBar.style.width = "0%";

  let width = 0;
  const interval = setInterval(() => {
    width += 5;
    progressBar.style.width = width + "%";
    if (width >= 100) {
      clearInterval(interval);
      progressBarContainer.style.display = "none";
    }
  }, 100);
}

function showPopup() {
  popup.classList.add("show");
  popupSound.play();
  setTimeout(() => popup.classList.remove("show"), 2200);
}

function generateURL(type) {
  const regNo = input.value.trim();
  if (!regNo) {
    alert("Please enter Registration Number!");
    return;
  }

  clickSound.play();
  animateProgressBar();

  setTimeout(() => {
    const encoded = btoa(regNo);
    const newURL = urls[type].replace(/MjAyMzA5MBI2NTZ4|MjAyMjA5MDI2MDgx/g, encoded);
    window.open(newURL, "_blank");
    showPopup();
    input.value = "";
  }, 2000);
}

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  clickSound.play();
});

/* Canvas Grid Animation */
const canvas = document.getElementById("gridCanvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

let offset = 0;
function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "rgba(0,255,231,0.05)";

  for (let x = 0; x < canvas.width; x += 80) {
    for (let y = 0; y < canvas.height; y += 80) {
      ctx.strokeRect(x + offset, y + offset, 80, 80);
    }
  }
  offset = (offset + 0.5) % 80;
  requestAnimationFrame(drawGrid);
}
drawGrid();
