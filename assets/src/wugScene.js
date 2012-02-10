/**	
 *	WUG View / Geometry and materials bits
 *	Import THREE and TWEEN
 */
var WUG = (function( wu, three, tween ) {

/**	Globe geometry & materials
 */
	var radius = 480;

	// Establish sphere vertices
	var globe = (function() {
		var geom = new three.Geometry();

		// Material custom attributes, array of floats
		atts = {

			displacement : { type: 'f', value: [] },
			opacity : { type: 'f', value: [] }
		};

		// Material with custom vertex and fragment shaders
		var mat = new three.ShaderMaterial({

			attributes : atts,
			uniforms: {
				amount : { type: "f", value: 0 }
			},

			vertexShader: document.getElementById( 'vs-geo' ).textContent,
			fragmentShader: document.getElementById( 'fs-geo' ).textContent,

			depthTest: false
		});

		mat.linewidth = 2;

		// Set spherical array of vertices
		var latitude, longitude, latPos, longPos, v0;
		var dispAttVals = atts.displacement.value;
		var opacAttVals = atts.opacity.value;
		var neutralDisplacement = -radius / 2.5;

		for( latitude = 180; latitude > 0; latitude -- ) {

			latPos = ( latitude ) * ( pi / 180 );

			for( longitude = 360; longitude > 0; longitude -- ) {

				longPos = ( longitude ) * ( pi / 180 );

				v0 = new three.Vector3(
					radius * Math.cos( longPos ) * Math.sin( latPos ), // x
					radius * Math.sin( longPos ) * Math.sin( latPos ), // y
					radius * Math.cos( latPos ) // z
				);

				line.vertices.push( new three.Vertex( v0 ) );
				dispAttVals.push( neutralDisplacement );
				opacAttVals.push( 0.0 );

			}
		}

		line = new three.Line( waterLineGeom, waterLineMat );
		line.dynamic = true;

		/** Update displacement and opacity
		 */
		function update( displacement, opacity ) {

			dispAttVals = displacement;
			opacAttVals = opacity;

			// flag updates
			atts.displacement.needsUpdate = true;
			atts.opacity.needsUpdate = true;
		}

		return {

			"line": line,
			"atts": atts,
			"update": update
		};

	})();


/**	Hit box and region selection indicator
 */
	var hitLine, hitPent;

	//	Macro to create regular-convex polygon
	function polyShape( geom, edges, radius ) {
		var x, y, pos, first;
		var step = Math.PI * 2 / edges;

		for( var i = 0; i <= edges; i ++ ) {

			x = Math.cos( step * i ) * radius;
			y = Math.sin( step * i ) * radius;

			pos = i < edges ? new three.Vector3( x, y, 0 ) : first;
			if( i === 0 ) first = pos;

			geom.vertices.push( new three.Vertex( pos ) );
		}
	}

	//	Hit indicator - normal
	(function( line ) {
		var geom = new three.Geometry();
		var mat = new three.ShaderMaterial({

			uniforms: {
				amount : { type: "f", value: 0 }
			},

			vertexShader: document.getElementById( 'vs-pin' ).textContent,
			fragmentShader: document.getElementById( 'fs-pin' ).textContent,

			depthTest: false
		});

		mat.linewidth = 2;
		geom.vertices = [ new three.Vertex(), new three.Vertex() ];

		line = new three.Line( geom, mat );

	})( hitLine );

	//	Hit indicator - planar
	(function( line ) {
		var geom = new three.Geometry();
		var mat = new three.ShaderMaterial({

			uniforms: {
				amount : { type: "f", value: 0 }
			},

			vertexShader: document.getElementById( 'vs-pin' ).textContent,
			fragmentShader: document.getElementById( 'fs-pin' ).textContent,

			depthTest: false
		});

		polyShape( geom, 10, 10 );
		line = new three.Line( geom, mat );

	})( hitPent );

	//	Hit target - spherical mesh
	(function( mesh ) {
		var sphere = new three.SphereGeometry( radius, 14, 14 );

		mesh = new three.Mesh( sphere, new three.MeshBasicMaterial() );
		mesh.visible = false;

	})( hitTarget );


	/** 3D scene
	 */
	var container = document.createElement( 'div' );
	document.body.appendChild( container );

	var camera = new three.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 100, 10000 );
	camera.position.z = distance;

	var ctarget = new three.Vector3( 0, 0, 0 );

	var renderer = new three.WebGLRenderer();
	renderer.autoClear = false;
	renderer.setClearColorHex( 0x000000, 0.0 );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	var ambientLight = new three.AmbientLight( 0x606060 );

	// Create and populate
	var scene = new three.Scene();

	scene.add( camera );
	scene.add( ambientLight );

	scene.add( globe.line );
	scene.add( hitLine );
	scene.add( hitPent );
	scene.add( hitTarget );


	/** Publicly accessible
	 */
	wu.scene = scene;
	wu.camera = camera;
	wu.globe = globe;

	return wu;

})( WUG || {}, THREE, TWEEN );
