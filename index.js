// index.js
//test API by GET ID1
$(document).ready(function () {
    var displayAll = function () {
        $.ajax({
            type: 'GET',
            url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1269',
            dataType: 'json',
            success: function (response, textStatus) {
                response.tasks.forEach(function (task) {
                    $('#todo-list').empty();
                    response.tasks.forEach(function (task) {
                        $('#todo-list').append('<div class="row">'+
                        '<p class="col-xs-8">' + task.content + '</p>'+//'<p class="col-xs-8">' + task.id + '</p>' +
                        '<button class="delete" data-id="' + task.id + '">Delete</button>'); // **data-id**
                      });
                })
            },
            error: function (request, textStatus, errorMessage) {
              console.log(errorMessage);
            }
        });
    }
    
    var createTask = function() {
        var taskContent = $('#new-task-detail').val();
        $.ajax({
            type: 'POST',
            url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1269',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
              task: {
                content: taskContent
              }
            }),
            success: function (response, textStatus) {
              console.log(response);
            },
            error: function (request, textStatus, errorMessage) {
              console.log(errorMessage);
            }
        });
    }
    $('#add-task').on('submit', function (e) {
        //e.preventDefault(); //prevent reloading
        createTask();
    });
    var deleteTask = function (id) {
        $.ajax({
            type: 'DELETE',
            url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '?api_key=1269',
            success: function (response, textStatus) {
                displayAll();
            },
            error: function (request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        });
    }
    $(document).on('click', '.delete', function () {
        deleteTask($(this).data('id'));
    });
    displayAll();
});



