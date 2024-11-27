document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("toggle-button");
    const iosScreen = document.querySelector(".apple-phone-screen");
    const androidScreen = document.querySelector(".android-phone-screen");

    toggleButton.addEventListener("click", () => {
        // Vérifier si l'écran iOS est actuellement affiché
        if (iosScreen.classList.contains("hidden")) {
            // Afficher l'écran iOS et masquer l'écran Android
            iosScreen.classList.remove("hidden");
            androidScreen.classList.add("hidden");
            toggleButton.textContent = "Basculer vers Android"; // Mettre à jour le texte du bouton
        } else {
            // Afficher l'écran Android et masquer l'écran iOS
            androidScreen.classList.remove("hidden");
            iosScreen.classList.add("hidden");
            toggleButton.textContent = "Basculer vers iOS"; // Mettre à jour le texte du bouton
        }
    });
});
