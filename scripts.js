const filterBtns = document.querySelectorAll(".filter-btn");

const addPostBtn = document.querySelector(".new-post-btn");
const addPostDiv = document.querySelector(".add-post-div");
const submitPostBtn = document.querySelector(".submit-post");

const titleInput = document.querySelector("#title-input");
const authorInput = document.querySelector("#author-input");
const descInput = document.querySelector("#description-input");
const detailsInput = document.querySelector("#details-input");
const imageInput = document.querySelector("#image-input");
const makePostDecline = document.querySelector(".add-post-div .bi");

const imgInputLabel = document.querySelector("#img-input-label");

const postsDiv = document.querySelector(".posts");

const postDiv = document.querySelector(".post-div");
const closePostDiv = document.querySelector(".post-div .bi");
const postImage = document.querySelector("#post-image");
const postTitle = document.querySelector("#post-title");
const postAuthor = document.querySelector(".post-author");
const postDate = document.querySelector(".post-date");
const postText = document.querySelector(".post-text");


var currentFilter;

var posts = [];

// add event listeners for filter btns (including post ones)

filterBtns.forEach((button, index) => {

    button.addEventListener('click', function () {

        let reclick = button.classList.contains("active-filter");

        filterBtns.forEach(btn => btn.classList.remove("active-filter"));
        if (!reclick) {

            button.classList.add("active-filter");
            currentFilter = (button.id).replace("-filter", "").replace("-post", "");

        } else {

            button.classList.remove("active-filter");
            currentFilter = "";

        }

        showPosts();

    });

});

// add event listener to the new post btn

addPostBtn.addEventListener('click', function () {

    currentFilter = "";

    addPostDiv.style.display = "flex";

});

// add event listener to submit post btn

submitPostBtn.addEventListener('click', function () {

    const date = new Date();

    const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

    const day = date.getDate();
    var dayEnding

    if (day >= 11 && day <= 13) {

        dayEnding = "th";

    } else {

      switch (day % 10) {

        case 1: dayEnding = 'st';
        case 2: dayEnding = 'nd';
        case 3: dayEnding = 'rd';
        default: dayEnding = 'th';

      }

    }

    const time = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    const formattedDate = `${dayName}, ${monthName} ${day}${dayEnding} at ${time}`;

    imageFile = imageInput.files[0];

    var post = {

        title: titleInput.value,
        author: authorInput.value,
        description: descInput.value,
        details: detailsInput.value,
        date: formattedDate,
        category: currentFilter,
        image: URL.createObjectURL(imageFile)

    }

    posts.push(post);

    let fieldsDone = true;

    Object.keys(post).forEach(key => {

        if (!post[key]) {

            fieldsDone = false;
            titleInput.value = key;

        }

    });

    if (!fieldsDone) {

        alert("Please fill out all fields");

    } else {

        document.querySelectorAll(".active-filter").forEach(button => {

            button.classList.remove("active-filter");

        });

        titleInput.value = "";
        authorInput.value = "";
        descInput.value = "";
        detailsInput.value = "";
        imageInput.value = null;
        imgInputLabel.style.backgroundImage = "none";

        addPostDiv.style.display = "none";
        currentFilter = "";

        showPosts();

    }

});

imageInput.addEventListener('input', function () {

    if (imageInput.value) {

        imageFile = imageInput.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(imageFile);

        reader.onload = () => {

            imgInputLabel.style.backgroundImage = `url(${reader.result})`;

        };

        imageInput.files[0] = imageFile


    }

});

function createPost(index) {

    const mainDiv = document.createElement("div");
    mainDiv.classList.add("post-preview");

    const image = document.createElement("img");
    image.src = posts[index].image;

    const secDiv = document.createElement("div");
    secDiv.classList.add("post-title-preview");

    const titleh3 = document.createElement("h3");
    titleh3.textContent = posts[index].title;

    const posttext = document.createElement("p");
    posttext.textContent = posts[index].description;

    const authortext = document.createElement("p");
    authortext.textContent = posts[index].author;
    authortext.classList.add("post-author-preview");

    mainDiv.insertAdjacentElement("beforeend", image);
    mainDiv.insertAdjacentElement("beforeend", secDiv);
    secDiv.insertAdjacentElement("beforeend", titleh3);
    secDiv.insertAdjacentElement("beforeend", posttext);
    secDiv.insertAdjacentElement("beforeend", authortext);

    return mainDiv;

}

function showPosts() {

    postsDiv.replaceChildren();

    posts.forEach((post, index) => {

        if (post.category === currentFilter || currentFilter === "") {

            const postt = createPost(index)

            if (postt === "clubs") {

                postt.style.backgroundColor = "#00DBDE";
                postt.style.boxShadow = "rgba(0, 219, 222, 0.2) 0px 7px 29px 0px";

            } else if (postt === "internships") {

                postt.style.backgroundColor = "#7e6eef";
                postt.style.boxShadow = "rgba(126, 110, 239, 0.2) 0px 7px 29px 0px";

            } else if (postt === "projects") {

                postt.style.backgroundColor = "#bd37f7";
                postt.style.boxShadow = "rgba(189, 55, 247, 0.2) 0px 7px 29px 0px";

            } else {

                postt.style.backgroundColor = "#Fc00ff";
                postt.style.boxShadow = "rgba(252, 0, 255, 0.2) 0px 7px 29px 0px";

            }

            postsDiv.insertAdjacentElement("afterbegin", postt);

            postt.addEventListener('click', function () {

                showPost(index);

            });

        }

    });

}

makePostDecline.addEventListener('click', function () {

    document.querySelectorAll(".active-filter").forEach(button => {

        button.classList.remove("active-filter");

    });

    titleInput.value = "";
    authorInput.value = "";
    descInput.value = "";
    detailsInput.value = "";
    imageInput.value = null;
    imgInputLabel.style.backgroundImage = "none";

    addPostDiv.style.display = "none";
    currentFilter = "";

    showPosts();

});

closePostDiv.addEventListener('click', function () {

    postDiv.style.display = "none";

});

function showPost(index) {

    postDiv.style.display = "flex";

    postImage.src = posts[index].image;
    postTitle.textContent = posts[index].title;
    postAuthor.textContent = posts[index].author;
    postDate.textContent = posts[index].date;
    postText.textContent = posts[index].details;

}
