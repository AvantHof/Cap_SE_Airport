$(document).ready(function() {
    $('#airportTable').DataTable({
        columns: [
            { "data": "id" },
            { "data": "location" }
        ]
    });

    updateTable();
} );

function updateTable() {
    console.log("Updating table..");

    $.ajax({
        url:"/api/airport/",
        type:"GET",
        success: function(airplane) {
          $('#airportTable').DataTable().clear();
          $('#airportTable').DataTable().rows.add(airplane);
          $('#airportTable').DataTable().columns.adjust().draw();
        }
    });
}