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
            console.log("resized →", nw, nh);
        }
    });
    observer.observe(document.getElementById("content"));
}

function draw() {
  
    background(220, 0, 220);

    stroke(0);

    fill('rgb(252, 208, 131)');

    ellipse(195, 75, 70, 80);

    fill(10);

    ellipse(180, 65, 9, 18);
    ellipse(210, 65, 9, 18);

    fill(255);

    ellipse(180, 68, 5, 8);
    ellipse(210, 68, 5, 8);

    fill(255,0,0,150);

    line(195,70,195,85);
    line(195,85,200,85);

    ellipse(195, 100, 25, 10);

    fill(255,255,255);
    stroke(0);

    rect(134, 120, 125, 200);

    for(let x = 135; x < 134 + 124; x += 1){
        for(let y = 121; y < 120 + 199; y += 1){
            stroke(x,y,0);
            strokeWeight(1.5);
            point(x,y);
        }
    }

    stroke(0);

    fill('rgb(255, 200, 106)');

    rect(85, 135, 40, 150, 100, 100);
    rect(267, 135, 40, 150, 100, 100);
    rect(145, 325, 45, 200, 100, 100);
    rect(200, 325, 45, 200, 100, 100);
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
