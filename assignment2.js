import {defs, tiny} from './examples/common.js';

import { Obj_File_Demo, Shape_From_File } from "./examples/obj-file-demo.js"

import { Text_Line } from "./examples/text-demo.js"


const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Matrix, Mat4, Light, Shape, Material, Scene, Texture
} = tiny;

const {Textured_Phong} = defs

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
            'play_sphere': new defs.Subdivision_Sphere(4),
            'sphere': new defs.Subdivision_Sphere(4),
            'cylinder': new defs.Capped_Cylinder(10, 10),
            'star': new Shape_From_File("assets/Star.obj"),
            'text': new Text_Line(35)
        };

        // *** Materials
        this.materials = {
            plastic: new Material(new defs.Phong_Shader(),
                {ambient: .4, diffusivity: .6, color: hex_color("#ffffff")}),
            sun: new Material(new defs.Phong_Shader(),
                { ambient: 1, diffusivity: 0, color: hex_color("#ffffff") }),
            play_button: new Material(new Textured_Phong(), {
                    color: hex_color("#000000"),
                    ambient: 0.9, 
                    texture: new Texture("assets/play_button.png", "NEAREST")
                }),
            text_image: new Material(new defs.Textured_Phong(1), {
                    color: hex_color("#000000"),
                    ambient: 0, diffusivity: 0, specularity: 0,
                    texture: new Texture("assets/text.png")
            })
        };
        // The white material and basic shader are used for drawing the outline.
        this.white = new Material(new defs.Basic_Shader());
        this.isRunning = false;

        this.color_max = [1, 0, 0.5];
        this.color_min = [0, 1, 0.9];

        this.center_color = [1, 0, 0];
        this.fringe_color = [0, 1, 0];

        this.colors = this.generate_rand_colors()

        this.weights = this.generate_weights()

        this.outline_cubes = false;
        this.time_paused = false;
        this.read_path();
        this.read_file();
        this.sig_buffer = [];
        this.counter = 0;
        this.sig_window = [];

        this.circle = this.galaxy = false;
        this.regular = true;

        this.shape_cylinder = true;
        this.shape_sphere = this.shape_cube = this.shape_star = false;

        this.dist_multiplier = 1;
        this.max = 50;
        this.min = 0;

        this.dt_sum = 0;
        this.progress = true;
        this.fft = [];

        this.mouse_was_just_clicked = false;
        this.mouse_pos = null;

        this.current_pos = Mat4.translation(0, 0, -30);

        this.averaged_mags = [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5];

        this.samp_rate = 44100;
        this.res = 0;
        /*
        const playAudio = () => {
            var audio = new Audio('jellyfish_jam.wav');
            console.log("LALALALALLALALALALALLALAAAAAA");
            audio.play();
            this.isRunning = true;
            console.log(this.isRunning);
        };
        */
        
        // Add a click event listener to the div
        //document.getElementById('playButton').addEventListener('click', playAudio);
        
    }

    playAudio() {
        var audio = new Audio(this.path);
        console.log("LALALALALLALALALALALLALAAAAAA");
        audio.play();
        this.isRunning = true;
        console.log(this.isRunning);
    };

    read_path() {
        fetch('path.txt')
            .then(response => response.text())
            .then(path => {
                this.path = path;
            })
    };

    display(context, program_state) {
        // display():  Called once per frame of animation. Here, the base class's display only does
        // some initial setup.

        this.mouse_main = {"from_center": vec(0, 0)};
            const mouse_position = (e, rect = context.canvas.getBoundingClientRect()) =>
                vec(e.clientX - (rect.left + rect.right) / 2, e.clientY - (rect.bottom + rect.top) / 2);
            // Set up mouse response.  The last one stops us from reacting if the mouse leaves the canvas:
            document.addEventListener("mouseup", e => {
                this.mouse_main.anchor = undefined;
            });
            context.canvas.addEventListener("mousedown", e => {
                e.preventDefault();
                var new_pos = mouse_position(e);
                var new_x = new_pos[0];
                var new_y = new_pos[1];
                if (!this.isRunning) {
                    if (Math.abs(new_x) < 50 && Math.abs(new_y) < 50) {
                        this.playAudio();
                    }
                }
                if (this.mouse_pos == null || new_x != this.mouse_pos[0] || new_y != this.mouse_pos[1]) {
                    this.mouse_pos = new_pos;
                    this.mouse_was_just_clicked == true
                    if (Math.abs(this.mouse_pos[0]) < 50) {
                        this.center_color = [0.25*Math.random()+0.75, 0.75*Math.random()+0.25, 0];
                        this.colors = this.generate_rand_colors()
                        for (let i = 0; i <3; i++) {
                            this.color_max[i] = this.center_color[i]
                        }
                    }
                    if (Math.abs(this.mouse_pos[0]) > 150 && Math.abs(this.mouse_pos[1]) < 50) {
                        this.fringe_color = [0, 0.25*Math.random()+0.75, 0.75*Math.random()+0.25];
                        this.colors = this.generate_rand_colors()
                        for (let i = 0; i <3; i++) {
                            this.color_min[i] = this.fringe_color[i]
                            if (i == 2) {
                                this.color_min[i] += 0.7;
                            }
                        }
                    }
                } else {
                    this.mouse_was_just_clicked = false;    
                }
                
                
                //this.mouse_main.anchor = mouse_position(e);
            });

        // Setup -- This part sets up the scene's overall camera matrix, projection matrix, and lights:
        if (!context.scratchpad.controls) {
            this.children.push(context.scratchpad.controls = new defs.Movement_Controls());
            // Define the global camera and projection matrices, which are stored in program_state.
            program_state.set_camera(this.current_pos);
        }
        
        program_state.projection_transform = Mat4.perspective(
            Math.PI / 4, context.width / context.height, 1, 100);

        // *** Lights: *** Values of vector or point lights.
        const light_position = vec4(0, 5, 5, 1);
        program_state.lights = [new Light(light_position, color(1, 1, 1, 1), 1000)];
    }

    generate_rand_colors() {
        let colors = []
        //console.log(this.fringe_color, this.center_color);
        for (let i = 0; i < 25; i++) {
            var red_component = this.fringe_color[0] + (this.center_color[0] - this.fringe_color[0]) * Math.pow(2, -1*Math.pow(12.5-i, 2)/10);
            var blue_component = this.fringe_color[1] + (this.center_color[1] - this.fringe_color[1]) * Math.pow(2, -1*Math.pow(12.5-i, 2)/10);
            var green_component =this.fringe_color[2] + (this.center_color[2] - this.fringe_color[2]) * Math.pow(2, -1*Math.pow(12.5-i, 2)/10);
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

    set_res(res) {
        this.res = res
    }

    process_fft(chunk) {
        console.log(this.path)
        return new Promise(function (resolve, reject) { 
            $.ajax({
                type: 'POST',
                url: "http://localhost:8000", // Update the URL to match your server address
                data: JSON.stringify({param: chunk}), // Passing some input here
                contentType: "application/json",
                dataType: "json",
                success: function(response) {
                    var res = response.result
                    //console.log(chunk[0])
                    resolve(res)
                    //console.log(res)
                },
                error: function(xhr, status, error) {
                    console.error('Error:', error);
                }
            })
        });
    }

    display(context, program_state) {
        super.display(context, program_state);

        let prev_t = this.t;
        var t = this.t = program_state.animation_time / 1000, dt = program_state.animation_delta_time / 1000;
        //console.log(dt)
       this.progress = true;
        
        try {
            if (this.isRunning) {
                var chunk = this.signal.splice(0, Math.floor(dt*this.samp_rate));
                
                this.process_fft(chunk).then((data) => {
                    this.fft = data
                })
        
                //console.log(this.fft)

                const average = array => array.reduce((a, b) => a + b) / array.length;
                this.averaged_mags.pop();
                this.averaged_mags.push(average(this.fft));
                var avg = average(this.averaged_mags);
                var interplolated_color = color(this.color_min[0]*avg + this.color_max[0]*(1-avg), this.color_min[1]*avg + this.color_max[1]*(1-avg), this.color_min[2]*avg + this.color_max[2]*(1-avg), 1)


                if (this.regular) {
                    this.webgl_manager = new tiny.Webgl_Manager(context.canvas, interplolated_color);
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
                    this.webgl_manager = new tiny.Webgl_Manager(context.canvas, interplolated_color);
                    for (var box_num = 0; box_num < 25; box_num++) {
                        var theta_plus = 0.25 * t;
                        var theta = 2 * Math.PI * box_num / 25 + theta_plus;
                        let model_transform = Mat4.identity();
                        var scaling_matrix = Mat4.identity();
                        var mag = Math.min(this.max, this.weights[box_num] * 0.5 * (this.fft[box_num] + 0.2));
                        scaling_matrix[0][0] = Math.min(this.max, this.weights[box_num] * 0.5 * (this.fft[box_num] + 0.2))
                        //scaling_matrix[0][0] = 0.5
                        //model_transform = model_transform.times(scaling_matrix);
                        model_transform = model_transform.times(Mat4.rotation(-0.8*Math.PI/2, 1, 0, 0))
                        model_transform = model_transform.times(Mat4.rotation(theta, 0, 0, 1))
                        model_transform = model_transform.times(Mat4.translation((this.dist_multiplier * 8 + mag), 0, 0));
                        model_transform = model_transform.times(scaling_matrix);
                        model_transform = model_transform.times(Mat4.rotation(Math.PI / 2, 1, 0, 0));
                        model_transform = this.draw_shape(context, program_state, model_transform, box_num);
                    }
                }
                if (this.galaxy) {
                    this.webgl_manager = new tiny.Webgl_Manager(context.canvas, color(0, 0, 0, 1));
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
            } else {
                this.webgl_manager = new tiny.Webgl_Manager(context.canvas, color(0.8, 0.8, 1, 1));
                let model_transform = Mat4.identity();
                var scaling_matrix = Mat4.identity();
                scaling_matrix[0][0] = 4;
                scaling_matrix[1][1] = 4;
                scaling_matrix[2][2] = 4;
                model_transform = model_transform.times(scaling_matrix);
                model_transform = model_transform.times(Mat4.rotation(0.4, 0, 0, 1));
                model_transform = model_transform.times(Mat4.rotation(Math.PI + 2*t, 0, 1, 0));
                
                this.shapes.play_sphere.draw(context, program_state, model_transform, this.materials.play_button);
                
                var line = "Press Play Button to Start";
                let text_transform = Mat4.identity();
                text_transform = text_transform.times(Mat4.translation(-10, -7.5, 0));
                this.shapes.text.set_string(line, context.context);
                this.shapes.text.draw(context, program_state, text_transform.times(Mat4.scale(.5, .5, .5)), this.materials.text_image);
            }
        } catch (e) {
            console.log(e);
        }
        // TODO:  Draw your entire scene here.  Use this.draw_box( graphics_state, model_transform ) to call your helper.
        this.counter += 1;
    }
}


class Texture_Rotate extends Textured_Phong {
    // TODO:  Modify the shader below (right now it's just the same fragment shader as Textured_Phong) for requirement #7.
    fragment_glsl_code() {
        return this.shared_glsl_code() + `
            varying vec2 f_tex_coord;
            uniform sampler2D texture;
            uniform float animation_time;
            void main(){
                // Sample the texture image in the correct place:
                float theta = 0.5 * 3.14159 * mod(animation_time, 4.); 
                mat4 rotate_z_matrix = mat4(
                                    vec4(cos(theta), sin(theta), 0., 0.), 
                                    vec4(sin(theta), -cos(theta), 0., 0.), 
                                    vec4( 0., 0., 1., 0.), 
                                    vec4( 0., 0., 0., 1.));

                vec4 new_tex_coord = rotate_z_matrix * (vec4(f_tex_coord, 0, 0) + vec4(-.5, -.5, 0., 0.)) + vec4(.5, .5, 0., 0.);
                vec4 tex_color = texture2D(texture, new_tex_coord.xy);
                
                float u = mod(new_tex_coord.x, 1.0);
                float v = mod(new_tex_coord.y, 1.0);

                if (u > 0.15 && u < 0.25 && v > 0.15 && v < 0.85) {
                     tex_color = vec4(0, 0, 0, 1.0);
                }
                if (u > 0.75 && u < 0.85 && v > 0.15 && v < 0.85) {
                    tex_color = vec4(0, 0, 0, 1.0);
                }
                if (v > 0.15 && v < 0.25 && u > 0.15 && u < 0.85) {
                    tex_color = vec4(0, 0, 0, 1.0);
                }
                if (v > 0.75 && v < 0.85 && u > 0.15 && u < 0.85) {
                    tex_color = vec4(0, 0, 0, 1.0);
                }

                if( tex_color.w < .01 ) discard;
                // Compute an initial (ambient) color:
                gl_FragColor = vec4( ( tex_color.xyz + shape_color.xyz ) * ambient, shape_color.w * tex_color.w ); 
                // Compute the final color with contributions from lights:
                gl_FragColor.xyz += phong_model_lights( normalize( N ), vertex_worldspace );
        } `;
    }
}