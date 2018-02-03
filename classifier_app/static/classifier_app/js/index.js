$(document).ready(function () {
    $("#handle-input-button").click(function () {
        var url = '/ajax_classify/' + $("#handle-input").val(); $.get(url, function (data) {
            var coefficients = data['coefficients'];
            for (var i = 0; i < coefficients.length; i++) {
                var elem = makeCoefficientElement(coefficients, i);
                $("#img-row div:nth-child(" + (i+1) + ")").append(elem);
            }
        });

    });

    openTab(null, "handle");
});


function makeCoefficientElement(coefficients, i) {
    var perc = ("" + coefficients[i] * 100) + "%";
    var classes = ["coefficient"];
    if (isMax(coefficients, i)) {
        classes.push("coefficient-green");
    } else if (coefficients[i] > 0.1) {
        classes.push("coefficient-yellow");
    } else {
        classes.push("coefficient-red");
    }
    return "<p class=\"" + classes.join(" ") + "\">" + perc + "</p>";
}


function isMax(coefficients, i) {
    for (var j = 0; j < coefficients.length; j++) {
        if (coefficients[j] > coefficients[i]) {
            return false;
        }
    }
    return true;
}


function openTab(evt, tabName) {
    $(".tabcontent").hide();
    $(".tablinks").removeClass("active");
    $("#tablink-" + tabName).addClass("active");
    $("#tab-" + tabName).show().addClass("active");
}
