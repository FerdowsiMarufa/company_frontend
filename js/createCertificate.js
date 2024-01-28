(function() {
    // Your code goes here
    console.log("This is an IIFE!");
    makeCall();
    inputValue = document.getElementById("myInput").value;

    fetchEmployees(inputValue);
})();

function makeCall(){


    let userId = localStorage.getItem("userId");
    userId = userId === null ? 0 : parseInt(userId);
    const apiUrl = `https://localhost:7191/api/Certificate/employeesWithCertificate?userId=${userId}`;
    
    // Using the Fetch API to make a GET request
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); 
        })
        .then(data => {
        
            let certificateData = data;
            console.log(" datta",certificateData);
            const tableBody = document.getElementById('certificateTableBody');

            certificateData.forEach(item => {
              const row = tableBody.insertRow();
              const cell1 = row.insertCell(0);
              const cell2 = row.insertCell(1);
              const cell3 = row.insertCell(2);
      
              cell1.textContent = item.name;
              cell2.textContent = item.departmentId;
              cell3.textContent = item.certificateId;
            });
           
           
        })
        .catch(error => {
            console.error('Fetch error:', error);
     
        });
}

async function fetchEmployees(searchByName) {
    const apiUrl = 'https://localhost:7191/api/Employee';
    try {
        const url = searchByName ? `${apiUrl}?searchByName=${searchByName}` : apiUrl;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const employeeList = await response.json();
        console.log("Employee list", employeeList);

        const dropdownContainer = document.getElementById("myDropdown");
        dropdownContainer.innerHTML = '';

        employeeList.forEach(employee => {
            const option = document.createElement("a");
            option.href = "#";
            option.textContent = employee.name;

            // Set the click event handler for each option
            option.onclick = function() {
                setButtonValue(employee.name);
                closeDropdown(); // Add this line to close the dropdown
            };

            dropdownContainer.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function myFunction() {
    const dropdown = document.getElementById("myDropdown");
    dropdown.classList.toggle("show");

    // Fetch employees when the dropdown is clicked
    fetchEmployees();
}

function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

// Function to set the button value and close the dropdown when an option is clicked
function setButtonValue(value) {
    const button = document.querySelector(".dropbtn");
    button.textContent = value;
    // You can also perform additional actions with the selected value if needed
}

// Function to close the dropdown
function closeDropdown() {
    const dropdown = document.getElementById("myDropdown");
    dropdown.classList.remove("show");
}
