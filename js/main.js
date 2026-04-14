// ── Topic hover tooltips ──
(function () {
    var topics = {
        erp: {
            title: 'ERP',
            text: 'ERP soll Firmen besser machen. Schneller. Weniger Arbeit. Wettbewerbsfähiger. <strong class="text-white">ABER:</strong> stattdessen. Mehr unnötiger Scheißdreck ohne nennenswerten Nutzen. Mitarbeiter sind behindert. Kunden sind empört. <strong class="text-red-400">DAS SOLL GUT SEIN?</strong>'
        },
        ki: {
            title: 'KI / AI',
            text: 'Riesiger Hype. Alle reden über Sicherheit. Alle reden über Arbeitsplatzverlust. Firmen erproben und erzwingen viel. <strong class="text-red-400">Aber ES NÜTZT JA NICHTS</strong> — wie kann denn das sein?'
        },
        digi: {
            title: 'Digitalisierung',
            text: 'Seit Jahren geben wir Geld für bessere Software und mehr Durchgängigkeit und mehr automatisierte Abläufe aus. Aber es wird ja nicht besser. <strong class="text-red-400">Das Verhältnis zwischen \'Geld ausgeben\' und \'Nutzen einfahren\' ist dramatisch schlecht.</strong>'
        },
        wettbewerb: {
            title: 'Wettbewerbsfähigkeit',
            text: 'Was müsste man <strong class="text-white">anders denken</strong>, <strong class="text-white">anders machen</strong>, <strong class="text-white">anders angehen</strong>, damit das Spiel nützlich wird?'
        }
    };

    var tooltip = document.getElementById('topic-tooltip');
    var tooltipTitle = document.getElementById('topic-tooltip-title');
    var tooltipText = document.getElementById('topic-tooltip-text');
    if (!tooltip) return;

    var hideTimeout;

    function showTooltip(key, pillEl) {
        var t = topics[key];
        if (!t) return;
        clearTimeout(hideTimeout);
        tooltipTitle.textContent = t.title;
        tooltipText.innerHTML = t.text;

        // Position below the pill, centered
        var rect = pillEl.getBoundingClientRect();
        var tooltipWidth = Math.min(560, window.innerWidth * 0.9);
        var left = rect.left + rect.width / 2 - tooltipWidth / 2;
        // Keep within viewport
        left = Math.max(8, Math.min(left, window.innerWidth - tooltipWidth - 8));
        tooltip.style.top = (rect.bottom + 12) + 'px';
        tooltip.style.left = left + 'px';
        tooltip.style.width = tooltipWidth + 'px';

        tooltip.classList.remove('opacity-0', 'pointer-events-none', 'scale-95');
        tooltip.classList.add('opacity-100', 'scale-100');
    }

    function hideTooltip() {
        hideTimeout = setTimeout(function () {
            tooltip.classList.add('opacity-0', 'pointer-events-none', 'scale-95');
            tooltip.classList.remove('opacity-100', 'scale-100');
        }, 200);
    }

    document.querySelectorAll('.topic-pill').forEach(function (btn) {
        btn.addEventListener('mouseenter', function () {
            showTooltip(this.dataset.topic, this);
        });
        btn.addEventListener('mouseleave', hideTooltip);
        // Also support tap on mobile
        btn.addEventListener('click', function () {
            showTooltip(this.dataset.topic, this);
        });
    });

    // Keep tooltip open when hovering over it
    tooltip.addEventListener('mouseenter', function () {
        clearTimeout(hideTimeout);
    });
    tooltip.addEventListener('mouseleave', hideTooltip);
})();

// ── German public holidays (nationwide) ──
// Returns Set of "YYYY-MM-DD" strings for a given year
function getGermanHolidays(year) {
    var holidays = new Set();

    // Fixed holidays
    holidays.add(year + '-01-01'); // Neujahr
    holidays.add(year + '-05-01'); // Tag der Arbeit
    holidays.add(year + '-10-03'); // Tag der Deutschen Einheit
    holidays.add(year + '-12-25'); // 1. Weihnachtstag
    holidays.add(year + '-12-26'); // 2. Weihnachtstag

    // Easter-based (movable) holidays
    var easter = computeEaster(year);
    holidays.add(dateToKey(addDays(easter, -2)));  // Karfreitag
    holidays.add(dateToKey(addDays(easter, 1)));   // Ostermontag
    holidays.add(dateToKey(addDays(easter, 39)));  // Christi Himmelfahrt
    holidays.add(dateToKey(addDays(easter, 50)));  // Pfingstmontag

    return holidays;
}

// Gauss algorithm for Easter Sunday
function computeEaster(year) {
    var a = year % 19;
    var b = Math.floor(year / 100);
    var c = year % 100;
    var d = Math.floor(b / 4);
    var e = b % 4;
    var f = Math.floor((b + 8) / 25);
    var g = Math.floor((b - f + 1) / 3);
    var h = (19 * a + b - d - g + 15) % 30;
    var i = Math.floor(c / 4);
    var k = c % 4;
    var l = (32 + 2 * e + 2 * i - h - k) % 7;
    var m = Math.floor((a + 11 * h + 22 * l) / 451);
    var month = Math.floor((h + l - 7 * m + 114) / 31);
    var day = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(year, month - 1, day);
}

function addDays(date, days) {
    var d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
}

function dateToKey(date) {
    var m = (date.getMonth() + 1).toString().padStart(2, '0');
    var d = date.getDate().toString().padStart(2, '0');
    return date.getFullYear() + '-' + m + '-' + d;
}

// ── Generate next 4 Fridays (skip holidays) ──
(function () {
    var container = document.getElementById('termine');
    var btn = document.getElementById('anmelden-btn');
    if (!container || !btn) return;

    var fridays = getNextFridays(4);
    var checked = new Set();

    fridays.forEach(function (entry, i) {
        var date = entry.date;
        var isHoliday = entry.holiday;
        var id = 'termin-' + i;
        var label = formatGermanDate(date);

        var row = document.createElement('label');
        row.htmlFor = id;

        if (isHoliday) {
            row.className =
                'flex items-center gap-4 p-4 rounded-xl border border-neutral-800/30 ' +
                'opacity-40 cursor-not-allowed select-none';
            row.innerHTML =
                '<input type="checkbox" id="' + id + '" disabled ' +
                'class="w-5 h-5 rounded border-neutral-700 bg-neutral-800 cursor-not-allowed">' +
                '<span class="text-neutral-500 font-medium line-through">' + label + '</span>' +
                '<span class="text-neutral-600 text-sm italic ml-auto">(deutschlandweiter Feiertag)</span>';
        } else {
            row.className =
                'flex items-center gap-4 p-4 rounded-xl border border-neutral-800/50 ' +
                'hover:border-red-500/30 cursor-pointer transition-colors duration-300 select-none';
            row.innerHTML =
                '<input type="checkbox" id="' + id + '" value="' + label + '" ' +
                'class="w-5 h-5 rounded border-neutral-600 text-red-500 bg-neutral-800 ' +
                'focus:ring-red-500 focus:ring-offset-neutral-950 accent-red-500">' +
                '<span class="text-neutral-200 font-medium">' + label + '</span>';

            var checkbox = row.querySelector('input');
            checkbox.addEventListener('change', function () {
                if (this.checked) {
                    checked.add(this.value);
                    row.classList.add('border-red-500/40', 'bg-red-950/10');
                } else {
                    checked.delete(this.value);
                    row.classList.remove('border-red-500/40', 'bg-red-950/10');
                }
                btn.disabled = checked.size === 0;
            });
        }

        container.appendChild(row);
    });

    btn.addEventListener('click', function () {
        if (checked.size === 0) return;

        var dates = Array.from(checked)
            .map(function (d) { return '  - ' + d; })
            .join('\n');

        var subject = encodeURIComponent('Anmeldung sBrech-Stunde');
        var body = encodeURIComponent(
            'Ich möchte mich anmelden für folgenden Termin:\n\n' +
            dates + '\n\n' +
            '16:00 – 17:00 Uhr\n'
        );

        window.location.href =
            'mailto:f.gloebl@g-u-p.de?subject=' + subject + '&body=' + body;
    });

    function getNextFridays(selectableCount) {
        // Collect holidays for this year and next
        var now = new Date();
        var holidays = getGermanHolidays(now.getFullYear());
        var holidaysNext = getGermanHolidays(now.getFullYear() + 1);
        holidaysNext.forEach(function (h) { holidays.add(h); });

        var result = [];
        var selectable = 0;
        var d = new Date(now);
        var day = d.getDay();
        var diff = (5 - day + 7) % 7;
        if (diff === 0) diff = 7;
        d.setDate(d.getDate() + diff);

        // Gather Fridays until we have enough selectable ones
        while (selectable < selectableCount) {
            var key = dateToKey(d);
            var isHoliday = holidays.has(key);
            result.push({ date: new Date(d), holiday: isHoliday });
            if (!isHoliday) selectable++;
            d.setDate(d.getDate() + 7);
        }
        return result;
    }

    function formatGermanDate(date) {
        var days = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
        var months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
            'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
        return days[date.getDay()] + ', ' + date.getDate() + '. ' + months[date.getMonth()] + ' ' + date.getFullYear();
    }
})();
