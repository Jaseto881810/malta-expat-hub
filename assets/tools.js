/* Malta Expat Guide — calculators (Tools pages).
   Tax and social security rates are for 2026. Update them here every January,
   after the Budget. Rent and cost figures come from the admin panel (Tools). */
(function () {
  'use strict';

  // ---------- 2026 rates ----------
  // Resident tax bands: [up to, rate, subtract]. Tax = income x rate - subtract.
  var TAX = {
    single:       { label: 'Single',                         bands: [[12000, 0, 0], [16000, .15, 1800], [60000, .25, 3400], [Infinity, .35, 9400]] },
    married:      { label: 'Married',                        bands: [[15000, 0, 0], [23000, .15, 2250], [60000, .25, 4550], [Infinity, .35, 10550]] },
    married1:     { label: 'Married, 1 child',               bands: [[17500, 0, 0], [26500, .15, 2625], [60000, .25, 5275], [Infinity, .35, 11275]] },
    married2:     { label: 'Married, 2 or more children',    bands: [[22500, 0, 0], [32000, .15, 3375], [60000, .25, 6575], [Infinity, .35, 12575]] },
    parent:       { label: 'Parent',                         bands: [[13000, 0, 0], [17500, .15, 1950], [60000, .25, 3700], [Infinity, .35, 9700]] },
    parent1:      { label: 'Parent, 1 child',                bands: [[14500, 0, 0], [21000, .15, 2175], [60000, .25, 4275], [Infinity, .35, 10275]] },
    parent2:      { label: 'Parent, 2 or more children',     bands: [[18500, 0, 0], [25500, .15, 2775], [60000, .25, 5325], [Infinity, .35, 11325]] },
    nonresident:  { label: 'Non-resident',                   bands: [[700, 0, 0], [3100, .20, 140], [7800, .30, 450], [Infinity, .35, 840]] }
  };
  // Class 1 social security (employees aged 18+), weekly amounts
  var SSC = { minWage: 229.44, fixedLow: 22.94, rate: .10, maxNew: 55.93, maxOld: 49.04, maternity: .003 };

  function taxFor(income, status) {
    var bands = (TAX[status] || TAX.single).bands;
    income = Math.max(0, income);
    for (var i = 0; i < bands.length; i++) {
      if (income <= bands[i][0]) return Math.max(0, income * bands[i][1] - bands[i][2]);
    }
    return 0;
  }
  // How much of the income falls in each band, and the tax for that part
  function taxBreakdown(income, status) {
    var bands = (TAX[status] || TAX.single).bands, rows = [], from = 0;
    for (var i = 0; i < bands.length; i++) {
      var to = bands[i][0], part = Math.max(0, Math.min(income, to) - from);
      rows.push({ from: from, to: to, rate: bands[i][1], part: part, tax: part * bands[i][1] });
      from = to;
    }
    return rows;
  }
  function sscWeekly(weeklyWage, bornBefore1962) {
    if (weeklyWage <= 0) return 0;
    if (weeklyWage <= SSC.minWage) return SSC.fixedLow;
    return Math.min(weeklyWage * SSC.rate, bornBefore1962 ? SSC.maxOld : SSC.maxNew);
  }
  function netSalary(grossYear, status, bornBefore1962) {
    var weekly = grossYear / 52;
    var ssc = sscWeekly(weekly, bornBefore1962) * 52;
    var tax = taxFor(grossYear, status);
    return { gross: grossYear, tax: tax, ssc: ssc, net: grossYear - tax - ssc,
             employerSsc: ssc, maternity: grossYear * SSC.maternity };
  }
  // Gross salary needed to get a given net amount per year
  function grossForNet(netYear, status) {
    var lo = 0, hi = netYear * 3 + 20000;
    for (var i = 0; i < 60; i++) {
      var mid = (lo + hi) / 2;
      if (netSalary(mid, status).net < netYear) lo = mid; else hi = mid;
    }
    return hi;
  }

  // ---------- helpers ----------
  var data = {};
  try { data = JSON.parse((document.getElementById('tool-data') || {}).textContent || '{}'); } catch (e) {}
  function $(id) { return document.getElementById(id); }
  function num(id) { var v = parseFloat(String(($(id) || {}).value || '').replace(/[^0-9.]/g, '')); return isNaN(v) ? 0 : v; }
  function val(id) { return ($(id) || {}).value; }
  function eur(n, dec) {
    return '€' + Number(n || 0).toLocaleString('en-GB', { minimumFractionDigits: dec || 0, maximumFractionDigits: dec || 0 });
  }
  function pct(n) { return (Math.round(n * 1000) / 10).toLocaleString('en-GB') + '%'; }
  function setText(id, t) { var el = $(id); if (el) el.textContent = t; }
  function rows(id, list) {
    var el = $(id); if (!el) return;
    el.innerHTML = list.map(function (r) {
      return '<tr' + (r.cls ? ' class="' + r.cls + '"' : '') + '><th scope="row">' + r[0] + '</th><td>' + r[1] + '</td>' +
             (r.length > 2 ? '<td>' + r[2] + '</td>' : '') + '</tr>';
    }).join('');
  }
  function bars(id, list) {  // list of {label, value, colour}
    var el = $(id); if (!el) return;
    var total = list.reduce(function (s, x) { return s + x.value; }, 0) || 1;
    el.innerHTML = list.filter(function (x) { return x.value > 0; }).map(function (x) {
      return '<span style="flex:' + x.value / total + ';background:' + x.colour + '" title="' + x.label + ': ' + eur(x.value) + '"></span>';
    }).join('');
  }
  function watch(form, fn) {
    if (!form) return;
    form.addEventListener('input', fn);
    form.addEventListener('change', fn);
    form.addEventListener('submit', function (e) { e.preventDefault(); fn(); });
    fn();
  }

  // ---------- Salary calculator ----------
  function salary() {
    var amount = num('sal-gross'), period = val('sal-period');
    var gross = period === 'month' ? amount * 12 : amount;
    var r = netSalary(gross, val('sal-status'), $('sal-old') && $('sal-old').checked);
    setText('sal-net-month', eur(r.net / 12));
    setText('sal-net-year', eur(r.net));
    setText('sal-net-week', eur(r.net / 52));
    rows('sal-table', [
      ['Gross salary', eur(gross / 12, 2), eur(gross, 2)],
      ['Income tax', '− ' + eur(r.tax / 12, 2), '− ' + eur(r.tax, 2)],
      ['Social security (NI)', '− ' + eur(r.ssc / 12, 2), '− ' + eur(r.ssc, 2)],
      Object.assign(['Net salary', eur(r.net / 12, 2), eur(r.net, 2)], { cls: 'total' })
    ]);
    setText('sal-rate', gross > 0 ? pct((r.tax + r.ssc) / gross) : '0%');
    setText('sal-employer', eur(gross + r.employerSsc + r.maternity));
    bars('sal-bar', [
      { label: 'Net salary', value: r.net, colour: 'var(--doodle-lime)' },
      { label: 'Income tax', value: r.tax, colour: 'var(--doodle-pink)' },
      { label: 'Social security', value: r.ssc, colour: 'var(--doodle-yellow)' }
    ]);
  }

  // ---------- Income tax calculator ----------
  function incomeTax() {
    var resident = val('tax-resident') !== 'no';
    var statusSel = $('tax-status');
    if (statusSel) statusSel.disabled = !resident;
    var status = resident ? val('tax-status') : 'nonresident';
    var income = num('tax-income');
    var partTime = resident ? Math.min(num('tax-parttime'), 10000) : 0;
    var partTimeExtra = resident ? Math.max(0, num('tax-parttime') - 10000) : num('tax-parttime');
    var rent = num('tax-rent');
    var main = income + partTimeExtra;
    var mainTax = taxFor(main, status), ptTax = partTime * .10, rentTax = rent * .15;
    var total = mainTax + ptTax + rentTax, all = main + partTime + rent;
    setText('tax-total', eur(total, 2));
    setText('tax-month', eur(total / 12, 2));
    setText('tax-eff', all > 0 ? pct(total / all) : '0%');
    var marginal = 0, b = (TAX[status] || TAX.single).bands;
    for (var i = 0; i < b.length; i++) { if (main <= b[i][0]) { marginal = b[i][1]; break; } }
    setText('tax-marg', pct(marginal));
    var list = taxBreakdown(main, status).map(function (r) {
      var range = r.to === Infinity ? 'Over ' + eur(r.from) : eur(r.from === 0 ? 0 : r.from + 1) + ' – ' + eur(r.to);
      return [range + ' <small>at ' + pct(r.rate) + '</small>', eur(r.part), eur(r.tax, 2)];
    });
    if (partTime > 0) list.push(['Part-time income <small>at 10%</small>', eur(partTime), eur(ptTax, 2)]);
    if (rent > 0) list.push(['Rental income <small>at 15%</small>', eur(rent), eur(rentTax, 2)]);
    list.push(Object.assign(['Total', eur(all), eur(total, 2)], { cls: 'total' }));
    rows('tax-table', list);
    var note = $('tax-pt-note');
    if (note) note.hidden = !(num('tax-parttime') > 0 && (!resident || num('tax-parttime') > 10000));
  }

  // ---------- Rent prices ----------
  var SIZES = { studio: 'Studio', one: '1 bedroom', two: '2 bedrooms', three: '3 bedrooms' };
  function rentRange(area, size) {
    var r = data.rent || data;
    var sf = r.studioFactor || .75, tf = r.threeBedFactor || 1.35;
    if (!area) return [0, 0];
    switch (size) {
      case 'studio': return [area.oneBedLow * sf, area.oneBedHigh * sf];
      case 'two': return [area.twoBedLow, area.twoBedHigh];
      case 'three': return [area.twoBedLow * tf, area.twoBedHigh * tf];
      default: return [area.oneBedLow, area.oneBedHigh];
    }
  }
  function round10(n) { return Math.round(n / 10) * 10; }
  function rentFor(area, size, level) {
    var r = rentRange(area, size), lo = r[0], hi = r[1];
    if (level === 'basic') return { lo: lo * .85, typ: lo, hi: (lo + hi) / 2 };
    if (level === 'high') return { lo: (lo + hi) / 2, typ: hi, hi: hi * 1.3 };
    return { lo: lo, typ: (lo + hi) / 2, hi: hi };
  }
  function areas() { return ((data.rent || data).areas) || []; }
  function fillAreas(id, chosen) {
    var sel = $(id); if (!sel || sel.options.length) return;
    areas().forEach(function (a, i) {
      var o = document.createElement('option'); o.value = i; o.textContent = a.name;
      if (a.name === chosen) o.selected = true;
      sel.appendChild(o);
    });
  }
  function rentTool() {
    fillAreas('rent-area', 'Msida');
    var list = areas(), area = list[+val('rent-area')] || list[0], size = val('rent-size'), level = val('rent-level');
    var r = rentFor(area, size, level);
    setText('rent-typ', eur(round10(r.typ)));
    setText('rent-range', eur(round10(r.lo)) + ' – ' + eur(round10(r.hi)));
    setText('rent-what', SIZES[size] + ' in ' + (area ? area.name : ''));
    var typ = round10(r.typ), fee = typ * .5 * 1.18;
    rows('rent-move', [
      ['Deposit (usually 1 month)', eur(typ)],
      ['First month of rent', eur(typ)],
      ['Agency fee (about ½ month + VAT)', eur(round10(fee))],
      Object.assign(['Money to move in', eur(typ * 2 + round10(fee))], { cls: 'total' })
    ]);
    setText('rent-year', eur(typ * 12));
    // compare every area for this size and level
    var cmp = $('rent-compare'); if (!cmp) return;
    var items = list.map(function (a, i) { return { i: i, name: a.name, v: round10(rentFor(a, size, level).typ) }; })
                    .sort(function (a, b) { return b.v - a.v; });
    var max = items.length ? items[0].v : 1;
    cmp.innerHTML = items.map(function (x) {
      var on = area && x.name === area.name;
      return '<li' + (on ? ' class="on"' : '') + '><span class="cmp-name">' + x.name + '</span>' +
             '<span class="cmp-bar"><span style="width:' + (x.v / max * 100).toFixed(1) + '%"></span></span>' +
             '<b>' + eur(x.v) + '</b></li>';
    }).join('');
  }

  // ---------- Cost of living ----------
  function costTool() {
    var c = data.costs || {};
    fillAreas('col-area', 'Msida');
    var adults = Math.max(1, Math.min(6, Math.round(num('col-adults')) || 1));
    var kids = Math.max(0, Math.min(8, Math.round(num('col-kids'))));
    var level = val('col-level') || 'moderate';
    var sizeSel = $('col-size');
    if (sizeSel && sizeSel.dataset.auto !== 'no') {
      var people = adults + kids;
      sizeSel.value = kids >= 2 ? 'three' : (kids === 1 || adults >= 2) ? 'two' : 'one';
      if (people >= 5) sizeSel.value = 'three';
    }
    var size = val('col-size');
    var sf = $('col-school-field'); if (sf) sf.hidden = kids === 0;
    var list = areas(), area = list[+val('col-area')] || list[0];
    var rentLevel = level === 'basic' ? 'basic' : level === 'comfortable' ? 'high' : 'standard';
    var rent = round10(rentFor(area, size, rentLevel).typ);
    var g = function (key) { var v = c[key]; return v && typeof v === 'object' ? (v[level] || 0) : (v || 0); };
    var utilFactor = level === 'basic' ? .85 : level === 'comfortable' ? 1.25 : 1;
    var school = { none: 0, state: c.schoolState || 0, church: c.schoolChurch || 0, private: c.schoolPrivate || 0 }[val('col-school')] || 0;
    var items = [
      { label: 'Rent', value: rent, colour: 'var(--doodle-orange)' },
      { label: 'Electricity and water', value: ((c.utilities || {})[size] || 0) * utilFactor, colour: 'var(--doodle-yellow)' },
      { label: 'Internet and mobile', value: (c.internet || 0) + (c.mobilePerAdult || 0) * adults, colour: 'var(--doodle-purple)' },
      { label: 'Groceries', value: g('groceriesAdult') * adults + g('groceriesChild') * kids, colour: 'var(--doodle-lime)' },
      { label: 'Transport', value: g('transportAdult') * adults + ($('col-car') && $('col-car').checked ? (c.car || 0) : 0), colour: 'var(--doodle-blue)' },
      { label: 'Eating out and free time', value: g('leisureAdult') * adults + g('leisureAdult') * .4 * kids, colour: 'var(--doodle-pink)' },
      { label: 'Personal care and gym', value: g('personalAdult') * adults, colour: '#7bdff2' },
      { label: 'Health insurance', value: $('col-health') && $('col-health').checked ? (c.healthAdult || 0) * adults + (c.healthChild || 0) * kids : 0, colour: '#ff6f59' },
      { label: 'School and childcare', value: school * kids, colour: '#ffb4a2' },
      { label: 'Clothes and household', value: g('householdOther'), colour: '#c3c7d6' }
    ];
    var total = items.reduce(function (s, x) { return s + x.value; }, 0);
    setText('col-total', eur(round10(total)));
    setText('col-year', eur(round10(total) * 12));
    setText('col-rent-note', (SIZES[size] || '') + ' in ' + (area ? area.name : ''));
    rows('col-table', items.filter(function (x) { return x.value > 0; }).map(function (x) {
      return ['<i class="dot" style="background:' + x.colour + '"></i>' + x.label, eur(round10(x.value))];
    }).concat([Object.assign(['Total per month', eur(round10(total))], { cls: 'total' })]));
    bars('col-bar', items);
    var status = adults >= 2 ? (kids >= 2 ? 'married2' : kids === 1 ? 'married1' : 'married') : (kids >= 2 ? 'parent2' : kids === 1 ? 'parent1' : 'single');
    var need = grossForNet(round10(total) * 12, status);
    setText('col-salary', eur(Math.round(need / 500) * 500));
    setText('col-salary-who', adults >= 2 ? 'for your household (if one person earns it, using ' + TAX[status].label.toLowerCase() + ' tax rates)' : 'before tax (using ' + TAX[status].label.toLowerCase() + ' tax rates)');
  }

  // ---------- start ----------
  var tool = document.body.getAttribute('data-tool');
  if (tool === 'salary-calculator') watch($('sal-form'), salary);
  if (tool === 'income-tax-calculator') watch($('tax-form'), incomeTax);
  if (tool === 'rent-prices') watch($('rent-form'), rentTool);
  if (tool === 'cost-of-living') {
    var sz = $('col-size');
    if (sz) sz.addEventListener('change', function () { sz.dataset.auto = 'no'; });
    watch($('col-form'), costTool);
  }
  window.MaltaTax = { taxFor: taxFor, netSalary: netSalary, grossForNet: grossForNet };
})();
