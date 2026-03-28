const keywordsInput = document.getElementById("keywords");
const analyzeBtn = document.getElementById("analyzeBtn");
const sampleBtn = document.getElementById("sampleBtn");
const resultsEl = document.getElementById("results");
const statusText = document.getElementById("statusText");

function getStatusClasses(status) {
    if (status === "hot") {
        return "bg-red-500/20 text-red-300 border border-red-400/20";
    }

    if (status === "emerging") {
        return "bg-emerald-500/20 text-emerald-300 border border-emerald-400/20";
    }

    return "bg-yellow-500/20 text-yellow-300 border border-yellow-400/20";
}

function renderResults(items) {
    resultsEl.innerHTML = "";

    if (!items.length) {
        resultsEl.innerHTML = `
      <div class="col-span-full bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-400">
        No results returned.
      </div>
    `;
        return;
    }

    items.forEach((item) => {
        const card = document.createElement("div");
        card.className = "bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg";

        card.innerHTML = `
      <div class="flex items-start justify-between gap-4 mb-4">
        <h3 class="text-xl font-semibold capitalize">${item.keyword}</h3>
        <span class="px-3 py-1 rounded-full text-xs font-bold ${getStatusClasses(item.status)}">
          ${item.status}
        </span>
      </div>

      <div class="space-y-2 text-sm text-slate-300">
        <p><span class="text-slate-400">Mentions:</span> ${item.mentions}</p>
        <p><span class="text-slate-400">Search Growth:</span> ${Number(item.searchGrowth).toFixed(2)}%</p>
        <p><span class="text-slate-400">Trend Score:</span> ${Number(item.trendScore).toFixed(2)}</p>
        <p><span class="text-slate-400">Source:</span> ${item.source}</p>
      </div>
    `;

        resultsEl.appendChild(card);
    });
}

async function analyzeKeywords() {
    const raw = keywordsInput.value.trim();

    if (!raw) {
        statusText.textContent = "Please enter at least one keyword.";
        return;
    }

    const keywords = raw
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean);

    if (!keywords.length) {
        statusText.textContent = "Please enter valid keywords.";
        return;
    }

    analyzeBtn.disabled = true;
    analyzeBtn.textContent = "Analyzing...";
    statusText.textContent = "Scanning Reddit and Google Trends...";
    resultsEl.innerHTML = "";

    try {
        const response = await fetch("/api/ingest/run", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ keywords }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Something went wrong");
        }

        statusText.textContent = `Done. ${data.count} keyword(s) analyzed.`;
        renderResults(data.results);
    } catch (error) {
        console.error(error);
        statusText.textContent = `Error: ${error.message}`;
    } finally {
        analyzeBtn.disabled = false;
        analyzeBtn.textContent = "Analyze Trends";
    }
}

sampleBtn.addEventListener("click", () => {
    keywordsInput.value = "portable blender, mini printer, sunset lamp, desk vacuum";
});

analyzeBtn.addEventListener("click", analyzeKeywords);