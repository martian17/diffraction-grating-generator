let width = 500;
let height = 500;
let canvas = document.getElementById("canvas");
canvas.width = width;
canvas.height = height;
let ctx = canvas.getContext("2d");
let imgdata = ctx.getImageData(0, 0, width, height);
let data = imgdata.data;

let cx = width / 2;
let cy = height / 2;

let dist2 = function(a, b) {
    return a * a + b * b;
};

let lambda = 5;
let focal = 300;
let calck = function() {
    k = Math.PI / (2 * focal * lambda + lambda * lambda / 2);
};
calck();

let render = function() {
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            let idx = (i * width + j) * 4;
            let r2 = dist2(cx - j, cy - i);
            let inten = (1 + Math.cos(k * r2)) / 2;
            let bright = Math.floor(inten * 256);
            data[idx + 0] = bright;
            data[idx + 1] = bright;
            data[idx + 2] = bright;
            data[idx + 3] = 255;
        }
    }
    ctx.putImageData(imgdata, 0, 0);
};



//gui stuff
let formatnum = function(str, len) {
    return (str + "").slice(0, len);
}

document.getElementById("lambda").addEventListener("input", function() {
    let val = 5 * (10 ** parseFloat(this.value));
    lambda = val;
    update();
});

document.getElementById("lambda-val").addEventListener("keydown", function(e) {
    if (e.which === 13) {
        e.preventDefault();
        lambda = parseFloat(this.innerHTML);
        update();
    }
    if (!([37, 39, 8, 46].indexOf(e.which) !== -1) && !e.key.match(/[0-9\.]/)) {
        e.preventDefault();
    }
});

document.getElementById("focal").addEventListener("input", function() {
    focal = parseFloat(this.value);
    update();
});

document.getElementById("focal-val").addEventListener("keydown", function(e) {
    if (e.which === 13) {
        e.preventDefault();
        focal = parseFloat(this.innerHTML);
        update();
    }
    if (!([37, 39, 8, 46].indexOf(e.which) !== -1) && !e.key.match(/[\-0-9\.]/)) {
        e.preventDefault();
    }
});


let update = function(except) {
    calck();
    document.getElementById("lambda").value = Math.log(lambda / 5) / Math.log(10);
    document.getElementById("lambda-val").innerHTML = formatnum(lambda, 7);
    document.getElementById("focal").value = focal;
    document.getElementById("focal-val").innerHTML = formatnum(focal, 7);
    render();
};


update();