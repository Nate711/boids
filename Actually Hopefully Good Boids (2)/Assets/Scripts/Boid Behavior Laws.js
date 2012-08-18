/*DO NOT REMOVE --> */#pragma strict

//I'VE HAD PROBLEMS IN THE PAST WITH THE SIZE OF THE SPHERE (THOUGH I MAY HAVE FIXED IT). NEEDS TO BE DEBUGGED!!!

@HideInInspector
var radius : float;

function Start () {
	for (var child : Transform in transform) {
    	if (child.name == "Perception Sphere") radius = child.lossyScale.x;
	}
}

function Update () {

}

function FindNeighbors (){
	var boids : Array;
	var objectsInSphere : Collider[] = Physics.OverlapSphere(Vector3.zero,radius);
	for ( var col : Collider in objectsInSphere ){
			if ( col.tag == "Boid" ){
				boids.Push(col);
			}
		}
	
	return boids;
}