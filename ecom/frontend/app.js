const form = document.getElementById("form");
const submit = document.getElementById("submit");
const ul = document.getElementById("user-list");

submit.addEventListener("click", async (e) => {
  e.preventDefault();

  let data = {
    name: form[0].value,
    email: form[1].value,
    password: form[2].value,
    address: form[3].value,
    phone: form[4].value,
  };

  let res = await fetch("http://localhost:5000/api/auth/users/add", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  let dataResponse = await res.json();
  console.log(dataResponse);
  fetchUsers();
});

const fetchUsers = async () => {
  ul.innerHTML = "";
  let dataResponse = [];
  let res = await fetch("http://localhost:5000/api/auth/users", {
    method: "GET",
    headers: {
      authorization: "45678",
      "Content-Type": "application/json",
    },
  });

  dataResponse = await res.json();

  dataResponse.data.map((user) => {
    let button = document.createElement("button");
    button.innerHTML = "Delete";
    button.className =
      "ml-4 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600";
    button.onclick = async () => {
      await deleteUser(user._id);
    };
    let li = document.createElement("li");
    li.innerHTML = user.name;
    li.appendChild(button);

    ul.appendChild(li);
  });
};

const deleteUser = async (id) => {
  let res = await fetch(`http://localhost:5000/api/auth/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let response = await res.json();

  console.log(response);

  fetchUsers();
};

fetchUsers();
