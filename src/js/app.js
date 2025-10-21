(function () {
    /*----- ----- ----- ----- -----
	# Funciones
	----- ----- ----- ----- -----*/

    const Tooltips = () => {
        // Inicializar tooltips
        var tooltipTriggerList = [].slice.call(
            document.querySelectorAll('[data-bs-toggle="tooltip"]'),
        );
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    };

    /*----- ----- ----- ----- -----
	# Declaraciones
	----- ----- ----- ----- -----*/

    window.addEventListener('load', () => {
        Tooltips();
    });
})();
