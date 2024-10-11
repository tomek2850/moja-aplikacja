const tabId = 'myUniqueTabId'; // Unikalny identyfikator zakładki
const selectElement = document.getElementById('options');

// Obsługa wyboru opcji z dropdownu
selectElement.addEventListener('change', function() {
const selectedValue = selectElement.value;
console.log("Wybrana opcja: " + selectedValue);
saveDropdownSelection(); // Zapisz do LocalStorage
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
saveToLocalStorage(); // Zapisz do LocalStorage
});

// Funkcja usuwająca najnowszy wpis
document.getElementById('deleteTimeBtn').addEventListener('click', function() {
const tableBody = document.getElementById('tableBody');
// Sprawdzenie, czy tabela ma jakieś wpisy
if (tableBody.rows.length > 0) {
tableBody.deleteRow(tableBody.rows.length - 1); // Usunięcie ostatniego wiersza
saveToLocalStorage(); // Zapisz do LocalStorage
}
});

// Funkcja zapisująca do LocalStorage
function saveToLocalStorage() {
const tableBody = document.getElementById('tableBody');
const times = [];
for (let i = 0; i < tableBody.rows.length; i++) {
    times.push(tableBody.rows[i].cells[0].textContent);
    }
    localStorage.setItem(tabId + '_savedTimes', JSON.stringify(times)); // Użyj unikalnego klucza
}

// Funkcja ładująca dane z LocalStorage
function loadFromLocalStorage() {
const savedTimes = JSON.parse(localStorage.getItem(tabId + '_savedTimes')) || [];
// Użyj unikalnego klucza
const tableBody = document.getElementById('tableBody');
// Opróżnij tabelę przed załadowaniem nowych danych
tableBody.innerHTML = '';

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
    localStorage.setItem(tabId + '_selectedOption', selectedValue); // Użyj unikalnego klucza
}

// Funkcja ładująca wybór dropdownu z LocalStorage
function loadDropdownSelection() {
const selectedValue = localStorage.getItem(tabId + '_selectedOption');
if (selectedValue) {
        document.getElementById('options').value = selectedValue;
        }
}

// Załaduj dane z LocalStorage przy starcie strony
window.addEventListener('load', function() {
    loadFromLocalStorage();
    loadDropdownSelection();
});
