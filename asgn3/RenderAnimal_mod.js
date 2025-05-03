function drawAnimal() {
    var Animal_brown = [196.0/255, 164.0/255, 132.0/255, 1];
    var face_color = [1, .9, .65, 1.0];

    var body = new Cube();
    body.color = [154.0/255, 130.0/255, 108.0/255, 1];
    body.matrix.translate(10.125, g_set_Location+0.2 +0.2, 7.15);
    body.matrix.translate(-0.41, -0.5, -0.5);
    body.matrix.scale(.5, .4, .7);
    body.multidrawCube(1);

    var head = new Cube();
    head.color = Animal_brown;
    head.matrix.translate(10, g_set_Location+0.2, 7);
    head.matrix.rotate(-head_animation, 1, 0, 0);
    head.matrix.scale(0.2, 0.2, 0.2);
    head.matrix.translate(-0.65, 0.3, -1.7); //-1.5
    head.multidrawCube(1);
    
    // head top----
    var head_top = new Cube();
    head_top.color =[175.0/255,133.0/255,92.0/255, 1];
    head_top.matrix.translate(10, g_set_Location+0.2, 7);
    head_top.matrix.rotate(-head_animation, 1, 0, 0);
    head_top.matrix.scale(0.3, 0.25, 0.4);
    head_top.matrix.translate(-0.6, 1, -1.3);
    head_top.multidrawCube(1);

    var ears1 = new Cube();
    ears1.color =Animal_brown;
    ears1.matrix.translate(10, g_set_Location+0.2, 7);
    ears1.matrix.rotate(-head_animation, 1, 0, 0);
    ears1.matrix.scale(0.03, 0.23, 0.15);
    ears1.matrix.translate(2, 1.6, -2);
    ears1.multidrawCube(1);

    var ears2 = new Cube();
    ears2.color =Animal_brown;
    ears2.matrix.translate(10, g_set_Location+0.2, 7);
    ears2.matrix.rotate(-head_animation, 1, 0, 0);
    ears2.matrix.scale(0.03, 0.23, 0.15);
    ears2.matrix.translate(-5, 1.6, -2);
    ears2.multidrawCube(1);
    //-----------------------------

    var lefteye = new Cube();
    lefteye.color = [1, 1, 1, 1];
    lefteye.matrix.translate(10, g_set_Location+0.2, 7);
    lefteye.matrix.rotate(-head_animation, 1, 0, 0);
    lefteye.matrix.scale(0.1, 0.061, 0.04);
    lefteye.matrix.translate(-1.5, 7, -13.8);
    lefteye.multidrawCube(1);

    var lefteyeblack = new Cube();
    lefteyeblack.color = [0, 0, 0, 1];
    lefteyeblack.matrix.translate(10, g_set_Location+0.2, 7);
    lefteyeblack.matrix.rotate(-head_animation, 1, 0, 0);
    lefteyeblack.matrix.scale(0.05, 0.061, 0.04);
    lefteyeblack.matrix.translate(-2.5, 7, -14.3);
    lefteyeblack.multidrawCube(1);

    var righteye = new Cube();
    righteye.color = [1, 1, 1, 1];
    righteye.matrix.translate(10, g_set_Location+0.2, 7);
    righteye.matrix.rotate(-head_animation, 1, 0, 0);
    righteye.matrix.scale(0.1, 0.061, 0.04);
    righteye.matrix.translate(0.05, 7, -13.8);
    righteye.multidrawCube(1);

    var righteyeblack = new Cube();
    righteyeblack.color = [0, 0, 0, 1];
    righteyeblack.matrix.translate(10, g_set_Location+0.2, 7);
    righteyeblack.matrix.rotate(-head_animation, 1, 0, 0);
    righteyeblack.matrix.scale(0.05, 0.061, 0.04);
    righteyeblack.matrix.translate(0.7, 7, -14.3);
    righteyeblack.multidrawCube(1);

    var mouth1 = new Cube();
    mouth1.color = [181/255,101/255,30/255,1];
    mouth1.matrix.translate(10, g_set_Location+0.2, 7);
    mouth1.matrix.rotate(0, 1, 0, 0);
    mouth1.matrix.rotate(-head_animation, 1, 0, 0);
    mouth1.matrix.scale(0.175, 0.1, 0.175);
    mouth1.matrix.translate(-0.65, 2.8, -3.4);
    mouth1.multidrawCube(1);

    var frontleftleg = new Cube();
    frontleftleg.color = Animal_brown;
    frontleftleg.matrix.translate(10,g_set_Location+0.2,7);
    frontleftleg.matrix.rotate(-g_Angle,1,0,0); // Joint 1
    var frontleftlegCoord = new Matrix4(frontleftleg.matrix);
    frontleftleg.matrix.scale(.1, -0.25, 0.15);
    frontleftleg.matrix.translate(-3.1, 1.2, -2);
    frontleftleg.multidrawCube(1);

    var frontrightleg = new Cube();
    frontrightleg.matrix.translate(10,g_set_Location+0.2,7);
    frontrightleg.color = Animal_brown;
    frontrightleg.matrix.rotate(g_Angle,1,0,0); // Joint 1
    var frontrightlegCoord = new Matrix4(frontrightleg.matrix);
    frontrightleg.matrix.scale(.1, -0.25, 0.15);
    frontrightleg.matrix.translate(1.4, 1.2, -2);
    frontrightleg.multidrawCube(1);

    var backleftlegs = new Cube();
    backleftlegs.color = Animal_brown;
    backleftlegs.matrix.translate(10,g_set_Location+0.2,7);
    backleftlegs.matrix.rotate(-g_Angle, 1, 0, 0); // Joint 1
    var backleftlegsCoord = new Matrix4(backleftlegs.matrix);
    backleftlegs.matrix.scale(.1, -0.25, 0.15);
    backleftlegs.matrix.translate(-3.1, 1.2, 1);
    backleftlegs.multidrawCube(1);

    var backright = new Cube();
    backright.color = Animal_brown;
    backright.matrix.translate(10,g_set_Location+0.2,7);
    backright.matrix.rotate(g_Angle, 1, 0, 0); // Joint 1
    var backrightCoord = new Matrix4(backright.matrix);
    backright.matrix.scale(.1, -0.25, 0.15);
    backright.matrix.translate(1.4, 1.2, 1);
    backright.multidrawCube(1);

    var frontleftleglow = new Cube();
    frontleftleglow.color = face_color;
    frontleftleglow.matrix.translate(10,g_set_Location+0.2,7);
    frontleftleglow.matrix = frontleftlegCoord;
    frontleftleglow.matrix.rotate(-g_Angle2, 1, 0, 0);
    frontleftleglow.matrix.scale(0.1, 0.1, 0.1);
    frontleftleglow.matrix.translate(-3.1, -6.4,-2.6);
    frontleftleglow.multidrawCube(1);

    var frontrightleglow = new Cube();
    frontrightleglow.color = face_color;
    frontrightleglow.matrix.translate(10,g_set_Location+0.2,7);
    frontrightleglow.matrix = frontrightlegCoord;
    frontrightleglow.matrix.rotate(g_Angle2, 1, 0, 0);
    frontrightleglow.matrix.scale(0.1, 0.1, 0.1);
    frontrightleglow.matrix.translate(1.4, -6.4, -2.6);
    frontrightleglow.multidrawCube(1);

    var backleftlegslow = new Cube();
    backleftlegslow.color = face_color;
    backleftlegslow.matrix.translate(10,g_set_Location+0.2,7);
    backleftlegslow.matrix = backleftlegsCoord;
    backleftlegslow.matrix.rotate(-g_Angle2, 1, 0, 0);
    backleftlegslow.matrix.scale(0.1, 0.1, 0.1);
    backleftlegslow.matrix.translate(-3.1, -6.4, 1.6);
    backleftlegslow.multidrawCube(1);

    var backrightlow = new Cube();
    backrightlow.color = face_color;
    backrightlow.matrix.translate(10,g_set_Location+0.2,7);
    backrightlow.matrix = backrightCoord;
    backrightlow.matrix.rotate(g_Angle2, 1, 0, 0);
    backrightlow.matrix.scale(0.1, 0.1, 0.1);
    backrightlow.matrix.translate(1.4, -6.4, 1.76);
    backrightlow.multidrawCube(1);

    var tails = new Cube();
    tails.color = [181/255,101/255,30/255,1]
    tails.matrix.translate(10,g_set_Location+0.2,7);
    if(Shift_and_Click){
        tails.matrix.rotate(g_tails_animation, 1, 0, 0);
    }else{
        tails.matrix.rotate(g_tails_animation, 0, 1, 0);
    }
    var TailOneCoord = new Matrix4(tails.matrix);
    tails.matrix.scale(0.15, 0.1, 0.2);
    tails.matrix.translate(-0.5, -0.6, 1.1);
    tails.multidrawCube(1);

    var second_tails = new Cube();
    second_tails.color = [175.0/255,133.0/255,92.0/255, 1];
    second_tails.matrix.translate(10,g_set_Location+0.2,7);
    second_tails.matrix = TailOneCoord;
    if(Shift_and_Click){
        second_tails.matrix.rotate(g_tails_animation, 1, 0, 0);
    }else{
        second_tails.matrix.rotate(g_tails_animation, 0, 1, 0);
    }
    var TailSecondCoord = new Matrix4(second_tails.matrix);
    second_tails.matrix.scale(0.06, 0.075, 0.15);
    second_tails.matrix.translate(-0.5, -0.6, 2.5);
    second_tails.multidrawCube(1);

}