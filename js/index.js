window.onload = function () {
    var startMsec = new Date();
    while (new Date() - startMsec < 1000);
    const spinner = document.getElementById('loading');
    spinner.classList.add('loaded');
}
