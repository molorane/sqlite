$(document).ready(function(){
    $('#cback').click(function(){
        parent.history.back();
        return false;
    });

    $('#previous').click(function(){
            parent.history.back();
            return false;
    });


    $('#sback').click(function(){
            parent.history.back();
            return false;
    });

});