//This Module exports async funtion for four Methods(GET,POST,PUT,DELETE)
//Whcih can be used by main scrip file

//API Call fuction to get API data exported so it can be used in script.js
export const getData = async function () {
  try {
    const res = await fetch(
      "https://6151d5004a5f22001701d4ad.mockapi.io/lists"
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error();
    }
    return data;
  } catch (error) {
    throw error;
  }
};

//------------------------------------------------------------------------------

//API Call fuction to Post API data exported so it can be used in script.js
export const postData = async function (data) {
  try {
    const res = await fetch(
      "https://6151d5004a5f22001701d4ad.mockapi.io/lists",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!res.ok) {
      throw new Error();
    }
    return data;
  } catch (error) {
    throw error;
  }
};

//------------------------------------------------------------------------------

//API Call fuction to update API data exported so it can be used in script.js

export const putData = async function (data) {
  try {
    const res = await fetch(
      `https://6151d5004a5f22001701d4ad.mockapi.io/lists/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!res.ok) {
      throw new Error();
    }
    return data;
  } catch (error) {
    throw error;
  }
};

//------------------------------------------------------------------------------

//API Call fuction to Delete API data exported so it can be used in script.js

export const deleteData = async function (data) {
  try {
    const res = await fetch(
      `https://6151d5004a5f22001701d4ad.mockapi.io/lists/${data.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!res.ok) {
      throw new Error();
    }
    return data;
  } catch (error) {
    throw error;
  }
};
//------------------------------------------------------------------------------
