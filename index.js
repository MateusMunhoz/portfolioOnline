document.getElementById('telefoneDy').addEventListener('click', function() {
    const numero = this.textContent.trim();

    const textarea = document.createElement('textarea');
    textarea.value = numero;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    const original = this.innerHTML;
    this.innerHTML = '<i class="fa-solid fa-phone"></i> Copiado!';
    setTimeout(() => {
        this.innerHTML = original;
    }, 2000);
});
