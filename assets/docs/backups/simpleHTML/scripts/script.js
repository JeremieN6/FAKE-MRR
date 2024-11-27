document.getElementById('operator-input').addEventListener('input', (e) => {
    document.getElementById('operator').textContent = e.target.value;
});

const timeInput = document.getElementById('time-input');
const timeDisplay = document.getElementById('time'); // Référence à l'élément div où l'heure sera affichée

// Fonction pour valider et formater l'heure
timeInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/[^0-9]/g, ''); // Enlever tout sauf les chiffres

    // Limiter la longueur maximale de l'entrée
    if (value.length > 4) {
        value = value.substring(0, 4); // Garder seulement les 4 premiers chiffres
    }

    // Formater l'entrée en hh:mm
    if (value.length >= 2) {
        value = value.slice(0, 2) + ':' + value.slice(2); // Ajouter les deux points
    }

    // Vérifier si les heures et minutes sont valides
    const parts = value.split(':');
    if (parts[0] && parseInt(parts[0], 10) > 23) {
        parts[0] = '23'; // Limiter à 23
    }
    if (parts[1] && parseInt(parts[1], 10) > 59) {
        parts[1] = '59'; // Limiter à 59
    }

    // Mettre à jour la valeur de l'input
    e.target.value = parts.join(':'); // Rejoindre les parties pour mettre à jour l'input

    // Mettre à jour l'affichage de l'heure
    timeDisplay.textContent = e.target.value; // Mettre à jour le contenu du div avec la valeur formatée
});

document.getElementById('date-input').addEventListener('input', (e) => {
    const selectedDate = new Date(e.target.value); // Créer un objet Date à partir de la valeur sélectionnée

    // Vérifier si la date est valide
    if (!isNaN(selectedDate)) {
        // Tableau des jours de la semaine en toute lettre
        const daysOfWeek = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

        // Tableau des mois en toute lettre
        const months = [
            'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
            'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
        ];

        // Récupérer le jour de la semaine, le jour du mois et le mois
        const dayOfWeek = daysOfWeek[selectedDate.getDay()]; // 0-6 correspond aux jours de la semaine
        const day = selectedDate.getDate(); // Jour du mois (1-31)
        const month = months[selectedDate.getMonth()]; // Récupérer le mois en toute lettre

        // Mettre à jour l'affichage de la date
        document.getElementById('date').textContent = `${dayOfWeek} ${day} ${month}`;
    } else {
        document.getElementById('date').textContent = ''; // Effacer si la date n'est pas valide
    }
});

const paymentProcessorSelect = document.getElementById('payment-processor');
const paymentLogo = document.getElementById('payment-logo');
const notificationTitle = document.getElementById('notification-title');

// Mapping des processeurs avec leurs logos et titres respectifs
const paymentProcessors = {
    stripe: {
        title: "Stripe",
        logo: "./assets/images/payment-processor/stripe-logo.png"
    },
    paypal: {
        title: "PayPal",
        logo: "./assets/images/payment-processor/paypal-logo.png"
    }
    // Ajouter d'autres processeurs ici si nécessaire
};

// Écouter les changements dans le menu déroulant
paymentProcessorSelect.addEventListener('change', (e) => {
    const selectedProcessor = e.target.value;
    
    // Récupérer les détails du processeur sélectionné
    const { title, logo } = paymentProcessors[selectedProcessor];
    
    // Mettre à jour le logo et le titre dans la notification
    paymentLogo.src = logo;
    paymentLogo.alt = `${title} Logo`;
    notificationTitle.textContent = title;
});

const notificationCountInput = document.getElementById('notification-count');
const notificationsContainer = document.getElementById('notifications-container');

// Mettre à jour la notification lors de la saisie du montant
amountInput.addEventListener('input', updateNotification);

// Fonction pour mettre à jour la notification
function updateNotification() {
    const amount = amountInput.value.replace(',', '.'); // Remplacer la virgule par un point pour la conversion
    const email = emailInput.value.trim(); // Garder l'email
    const formattedAmount = amount ? `${parseFloat(amount).toFixed(2)}€` : '0€'; // Formater le montant
    const message = `Vous avez reçu un paiement de ${formattedAmount} de ${email}`;

    // Afficher le message dans le corps de la notification
    const limitedMessage = message.length > 85 ? message.substring(0, 82) + '...' : message;
    
    // Mettre à jour toutes les notifications affichées
    const notificationBodies = notificationsContainer.querySelectorAll('.notification-body');
    notificationBodies.forEach(notification => {
        notification.textContent = limitedMessage;
    });
}

// Écouter les changements dans le champ du nombre de notifications
notificationCountInput.addEventListener('input', () => {
    const count = parseInt(notificationCountInput.value, 10);

    // Nettoyer le conteneur des notifications
    notificationsContainer.innerHTML = '';

    // Vérifier si le nombre est entre 1 et 4
    if (count >= 1 && count <= 4) {
        for (let i = 0; i < count; i++) {
            // Créer un nouvel élément de notification
            const notificationDiv = document.createElement('div');
            notificationDiv.className = 'notification apple-notification-bg-color'; // Ajoutez ici votre classe CSS
            notificationDiv.innerHTML = `
                <img src="./assets/images/payment-processor/paypal-logo.png" alt="PayPal" class="notification-logo">
                <div class="notification-content">
                    <div class="notification-content-row">
                        <div class="notification-title">PayPal</div>
                        <div class="notification-time">il y a 12 minutes</div>
                    </div>
                    <div class="notification-body">
                        Vous avez reçu un paiement de <span id="formatted-amount">0€</span> de <span id="email-display">autre@mail.com</span>
                    </div>
                </div>
            `;
            // Ajouter la notification au conteneur
            notificationsContainer.appendChild(notificationDiv);
        }
    }
});
