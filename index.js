// index.js
//test API by GET ID1
$(document).ready(function () {
    var displayAll = function () {
        $.ajax({
            type: 'GET',
            url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1269',
            dataType: 'json',
            success: function (response, textStatus) {
                $('#todo-list').empty();
                $('#Active').empty();
                $('Complete').empty();
                $('Date').empty();
                response.tasks.forEach(function (task) {
                    $('#todo-list').append('<div class="row"><p class="col-xs-8">' + task.content + '</p><button class="delete" data-id="' + task.id + '">Delete</button>'+
                    '<input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>');
                    $('#Date').append('<div class="row"><p class="col-xs-8">' + task.created_at.slice(0,10) + '</p>')
                    console.log(response);
                    if (task.completed){
                            $('Completed').empty();
                            $('#Completed').append('<div class="row"><p class="col-xs-8">' + task.content + '</p>');
                    }
                    else{
                            $('Active').empty();
                            $('#Active').append('<div class="row"><p class="col-xs-8">' + task.content + '</p>');
                    }
                });
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

    //marking task
    var markTaskComplete = function (id) {
        $.ajax({
            type:'PUT',
            url: 'https://fewd-todolist-api.onrender.com/tasks/'+ id +'/mark_complete?api_key=1269',
            dataType: 'json',
            success: function (response, textStatus) {
                displayAll();
            },
            error: function (request,textStatus, errorMessage) {
                console.log(errorMessage);
            }
        });
    }
    var markTaskActive = function (id) {
        $.ajax({
            type:'PUT',
            url: 'https://fewd-todolist-api.onrender.com/tasks/'+ id +'/mark_active?api_key=1269',
            dataType:'json',
            success: function (response,textStatus) {
                displayAll();
                console.log(response);
            },
            error: function (request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        })
    }
   $(document).on('change', '.mark-complete', function () {
        if (this.checked) {
            markTaskComplete($(this).data('id'));
        }else{
            markTaskActive($(this).data('id'));
        }
   });


});



