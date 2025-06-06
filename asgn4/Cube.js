class Cube{
    constructor() {
        this.type = 'cube';
        this.color = [1.0, 1.0, 1.0, 1.0];
        this.matrix = new Matrix4();
        this.textureNum = -2;
        this.vertex = [0.0,0.0,0.0, 1.0,1.0,0.0, 1.0,0.0,0.0,
            0.0,0.0,0.0, 1.0,1.0,0.0, 0.0,1.0,0.0,
            0.0,1.0,0.0, 0.0,1.0,1.0, 1.0,1.0,1.0,
            0.0,1.0,0.0,  1.0,1.0,1.0,  1.0,1.0,0.0,
            0.0,0.0,0.0,  0.0,0.0,1.0,  1.0,0.0,1.0,
            0.0,0.0,0.0,  1.0,0.0,1.0,  1.0,0.0,0.0,
            0.0,0.0,1.0, 1.0,1.0,1.0, 1.0,0.0,1.0,
            0.0,0.0,1.0, 0.0,1.0,1.0, 1.0,1.0,1.0,
            0.0,0.0,0.0,  0.0,1.0,1.0,  0.0,1.0,0.0,
            0.0,0.0,0.0,  0.0,1.0,1.0,  0.0,0.0,1.0,
            1.0,0.0,0.0,  1.0,1.0,1.0,  1.0,1.0,0.0,
            1.0,0.0,0.0,  1.0,1.0,1.0,  1.0,0.0,1.0
        ];
    }

    multidrawCube(ver){
        var rgba = this.color;

        gl.uniform1i(u_whichTexture, this.textureNum);
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        if (ver===0){
          drawTriangle3DUV([0.0,0.0,0.0, 1.0,1.0,0.0, 1.0,0.0,0.0],[0,0, 1,1, 1,0]);
          drawTriangle3DUV([0.0,0.0,0.0, 1.0,1.0,0.0, 0.0,1.0,0.0],[0,0, 1,1, 0,1]);
          gl.uniform4f(u_FragColor, rgba[0]*.7, rgba[1]*.7, rgba[2]*.7, rgba[3]);
          drawTriangle3DUV([0.0,1.0,0.0,  0.0,1.0,1.0,  1.0,1.0,1.0],[0,0, 0,1, 1,1])
          drawTriangle3DUV([0.0,1.0,0.0,  1.0,1.0,1.0,  1.0,1.0,0.0],[0,0, 1,1, 1,0]);
          gl.uniform4f(u_FragColor, rgba[0]*.6, rgba[1]*.6, rgba[2]*.6, rgba[3]);
          drawTriangle3DUV([0.0,0.0,0.0,  0.0,0.0,1.0,  1.0,0.0,1.0],[0,0, 0,1, 1,1]);
          drawTriangle3DUV([0.0,0.0,0.0,  1.0,0.0,1.0,  1.0,0.0,0.0],[0,0, 1,1, 1,0]);
          gl.uniform4f(u_FragColor, rgba[0]*.9, rgba[1]*.9, rgba[2]*.9, rgba[3]);
          drawTriangle3DUV([0.0,0.0,1.0, 1.0,1.0,1.0, 1.0,0.0,1.0],[0,0, 1,1, 1,0])
          drawTriangle3DUV([0.0,0.0,1.0, 0.0,1.0,1.0, 1.0,1.0,1.0],[0,0, 0,1, 1,1]);
          gl.uniform4f(u_FragColor, rgba[0]*.8, rgba[1]*.8, rgba[2]*.8, rgba[3]);
          drawTriangle3DUV([0.0,0.0,0.0,  0.0,1.0,1.0,  0.0,1.0,0.0],[0,0, 1,1, 1,0]);
          drawTriangle3DUV([0.0,0.0,0.0,  0.0,1.0,1.0,  0.0,0.0,1.0],[0,0, 1,1, 0,1]);
          drawTriangle3DUV([1.0,0.0,0.0,  1.0,1.0,1.0,  1.0,1.0,0.0],[0,0, 1,1, 1,0]);
          drawTriangle3DUV([1.0,0.0,0.0,  1.0,1.0,1.0,  1.0,0.0,1.0],[0,0, 1,1, 0,1]);

        } else if (ver===1) {
  
            let allVertices = [];
            allVertices = allVertices.concat(
                [0.0,0.0,0.0, 1.0,1.0,0.0, 1.0,0.0,0.0, 0,0,0, 0,1,0, 1,1,0]);
            allVertices = allVertices.concat(
                [0,0,1, 1,1,1, 1,0,1, 0,0,1, 0,1,1, 1,1,1]);
            allVertices = allVertices.concat(
                [0,1,0, 0,1,1, 1,1,1, 0,1,0, 1,1,1, 1,1,0]);
            allVertices = allVertices.concat(
                [0,0,0, 0,0,1, 1,0,1, 0,0,0, 1,0,1, 1,0,0]);
            allVertices = allVertices.concat(
                [1,1,0, 1,1,1, 1,0,0, 1,0,0, 1,1,1, 1,0,1]);
            allVertices = allVertices.concat(
                [0,1,0, 0,1,1, 0,0,0, 0,0,0, 0,1,1, 0,0,1]);

            let allUV = [];
            allUV = allUV.concat([0,0, 1,1, 1,0,  0,0, 0,1, 1,1]);
            allUV = allUV.concat([0,0, 1,1, 1,0,  0,0, 0,1, 1,1]);
            allUV = allUV.concat([0,0, 0,1, 1,1,  0,0, 1,1, 1,0]);
            allUV = allUV.concat([0,0, 0,1, 1,1,  0,0, 1,1, 1,0]);
            allUV = allUV.concat([0,0, 0,1, 1,1,  0,0, 1,1, 1,0]);
            allUV = allUV.concat([0,0, 0,1, 1,1,  0,0, 1,1, 1,0]);

            let allNorm = [];
            allNorm = allNorm.concat([0,0,-1, 0, 0,-1,  0,0,-1,  0,0,-1,  0,0,-1,  0,0,-1]);
            allNorm = allNorm.concat([0,0, 1, 0, 0, 1,  0,0, 1,  0,0, 1,  0,0, 1,  0,0,1]);
            allNorm = allNorm.concat([0,1, 0, 0, 1, 0,  0,1, 0,  0,1, 0,  0,1, 0,  0,1,0]);
            allNorm = allNorm.concat([0,-1,0, 0,-1, 0,  0,-1,0,  0,-1,0,  0,-1,0,  0,-1,0]);
            allNorm = allNorm.concat([1,0, 0, 1, 0, 0,  1,0, 0,  1,0, 0,  1,0, 0,  1,0,0]);
            allNorm = allNorm.concat([-1,0,0, -1,0, 0, -1,0, 0, -1,0, 0, -1,0, 0, -1,0,0]);

            drawTriangle3DUVNormal(allVertices, allUV, allNorm);
      }  // else
  }
}
