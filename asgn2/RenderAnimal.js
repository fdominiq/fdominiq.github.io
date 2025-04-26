// Assignment 2
// Faith Dominique

function drawAnimal() {
    var Animal_brown = [196.0/255, 164.0/255, 132.0/255, 1];
    var head_front_coords_x = -0.5;
    var head_front_coords_y = 0.55;
    var head_front_coords_z = -1.5;
    var face_color = [1, .9, .65, 1.0];

    var body = new Cube();
    //body.color = [200.0/255, 160.0/255, 132.0/255, 1];
    body.color = [154.0/255, 130.0/255, 108.0/255, 1];
    body.matrix.scale(0.7, 0.4, 1.2);
    body.matrix.translate(-0.5, -0.4, -0.5);
    body.render();

    var head = new Cube();
    head.color = Animal_brown;
    head.matrix.rotate(-head_motion, 1, 0, 0);
    head.matrix.scale(0.4, 0.4, 0.4);
    head.matrix.translate(head_front_coords_x,head_front_coords_y-0.3,head_front_coords_z+0.05);
    head.render();

    //--------------------------
    if (Shift_and_Click) {
         var head_top = new Cube();
         head_top.color =[175.0/255,133.0/255,92.0/255, 1];
         head_top.matrix.rotate(-30*Math.sin(g_seconds*4), 0, 1, 0);
    }
    else {
         var head_top = new Cube();
         head_top.color =[175.0/255,133.0/255,92.0/255, 1];
         head_top.matrix.rotate(-head_motion, 1, 0, 0);
    }
    head_top.matrix.scale(0.5, 0.3, 0.5);  //
    head_top.matrix.translate(head_front_coords_x,head_front_coords_y+1.0,head_front_coords_z+0.25);
    head_top.render();
    //-------- Ears ------------------
    if (Shift_and_Click) {
         var ears1 = new Cube();
         ears1.color =[154.0/255,130.0/255,108.0/255, 1];
         ears1.matrix.rotate(-30*Math.sin(g_seconds*4), 0, 1, 0);
    } else {
         var ears1 = new Cube();
         ears1.color =[154.0/255,130.0/255,108.0/255, 1];
         ears1.matrix.rotate(-head_motion, 1, 0, 0);
         if (g_EarAnimation) {
           ears1.matrix.rotate(6*Math.sin(g_seconds), 0, 1, 0);
         }
    }
    ears1.matrix.scale(0.03, 0.23, 0.15);
    ears1.matrix.translate(head_front_coords_x-6.6,head_front_coords_y+2.1,head_front_coords_z-1);
    ears1.render();

    if (Shift_and_Click) {
         var ears2 = new Cube();
         ears2.color =[154.0/255,130.0/255,108.0/255, 1];
         ears2.matrix.rotate(-30*Math.sin(g_seconds*4), 0, 1, 0);
    } else {
         var ears2 = new Cube();
         ears2.color =[154.0/255,130.0/255,108.0/255, 1];
         ears2.matrix.rotate(-head_motion, 1, 0, 0);
         if (g_EarAnimation) {
            ears2.matrix.rotate(-6*Math.sin(g_seconds), 0, 1, 0);
         }
    }
    ears2.matrix.scale(0.03, 0.23, 0.15);
    ears2.matrix.translate(head_front_coords_x+6.6,head_front_coords_y+2.1,head_front_coords_z-1);
    ears2.render();

    //--------------------------
    if (Shift_and_Click) {
       var tophair = new Cube();
       tophair.color = Animal_brown;
       tophair.matrix.rotate(-30*Math.sin(g_seconds*4), 0, 1, 0);
    } else {
       var tophair = new Cube();
       tophair.color = Animal_brown;
       tophair.matrix.rotate(-head_motion, 1, 0, 0);
    }
    tophair.matrix.scale(0.4, 0.075, 0.04);
    tophair.matrix.translate(-0.5, 7.8, -16.5);
    tophair.render();

    if (Shift_and_Click) {
       var left_hair = new Cube();
       left_hair.color = Animal_brown;
       left_hair.matrix.rotate(-30*Math.sin(g_seconds*4), 0, 1, 0);
    } else {
       var left_hair = new Cube();
       left_hair.color = Animal_brown;
       left_hair.matrix.rotate(-head_motion, 1, 0, 0);
    }
    left_hair.matrix.scale(0.05, 0.071, 0.04);
    left_hair.matrix.translate(-4, 7.3, -16.5);
    left_hair.render();

    if (Shift_and_Click) {
       var botrighthair = new Cube();
       botrighthair.color = Animal_brown;
       botrighthair.matrix.rotate(-30*Math.sin(g_seconds*4), 0, 1, 0);
    } else {
       var botrighthair = new Cube();
       botrighthair.color = Animal_brown;
       botrighthair.matrix.rotate(-head_motion, 1, 0, 0);
    }
    botrighthair.matrix.scale(0.05, 0.071, 0.04);
    botrighthair.matrix.translate(3, 7.3, -16.5);
    botrighthair.render();

    //----------------------------------------------
    // Eyes
    if (Shift_and_Click) {
       var lefteye1 = new Cube();
       lefteye1.color = [1,1,1,1];
       lefteye1.matrix.rotate(-30*Math.sin(g_seconds*4), 0, 1, 0);
    } else {
       var lefteye1 = new Cube();
       lefteye1.color = [1,1,1,1];
       lefteye1.matrix.rotate(-head_motion, 1, 0, 0);
    }
    lefteye1.matrix.scale(0.1, 0.061, 0.04);
    lefteye1.matrix.translate(-2.0, 7+4, -16.2);
    lefteye1.render();

    if (Shift_and_Click) {
       var lefteyeblack1 = new Cube();
       lefteyeblack1.color = [0, 0, 0, 1];
       lefteyeblack1.matrix.rotate(-30*Math.sin(g_seconds*4), 0, 1, 0);
    } else {
       var lefteyeblack1 = new Cube();
       lefteyeblack1.color = [0, 0, 0, 1];
       lefteyeblack1.matrix.rotate(-head_motion, 1, 0, 0);
    }
    lefteyeblack1.matrix.scale(0.05, 0.061, 0.04);
    lefteyeblack1.matrix.translate(-3.5, 7+4, -16.5);
    lefteyeblack1.render();

    if (Shift_and_Click) {
       var righteye1 = new Cube();
       righteye1.color = [1, 1, 1, 1];
       righteye1.matrix.rotate(-30*Math.sin(g_seconds*4), 0, 1, 0);
    } else {
       var righteye1 = new Cube();
       righteye1.color = [1, 1, 1, 1];
       righteye1.matrix.rotate(-head_motion, 1, 0, 0);
    }
    righteye1.matrix.scale(0.1, 0.061, 0.04);
    righteye1.matrix.translate(1.0, 7+4, -16.2);
    righteye1.render();

    if (Shift_and_Click) {
       var righteyeblack1 = new Cube();
       righteyeblack1.color = [0, 0, 0, 1];
       righteyeblack1.matrix.rotate(-30*Math.sin(g_seconds*4), 0, 1, 0);
    } else {
       var righteyeblack1 = new Cube();
       righteyeblack1.color = [0, 0, 0, 1];
       righteyeblack1.matrix.rotate(-head_motion, 1, 0, 0);
    }
    righteyeblack1.matrix.scale(0.05, 0.061, 0.04);
    righteyeblack1.matrix.translate(2.5, 7+4, -16.5);
    righteyeblack1.render();

    // ----- Snout ------------------------------------
    if (Shift_and_Click) {
     var mouth1 = new Cube();
     mouth1.color = [181/255,101/255,30/255,1];
     mouth1.matrix.rotate(-30*Math.sin(g_seconds*4), 0, 1, 0);
    }
    else {
     var mouth1 = new Cube();
     mouth1.color = [181/255,101/255,30/255,1];
     mouth1.matrix.rotate(0, 1, 0, 0);
     mouth1.matrix.rotate(-head_motion, 1, 0, 0);
    }
    mouth1.matrix.scale(0.175, 0.1, 0.175);
    mouth1.matrix.translate(-0.47, 5.0, -4.5);
    mouth1.render()

    var snout_front = new Triangular_pyramid();
    snout_front.color = [172.0/255,147.0/255,98.0/255, 1];
    if (Shift_and_Click) {
       snout_front.matrix.rotate(-30*Math.sin(g_seconds*4), 0, 1, 0);
       snout_front.matrix.rotate(-180,1,0,0);
    } else {
       snout_front.matrix.rotate(-180,1,0,0);
       snout_front.matrix.rotate(-head_motion, 1, 0, 0);
    }
    snout_front.matrix.scale(0.9, 0.1, 0.06);
    snout_front.matrix.translate(-0.495, -6, 13.0);
    snout_front.render();

    var snout_top = new Triangular_pyramid();
    snout_top.color = [175.0/255,133.0/255,92.0/255, 1];
    if (Shift_and_Click) {
       snout_top.matrix.rotate(-30*Math.sin(g_seconds*4), 0, 1, 0);
       snout_top.matrix.rotate(270,1,0,0);
    } else {
       snout_top.matrix.rotate(270,1,0,0);
       snout_top.matrix.rotate(-head_motion, 1, 0, 0);
    }
    snout_top.matrix.scale(0.7, 0.2, 0.06);
    snout_top.matrix.translate(-0.495, 3.2, 10.0);
    snout_top.render();
    //---------------------------------------------
    var frontleftleg = new Cube();
    frontleftleg.color = Animal_brown;
    frontleftleg.matrix.setTranslate(0,0, 0);
    frontleftleg.matrix.rotate(-g_Angle,1,0,0); // Joint 1
    var frontleftlegCoord = new Matrix4(frontleftleg.matrix);
    frontleftleg.matrix.scale(.15, -0.35, 0.15);
    frontleftleg.matrix.translate(-2.6, 0.15, -3.0);
    frontleftleg.render();

    var frontrightleg = new Cube();
    frontrightleg.color = Animal_brown;
    frontrightleg.matrix.setTranslate(0, 0, 0);
    frontrightleg.matrix.rotate(g_Angle,1,0,0); // Joint 1
    var frontrightlegCoord = new Matrix4(frontrightleg.matrix);
    frontrightleg.matrix.scale(.15, -0.35, 0.15);
    frontrightleg.matrix.translate(1.5, 0.15, -3.0);
    frontrightleg.render();

    var backleftlegs = new Cube();
    backleftlegs.color = Animal_brown;
    backleftlegs.matrix.setTranslate(0, 0, 0);
    backleftlegs.matrix.rotate(-g_Angle, 1, 0, 0); // Joint 1
    var backleftlegsCoord = new Matrix4(backleftlegs.matrix);
    backleftlegs.matrix.scale(.15, -0.35, 0.15);
    backleftlegs.matrix.translate(-2.6, 0.15, 3.0);
    backleftlegs.render();
    
    var backrightleg = new Cube();
    backrightleg.color = Animal_brown;
    backrightleg.matrix.setTranslate(0, 0, 0);
    backrightleg.matrix.rotate(g_Angle, 1, 0, 0); // Joint 1
    var backrightlegCoord = new Matrix4(backrightleg.matrix);
    backrightleg.matrix.scale(.15, -0.35, 0.15);
    backrightleg.matrix.translate(1.5, 0.15, 3.0);
    backrightleg.render();

    var frontleftleglow = new Cube();
    frontleftleglow.color = face_color;
    frontleftleglow.matrix = frontleftlegCoord;
    frontleftleglow.matrix.rotate(-g_Angle2, 1, 0, 0);
    frontleftleglow.matrix.scale(0.1, 0.3, 0.1);
    //frontleftleglow.matrix.translate(-3.0, -2.2, -4.4);
    frontleftleglow.matrix.translate(-3.6, -2.2, -4.4);
    frontleftleglow.render();

    //-----Paws. has to come after front left leg low----------
    var frontleftpaw = new Cube();
    frontleftpaw.color = Animal_brown;
    frontleftpaw.matrix = frontleftlegCoord;
    frontleftpaw.matrix.rotate(-g_Angle2, 1, 0, 0);
    frontleftpaw.matrix.scale(0.95, 0.1, 1.6);
    frontleftpaw.matrix.translate(-0.0, -0.75, -0.35);
    frontleftpaw.render();
    //------------------
    var frontrightleglow = new Cube();
    frontrightleglow.color = face_color;
    frontrightleglow.matrix = frontrightlegCoord;
    frontrightleglow.matrix.rotate(g_Angle2, 1, 0, 0);
    frontrightleglow.matrix.scale(0.1, 0.3, 0.1);
    frontrightleglow.matrix.translate(2.4, -2.2, -4.4);
    //frontrightleglow.matrix.translate(2.0, -2.2, -4.4);
    frontrightleglow.render(); //fine

    //-----Paws. has to come after front right leg low----
    var frontrightpaw = new Cube();
    frontrightpaw.color = Animal_brown;
    frontrightpaw.matrix = frontrightlegCoord;
    frontrightpaw.matrix.rotate(g_Angle2, 1, 0, 0);
    frontrightpaw.matrix.scale(0.95, 0.1, 1.6);
    frontrightpaw.matrix.translate(-0.0, -0.75, -0.35);
    frontrightpaw.render();
    //------------------
    var backleftlegslow = new Cube();
    backleftlegslow.color = face_color;
    backleftlegslow.matrix = backleftlegsCoord;
    backleftlegslow.matrix.rotate(-g_Angle2*1.5, 1, 0, 0);
    backleftlegslow.matrix.scale(0.1, 0.3, 0.1); //y=0.2
    //backleftlegslow.matrix.translate(-4.0, -2.2, 4.8);
    backleftlegslow.matrix.translate(-3.6, -2.2, 4.8);
    backleftlegslow.render();  //fine

    //-----Paws. has to come after back left leg low----------
    var backleftpaw = new Cube();    
    backleftpaw.color = Animal_brown;
    backleftpaw.matrix = backleftlegsCoord;
    backleftpaw.matrix.rotate(-g_Angle2, 1, 0, 0);
    backleftpaw.matrix.scale(0.95, 0.1, 1.6);
    backleftpaw.matrix.translate(-0.0, -0.75, -0.35);
    backleftpaw.render();
    //------------------
    var backrightleglow = new Cube();
    backrightleglow.color = face_color;
    backrightleglow.matrix = backrightlegCoord;
    backrightleglow.matrix.rotate(g_Angle2*1.5, 1, 0, 0);
    backrightleglow.matrix.scale(0.1, 0.3, 0.1);
    backrightleglow.matrix.translate(2.45, -2.2, 4.8);
    //backrightleglow.matrix.translate(2.25, -2.2, 4.8);
    backrightleglow.render(); //fine

    //-----Paws. has to come after back right leg low----
    var backrightpaw = new Cube();
    backrightpaw.color = Animal_brown;
    backrightpaw.matrix = backrightlegCoord;
    backrightpaw.matrix.rotate(g_Angle2, 1, 0, 0);
    backrightpaw.matrix.scale(0.95, 0.1, 1.6);
    backrightpaw.matrix.translate(-0.0, -0.75, -0.35);
    backrightpaw.render();
    //------------------
    var tails = new Cube();
    tails.color = [181/255,101/255,30/255,1];
    tails.matrix.setTranslate(0.0, -0.1, 0.35);
    if(Shift_and_Click){
        g_tails_wagging = 10 * Math.sin(g_seconds);
        tails.matrix.rotate(g_tails_wagging, 1, 0, 0);
    }else{
        tails.matrix.rotate(g_tails_wagging, 0, 1, 0);
    }
    var TailOneCoord = new Matrix4(tails.matrix);
    tails.matrix.scale(0.2, 0.2, 0.2);
    tails.matrix.translate(-0.5, 0.6, 1.1);
    tails.render();

    var second_tails = new Cube();
    second_tails.color = [175.0/255,133.0/255,92.0/255, 1];
    second_tails.matrix = TailOneCoord;
    if (Shift_and_Click) {
        g_tails_wagging = 10 * Math.sin(g_seconds);
        second_tails.matrix.rotate(g_tails_wagging/8.0, 0,1, 0);
    } else {
        second_tails.matrix.rotate(g_tails_wagging/8.0, 1, 0, 0);
    }
    var TailSecondCoord = new Matrix4(second_tails.matrix);
    second_tails.matrix.scale(0.1, 0.15, 0.15);
    second_tails.matrix.translate(-0.5, 1, 2.5);
    second_tails.render();

    var third_tails = new Triangular_pyramid();
    third_tails.color = [172.0/255,147.0/255,98.0/255, 1];
    third_tails.matrix = TailSecondCoord;
    if (Shift_and_Click) {
        g_tails_wagging = 10 * Math.sin(g_seconds);
        third_tails.matrix.rotate(g_tails_wagging/8.0, 0, 1, 0);
    } else {
        third_tails.matrix.rotate(g_tails_wagging/8.0, 1, 0, 0);
    }
    third_tails.matrix.scale(0.13, 0.13, 0.23);
    third_tails.matrix.translate(-0.5, 1.2, 2.0);
    third_tails.render();
    
    // Check for head scanning poke animation time
    if (Shift_and_Click) {
       g_headscan +=1;   
       if (g_headscan > 100) {
            g_headscan = 0;    
            Shift_and_Click = false;
       } 
    }

}