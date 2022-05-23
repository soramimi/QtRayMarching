#version 400
layout(location = 0) out vec4 fragColor;
uniform float time;
uniform vec2 resolution;

vec3 rotate(vec3 p, float angle, vec3 axis)
{
	vec3 a = normalize(axis);
	float s = sin(angle);
	float c = cos(angle);
	float r = 1.0 - c;
	mat3 m = mat3(
				a.x * a.x * r + c,
				a.y * a.x * r + a.z * s,
				a.z * a.x * r - a.y * s,
				a.x * a.y * r - a.z * s,
				a.y * a.y * r + c,
				a.z * a.y * r + a.x * s,
				a.x * a.z * r + a.y * s,
				a.y * a.z * r - a.x * s,
				a.z * a.z * r + c
				);
	return m * p;
}

vec3 trans(vec3 p)
{
	return mod(p, 6.0) - 2.0;
}

float d_cube(vec3 pos)
{
	return length(max(abs(pos) - vec3(1.0, 1.0, 1.0), 0.0)) - 0.2;
}

float d_sphere(vec3 pos)
{
	return length(pos) - 1.2;
}


float map(vec3 pos)
{
	float a = d_cube(pos + vec3(0.0, 0.0, 0.0));
	float b = d_sphere(pos + vec3(-1.0, -1.0, -1.0));
	float c = d_sphere(pos + vec3(1.0, 1.0, 1.0));
	float d = max(a, -b);
	return min(c, d);
}

vec3 normal(vec3 pos)
{
	float delta = 0.01;
	return normalize(vec3(
						 map(pos + vec3(delta, 0.0, 0.0)) - map(pos - vec3(delta, 0.0, 0.0)),
						 map(pos + vec3(0.0, delta, 0.0)) - map(pos - vec3(0.0, delta, 0.0)),
						 map(pos + vec3(0.0, 0.0, delta)) - map(pos - vec3(0.0, 0.0, delta))
						 ));
}

void main()
{
	vec2 position = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
	vec3 cameraPosition = vec3(0.0, 0.0, 10.0);
	float screenZ = 6.0;
	vec3 lightDirection = normalize(vec3(2.0, 8.0, 10.0));
	vec3 rayDirection = normalize(vec3(position, screenZ) - cameraPosition);
	float r = 6.283 * time * 10;
	cameraPosition = rotate(cameraPosition, -0.5, vec3(1, 0, 0));
	rayDirection = rotate(rayDirection, -0.5, vec3(1, 0, 0));
	cameraPosition = rotate(cameraPosition, r, vec3(0, 1, 0));
	rayDirection = rotate(rayDirection, r, vec3(0, 1, 0));
	lightDirection = rotate(lightDirection, r, vec3(0, 1, 0));
	cameraPosition = cameraPosition + vec3(0, -0.8, 0);
	vec3 color = vec3(0.0);
	for (int i = 0; i < 300; i++) {
		float dist = map(cameraPosition);
		if (dist < 0.0001) {
			vec3 normal = normal(cameraPosition);
			float level = dot(normal, lightDirection);
			color = vec3(level / 2 + 0.3) + vec3(0.1, 0.2, 0.4);
			break;
		}
		cameraPosition += rayDirection * dist;
	}
	fragColor = vec4(color, 1.0);
}
