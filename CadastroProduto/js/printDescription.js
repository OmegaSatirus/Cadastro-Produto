document.addEventListener('DOMContentLoaded', () => {
    const tooltipBox = document.getElementById('tooltip');

    document.addEventListener('mousemove', (event) => {
        const tooltip = event.target.closest('.tooltip'); 

        if (tooltip) {
            const tooltipText = tooltip.getAttribute('data-tooltip');
            tooltipBox.textContent = tooltipText;
            tooltipBox.style.display = 'block';

            const mouseX = event.clientX;
            const mouseY = event.clientY;

            tooltipBox.style.left = `${mouseX + 10}px`;
            tooltipBox.style.top = `${mouseY + 10}px`;
        } else {
            tooltipBox.style.display = 'none';
        }
    });

    document.addEventListener('mouseleave', (event) => {
        if (!event.target.closest('.tooltip')) {
            tooltipBox.style.display = 'none';
        }
    });
});
