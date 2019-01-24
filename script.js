const textbox = document.querySelector('.input');
const select1 = document.querySelector('#select1');
const select2 = document.querySelector('#select2');
const button = document.querySelector('#button');
const output = document.querySelector('.output');
const bswitch = document.querySelector('#switch');
const date = document.querySelector('.inputdate');

function isSame(rate) {
  if(select1.value === select2.value){
    rate=1;
  }
  return rate;
}

function switcheroo() {
  const value= select1.value;
  const optionselect1 = select1.querySelectorAll("option");
  optionselect1.forEach((value)=>{
    value.selected=false;
  });

  select1.querySelector("option[value="+ select2.value +"]").selected=true;

  const optionselect2 = select2.querySelectorAll("option");
  optionselect2.forEach((value)=>{
    value.selected=false;
  });

  select2.querySelector("option[value="+ value +"]").selected=true;

  apiEchange();
}

function apiEchange() {
  const request = new XMLHttpRequest();

  request.addEventListener('readystatechange',function (event) {
    const api = event.target;
    if(api.readyState === 4 && api.status === 200){

      const response = JSON.parse(api.responseText);
      console.log(response.rates[select2.value]);
      const rate = isSame(response.rates[select2.value]);
      output.classList.remove('error');
      showExchange(rate);

    }if(api.readyState === 4 &&  api.status ===400){

      const response = JSON.parse(api.responseText);
      output.textContent = "ERROR !!! "+ api.status + " " +response.error;
      output.classList.add('error');

    }
  });
  if(date.value){

    console.log(date.value);
    request.open('GET',"https://api.exchangeratesapi.io/"+ date.value +"?base="+select1.value +"&symbols="+ select2.value);

  }else{
    request.open('GET',"https://api.exchangeratesapi.io/latest?base="+select1.value +"&symbols="+ select2.value);
  }
  request.send();
}

function showExchange(response) {
  //Math.round(num * 100) / 100
  const value = Math.round((parseFloat(textbox.value) * response)*100)/100;
  output.textContent = value;
}

button.addEventListener('click',apiEchange);
bswitch.addEventListener('click',switcheroo);