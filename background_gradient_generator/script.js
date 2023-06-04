let h3 = document.querySelector("h3");
let color1 = document.querySelector(".color1");
let color2 = document.querySelector(".color2");
let body = document.querySelector("body");

function setGradient() {
    body.style.background = "linear-gradient( to right, " + color1.value + " ," + color2.value + ")";
    let firstColor = hexToRgb(color1.value);
    let secondColor = hexToRgb(color2.value);
    h3.textContent = `rgb(${firstColor.r},${firstColor.g},${firstColor.b}) and rgb(${secondColor.r},${secondColor.g},${secondColor.b})`
}

// Converting hex to Rgb
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

color1.addEventListener('input', setGradient);

color2.addEventListener('input', setGradient);