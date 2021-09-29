//Main script file which performs code Logic
//Mock API it updates is:https://6151d5004a5f22001701d4ad.mockapi.io/lists

//imports start-------------------------------------------------------------------------
// Imports all API call funtions
import * as apiCall from "./APIcalls.js";
//imports update table function
import { updateTable } from "./updateTable.js";
//imports end----------------------------------------------------------------------

//Declaring all varibles needed start------------------------------------------------------
//selects the form which is used to fill information
const form = document.querySelector("#form");
//selects the main table
const table = document.querySelector("table");
//select Table body----------------------------------
const tbody = document.querySelector("#tbody");
// Selecting input boxes
const firstname = document.querySelector("#FirstName");
const lastname = document.querySelector("#LastName");
const email = document.querySelector("#Email");
const gender = document.querySelector("#Gender");
const food = document.querySelectorAll(".Checkbox");
const pincode = document.querySelector("#Pincode");
const address = document.querySelector("#Address");
const state = document.querySelector("#State");
const country = document.querySelector("#Country");
//Array to store all objects created
let rowArray = [];
//state and element where we have to Edit
let editing = false;
let editElement;

//Declaring all varibles needed end------------------------------------------------------

//----------------------------------------------------------------------------------------------------

//Class table to store the row data in object---------------------------------------------------------
class Table {
  constructor(
    firstname,
    lastname,
    email,
    address,
    pincode,
    gender,
    checkedFood,
    state,
    country
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.address = address;
    this.pincode = pincode;
    this.gender = gender;
    this.checkedFood = checkedFood;
    this.state = state;
    this.country = country;
  }
}
// End of Class--------------------------------------------------------------------------

//start of all event handlers------------------------------------------------------------

//adding submit event Lisenter to form to listen sumit evet
form.addEventListener("submit", function (e) {
  e.preventDefault();
  //Array to store choice of food
  const checkedFood = [];

  //pushes checked food to checkedFood array
  food.forEach(function (el) {
    if (el.checked == true) {
      checkedFood.push(el.value);
    }
  });

  //displays alert is food selected is less than 2
  if (checkedFood.length < 2) {
    alert("Select at least two food items");
    return;
  }
  // editing is false if it is a new enttry
  if (!editing) {
    const row = new Table(
      firstname.value,
      lastname.value,
      email.value,
      address.value,
      pincode.value,
      gender.value,
      checkedFood,
      state.value,
      country.value
    );

    rowArray.push(row);

    updateNewValues(row, rowArray);
  } // if editing is true changeElement fucntion is called
  else changeElement(editElement, checkedFood, rowArray);
  // all values of forms are changed to empty string
  firstname.value =
    lastname.value =
    email.value =
    address.value =
    pincode.value =
    state.value =
    country.value =
      "";
  gender.value = "";
  food.forEach((el) => (el.checked = false));
});

//End of event Listner on form--------------------------------------------------

//Listen to click event in table and look for target  to edit selected row
table.addEventListener("click", function (e) {
  if (e.target.classList.contains("edit")) {
    const tr = e.target.closest("tr");
    //gets the element form dom
    editElement = rowArray.find((el) => tr.id === el.id);
    //fill the form values form the selected elements
    firstname.value = editElement.firstname;
    lastname.value = editElement.lastname;
    email.value = editElement.email;
    address.value = editElement.address;
    pincode.value = editElement.pincode;
    gender.value = editElement.gender;
    state.value = editElement.state;
    country.value = editElement.country;
    food.forEach((element) => {
      if (editElement.checkedFood.includes(element.value)) {
        element.checked = true;
      }
    });
    //makes editing true which s fo submmit event knows it is an update
    editing = true;
  }
});

//End of edit event Handler-----------------------------------------------------

//delete event handler
table.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    const tr = e.target.closest("tr");

    //selects index of that that has to to deleted by matching id property in nearest row
    //to the id of elements in in rowArray
    const elementIndex = rowArray.findIndex((el) => tr.id === el.id);
    //calls delete funtion which deletes the object
    deleteElement(rowArray, elementIndex);
    //------------------------------------------------------------------------
  }
});
// End of delete event Handler--------------------------

//End of all Event Handlers---------------------------------------------------------

//start of all functions--------------------------------------------

//start init funtion

//Retriving Data from API-------------------------------------------------------
//gets data from API when page loads
const init = async function () {
  try {
    const data = await apiCall.getData();
    if (data && data.length != 0) {
      rowArray = data;
    }

    await updateTable(rowArray).then((data) => (tbody.innerHTML = data.html));
  } catch (error) {
    alert(`something went Wrong. Please try again`);
  }
};
init();
//End of init funtion------------------------------------------------
//start of updateFuntion

//updateNewValues is called when form is submitted
//this fucntion posts the data to API and the renders the Table with the data
const updateNewValues = async function (row, data) {
  try {
    await apiCall.postData(row);

    const update = await updateTable(data);
    tbody.innerHTML = update.html;
    rowArray = update.rowArray;
  } catch (error) {
    alert(`Not able to send data to API. Please try again`);
  }
};
//End of Update funtion--------------------------------------------

//start of edit funtion------------------------------------

//This fucntion updates the values of element that has to be updated
//and calls putData method which updates the data in API
async function changeElement(element, checkedFood, rowArray) {
  try {
    element.firstname = firstname.value;
    element.lastname = lastname.value;
    element.email = email.value;
    element.address = address.value;
    element.pincode = pincode.value;
    element.gender = gender.value;
    element.checkedFood = checkedFood;
    element.state = state.value;
    element.country = country.value;
    editing = false;
    //putData sends request with PUT method
    await apiCall.putData(element);
    //updateTable updates the table with new value taken from API
    await updateTable(rowArray).then((data) => (tbody.innerHTML = data.html));
  } catch (error) {
    alert(`Something went wrong. Please try again`);
  }
}
//End of edit funtion------------------------------------------------------------------------

//start of delete funtion-----------------------------------------

//deleteElements deletes the object from rowArray and sends API Request with DELETE Method
//Also calls updateTable, updateTable  updates the new result to table after getting it from
//API using GET method
const deleteElement = async function (rowArray, element) {
  try {
    await apiCall.deleteData(rowArray[element]);
    rowArray.splice(element, 1);
    // Api Call to Delete element when Delete Button is pressed
    await updateTable(rowArray).then((data) => (tbody.innerHTML = data.html));
  } catch (error) {
    alert(`Something Went Wrong. Please try Again`);
  }
};
//End of Delete Funtion-------------------------------------

//End of All Funtions-------------------------------------------------------------------

//End of script file-------------------------------------------------------------
