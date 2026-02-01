const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)'); function applyTheme(e) { document.documentElement.setAttribute( 'data-theme', e.matches ? 'dark' : 'light' ); } // Aplica no carregamento 
applyTheme(mediaQuery); // Escuta mudanças do sistema 
mediaQuery.addEventListener('change', applyTheme); 