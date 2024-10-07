// Funkcja dodająca aktualny czas do tabeli
document.getElementById('saveTimeBtn').addEventListener('click', function() {
const tableBody = document.getElementById('tableBody');
const currentTime = new Date().toLocaleTimeString();// Pobranie aktualnej godziny
// Utworzenie nowego wiersza
const newRow = document.createElement('tr');
const newCell = document.createElement('td');
newCell.textContent = currentTime;
newRow.appendChild(newCell);
// Dodanie nowego wiersza do tabeli
tableBody.appendChild(newRow);
});
// Funkcja usuwająca najnowszy wpis
document.getElementById('deleteTimeBtn').addEventListener('click', function(){
const tableBody = document.getElementById('tableBody');
// Sprawdzenie czy tabela ma jakieś wpisy
if (tableBody.rows.length > 0)
{ tableBody.deleteRow(tableBody.rows.length - 1);
// Usunięcie ostatniego wiersza
}
});