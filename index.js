// index.js
//test API by GET ID1
$(document).ready(function () {
    //console.log('DOM is ready');
    $.ajax({
        type: 'GET',
        url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1269',
        dataType: 'json',
        success: function (response, textStatus) {
            response.tasks.forEach(function (task) {
                $('#todo-list').append('<p>'+task.content+'</p>');
            })
        },
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
    });
    
    $.ajax({
        type: 'POST',
        url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1269',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
          task: {
            content: 'Do something fun'
          }
        }),
        success: function (response, textStatus) {
          console.log(response);
        },
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
      });
});
