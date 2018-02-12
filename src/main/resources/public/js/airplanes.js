var selectedId;
var edit = false;

$(document).ready(function() {
    getAirports(function(result) {
        result.forEach(function(airport){
            $('#airport').append('<option value=' + airport.id + '>' + airport.location + '</option>');
        });
    });

    $('#airplaneTable').DataTable({
        bLengthChange: false,
        rowId: 'id',
        columns: [
            { "data": "name" },
            { "data": "gas" },
            { "data": "airport.location"}
        ]
    });

    updateTable();

    $('#create').on('click', function(event) {
        $('#airplaneModal .modal-title').html('Creating an airplane');
        $('#airplaneModal').modal('show');
    });
    $('#edit').on('click', function(event) {
        edit = true;
        var airplane = $('#airplaneTable').DataTable().row('#'+selectedId).data();
        console.log(airplane)
        setFormData(airplane);
        $('#airplaneModal .modal-title').html('Editing ' + airplane.name);
        $('#airplaneModal').modal('show');
    });
    $('#remove').on('click', function(event) {
        var airplane = $('#airplaneTable').DataTable().row('#'+selectedId).data();
        bootboxConfirm("Are you sure you want to delete this airplane?", function(result){
            removeAirplane(airplane, function() {
                toastr.success('Removed "' + airplane.name + '"!');
                updateTable();
            }, handleError);
        });
    });
    $('#airplaneForm').submit(function(event) {
        event.preventDefault();
        $('#airplaneModal').modal('hide');
        if (edit) {
            handleEditFormSubmit();
        } else {
            handleCreateFormSubmit();
        }
    });

    $('#airplaneTable').on('click', 'tr', function() {
        $('#airplaneTable').find('tr.selected').removeClass('selected');
        var id = $('#airplaneTable').DataTable().row(this).id();
        console.log(id);
        if (id !== selectedId) {
            $(this).addClass('selected');
            selectedId = $('#airplaneTable').DataTable().row(this).id();
        } else {
            selectedId = undefined;
        }

        $('button.controls').prop('disabled', selectedId === undefined);
    });
} );

function handleCreateFormSubmit() {
    var data = getFormData();
    createAirplane(data, function(result) {
        toastr.success('Added "' + data.name + '"!');
        $('#airplaneForm').get(0).reset();
        updateTable();
    }, handleError);
}
function handleEditFormSubmit() {
    var airplane = $('#airplaneTable').DataTable().row('#'+selectedId).data();
    var data = getFormData();
    _.extend(airplane, data);
    editAirplane(airplane, function(result) {
        toastr.success('Edited "' + data.name + '"!');
        $('#airplaneForm').get(0).reset();
        updateTable();
        edit = false;
    }, handleError);
}

function handleFlyFormSubmit(){
    
}

function handleError(error) {
    toastr.error(JSON.parse(error.responseText).message);
    console.log(error);
};

function createAirplane(airplane, successCallback, errorCallback){
    console.log(airplane);
    var validJsonAirplane = JSON.stringify(airplane);
    console.log(validJsonAirplane);
    $.ajax({
        url:"/api/airplane/create",
        type:"post",
        contentType: 'application/json',
        data: validJsonAirplane,
        success: successCallback,
        error: errorCallback
    });
}

function editAirplane(airplane, successCallback, errorCallback){
    console.log(airplane);
    var validJsonAirplane = JSON.stringify(airplane);
    console.log(validJsonAirplane);
    $.ajax({
        url:"/api/airplane/edit",
        type:"post",
        contentType: 'application/json',
        data: validJsonAirplane,
        success: successCallback,
        error: errorCallback
    });
}

function removeAirplane(airplane, successCallback, errorCallback){
    console.log(airplane);
    var validJsonAirplane = JSON.stringify(airplane);
    console.log(validJsonAirplane);
    $.ajax({
        url:"/api/airplane/delete/" + selectedId,
        type:"delete",
        contentType: 'application/json',
        data: validJsonAirplane,
        success: successCallback,
        error: errorCallback
    });
}

function getAirports(successCallback){
    $.ajax({
        url:"/api/airport/",
        type:"GET",
        success: successCallback
    });
}

function getFormData() {
    return {
        name : $("#name").val(),
        gas : $("#gas").val(),
        airport : {
            id : $("#airport").val()
        }
    };
}

function setFormData(airplane) {
    $('#name').val(airplane.name);
    $('#gas').val(airplane.gas);
    $('#airport option:eq(' + airplane.airport + ')').prop('selected', true);
}

function updateTable() {
    console.log("Updating table..");
    $('button.controls').prop('disabled', selectedId === undefined);
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