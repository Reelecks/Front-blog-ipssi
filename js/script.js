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
      document.cookie = `Bearer ${token}`;
      console.log(document.cookie);
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
      document.cookie = `Bearer ${token}`;
      console.log(document.cookie);
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
  console.log(JSON.stringify(jsonFormData))
  fetch("http//127.0.0.1:4000/api/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonFormData),
  })
    .then((response) => response.json())
    .then((jsonFormData) => {
console.log(jsonFormData)
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

/*--Event Listeners--*/
const connectForm = document.querySelector("#connectForm");
// if(connectForm) {
//     connectForm.addEventListener("submit", function(e) {
//         e.preventDefault()
//         submitFormConnect(e, this);
//     });
// }
// const registerForm = document.querySelector("#registerForm");
// if(registerForm) {
//     registerForm.addEventListener("submit", function(e) {
//         submitFormRegister(e, this);
//     });
// }

/**
 * TODO:VERIFIER SI USER CONNECTER POUR LE BON MAIN
 */
