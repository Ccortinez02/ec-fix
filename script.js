// script.js

document.getElementById('sidebar-toggle').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('open');
});

document.getElementById('sidebar-close').addEventListener('click', function() {
    document.getElementById('sidebar').classList.remove('open');
});
