/*DO NOT REMOVE --> */#pragma strict

//I'VE HAD PROBLEMS IN THE PAST WITH THE SIZE OF THE SPHERE (THOUGH I MAY HAVE FIXED IT). NEEDS TO BE DEBUGGED!!!

@HideInInspector
var sphere : Transform;

@HideInInspector
var sphereCollider : SphereCollider;

@HideInInspector
var radius : float;

function Start () {
	sphere = transform.Find("Perception Sphere");
	sphereCollider = sphere.collider;
	radius = sphere.lossyScale.x * sphereCollider.radius;
}

function Update () {
	FindNeighbors();
}

function FindNeighbors (){
	
	var objectsInSphere : Collider[] = Physics.OverlapSphere(transform.position,radius);
	var boids : Array = [];
	
	for ( var col : Collider in objectsInSphere ){
			if ( col.tag == "Boid" ){
				boids.Add(col.transform.root);
			}
		}
	
	return boids;
}