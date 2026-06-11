// LOGIN
function connexion() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    if (email !== "" && password !== "") {
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("container").style.display = "flex";
        afficherNews();
    } else {
        alert("Remplis les champs !");
    }
}

// DATA
const dataGlobal = {
    news: [
        "Nouvelle attaque phishing détectée",
        "Mise à jour sécurité importante"
    ],
    info: [
        "Activez le 2FA",
        "Ne cliquez pas sur des liens suspects"
    ]
};

// NEWS
function afficherNews() {
    let contenu = "<h2>News</h2><ul>";
    dataGlobal.news.forEach(n => {
        contenu += "<li>" + n + "</li>";
    });
    contenu += "</ul>";

    document.getElementById("textContent").innerHTML = contenu;
}

// INFO
function afficherInfo() {
    document.getElementById("textContent").innerHTML =
        "<h2>Info</h2><p>Conseils de sécurité disponibles ici.</p>";
}

// REPORT
function afficherReport() {
    document.getElementById("textContent").innerHTML = `
        <h2>Report</h2>
        <form onsubmit="envoyerSignalement(event)">
            <div class="form-group">
                <input id="email" placeholder="email">
            </div>
            <div class="form-group">
                <textarea id="message" placeholder="message"></textarea>
            </div>
            <div class="form-group">
                <textarea id="description" placeholder="suspect"></textarea>
            </div>
            <button class="form-submit" type="submit">Envoyer</button>
        </form>
    `;
}

// POWER AUTOMATE
function envoyerSignalement(event) {
    event.preventDefault();

    fetch("TON_URL_POWER_AUTOMATE", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: document.getElementById("email").value,
            message: document.getElementById("message").value,
            description: document.getElementById("description").value
        })
    })
    .then(() => alert("Signalement envoyé"))
    .catch(() => alert("Erreur"));
}

// JEU (simplifié — tu peux remettre le tien complet)
function AfficherJeu() {
    document.getElementById("textContent").innerHTML =
        "<h2>Support</h2><p>Module support en cours...</p>";
}