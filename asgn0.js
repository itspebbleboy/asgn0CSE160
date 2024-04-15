  // DrawRectangle.js
  function main() {
    // Retrieve <canvas> element <- (1)
    var canvas = document.getElementById('example');
    if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return;
    }
   
    // Get the rendering context for 2DCG <- (2)
    var ctx = canvas.getContext('2d');
    //CHAPTER 2 Your First Step with WebGL
   
    ctx.translate(canvas.width/2,canvas.height/2)
    // Draw a black rectangle <- (3)
    ctx.fillStyle='black';
    ctx.fillRect(-canvas.width/2,-canvas.height/2,canvas.width,canvas.height);
    

    //ctx.fillStyle = 'rgba(0, 0, 255, 1.0)'; // Set a blue color
    //ctx.fillRect(120, 10, 150, 150); // Fill a rectangle with the color
    document.getElementById('drawButton').addEventListener('click', handleDrawEvent);
    document.getElementById('drawButtonOp').addEventListener('click', handleDrawOperationEvent);

    function drawVector(v, color){      
      ctx.beginPath(); // Start a new path
      //if (color == "red") ctx.strokeStyle='rgba(255, 0, 0, 1.0)';
      ctx.strokeStyle=color;
      ctx.moveTo(0, 0); // Move the pen to (30, 50)
      ctx.lineTo(20*v.elements[0], -20*v.elements[1])
      ctx.stroke(); // Render the path
      //ctx.endPath(); 
    }

    function handleDrawEvent(){
      //clear canvas
      ctx.clearRect(-canvas.width/2,-canvas.height/2,canvas.width,canvas.height/2)
      ctx.fillStyle='black';
      ctx.fillRect(-canvas.width/2,-canvas.height/2,canvas.width,canvas.height/2);
      //ctx.fillRect(0,0,canvas.width,canvas.height);
      var x0 = parseFloat(document.getElementById('v0.x').value)
      var y0 = parseFloat(document.getElementById('v0.y').value)
      var x1 = parseFloat(document.getElementById('v1.x').value)
      var y1 = parseFloat(document.getElementById('v1.y').value)
      var v0 = new Vector3 ([x0,y0])
      var v1 = new Vector3 ([x1,y1])
      drawVector(v0, "red")
      drawVector(v1, "blue")
    }

    function handleDrawOperationEvent(){
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle='black';
      ctx.fillRect(-canvas.width/2,-canvas.height/2, canvas.width,canvas.height);
      var x0 = parseFloat(document.getElementById('v0.x').value)
      var y0 = parseFloat(document.getElementById('v0.y').value)
      var x1 = parseFloat(document.getElementById('v1.x').value)
      var y1 = parseFloat(document.getElementById('v1.y').value)
      var v0 = new Vector3 ([x0,y0])
      var v1 = new Vector3 ([x1,y1])
      drawVector(v0, "red")
      drawVector(v1, "blue")

      var op = document.getElementById('op').value
      var scalar = document.getElementById('scalar').value
      var v3, v4

      switch (op) {
        case 'add':
          v3 = v0.add(v1)
          drawVector(v3, "green")
          break;
        case 'sub':
          v3 = v0.sub(v1);
          drawVector(v3, "green")
          break;
        case 'mult':
          v3 = v0.mul(scalar)
          v4 = v1.mul(scalar)
          drawVector(v3, "green")
          drawVector(v4, "green")
          break
        case 'div':
          v3 = v0.div(scalar)
          v4 = v1.div(scalar)
          drawVector(v3, "green")
          drawVector(v4, "green")
          break
        case 'mag':
          console.log("Magnitude of v0: "+v0.magnitude())
          console.log("Magnitude of v1: "+v1.magnitude())
          break
        case 'norm':
          v3 = v0 
          v4 = v1
          v3.normalize()
          v4.normalize()
          drawVector(v3, "green")
          drawVector(v4, "green")
          break
        case 'ang':
          console.log(angleBetween(v0,v1))
          break;
        case 'area':
          
          v3 = Vector3.cross(v0,v1)
          console.log(v3)
          console.log( ( v3.magnitude()) /2)
      }
    }
  } 
function angleBetween(v1, v2){
  // angle between two vectors =  arc cosine( [dot product(v1 & v2)] / [ mag(v1) * mag(v2) ] )
  var cosTheta = Vector3.dot(v1, v2)  / (v1.magnitude() * v2.magnitude());
  //return cosTheta
  return Math.acos(Math.max(-1, Math.min(1, cosTheta))) * (180 / Math.PI) //to avoid floating point inaccuracy that would break acos
  
}