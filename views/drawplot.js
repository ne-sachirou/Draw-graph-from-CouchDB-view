//require('http://cyberpython.github.com/AwesomeChartJS/')

(function (scope) {

var csv,
    type = 'ratio',
    canvas = document.getElementById('plot');

function sum(array) {
    return array.reduce(function (r, l) {
        return r + l;
    });
}


function pullRatio(csv) {
    var rows = csv.trim().split('\n'),
        data;

    data = rows[rows.length - 1].split(',').map(function (elm) {
        return elm - 0;
    });
    data.shift();
    return data;
}


function pullTransition(csv) {
    var data = [[], [], [], []];

    csv.trim().split('\n').forEach(function (row, idx) {
        var cols = row.split(','),
            i;

        data[0][idx] = cols[0];
        for (i = 1; i <= 3; i += 1) {
            data[i][idx] = cols[i] - 0;
        }
    });
    data.shift();
    return data;
}


function drawRatio(canvas, csv) {
    var chart = new AwesomeChart(canvas),
        data = pullRatio(csv);

    chart.clear();
    chart.title = 'CouchDB/twitter/.count_words (Ratio / ' + sum(data) + ')';
    chart.chartType = 'pie';
    chart.data = data;
    chart.labels = ['好き ' + data[0], '嫌い ' + data[1], '違 ' + data[2]];
    chart.colors = ['#ff3333', '#33ff33', '#3333ff'];
    chart.draw();
}


function drawTransition(canvas, csv) {
    var chart = new AwesomeChart(canvas),
        data = pullTransition(csv),
        titles = ['CouchDB/twitter/.count_words (Transition)', '', ''],
        colors = ['#ff3333', '#33ff33', '#3333ff'];

    chart.clear();
    data.forEach(function (elm, idx) {
        chart.title = titles[idx];
        chart.chartType = 'line';
        chart.data = data[idx];
        chart.colors = [colors[idx], colors[idx], colors[idx]];
        chart.draw();
    });
}


function draw() {
    switch (type) {
    case 'ratio':
        drawRatio(canvas, csv);
        break;
    case 'transition':
        drawTransition(canvas, csv);
        break;
    }
}


function update() {
    var xhr = new XMLHttpRequest();

    if (typeof csv === 'undefined') {
        xhr.open('GET', './update', true);
        xhr.onreadystatechange = function (evt) {
            if (xhr.readyState === 4 && xhr.status === 200) {
                csv = xhr.responseText;
                draw();
            }
        };
        xhr.send();
    } else {
        draw();
    }
}


//document.getElementById('switchratio').addEventListener('click', function (evt) {
//    if (type === 'ratio') {
//        return true;
//    }
//    type = 'ratio';
//    draw();
//}, false);
//document.getElementById('switchtransition').addEventListener('click', function (evt) {
//    if (type === 'transition') {
//        return true;
//    }
//    type = 'transition';
//    draw();
//}, false);
update();

scope.csv = function () {return csv.trim();};
scope.pullRatio = pullRatio;
scope.drawRatio = drawRatio;
scope.draw = draw;

}(this));