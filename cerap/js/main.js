(function () {
  var navToggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav-main");

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      if (link.getAttribute("href") && link.getAttribute("href").startsWith("#")) {
        link.addEventListener("click", function () {
          nav.classList.remove("is-open");
          navToggle.setAttribute("aria-expanded", "false");
        });
      }
    });
  }

  var strip = document.querySelector(".strip-marquee p");
  if (strip && window.matchMedia("(min-width: 900px)").matches) {
    var t = strip.textContent.trim();
    strip.textContent = t + " · " + t;
  }

  var grid = document.getElementById("calendar-grid");
  var titleEl = document.getElementById("cal-title");
  var prevBtn = document.getElementById("cal-prev");
  var nextBtn = document.getElementById("cal-next");

  if (!grid || !titleEl) return;

  var now = new Date();
  var view = new Date(now.getFullYear(), now.getMonth(), 1);

  function monthLabel(d) {
    return d.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
  }

  function renderCal() {
    var y = view.getFullYear();
    var m = view.getMonth();
    titleEl.textContent = monthLabel(view);

    var first = new Date(y, m, 1);
    var startPad = first.getDay();
    var daysInMonth = new Date(y, m + 1, 0).getDate();
    var prevMonthDays = new Date(y, m, 0).getDate();

    grid.innerHTML = "";

    for (var i = 0; i < startPad; i++) {
      var dayNum = prevMonthDays - startPad + i + 1;
      var cell = document.createElement("div");
      cell.className = "cal-cell is-outside";
      cell.textContent = String(dayNum);
      cell.setAttribute("aria-hidden", "true");
      grid.appendChild(cell);
    }

    for (var d = 1; d <= daysInMonth; d++) {
      var cell = document.createElement("div");
      cell.className = "cal-cell";
      cell.textContent = String(d);
      var cellDate = new Date(y, m, d);
      if (
        cellDate.getDate() === now.getDate() &&
        cellDate.getMonth() === now.getMonth() &&
        cellDate.getFullYear() === now.getFullYear()
      ) {
        cell.classList.add("is-today");
        cell.setAttribute("aria-current", "date");
      }
      grid.appendChild(cell);
    }

    var total = startPad + daysInMonth;
    var endPad = (7 - (total % 7)) % 7;
    for (var j = 1; j <= endPad; j++) {
      var c = document.createElement("div");
      c.className = "cal-cell is-outside";
      c.textContent = String(j);
      c.setAttribute("aria-hidden", "true");
      grid.appendChild(c);
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      view.setMonth(view.getMonth() - 1);
      renderCal();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      view.setMonth(view.getMonth() + 1);
      renderCal();
    });
  }

  renderCal();
})();
