var airplaneTable
var airplaneId
function getAirplanes() {
    $.get('api/airplanes', function(airplanes){
        displayAirplanes(airplanes);
    });
}

function displayAirplanes(airplanes) {
    $("#tablesAirplanes").dataTable().fnDestroy();
    airplaneTable = $("#tablesAirplanes").DataTable({
            ajax: {
                url: 'api/airplanes',
                dataSrc:''
            },
            columns: [
                {data: 'id'},
                {data: 'airPlaneIdentity'},
                {data: 'fuelLevel'},
                {data: 'airport.id'},
                {data: null, render: function(data, type, row){
                return '<td><button class="delete" airplaneId=" ' + data.id+ ' " >delete</button>'}},
                {data: null, render: function(data, type, row){
                return '<td><button class="edit" airplaneId=" ' + data.id+ ' " >edit</button>'}}
            ]
        });

     $('#tablesAirplanes').off().on( 'click', 'button.delete', function () {
                    $('#exampleModal').modal('show');
                     airplaneId = $(this).attr('airplaneId');
             });
     $('#tablesAirplanes').off().on( 'click', 'button.edit', function () {
            airplaneId = $(this).attr('airplaneId');
            changeAirplane();
     });
     $("#okBtn").click(function() {
                 removeAirplane(airplaneId);
                 $('#exampleModal').modal('hide');
            });
}

function postAirplane(airplane){
    var jsonAirplane = JSON.stringify(airplane);
    $.ajax({
        url: 'api/airplanes',
        type: 'POST',
        contentType: 'application/json',
        data: jsonAirplane,
        success: function() {
            airplaneTable.ajax.reload();
            getAirplanes();
            $('#airplaneNameInput').val(" ")
        },
        error: function() {
            alert('Something went wrong..');
        }
    });
}

function createAirplane() {
    var airplaneName = $('#airplaneNameInput').val();
    var fuelLevelInput = $('#airplaneFuelInput').val();
    var airportIDInput = $('#airportIdInput').val();
    if (!airplaneName) {
        alert('The teacher name should be set..');
        return;
    }

    var airplane;
     if(airportIDInput) {
     airplane = {
            airPlaneIdentity: airplaneName,
            fuelLevel:fuelLevelInput,
            airport: {id:Number(airportIDInput)
            }
        };
        }
        else {

        airplane = {
            airPlaneIdentity: airplaneName,
            fuelLevel:fuelLevelInput
            };
        }

    postAirplane(airplane);
}

function removeAirplane() {
    var airplaneId = $(this).attr('airplaneId');

    $.ajax({
        url: 'api/airplanes/'+ airplaneId,
        type: 'DELETE',
        success: function(){
            alert('airplane ' + airplaneId + ' deleted!');
            getAirplanes();

        },
        error: function(){
            alert('Something went wrong..');
        }
    });
}
$(document).ready(function () {
       $("#getAirplanesButton").click(getAirplanes);
//       $("#getAirportsButton").click(getAirports);
       $("#createAirplaneButton").click(createAirplane);
//       $("#createAirportButton").click(createAirport);
        getAirplanes();

});