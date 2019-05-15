/******************************************
Treehouse Techdegree: Tyler Konesky
FSJS project 2 - List Filter and Pagination
******************************************/
 
// created starting variables. 
// student list grabs everything from the UL
// in order to access the information needed, 
// student is created to pull the children from the UL.

const itemsPerPage = 10;
const studentList = document.querySelector('ul');
const student = studentList.children;
let searchCounter = 0;
// const newStudent = student.sort((a,b)=>(student[a].innerText > student[b].innerText) ? 1 : -1)
// console.log(newStudent)

//pages is used to create the number of pages needed
// based on the number of "students" pulled from above. 

var pages = Math.ceil(student.length / itemsPerPage)
var searchPages = Math.ceil(searchCounter / itemsPerPage)

//created what will be visible when the page initially loads
// page gets passed in as 1 when the function is invoked. 

const searchDiv = document.querySelector('.page-header');
const addDiv = document.createElement('div');
const input = document.createElement('input');
const button = document.createElement('button');
const cancel = document.createElement('button');
const noResults = document.querySelector('.page-header')

// created buttons and input boxes for the student search.

addDiv.className = 'student-search';
input.placeholder = "search for student...";
button.textContent = 'Search';
cancel.textContent = 'Cancel';

//finished setting up the new buttons and input.
addDiv.appendChild(input);
addDiv.appendChild(button);
addDiv.appendChild(cancel)
searchDiv.appendChild(addDiv);


// created an easy way to "cancel" the search, 
// but it really just refreshes the page to its 
// original state. 
cancel.addEventListener('click', ()=>{
   location.reload();
})

//created the display for the search results
// that are entered through the input box. 
button.addEventListener('click', ()=>{
   var searchQuery = input.value.toLowerCase();
   for(let i = 0; i < student.length; i++){      
      if(student[i].innerHTML.indexOf(searchQuery) != -1){
         student[i].style.display = '';
      }else {
         student[i].style.display = 'none';
         searchCounter += 1;
      }
   }

// added functionality for when the search yields no results
// by checking the counter which is set in the above function.
   if(searchCounter == student.length){
      noResults.innerHTML = '<h2>No Results Found</h2>'
      noResults.appendChild(cancel); 
      for(let i = 1; i <= pages; i++){
         var newElement = document.getElementById(i);
         newElement.style.display = "none"
      }

// attempted to create a setup to adjust which pages are displayed when 
// searches are done. 
   }else if(searchCounter != 0){
      for (let i = 1; i <= pages; i++){
         if(i <= searchPages){
            var newElement = document.getElementById(i);
            newElement.style.display = ""
         }else {
            var newElement = document.getElementById(i);
            newElement.style.display = "none"
         }
         }
      }
   }
);

function showPage (page){
   let start = (page * itemsPerPage) - itemsPerPage;
   let end = page * itemsPerPage;

//created a loop based on the variables above that will
// ultimately decide whether or not a students information 
// is displayed. "page" will eventually change based on 
// clicking a botton that is created below, with an 
// event listener that will pull the button/page id.

   for(let i = 0; i < student.length; i++){
      if(i >= start && i < end){
         student[i].style.display = '';
      }else student[i].style.display = 'none';

   }

// The below loop is created primarily for styling purposes. 
// this will loop through all of the page buttons and set 
// the button to active if it is the one that is selected. 
// all other buttons will then be set to no longer active. 

 
   for(let i = 1; i <= pages; i++){
      var newElement = document.getElementById(i);
      newElement.classList.remove('active');
      if(page == i){
         newElement.classList.add('active')
      }
   }
}

function appendPageLinks(){
// selects the primary Div in the HTML which is the .page
// and all it's elements. 
   const page = document.body.querySelector('.page');
   const pagination = document.createElement('div');
   const ul = document.createElement('ul');

//add class name "pagination" (named based on the css files)
   pagination.className = 'pagination';

//add the new div inside of the parent div (.page class)
   page.appendChild(pagination);

//add the UL to the div
   pagination.append(ul)

//created the below loop to create and set list items
// based on the number of pages needed from the pages variable
// above.

   for (let i = 1; i <= pages; i++){
      let link = document.createElement('a');
      const li = document.createElement('li');

//creates a default classname of "active" which will be changed
// based on the showPage function. 
      link.className = 'active'

//creates the landing page for the link, # remains home. 
      link.href = '#';

//sets each button to display a page number based on the loop. 
// DO NOT ACCIDENTALLY TYPE textContext!!!!!!!
      link.textContent = i;

//adds the a tag/ link in to the list item tag. 
      li.appendChild(link);

//creates a unique id for each button, that will be used to identify
// the button that was pressed. 
      link.setAttribute('id', i)

//adds the new completed buttons in to the ul tag. 
      ul.appendChild(li);

//creates the event listener that looks for the button that was pressed.
// that button will determine both which students show AND which button
// is displayed as active.
      link.addEventListener('click', ()=>{
         showPage(i)
      })
   }
};

appendPageLinks();
showPage(1);
