const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg= document.querySelector(".msg");

for (let select of dropdown)
{
    for(currCod in countryList)
    {
        let newOption = document.createElement("option");
        newOption.innerText = currCod;
        newOption.value = currCod;
        if(select.name=== "from" && currCod==="USD")
        {
            newOption.selected = "selected";
        }else if(select.name === "to" && currCod === "INR")
        {
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag = (element) =>{
    let currCod = element.value;
    let countryCode = countryList[currCod];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", async(evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    console.log(amtval);
     if(amtval === ""|| amtval<1)
     {
         amount.value="1";
     }
      console.log(fromCurr,toCurr);
     const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
     let response = await fetch(URL);
     let data = await response.json();
     let rate = data[toCurr.value.toLowerCase()];

     let finalAmount = amtval * rate;
     msg.innerText = `${amtval} ${fromCurr.value}=${finalAmount} ${toCurr.value}`;

});




