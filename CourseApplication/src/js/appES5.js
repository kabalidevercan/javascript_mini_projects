//Course Constructor
function Course(title, instructor, image) {
  this.title = title;
  this.instructor = instructor;
  this.image = image;
}

//UI Constructor
function UI() {
  function ercan(e) {
    return 'ercan';
  }
}

UI.prototype.addCourseToList = function (course) {
  const list = document.getElementById('course-list');

  let html = `
          <div class=" bg-gray-200 grid grid-cols-4 px-2 py-2 space-x-2">
            <div class="  text-center"><img class="w-full" src="img/${course.image}"/></div>
            <div class=" text-start">${course.title}</div>
            <div class="  text-start">${course.instructor}</div>
            <div class="  flex items-center justify-center "><button
            class="delete hover:border-gray-300 border-2 border-black bg-red-400 px-6 py-2 text-center"
          >
            Delete
          </button></div>
          </div>

  `;

  list.innerHTML += html;
};
UI.prototype.clearControls = function () {
  document.getElementById('title').value = '';
  document.getElementById('instructor').value = '';
  document.getElementById('image').value = '';
};

UI.prototype.deleteCourse = function (element) {
  if (element.classList.contains('delete')) {
    element.parentElement.parentElement.remove();
  }
};

UI.prototype.showAlert = function (message, className) {
  var alert = `
  <div
  class="alert bg-purple-400 w-full h-12 border-2 border-gray-200 flex items-center justify-center font-bold mt-4"
>
  ${message}
</div>     
  `;
  const row = document.querySelector('.row');
  row.insertAdjacentHTML('afterBegin', alert);
  setTimeout(() => {
    document.querySelector('.alert').remove();
  }, 1250);
};

document.getElementById('yenikurs').addEventListener('submit', function (e) {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const instructor = document.getElementById('instructor').value;
  const image = document.getElementById('image').value;

  //create course object
  const course = new Course(title, instructor, image);

  //CREATE UI
  const ui = new UI();

  if (title === '' || instructor === '' || image === '') {
    ui.showAlert('Please Complete the form', 'warning');
  } else {
    //add course to list
    ui.addCourseToList(course);

    //clear controls
    ui.clearControls();

    ui.showAlert('the course has been added', 'success');
  }
});

document.getElementById('course-list').addEventListener('click', function (e) {
  const ui = new UI();
  ui.deleteCourse(e.target);
  ui.showAlert('the course has been deleted', 'danger');
});
