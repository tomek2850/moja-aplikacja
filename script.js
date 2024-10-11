const selectElement = document.getElementById('options');
// Obsługa wyboru opcji z dropdownu
selectElement.addEventListener('change', function() {
const selectedValue = selectElement.value;
console.log("Wybrana opcja: " + selectedValue);
saveDropdownSelection(); // Zapis do LocalStorage
});
// Funkcja dodająca aktualny czas do tabeli
document.getElementById('saveTimeBtn').addEventListener('click', function() {
const tableBody = document.getElementById('tableBody');
const currentTime = new Date().toLocaleTimeString(); // Pobranie aktualnej godziny

// Utworzenie nowego wiersza
const newRow = document.createElement('tr');
const newCell = document.createElement('td');
newCell.textContent = currentTime;
newRow.appendChild(newCell);

// Dodanie nowego wiersza do tabeli
tableBody.appendChild(newRow);
saveToLocalStorage();
// Zapis do LocalStorage
});
// Funkcja usuwająca najnowszy wpis
document.getElementById('deleteTimeBtn').addEventListener('click', function() {
const tableBody = document.getElementById('tableBody');
// Sprawdzenie czy tabela ma jakieś wpisy
if (tableBody.rows.length > 0) {
tableBody.deleteRow(tableBody.rows.length - 1);
// Usunięcie ostatniego wiersza
saveToLocalStorage();
// Zapis do LocalStorage
}
});
// Funkcja zapisująca do LocalStorage
function saveToLocalStorage() {
const tableBody = document.getElementById('tableBody');
const times = [];
for (let i = 0; i < tableBody.rows.length; i++) {
times.push(tableBody.rows[i].cells[0].textContent);
}
localStorage.setItem('savedTimes', JSON.stringify(times));
}
// Funkcja ładująca dane z LocalStorage
function loadFromLocalStorage() {
const savedTimes = JSON.parse(localStorage.getItem('savedTimes')) || [];
const tableBody = document.getElementById('tableBody');

savedTimes.forEach(time => {
const newRow = document.createElement('tr');
const newCell = document.createElement('td');
newCell.textContent = time;
newRow.appendChild(newCell);
tableBody.appendChild(newRow);
});
}
// Funkcja zapisująca wybór dropdownu do LocalStorage
function saveDropdownSelection() {
const selectedValue = document.getElementById('options').value;
localStorage.setItem('selectedOption', selectedValue);
}
// Funkcja ładująca wybór dropdownu z LocalStorage
function loadDropdownSelection() {
const selectedValue = localStorage.getItem('selectedOption');
if (selectedValue) {
document.getElementById('options').value = selectedValue;
}
}
// Załaduj dane z LocalStorage przy starcie strony
window.addEventListener('load', function() {
loadFromLocalStorage();
loadDropdownSelection();
});