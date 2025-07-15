// Fonction de vérification modifiée pour utiliser GitHub Pages
async function verifyPremiumAccess(email, code) {
    try {
        const normalizedEmail = email.trim().toLowerCase();
        const normalizedCode = code.trim().toUpperCase();

        // Solution alternative si vous ne pouvez pas utiliser une API :
        // Stockez les codes valides dans un format OBFUSQUÉ (pas en clair)
        // ⚠️ Ce n'est pas totalement sécurisé, mais mieux que users.json public.
        const validCodes = {
            "ID0028": {
                email: "audrypaulin65@gmail.com",
                expire: "2025-12-31"
            }
            // Ajoutez d'autres codes ici (mais évitez les données sensibles)
        };

        const userData = validCodes[normalizedCode];
        
        if (!userData) {
            return { 
                success: false, 
                error: "Code premium invalide." 
            };
        }

        if (userData.email.toLowerCase() !== normalizedEmail) {
            return { 
                success: false, 
                error: "Email ne correspond pas au code." 
            };
        }

        if (new Date(userData.expire) < new Date()) {
            return { 
                success: false, 
                error: "Votre abonnement a expiré." 
            };
        }

        return { 
            success: true,
            data: {
                email: normalizedEmail,
                expire: userData.expire
            }
        };

    } catch (error) {
        console.error("Erreur de vérification:", error);
        return { 
            success: false, 
            error: "Erreur temporaire. Réessayez plus tard." 
        };
    }
}

// Gestion du localStorage et vérification auto
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('premiumAccess') === 'true') {
        document.getElementById('premiumContainer')?.style.display = 'block';
        document.querySelector('.access-form')?.style.display = 'none';
    }
});