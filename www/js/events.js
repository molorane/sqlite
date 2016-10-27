
$(document).ready(function() {

    
    $('#nt_list').children('li a').on('click', function () {

       selected_book = $(this).attr('data-name');

       $('#n_book').val(selected_book);

       alert(selected_book);

    });


    $('#ot_list').children('li a').on('click', function () {

       selected_book = $(this).attr('data-name');

       $('#n_book').val(selected_book);

       alert(selected_book);

    });

});

