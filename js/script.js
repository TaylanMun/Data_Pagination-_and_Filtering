/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/


// number of students to display on the page
const pageSize = 9;

// pagination html
const paginationUL = document.querySelector('.link-list');


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

   for (let i = 0; i < studentsList.length; i++) {
         if(i >= startIndex && i < endIndex){
            const studentData = studentsList[i];
            studentListUL.insertAdjacentHTML('beforeend', createStudent(studentData))
         }  
   }
}

1
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

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

/**
 * Show Pagination for showPage function.
 * @param {Array} studentsList - for take students count.
 */
function addPagination(studentsList) {
   const numberOfPage = Math.round(studentsList.length / pageSize);
   paginationUL.innerHTML = '';

   for (let i = 1; i <= numberOfPage; i++) {
      const paginationElement = ` 
         <li>
            <button type="button">${i}</button>
         </li>`
      paginationUL.insertAdjacentHTML('beforeend', paginationElement);
   }
   paginationUL.firstElementChild.firstElementChild.className = 'active';
}

// change studentlist data when button clicking and change active class
paginationUL.addEventListener('click', (e) => {
   if(e.target.tagName === 'BUTTON'){
      paginationUL.getElementsByClassName('active')[0].className ='';
      e.target.className = "active";
      showPage(data, e.target.textContent);
   }
})

// Call functions


// initial page to appear when the page loads
showPage(data, 1);
addPagination(data)