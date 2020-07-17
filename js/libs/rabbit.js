var zzzRabbit = document.createElement( 'div' );
zzzRabbit.style.cssText = "position:absolute; top:5px; right:5px; z-index:10000";
zzzRabbit.innerHTML = '<a title="rabbit hole" id="rabbit" href="#surprise"><img style="width:16px;height:16px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4gscEjc3zV+7OgAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAoklEQVRYw+2XwQrCMBBE32ihiAfPHv0p+431xwq9KP7AeskpiG1ZaXuYuSQQJlkyu5MNJBAFmT0ObIx9BxARfUT0CYkm+ZZg8wBUa7aQfy/jY9GhUrebG0hl8ZQRuQocwBw0Sf4FOKd8IPGc3oChzE/Ac20J3sA1K2MjSb/quHauav0ItJJetavO4f8jB8Zvlu4ydADuB9wPuArWzBF/TtP4ACgsafHmZ0T+AAAAAElFTkSuQmCC"/></a>';

var zzzRabbitHole = zzzRabbit.children[0];

zzzRabbitHole.addEventListener( "click", function() {

	var zzzHoles = [ "xg/examples/morphs_paintings.html", "xg/examples/morphs_composites.html", "xg/examples/synthetic_celebrities_evolution.html", "xg/examples/synthetic_celebrities_interpolation.html",
	"xg/examples/vincent.html", "xg/examples/eyes_gaze5.html", "xg/examples/albert.html", "xg/examples/liquid_face.html", "xg/examples/eyes_gaze3.html", "xg/examples/eyes_gaze2.html",
	"xg/examples/emily.html", "xg/examples/deferred_skin.html", "xg/examples/eyes_gaze.html", "xg/examples/car_zastava.html", "xg/examples/sunshine.html", "xg/examples/earth_bathymetry.html",
	"xg/examples/abstract_mountains.html", "xg/examples/mars_terrain.html", "xg/examples/episodes_from_anthropocene.html", "xg/examples/jupiter.html",
	"xg/examples/thebox.html", "xg/examples/theotherbox.html", "xg/examples/nebula_artefact.html", "xg/examples/earth_seasons.html", "xg/examples/deferred_tubelights.html",
	"xg/examples/deferred_skin_paint.html", "xg/examples/animation_physics_ammo.html", "xg/examples/deferred_skin_eyes.html", "xg/examples/deferred_shadowmap_point.html",
	"xg/examples/skull.html", "xg/examples/deferred_particles_nebula.html", "xg/examples/animation_physics_level.html", "xg/examples/animation_physics_vehicles.html",
	"xg/examples/animation_physics_terrain.html", "xg/examples/forward_materials_skin_jonas.html", "xg/examples/morphs_smiles.html", "xg/examples/facial_expressions.html",
	"xg/examples/rotating_lights.html", "xg/examples/hannibal_draco.html", "xg/examples/twister.html", "xg/examples/text_rendering.html", "xg/examples/eyes_gaze4.html",
	"xg/examples/microsurface.html", "xg/examples/united.html", "xg/examples/shuffle.html", "xg/examples/metropolis.html", "xg/examples/nefertiti.html", "xg/examples/mammoth.html",
	"xg/examples/shadow_profiles.html", "xg/examples/pompeii.html",

	"xg/examples/everybody.html", "xg/examples/money.html",
	"xg/examples/squircle.html", "visualization/spiral.html", "visualization/spiral2.html", "visualization/ulam-spiral.html",

	"xg/examples/witcher.html", "xg/examples/deepfeature_aging.html", "xg/examples/drwho.html", "xg/examples/gaze_dolores.html", "xg/examples/gaze_flush.html",
	"xg/examples/stranger_titles.html",
	"xg/examples/liquid_life.html", "xg/examples/sgi.html", "xg/examples/earth_aerosols.html", "xg/examples/erika.html",
	"xg/examples/skylon.html",

	"three/examples/webgl_animation_skinning_doom3.html", "three/examples/webgl_mini_mass_effect.html", "three/examples/webgl_postprocessing_ssao.html", "three/examples/webgl_animation_skinning_tf2.html",
	"three/examples/webgl_deferred_arealights_texture.html", "three/examples/webgl_cubes.html", "three/examples/webgl_pasta.html", "three/examples/webgl_animals.html",
	"three/examples/webgl_materials_skin.html", "three/examples/webgl_materials_skin_girl.html", "three/examples/webgl_zombies.html", "three/examples/webgl_terrain_dynamic.html",
	"three/examples/webgl_deferred_day.html", "three/examples/webgl_crowd2.html", "three/examples/webgl_city.html", "three/examples/lines_sphere_gl.html",
	"three/examples/webgl_shader_fireball.html", "three/examples/geometry_minecraft_ao.html", "three/examples/materials_shaders_fresnel.html", "three/examples/materials_cubemap_escher.html",
	"three/examples/webgl_psy.html", "three/examples/webgl_postprocessing_dof.html",

	"three/examples/particles_sprites_gl.html", "three/examples/particles_random_gl.html", "three/examples/webgl_shadowmap_particles.html", "three/examples/webgl_terrain_dynamic2.html",
	"three/examples/webgl_shadowmap.html"
	];

	zzzRabbitHole.href = "https://alteredqualia.com/" + zzzHoles[ Math.floor( Math.random() * zzzHoles.length ) ];

} );

document.body.appendChild( zzzRabbit );