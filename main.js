const NNs = [
    "Class 9 Generators have been discovered. The scientists who discovered them were fired.",
    "placeholder",
    "I'm late, I'm late, for a very important date! No time to say 'hello,' 'goodbye,' I'm late, I'm late, I'm late!",
    "Did you know that you could press M to max all?",
    "You're making energy? Pathetic. I'm making mat- *gunshot*",
    "Is this a jojo reference?",
    "const NewsTickerOn = false;",
    "monke see, monke do",
    "Hey, Gravity! Stop slacking off, my cows are lifting up into space!",
    "NEW EMPLOYEES: edit this slot to create new news messages",
    "179769313486231590772930519078902473361797697894230657273430081157732675805500963132708477322407536021120113879871393357658789768814416622492847430639474124377767893424865485276302219601246094119453082952085005768838150682342462881473913110540827237163350510684586298239947245938479716304835356329624224137216",
    "1.7976931348623e308 viruses have just been discovered on your device! In order to delete them, you should press Alt + F4."
];

function updateNews() {
    const newsText = document.getElementById("newsText");
    let aNN = [...NNs];
    
    if (breakdown) aNN.push("You have exceeded 1.8e308 energy, and your generators have started to break down. Thus, each generator purchase, the cost scaling will triple. The timechip cost scaling will double. Or if you read the red text you already know this.");
    if (m > 0) aNN.push("Well E=mc^2, but in this case m is proportional to the 200th root of energy. Don't think that's how it works though...");
    if (m > 0) aNN.push("You're making matter? Pathetic. I'm making tac- *explosion*");
    const cNN = aNN[Math.floor(Math.random() * (aNN.length))];
    newsText.textContent = cNN;
}

setInterval(updateNews, 5000);

function ls(a, b) {
  if (a === -Infinity) return b;
  if (b === -Infinity) return a;
  const max = Math.max(a, b);
  const min = Math.min(a, b);
  if (max - min > 16) return max;
  return max + Math.log10(1 + Math.pow(10, min - max));
}

function ld(a, b) {
  if (a <= b) return -Infinity;
  const diff = b - a;
  if (diff < -16) return a;
  return a + Math.log10(1 - Math.pow(10, diff));
}

let sEG = 2;
let v = 2;
let bestval = sEG;
let vps = -Infinity;
let t = 0;
let tc = 3;
let tg = 1;
let b = 0;
let bc = 2;
let nuked = 3;
let tpower = Math.log10(1.13);
let m = -Infinity;
let nextmatter = 0;
let matterstage = false;
let breakdown = false;
let infinityscaling = Math.log10(3);
let particles = -Infinity;
let bP = 3;
const matGens = [];
for (let i = 0; i < 8; i++) {
  matGens.push({
    level: -Infinity,
    bought: 0,
    gain: 0,
    cost: Math.log10(5**(i+1)),
    base: Math.log10(3**(i+1)*10)
  });
}

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
    mult: initialGeneratorData[i].mult
  });
}

function gameloop() {
    if (isNaN(v)) v = 2;
    if (isNaN(particles)) particles = -Infinity;
    let currentGains = matGens.map((g, i) => {
        const pgainRate = [5, 2, 1.5, 1.25, 1.1, 1.05, 1][i - 1] || 1;
        return g.level + g.gain + Math.log10(i === 0 ? 75 : pgainRate) - Math.log10(dt);
    });
    for (let i = matGens.length - 1; i > 0; i--) {
        matGens[i - 1].level = ls(matGens[i - 1].level, currentGains[i]);
    }
    particles = ls(particles, currentGains[0]);
    let totalVps = -Infinity;
    let genUpdates = new Array(generators.length).fill(-Infinity);
    generators.forEach((g, i) => {
        const gainRate = [10, 5, 2, 1.5, 1.25, 1.1, 1.05][i - 1] || 1;
        totalVps = ls(totalVps, g.level + g.gain + Math.log10(i === 0 ? 150 : gainRate) + (tpower * t) + (Math.log10(bP) * b) + (ls(particles, 0) * 3));
        if (i > 0 && i - 1 < generators.length) {
            genUpdates[i - 1] = ls(genUpdates[i - 1], g.level + g.gain + Math.log10(gainRate) + (tpower * t) + (Math.log10(bP) * b) + (ls(particles, 0) * 3) - Math.log10(dt));
        }
    });
    generators.forEach((g, i) => {
        if (isFinite(genUpdates[i])) g.level = ls(g.level, genUpdates[i]);
    });
    v = ls(v, totalVps - Math.log10(dt));
    tpower = Math.log10(1.13) + (Math.log10(1.005) * (nuked - 3));
    nextmatter = bestval / 200 - 0.75;
    if (v >= 1024 * Math.log10(2)) breakdown = true;
    document.getElementById("breakdownMsg").style.display = breakdown ? "block" : "none";
    
    //core value displaying{
    val.textContent = fx(v);
    document.getElementById("vps").textContent = fx(totalVps);
    document.getElementById("t").textContent = t;
    document.getElementById("tc").textContent = fx(tc);
    document.getElementById("b").textContent = b;
    document.getElementById("bc").textContent = bc;
    document.getElementById("time").textContent = fx(tpower * t);
    document.getElementById("tpower").textContent = fx(tpower);
    document.getElementById("nuked").textContent = nuked;
    document.getElementById("nukedreal").textContent = nuked - 3;
    document.getElementById("nextmatter").textContent = fx(nextmatter);
    document.getElementById("particles").textContent = fx(particles);
    if (matterstage) {
        document.getElementById("matterContainer").style.display = "inline";
        document.getElementById("matter").textContent = fx(m);
        document.getElementById("tabContainer").style.display = "block";
    } else {
        document.getElementById("matterContainer").style.display = "none";
        document.getElementById("tabContainer").style.display = "none";
    }
    //}
    //generator value displaying{
    generators.forEach((g, i) => {
        const idx = i + 1;
        document.getElementById(`e${idx}g`).textContent = fx(g.level);
        document.getElementById(`e${idx}gb`).textContent = g.bought;
        document.getElementById(`e${idx}gc`).textContent = fx(g.cost);
        document.getElementById(`e${idx}gx`).textContent = fx(g.gain + (b * Math.log10(3)) + Math.log10(1.13) * t + (ls(particles, 0) * 3));
        const btnSingle = document.querySelector(`button[onclick="Eg${idx}s()"]`);
        const btnMax = document.querySelector(`input[onclick="Eg${idx}m()"]`);
        btnSingle.disabled = v < g.cost;
        btnSingle.style.backgroundColor = btnSingle.dataset.flash === "true" ? "#00FF00" : v >= g.cost ? "#ddd" : "#999";
        btnMax.disabled = v < g.cost;
        btnMax.style.backgroundColor = btnMax.dataset.flash === "true" ? "#00FF00" : v >= g.cost ? "#ddd" : "#999";
    });
    matGens.forEach((g, i) => {
        const lvlElem = document.getElementById(`mg${i}lvl`);
        const bElem = document.getElementById(`mg${i}b`);
        const cElem = document.getElementById(`mg${i}c`);
        const mElem = document.getElementById(`mg${i}mult`);
        
        if (lvlElem) lvlElem.textContent = fx(g.level);
        if (bElem) bElem.textContent = g.bought;
        if (cElem) cElem.textContent = fx(g.cost);
        if (mElem) mElem.textContent = fx(g.gain);
        
        const btnSingle = document.querySelector(`button[onclick="buyMatGen(${i})"]`);
        if (btnSingle) {
            btnSingle.disabled = m < g.cost;
            btnSingle.style.backgroundColor = m >= g.cost ? "#0099ff" : "#004466";
        }
        const btnMax = document.querySelector(`input[onclick="buyMaxMat(${i})"]`);
        if (btnMax) {
            btnMax.disabled = m < g.cost;
            btnMax.style.backgroundColor = m >= g.cost ? "#0099ff" : "#004466"; 
        }
    });
    //}

    const tcBtn = document.querySelector(`button[onclick="Ts()"]`);
    const tcMaxBtn = document.querySelector(`input[onclick="Tm()"]`);
    tcBtn.disabled = v < tc;
    tcBtn.style.backgroundColor = tcBtn.dataset.flash === "true" ? "#00FF00" : v >= tc ? "#ddd" : "#999";
    tcMaxBtn.disabled = v < tc;
    tcMaxBtn.style.backgroundColor = tcMaxBtn.dataset.flash === "true" ? "#00FF00" : v >= tc ? "#ddd" : "#999";
    const gen8 = generators[7];
    const boostBtn = document.querySelector(`button[onclick="Bs()"]`);
    boostBtn.disabled = gen8.bought < bc;
    boostBtn.style.backgroundColor = boostBtn.dataset.flash === "true" ? "#00FF00" : gen8.bought >= bc ? "#ddd" : "#999";
    const nukeBtn = document.querySelector(`button[onclick="Ns()"]`);
    nukeBtn.disabled = gen8.bought <= nuked;
    nukeBtn.style.backgroundColor = nukeBtn.dataset.flash === "true" ? "#00FF00" : gen8.bought > nuked ? "#ddd" : "#999";

    let canBuy = false;
    generators.forEach((g) => { if (v >= g.cost) canBuy = true; });
    if (v >= tc) canBuy = true;
    document.querySelector(`button[onclick="maxAll()"]`).style.backgroundColor = canBuy ? "#060" : "#000000";
    document.getElementById("condenseBtn").style.display = (bestval >= 200) ? "inline-block" : "none";
    bestval = Math.max(v, bestval);
}

//functions{
function fx(num) {
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
    tc += tg;
    if (breakdown) {
      tg += Math.log10(2)
    }
    const btn = document.querySelector(`button[onclick="Ts()"]`);
    btn.dataset.flash = "true";
    btn.style.backgroundColor = "#00FF00";
    setTimeout(() => { btn.dataset.flash = "false"; }, 200);
  }
}
function Bs() {
  const g8 = generators[7];
  if (g8.bought >= bc) {
    breakdown = false;
    infinityscaling = Math.log10(3);
    totalBreakdown = false; tg = 1;
    b++;
    bc += 2;
    v = sEG;
    generators.forEach((g, i) => {
      g.level = -Infinity;
      g.bought = 0;
      g.cost = initialGeneratorData[i].cost;
      g.gain = 0;
      g.mult = initialGeneratorData[i].mult;
    });
    t = 0; tc = 3;
    const btn = document.querySelector(`button[onclick="Bs()"]`);
    btn.dataset.flash = "true";
    btn.style.backgroundColor = "#00FF00";
    setTimeout(() => { btn.dataset.flash = "false"; }, 200);
  }
}
function Ns() {
  const g8 = generators[7];
  if (g8.bought > nuked) {
    breakdown = false;
    infinityscaling = Math.log10(3);
    totalBreakdown = false; tg = 1;
    nuked = g8.bought;
    v = sEG; b = 0; bc = 2;
    generators.forEach((g, i) => {
      g.level = -Infinity;
      g.bought = 0;
      g.cost = initialGeneratorData[i].cost;
      g.gain = 0;
      g.mult = initialGeneratorData[i].mult;
    });
    t = 0; tc = 3;
    const btn = document.querySelector(`button[onclick="Ns()"]`);
    btn.dataset.flash = "true";
    btn.style.backgroundColor = "#00FF00";
    setTimeout(() => { btn.dataset.flash = "false"; }, 200);
  }
}
function Tm() { while (v >= tc) { Ts(); } }
function buySingle(index) {
  const g = generators[index - 1];
  if (v >= g.cost) {
    g.level = ls(g.level, 0);
    g.bought++;
    v = ld(v, g.cost);
    if (g.cost>308) {
      g.mult += infinityscaling;
    }
    if (g.cost>999) {
      infinityscaling += Math.log10(1.5);
    }
    g.cost += g.mult; 
    g.gain += Math.log10(2);
    const btn = document.querySelector(`button[onclick="Eg${index}s()"]`);
    btn.dataset.flash = "true";
    btn.style.backgroundColor = "#00FF00";
    setTimeout(() => { btn.dataset.flash = "false"; }, 200);
  }
}
function buyMax(index) { while (v >= generators[index - 1].cost) { buySingle(index); } }
function buyMatGen(i) {
  const g = matGens[i];
  if (m >= g.cost) {
    m = ld(m, g.cost);
    g.bought++;
    g.level = ls(g.level, 0);
    g.cost = g.cost + g.base;
    g.gain = g.gain + Math.log10(2);
  }
}
function buyMaxMat(i) {
  while (m >= matGens[i].cost) {
    buyMatGen(i);
  }
}
function maxAll() {
  for (let i = 1; i <= 8; i++) { buyMax(i); }
  Tm();
}
function maxAllMat() {
  for (let i = 0; i <= 7; i++) { buyMaxMat(i); }
}
function condense() {
  if (bestval >= 200) {
    renderUpgrades();
    particles = -Infinity;
    matGens.forEach(g => {
        g.level = Math.log10(g.bought);
    });
    matterstage = true;
    const gained = bestval / 200 - 0.75;
    m = ls(m,gained);
    v = sEG; bestval = sEG; t = 0; tc = 3; b = 0; bc = 2; nuked = 3;
    breakdown = false;
    infinityscaling = Math.log10(3);
    totalBreakdown = false; tg = 1;
    generators.forEach((g, i) => {
      g.level = -Infinity;
      g.bought = 0;
      g.cost = initialGeneratorData[i].cost;
      g.gain = 0;
      g.mult = initialGeneratorData[i].mult;
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
function switchTab(tab) {
  document.getElementById("energyTab").style.display = tab === "energy" ? "block" : "none";
  document.getElementById("materialGenTab").style.display = tab === "materialGen" ? "block" : "none";
  document.getElementById("materialUpTab").style.display = tab === "materialUp" ? "block" : "none";
  document.getElementById("tabEnergy").style.backgroundColor = tab === "energy" ? "#ccc" : "#eee";
  document.getElementById("tabMaterialGen").style.backgroundColor = tab === "materialGen" ? "#ccc" : "#eee";
  document.getElementById("tabMaterialUp").style.backgroundColor = tab === "materialUp" ? "#ccc" : "#eee";
}
function renderUpgrades() {
  const container = document.getElementById("materialUpTab");
  container.innerHTML = "<p style='text-align:center;'>Material Upgrades:</p>";
  
  materialUpgrades.forEach((up, i) => {
    container.innerHTML += `
      <div style="text-align:center; margin-bottom:10px;">
        <button onclick="buyUpgrade(${i})" ${up.bought ? "disabled" : ""} 
                style="background-color: ${up.bought ? "#555" : "#0099ff"}; color: white;">
          ${up.name} (${up.bought ? "Purchased" : "Cost: " + fx(up.cost) + " Matter"})<br>
          ${up.desc}
        </button>
      </div>`;
  });
}
function buyUpgrade(index) {
  const up = materialUpgrades[index];
  if (m >= up.cost && !up.bought) {
    m = ld(m, up.cost);
    up.bought = true;
    up.effect();
    renderUpgrades();
  }
}
//}

for (let i = 1; i <= 8; i++) {
  window[`Eg${i}s`] = () => buySingle(i);
  window[`Eg${i}m`] = () => buyMax(i);
}

const genDiv = document.getElementById("generators");
genDiv.innerHTML = "";
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

const matGenDiv = document.getElementById("materialGens");
matGenDiv.innerHTML = "";
matGens.forEach((g, i) => {
  matGenDiv.innerHTML += `
    <div style="height: 70px;">
      <p>
        <button onclick="buyMatGen(${i})" style="background-color: #0099ff; color: white;">
          Buy a Class ${i + 1} MG (×<span id="mg${i}mult">0.00</span>) for <span id="mg${i}c">0.00</span> matter
        </button>
        <input type="button" onclick="buyMaxMat(${i})" value="Buy max" style="background-color: #0099ff; color: white;" />
      </p>
      <div style="height: 20px;">
        <p>You have <span id="mg${i}lvl">0</span> Class ${i + 1} Material generators. You purchased them <span id="mg${i}b">0</span> times.</p>
      </div>
    </div>`;
});

const materialUpgrades = [
  {
    id: "boostUp",
    name: "Elevated power plants",
    desc: "Increases boost power by 1.",
    cost: 0,
    bought: false,
    effect: () => { bP += 1; }
  },
  {
    id: "startEnergy",
    name: "To cling to what\'s left",
    desc: "Upon all resets, you start with 1e40 energy.",
    cost: Math.log10(10),
    bought: false,
    effect: () => { sEG = Math.max(sEG,40); v = Math.max(v,40); }
  }
];

const dt = 118.12821173281602;
document.addEventListener("keydown", function (event) {
  if (event.ctrlKey) {
    if (event.key >= "1" && event.key <= "8") {
      event.preventDefault();
      buyMaxMat(parseInt(event.key) - 1);
    }
    if (event.key === "m") {
      event.preventDefault();
      maxAllMat();
    }
  } else {
    if (event.key >= "1" && event.key <= "8") {
      event.preventDefault();
      buyMax(parseInt(event.key));
    }
    if (event.key === "t" || event.key === "T") {
      event.preventDefault();
      Tm();
    }
    if (event.key === "Tab") {
        if (matterstage)
      event.preventDefault();
      const tabs = ["energy", "materialGen", "materialUp"];
      let current = document.getElementById("energyTab").style.display === "block" ? 0 :
                  document.getElementById("materialGenTab").style.display === "block" ? 1 : 2;
      switchTab(tabs[(current + 1) % tabs.length]);
    }
    if (event.key === "m") {
      event.preventDefault();
      maxAll();
    }
    if (event.key === "b") { event.preventDefault(); Bs(); }
    if (event.key === "n") { event.preventDefault(); Ns(); }
    if (event.key === "c") { event.preventDefault(); condense(); }
  }
});
setInterval(gameloop, 1000 / dt);

