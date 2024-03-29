import { lerp3 } from "../marching-square/lerp";
import { acos, clamp } from "../math";

export class vec2
{
    static VEC2( x: number, y: number ) {
        return new vec2( x, y );
    }

    constructor( 
        public x: number, 
        public y: number,
    ) {}

    add( b: vec2 ): vec2
    {
        const a = this;

        return new vec2( a.x + b.x, a.y + b.y );
    }

    addInPlace( b: vec2 ): void
    {
        this.x += b.x;
        this.y += b.y;
    }

    subInPlace( b: vec2 ): void
    {
        this.x -= b.x;
        this.y -= b.y;
    }

    negate(): vec2
    {
        const a = this;

        return new vec2( -a.x, - a.y );
    }

    negateInPlace(): vec2
    {
        this.x *= -1;
        this.y *= -1;
        
        return this;
    }

    sub( b: vec2 ): vec2
    {
        const a = this;

        return new vec2( a.x - b.x, a.y - b.y );
    }

    scale( c: number ): vec2
    {
        const a = this;

        return new vec2( a.x * c, a.y * c );
    }

    scaleInPlace( c: number ): vec2
    {
        const a = this;

        a.x *= c;
        a.y *= c;

        return this;
    }

    dot( b: vec2 ): number
    {
        const a = this;

        return a.x * b.x + a.y * b.y;
    }

    mag(): number
    {
        const a = this;

        return Math.sqrt( a.x * a.x + a.y * a.y );
    }

    assign( x: number, y: number )
    {
        this.x = x;
        this.y = y;
    }

    zero(): vec2
    {
        this.x = 0;
        this.y = 0;

        return this;
    }

    copyFrom( b: vec2 ): vec2
    {
        this.x = b.x;
        this.y = b.y;

        return this;
    }

    lerp( b: vec2, t: number ): vec2
    {
        const a = this;
        return new vec2( lerp3( a.x, b.x, t), lerp3( a.y, b.y, t) );
    }

    normalize(): vec2 
    {
        return this.scale( 1 / this.mag() );
    }

    angle( b: vec2 ): number
    {
        const a = this;
        
        const beta = a.dot( b ) / ( a.mag() * b.mag() );
        const alpha = clamp( beta, -1, 1 );
        return acos( alpha );
    }

    clone(): vec2
    {
        return new vec2( this.x, this.y );
    }

    toString(): string
    {
        return `[${this.x},${this.y}]`;
    }

    isNaN(): boolean
    {
        return isNaN(this.x) || isNaN(this.y);
    }

    isInfinity(): boolean
    {
        return !isFinite(this.x) || !isFinite(this.y);
    }
}

export function sub( a: vec2, b: vec2 )
{
    return a.sub(b);
}

export function mag( a: vec2 ): number
{
    return a.mag()
}


export const VEC2_ZERO = () => new vec2(0,0);
export const VEC2 = vec2.VEC2;
