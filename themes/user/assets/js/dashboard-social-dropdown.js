$(document).ready(function () {
    $("#activity-sector-dropleft").on({
        mouseenter: function (e) {
            $("#activity-sector-menu").addClass('show');
        },
        mouseleave: function (e) {
            $("#activity-sector-menu").removeClass('show');
        }
    });
    $("#status-sector-dropleft").on({
        mouseenter: function (e) {
            $("#status-sector-menu").addClass('show');
        },
        mouseleave: function (e) {
            $("#status-sector-menu").removeClass('show');
        }
    });
});

