/* ============================================
   HITL ORCHESTRATION - Interactive Behaviors
   ============================================ */

// --- Tab Navigation ---
(function initTabs() {
  document.querySelectorAll('.tab-nav').forEach(nav => {
    nav.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        nav.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const container = nav.parentElement;
        container.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        const panel = container.querySelector('#' + target);
        if (panel) panel.classList.add('active');
      });
    });
  });
})();

// --- Accordion ---
(function initAccordion() {
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const isOpen = item.classList.contains('open');
      // Close siblings
      item.parentElement.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
})();

// --- Plugin Toggles ---
(function initPluginToggles() {
  document.querySelectorAll('.plugin-toggle').forEach(toggle => {
    toggle.addEventListener('change', () => {
      const card = toggle.closest('.plugin-card');
      if (toggle.checked) {
        card.classList.remove('plugin-inactive');
      } else {
        card.classList.add('plugin-inactive');
      }
    });
  });
})();

// --- Decision Buttons ---
(function initDecisions() {
  document.querySelectorAll('.decision-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.decision-card');
      const actions = card.querySelector('.decision-actions');
      const action = btn.dataset.action;
      
      // Mark card
      card.classList.remove('decision-approved', 'decision-rejected', 'decision-escalated');
      card.classList.add('decision-' + action);
      
      // Replace buttons with result
      const labels = { approve: 'Approved', reject: 'Rejected', escalate: 'Escalated' };
      const classes = { approve: 'resolved', reject: 'resolved', escalate: 'resolved' };
      actions.innerHTML = '<button class="decision-btn ' + classes[action] + '" style="flex:1;">' +
        (action === 'approve' ? '&#10003; ' : action === 'reject' ? '&#10007; ' : '&#8593; ') +
        labels[action] + '</button>';
    });
  });
})();

// --- Live Feed Simulation ---
(function initLiveFeed() {
  const feed = document.getElementById('hitl-live-feed');
  if (!feed) return;
  
  const events = [
    { type: 'agent', text: '<strong>DocGen Agent</strong> auto-filled UFLPA compliance form for <strong>SolarTech Manufacturing</strong> — 34 fields populated from EDGAR 10-K data' },
    { type: 'agent', text: '<strong>Risk Agent</strong> classified supplier <strong>Nordic Logistics AB</strong> as LOW risk — auto-approved compliance certificate renewal' },
    { type: 'escalated', text: '<strong>Financial Agent</strong> detected covenant breach risk for <strong>GlobalPharma Holdings</strong> — escalated to human supervisor' },
    { type: 'human', text: '<strong>Sarah Chen</strong> approved M&A NDA for <strong>Pinnacle Semiconductor</strong> — AI recommendation accepted (confidence: 94%)' },
    { type: 'agent', text: '<strong>Compliance Agent</strong> generated EUDR due diligence report for 3 new Brazilian suppliers — 12 documents attached' },
    { type: 'agent', text: '<strong>Forecast Agent</strong> updated demand projections for SKU-0042 — 90-day forecast refreshed with latest order data' },
    { type: 'escalated', text: '<strong>Legal Agent</strong> flagged force majeure clause conflict in <strong>Acme Corp</strong> contract — requires legal review' },
    { type: 'human', text: '<strong>James Park</strong> rejected auto-approval for <strong>ShenZen Micro</strong> — added manual compliance note' },
    { type: 'agent', text: '<strong>DocGen Agent</strong> created onboarding package for <strong>Tokyo Components Ltd.</strong> — 8 forms generated in 2.3s' },
    { type: 'approved', text: '<strong>Marcus Liu</strong> approved supplier risk reclassification for <strong>Berlin Steel GmbH</strong> — tier 2 to tier 1' },
    { type: 'agent', text: '<strong>Valuation Agent</strong> completed DCF model update for <strong>SolarTech</strong> — enterprise value revised to $340M' },
    { type: 'human', text: '<strong>Elena Vasquez</strong> escalated <strong>ACLED conflict alert</strong> for Ethiopia corridor to VP Supply Chain' },
  ];
  
  let idx = 0;
  function addFeedItem() {
    const e = events[idx % events.length];
    const now = new Date();
    const time = now.getHours().toString().padStart(2,'0') + ':' + 
               now.getMinutes().toString().padStart(2,'0') + ':' + 
               now.getSeconds().toString().padStart(2,'0');
    const item = document.createElement('div');
    item.className = 'feed-item';
    item.innerHTML = '<div class="feed-dot ' + e.type + '"></div>' +
      '<div><div class="feed-text">' + e.text + '</div>' +
      '<div class="feed-time">' + time + '</div></div>';
    feed.insertBefore(item, feed.firstChild);
    // Keep max 20 items
    while (feed.children.length > 20) feed.removeChild(feed.lastChild);
    idx++;
  }
  
  // Initial items
  for (let i = 0; i < 5; i++) addFeedItem();
  // Add new item every 4 seconds
  setInterval(addFeedItem, 4000);
})();

// --- Auto-Fill Form Animation ---
(function initAutoFill() {
  const btn = document.getElementById('auto-fill-btn');
  if (!btn) return;
  
  btn.addEventListener('click', () => {
    const fields = document.querySelectorAll('.auto-fill-target');
    fields.forEach((field, i) => {
      setTimeout(() => {
        field.value = field.dataset.autofill;
        field.classList.add('auto-val');
        // Show status badge
        const status = field.parentElement.querySelector('.field-status');
        if (status) {
          status.textContent = 'Auto-Filled';
          status.className = 'field-status auto-filled';
          status.style.display = 'block';
        }
      }, i * 300);
    });
  });
})();

// --- Donut Animation ---
(function initDonut() {
  const donut = document.querySelector('.donut-chart');
  if (!donut) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const agentCircle = donut.querySelector('.donut-agent');
        const humanCircle = donut.querySelector('.donut-human');
        if (agentCircle) agentCircle.style.strokeDashoffset = '63.6'; // 90%
        if (humanCircle) humanCircle.style.strokeDashoffset = '563.5'; // 10%
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });
  observer.observe(donut);
})();
