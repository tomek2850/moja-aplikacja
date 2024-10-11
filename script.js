// Funkcja do dodawania czasu do tabeli
function addTimeToTable(time) {
const tableBody = document.getElementById('tableBody');
const row = document.createElement('tr');
const cell = document.createElement('td');
cell.textContent = time;
row.appendChild(cell);
tableBody.appendChild(row); }
// Funkcja do ładowania zapisanych czasów z Local Storage
function loadTimes() {
const times = JSON.parse(localStorage.getItem('times')) || [];
times.forEach(time => {
addTimeToTable(time);
// Dodaj każdy czas do tabeli
}); }
// Funkcja do zapisywania aktualnego czasu
function saveTime() {
const currentTime = new Date().toLocaleTimeString();
// Pobierz aktualny czas
const times = JSON.parse(localStorage.getItem('times')) || [];
// Wczytaj zapisane czasy
times.push(currentTime);
// Dodaj nowy czas do tablicy
localStorage.setItem('times', JSON.stringify(times));
// Zapisz tablicę do Local Storage
addTimeToTable(currentTime);
// Dodaj czas do tabeli
}
// Funkcja do usuwania ostatniego czasu
function deleteLastTime() {
const times = JSON.parse(localStorage.getItem('times')) || [];
times.pop(); // Usuwa ostatni czas
localStorage.setItem('times', JSON.stringify(times));
// Zapisz zaktualizowaną tablicę
renderTimes();
// Odśwież tabelę
}
// Funkcja do renderowania czasów w tabeli
function renderTimes() {
const tableBody = document.getElementById('tableBody');
tableBody.innerHTML = '';
// Wyczyść tabelę przed ponownym renderowaniem
loadTimes(); // Załaduj czasy z Local Storage
}
// Funkcje przypisane do przycisków
document.getElementById('saveTimeBtn').addEventListener('click', saveTime);
document.getElementById('deleteTimeBtn').addEventListener('click', deleteLastTime);
 // Wywołaj loadTimes przy załadowaniu strony
 window.onload = loadTimes;