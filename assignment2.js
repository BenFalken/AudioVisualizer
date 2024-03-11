import { defs, tiny } from './examples/common.js';
import { Obj_File_Demo, Shape_From_File } from "./examples/obj-file-demo.js"

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Matrix, Mat4, Light, Shape, Material, Scene,
} = tiny;

class Cube extends Shape {
    constructor() {
        super("position", "normal",);
        // Loop 3 times (for each axis), and inside loop twice (for opposing cube sides):
        this.arrays.position = Vector3.cast(
            [-1, -1, -1], [1, -1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, -1], [-1, 1, -1], [1, 1, 1], [-1, 1, 1],
            [-1, -1, -1], [-1, -1, 1], [-1, 1, -1], [-1, 1, 1], [1, -1, 1], [1, -1, -1], [1, 1, 1], [1, 1, -1],
            [-1, -1, 1], [1, -1, 1], [-1, 1, 1], [1, 1, 1], [1, -1, -1], [-1, -1, -1], [1, 1, -1], [-1, 1, -1]);
        this.arrays.normal = Vector3.cast(
            [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0],
            [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0],
            [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1]);
        // Arrange the vertices into a square shape in texture space too:
        this.indices.push(0, 1, 2, 1, 3, 2, 4, 5, 6, 5, 7, 6, 8, 9, 10, 9, 11, 10, 12, 13,
            14, 13, 15, 14, 16, 17, 18, 17, 19, 18, 20, 21, 22, 21, 23, 22);
    }
}

class Cube_Outline extends Shape {
    constructor() {
        super("position", "color");
        //  TODO (Requirement 5).
        // When a set of lines is used in graphics, you should think of the list entries as
        // broken down into pairs; each pair of vertices will be drawn as a line segment.
        // Note: since the outline is rendered with Basic_shader, you need to redefine the position and color of each vertex
        this.arrays.position = Vector3.cast(
            [1, 1, 1], [1, -1, 1], [1, -1, 1], [-1, -1, 1], [-1, -1, 1], [-1, 1, 1], [-1, 1, 1], [1, 1, 1],
            [1, 1, -1], [1, -1, -1], [1, -1, -1], [-1, -1, -1], [-1, -1, -1], [-1, 1, -1], [-1, 1, -1], [1, 1, -1],
            [1, 1, 1], [1, 1, -1], [1, -1, 1], [1, -1, -1], [-1, -1, 1], [-1, -1, -1], [-1, 1, 1], [-1, 1, -1]);
        // [-1, 1, -1]
        this.arrays.color = Vector3.cast(
            [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1],
            [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1],
            [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]);
        this.indices = false;
    }
}

class Cube_From_Triangles extends Shape {
    constructor() {
        super("position", "color");
        //  TODO (Requirement 5).
        // When a set of lines is used in graphics, you should think of the list entries as
        // broken down into pairs; each pair of vertices will be drawn as a line segment.
        // Note: since the outline is rendered with Basic_shader, you need to redefine the position and color of each vertex
        this.arrays.position = Vector3.cast(
            [-1, -1, -1], [1, -1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, -1], [-1, 1, -1], [1, 1, 1], [-1, 1, 1],
            [-1, -1, -1], [-1, -1, 1], [-1, 1, -1], [-1, 1, 1], [1, -1, 1], [1, -1, -1], [1, 1, 1], [1, 1, -1],
            [-1, -1, 1], [1, -1, 1], [-1, 1, 1], [1, 1, 1], [1, -1, -1], [-1, -1, -1], [1, 1, -1], [-1, 1, -1]);
        this.arrays.normal = Vector3.cast(
            [-1, -1, -1], [1, -1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, -1], [-1, 1, -1], [1, 1, 1], [-1, 1, 1],
            [-1, -1, -1], [-1, -1, 1], [-1, 1, -1], [-1, 1, 1], [1, -1, 1], [1, -1, -1], [1, 1, 1], [1, 1, -1],
            [-1, -1, 1], [1, -1, 1], [-1, 1, 1], [1, 1, 1], [1, -1, -1], [-1, -1, -1], [1, 1, -1], [-1, 1, -1]);
        // Arrange the vertices into a square shape in texture space too:
        this.indices.push(0, 1, 2, 1, 3, 2, 4, 5, 6, 5, 7, 6, 8, 9, 10, 9, 11, 10, 12, 13,
            14, 13, 15, 14, 16, 17, 18, 17, 19, 18, 20, 21, 22, 21, 23, 22);
    }
}

class Cube_Single_Strip extends Shape {
    constructor() {
        super("position", "normal");
        // TODO (Requirement 6)
    }
}


class Base_Scene extends Scene {
    /**
     *  **Base_scene** is a Scene that can be added to any display canvas.
     *  Setup the shapes, materials, camera, and lighting here.
     */
    constructor() {
        // constructor(): Scenes begin by populating initial values like the Shapes and Materials they'll need.
        super();
        this.hover = this.swarm = false;
        // At the beginning of our program, load one of each of these shape definitions onto the GPU.
        this.shapes = {
            'cube': new Cube(),
            'outline': new Cube_Outline(),
            'cube_from_triangles': new Cube_From_Triangles(),
            sphere: new defs.Subdivision_Sphere(4),
            cylinder: new defs.Capped_Cylinder(10, 10),
            star: new Shape_From_File("assets/Star.obj")
        };

        // *** Materials
        this.materials = {
            plastic: new Material(new defs.Phong_Shader(),
                { ambient: .4, diffusivity: .6, color: hex_color("#ffffff") }),
            sun: new Material(new defs.Phong_Shader(),
                { ambient: 1, diffusivity: 0, color: hex_color("#ffffff") }),
        };
        // The white material and basic shader are used for drawing the outline.
        this.path = 'jellyfish_jam.wav';
        this.white = new Material(new defs.Basic_Shader());
        this.colors = this.generate_rand_colors()
        this.weights = this.generate_weights()
        this.outline_cubes = false;
        this.time_paused = false;
        this.read_file();
        this.read_path();
        this.sig_buffer = [];
        this.counter = 0;
        this.sig_window = [];
        this.isRunning = false;

        this.circle = this.galaxy = false;
        this.regular = true;

        this.shape_cube = true;
        this.shape_sphere = this.shape_cylinder = this.shape_star = false;

        this.dist_multiplier = 1;
        this.max = 50;
        this.min = 0;

        this.dt_sum = 0;
        this.progress = true;
        this.fft = [];

        const playAudio = () => {
            var audio = new Audio(this.path);
            console.log("LALALALALLALALALALALLALAAAAAA");
            audio.play();
            this.isRunning = true;
            console.log(this.isRunning);
        };
        
        // Add a click event listener to the div
        document.getElementById('playButton').addEventListener('click', playAudio);
        
    }

    display(context, program_state) {
        // display():  Called once per frame of animation. Here, the base class's display only does
        // some initial setup.

        // Setup -- This part sets up the scene's overall camera matrix, projection matrix, and lights:
        this.mousep = { "from_center": vec(0, 0) };
        const mouse_position = (e, rect = context.canvas.getBoundingClientRect()) =>
            vec(e.clientX - (rect.left + rect.right) / 2, e.clientY - (rect.bottom + rect.top) / 2);
        context.canvas.addEventListener("mousedown", e => {
            //console.log(mouse_position(e))
            e.preventDefault();
            this.mousep.anchor = mouse_position(e);
        });
        if (!context.scratchpad.controls) {
            this.children.push(context.scratchpad.controls = new defs.Movement_Controls());
            // Define the global camera and projection matrices, which are stored in program_state.
            program_state.set_camera(Mat4.translation(0, 0, -30));
        }
        program_state.projection_transform = Mat4.perspective(
            Math.PI / 4, context.width / context.height, 1, 100);

        // *** Lights: *** Values of vector or point lights.
        const light_position = vec4(0, 5, 5, 1);
        program_state.lights = [new Light(light_position, color(1, 1, 1, 1), 1000)];
    }

    generate_rand_colors() {
        let colors = []
        for (let i = 0; i < 25; i++) {
            var red_component = Math.pow(2, -1*Math.pow(12.5-i, 2)/10)
            var blue_component = 1 - Math.pow(2, -1*Math.pow(12.5-i, 2)/10)
            var green_component = 0;
            colors.push([red_component, green_component, blue_component, 1]);
        }
        return colors;
    }

    generate_weights() {
        let weights = []
        for (let i = 0; i < 25; i++) {
            var weight = 1 - Math.pow(2, -1*Math.pow(12-i, 2)/5)/1.5
            weights.push(weight);
        }
        return weights;
    }

    read_file() {
        fetch('data.txt')
            .then(response => response.text())
            .then(signal => {
                var str_signal = signal.split(' ');
                this.signal = [];
                for (let i = 0; i < str_signal.length; i++) {
                    // Instead of parseInt(), Number()
                    // can also be used
                    this.signal.push(parseInt(str_signal[i]));
                }
                            //console.log('File content:', content);
                // Now you can use the 'content' variable as needed
            })
            .catch(error => console.error('Error reading file:', error));
    }

    read_path() {
        fetch('path.txt')
            .then(response => response.text())
            .then(path => {
                this.path = path;
            })
    }
    
    flip_outline_cubes() {
        this.outline_cubes = !this.outline_cubes;
    }

    flip_pause_time() {
        this.time_paused = !this.time_paused;
    }
}

export class Assignment2 extends Base_Scene {
    /**
     * This Scene object can be added to any display canvas.
     * We isolate that code so it can be experimented with on its own.
     * This gives you a very small code sandbox for editing a simple scene, and for
     * experimenting with matrix transformations.
     */
    toggle_circle() {
        this.galaxy = false;
        this.circle = true;
        this.regular = false;
    }

    toggle_planetary() {
        this.galaxy = true;
        this.circle = false;
        this.regular = false;
    }

    toggle_regular() {
        this.galaxy = false;
        this.circle = false;
        this.regular = true;
    }

    toggle_cube() {
        this.shape_cube = true;
        this.shape_sphere = false;
        this.shape_cylinder = false;
        this.shape_stars = false;
    }

    toggle_sphere() {
        this.shape_cube = false;
        this.shape_sphere = true;
        this.shape_cylinder = false;
        this.shape_stars = false;
    }

    toggle_cylinder() {
        this.shape_cube = false;
        this.shape_sphere = false;
        this.shape_cylinder = true;
        this.shape_stars = false;
    }

    toggle_stars() {
        this.shape_cube = false;
        this.shape_sphere = false;
        this.shape_cylinder = false;
        this.shape_star = true;
    }
    
    make_control_panel() {
        // Draw the scene's buttons, setup their actions and keyboard shortcuts, and monitor live measurements.
        this.key_triggered_button("Circular Setting", ["c"], this.toggle_circle);
        // Add a button for controlling the scene.
        this.key_triggered_button("Regular Setting", ["p"], this.toggle_regular);
        this.key_triggered_button("Galaxy Mode", ["g"], this.toggle_planetary);
            // TODO:  Requirement 5b:  Set a flag here that will toggle your outline on and off
        // customizer keys
        // shapes
        this.new_line();
        this.key_triggered_button("Cubes", ["4"], this.toggle_cube);
        this.key_triggered_button("Spheres", ["5"], this.toggle_sphere);
        this.key_triggered_button("Cylinders", ["6"], this.toggle_cylinder);
        this.key_triggered_button("Stars", ["7"], this.toggle_stars);
        // space between guys
        this.new_line();
        const dist_controls = this.control_panel.appendChild(document.createElement("span"));
        dist_controls.style.margin = "80px";
        this.key_triggered_button("-", ["-"], () =>
            this.dist_multiplier /= 1.2, undefined, undefined, undefined, dist_controls);
        this.live_string(box => {
            box.textContent = " Distance Between Shapes: " + this.dist_multiplier.toFixed(2) + " ";
        }, dist_controls);
        this.key_triggered_button("+", ["="], () =>
            this.dist_multiplier *= 1.2, undefined, undefined, undefined, dist_controls);
        // max
        this.new_line();
        const max_controls = this.control_panel.appendChild(document.createElement("span"));
        max_controls.style.margin = "115px";
        this.key_triggered_button("-", ["["], () =>
            this.max -= 1, undefined, undefined, undefined, max_controls);
        this.live_string(box => {
            box.textContent = " Maximum Size: " + this.max.toFixed(2) + " ";
        }, max_controls);
        this.key_triggered_button("+", ["]"], () =>
            this.max += 1, undefined, undefined, undefined, max_controls);
        // min
        this.new_line();
        const min_controls = this.control_panel.appendChild(document.createElement("span"));
        min_controls.style.margin = "115px";
        this.key_triggered_button("-", [";"], () =>
            this.min -= 1, undefined, undefined, undefined, min_controls);
        this.live_string(box => {
            box.textContent = " Minimum Size: " + this.min.toFixed(2) + " ";
        }, min_controls);
        this.key_triggered_button("+", ["'"], () =>
            this.min += 1, undefined, undefined, undefined, min_controls);
    }

    draw_shape(context, program_state, model_transform, box_num) {
        if (this.shape_cube)
            this.shapes.cube.draw(context, program_state, model_transform, this.materials.plastic.override({ color: this.colors[box_num] }));
        else if (this.shape_sphere)
            this.shapes.sphere.draw(context, program_state, model_transform, this.materials.plastic.override({ color: this.colors[box_num] }));
        else if (this.shape_cylinder) {
            if (this.regular)
                model_transform = model_transform.times(Mat4.rotation(Math.PI / 2, 1, 0, 0))
            this.shapes.cylinder.draw(context, program_state, model_transform, this.materials.plastic.override({ color: this.colors[box_num] }));
        }
        else if (this.shape_star) {
            if (this.galaxy)
                model_transform = model_transform.times(Mat4.rotation(Math.PI / 2, 1, 0, 0))
            this.shapes.star.draw(context, program_state, model_transform, this.materials.plastic.override({ color: this.colors[box_num] }));
            //model_transform = model_transform.times(Mat4.translation(-2, 0, 0));
        }
        return model_transform;
    }

    display(context, program_state) {
        super.display(context, program_state);
        

        const blue = hex_color("#1a9ffa");

        let offset = 0;

        let prev_t = this.t;
        var t = this.t = program_state.animation_time / 1000, dt = program_state.animation_delta_time / 1000;
        console.log(dt)
        if (this.dt_sum < 0.034 - 0.005) {
            this.progress = false;
            //console.log(this.dt_sum);
            t = prev_t;
            this.dt_sum += dt;
        }
        else {
            this.progress = true;
            console.log("progress: " + dt);
            this.dt_sum = 0;
        }
        
        try {
            if (this.isRunning) {
                if (this.progress) {
                    console.log("dt sum: " + this.dt_sum);
                    var fft_sig = this.signal.splice(0, 25);
                    this.fft = fft_sig;
                }
               // console.log(dt);
                if (this.regular) {
                    for (var box_num = 0; box_num < 25; box_num++) {
                        let model_transform = Mat4.identity();
                        var scaling_matrix = Mat4.identity()
                        scaling_matrix[1][1] = Math.max(this.min, Math.min(this.max,0.66 * (2 * this.weights[box_num] * (this.fft[box_num] + 0.2))))
                        scaling_matrix[0][0] = 1
                        scaling_matrix[2][2] = 2
                        model_transform = model_transform.times(Mat4.translation(this.dist_multiplier*(12.5 - box_num), 0, 0));
                        model_transform = model_transform.times(scaling_matrix);
                        model_transform = this.draw_shape(context, program_state, model_transform, box_num);
                    }
                }

                if (this.circle) {
                    for (var box_num = 0; box_num < 25; box_num++) {
                        var theta_plus = 0.25 * t;
                        var theta = 2 * Math.PI * box_num / 25 + theta_plus;
                        let model_transform = Mat4.identity();
                        var scaling_matrix = Mat4.identity();
                        var mag = Math.min(this.max, this.weights[box_num] * 0.5 * (this.fft[box_num] + 0.2));
                        scaling_matrix[0][0] = Math.min(this.max, this.weights[box_num] * 0.5 * (this.fft[box_num] + 0.2))
                        //scaling_matrix[0][0] = 0.5
                        //model_transform = model_transform.times(scaling_matrix);
                        model_transform = model_transform.times(Mat4.rotation(theta, 0, 0, 1))
                        model_transform = model_transform.times(Mat4.translation((this.dist_multiplier * 8 + mag), 0, 0));
                        model_transform = model_transform.times(scaling_matrix);
                        model_transform = model_transform.times(Mat4.rotation(Math.PI / 2, 1, 0, 0));
                        model_transform = this.draw_shape(context, program_state, model_transform, box_num);
                    }
                }
                if (this.galaxy) {
                    var box_num = 13;
                    var scaling_matrix = Mat4.identity()
                    let model_transform = Mat4.identity();
                    let angle = 0;
                    scaling_matrix[1][1] = Math.min(this.max * 0.05, 0.0066 * 5 * (2 * this.weights[box_num] * (this.fft[box_num] + 0.2)))
                    scaling_matrix[0][0] = Math.min(this.max * 0.05, 0.0066 * 5 * (2 * this.weights[box_num] * (this.fft[box_num] + 0.2)))
                    scaling_matrix[2][2] = Math.min(this.max * 0.05, 0.0066 * 5 * (2 * this.weights[box_num] * (this.fft[box_num] + 0.2)))
                    model_transform = model_transform.times(scaling_matrix);
                    this.draw_shape(context, program_state, model_transform, box_num);
                    for (var box_num = 1; box_num < 13; box_num++) {
                        model_transform = Mat4.identity();
                        let model_transform1 = Mat4.identity();
                        let model_transform2 = Mat4.identity();
                        let model_transform3 = Mat4.identity();
                        let model_transform4 = Mat4.identity();
                        let model_transform5 = Mat4.identity();
                        let model_transform6 = Mat4.identity();
                        let model_transform7 = Mat4.identity();
                        let model_transform8 = Mat4.identity();

                        model_transform = model_transform.times(Mat4.translation(this.dist_multiplier * 2.5 * (13 - box_num), 0, 0));
                        model_transform = model_transform.times(scaling_matrix);

                        angle = 2 * Math.PI - Math.log((box_num + 1) * t);
                        scaling_matrix[1][1] = Math.max(this.min, Math.min(this.max * 0.05, Math.abs(13 - box_num) * 0.012 * (2 * this.weights[box_num] * (this.fft[box_num] + 0.2))))
                        scaling_matrix[0][0] = Math.max(this.min, Math.min(this.max * 0.05, Math.abs(13 - box_num) * 0.012 * (2 * this.weights[box_num] * (this.fft[box_num] + 0.2))))
                        scaling_matrix[2][2] = Math.max(this.min, Math.min(this.max * 0.05, Math.abs(13 - box_num) * 0.012 * (2 * this.weights[box_num] * (this.fft[box_num] + 0.2))))

                        model_transform1 = model_transform1.times(Mat4.rotation(angle, 0, 0, 1));
                        model_transform1 = model_transform1.times(model_transform);
                        this.draw_shape(context, program_state, model_transform1, box_num);
                        model_transform2 = model_transform2.times(Mat4.rotation(angle + Math.PI, 0, 0, 1));
                        model_transform2 = model_transform2.times(model_transform);
                        this.draw_shape(context, program_state, model_transform2, box_num);
                        model_transform3 = model_transform3.times(Mat4.rotation(angle + Math.PI / 2, 0, 0, 1));
                        model_transform3 = model_transform3.times(model_transform);
                        this.draw_shape(context, program_state, model_transform3, box_num);
                        model_transform4 = model_transform4.times(Mat4.rotation(angle + 3 * Math.PI / 2, 0, 0, 1));
                        model_transform4 = model_transform4.times(model_transform);
                        this.draw_shape(context, program_state, model_transform4, box_num);
                        model_transform5 = model_transform5.times(Mat4.rotation(angle + 3 * Math.PI / 4, 0, 0, 1));
                        model_transform5 = model_transform5.times(model_transform);
                        this.draw_shape(context, program_state, model_transform5, box_num);
                        model_transform6 = model_transform6.times(Mat4.rotation(angle + 5 * Math.PI / 4, 0, 0, 1));
                        model_transform6 = model_transform6.times(model_transform);
                        this.draw_shape(context, program_state, model_transform6, box_num);
                        model_transform7 = model_transform7.times(Mat4.rotation(angle + 7 * Math.PI / 4, 0, 0, 1));
                        model_transform7 = model_transform7.times(model_transform);
                        this.draw_shape(context, program_state, model_transform7, box_num);
                        model_transform8 = model_transform8.times(Mat4.rotation(angle + Math.PI / 4, 0, 0, 1));
                        model_transform8 = model_transform8.times(model_transform);
                        this.draw_shape(context, program_state, model_transform8, box_num);
                    }
                }
                //console.log(t);
            }
        } catch (e) {
            //console.log(e);
        }
        // TODO:  Draw your entire scene here.  Use this.draw_box( graphics_state, model_transform ) to call your helper.
        this.counter += 1;
    }
}