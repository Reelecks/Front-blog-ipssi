/*--Functions--*/
async function submitFormConnect(e, form) {
  // 1. Prevent reloading page
  e.preventDefault();
  // 2. Submit the form
  // 2.1 User Interaction
  const btnSubmit = document.getElementById("btnSubmit");
  btnSubmit.disabled = true;
  setTimeout(() => (btnSubmit.disabled = false), 2000);
  // 2.2 Build JSON body
  const jsonFormData = buildJsonFormData(form);

  fetch("http://127.0.0.1:4000/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonFormData),
  })
    .then((response) => response.json())
    .then((jsonFormData) => {
      var datas = JSON.parse(JSON.stringify(jsonFormData));
      var token = datas.token;
      localStorage.setItem("token", `${token}`);
      console.log(localStorage.getItem("token"));
      getStyle();
      getUserConnectedRole()
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

async function submitFormRegister(e, form) {
  // 1. Prevent reloading page
  e.preventDefault();
  // 2. Submit the form
  // 2.1 User Interaction
  const btnSubmit = document.getElementById("btnSubmit");
  btnSubmit.disabled = true;
  setTimeout(() => (btnSubmit.disabled = false), 2000);
  // 2.2 Build JSON body
  const jsonFormData = buildJsonFormData(form);

  fetch("http://127.0.0.1:4000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonFormData),
  })
    .then((response) => response.json())
    .then((jsonFormData) => {
      var datas = JSON.parse(JSON.stringify(jsonFormData));
      var token = datas.token;
      localStorage.setItem("token", `${token}`);
      getStyle();
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

async function submitFormNewArticle(e, form) {
  e.preventDefault();
  const btnSubmit = document.getElementById("btnSubmit");
  btnSubmit.disabled = true;
  setTimeout(() => (btnSubmit.disabled = false), 2000);
  // 2.2 Build JSON body
  const jsonFormData = buildJsonFormData(form);
  console.log(JSON.stringify(jsonFormData));
  console.log(localStorage.getItem("token"));
  token = localStorage.getItem("token");
  fetch("http://127.0.0.1:4000/api/post", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonFormData),
  })
    .then((response) => response.json())
    .then((jsonFormData) => {
      console.log(jsonFormData);
      generateAllArticle();
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}
async function submitFormNewComment(e, form, idArticle) {
  e.preventDefault();
  const btnSubmit = document.getElementById("btnSubmit");
  btnSubmit.disabled = true;
  setTimeout(() => (btnSubmit.disabled = false), 2000);
  // 2.2 Build JSON body
  const jsonFormData = buildJsonFormData(form);
  console.log(JSON.stringify(jsonFormData));
  token = localStorage.getItem("token");
  fetch(`http://127.0.0.1:4000/api/comment/${idArticle}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonFormData),
  })
    .then((response) => response.json())
    .then((jsonFormData) => {
      console.log(jsonFormData);
      generateSingleArticle(idArticle);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

function deleteArticle(id) {
  token = localStorage.getItem("token");
  fetch(`http://127.0.0.1:4000/api/post/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(() => {
      generateAllArticle();
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}
function deleteComment(id) {
  token = localStorage.getItem("token");
  fetch(`http://127.0.0.1:4000/api/comment/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(() => {
      generateAllArticle();
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

function modifArticle(e, form, id) {
  e.preventDefault();
  const btnSubmit = document.getElementById("btnSubmit");
  btnSubmit.disabled = true;
  setTimeout(() => (btnSubmit.disabled = false), 2000);
  // 2.2 Build JSON body
  const jsonFormData = buildJsonFormData(form);
  token = localStorage.getItem("token");
  fetch(`http://127.0.0.1:4000/api/post/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonFormData),
  })
    .then((response) => response.json())
    .then((jsonFormData) => {
      console.log(jsonFormData);
      generateAllArticle();
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

function modifComment(e, form, id) {
  e.preventDefault();
  const btnSubmit = document.getElementById("btnSubmit");
  btnSubmit.disabled = true;
  setTimeout(() => (btnSubmit.disabled = false), 2000);
  // 2.2 Build JSON body
  const jsonFormData = buildJsonFormData(form);
  token = localStorage.getItem("token");
  fetch(`http://127.0.0.1:4000/api/comment/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonFormData),
  })
    .then((response) => response.json())
    .then((jsonFormData) => {
      console.log(jsonFormData);
      generateAllArticle();
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

function buildJsonFormData(form) {
  const jsonFormData = {};
  for (const pair of new FormData(form)) {
    jsonFormData[pair[0]] = pair[1];
  }
  return jsonFormData;
}

window.addEventListener("load", () => {
  getStyle();
});

function getStyle() {
  const acc = document.querySelector("#headerAcc");
  const login = document.querySelector("#headerLogin");
  const register = document.querySelector("#headerRegister");
  const write = document.querySelector("#headerWrite");
  const deconnect = document.querySelector("#headerDeco");

  token = localStorage.getItem("token");

  if (localStorage.length > 0) {
    console.log("token");
    acc.style.display = "";
    login.style.display = "none";
    register.style.display = "none";
    write.style.display = "";
    deconnect.style.display = "";
    generateAllArticle();
  } else {
    console.log("pas token");
    acc.style.display = "none";
    login.style.display = "";
    register.style.display = "";
    write.style.display = "none";
    deconnect.style.display = "none";

    const main = document.querySelector(".main");
    console.log("ici");
    const h1 = document.createElement("h1");
    h1.style.color = "red";
    h1.textContent = "Vous devez être connecté pour accéder aux articles";
    main.appendChild(h1);
  }
}

function deconnect() {
  clearMain();
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("id");
  console.log(localStorage, "oulou");
  getStyle();
}

async function getUserConnectedRole() {
  token = localStorage.getItem("token");
  fetch(`http://127.0.0.1:4000/api/user/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      localStorage.setItem("role", `${response.role}`);
      localStorage.setItem("id", `${response.id}`);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}
