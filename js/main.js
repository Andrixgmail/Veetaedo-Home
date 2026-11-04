/* Veetaedo Home site behaviour */
(function () {
  "use strict";

  var WA_NUMBER = "27615444943";

  // Catalogue taken from the Veetaedo Home WhatsApp Business catalogue.
  var products = [
    { id: "p01", name: "L Shape and 1 Seater", price: 19000, img: "p01.jpg", cats: ["l", "set"], colour: "Charcoal",
      desc: "Deep, tufted charcoal modular L-shape paired with a matching single seater. A full lounge in one order." },
    { id: "p02", name: "L Shaped", price: 14500, img: "p02.jpg", cats: ["l"], colour: "Cognac",
      desc: "Soft cognac suede-look L-shape with a generous chaise and plump scatter cushions." },
    { id: "p03", name: "U Shaped", price: 14000, img: "p03.jpg", cats: ["u"], colour: "Charcoal grey",
      desc: "Low-slung, clean-lined U-shape in charcoal grey, made for big family lounges." },
    { id: "p04", name: "Combo", price: 23000, img: "p04.jpg", cats: ["u", "set"], colour: "Dove grey",
      desc: "Our statement combo: a wraparound dove-grey lounge with built-in centre platform and quilted backrests." },
    { id: "p05", name: "Pumpkin 2 Seater", price: 10500, img: "p05.jpg", cats: ["pumpkin"], colour: "Cream bouclé",
      desc: "The sculptural pumpkin 2-seater in cream bouclé. A sculpture you can sit on." },
    { id: "p06", name: "3 Seater & 2 Seater Set", price: 19000, img: "p06.jpg", cats: ["set"], colour: "Cream",
      desc: "Matching cream 3-seater and 2-seater with puffed, channel-stitched cushions." },
    { id: "p07", name: "Pumpkin U Shaped Couch", price: 15500, img: "p07.jpg", cats: ["u", "pumpkin"], colour: "Storm grey",
      desc: "Pillowy, tufted pumpkin-style U-shape in storm grey. Sink-in comfort for the whole family." },
    { id: "p08", name: "Puffed L Shape Couch", price: 16000, img: "p08.jpg", cats: ["l"], colour: "Ivory",
      desc: "Ivory puffed L-shape with cloud-like seat cushions and a long, clean silhouette." },
    { id: "p09", name: "Pumpkin L Shape and 1 Seater Pumpkin", price: 17000, img: "p09.jpg", cats: ["l", "set", "pumpkin"], colour: "Grey",
      desc: "Grey pumpkin L-shape with a matching round pumpkin chair. The couch alone is R13 000 with cushions." },
    { id: "p11", name: "Bubble U Shaped", price: 17000, img: "p11.jpg", cats: ["u"], colour: "Mocha",
      desc: "Mocha bubble U-shape, 3.5 m by 2 m by 2 m as shown. Can be measured to your space." },
    { id: "p12", name: "Pumpkin L Shape Couch", price: 12000, img: "p12.jpg", cats: ["l", "pumpkin"], colour: "Teal",
      desc: "Rich teal pumpkin L-shape with chunky tufted seats. Our most popular entry into the pumpkin range." },
    { id: "p13", name: "Veetaedo L Shape Couch", price: 14500, img: "p13.jpg", cats: ["l"], colour: "Light grey",
      desc: "The signature Veetaedo L-shape in light grey with adjustable headrests. We do all colours." }
  ];

  var catLabel = { l: "L-shaped", u: "U-shaped", set: "Set", pumpkin: "Pumpkin range" };

  function rand(n) { return "R" + n.toLocaleString("en-ZA").replace(/,/g, " ").replace(/ /g, " "); }
  function waLink(text) { return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text); }
  function orderText(p) {
    return "Hi Veetaedo Home, I'm interested in the " + p.name + " (" + rand(p.price) + "). Could you share colour options and availability?";
  }

  /* Product grid */
  var grid = document.getElementById("productGrid");
  function render(filter) {
    var list = products.filter(function (p) { return filter === "all" || p.cats.indexOf(filter) > -1; });
    grid.innerHTML = list.map(function (p, i) {
      return '<button class="card" type="button" data-id="' + p.id + '" style="animation-delay:' + (i * 0.05) + 's">' +
        '<div class="card-img"><img src="images/products/' + p.img + '" alt="' + p.colour + ' ' + p.name + '" loading="lazy" width="957" height="1186">' +
        '<span class="tag">' + catLabel[p.cats[0]] + '</span><span class="view">View details</span></div>' +
        '<div class="card-meta"><h3>' + p.name + '</h3><span class="price">' + rand(p.price) + '</span></div>' +
        '<p class="card-sub">' + p.colour + ' · any colour available</p>' +
        '</button>';
    }).join("");
  }
  render("all");

  document.querySelectorAll(".chip").forEach(function (chip) {
    chip.addEventListener("click", function () {
      document.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("is-active"); c.setAttribute("aria-selected", "false"); });
      chip.classList.add("is-active"); chip.setAttribute("aria-selected", "true");
      render(chip.dataset.filter);
    });
  });

  /* Modal */
  var modal = document.getElementById("productModal");
  grid.addEventListener("click", function (e) {
    var card = e.target.closest(".card"); if (!card) return;
    var p = products.find(function (x) { return x.id === card.dataset.id; });
    document.getElementById("modalImg").src = "images/products/" + p.img;
    document.getElementById("modalImg").alt = p.colour + " " + p.name;
    document.getElementById("modalTag").textContent = p.cats.map(function (c) { return catLabel[c]; }).join(" · ");
    document.getElementById("modalTitle").textContent = p.name;
    document.getElementById("modalPrice").textContent = rand(p.price);
    document.getElementById("modalDesc").textContent = p.desc;
    document.getElementById("modalOrder").href = waLink(orderText(p));
    if (modal.showModal) modal.showModal(); else modal.setAttribute("open", "");
  });
  document.getElementById("modalClose").addEventListener("click", function () { modal.close(); });
  modal.addEventListener("click", function (e) { if (e.target === modal) modal.close(); });

  /* Mobile menu */
  var menuBtn = document.getElementById("menuBtn");
  var nav = document.getElementById("nav");
  menuBtn.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { nav.classList.remove("is-open"); menuBtn.setAttribute("aria-expanded", "false"); });
  });

  /* Colour swatches */
  var swImg = document.getElementById("swatchImg");
  document.querySelectorAll(".swatch").forEach(function (sw) {
    sw.addEventListener("click", function () {
      document.querySelectorAll(".swatch").forEach(function (s) { s.classList.remove("is-active"); s.setAttribute("aria-checked", "false"); });
      sw.classList.add("is-active"); sw.setAttribute("aria-checked", "true");
      swImg.classList.add("is-fading");
      setTimeout(function () {
        swImg.src = sw.dataset.img; swImg.alt = sw.dataset.name + " couch";
        swImg.onload = function () { swImg.classList.remove("is-fading"); };
      }, 250);
    });
  });

  /* Open-now status (South African time) */
  try {
    var parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Johannesburg", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
    var get = function (t) { return (parts.find(function (x) { return x.type === t; }) || {}).value; };
    var dayIdx = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
    var mins = parseInt(get("hour"), 10) * 60 + parseInt(get("minute"), 10);
    var open = mins >= 540 && mins < 1080;
    var status = document.getElementById("openStatus");
    status.textContent = open ? "Showroom open now · until 18:00" : "Showroom opens daily at 09:00";
    if (open) status.classList.add("is-open");
    var row = document.querySelector('#hoursTable tr[data-day="' + dayIdx + '"]');
    if (row) row.classList.add("is-today");
  } catch (e) { /* keep default text */ }

  /* Enquiry form to WhatsApp */
  var sel = document.getElementById("fPiece");
  sel.innerHTML = '<option value="">Not sure yet / custom design</option>' +
    products.map(function (p) { return '<option value="' + p.name + " (" + rand(p.price) + ')">' + p.name + " - " + rand(p.price) + "</option>"; }).join("");
  document.getElementById("enquiryForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("fName").value.trim();
    var err = document.getElementById("formError");
    if (!name) { err.hidden = false; document.getElementById("fName").focus(); return; }
    err.hidden = true;
    var lines = ["Hi Veetaedo Home, my name is " + name + "."];
    var piece = sel.value, colour = document.getElementById("fColour").value.trim(),
        size = document.getElementById("fSize").value.trim(), msg = document.getElementById("fMsg").value.trim();
    lines.push(piece ? "I'm interested in the " + piece + "." : "I'd like a quote for a custom couch.");
    if (colour) lines.push("Preferred colour: " + colour + ".");
    if (size) lines.push("Space available: " + size + ".");
    if (msg) lines.push(msg);
    window.open(waLink(lines.join("\n")), "_blank", "noopener");
  });

  /* Scroll reveal (content stays visible without JS) */
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var els = document.querySelectorAll(".section-head, .why-grid article, .mosaic a, .steps li, .visit-copy, .map-frame, .faq-list details");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.remove("pre"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) {
      var r = el.getBoundingClientRect();
      el.classList.add("reveal");
      if (r.top > window.innerHeight) { el.classList.add("pre"); io.observe(el); }
    });
  }

  document.getElementById("year").textContent = new Date().getFullYear();
})();
