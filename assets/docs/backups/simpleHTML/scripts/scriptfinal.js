new Vue({
    el: '#app',
    data: {
        isIos: true, // État pour basculer entre iOS et Android
        notifications: [],
        newNotification: {
            title: '',
            body: '',
            logo: '',
            time: ''
        }
    },
    methods: {
        togglePhone() {
            this.isIos = !this.isIos; // Basculer entre iOS et Android
        },
        addNotification() {
            // Ajouter une nouvelle notification
            if (this.newNotification.title && this.newNotification.body && this.newNotification.logo && this.newNotification.time) {
                this.notifications.push({
                    id: Date.now(), // Utiliser l'heure actuelle comme ID unique
                    title: this.newNotification.title,
                    body: this.newNotification.body,
                    logo: this.newNotification.logo,
                    time: this.newNotification.time
                });
                // Réinitialiser le formulaire
                this.newNotification.title = '';
                this.newNotification.body = '';
                this.newNotification.logo = '';
                this.newNotification.time = '';
            } else {
                alert('Veuillez remplir tous les champs!');
            }
        }
    }
});
