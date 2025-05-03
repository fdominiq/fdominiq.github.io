
class Sphere{
    constructor() {
        this.type = 'sphere';
        this.color = [1.0,1.0,1.0,1.0];
        this.matrix = new Matrix4();
        this.textureNum = -2;
        this.verts32 = new Float32Array([]);
    }

    render() {
        var rgba = this.color;
        gl.uniform1i(u_whichTexture, this.textureNum);
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        var d = Math.PI/10;
        var dd = Math.PI/10;

        var v1 = [];
        var uv1 = [];
        var v2 = [];
        var uv2 = [];
        var tmp = 2*Math.PI;
        var tmp2;
        var tmp_sin;
        var tmp_cos;
        var tmp_sin2;
        var tmp_cos2;
        var tmp_sin2dd;
        var tmp_cos2dd;

        for(var t = 0; t < Math.PI; t += d){
            tmp2 = t+dd;
            tmp_sin = Math.sin(t);
            tmp_cos = Math.cos(t);
            tmp_sin2 = Math.sin(tmp2);
            tmp_cos2 = Math.cos(tmp2);
            for(var r = 0; r < tmp; r+=d){
                tmp_sin2dd = Math.sin(r+dd);
                tmp_cos2dd = Math.cos(r+dd);
                var p1 = [tmp_sin*Math.cos(r),   tmp_sin*Math.sin(r),  tmp_cos];
                var p2 = [tmp_sin2*Math.cos(r),  tmp_sin2*Math.sin(r), tmp_cos2];
                var p3 = [tmp_sin*tmp_cos2dd,    tmp_sin*tmp_sin2dd,   tmp_cos];
                var p4 = [tmp_sin2*tmp_cos2dd,   tmp_sin2*tmp_sin2dd,  tmp_cos2];

                v1 = v1.concat(p1);   uv1 = uv1.concat([0,0]);
                v1 = v1.concat(p2);   uv1 = uv1.concat([0,0]);
                v1 = v1.concat(p4);   uv1 = uv1.concat([0,0]);
                v2 = v2.concat(p1);   uv2 = uv2.concat([0,0]);
                v2 = v2.concat(p4);   uv2 = uv2.concat([0,0]);
                v2 = v2.concat(p3);   uv2 = uv2.concat([0,0]);

            }
        }
        gl.uniform4f(u_FragColor, 0, 0, 1, 1);
        drawTriangle3DUVNormal(v1, uv1, v1);
        gl.uniform4f(u_FragColor, 1, 0, 0, 1); //1,0,1
        drawTriangle3DUVNormal(v2, uv2, v2);
    }
}