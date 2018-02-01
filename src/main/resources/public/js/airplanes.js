$(document).ready(function() {
    $('#airplaneTable').DataTable({
        columns: [
            { "data": "name" },
            { "data": "gas" }
        ]
    });

    updateTable();
} );

function updateTable() {
    console.log("Updating table..");

    $.ajax({
        url:"/api/airplane/",
        type:"GET",
        success: function(airplane) {
          $('#airplaneTable').DataTable().clear();
          $('#airplaneTable').DataTable().rows.add(airplane);
          $('#airplaneTable').DataTable().columns.adjust().draw();
        }
    });
}