console.log("inside the JS");
// using JSONBIN.io I created an account on JSONBIN.io to upload my json files.
let clickBtn = document.getElementById("clickBtnEl");
let divContainerEl = document.getElementById("div-container");
//this is a publiuc key so anyone can hit this!
let API_URL = "https://api.jsonbin.io/v3/b/656e17ba54105e766fd98aa6";
let degreeIdArr = [];

let showDegrees = (degrees) => {
  degrees.map((degree) => {
    if (!degreeIdArr.includes(degree.degree.id)) {
      createDegreeCard(degree);
      degreeIdArr.push(degree.degree.id);
    }
  });
};

let createDegreeCard = (data) => {
  // create each element
  let cardDiv = document.createElement("div");
  let img = document.createElement("img");
  let schoolP = document.createElement("p");
  let programP = document.createElement("p");
  let typeP = document.createElement("p");
  let yearP = document.createElement("p");
  //make the element have the degree information
  img.src = data.degree.img;
  img.classList.add("img");
  schoolP.innerHTML = `<b>SCHOOL</b> ${data.degree.School}`;
  programP.innerHTML = `<b>PROGRAM/MAJOR</b> ${data.degree.Program}`;
  typeP.innerHTML = `<b>TYPE</b> ${data.degree.Type}`;
  yearP.innerHTML = `<b>YEAR</b> ${data.degree.Year}`;
  //append children to card Div
  cardDiv.appendChild(img);
  cardDiv.appendChild(schoolP);
  cardDiv.appendChild(programP);
  cardDiv.appendChild(typeP);
  cardDiv.appendChild(yearP);
  //append cardDiv to the page
  divContainerEl.appendChild(cardDiv);
};

let fetchMyDegrees = (e) => {
  e.preventDefault();
  fetch(API_URL)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      let jsonData = data.record.total_degrees;
      if (!jsonData || !Array.isArray(jsonData)) {
        throw new Error("Invalid data format");
      }
      showDegrees(jsonData);
    })
    .catch((error) => {
      console.error("Error fetching or processing data:", error);
    });
};

clickBtn.addEventListener("click", fetchMyDegrees);
