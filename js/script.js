/*--Functions--*/
async function submitFormConnect(e, form) {
    // 1. Prevent reloading page
    e.preventDefault();
    // 2. Submit the form
    // 2.1 User Interaction
    const btnSubmit = document.getElementById('btnSubmit');
    btnSubmit.disabled = true;
    setTimeout(() => btnSubmit.disabled = false, 2000);
    // 2.2 Build JSON body
    const jsonFormData = buildJsonFormData(form);
    // 2.3 Build Headers
    const headers = buildHeaders();
    // 2.4 Request & Response
    const response = await fetchService.performPostHttpRequest(`https://nd-rl-blog-api.onrender.com/signin`, headers, jsonFormData); // Uses JSON Placeholder
    console.log(response);
    // 2.5 Inform user of result
    if(response)
        window.location = `/success.html?FirstName=${response.FirstName}&LastName=${response.LastName}&Email=${response.Email}&id=${response.id}`;
    else
        alert(`An error occured.`);
}

async function submitFormRegister(e, form) {
    // 1. Prevent reloading page
    e.preventDefault();
    // 2. Submit the form
    console.log('dans submitFormRegister')
    // 2.1 User Interaction
    const btnSubmit = document.getElementById('btnSubmit');
    btnSubmit.disabled = true;
    setTimeout(() => btnSubmit.disabled = false, 2000);
    // 2.2 Build JSON body
    const jsonFormData = buildJsonFormData(form);



    fetch('http://127.0.0.1:7000/signup', {
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: jsonFormData
    })
    .then(response => response.json())
    .then(jsonFormData => {
        console.log('success', jsonFormData)
    })
    .catch((error)=> {
        console.log('Error:', error)
    })
    // 2.3 Build Headers



//     const headers = buildHeaders();



//     // 2.4 Request & Response
//     const response = await performPostHttpRequest(`https://nd-rl-blog-api.onrender.com/signup`, headers, jsonFormData); // Uses JSON Placeholder
//     console.log(response);
//     // 2.5 Inform user of result
//     if(response)
//         console.log('enregister', response)
//        // window.location = `/success.html?FirstName=${response.FirstName}&LastName=${response.LastName}&Email=${response.Email}&id=${response.id}`;
//     else
//         alert(`An error occured.`);
// }
}

function buildHeaders(authorization = null) {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": (authorization) ? authorization : "Bearer TOKEN_MISSING"
    };
    return headers;
}

function buildJsonFormData(form) {
    const jsonFormData = { };
    for(const pair of new FormData(form)) {
        jsonFormData[pair[0]] = pair[1];
    }
    console.log(jsonFormData)
    return jsonFormData;
}
/*--/Functions--*/

async function performPostHttpRequest(fetchLink, headers, body) {
    console.log('dans post')
    if(!fetchLink || !headers || !body) {
        throw new Error("One or more POST request parameters was not passed.");
    }
    try {
        console.log('dans try post')
        const rawResponse = await fetch(fetchLink, {
            method: "POST",
            //headers: headers,
            body: JSON.stringify(body)
        });
        console.log(rawResponse)
        const content = await rawResponse.json();
        console.log('success')
        return content;
    }
    catch(err) {
        console.error(`Error at fetch POST: ${err}`);
        throw err;
    }
}

/*--Event Listeners--*/
const connectForm = document.querySelector("#connectForm");
if(connectForm) {
    connectForm.addEventListener("submit", function(e) {
        e.preventDefault()
        console.log(this)
        submitFormConnect(e, this);
    });
}
const registerForm = document.querySelector("#registerForm");
if(registerForm) {
    registerForm.addEventListener("submit", function(e) {
        submitFormRegister(e, this);
    });
}