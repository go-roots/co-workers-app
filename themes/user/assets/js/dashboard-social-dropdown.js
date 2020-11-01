$(document).ready(function () {
    $("#activity-sector-dropleft").on({
        mouseenter: function (e) {
            $("#activity-sector-menu").addClass('show');
        },
        mouseleave: function (e) {
            $("#activity-sector-menu").removeClass('show');
        }
    });
});

