//This module gives html code that has to be inserted in table body
//every time user performs a action(submit,edit,delete)

// Imports all API call
import * as apiCall from "./APIcalls.js";

// this funtion creates html template for the table body using the data returned from API
//and returns the html code
export async function updateTable(rowArray) {
  const data = await apiCall.getData();
  if (data) {
    rowArray = data;
  }
  let html = "";

  rowArray.forEach(function (element) {
    const curElement = element;
    curElement.id = element.id;
    html += `<tr id=${curElement.id}>
    <td>${curElement.firstname}</td>
    <td>${curElement.lastname}</td>
    <td>
     ${curElement.email}
     </td>
     <td>${curElement.address}</td>
     <td>${curElement.pincode}</td>
     <td>${curElement.gender}</td>
     <td>${curElement.checkedFood}</td>
     <td>${curElement.state}</td>
     <td>${curElement.country}</td>
     <td>
      <button class="btn btn-secondary ms-3 edit btn-sm" >
        Edit
      </button>
      <button class="btn btn-danger ms-3 delete btn-sm" >
        Delete
      </button>
    </td>
  </tr>`;
  });

  return html;
}
