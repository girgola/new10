'use strict'

let main_Wraper = document.getElementById('main_Wraper')
let overlay = document.getElementById('overlay')
let popup_content = document.getElementById('content')
let closeIcon = document.getElementById('closeIcon')
let add_button = document.getElementById('add-post')
let overlay_add = document.getElementById('overlay-add')
let form_add = document.getElementById('form-add')
let input_title = document.getElementById('title')

function ajax(url, callback) {
    let request = new XMLHttpRequest()
    request.open('GET', url)
    request.addEventListener('load', function () {
        // console.log(this.responseText);
        let mosuli_data = JSON.parse(this.responseText)
        // console.log(mosuli_data);

        callback(mosuli_data);

    })
    request.send()
}
function create_post(item) {
    let div_wrapper = document.createElement('div')
    div_wrapper.classList.add('posts')
    div_wrapper.setAttribute('data_id', item.id)

    div_wrapper.addEventListener('click', function (event) {
        let id = event.currentTarget.getAttribute('data_id')
        overlay.classList.add('active')
        let server_url = `https://jsonplaceholder.typicode.com/posts/${id}`
        ajax(server_url, function (mosuli_data) {
            console.log(mosuli_data);
            overlay_description(mosuli_data)
        })
        console.log(id);

    })

    let post_id = document.createElement('h4')
    post_id.innerText = item.id

    let post_title = document.createElement('h2')
    post_title.innerText = item.title

    let deleteButton = document.createElement('button')
    deleteButton.innerText = 'delete'
    deleteButton.setAttribute('data_id', item.id)

    deleteButton.addEventListener('click', function (event) {
        event.stopPropagation()
        let delete_id = event.target.getAttribute('data_id')
        let delete_url = `https://jsonplaceholder.typicode.com/posts/${delete_id}`
        fetch(delete_url, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then(() => div_wrapper.remove());
    })

    div_wrapper.appendChild(post_id)
    div_wrapper.appendChild(post_title)
    div_wrapper.appendChild(deleteButton)
    main_Wraper.appendChild(div_wrapper)


    console.log(div_wrapper);

    function overlay_description(item) {
        let desctription = document.createElement('p')
        desctription.innerText = item.body
        popup_content.appendChild(desctription)
    }
}
closeIcon.addEventListener('click', function () {
    overlay.classList.remove('active')
    popup_content.innerHTML = ' '
})


ajax('https://jsonplaceholder.typicode.com/posts', function (mosuli_data) {
    mosuli_data.forEach((item) => {
        // console.log(item);
        create_post(item)
    });
});

add_button.addEventListener('click', function(){
    overlay_add.classList.add('active-add')
input_title.value = ' '
})

form_add.addEventListener('submit', function(event){
 event.preventDefault()
//  console.log(event.target[0].value);

 let form_data = {
    title: event.target[0].value
 }
//  console.log(form_data);
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify(form_data),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((new_post) => {
    create_post(new_post)
    overlay_add.classList.remove('active-add')
  });
})