    document.addEventListener("deviceready", onDeviceReady, false);
    // Cordova is ready


    function onDeviceReady() {

        var formData = { range: null,search : null }

        var db = window.sqlitePlugin.openDatabase({
             name : "bible_data.db" , location: 'default'
        });

        $('#range').bind('click', function(){

            //clear the results page
            $('div#results h1').html("Search results");
            $('div#search-results').html('');

        });

        $(document).ready(function() {

             $("#form1").validate({
                // Specify validation rules
                rules: {
                    search_text: {
                        required: true
                    }
                },
                messages: {
                    search_text: {
                        required: "Please enter text."
                    }
                },
                errorPlacement: function (error, element) {
                    error.appendTo(element.parent().prev());
                },
                submitHandler: function (form) {

                    formData.range = $('#range').val();
                    formData.search = $('#search_text').val();

                    //clear the results page
                    $('div#results h1').html("Search results");
                    $('div#search-results').html('');

                    $('#search-results').empty();

                    $(':mobile-pagecontainer').pagecontainer('change', '#results', {
                        reload: true
                    });
                    return false;
                }

        });


        $(document).on( "pageshow", "#results", function( e ) {

           $.mobile.loading( 'show', {
                text: 'Fetching results....',
                textVisible: true,
                theme: 'a',
                html: ""
           });

           $('#sback').hide();

           var output = '';
           var found = 0;

           if(formData.range == "ot"){

                db.transaction(function (tx) {

                   tx.executeSql("SELECT COUNT(*) as freg FROM books WHERE testament='OT' and scripture LIKE ('%"+formData.search+"%')", [], function (tx, results) {
                         var len = results.rows.length;

                         if (len > 0) {
                             for (var i = 0; i < len; i++) {
                                 found = results.rows.item(i)['freg'];
                             }

                             $('div#results h1').html(found+" verses found");
                         }
                   });

                   tx.executeSql("SELECT * FROM books WHERE testament='OT' and scripture LIKE ('%"+formData.search+"%')  ORDER BY id", [], function (tx, results) {
                       var len = results.rows.length;

                       if (len > 0) {
                           for (var i = 0; i < len; i++) {

                                output += '<p style="font-size:1.5em;"><span style="font-weight:bold;color:red; font-size:.83em;">'+results.rows.item(i)['book']+' '+results.rows.item(i)['chapter']+':'+results.rows.item(i)['verse']+'</span> <br/>'+results.rows.item(i)['scripture']+ '<hr/></p>';
                           }

                           $.mobile.loading('hide');
                           $('#sback').show();
                           $('#search-results').html(output);

                       }
                   });

               });

           }

           if(formData.range == "nt"){

               db.transaction(function (tx) {

                  tx.executeSql("SELECT COUNT(*) as freg FROM books WHERE testament='NT' and scripture LIKE ('%"+formData.search+"%')", [], function (tx, results) {
                        var len = results.rows.length;

                        if (len > 0) {
                            for (var i = 0; i < len; i++) {
                                found = results.rows.item(i)['freg'];
                            }

                            $('div#results h1').html(found+" verses found");
                        }
                  });

                  tx.executeSql("SELECT * FROM books WHERE testament='NT' and scripture LIKE ('%"+formData.search+"%')  ORDER BY id", [], function (tx, results) {
                      var len = results.rows.length;

                      if (len > 0) {
                          for (var i = 0; i < len; i++) {

                               output += '<p style="font-size:1.5em;"><span style="font-weight:bold;color:red; font-size:.83em;">'+results.rows.item(i)['book']+' '+results.rows.item(i)['chapter']+':'+results.rows.item(i)['verse']+'</span> <br/>'+results.rows.item(i)['scripture']+ '<hr/></p>';
                          }

                          $.mobile.loading('hide');
                          $('#sback').show();
                          $('#search-results').html(output);

                      }
                  });

              });

          }


        });


    });
}