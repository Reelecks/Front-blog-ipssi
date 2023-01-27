function generateSingleArticle(id) {
  clearMain();
  var token = localStorage.getItem("token");
  fetch(`http://127.0.0.1:4000/api/post/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const userConnectedRole = localStorage.getItem('role')
      const userConnectedId = localStorage.getItem('id')

      const single_article = document.createElement("div");
      single_article.classList.add("single_article");
      single_article.style.display = "flex";
      document.querySelector(".main").appendChild(single_article);
      const container_article = document.createElement("div");
      container_article.classList.add("container_article");
      const article = document.createElement("article");
      article.classList.add("single_article");
      single_article.appendChild(container_article);
      container_article.appendChild(article);
      const single_title = document.createElement("div");
      single_title.classList.add("single_title");
      single_title.textContent = data.title;
      article.appendChild(single_title);
      article.appendChild(document.createElement("hr"));
      const author = document.createElement("div");
      author.classList.add("single_author");
      const date = document.createElement("div");
      date.classList.add("single_date");
      const author_name = data.user.username;
      author.textContent = `Auteur: ${author_name}`;
      date.textContent = `Publié le : ${data.createdAt}`;
      article.appendChild(author);
      article.appendChild(date);
      article.appendChild(document.createElement("hr"));
      const text = document.createElement("div");
      text.classList.add("single_story");
      text.textContent = data.text;
      container_article.appendChild(text);
      const divButton = document.createElement("div");
      divButton.classList.add("divButton");
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("button");
      deleteButton.innerText = "Supprimer";
      deleteButton.style.backgroundColor = "red";
      deleteButton.setAttribute("onclick", `deleteArticle('${data.id}')`);

      const listButton = document.createElement("button");
      listButton.innerText = "Modifier";
      listButton.style.backgroundColor = " #422af6";
      listButton.classList.add("button");
      listButton.setAttribute("onclick", `modifArticleForm('${data.id}')`);
      container_article.appendChild(divButton);
      console.log(data.user);
      const addButton = document.createElement("button");
      addButton.innerText = "Commenter";
      addButton.style.backgroundColor = " #2ad7f6";
      addButton.classList.add("button");
      addButton.setAttribute("onclick", `generateNewComment('${data.id}')`);
      container_article.appendChild(divButton);
      divButton.appendChild(addButton);

      if (userConnectedRole == "ADMIN" || userConnectedId == data.userId) {
        divButton.appendChild(listButton);
        divButton.appendChild(deleteButton);
        divButton.appendChild(deleteButton);
      }

      for (comment of data.Comments) {
        let comment_container = document.createElement("div");
        comment_container.classList.add("comments_container");

        let comment_date = document.createElement("div");
        comment_date.classList.add("comments_date");

        let comment_text = document.createElement("div");
        comment_text.classList.add("comments_text");

        let comment_userID = document.createElement("div");
        comment_userID.classList.add("comments_author");

        let comment_infos = document.createElement("div");
        comment_infos.classList.add("comments_infos");

        let comment_fill = document.createElement("div");

        const deleteButtonComment = document.createElement("button");
        deleteButtonComment.classList.add("button");
        deleteButtonComment.innerText = "Supprimer";
        deleteButtonComment.style.backgroundColor = "red";
        deleteButtonComment.setAttribute(
          "onclick",
          `deleteComment('${comment.id}')`
        );

        const modifButtonComment = document.createElement("button");
        modifButtonComment.classList.add("button");
        modifButtonComment.innerText = "Modifier";
        modifButtonComment.style.backgroundColor = "#422af6";
        modifButtonComment.setAttribute(
          "onclick",
          `modifCommentForm('${comment.id}')`
        );

        comment_fill.classList.add("comments_fill");
        comment_container.appendChild(comment_fill);
        comment_fill.appendChild(comment_infos);
        comment_fill.appendChild(comment_text);
        comment_infos.appendChild(comment_userID);
        comment_infos.appendChild(comment_date);
        comment_userID.textContent = comment.user.username;
        comment_date.textContent = comment.createdAt;
        comment_text.textContent = comment.texte;
        console.log(data.user.role == "ADMIN", data.user.id == comment.userId);
        console.log(getUserConnectedRole());
        if (userConnectedRole == "ADMIN" || userConnectedId == comment.userId) {
          comment_text.appendChild(deleteButtonComment);
          comment_text.appendChild(modifButtonComment);
        }
        document.querySelector(".main").appendChild(comment_container);
      }
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

function generateAllArticle() {
  clearMain();
  var token = localStorage.getItem("token");
  console.log(token);
  fetch(`http://127.0.0.1:4000/api/post/all`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Create the main container div
      const mainDiv = document.createElement("div");
      mainDiv.classList.add("container", "accueil_articles");
      mainDiv.style.display = "grid";
      document.querySelector(".main").appendChild(mainDiv);

      // Create the h1 element
      const h1 = document.createElement("h1");
      h1.classList.add("center");
      h1.innerText = "Les articles";

      // Append the h1 to the main div
      mainDiv.appendChild(h1);
      for (articleItem of data) {
        // Create the article element
        const article = document.createElement("article");
        article.classList.add("episode");

        // Create the episode number div
        const episodeNumber = document.createElement("div");
        episodeNumber.classList.add("episode__number");
        episodeNumber.innerText = articleItem.title;

        // Create the episode content div
        const episodeContent = document.createElement("div");
        episodeContent.classList.add("episode__content");

        // Create the title div
        const title = document.createElement("div");
        title.classList.add("title");
        title.innerHTML = `${articleItem.createdAt} <br /> ${articleItem.user.username}`;

        // Create the story div
        const story = document.createElement("div");
        story.classList.add("story");

        // Create the story paragraphs
        const storyParagraph1 = document.createElement("p");
        storyParagraph1.innerText = articleItem.text;
        // Append the story paragraphs to the story div
        story.appendChild(storyParagraph1);
        // Create the button element
        const button = document.createElement("button");
        button.classList.add("button");
        button.innerText = "Page de l'article";
        button.setAttribute(
          "onclick",
          `generateSingleArticle('${articleItem.id}')`
        );
        // Append the title and story divs to the episode content div
        episodeContent.appendChild(title);
        episodeContent.appendChild(story);

        // Append the episode number, episode content and button to the article element
        article.appendChild(episodeNumber);
        article.appendChild(episodeContent);
        article.appendChild(button);

        // Append the article to the main div
        mainDiv.appendChild(article);
      }
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}
function generateLoginForm() {
  clearMain();
  let mainLog = document.createElement("div");
  mainLog.classList.add("main_log");

  let logContainer = document.createElement("div");
  logContainer.classList.add("log_container");
  mainLog.appendChild(logContainer);

  let loginContainer = document.createElement("div");
  loginContainer.classList.add("login_container", "form_container");
  logContainer.appendChild(loginContainer);

  let form = document.createElement("form");
  form.setAttribute("action", "");
  form.setAttribute("id", "connectForm");
  loginContainer.appendChild(form);

  let h2 = document.createElement("h2");
  h2.textContent = "Connexion";
  form.appendChild(h2);

  let formRow1 = document.createElement("div");
  formRow1.classList.add("form-row");
  form.appendChild(formRow1);

  let label1 = document.createElement("label");
  label1.setAttribute("for", "username");
  label1.textContent = "User Name";
  formRow1.appendChild(label1);

  let input1 = document.createElement("input");
  input1.setAttribute("type", "text");
  input1.classList.add("input-text", "input-text-block", "w-100");
  input1.setAttribute("id", "username");
  input1.setAttribute("name", "username");
  formRow1.appendChild(input1);

  let formRow2 = document.createElement("div");
  formRow2.classList.add("form-row");
  form.appendChild(formRow2);

  let label2 = document.createElement("label");
  label2.setAttribute("for", "password");
  label2.textContent = "Password";
  formRow2.appendChild(label2);

  let input2 = document.createElement("input");
  input2.setAttribute("type", "password");
  input2.classList.add("input-text", "input-text-block", "w-100");
  input2.setAttribute("id", "password");
  input2.setAttribute("name", "password");
  formRow2.appendChild(input2);

  let formRow3 = document.createElement("div");
  formRow3.classList.add("form-row", "mx-auto");
  form.appendChild(formRow3);

  let button = document.createElement("button");
  button.setAttribute("type", "submit");
  button.classList.add("btn-submit");
  button.setAttribute("id", "btnSubmit");
  button.textContent = "Submit";
  formRow3.appendChild(button);

  let main = document.querySelector(".main");
  main.appendChild(mainLog);

  const connectForm = document.querySelector("#connectForm");
  if (connectForm) {
    connectForm.addEventListener("submit", function (e) {
      e.preventDefault();
      submitFormConnect(e, this);
    });
  }
}

function generateRegisterForm() {
  clearMain();
  const mainLog = document.createElement("div");
  mainLog.classList.add("main_log");

  const logContainer = document.createElement("div");
  logContainer.classList.add("log_container");
  mainLog.appendChild(logContainer);

  const loginContainer = document.createElement("div");
  loginContainer.classList.add("login_container", "form_container");
  logContainer.appendChild(loginContainer);

  const form = document.createElement("form");
  form.setAttribute("action", "");
  form.setAttribute("id", "registerForm");
  loginContainer.appendChild(form);

  const h2 = document.createElement("h2");
  h2.textContent = "Inscription";
  form.appendChild(h2);

  const formRow1 = document.createElement("div");
  formRow1.classList.add("form-row");
  form.appendChild(formRow1);

  const label1 = document.createElement("label");
  label1.setAttribute("for", "username");
  label1.textContent = "User Name";
  formRow1.appendChild(label1);

  const input1 = document.createElement("input");
  input1.setAttribute("type", "text");
  input1.classList.add("input-text", "input-text-block", "w-100");
  input1.setAttribute("id", "username");
  input1.setAttribute("name", "username");
  formRow1.appendChild(input1);

  const formRow2 = document.createElement("div");
  formRow2.classList.add("form-row");
  form.appendChild(formRow2);

  const label2 = document.createElement("label");
  label2.setAttribute("for", "password");
  label2.textContent = "Password";
  formRow2.appendChild(label2);

  const input2 = document.createElement("input");
  input2.setAttribute("type", "password");
  input2.classList.add("input-text", "input-text-block", "w-100");
  input2.setAttribute("id", "password");
  input2.setAttribute("name", "password");
  formRow2.appendChild(input2);

  const formRow3 = document.createElement("div");
  formRow3.classList.add("form-row");
  form.appendChild(formRow3);

  const label3 = document.createElement("label");
  label3.setAttribute("for", "role");
  label3.textContent = "Role";
  formRow3.appendChild(label3);

  const input3 = document.createElement("input");
  input3.setAttribute("type", "text");
  input3.classList.add("input-text", "input-text-block", "w-100");
  input3.setAttribute("id", "role");
  input3.setAttribute("name", "role");
  formRow3.appendChild(input3);

  const formRow4 = document.createElement("div");
  formRow4.classList.add("form-row", "mx-auto");
  form.appendChild(formRow4);

  const button = document.createElement("button");
  button.setAttribute("type", "submit");
  button.classList.add("btn-submit");
  button.setAttribute("id", "btnSubmit");
  button.textContent = "Submit";
  formRow4.appendChild(button);

  let main = document.querySelector(".main");
  main.appendChild(mainLog);
  const registerForm = document.querySelector("#registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      submitFormRegister(e, this);
    });
  }
}

function generateNewArticle() {
  clearMain();
  const mainNewArticle = document.createElement("div");
  mainNewArticle.classList.add("main_newArticle");

  const newArticleContainer = document.createElement("div");
  newArticleContainer.classList.add("newArticle_container");
  newArticleContainer.style.margin = "2em 10em 2em 10em";
  mainNewArticle.appendChild(newArticleContainer);

  const articleContainer = document.createElement("div");
  articleContainer.classList.add("article_container", "form_container");
  newArticleContainer.appendChild(articleContainer);

  const form = document.createElement("form");
  form.setAttribute("action", "");
  form.setAttribute("id", "newArticleForm");
  articleContainer.appendChild(form);

  const h2 = document.createElement("h2");
  h2.textContent = "Nouvel Article";
  form.appendChild(h2);

  const formRow1 = document.createElement("div");
  formRow1.classList.add("form-row");
  form.appendChild(formRow1);

  const label1 = document.createElement("label");
  label1.setAttribute("for", "title");
  label1.textContent = "Titre";
  formRow1.appendChild(label1);

  const input1 = document.createElement("input");
  input1.setAttribute("type", "text");
  input1.classList.add("input-text", "input-text-block", "w-100");
  input1.setAttribute("id", "title");
  input1.style.marginBottom = "2em";
  input1.setAttribute("name", "title");
  formRow1.appendChild(input1);

  const formRow2 = document.createElement("div");
  formRow2.classList.add("form-row");
  form.appendChild(formRow2);

  const label2 = document.createElement("label");
  label2.setAttribute("for", "text");
  label2.textContent = "Texte de L'article";
  formRow2.appendChild(label2);

  const input2 = document.createElement("textarea");
  input2.setAttribute("type", "text");
  input2.classList.add("input-text", "input-text-block", "w-100");
  input2.setAttribute("id", "text");
  input2.setAttribute("name", "text");
  input2.style.minHeight = "15em";
  formRow2.appendChild(input2);

  const formRow3 = document.createElement("div");
  formRow3.classList.add("form-row", "mx-auto");
  form.appendChild(formRow3);

  const button = document.createElement("button");
  button.setAttribute("type", "submit");
  button.classList.add("btn-submit");
  button.setAttribute("id", "btnSubmit");
  button.textContent = "Submit";
  formRow3.appendChild(button);

  let main = document.querySelector(".main");
  main.appendChild(mainNewArticle);
  const registerForm = document.querySelector("#newArticleForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      submitFormNewArticle(e, this);
    });
  }
}
function generateNewComment(idArticle) {
  clearMain();
  const mainNewComment = document.createElement("div");
  mainNewComment.classList.add("main_newComment");

  const newCommentContainer = document.createElement("div");
  newCommentContainer.classList.add("newComment_container");
  newCommentContainer.style.margin = "2em 10em 2em 10em";
  mainNewComment.appendChild(newCommentContainer);

  const commentContainer = document.createElement("div");
  commentContainer.classList.add("comment_container", "form_container");
  newCommentContainer.appendChild(commentContainer);

  const form = document.createElement("form");
  form.setAttribute("action", "");
  form.setAttribute("id", "newCommentForm");
  commentContainer.appendChild(form);

  const h2 = document.createElement("h2");
  h2.textContent = "Nouveau commentaire";
  form.appendChild(h2);

  const formRow1 = document.createElement("div");
  formRow1.classList.add("form-row");
  form.appendChild(formRow1);

  const formRow2 = document.createElement("div");
  formRow2.classList.add("form-row");
  form.appendChild(formRow2);

  const label2 = document.createElement("label");
  label2.setAttribute("for", "texte");
  label2.textContent = "Texte du commentaire";
  formRow2.appendChild(label2);

  const input2 = document.createElement("textarea");
  input2.setAttribute("type", "text");
  input2.classList.add("input-text", "input-text-block", "w-100");
  input2.setAttribute("id", "texte");
  input2.setAttribute("name", "texte");
  input2.style.minHeight = "15em";
  formRow2.appendChild(input2);

  const formRow3 = document.createElement("div");
  formRow3.classList.add("form-row", "mx-auto");
  form.appendChild(formRow3);

  const button = document.createElement("button");
  button.setAttribute("type", "submit");
  button.classList.add("btn-submit");
  button.setAttribute("id", "btnSubmit");
  button.textContent = "Submit";
  formRow3.appendChild(button);

  let main = document.querySelector(".main");
  main.appendChild(mainNewComment);
  const registerForm = document.querySelector("#newCommentForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      submitFormNewComment(e, this, idArticle);
    });
  }
}

function clearMain() {
  const main = document.querySelector(".main");
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
}

function modifArticleForm(idArticle) {
  clearMain();
  const mainNewArticle = document.createElement("div");
  mainNewArticle.classList.add("main_newArticle");

  const newArticleContainer = document.createElement("div");
  newArticleContainer.classList.add("newArticle_container");
  newArticleContainer.style.margin = "2em 10em 2em 10em";
  mainNewArticle.appendChild(newArticleContainer);

  const articleContainer = document.createElement("div");
  articleContainer.classList.add("article_container", "form_container");
  newArticleContainer.appendChild(articleContainer);

  const form = document.createElement("form");
  form.setAttribute("action", "");
  form.setAttribute("id", "modifArticleForm");
  articleContainer.appendChild(form);

  const h2 = document.createElement("h2");
  h2.textContent = "Modification Article";
  form.appendChild(h2);

  const formRow1 = document.createElement("div");
  formRow1.classList.add("form-row");
  form.appendChild(formRow1);

  const label1 = document.createElement("label");
  label1.setAttribute("for", "title");
  label1.textContent = "Titre";
  formRow1.appendChild(label1);

  const input1 = document.createElement("input");
  input1.setAttribute("type", "text");
  input1.classList.add("input-text", "input-text-block", "w-100");
  input1.setAttribute("id", "title");
  input1.style.marginBottom = "2em";
  input1.setAttribute("name", "title");
  formRow1.appendChild(input1);

  const formRow2 = document.createElement("div");
  formRow2.classList.add("form-row");
  form.appendChild(formRow2);

  const label2 = document.createElement("label");
  label2.setAttribute("for", "text");
  label2.textContent = "Texte de L'article";
  formRow2.appendChild(label2);

  const input2 = document.createElement("textarea");
  input2.setAttribute("type", "text");
  input2.classList.add("input-text", "input-text-block", "w-100");
  input2.setAttribute("id", "text");
  input2.setAttribute("name", "text");
  input2.style.minHeight = "15em";
  formRow2.appendChild(input2);

  const formRow3 = document.createElement("div");
  formRow3.classList.add("form-row", "mx-auto");
  form.appendChild(formRow3);

  const button = document.createElement("button");
  button.setAttribute("type", "submit");
  button.classList.add("btn-submit");
  button.setAttribute("id", "btnSubmit");
  button.textContent = "Submit";
  formRow3.appendChild(button);

  let main = document.querySelector(".main");
  main.appendChild(mainNewArticle);
  const registerForm = document.querySelector("#modifArticleForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      modifArticle(e, this, idArticle);
    });
  }
}

function modifCommentForm(idComment) {
  clearMain();
  const mainNewComment = document.createElement("div");
  mainNewComment.classList.add("main_newComment");

  const newCommentContainer = document.createElement("div");
  newCommentContainer.classList.add("newComment_container");
  newCommentContainer.style.margin = "2em 10em 2em 10em";
  mainNewComment.appendChild(newCommentContainer);

  const commentContainer = document.createElement("div");
  commentContainer.classList.add("comment_container", "form_container");
  newCommentContainer.appendChild(commentContainer);

  const form = document.createElement("form");
  form.setAttribute("action", "");
  form.setAttribute("id", "modifCommentForm");
  commentContainer.appendChild(form);

  const h2 = document.createElement("h2");
  h2.textContent = "Modifier commentaire";
  form.appendChild(h2);

  const formRow1 = document.createElement("div");
  formRow1.classList.add("form-row");
  form.appendChild(formRow1);

  const formRow2 = document.createElement("div");
  formRow2.classList.add("form-row");
  form.appendChild(formRow2);

  const label2 = document.createElement("label");
  label2.setAttribute("for", "texte");
  label2.textContent = "Texte du commentaire";
  formRow2.appendChild(label2);

  const input2 = document.createElement("textarea");
  input2.setAttribute("type", "text");
  input2.classList.add("input-text", "input-text-block", "w-100");
  input2.setAttribute("id", "texte");
  input2.setAttribute("name", "texte");
  input2.style.minHeight = "15em";
  formRow2.appendChild(input2);

  const formRow3 = document.createElement("div");
  formRow3.classList.add("form-row", "mx-auto");
  form.appendChild(formRow3);

  const button = document.createElement("button");
  button.setAttribute("type", "submit");
  button.classList.add("btn-submit");
  button.setAttribute("id", "btnSubmit");
  button.textContent = "Submit";
  formRow3.appendChild(button);

  let main = document.querySelector(".main");
  main.appendChild(mainNewComment);
  const registerForm = document.querySelector("#modifCommentForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      modifComment(e, this, idComment);
    });
  }
}
