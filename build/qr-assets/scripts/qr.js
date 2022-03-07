// Canvas: https://www.w3schools.com/tags/canvas_rect.asp

/**
 * Draws a QR code to the screen
 * @param {number} element_id the canvas to draw to (id)
 * @param {string} text
 * @param {number} _width the width (and height) of the qr-code
 */
export const drawQR = (element, text, _width = null) => {
    // Set up canvas and go to top left
    let canvas = element;
    let ctx = canvas.getContext("2d");
    ctx.lineWidth = "1";
    
    // Change width and height
    let bezel = convertRem(0.5);
    let padding = 2 * (4.0 * bezel);
    let canvas_width = _width == null ? document.getElementById('main-content').clientWidth - padding : _width;
    console.log("width", canvas_width);
    ctx.canvas.width = canvas_width;
    ctx.canvas.height = canvas_width;
    // ctx.moveTo(0,0)

    // Set input field text if not already set
    let dimension_field = document.getElementById('dimension-field')
    if (dimension_field.value === "") {
        dimension_field.value = canvas_width;
    }

    // calculate box height and width
    let lines = text.split('\n');
    let boxes_h = lines.length;
    let chars_first = Array.from(lines[0]);
    let boxes_w = chars_first.length;
    let width = canvas_width;
    let height = canvas_width;

    let box_height = height/boxes_h;
    let box_width = width/boxes_w;

    // Keep track of current position
    let x = 0;
    let y = 0;

    // Clear canvas
    // ctx.beginPath();
    // ctx.fillStyle = "white";
    // ctx.rect(0, 0, width, height);
    // ctx.fill();

    // Draw QR code
    lines.forEach((line) => {
        Array.from(line).forEach((char) => {
            if (char == " ") {
                ctx.beginPath();
                ctx.fillStyle = "white";
                ctx.rect(x, y, box_width + 1, box_height + 1);
                ctx.fill();
            } else if (char == "#") {
                ctx.beginPath();
                ctx.fillStyle = "black";
                ctx.rect(x, y, box_width + 1, box_height + 1);
                ctx.fill();
            } else {
                console.error(`error: unkown character in QR code: ${char}`)
            }
            x += box_width;
        });
        x = 0;
        y += box_height;
    });
}

/** The root element's font size */
function getRootElementFontSize() {
    return parseFloat(getComputedStyle(document.documentElement).fontSize);
}

/** rem to fload */
export function convertRem(value) {
    return value * getRootElementFontSize();
}