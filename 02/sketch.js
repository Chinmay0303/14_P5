/*
 * sketch.js — clean p5.js template
 *
 * KEY RULE: Never read clientWidth/clientHeight from the container that
 * holds the canvas. The canvas itself inflates that container, so you get
 * a circular reference — especially on shrink-then-grow cycles.
 *
 * Instead: measure the container BEFORE the canvas exists (setup),
 * then on resize use a ResizeObserver so we always get the true
 * available size independent of the canvas content.
 */

let circleRadius = 50

let circleX = 0
let circleY = 0

function getContentSize() {
    const el = document.getElementById("content");
    /*
     * getBoundingClientRect() gives the rendered box size including borders.
     * We subtract borders (2px each side = 4px) so the canvas sits flush.
     * Adjust the offset if you change the border width in CSS.
     */
    const rect = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    const bx = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
    const by = parseFloat(style.borderTopWidth)  + parseFloat(style.borderBottomWidth);
    return {
        w: Math.floor(rect.width  - bx),
        h: Math.floor(rect.height - by),
    };
}

function setup() {
    const { w, h } = getContentSize();
    const canvas = createCanvas(w, h);
    canvas.parent("content");
    console.log("setup — canvas:", w, h);

    // ResizeObserver watches the container's actual rendered size.
    // It fires whenever the element's box changes — no polling, no guessing.
    const observer = new ResizeObserver(() => {
        const { w: nw, h: nh } = getContentSize();
        if (nw !== width || nh !== height) {
            resizeCanvas(nw, nh);
            // background(0);
            console.log("resized →", nw, nh);
        }
    });
    observer.observe(document.getElementById("content"));
}

function mousePressed(){
    circleRadius += 5

    circleX = 0
    circleY = 0
}

function draw() {
    background(0);

    print("draw — mouse:", mouseX % 256, mouseY % 256);

    // Top-left rectangle
    fill(255, mouseX % 256, mouseY % 256);
    noStroke();
    rect(50, 50, 100, 100);

    // Bottom-right rectangle — always relative to canvas size
    fill(mouseY % 256, mouseX % 256, 255);
    rect(width - 150, height - 150, 100, 100);

    fill("rgb(0, 255, 89)");
    stroke("rgb(255,255,255)");
    strokeWeight(2);

    ellipse(mouseX,mouseY, circleRadius);

    fill("rgb(255, 238, 0)");
    noStroke();

    ellipse(circleX,circleY,50);

    circleX += 1
    circleY += 2

}

/*
 * windowResized is kept as a lightweight fallback for environments where
 * ResizeObserver is unavailable (very rare), but the ResizeObserver above
 * does the real work.
 */
function windowResized() {
    const { w, h } = getContentSize();
    resizeCanvas(w, h);
}
