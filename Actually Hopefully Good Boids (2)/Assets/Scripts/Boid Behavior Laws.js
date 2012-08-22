/*DO NOT REMOVE --> */#pragma strict

@HideInInspector
var sphere : Transform;

@HideInInspector
var sphereCollider : SphereCollider;

@HideInInspector
var radius : float;

@HideInInspector
var boidsInNeighborhood : Collider[] = [];

@HideInInspector
var boidLayer : LayerMask = LayerMask.NameToLayer("Boid");

function Start () {
	sphere = transform.Find("Perception Sphere");
	sphereCollider = sphere.collider;
	radius = sphere.lossyScale.x * sphereCollider.radius;
}

function Update () {
	boidsInNeighborhood = FindNeighbors();
	rigidbody.velocity += Cohesion();
}

function FindNeighbors (){
	// JOSH (this is Nathan) make sure neighbors doesn't include the boid
	// I don't know enough about unity to answer this myself	
	
	var boidCollidersInSphere : Collider[] = Physics.OverlapSphere(transform.position,radius,boidLayer);
	Debug.Log(boidCollidersInSphere.Length);
	var boidTransformsInSphere : Transform[] = new Transform[boidCollidersInSphere.length];
	
	for (var i = 0; i < boidTransformsInSphere.length; i++){
		boidTransformsInSphere[i] = boidCollidersInSphere[i].transform;
	}
	/*var boidsArray : Transform[] = [];
	
	for ( var col : Collider in objectsInSphere ){
			if ( col.tag == "Boid" ){
				boidsArray.Add(col.transform.root);
			}
		}
	var boids : Transform[];
	boids = boidsArray;
	return boids;*/
	return boidCollidersInSphere;
}

function Cohesion () {
	//begin calculate the average position of boids in neighborhood
	var cohesionVector : Vector3 = Vector3.zero;
	for (var boid : Collider in boidsInNeighborhood){
		cohesionVector += boid.transform.position;
	//Debug.Log(boid.transform.position);
	}
	if(boidsInNeighborhood.length){
		Debug.Log("cohesionVector before: " + cohesionVector);
		cohesionVector /= boidsInNeighborhood.length; //end calculation
		cohesionVector -= transform.position; //subtraction own position to get distance to average position
		Debug.Log("cohesionVector after: " + cohesionVector);
		return cohesionVector;
	}
	return Vector3.zero;
}

function SteeringModifier(){
	return true;
}