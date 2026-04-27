function generate() {
  const btn = document.getElementById("generate-btn");
  const btnText = btn.querySelector(".btn-text");
  const btnLoader = btn.querySelector(".btn-loader");
  const outputDiv = document.getElementById("output");

  // Get inputs
  const age = document.getElementById("age").value;
  const category = document.getElementById("category").value;
  const budget = parseInt(document.getElementById("budget").value);
  const needInput = document.getElementById("need").value.toLowerCase().trim();

  // Show loading state
  btn.disabled = true;
  btnText.style.display = "none";
  btnLoader.style.display = "flex";
  outputDiv.style.display = "none"; // Hide previous results

  // Simulate AI API call (1.5s delay)
  setTimeout(() => {
    processAndRenderResults(age, category, budget, needInput);

    // Restore button state
    btn.disabled = false;
    btnText.style.display = "block";
    btnLoader.style.display = "none";
    outputDiv.style.display = "flex"; // Show new results
  }, 1500);
}

function processAndRenderResults(age, category, budget, need) {
  const outputDiv = document.getElementById("output");

  const products = [
    { name: "Premium Anti-Colic Bottle", category: "Feeding", price: 95, tags: ["colic", "general"] },
    { name: "Organic Bamboo Feeding Set", category: "Feeding", price: 150, tags: ["general", "weaning"] },
    { name: "Silicone Soothing Teether", category: "Feeding", price: 45, tags: ["teething"] },
    { name: "Gentle Oat Baby Lotion", category: "Skincare", price: 85, tags: ["sensitive skin", "eczema"] },
    { name: "Lavender Sleep Balm", category: "Skincare", price: 120, tags: ["sleep", "general"] },
    { name: "Sensory Soft Book", category: "Toys", price: 65, tags: ["learning", "general"] },
    { name: "Wooden Stacking Rings", category: "Toys", price: 180, tags: ["learning", "motor skills"] }
  ];

  // Filter logic
  let filtered = products.filter(p => p.category === category && p.price <= budget);

  if (need) {
    const needMatch = filtered.filter(p => p.tags.some(tag => need.includes(tag)));
    if (needMatch.length > 0) {
      filtered = needMatch;
    }
  }

  if (filtered.length === 0) {
    filtered = products.filter(p => p.category === category).slice(0, 2);
  }

  let resultHTML = "";

  // 🧠 1. Assistant-style Recommendations
  resultHTML += `
    <div>
      <h3>👶 Here’s what I recommend for your baby</h3>
      <p style="color: gray;">Based on your baby’s stage, needs, and budget</p>

      <div class="card-list">
        ${filtered.map(p => {
    let reason = "";

    if (need && p.tags.some(t => need.includes(t))) {
      reason = `This directly helps with ${need}, which is very common at this stage.`;
    }
    else if (category === "Feeding") {
      reason = `At this stage, babies often face feeding discomfort. This helps improve feeding comfort and reduce common issues like colic.`;
    }
    else if (category === "Skincare") {
      reason = `Baby skin is highly sensitive now. This ensures gentle care and helps prevent irritation.`;
    }
    else {
      reason = `This stage is important for development. This product supports sensory and motor skill growth.`;
    }

    const confidence = Math.floor(Math.random() * 10) + 90;

    return `
            <div class="rec-card">
              <div class="rec-header">
                <div class="rec-title">${p.name}</div>
                <div class="rec-price">${p.price} AED</div>
              </div>

              <div class="rec-reason">"${reason}"</div>

              <div class="rec-meta">
                <span>Suitable for: ${age.replace('months', 'mo')}</span>
                <span>Confidence: ${confidence}%</span>
              </div>
            </div>
          `;
  }).join('')}
      </div>
    </div>
  `;

  // 💡 2. Why This Matters (AI Insight)
  resultHTML += `
    <div class="rec-card" style="background:#f3f2ff;">
      <b>💡 Why this matters</b><br>
      Choosing the right products at each stage helps prevent common issues and supports healthy development.
      This plan reduces guesswork and helps you make confident decisions.
    </div>
  `;

  // 🗓️ 3. Improved Timeline
  let nowList = "";
  let nextList = "";
  let nowAge = "";
  let nextAge = "";

  if (age === "0-3 months") {
    nowAge = "0–3 months"; nextAge = "3–6 months";
    nowList = `
      <li>Prioritize comfortable feeding routines</li>
      <li>Use ultra-gentle skincare products</li>
      <li>Introduce high-contrast visual toys</li>
    `;
    nextList = `
      <li>Prepare for teething with safe teethers</li>
      <li>Upgrade feeding tools as intake increases</li>
      <li>Introduce grasping and sensory toys</li>
    `;
  } else if (age === "3-6 months") {
    nowAge = "3–6 months"; nextAge = "6–12 months";
    nowList = `
      <li>Focus on teething relief solutions</li>
      <li>Introduce safe play environments</li>
      <li>Start basic feeding tools for solids</li>
    `;
    nextList = `
      <li>Add sensory and interactive toys</li>
      <li>Introduce sippy cups</li>
      <li>Encourage crawling and movement</li>
    `;
  } else {
    nowAge = "6–12 months"; nextAge = "1+ year";
    nowList = `
      <li>Encourage self-feeding habits</li>
      <li>Use interactive developmental toys</li>
      <li>Ensure safe and fun bath routines</li>
    `;
    nextList = `
      <li>Transition to learning-based toys</li>
      <li>Build routine-based care habits</li>
      <li>Support walking and mobility</li>
    `;
  }

  resultHTML += `
    <div>
      <h3 class="section-title">🗓️ Your Baby Plan</h3>
      <div class="timeline-grid">
        <div class="timeline-card timeline-now">
          <div class="timeline-header">
            <span class="timeline-icon">✓</span>
            Now (${nowAge})
          </div>
          <ul class="timeline-list">${nowList}</ul>
        </div>

        <div class="timeline-card timeline-next">
          <div class="timeline-header">
            <span class="timeline-icon">→</span>
            Next (${nextAge})
          </div>
          <ul class="timeline-list">${nextList}</ul>
        </div>
      </div>
    </div>
  `;

  // 🌍 4. Arabic Section (Improved Tone)
  resultHTML += `
    <div class="arabic-section">
      <h3 class="section-title">🌍 التوصيات</h3>
      ${filtered.map(p => `
        <div class="ar-card">
          <div class="ar-title">${p.name}</div>
          <div class="ar-desc">
            تم اختيار هذا المنتج بناءً على عمر الطفل واحتياجاته لضمان راحة أفضل ونمو صحي.
          </div>
          <div class="ar-price">${p.price} درهم</div>
        </div>
      `).join('')}
    </div>
  `;

  outputDiv.innerHTML = resultHTML;
}