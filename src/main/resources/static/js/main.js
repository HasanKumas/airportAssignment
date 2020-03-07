var airplaneTable
var airplaneId
var airportTable
var airportId
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
                {data: 'airport.name'},
                {data: null, render: function(data, type, row){
                return '<td><button class="delete" airplaneId=" ' + data.id+ ' " >delete</button>'}},
                {data: null, render: function(data, type, row){
                return '<td><button class="edit" airplaneId=" ' + data.id+ ' " >edit</button>'}}
            ],
            dom: 'Bfrtip',
            buttons: [
                        {
                        text: 'Create an airplane',
                        action: function ( e, dt, node, config ) {
                            var content = $('#hiddenAirplaneForm').html();
                            $('#exampleModal .modal-body').html(content);
                            $('#exampleModal .modal-title').text("Airplane Form");
                            $('#exampleModal').modal('show');
                            $('#okAirplaneModalBtn').hide();
                            $('#okAirportModalBtn').hide();
                            $('#createAirportModalBtn').hide();
                            $('#createAirplaneModalBtn').show();

                          }
                        }
                    ]
      });

     $('#tablesAirplanes').off().on( 'click', 'button.delete', function () {
                    $('#exampleModal').modal('show');
                    $('#exampleModal .modal-body').text("Are you sure to delete this airplane?");
                    $('#exampleModal .modal-title').text("Delete Confirmation!");
                    $('#okAirplaneModalBtn').show();
                    $('#okAirportModalBtn').hide();
                    $('#createAirplaneModalBtn').hide();
                    $('#createAirportModalBtn').hide();
                    airplaneId = $(this).attr('airplaneId');
             });
//     $('#tablesAirplanes').off().on( 'click', 'button.edit', function () {
//            airplaneId = $(this).attr('airplaneId');
//            changeAirplane();
//     });
     $("#okAirplaneModalBtn").click(function() {
                 removeAirplane(airplaneId);
                 $('#exampleModal').modal('hide');
     });

     $("#createAirplaneModalBtn").click(function() {
                 createAirplane();
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
            alert("Airplane has created..");
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
    var airportIDInput = $('#airportSelect').val();
    if (!airplaneName) {
        alert('The airplane name should be set..');
        return;
    }

    var airplane = {
            airPlaneIdentity: airplaneName,
            fuelLevel:fuelLevelInput,
            airport: {id:Number(airportIDInput)
                    }
        };

    postAirplane(airplane);
}

function removeAirplane(airplaneId) {
    $.ajax({
        url: 'api/airplanes/'+ airplaneId,
        type: 'DELETE',
        success: function(){
            alert('airplane ' + airplaneId + ' deleted!');
            airplaneTable.ajax.reload();
        },
        error: function(){
            alert('Something went wrong with removing the airplane..');
        }
    });
}
function getAirports() {
    $.get('api/airports', function(airports){
        displayAirports(airports);
    });
}

function displayAirports(airports) {
    $("#tablesAirports").dataTable().fnDestroy();
    airportTable = $("#tablesAirports").DataTable({
            ajax: {
                url: 'api/airports',
                dataSrc:''
            },
            columns: [
                {data: 'id'},
                {data: 'name'},
                {data: null, render: function(data, type, row){
                return '<td><button class="delete" airportId=" ' + data.id+ ' " >delete</button>'}},
                {data: null, render: function(data, type, row){
                return '<td><button class="edit" airportId=" ' + data.id+ ' " >edit</button>'}}
            ],
            dom: 'Bfrtip',
            buttons: [
                        {
                        text: 'Create an airport',
                        action: function ( e, dt, node, config ) {
                            var content = $('#hiddenAirportForm').html();
                            $('#exampleModal .modal-body').html(content);
                            $('#exampleModal .modal-title').text("Airport Form");
                            $('#exampleModal').modal('show');
                            $('#okAirplaneModalBtn').hide();
                            $('#okAirportModalBtn').hide();
                            $('#createAirplaneModalBtn').hide();
                            $('#createAirportModalBtn').show();

                          }
                        }
                    ]
        });

     $('#tablesAirports').off().on( 'click', 'button.delete', function () {
                    $('#exampleModal').modal('show');
                    $('#exampleModal .modal-body').text("Are you sure to delete this airport?");
                    $('#exampleModal .modal-title').text("Delete Confirmation!");
                    $('#okAirplaneModalBtn').show();
                    $('#okAirplaneModalBtn').hide();
                    $('#okAirportModalBtn').show();
                    $('#createAirplaneModalBtn').hide();
                    $('#createAirportModalBtn').hide();
                    airportId = $(this).attr('airportId');
             });
//     $('#tablesAirports').off().on( 'click', 'button.edit', function () {
//            airportId = Number($(this).attr('airportId'));
//            changeAirport();
//     });
    $("#okAirportModalBtn").click(function() {
                removeAirport(airportId);
                $('#exampleModal').modal('hide');
           });
    $("#createAirportModalBtn").click(function() {
                     createAirport();
                     $('#exampleModal').modal('hide');
         });
}

function createAirport() {
    var airportName = $('#airportNameInput').val();
    if (!airportName) {
        alert('The airport name should be set..');
        return;
    }

    var airport = {
            name: airportName
    };
    postAirport(airport);
}

function postAirport(airport){
    var jsonAirport = JSON.stringify(airport);
    $.ajax({
        url: 'api/airports',
        type: 'POST',
        contentType: 'application/json',
        data: jsonAirport,
        success: function() {
            alert('We created a new airport..');
            $('#airportNameInput').val(" ")
            airportTable.ajax.reload();
            selectAirport();
        },
        error: function() {
            alert('Something went wrong..');
        }
    });
}

function removeAirport(airportId) {
    $.ajax({
        url: 'api/airports/'+ airportId,
        type: 'DELETE',
        success: function(){
            alert('airport ' + airportId + ' deleted!');
            airportTable.ajax.reload();
            selectAirport();

        },
        error: function(){
            alert('Something went wrong..First delete linked airplanes if there is any..');
        }
    });
}

function selectAirport() {
    $('#airportSelect').empty();
    $('#airportToSelect').empty();
    $.get('api/airports', function(airports){
           $.each(airports, function(index, airport) {
                $('#airportSelect').append('<option value = " ' + airport.id + ' " >' +
                                                    airport.name + '</option>');
                $('#airportToSelect').append('<option value = " ' + airport.id + ' " >' +
                                                    airport.name + '</option>');
           });
    });

}
function selectAirplane() {
    $('#airplaneSelect').empty();
    $.get('api/airplanes', function(airplanes){
           $.each(airplanes, function(index, airplane) {
                $('#airplaneSelect').append('<option value = " ' + airplane.id + ' " >' +
                                                    airplane.airPlaneIdentity + '</option>');
           });
    });

}
function fly(){
    var id = $('#airplaneSelect').val();
    var airportId = $('#airportToSelect').val();
    $.ajax ({
         type: "PUT",
         url: "api/airplanes/afterFly/"+id+ "?airportId=" + airportId,
         success: function(message){
                   alert(message);
                   airplaneTable.ajax.reload();
                   selectAirport();

         },
         error: function(){
                   alert(message);
         }


   });
}

function refuel(){
    var id = $('#airplaneSelect').val();
    $.ajax ({
         type: "PUT",
         url: "api/airplanes/refuel/"+id,
         success: function(message){
                            alert(message);
                            airplaneTable.ajax.reload();

         },
         error: function(){
                    alert(message);
         }
    });
}

$(document).ready(function () {
       $("#createAirplaneButton").click(createAirplane);
       $("#createAirportButton").click(createAirport);
       $("#flyBtn").click(fly);
       $("#refuelBtn").click(refuel);
        getAirplanes();
        getAirports();
        selectAirport();
        selectAirplane();

});
