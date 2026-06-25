// ==UserScript==
// @name         AniList - Quick Genres Display
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  Affiche les genres au-dessus du bloc Relations.
// @author       Symswag
// @match        https://anilist.co/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    let lastPathname = location.pathname;

    function injectGenresBlock() {
        // 1. Si l'URL a changé, on force la suppression de l'ancien bloc (évite d'afficher les genres de l'anime précédent)
        if (location.pathname !== lastPathname) {
            const oldBlock = document.getElementById('custom-quick-genres');
            if (oldBlock) oldBlock.remove();
            lastPathname = location.pathname;
        }

        // Si le bloc est déjà présent et valide pour cette page, on ne fait rien
        if (document.getElementById('custom-quick-genres')) return;

        // 2. Cibler le bloc Relations
        const relationsBlock = document.querySelector('.relations.small') || document.querySelector('.relations');
        if (!relationsBlock) return;

        // 3. Extraire les genres (structure exacte)
        const typeElements = Array.from(document.querySelectorAll('.data-set.data-list .type'));
        const genresHeader = typeElements.find(el => el.textContent.trim() === 'Genres');
        if (!genresHeader) return;

        const valueContainer = genresHeader.nextElementSibling;
        if (!valueContainer || !valueContainer.classList.contains('value')) return;

        const genreLinks = Array.from(valueContainer.querySelectorAll('a'));
        if (genreLinks.length === 0) return;

        const cleanGenres = genreLinks.map(link => ({
            name: link.textContent.trim(),
            href: link.getAttribute('href')
        })).filter(g => g.name !== "");

        // 4. Création du conteneur principal (Épuré, sans padding)
        const container = document.createElement('div');
        container.id = 'custom-quick-genres';
        container.style.marginBottom = '25px';

        // Titre
        const title = document.createElement('h2');
        title.textContent = 'Genres';
        title.style.fontSize = '1.4rem';
        title.style.fontWeight = '700';
        title.style.letterSpacing = '0.03em';
        title.style.marginBottom = '12px';
        title.style.color = 'var(--color-text-main)';
        container.appendChild(title);

        // Liste des badges
        const tagsList = document.createElement('div');
        tagsList.style.display = 'flex';
        tagsList.style.flexWrap = 'wrap';
        tagsList.style.gap = '8px';

        cleanGenres.forEach(genre => {
            const badge = document.createElement('a');
            badge.href = genre.href;
            badge.textContent = genre.name;

            badge.style.display = 'inline-flex';
            badge.style.alignItems = 'center';
            badge.style.padding = '8px 16px';
            badge.style.backgroundColor = 'rgba(61, 180, 242, 0.1)';
            badge.style.color = 'var(--color-blue)';
            badge.style.borderRadius = '6px';
            badge.style.fontSize = '1.3rem';
            badge.style.fontWeight = '600';
            badge.style.transition = 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
            badge.style.textDecoration = 'none';

            badge.addEventListener('mouseenter', () => {
                badge.style.transform = 'translateY(-2px)';
                badge.style.backgroundColor = 'var(--color-blue)';
                badge.style.color = '#ffffff';
                badge.style.boxShadow = '0 4px 12px rgba(61, 180, 242, 0.3)';
            });

            badge.addEventListener('mouseleave', () => {
                badge.style.transform = 'translateY(0)';
                badge.style.backgroundColor = 'rgba(61, 180, 242, 0.1)';
                badge.style.color = 'var(--color-blue)';
                badge.style.boxShadow = 'none';
            });

            tagsList.appendChild(badge);
        });

        container.appendChild(tagsList);

        // 5. Insertion au-dessus des Relations
        relationsBlock.parentNode.insertBefore(container, relationsBlock);
    }

    // --- STRATÉGIE DE DÉTECTION SPA ---

    // 1. On garde l'observer qui guette l'injection du HTML (utile au premier chargement ou retour arrière)
    const observer = new MutationObserver(() => {
        injectGenresBlock();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // 2. On intercepte les changements d'historique (quand tu cliques sur un anime recommandé par exemple)
    window.addEventListener('popstate', injectGenresBlock);

    // 3. Hack spécial pour les SPA (on écoute le clic sur le site pour voir si l'URL change)
    document.addEventListener('click', () => {
        setTimeout(injectGenresBlock, 100); // Un léger délai pour laisser le routeur d'AniList mettre à jour le DOM
    }, true);

    // Premier lancement
    injectGenresBlock();
})();