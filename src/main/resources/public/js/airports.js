var selectedId;
var edit = false;

$(document).ready(function() {
    $('#airportTable').DataTable({
        bLengthChange: false,
        rowId: 'id',
        columns: [
            { "data": "id" },
            { "data": "location" }
        ]
    });

    updateTable();

    $('#create').on('click', function(event) {
        console.log("create airport")
        $('#airportModal .modal-title').html('Creating an airport');
        $('#airportModal').modal('show');
    });
    $('#edit').on('click', function(event) {
        edit = true;
        var airport = $('#airportTable').DataTable().row('#'+selectedId).data();
        console.log(airport)
        setFormData(airport);
        $('#airportModal .modal-title').html('Editing ' + airport.name);
        $('#airportModal').modal('show');
    });
    $('#remove').on('click', function(event) {
        var airport = $('#airportTable').DataTable().row('#'+selectedId).data();
        bootboxConfirm("Are you sure you want to delete this airport?", function(result){
            removeAirport(airport, function() {
                toastr.success('Removed airport"' + airport.location + '"!');
                updateTable();
            }, handleError);
        });
    });
    $('#airportForm').submit(function(event) {
        event.preventDefault();
        $('#airportModal').modal('hide');
        if (edit) {
            handleEditFormSubmit();
        } else {
            handleCreateFormSubmit();
        }
    });

    $('#airportTable').on('click', 'tr', function() {
        $('#airportTable').find('tr.selected').removeClass('selected');
        var id = $('#airportTable').DataTable().row(this).id();
        console.log(id);
        if (id !== selectedId) {
            $(this).addClass('selected');
            selectedId = $('#airportTable').DataTable().row(this).id();
        } else {
            selectedId = undefined;
        }

        $('button.controls').prop('disabled', selectedId === undefined);
    });
} );


function handleCreateFormSubmit() {
    var data = getFormData();
    createAirport(data, function(result) {
        toastr.success('Added airport"' + data.location + '"!');
        $('#airportForm').get(0).reset();
        updateTable();
    }, handleError);
}
function handleEditFormSubmit() {
    var airport = $('#airportTable').DataTable().row('#'+selectedId).data();
    var data = getFormData();
    _.extend(airport, data);
    editAirport(airport, function(result) {
        toastr.success('Edited airport"' + data.location + '"!');
        $('#airportForm').get(0).reset();
        updateTable();
        edit = false;
    }, handleError);
}

function handleError(error) {
    toastr.error(JSON.parse(error.responseText).message);
    console.log(error);
};

function createAirport(airport, successCallback, errorCallback){
    console.log(airport);
    var validJsonAirport = JSON.stringify(airport);
    console.log(validJsonAirport);
    $.ajax({
        url:"/api/airport/create",
        type:"post",
        contentType: 'application/json',
        data: validJsonAirport,
        success: successCallback,
        error: errorCallback
    });
}

function editAirport(airport, successCallback, errorCallback){
    console.log(airport);
    var validJsonAirport = JSON.stringify(airport);
    console.log(validJsonAirport);
    $.ajax({
        url:"/api/airport/edit",
        type:"post",
        contentType: 'application/json',
        data: validJsonAirport,
        success: successCallback,
        error: errorCallback
    });
}

function removeAirport(airport, successCallback, errorCallback){
    console.log(airport);
    var validJsonAirport = JSON.stringify(airport);
    console.log(validJsonAirport);
    $.ajax({
        url:"/api/airport/delete/" + selectedId,
        type:"delete",
        contentType: 'application/json',
        data: validJsonAirport,
        success: successCallback,
        error: errorCallback
    });
}

function getFormData() {
    return {
        location : $("#location").val()
    };
}

function setFormData(airport) {
    $('#location').val(airport.location);
}

function updateTable() {
    $('button.controls').prop('disabled', selectedId === undefined);
    console.log("Updating table..");

    $.ajax({
        url:"/api/airport/",
        type:"GET",
        success: function(airport) {
          $('#airportTable').DataTable().clear();
          $('#airportTable').DataTable().rows.add(airport);
          $('#airportTable').DataTable().columns.adjust().draw();
        }
    });
}