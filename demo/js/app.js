/* default dom id (particles-js) */
//particlesJS();

/* config dom id */
//particlesJS('dom-id');

//rect reader
var Position = function (x, y) {
    this.x = x | 0.0;
    this.y = y | 0.0;
};

var Offset = function (x, y) {
    this.x = x | 0.0;
    this.y = y | 0.0;
};

svgGroup = document.getElementById('Group1');
rects = svgGroup.getElementsByTagName('rect');

var raw_particles = [];
var offset1 = new Offset(36.0, 0);

for (var i = 0; i < rects.length; i++) {
    raw_particles.push(new Position(parseFloat(rects[i].getAttribute('x')) + offset1.x, parseFloat(rects[i].getAttribute('y')) + offset1.y));
}

svgGroup = document.getElementById('Group2');
rects = svgGroup.getElementsByTagName('rect');

var offset2 = new Offset(1.0, 150.0);

for (var i = 0; i < rects.length; i++) {
    raw_particles.push(new Position(parseFloat(rects[i].getAttribute('x')) + offset2.x, parseFloat(rects[i].getAttribute('y')) + offset2.y));
}


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
        anim: {
            speed: 0.15
        },
        line_linked: {
            color: '#000',
            distance: 150
        }
    },
    retina_detect: true
});

