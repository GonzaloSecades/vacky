import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';

const planUrl = new URL('../docs/nestjs-backend.md', import.meta.url);
const outputUrl = new URL('../docs/nestjs-backend-guide.html', import.meta.url);
const source = await readFile(planUrl, 'utf8');
const sourceHash = createHash('sha256').update(source).digest('hex');

function escape(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function inline(value) {
  return escape(value)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function markdown(value) {
  const output = [];
  let paragraph = [];
  let list = null;
  let code = null;
  const flush = () => {
    if (paragraph.length) output.push('<p>' + inline(paragraph.join(' ')) + '</p>');
    paragraph = [];
    if (list) output.push('</' + list + '>');
    list = null;
  };
  for (const line of value.split('\n')) {
    if (line.startsWith('```')) {
      if (code !== null) {
        output.push('<pre><code>' + escape(code.join('\n')) + '</code></pre>');
        code = null;
      } else {
        flush();
        code = [];
      }
      continue;
    }
    if (code !== null) { code.push(line); continue; }
    const heading = line.match(/^#{1,3} (.+)/);
    const item = line.match(/^(- |\d+\. )(.+)/);
    if (!line.trim()) { flush(); continue; }
    if (heading) { flush(); output.push('<h3>' + inline(heading[1]) + '</h3>'); continue; }
    if (item) {
      const type = item[1] === '- ' ? 'ul' : 'ol';
      if (list !== type) { flush(); list = type; output.push('<' + type + '>'); }
      output.push('<li>' + inline(item[2]) + '</li>');
    } else {
      if (list) flush();
      paragraph.push(line.trim());
    }
  }
  flush();
  return output.join('\n');
}

const steps = [...source.matchAll(/^## Step (\d+): ([^\n]+)\n([\s\S]*?)(?=^## |$(?![\s\S]))/gm)].map((match) => {
  const number = Number(match[1]);
  const tasks = [...match[3].matchAll(/^- \[([ x])\] (.+)$/gm)].map((task) => ({
    id: createHash('sha256').update(number + ':' + task[2]).digest('hex').slice(0, 16),
    text: task[2],
    initial: task[1] === 'x',
  }));
  return { number, title: match[2], tasks, acceptance: match[3].replace(/^- \[[ x]\] .+$/gm, '').trim() };
});
if (steps.length !== 8 || steps.some((step) => !step.tasks.length || !step.acceptance.includes('**Done when:**'))) {
  throw new Error('The plan must contain eight steps, checklists, and acceptance criteria.');
}
const taskCount = steps.reduce((sum, step) => sum + step.tasks.length, 0);
const reference = source.slice(source.indexOf('## How we will work'), source.indexOf('## Step 1:'));
const references = source.slice(source.indexOf('## References'));
const navigation = steps.map((step) => `<button class="step-link" type="button" data-step="${step.number}" aria-controls="stage-${step.number}"><span class="step-number">${step.number}</span><span class="step-label"><span>${escape(step.title)}</span><small id="status-${step.number}">Not started</small></span><span class="step-count" id="count-${step.number}">0/${step.tasks.length}</span></button>`).join('\n');
const panels = steps.map((step) => `<section class="stage" id="stage-${step.number}" aria-labelledby="title-${step.number}"${step.number === 1 ? '' : ' hidden'}>
<p class="eyebrow">Step ${step.number} of ${steps.length}</p><h2 id="title-${step.number}" tabindex="-1">${escape(step.title)}</h2>
<p class="stage-summary" id="summary-${step.number}">Complete the tasks, then verify the acceptance checks.</p>
<fieldset class="tasks"><legend class="sr-only">Implementation tasks for step ${step.number}</legend>${step.tasks.map((task) => `<label class="task"><input type="checkbox" data-task="${task.id}"${task.initial ? ' checked' : ''}><span>${inline(task.text)}</span></label>`).join('\n')}</fieldset>
<div class="acceptance"><h3>Acceptance checks</h3>${markdown(step.acceptance)}<label class="verified"><input type="checkbox" data-verified="${step.number}"><span>I ran these checks and recorded the result.</span></label></div>
<label class="notes-label" for="notes-${step.number}">Notes and evidence</label><textarea id="notes-${step.number}" data-notes="${step.number}" rows="4" maxlength="12000" placeholder="Record test results, decisions, commit IDs, or an unresolved issue."></textarea>
<div class="stage-actions"><button type="button" class="secondary" data-previous="${step.number}"${step.number === 1 ? ' disabled' : ''}>Previous step</button><button type="button" class="primary" data-next="${step.number}">${step.number === steps.length ? 'Review progress' : 'Next step'}</button></div></section>`).join('\n');

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="color-scheme" content="light dark"><title>Vacky · NestJS backend guide</title>
<meta name="description" content="An offline implementation checklist generated from Vacky's NestJS backend plan.">
<style>
:root{color-scheme:light dark;--background:light-dark(#fff,#13191b);--foreground:light-dark(#192b2b,#e8f0ec);--muted-foreground:light-dark(#546765,#a9bbb5);--card:light-dark(#f0f5f2,#1c2726);--border:light-dark(#cad7d0,#3a4e47);--primary:light-dark(#1f5e49,#b6e4ca);--primary-foreground:light-dark(#fff,#133b2c);--secondary:light-dark(#e8efeb,#263a33);--ring:light-dark(#2d7959,#a0dabb);--radius:14px;--font-sans:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;--font-mono:ui-monospace,SFMono-Regular,monospace;--code-background:var(--secondary)}
*{box-sizing:border-box}body{margin:0;color:var(--foreground);font-family:var(--font-sans);font-size:15px;line-height:1.6}button,input,textarea{font:inherit}button,a,input,textarea{touch-action:manipulation}a{color:var(--primary);text-underline-offset:3px}button{cursor:pointer}button:disabled{cursor:default;opacity:.45}button:focus-visible,a:focus-visible,input:focus-visible,textarea:focus-visible,summary:focus-visible{outline:3px solid var(--ring);outline-offset:3px}button{border:1px solid var(--border);border-radius:9px;padding:9px 13px;background:var(--card);color:var(--foreground)}h1,h2,h3,p{margin:0}h1{font-size:clamp(27px,5vw,39px);line-height:1.2;letter-spacing:-.035em}h2{font-size:clamp(23px,4vw,29px);line-height:1.3;letter-spacing:-.02em}h3{font-size:16px;margin:18px 0 8px}code{font-family:var(--font-mono);background:var(--code-background);padding:1px 4px;border-radius:4px;font-size:.9em}pre{overflow:auto;background:var(--card);padding:16px;border-radius:var(--radius)}pre code{padding:0;background:none}ul,ol{padding-left:23px}li+li{margin-top:6px}.guide{max-width:1120px;margin:24px auto 36px}.eyebrow{text-transform:uppercase;letter-spacing:.12em;font-size:11px;font-weight:700;color:var(--primary);margin-bottom:10px}.intro{max-width:700px;color:var(--muted-foreground);margin-top:12px}.toolbar{display:flex;flex-wrap:wrap;gap:8px;margin:22px 0}.source-link{align-self:center;margin-right:auto}.progress-area{display:grid;gap:8px;margin-bottom:26px}.progress-labels{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}.progress-labels span:last-child{color:var(--muted-foreground)}progress{appearance:none;width:100%;height:7px;border:0;background:var(--secondary);border-radius:5px;overflow:hidden}progress::-webkit-progress-bar{background:var(--secondary)}progress::-webkit-progress-value{background:var(--primary)}progress::-moz-progress-bar{background:var(--primary)}.layout{display:grid;grid-template-columns:286px minmax(0,1fr);gap:34px}.steps{display:flex;flex-direction:column;gap:6px;align-self:start}.step-link{display:flex;align-items:flex-start;gap:11px;width:100%;text-align:left;background:transparent;border-color:transparent;padding:12px 8px}.step-link[aria-current="step"]{background:var(--card);border-color:var(--border)}.step-number{display:grid;place-items:center;flex:none;width:27px;height:27px;background:var(--secondary);border-radius:50%;font-size:12px}.step-label{display:flex;flex:1;flex-direction:column;font-size:13px;line-height:1.4}.step-label small{margin-top:5px;color:var(--muted-foreground);font-size:11px}.step-count{font-variant-numeric:tabular-nums;font-size:11px;color:var(--muted-foreground);white-space:nowrap;margin-top:3px}.stage-summary{color:var(--muted-foreground);margin-top:11px}.tasks{border:0;margin:22px 0;padding:0;min-width:0}.task{display:flex;align-items:flex-start;gap:12px;padding:13px 0;border-bottom:1px solid var(--border);cursor:pointer}.task input,.verified input{flex:none;width:18px;height:18px;margin:4px 0 0;accent-color:var(--primary)}.task span{min-width:0;overflow-wrap:anywhere}.task:has(input:checked) span{color:var(--muted-foreground)}.acceptance{background:var(--card);padding:18px;border-radius:var(--radius);margin-top:25px}.acceptance h3:first-child{margin-top:0}.acceptance p+p{margin-top:9px}.verified{display:flex;gap:12px;align-items:flex-start;margin-top:18px;padding-top:14px;border-top:1px solid var(--border);font-weight:600;cursor:pointer}.notes-label{display:block;font-weight:600;margin:24px 0 8px}textarea{display:block;width:100%;resize:vertical;min-height:104px;border:1px solid var(--border);background:transparent;color:var(--foreground);border-radius:9px;padding:12px}.stage-actions{display:flex;justify-content:space-between;gap:12px;margin:20px 0}.primary{background:var(--primary);color:var(--primary-foreground);border-color:var(--primary)}.secondary{background:transparent}.message{min-height:24px;font-size:13px;color:var(--muted-foreground);margin-bottom:14px}.reference{margin-top:32px;border-top:1px solid var(--border);padding-top:18px}.reference summary{cursor:pointer;font-weight:600;padding:5px 0}.reference .reference-body{padding-top:12px;max-width:850px}.reference-body p+p{margin-top:10px}.footer{color:var(--muted-foreground);font-size:12px;margin-top:26px}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}[hidden]{display:none!important}
@media(max-width:760px){.guide{margin-top:14px}.layout{grid-template-columns:minmax(0,1fr);gap:24px}.steps{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:5px}.step-count{display:none}.step-link{padding:10px 7px}.step-label{font-size:12px}.toolbar .source-link{width:100%}.acceptance{padding:14px}.toolbar button{min-height:44px}}
@media print{.toolbar,.steps,.stage-actions,.message,.reference,.progress-area{display:none!important}.guide{max-width:none;margin:0}.layout{display:block}.stage,.stage[hidden]{display:block!important;break-before:page}.stage:first-child{break-before:auto}.acceptance{border:1px solid var(--border)}.task,.acceptance{break-inside:avoid}textarea{min-height:100px}.intro{margin-bottom:20px}}
</style></head><body><main class="guide" id="backend-guide">
<header><p class="eyebrow">Vacky / implementation notebook</p><h1>Your NestJS backend,<br>one verified step at a time.</h1><p class="intro">You write the backend. Use this guide to track each task, record evidence, and review the acceptance checks before advancing.</p></header>
<div class="toolbar"><a class="source-link" href="./nestjs-backend.md">Open the source plan</a><button type="button" id="export-progress">Export progress</button><button type="button" id="import-progress">Import progress</button><button type="button" id="print-guide">Print guide</button><button type="button" id="reset-progress" class="secondary">Reset tracker</button><input type="file" id="progress-file" accept="application/json,.json" hidden></div>
<div class="progress-area"><div class="progress-labels"><strong id="total-label">0 of ${taskCount} tasks checked</strong><span id="verified-label">0 of 8 steps verified</span></div><progress id="total-progress" max="${taskCount}" value="0" aria-label="Checked implementation tasks"></progress></div>
<p class="message" id="message" role="status" aria-live="polite">Progress stays in this browser. Export a copy before changing browsers or moving the file.</p>
<div class="layout"><nav class="steps" aria-label="Implementation steps">${navigation}</nav><div>${panels}</div></div>
<details class="reference"><summary>Working agreement, architecture, and defaults</summary><div class="reference-body">${markdown(reference)}</div></details>
<details class="reference"><summary>Source documentation and project references</summary><div class="reference-body">${markdown(references)}</div></details>
<p class="footer">This guide is generated from <code>docs/nestjs-backend.md</code>. Checked tasks and notes do not update the Markdown file or verify application behavior. Backend implementation has not started in the source plan. Source fingerprint: <code>${sourceHash.slice(0, 12)}</code>.</p>
</main>
<script>
(() => {
  'use strict';
  const plan = ${JSON.stringify(steps.map(({number,title,tasks}) => ({number,title,tasks:tasks.map(({id,initial})=>({id,initial}))}))).replaceAll('<', '\\u003c')};
  const storageKey = 'vacky:nestjs-backend-guide:v1';
  const sourceHash = '${sourceHash}';
  const validTasks = new Set(plan.flatMap(step => step.tasks.map(task => task.id)));
  const message = document.getElementById('message');
  let state = { version: 1, sourceHash, currentStep: 1, checked: {}, verified: {}, notes: {} };
  let storageAvailable = true;
  function normalize(input) {
    if (!input || typeof input !== 'object' || input.version !== 1) throw new Error('Unsupported progress file.');
    const result = { version: 1, sourceHash, currentStep: 1, checked: {}, verified: {}, notes: {} };
    if (Number.isInteger(input.currentStep) && input.currentStep >= 1 && input.currentStep <= 8) result.currentStep = input.currentStep;
    for (const id of validTasks) if (input.checked?.[id] === true) result.checked[id] = true;
    for (const step of plan) {
      const id = String(step.number);
      if (input.sourceHash === sourceHash && input.verified?.[id] === true && step.tasks.every(task => result.checked[task.id])) result.verified[id] = true;
      if (typeof input.notes?.[id] === 'string') result.notes[id] = input.notes[id].slice(0, 12000);
    }
    return result;
  }
  function save() {
    state.sourceHash = sourceHash;
    try { localStorage.setItem(storageKey, JSON.stringify(state)); }
    catch { storageAvailable = false; message.textContent = 'Browser storage is unavailable. Export progress before closing this page.'; }
  }
  function complete(step) {
    return step.tasks.every(task => state.checked[task.id]) && state.verified[String(step.number)] === true;
  }
  function render(focus = false) {
    let count = 0;
    let verified = 0;
    for (const step of plan) {
      const checked = step.tasks.filter(task => state.checked[task.id]).length;
      count += checked;
      if (complete(step)) verified += 1;
      document.getElementById('count-' + step.number).textContent = checked + '/' + step.tasks.length;
      document.getElementById('status-' + step.number).textContent = complete(step) ? 'Verified' : checked === step.tasks.length ? 'Acceptance checks pending' : checked ? 'In progress' : 'Not started';
      const active = step.number === state.currentStep;
      document.getElementById('stage-' + step.number).hidden = !active;
      const link = document.querySelector('[data-step="' + step.number + '"]');
      if (active) link.setAttribute('aria-current', 'step'); else link.removeAttribute('aria-current');
      document.getElementById('summary-' + step.number).textContent = checked + ' of ' + step.tasks.length + ' tasks checked. ' + (complete(step) ? 'Acceptance checks recorded as verified.' : 'Verify the acceptance checks before advancing.');
    }
    document.getElementById('total-label').textContent = count + ' of ${taskCount} tasks checked';
    document.getElementById('verified-label').textContent = verified + ' of 8 steps verified';
    document.getElementById('total-progress').value = count;
    document.querySelectorAll('[data-task]').forEach(input => { input.checked = state.checked[input.dataset.task] === true; });
    document.querySelectorAll('[data-verified]').forEach(input => { input.checked = state.verified[input.dataset.verified] === true; });
    document.querySelectorAll('[data-notes]').forEach(input => { const value = state.notes[input.dataset.notes] || ''; if (input.value !== value) input.value = value; });
    if (focus) document.getElementById('title-' + state.currentStep).focus();
  }
  function select(step) { state.currentStep = Math.min(8, Math.max(1, step)); save(); render(true); }
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const input = JSON.parse(saved);
      state = normalize(input);
      if (input.sourceHash !== sourceHash) message.textContent = 'The source plan changed. Matching tasks and notes were kept. Review the acceptance checks again.';
    } else {
      for (const step of plan) for (const task of step.tasks) if (task.initial) state.checked[task.id] = true;
    }
  } catch { storageAvailable = false; message.textContent = 'Saved progress could not be loaded. You can import a backup or export this session.'; }
  document.querySelectorAll('[data-step]').forEach(button => button.addEventListener('click', () => select(Number(button.dataset.step))));
  document.querySelectorAll('[data-previous]').forEach(button => button.addEventListener('click', () => select(Number(button.dataset.previous) - 1)));
  document.querySelectorAll('[data-next]').forEach(button => button.addEventListener('click', () => {
    const number = Number(button.dataset.next);
    const step = plan[number - 1];
    if (!complete(step)) { message.textContent = 'You can read any step. Finish this checklist and verify its acceptance checks before implementing the next step.'; }
    if (number < 8) select(number + 1);
    else { const next = plan.find(item => !complete(item)); select(next ? next.number : 8); message.textContent = next ? 'Review the first step with outstanding work.' : 'All checklist items and acceptance checks are recorded. Confirm the source plan reflects the verified implementation.'; }
  }));
  document.querySelectorAll('[data-task]').forEach(input => input.addEventListener('change', () => {
    state.checked[input.dataset.task] = input.checked;
    const step = plan.find(item => item.tasks.some(task => task.id === input.dataset.task));
    state.verified[String(step.number)] = false;
    save(); render();
  }));
  document.querySelectorAll('[data-verified]').forEach(input => input.addEventListener('change', () => {
    const step = plan[Number(input.dataset.verified) - 1];
    if (input.checked && !step.tasks.every(task => state.checked[task.id])) { input.checked = false; message.textContent = 'Complete every task in this step before recording verification.'; return; }
    state.verified[input.dataset.verified] = input.checked;
    save(); render();
  }));
  document.querySelectorAll('[data-notes]').forEach(input => input.addEventListener('input', () => { state.notes[input.dataset.notes] = input.value; save(); }));
  document.getElementById('export-progress').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify({ ...state, exportedAt: new Date().toISOString() }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob); const link = document.createElement('a');
    link.href = url; link.download = 'vacky-backend-progress.json'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    message.textContent = 'Progress exported. Keep the JSON file as your backup.';
  });
  const fileInput = document.getElementById('progress-file');
  document.getElementById('import-progress').addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', async () => {
    const file = fileInput.files[0]; if (!file) return;
    try {
      if (file.size > 250000) throw new Error('Progress file is too large.');
      const input = JSON.parse(await file.text());
      const next = normalize(input);
      state = next; save(); render();
      message.textContent = input.sourceHash === sourceHash ? 'Progress imported.' : 'Progress imported from another plan version. Review the acceptance checks.';
    } catch (error) { message.textContent = 'Import failed: ' + error.message; }
    fileInput.value = '';
  });
  document.getElementById('print-guide').addEventListener('click', () => window.print());
  document.getElementById('reset-progress').addEventListener('click', () => {
    if (!window.confirm('Clear all checked tasks and notes in this browser? Export a backup first.')) return;
    state = { version: 1, sourceHash, currentStep: 1, checked: {}, verified: {}, notes: {} }; save(); render(true);
    if (storageAvailable) message.textContent = 'Tracker reset. The implementation plan did not change.';
  });
  render();
  window.vackyBackendGuide = Object.freeze({ taskCount: ${taskCount}, stepCount: plan.length, sourceHash });
})();
</script></body></html>`;

await writeFile(outputUrl, html);
console.log('Generated docs/nestjs-backend-guide.html from ' + steps.length + ' steps and ' + taskCount + ' tasks.');
