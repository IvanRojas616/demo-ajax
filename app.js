$(document).ready(function () {
  console.log("jQuery...");
  var edit = false;
  showTasks();
  $("#taskResult").hide();
  $("#search").keyup(function () {
    if ($("#search").val()) {
      let searchText = $("#search").val();
      $.ajax({
        url: "taskSearch.php",
        type: "POST",
        data: {
          search: searchText,
        },
        success: function (response) {
          let tasks = JSON.parse(response);
          let template = "";
          tasks.forEach((element) => {
            template += `<li>
                        ${element.name}
                    </li>`;
          });

          $("#searchList").html(template);
          $("#taskResult").show();
        },
      });
    }
  });
  $("#form").submit(function (evt) {
    const postData = {
      name: $("#name").val(),
      description: $("#description").val(),
      id: $("#taskId").val()
    };

    if (edit) {
      $.post("task-edit.php", postData, (response) => {
        console.log(response);
        showTasks();
        $("#form").trigger("reset");
      });
      edit = false;
    } else {
      $.post("task-add.php", postData, (response) => {
        console.log(response);
        showTasks();
        $("#form").trigger("reset");
      });
    }
    evt.preventDefault();
  });
  function showTasks() {
    $.ajax({
      url: "task-list.php",
      type: "GET",
      success: function (response) {
        let tasks = JSON.parse(response);
        let template = "";
        if (tasks.length == 0) {
          $("#t-tasks").html("");
        } else {
          tasks.forEach((element) => {
            template += `
              <tr>
                <td class="id">${element.id}</td>
                <td>
                  <a href="#" class="item">${element.name}</a>
                </td>
                <td>${element.description}</td>
                <td>
                  <button class="task-delete btn btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            `;
            $("#t-tasks").html(template);
          });
        }
      },
    });
  }
  $(document).on("click", ".task-delete", (e) => {
    if (confirm("Are you sure ?")) {
      let element = e.target.parentElement.parentElement;
      let idtoDelete = parseInt(
        element.getElementsByClassName("id")[0].innerText
      );
      $.post("task-delete.php", { id: idtoDelete }, function (response) {
        console.log(response);
        showTasks();
      });
    }
  });

  $(document).on("click", ".item", (e) => {
    let element = e.target.parentElement.parentElement;
    let idtoModify = parseInt(
      element.getElementsByClassName("id")[0].innerText
    );
    $.post("task-single.php", { id: idtoModify }, function (response) {
      const task = JSON.parse(response);
      $("#name").val(task.name);
      $("#description").val(task.description);
      $("#taskId").val(task.id);
      edit = true;
    });
  });
});
