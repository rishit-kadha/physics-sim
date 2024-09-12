# NEVER LOGIN YOUR GITHUB IN NORMAL WINDOW ONLY IN PRIVATE TABS OK. AND yes I'm logging your github desktop and github from here  for YOUROWN SAFTEY.
#This should be your last time doing this, I was once left my GitHub login and it was deleted by some other guy brother please don't do this. Take care
## ALSO IMPROVE THE USE OF ```requestAnimationFrame```
```
function animate() {
    if (!flag) return; // Stop animating if not running

    // Time calculations
    const currentTime = performance.now();
    const deltaTime = (currentTime - previousTime) / 1000; // Convert to seconds
    previousTime = currentTime;

    // Update and redraw objects
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateObjects(deltaTime);
    drawObjects();

    // Request next frame
    requestAnimationFrame(animate);
}
```
