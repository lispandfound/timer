function putData(url = '', data = {}) {
    // Default options are marked with *
}

function dateToJson(date) {
    return {
        year: date.getUTCFullYear(),
        month: date.getUTCMonth() + 1,
        day: date.getUTCDate(),
        hour: date.getUTCHours(),
        minute: date.getUTCMinutes(),
        second: date.getUTCSeconds()
    }
}


function submitUpdate() {
    var form = new FormData(document.querySelector('#update-form'));
    let url_parts = window.location.pathname.split('/');
    let referenceDate = new Date();
    let start_date_entry = document.querySelector('#start-date-input');
    let end_date_entry = document.querySelector('#end-date-input');
    let start_date = chrono.parseDate(form.get('start'), referenceDate);
    let update_data = {
        id: parseInt(url_parts[url_parts.length - 1]),
        name: form.get('name'),
        project: form.get('project'),
    }
    if (form.has('end') && end_date_entry.defaultValue != end_date_entry.value) {
        let end_date = chrono.parseDate(form.get('end'), referenceDate)
        update_data.end = dateToJson(end_date);
    }
    if (start_date_entry.defaultValue != start_date_entry.value) {
        update_data['start'] = dateToJson(start_date);
    }
    fetch('/update', {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(update_data), // body data type must match "Content-Type" header
    }).then(data => window.location.replace('/')); // parses JSON response into native JavaScript objects
}


window.addEventListener('load', () => {
    document.querySelector('#submit-button').addEventListener('click', submitUpdate)
})
