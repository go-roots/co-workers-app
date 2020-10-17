$(document).ready(function () {
  // Tooltips will be coded with react-bootstrap overlay component, the following is just for the moqup
  $('.small-image-container').tooltip({
    title: "<p>Name: ? <br> Capacity: 15 persons <br> Open: <strong>Yes</strong> <br> Working in this room: Jorgo, Paul, Shradda</p>",
    html: true,
    placement: "top"
  });
  $('.dashboard-name-link').tooltip({
    title: '<i>"Learning the script for my next action movie"</i>',
    html: true,
    placement: "top"
  });
  $('#help-request').click(function () {
    $('#help-request-modal').modal('show');
  });
  $('.answer-msg').click(function () {
    $('#answer-msg-modal').modal('show');
  });
  $('.delete-msg').click(function () {
    $('#del-msg-modal').modal('show');
  });
});

