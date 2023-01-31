
// Function to get API data and place data within the table
const getRobots = async () => {
  try {
    const res = await axios.get("https://60c8ed887dafc90017ffbd56.mockapi.io/robots");
    const arr = res.data;
    const newTable = document.getElementById("table");

    // Loops through robot data and structures the order of robot data
    for(robot of arr) {
      const newRow = document.createElement("tr");
      const tdRobotId = document.createElement("td");
      const tdBatteryLevel = document.createElement("td");
      const tdXCoordinate = document.createElement("td");
      const tdYCoordinate = document.createElement("td");
      tdRobotId.textContent = parseInt(robot.robotId);
      tdBatteryLevel.textContent = robot.batteryLevel;
      tdXCoordinate.textContent = robot.x;
      tdYCoordinate.textContent = robot.y;    
      newRow.appendChild(tdRobotId);
      newRow.appendChild(tdBatteryLevel);
      newRow.appendChild(tdXCoordinate);
      newRow.appendChild(tdYCoordinate);
      newTable.appendChild(newRow);
    }
  } catch(e){
    console.log("ERROR!", e);
  }
}

getRobots();

//Sort functionality
function sortTableByColumn(table, column, asc = true){
  const dirModifier = asc ? 1 : -1;
  const tBody = table.tBodies[0];
  const rows = Array.from(tBody.querySelectorAll("tr"));

  // Sort each row
  const sortedRows = rows.sort((a, b) => {
    const aColText = +a.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();
    const bColText = +b.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();

    return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
  });

  // Remove all existing TRs from the table
  while (tBody.firstChild){
    tBody.removeChild(tBody.firstChild);
  }

  // Re-add the newly sorted rows
  tBody.append(...sortedRows);

  // Remember how the column is currently sorted
  table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
  table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-asc", asc);
  table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-desc", !asc);
}

  document.querySelectorAll(".table-sortable th").forEach(headerCell => {
    headerCell.addEventListener("click", () => {
      const tableElement = headerCell.parentElement.parentElement.parentElement;
      const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
      const currentIsAscending = headerCell.classList.contains("th-sort-asc");

      sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
  });
});

// Filter table
function tableSearch(){
  let input, filter, myTable, tr, td, txtValue;
  
  // initializing variables
  input = document.getElementById("myInput");
  filter = input.value;
  myTable = document.getElementById("table");
  tr = myTable.getElementsByTagName("tr");

  for(let i = 0; i < tr.length; i++){
    td = tr[i].getElementsByTagName("td")[0];
    if(td){
       txtValue = td.textContent || td.innerText;
      if(txtValue.indexOf(filter) > -1){
        tr[i].style.display = "";
      }
      else {
        tr[i].style.display = "none";
      }
    }
  }
}