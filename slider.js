let data = [
    {
        id: 1,
        ImageUrl: '	https://www.timeforkids.com/wp-content/uploads/2019/09/temperate-forest.jpg?w=1024',
        title: 'title1'
    },
    {
        id: 2,
        ImageUrl: 'https://cdn.britannica.com/98/214598-050-9879F2FA/giant-sequoia-tree-Sequoia-National-Park-California.jpg',
        title: 'title2'
    },
    {
        id: 3,
        ImageUrl: 'https://cdn.britannica.com/50/180050-138-521974A7/tree-limits-height-width-growth-ring-discussion.jpg?w=800&h=450&c=crop',
        title: 'title3'
    },
    {
        id: 4,
        ImageUrl: '	https://daily.jstor.org/wp-content/uploads/2016/10/Moving_Forest_1050_700.jpg',
        title: 'title4'
    },
]

const arrow_left = document.getElementById('arrow-left')
const arrow_right = document.getElementById('arrow-right')
const slider_content = document.getElementById('slider-content')
let slider_index = 0

function create_div() {
    let div_element = document.createElement('div')
    return div_element

}
function create_img(item) {
    let tag_img = document.createElement('img')
    tag_img.src = item.ImageUrl
    return tag_img
}
function create_title(item) {
    let tag_title = document.createElement('h2')
    tag_title.innerText = item.title
    return tag_title

}
 


function slide(){
    slider_content.innerHTML = ' '
    let slide_div = create_div()
    let slide_img = create_img(data[slider_index])
    let slide_title = create_title(data[slider_index])

slide_div.appendChild(slide_img)
slide_div.appendChild(slide_title)
slider_content.appendChild(slide_div)

    console.log(slide_div);
}
slide()

function arrow_left_click() {
    if (slider_index == 0) {
      slider_index = data.length - 1;
      slide();
      return;
    }
    slider_index--;
    slide();
  }
  
  function arrow_right_click() {
    if (slider_index == data.length - 1) {
        slider_index = 0;
      slide();
      return;
    }
    slider_index++;
    slide();
  }
  arrow_left.addEventListener("click", arrow_left_click);
  arrow_right.addEventListener("click", arrow_right_click);
  
  setInterval(() => {
    arrow_right_click();
  }, 2000);
