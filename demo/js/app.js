/* default dom id (particles-js) */
//particlesJS();

/* config dom id */
//particlesJS('dom-id');

//rect reader
var Vector2d = function (x, y) {
    this.x = x | 0.0;
    this.y = y | 0.0;
};

Vector2d.prototype.distance = function (vector2d) {
    return Math.sqrt(Math.pow((this.x - vector2d.x), 2) + Math.pow(this.y - vector2d.y, 2));
};


var Path2D = function (p1, p2) {
    this.p1 = p1;
    this.p2 = p2;

    this.length = function () {
        return this.p1.distance(this.p2);
    };

    this.weight = 1 / this.length();//Strength of the line, longer is weaker
};


var fillRawParticlesArray = function () {
    var raw_particles = [];
    for (var i = 0; i < arguments.length; i++) {
        var svgGroup = document.getElementById(arguments[i]);
        var transformInfo = /translate\(([0-9]*\.[0-9]*), ([0-9]*\.[0-9]*)\)/.exec(svgGroup.getAttribute('transform'));
        var offset = new Vector2d(transformInfo[1], transformInfo[2]);

        var rects = svgGroup.getElementsByTagName('rect');

        for (var j = 0; j < rects.length; j++) {
            raw_particles.push(new Vector2d(parseFloat(rects[j].getAttribute('x')) + offset.x, parseFloat(rects[j].getAttribute('y')) + offset.y));
        }
    }
    return raw_particles;
};
var raw_particles = fillRawParticlesArray('Group1', 'Group2');

var fillRawLinesArray = function () {
    var raw_particles = arguments[0];
    var raw_lines = [];
    for (var i = 1; i < arguments.length; i++) {
        var svgGroup = document.getElementById(arguments[i]);
        var transformInfo = /translate\(([0-9]*\.[0-9]*), ([0-9]*\.[0-9]*)\)/.exec(svgGroup.getAttribute('transform'));
        var offset = new Vector2d(transformInfo[1], transformInfo[2]);

        var paths = svgGroup.getElementsByTagName('path');
        for (var k = 0; k < paths.length; k++) {

            var movementsInfo = /M([0-9]*\.[0-9]*),([0-9]*\.[0-9]*) L([0-9]*\.[0-9]*),([0-9]*\.[0-9]*)/.exec(paths[k].getAttribute('d'));
            var p1Estimated = new Vector2d(movementsInfo[1], movementsInfo[2]);
            var p2Estimated = new Vector2d(movementsInfo[3], movementsInfo[4]);

            var p1, p2 = null;
            var previousp1Distance = Number.POSITIVE_INFINITY;
            var previousp2Distance = Number.POSITIVE_INFINITY;
            for (var j = 0; j < raw_particles.length; j++) {
                var p1Distance = raw_particles[j].distance(p1Estimated);
                if (p1Distance < previousp1Distance) {
                    previousp1Distance = p1Distance;
                    p1 = raw_particles[j];
                }
                var p2Distance = raw_particles[j].distance(p2Estimated);
                if (p2Distance < previousp2Distance) {
                    previousp2Distance = p2Distance;
                    p2 = raw_particles[j];
                }
            }

            raw_lines.push(new Path2D(p1, p2));
        }
    }
    return raw_lines;
};

var raw_lines = fillRawLinesArray(raw_particles, 'Line1', 'Line2');

/* config dom id (optional) + config particles params */
particlesJS('particles-js', {
    canvas: {
        color_hex_bg: '#15414e',
        opacity: 1
    },
    particles: {
        color: '#000',
        shape: 'edge',
        opacity: 1,
        size: 2,
        size_random: false,
        raw_particles: raw_particles,
        out_of_canvas: true,
        anim: {
            speed: 0.15
        },
        line_linked: {
            color: '#000',
            distance: 150,
            enable_auto: false,
            raw_lines: raw_lines
        }
    },
    retina_detect: true
});

