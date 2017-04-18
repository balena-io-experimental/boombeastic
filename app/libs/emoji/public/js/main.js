var grid = clickableGrid(8, 8, function(el, row, col) {
    el.className = 'clicked';
});
var image = [
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0
];
document.getElementById('grid_container').appendChild(grid);

function clickableGrid(rows, cols, callback) {
    var i = 0;
    var grid = document.createElement('table');
    grid.className = 'emojiGrid';
    var sumIndex = -1;
    for (var r = 0; r < rows; ++r) {
        var tr = grid.appendChild(document.createElement('tr'));
        for (var c = 0; c < cols; ++c) {
          sumIndex++;
            var cell = tr.appendChild(document.createElement('td'));
            $(cell).attr('data-index',sumIndex);
            cell.addEventListener('click', (function(el, r, c) {
                return function() {
                    callback(el, r, c);
                }
            })(cell, r, c), false);
        }
    }
    return grid;
}
