console.log("script chargée !");



const input = document.getElementById("myInput");
const adresse = document.getElementById("liste");
let adresseDatas = [];

const fetchDatas = async () =>{
    input.addEventListener("input", async (e) => {
        if (e.target.value.length > 3 ) {
           const baseUrl = "https://api-adresse.data.gouv.fr/search/";
           const queryParams = new URLSearchParams ({
            q: e.target.value,
           });
           const URL = `${baseUrl}?${queryParams}`;
           const response = await fetch(URL);
           const data = await response.json();
           adresseDatas = data.features;
        
           renderAdressList ();
        }
    });
};
 const renderAdressList = () =>{
    adresse.innerHTML = "";
    adresseDatas.forEach(({ properties }, index) => {
        const li = document.createElement("li");
        const p1 = document.createElement("p");
        const p2 = document.createElement("p");

        p1.textContent = properties.label;
        p2.textContent = properties.context;

        li.appendChild(p1);
        li.appendChild(p2);
        li.classList.add("content")
        if (index === 1 ) {
            li.classList.add("item-hight-lighted")
        }
        adresse.appendChild(li)
        li.addEventListener("click", ()=> {
            input.value = li.textContent
            adresse.style.display = "none";

        })
    })
 adresse.style.display = "block";
 }
fetchDatas();