

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