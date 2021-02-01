function clock(selector, deadline) {
    // validation
    if (typeof selector !== 'string' ||
        selector === '') {
        console.error('ERROR: netinkamo formato selectorius.');
        return false;
    }
    if (typeof deadline !== 'string' ||
        deadline === '' ||
        !isFinite((new Date('2000-' + deadline).getTime()))) {
        console.error('ERROR: netinkamo formato deadlainas.');
        return false;
    }

    // logic
    const DOM = document.querySelector(selector);
    if (!DOM) {
        console.error('ERROR: pagal pateikta selectoriu elementas nerastas.');
        return false;
    }

    let numbers = updateClock(deadline);
    const labels = ['days', 'hours', 'minutes', 'seconds'];
    let HTML = '';

    for (let i = 0; i < 4; i++) {
        const key = labels[i];
        HTML += `<div class="time">
                    <div class="value">${formatNumber(numbers[key])}</div>
                    <div class="label">${key}</div>
                </div>`;
    }

    // result
    DOM.innerHTML = HTML;

    // neefektyvi paieska, nes ieskoma visame dokumente (HTML'e)
    // const allValuesDOM = document.querySelectorAll(`${selector} .value`);
    // zymiai efektyvesne paieska, nes pradeda nuo jau zinomos artimiausios tinkamos vietos
    const allValuesDOM = DOM.querySelectorAll('.value');

    setInterval(function () {
        numbers = updateClock(deadline);
        for (let i = 0; i < 4; i++) {
            const key = labels[i];
            allValuesDOM[i].innerText = formatNumber(numbers[key]);
        }
    }, 1000);
}

function updateClock(deadline) {
    const date = new Date();

    let deadlineYear = date.getFullYear();
    let fullDeadline = `${deadlineYear}-${deadline}`;
    let deadlineInMiliseconds = (new Date(fullDeadline)).getTime();
    const now = Date.now();

    if (deadlineInMiliseconds < now) {
        deadlineYear++;
        fullDeadline = `${deadlineYear}-${deadline}`;
        deadlineInMiliseconds = (new Date(fullDeadline)).getTime();
    }

    const diff = deadlineInMiliseconds - now;

    // let unusedSeconds = Math.round(diff / 1000);

    // const days = Math.floor(unusedSeconds / 60 / 60 / 24);
    // unusedSeconds -= days * 60 * 60 * 24;

    // const hours = Math.floor(unusedSeconds / 60 / 60);
    // unusedSeconds -= hours * 60 * 60;

    // const minutes = Math.floor(unusedSeconds / 60);

    // const seconds = unusedSeconds - minutes * 60;

    let unusedTime = Math.round(diff / 1000);

    const seconds = unusedTime % 60;
    unusedTime = (unusedTime - seconds) / 60;

    const minutes = unusedTime % 60;
    unusedTime = (unusedTime - minutes) / 60;

    const hours = unusedTime % 24;
    unusedTime = (unusedTime - hours) / 24;

    const days = unusedTime;

    return { days, hours, minutes, seconds };
}

function formatNumber(number) {
    return number < 10 ? '0' + number : number;
}

export { clock }