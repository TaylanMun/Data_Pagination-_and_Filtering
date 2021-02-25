/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/


// number of students to display on the page
const pageSize = 9;

// initial page number
let page = 1;

// pagination html
const paginationUL = document.querySelector('.link-list');

// using for pagination if search input not empty
let filterStudentArr = [];

/**
 * Create html element
 * 
 * @param {string} elementName 
 * @param {string} property 
 * @param {string} value 
 * @param {string} text 
 */
function createElement(elementName, property = null, value = null, text = null) {
   const element = document.createElement(elementName);
   element[property] = value;
   element.textContent = text;
   return element;
}



/**
 * Show students list on home page.
 * @param {Array} studentList - The studentlist which is shown on home page.
 * @param {number} page - The page number which is shown on home page.
 */
function showPage (studentsList, page) {
   const startIndex = (page * pageSize) - pageSize;
   const endIndex = (page * pageSize);
   const studentListUL = document.querySelector('.student-list');
   studentListUL.innerHTML = '';
   if(studentsList.length){
      for (let i = 0; i < studentsList.length; i++) {
         if(i >= startIndex && i < endIndex){
            const studentData = studentsList[i];
            studentListUL.insertAdjacentHTML('beforeend', createStudent(studentData))
         }  
      }
   } else {
      const noFoundStudentLI = createElement('li');
      const noFoundtStudentP = createElement('p',null,null,'No Students Found...');
      noFoundtStudentP.style.color = 'red';
      noFoundStudentLI.appendChild(noFoundtStudentP);
      studentListUL.insertAdjacentHTML('beforeend', noFoundStudentLI.outerHTML)

   }

}

/**
 * Create search element for show page
 *
 */
function createSearchElement(){
   const header = document.querySelector('.header');

   const label = createElement('label', 'for', 'search');
   label.className = 'student-search';

   const input = createElement('input', 'placeholder', 'Search by name...');
   input.id = 'search';

   const button = createElement('button', 'type', 'button');
   const img = createElement('img', 'src', 'img/icn-search.svg');
   button.appendChild(img);

   label.appendChild(input);
   label.appendChild;
   
   header.insertAdjacentHTML("beforeend", label.outerHTML);
}

/**
 * create student html element for showPage function.
 * @param {Object} student - for take student information.
 */
function createStudent(student){
   return `<li class="student-item cf">
   <div class="student-details">
     <img 
         class="avatar" 
         src="${student['picture']['large']}" 
         alt="${student['name']['first'] + " " + student['name']['last']}"
      >
     <h3>${student['name']['first'] + " " + student['name']['last']}</h3>
     <span class="email">${student['email']}</span>
   </div>
   <div class="joined-details">
     <span class="date">Joined ${student['registered']['date']}</span>
   </div>
 </li>`;
}

/**
 * Show Pagination for showPage function.
 * @param {Array} studentsList - for take students count.
 */
function addPagination(studentsList) {
   const numberOfPage = Math.ceil(studentsList.length / pageSize);
   paginationUL.innerHTML = '';
   for (let i = 1; i <= numberOfPage; i++) {
      const paginationLi = createElement('li');
      const paginationButton = createElement('button', 'type', 'button', i);
      paginationLi.appendChild(paginationButton);
      paginationUL.insertAdjacentHTML('beforeend', paginationLi.outerHTML);
   }
   if(numberOfPage != 0){
      paginationUL.firstElementChild.firstElementChild.className = 'active';
   }
}

// initial page to appear when the page loads
showPage(data, page);
addPagination(data)
createSearchElement()


function filterItems(students, query) {
   if (query) {
       return students.filter(el =>
           el.name.first.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
           el.name.last.toLowerCase().indexOf(query.toLowerCase()) !== -1)
   }
   return null;
}


// take search input for filter
const searchInputElement = document.getElementById('search');

// filtering data 
searchInputElement.addEventListener('input', (e) => {
   const filter = e.target.value.toLowerCase();
   if(filter){
      filterStudentArr = data.filter(student =>
         (student.name.first + ' ' + student.name.last).toLowerCase().indexOf(filter) !== -1);
         showPage(filterStudentArr, 1);
         addPagination(filterStudentArr)
   }
});

// change studentlist data when button clicking and change active class
paginationUL.addEventListener('click', (e) => {
   if(e.target.tagName === 'BUTTON'){
      paginationUL.getElementsByClassName('active')[0].className ='';
      e.target.className = "active";
      page = parseInt(e.target.textContent);
      if(!searchInputElement.value){
         showPage(data, page);
      }else{
         showPage(filterStudentArr, page);
      }
   }
});