function foward(distance){
    var game_object;
    game_object=find_sprite_object_by_name(current_sprite_name);

    var angle_radians=game_object.sprite.rotation;//angle*Math.PI/180;//converts degrees to radians
    angle_radians=angle_radians*-1;
    var newx=game_object.sprite.x+distance*Math.cos(angle_radians);
    var newy=game_object.sprite.y-distance*Math.sin(angle_radians);
    game_object.sprite.x=newx;
    game_object.sprite.y=newy;		
    update_position_of_frames(game_object);
}

function turn_right(degrees) {
    var game_object;
    game_object=find_sprite_object_by_name(current_sprite_name);

    game_object.sprite.angle=game_object.sprite.angle+degrees;
    update_position_of_frames(game_object);
}

function turn_left(degrees) {
    var game_object;
    game_object=find_sprite_object_by_name(current_sprite_name);

    game_object.sprite.angle=game_object.sprite.angle-degrees;
    update_position_of_frames(game_object);
}

///////

function update_position_of_frames(game_Object) {
    for(frame in game_Object.frames) {
        game_Object.frames[frame].sprite.x=game_Object.sprite.x;
        game_Object.frames[frame].sprite.y=game_Object.sprite.y;
        game_Object.frames[frame].sprite.angle=game_Object.sprite.angle;
    }
}

function find_sprite_object_by_name(sprite_name,original_sprite) {		
    //remember to show an error if no sprite name is given
    if(sprite_name=="") {
        //bug, this error does not go away cause we cant get rid of the block unless we reload the page, need to domehow get rid of just the previous block, some kind of undo or some other way to only show this message once, then set a timer for a time to not constantly nag the user
        return null;
        //try adding if(evalrun) here 
        //alert("Error, no sprite name given, you probably need to select a current sprite using the Sprites->set current sprite block");
    }
    for(var obj in sprites){
        if(sprites[obj].name==sprite_name) {
            if(current_clone!=null) {
                //quickfix for when a clone is set but we are really looking for another sprite which has no clones,
                //in sprite collision detection
                //not this wont work well if we are actually looking for hte clones of the target, but that is not what I
                //think we have in mind, at least in space invaders
                //it should work if the target has clones, so may work anyway
                //a sideeffect of this is that the bullet gets hidden when I am just trying to hide the alines.
                
                if(sprites[obj].clones.length==0){
                    return sprites[obj];
                }
                //end quickfix
                return sprites[obj].clones[current_clone];
                //return sprites[obj];
            }else{
                return sprites[obj];
            }				
        }
    }
}