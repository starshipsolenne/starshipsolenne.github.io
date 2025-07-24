async function fetchAlertConfig() {
    try {
        const response = await fetch('./alert.json', {cache: "no-store"});
        const config = await response.json();
        setAlertState(config.alertState);
    } catch(e) {
        console.error("Failed to load config:", e);
    }
}

function setAlertState(state) {
    document.body.classList.remove('redalert', 'yellowalert', 'allclear');
    document.body.classList.add(state);

    const conditionText = document.getElementById('alert-condition');

    if (state === 'redalert') {
        conditionText.textContent = "CONDITION: RED";
    } else if (state === 'yellowalert') {
        conditionText.textContent = "CONDITION: YELLOW";
    } else {
        conditionText.textContent = "CONDITION: NORMAL";
    }
}

// Initial call and periodic check (every 10 seconds)
fetchAlertConfig();
setInterval(fetchAlertConfig, 10000);
