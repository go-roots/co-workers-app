$(document).ready(function () {
  $('.small-image-container').tooltip({
    title: "<p>Name: ? <br> Capacity: 15 persons <br> Open: <strong>Yes</strong> <br> Working in this room: Jorgo, Paul, Shradda</p>",
    html: true,
    placement: "top"
  });
  $('#help-request').click(function () {
    $('#help-request-modal').modal('show');
  });
});

