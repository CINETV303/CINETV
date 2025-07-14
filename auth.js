// Fonction pour vérifier l'accès premium
async function verifyPremiumAccess(email, code) {
    // Normaliser les entrées (supprimer les espaces et mettre en minuscules)
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedCode = code.trim().toUpperCase();

    try {
        // Charger le fichier users.json avec un cache-buster pour éviter les problèmes de cache
        const response = await fetch('users.json?' + new Date().getTime());
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const users = await response.json();
        
        // Vérifier si le code existe
        const userData = users[normalizedCode];
        if (!userData) {
            return { 
                success: false, 
                error: "Code d'accès invalide. Veuillez vérifier et réessayer." 
            };
        }

        // Vérifier la correspondance de l'email
        if (userData.email.toLowerCase() !== normalizedEmail) {
            return { 
                success: false, 
                error: "L'email ne correspond pas au code fourni." 
            };
        }

        // Vérifier la date d'expiration
        const expireDate = new Date(userData.expire);
        const today = new Date();
        
        if (expireDate < today) {
            return { 
                success: false, 
                error: "Votre abonnement a expiré le " + expireDate.toLocaleDateString('fr-FR') 
            };
        }

        // Si tout est valide
        return { 
            success: true, 
            data: {
                email: userData.email,
                expire: userData.expire,
                plan: userData.plan
            }
        };

    } catch (error) {
        console.error("Erreur lors de la vérification:", error);
        return { 
            success: false, 
            error: "Une erreur technique est survenue. Veuillez réessayer plus tard." 
        };
    }
}

// Gestionnaire pour les autres pages (optionnel)
document.addEventListener('DOMContentLoaded', function() {
    const accessBtn = document.getElementById('accessBtn');
    
    if (accessBtn) {
        accessBtn.addEventListener('click', async function() {
            const email = document.getElementById('userEmail')?.value.trim();
            const code = document.getElementById('accessCode')?.value.trim();
            
            if (!email || !code) {
                alert("Veuillez remplir tous les champs");
                return;
            }

            const result = await verifyPremiumAccess(email, code);
            
            if (result.success) {
                window.location.href = `premium-content.html?uid=${encodeURIComponent(code)}&email=${encodeURIComponent(email)}`;
            } else {
                alert(result.error || "Erreur de vérification");
            }
        });
    }
});