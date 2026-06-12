let utilisateurs = JSON.parse(localStorage.getItem("users")) || [];
let messages = [];

let utilisateurActuel = null;

// CONNEXION SIMPLE
function connexion() {
    let pseudo = document.getElementById("loginPseudo").value;

    if (!pseudo) return alert("Entre un pseudo");

    utilisateurActuel = pseudo;

    document.getElementById("loginPage").style.display = "none";
    document.getElementById("container").style.display = "flex";

    afficherMembres();
}

// --- MEMBRES (ancien News)
function afficherMembres() {
    let html = `
    <h2>Nouveaux membres</h2>
    <table border="1">
        <tr>
            <th>Pseudo</th>
            <th>Date</th>
        </tr>
    `;

    utilisateurs.forEach(u => {
        html += `
        <tr>
            <td>${u.pseudo}</td>
            <td>${u.date}</td>
        </tr>
        `;
    });

    html += "</table>";

    document.getElementById("textContent").innerHTML = html;
}

// --- IDENTIFICATION
function afficherIdentification() {
    document.getElementById("textContent").innerHTML = `
        <h2>Identification</h2>

        <input id="pseudo" placeholder="Pseudo"><br><br>
        <input id="discord" placeholder="Discord (ex: user#0001)"><br><br>

        <button onclick="validerIdentification()">Valider</button>
    `;
}

function validerIdentification() {
    let pseudo = document.getElementById("pseudo").value;
    let discord = document.getElementById("discord").value;

    if (!pseudo || !discord) {
        return alert("Remplis tout");
    }

    // Vérif doublon
    let existe = utilisateurs.some(u => u.pseudo === pseudo || u.discord === discord);

    if (existe) {
        return alert("Pseudo ou Discord déjà utilisé !");
    }

    let date = new Date().toLocaleDateString();

    utilisateurs.push({ pseudo, discord, date });

    localStorage.setItem("users", JSON.stringify(utilisateurs));

    alert("Demande envoyée !");
    afficherMembres();
}

// --- PROFIL (remplace info sécurité)
function afficherProfil() {
    document.getElementById("textContent").innerHTML = `
        <h2>Profil</h2>
        <p>Pseudo connecté : ${utilisateurActuel}</p>
        <p>(Validation Discord faite manuellement)</p>
    `;
}

// --- CHAT TEMPORAIRE
function afficherChat() {
    afficherMessages();

    document.getElementById("textContent").innerHTML += `
        <br>
        <input id="msg" placeholder="Message...">
        <button onclick="envoyerMessage()">Envoyer</button>
    `;
}

function afficherMessages() {
    let html = "<h2>Chat (temporaire)</h2>";

    messages.forEach(m => {
        html += `<p><b>${m.user}:</b> ${m.text}</p>`;
    });

    document.getElementById("textContent").innerHTML = html;
}

function envoyerMessage() {
    let text = document.getElementById("msg").value;

    if (!text) return;

    messages.push({
        user: utilisateurActuel,
        text: text
    });

    document.getElementById("msg").value = "";

    afficherChat();
}

// --- SUPPRESSION CHAT SI PERSONNE (simulation)
window.addEventListener("beforeunload", () => {
    messages = [];
});
</html>
