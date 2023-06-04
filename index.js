let your_api_key = "UjUVGUTH2lQZeVQcyGQcOd236kzvkFpBgRTEwtSp";
var currentDate = new Date().toISOString().split("T")[0];

let upcontainer = document.querySelector("#current-image-container");
function getCurrentImageOfTheDay(date) {
    fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${your_api_key}`)
        .then((res => res.json()))
        .then((d) => {
            console.log(d)

            if (d.code == 400) {
                upcontainer.innerHTML = `<h1>${d.msg}</h1>`
            } else {
                // let h1_content;
                // if (d.date == currentDate) {
                //     h1_content = `NASA Picture of the Day `;
                // } else {
                //     h1_content = `Picture On ${d.date}`;
                // }

                upcontainer.innerHTML = ""
                upcontainer.innerHTML = ` <h1>${d.date == currentDate ? `NASA Picture of the Day ` : `Picture On ${d.date}`}</h1>
            <img class="responsive"src="${d.hdurl}" alt="nasa-image(${d.date})">
            <h3>${d.title}</h3>
            <p>${d.explanation}</p>
        `


            }
        })
        .catch((err) => {
            upcontainer.innerHTML = `${err.message}`

            console.log(err)
        });
}

// console.log("curr date:", currentDate)
getCurrentImageOfTheDay(currentDate);


let searchBtn=document.getElementById("search");

searchBtn.addEventListener("click", (e) => {
    e.preventDefault()
    searchBtn.classList.add("btn-anm");
setTimeout(()=>searchBtn.classList.remove("btn-anm"), 600)

    if (document.getElementById("search-input").value != "") {
        getImageOfTheDay();

    }

})
function getImageOfTheDay() {
    let date = document.getElementById("search-input").value;

    getCurrentImageOfTheDay(date);
    saveSearch(date)

    addSearchToHistory()
    document.getElementById("search-input").value = ""


}

//save datte in local storage
function saveSearch(date) {

    let date_arr = JSON.parse(localStorage.getItem("date_arr")) || [];
    date_arr.push({ date: date });

    localStorage.setItem("date_arr", JSON.stringify(date_arr));

}

//append search history in UI
function addSearchToHistory() {

    let date_arr = JSON.parse(localStorage.getItem("date_arr")) || [];

    let ul = document.querySelector("#search-history");
    ul.innerHTML = ""
    for (let i = 0; i < date_arr.length; i++) {
        ul.innerHTML += ` <li><a >${date_arr[i].date}</a></li>`
    }




    //also attached click eventListener on all li element
    let alla = document.querySelectorAll("li")
    alla.forEach((li) => {
        li.addEventListener("click", () => {
            getCurrentImageOfTheDay(li.textContent.trim())

        })
    })
}

//show previous search history if exist in local storage
window.onload = () => {
    addSearchToHistory()
}
