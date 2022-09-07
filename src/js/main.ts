import { drawBg } from "./bg";
import { Flow } from "./flow/flow";
import { FxConstantForce } from "./fx/FxForces";
import { FxParticle, ONE_SEC } from "./fx/FxParticle";
import { FxParticleSystem } from "./fx/FxParticleSystem";
import { vec2, VEC2 } from "./fx/vec2";
import { LOGI } from "./logs";
import { LSystem } from "./lsys/LSystem";
import { Turtle } from "./lsys/Turtle";
import { MAIN_RADIUS, FORWARD_STEP, HEIGHT, INTRA_RADIUS, WIDTH } from "./MainConstants";
import { MarchingSquare } from "./marching-square/marching-square";
import { metaball } from "./marching-square/metaball";
import { RAD } from "./math";
import { randomDir, RND0N, RND11 } from "./random";
import { UserSlash } from "./user-slash";

(() => {

    const canvas = document.createElement("canvas");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    if (!ctx)
        return;

    const slashUi = new UserSlash( canvas, ( points: Array<vec2> )=>{
        LOGI(`points [${points}]`);
        const ps = new Set<FxParticle>();

        points.forEach( pnt => {
            const p = pSys.getParticleAt( pnt );
            if (!!p)
                ps.add( p );
        });
        LOGI(`ps: ${ps}`);

        ps.forEach( p => pSys.removeConstraints( p ) );

        ps.forEach( p => pSys.addForce( FxConstantForce( p, VEC2( 0, +10 ) ) ) );
    },
    ( p: FxParticle, pos: vec2 ) => {
        // drag
    },
    ( p: FxParticle ) => {
        // split
    },
    );

    const flow = new Flow();
    flow.setup();


    const pSys = new FxParticleSystem();
    pSys.setUp();

    {
        const lSys = new LSystem(new Map<string,string>([
            ['F', 'F[+F]F[-F]F'],
/*            ['X','F[+X]F[-X]+X'],
            ['F','FF'],
*/
            // ['F','FF[-F+F+F]+[+F-F-F]'],

            // ['F', 'F[+F]F[-F][F]'],
/*            ['X', 'F[+X][-X]FX'],
            ['F','FF'],
*/
            ]),
        );

        {
            const word = lSys.applyProd('F',2);
            const turtle = new Turtle( 
                MAIN_RADIUS,
                INTRA_RADIUS,
                VEC2(WIDTH * .5, HEIGHT ), 
                RAD(-90), 
                FORWARD_STEP, 
                RAD(40),  
            );
            lSys.applyTurtle( turtle, word, pSys, );
        }


        // {
        //     const word = lSys.applyProd('F',1);
        //     const turtle = new Turtle( 
        //         MAIN_RADIUS,
        //         INTRA_RADIUS,
        //         VEC2(WIDTH * .5, 0 ), 
        //         RAD(+90), 
        //         FORWARD_STEP, 
        //         RAD(35),  
        //     );
        //     lSys.applyTurtle( turtle, word, pSys, );
        // }


        const noise_fn = () => {
            const n = pSys.count();

            const u = RND0N(n);

            pSys.addTmpForce( FxConstantForce( u, VEC2( RND11() * 5 * ONE_SEC, 0 ) ) );//randomDir().scale( 2 * ONE_SEC) ) );

        };

        setInterval( noise_fn, 1000 );

    }

    {
        const sim = new MarchingSquare({
            canvas,
            cellSize: 5,
            threshold: 1,
            draw:  () =>
            {
                sim.drawCircles(pSys);
                // this.drawGridLines();
                sim.drawSmoothContours();
            },
        });

        const update = () =>
        {
            drawBg(canvas);
            flow.update(canvas);

            pSys.update();
            sim.recalculate( (x: number, y: number) => metaball(x, y, pSys) );
            sim.draw();

            requestAnimationFrame(update);
        };

        requestAnimationFrame(update);
    }

})();

