
function ls(a,b) {
  if (a === -Infinity) {
    return b;
  }
  return Math.max(a, b) + Math.log10(1 + 10**(Math.min(a, b) - Math.max(a, b)))
}
function ld(a,b) {
  return a + Math.log10(1 - 10**(b - a))
}

let v = 2;
let vps = -Infinity;
let t = 0;
let tc = 3;
let b = 0;
let bc = 2;
let nuked = 3;
let tpower = Math.log10(1.13);
let m = -Infinity;
let nextmatter = 0;
let matterstage = false;

const val = document.getElementById("val");
const initialGeneratorData = [
  { cost: 2, mult: 3 },
  { cost: 3, mult: 4 },
  { cost: 5, mult: 5 },
  { cost: 6, mult: 6 },
  { cost: 10, mult: 8 },
  { cost: 14, mult: 10 },
  { cost: 19, mult: 12 },
  { cost: 25, mult: 15 },
];

const generators = [];
for (let i = 0; i < 8; i++) {
  generators.push({
    level: -Infinity,
    bought: 0,
    cost: initialGeneratorData[i].cost,
    gain: 0,
    mult: initialGeneratorData[i].mult,
  });
}

function gameloop() {
  let totalVps = -Infinity;

  generators.forEach((g, i) => {
    const prev = i > 0 ? generators[i - 1] : null;
    const gainRate = [10, 5, 2, 1.5, 1.25, 1.1, 1.05][i - 1] || 1;
    totalVps = ls(totalVps,g.level + g.gain + Math.log10(i === 0 ? 150 : gainRate) + (tpower * t) + (Math.log10(3)*b))
    if (prev) {
      prev.level = ls(prev.level, g.level + g.gain + Math.log10(gainRate) + tpower - Math.log10(dt))
    }
  });

  v = ls(v, totalVps - Math.log10(dt));
  tpower = Math.log10(1.13) + (Math.log10(1.005) * (nuked - 3));
  nextmatter = Math.log10(10 ** (v / 200 - 0.75));

  val.textContent = fx(v);
  document.getElementById("vps").textContent = fx(totalVps);
  document.getElementById("t").textContent = t;
  document.getElementById("tc").textContent = fx(tc);
  document.getElementById("b").textContent = b;
  document.getElementById("bc").textContent = bc;
  document.getElementById("time").textContent = fx(tpower * t);
  document.getElementById("tpower").textContent = fx(tpower);
  document.getElementById("nuked").textContent = nuked;
  document.getElementById("nukedreal").textContent = nuked-3;
  document.getElementById("nextmatter").textContent = fx(nextmatter);
  

  const matterContainer = document.getElementById("matterContainer");
  const matterDisplay = document.getElementById("matter");
  
  if (matterstage) {
    matterContainer.style.display = "inline";
    matterDisplay.textContent = fx(m);
  } else {
    matterContainer.style.display = "none";
  }

  generators.forEach((g, i) => {
    const idx = i + 1;
    document.getElementById(`e${idx}g`).textContent = fx(g.level);
    document.getElementById(`e${idx}gb`).textContent = g.bought;
    document.getElementById(`e${idx}gc`).textContent = fx(g.cost);
    document.getElementById(`e${idx}gx`).textContent = fx(g.gain+(b*Math.log10(3)));

    const btnSingle = document.querySelector(`button[onclick="Eg${idx}s()"]`);
    const btnMax = document.querySelector(`input[onclick="Eg${idx}m()"]`);

    btnSingle.disabled = v < g.cost;
    btnSingle.style.backgroundColor = btnSingle.dataset.flash === "true" ? "#00FF00" : v >= g.cost ? "#ddd" : "#999";
    btnMax.disabled = v < g.cost;
    btnMax.style.backgroundColor = btnMax.dataset.flash === "true" ? "#00FF00" : v >= g.cost ? "#ddd" : "#999";
  });

  const tcBtn = document.querySelector(`button[onclick="Ts()"]`);
  const tcMaxBtn = document.querySelector(`input[onclick="Tm()"]`);

  tcBtn.disabled = v < tc;
  tcBtn.style.backgroundColor = tcBtn.dataset.flash === "true" ? "#00FF00" : v >= tc ? "#ddd" : "#999";
  tcMaxBtn.disabled = v < tc;
  tcMaxBtn.style.backgroundColor = tcMaxBtn.dataset.flash === "true" ? "#00FF00" : v >= tc ? "#ddd" : "#999";

  const gen8 = generators[7];
  const boostBtn = document.querySelector(`button[onclick="Bs()"]`);
  boostBtn.disabled = 10**gen8.level < bc;
  boostBtn.style.backgroundColor = boostBtn.dataset.flash === "true"
    ? "#00FF00"
    : 10**gen8.level >= bc
      ? "#ddd"
      : "#999";

  const nukeBtn = document.querySelector(`button[onclick="Ns()"]`);
  nukeBtn.disabled = 10**gen8.level <= nuked;
  nukeBtn.style.backgroundColor = nukeBtn.dataset.flash === "true"
    ? "#00FF00"
    : 10**gen8.level > nuked
      ? "#ddd"
      : "#999";

  let canBuy = false;
  generators.forEach((g) => {
    if (v >= g.cost) canBuy = true;
  });
  if (v >= tc) canBuy = true;

  const maxAllBtn = document.querySelector(`button[onclick="maxAll()"]`);
  maxAllBtn.style.backgroundColor = canBuy ? "#060" : "#000000";
  
  const condenseBtn = document.getElementById("condenseBtn");
  if (v >= 200) {
    condenseBtn.style.display = "inline-block";
  } else {
    condenseBtn.style.display = "none";
  }
  
  const matterBtn = document.getElementById("matterBtn");
  matterBtn.style.display = matterstage ? "inline-block" : "none";
}

function fx(num) {
  if (num === -Infinity) {
    
  }
  if (num < 300) {
    return 10**num >= 10000 ? (10**num).toExponential(2).replace("e+", "e") : (10**num).toFixed(2);
  }
  else {
    return (10**(num - Math.floor(num))).toFixed(2).toString() + "e" + Math.floor(num).toString();
  }
}

function Ts() {
  if (v >= tc) {
    t++;
    v = ld(v,tc);
    tc++;

    const btn = document.querySelector(`button[onclick="Ts()"]`);
    btn.dataset.flash = "true";
    btn.style.backgroundColor = "#00FF00";

    setTimeout(() => {
      btn.dataset.flash = "false";
    }, 200);
  }
}

function Bs() {
  const g8 = generators[7];
  if (10**g8.level >= bc) {
    b++;
    bc += 2;
    v = 2;

    generators.forEach((g, i) => {
      g.level = -Infinity;
      g.bought = 0;
      g.cost = initialGeneratorData[i].cost;
      g.gain = 0;
    });

    t = 0;
    tc = 3;

    const btn = document.querySelector(`button[onclick="Bs()"]`);
    btn.dataset.flash = "true";
    btn.style.backgroundColor = "#00FF00";

    setTimeout(() => {
      btn.dataset.flash = "false";
    }, 200);
  }
}

function Ns() {
  const g8 = generators[7];
  if (10**g8.level > nuked) {
    nuked = Math.round(10**g8.level);
    v = 2;
    b = 0;
    bc = 2;

    generators.forEach((g, i) => {
      g.level = -Infinity;
      g.bought = 0;
      g.cost = initialGeneratorData[i].cost;
      g.gain = 0;
    });

    t = 0;
    tc = 3;

    const btn = document.querySelector(`button[onclick="Ns()"]`);
    btn.dataset.flash = "true";
    btn.style.backgroundColor = "#00FF00";

    setTimeout(() => {
      btn.dataset.flash = "false";
    }, 200);
  }
}

function Tm() {
  while (v >= tc) {
    Ts();
  }
}

function buySingle(index) {
  const g = generators[index - 1];
  if (v >= g.cost) {
    g.level = ls(g.level, 0);
    g.bought++;
    v = ld(v, g.cost);
    g.cost += g.mult;
    g.gain += Math.log10(2);

    const btn = document.querySelector(`button[onclick="Eg${index}s()"]`);
    btn.dataset.flash = "true";
    btn.style.backgroundColor = "#00FF00";

    setTimeout(() => {
      btn.dataset.flash = "false";
    }, 200);
  }
}

function buyMax(index) {
  while (v >= generators[index - 1].cost) {
    buySingle(index);
  }
}

function maxAll() {
  for (let i = 1; i <= 8; i++) {
    buyMax(i);
  }
  Tm();
}

function condense() {
  if (v >= 200) {
    matterstage = true;
    const gained = Math.log10(10 ** (v / 200 - 0.75));
    m = ls(m,gained);
    v = 2;
    t = 0;
    tc = 3;
    b = 0;
    bc = 2;
    nuked = 3;
    tpower = Math.log10(1.13);
    generators.forEach((g, i) => {
      g.level = -Infinity;
      g.bought = 0;
      g.cost = initialGeneratorData[i].cost;
      g.gain = 0;
    });
    const btn = document.getElementById("condenseBtn");
    btn.dataset.flash = "true";
    btn.style.backgroundColor = "#00FF00";
    setTimeout(() => {
      btn.dataset.flash = "false";
      btn.style.backgroundColor = "#0099ff";
    }, 200);
  }
}

for (let i = 1; i <= 8; i++) {
  window[`Eg${i}s`] = () => buySingle(i);
  window[`Eg${i}m`] = () => buyMax(i);
}

const genDiv = document.getElementById("generators");
for (let i = 1; i <= 8; i++) {
  genDiv.innerHTML += `
    <div style="height: 70px;">
      <p>
        <button onclick="Eg${i}s()">Buy a Class ${i} EG (×<span id="e${i}gx">0.00</span>) for <span id="e${i}gc">0.00</span> energy</button>
        <input type="button" onclick="Eg${i}m()" value="Buy max" />
      </p>
      <div style="height: 20px;">
        <p>You have <span id="e${i}g">0</span> Class ${i} Energy generators. You purchased them <span id="e${i}gb">0</span> times.</p>
      </div>
    </div>`;
}

const dt = 118.12821173281602;
document.addEventListener("keydown", function (event) {
  if (event.key === "m") {
    event.preventDefault();
    maxAll();
  }
});
setInterval(gameloop, 1000 / dt);
