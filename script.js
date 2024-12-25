document.getElementById('deleteTimeBtn').addEventListener('click', function() {
    const tableBody = document.getElementById('tableBody');
    if (tableBody.rows.length > 0) {
        tableBody.deleteRow(tableBody.rows.length - 1);
        saveToLocalStorage(); // Zapisz do LocalStorage
    }
});

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
    const rowCount = tableBody.rows.length + 1;

    // Utworzenie nowego wiersza
    const newRow = document.createElement('tr');

    // Kolumna z numeracją
    const numberCell = document.createElement('td');
    numberCell.textContent = rowCount;

    // Kolumna z czasem
    const timeCell = document.createElement('td');
    timeCell.textContent = currentTime;

    // Dodanie komórek do wiersza
    newRow.appendChild(numberCell);
    newRow.appendChild(timeCell);

    // Dodanie nowego wiersza do tabeli
    tableBody.appendChild(newRow);
    saveToLocalStorage(); // Zapisz do LocalStorage
});

// Funkcja zapisująca do LocalStorage
function saveToLocalStorage() {
    const tableBody = document.getElementById('tableBody');
    const times = [];
    for (let i = 0; i < tableBody.rows.length; i++) {
        const row = tableBody.rows[i];
        const number = row.cells[0].textContent; // Numeracja
        const time = row.cells[1].textContent; // Czas
        times.push({ number, time }); // Zapisz obiekt z numerem i czasem
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
        const numberCell = document.createElement('td');
        numberCell.textContent = time.number;
        const timeCell = document.createElement('td');
        timeCell.textContent = time.time;
        newRow.appendChild(numberCell);
        newRow.appendChild(timeCell);
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
