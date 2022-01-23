console.log('client side js is loaded');




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent='ddew'
// console.log(search);
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    messageOne.textContent='Loading....'
    messageTwo.textContent=''
    const location = search.value;
    var url = '/weather?address=';
    url = url + location
    fetch(url).then((res) => {
        res.json().then((data) => {
            console.log(data);
            if(data.error){
                messageOne.textContent=''
                messageTwo.textContent=data.error
            }else{
                messageOne.textContent= data.address.location
                messageTwo.textContent='Tempratue: '+data.temp
            }  
        })
    })
})