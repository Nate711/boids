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
	// Nathan: JOSH (this is Nathan) make sure neighbors doesn't include the boid
	// I don't know enough about unity to answer this myself
	
	
	// Josh: I tested it and it seems to find itself (see the new Debug.Log below). Thanks! Fixed the problem btw.
	// Also I forget why I needed to make an array of the transforms so I'm commenting that out for now.
	
	var boidCollidersInSphere : Collider[] = Physics.OverlapSphere(transform.position,radius,boidLayer);//get an array of all boids in radius of the Perception Sphere
	//Debug.Log(boidCollidersInSphere.Length);
	/*var boidTransformsInSphere : Transform[] = new Transform[boidCollidersInSphere.length];
	
	for (var i : int = 0; i < boidTransformsInSphere.length; i++){
		//if (boidCollidersInSphere[i].transform.position == transform.position) Debug.Log("Found myself");
		
		if (boidCollidersInSphere[i].transform.position != transform.position) boidTransformsInSphere[i] = boidCollidersInSphere[i].transform;
	}*/
	
	var boidCollidersWithoutMe : Collider[] = new Collider[boidCollidersInSphere.length];
	
	for (var i : int = 0; i < boidCollidersInSphere.length; i++){
		if(boidCollidersInSphere[i].transform.position!=transform.position){ //make sure we don't include ourselves
			boidCollidersWithoutMe[i]=boidCollidersInSphere[i];
			}
		}
	
	
	return boidCollidersWithoutMe;
}

function Cohesion () {
	//begin calculate the average position of boids in neighborhood
	var cohesionVector : Vector3 = Vector3.zero;
	for (var boid : Collider in boidsInNeighborhood){
		if(!boid) continue; //if index is empty, move to next iteration (this is needed because we have an empty index in the array returned by FindNeighbors()
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