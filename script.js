// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Éléments du DOM
    const pseudoInput = document.getElementById('pseudo');
    const pseudoError = document.getElementById('pseudo-error');
    const descriptionElement = document.getElementById('description');
    const changerDescriptionBtn = document.getElementById('changer-description');
    const avatars = document.querySelectorAll('.avatar');
    const suivantBtn = document.getElementById('suivant');
    const formulaire = document.getElementById('formulaire');
    const profil = document.getElementById('profil');
    const profilPseudo = document.getElementById('profil-pseudo');
    const profilDescription = document.getElementById('profil-description');
    const profilAvatar = document.getElementById('profil-avatar');
    const recommencerBtn = document.getElementById('recommencer');
    const themeToggle = document.getElementById('theme-toggle');
    
    // Variables d'état
    let selectedAvatar = null;
    let isDarkTheme = false;
    
    // Descriptions disponibles
    const descriptions = [
        "Pff.. la flemme !",
        "Je vais tous vous massacrer !!! ",
        "Je suis le meilleur, y'a quoi ?!"
    ];
    
    // Fonction pour changer la description
    function changeDescription() {
        let newDescription;
        let currentDescription = descriptionElement.textContent;
        
        // Créer une nouvelle liste sans la description actuelle
        const availableDescriptions = descriptions.filter(desc => desc !== currentDescription);
        
        // Choisir une description aléatoire parmi celles restantes
        newDescription = availableDescriptions[Math.floor(Math.random() * availableDescriptions.length)];
        
        // Mettre à jour l'élément
        descriptionElement.textContent = newDescription;
        
        // Vérifier si le bouton Suivant peut être activé
        checkFormValidity();
    }
    
    // Fonction pour valider le pseudo
    function validatePseudo() {
        const pseudo = pseudoInput.value;
        const regex = /^[a-zA-Z]+$/;
        
        if (pseudo === '') {
            pseudoError.textContent = '';
            return false;
        }
        
        if (!regex.test(pseudo)) {
            pseudoError.textContent = 'Le pseudo ne doit contenir que des lettres (a-z, A-Z)';
            return false;
        }
        
        if (pseudo.length < 3) {
            pseudoError.textContent = 'Le pseudo doit contenir au moins 3 lettres';
            return false;
        }
        
        pseudoError.textContent = '';
        return true;
    }
    
    // Fonction pour vérifier la validité globale du formulaire
    function checkFormValidity() {
        const isPseudoValid = validatePseudo();
        const isDescriptionSet = descriptionElement.textContent !== 'Chargement...';
        const isAvatarSelected = selectedAvatar !== null;
        
        suivantBtn.disabled = !(isPseudoValid && isDescriptionSet && isAvatarSelected);
    }
    
    // Fonction pour basculer entre les thèmes
    function toggleTheme() {
        isDarkTheme = !isDarkTheme;
        
        if (isDarkTheme) {
            document.body.classList.add('dark');
            document.body.classList.remove('light');
            themeToggle.textContent = '☀️';
        } else {
            document.body.classList.add('light');
            document.body.classList.remove('dark');
            themeToggle.textContent = '🌙';
        }
    }
    
    // Fonction pour afficher le profil
    function showProfile() {
        profilPseudo.textContent = pseudoInput.value;
        profilDescription.textContent = descriptionElement.textContent;
        profilAvatar.src = selectedAvatar;
        
        formulaire.classList.add('hidden');
        profil.classList.remove('hidden');
    }
    
    // Fonction pour réinitialiser le formulaire
    function resetForm() {
        pseudoInput.value = '';
        selectedAvatar = null;
        descriptionElement.textContent = 'Chargement...';
        changeDescription();
        
        // Réinitialiser la sélection des avatars
        avatars.forEach(avatar => avatar.classList.remove('selected'));
        
        // Réinitialiser le bouton Suivant
        suivantBtn.disabled = true;
        
        // Revenir au formulaire
        formulaire.classList.remove('hidden');
        profil.classList.add('hidden');
    }
    
    // Événements
    pseudoInput.addEventListener('input', function() {
        validatePseudo();
        checkFormValidity();
    });
    
    changerDescriptionBtn.addEventListener('click', changeDescription);
    
    avatars.forEach(avatar => {
        avatar.addEventListener('click', function() {
            // Retirer la classe 'selected' de tous les avatars
            avatars.forEach(a => a.classList.remove('selected'));
            
            // Ajouter la classe 'selected' à l'avatar cliqué
            this.classList.add('selected');
            
            // Stocker le src de l'avatar sélectionné
            selectedAvatar = this.src;
            
            // Vérifier si le bouton Suivant peut être activé
            checkFormValidity();
        });
    });
    
    suivantBtn.addEventListener('click', showProfile);
    
    recommencerBtn.addEventListener('click', resetForm);
    
    themeToggle.addEventListener('click', toggleTheme);
    
    // Initialisation
    changeDescription(); // Charger une première description
    toggleTheme(); // Initialiser le thème (light par défaut)
});