
    document.addEventListener("deviceready", onDeviceReady, false);
    // Cordova is ready


    function onDeviceReady() {


        var passDataObject = { book: null,chapter : 1 }
        var db = null;



        db = window.sqlitePlugin.openDatabase({
             name : "bible_data.db" , location: 'default'
        });

        $(document).on( "pageinit", "#libuka", function( e ) {

            $(this).find('#listLibuka li a').unbind('click').click(function(e) {
                passDataObject.book = $(this).text();
                $.mobile.changePage('#chapters', { transition: 'slide'} );
            });

        });

        $(document).on('click', '#chapter li a', function(e){
            passDataObject.chapter = $(this).text();
            $.mobile.changePage('#read', { transition: 'slide'} );
        });

        $(document).on( "pagebeforeshow", "#chapters", function( e ) {

            $('div#chapters h1').html(passDataObject.book);

            $(this).find('#chapter li a').unbind('click').click(function(e) {
                passDataObject.chapter = $(this).text();
                $.mobile.changePage('#chapters', { transition: 'slide'} );
            });


           db.transaction(function (tx) {

                tx.executeSql("SELECT DISTINCT chapter FROM books WHERE book='"+passDataObject.book+"' ORDER BY id", [], function (tx, results) {
                    var len = results.rows.length;
                    var output = '';

                    if (len > 0) {
                        for (var i = 0; i < len; i++) {
                            output += '<li><a href="#">' + results.rows.item(i)['chapter'] + '</a></li>';
                        }

                        $('#chapter').listview();

                        $('#chapter').html(output).listview("refresh");
                    }
                });
            });

        });


        $(document).on( "pagebeforeshow", "#read", function( e ) {

            $('div#read h1').html(passDataObject.book+' '+passDataObject.chapter);

            db.transaction(function (tx) {

                tx.executeSql("SELECT * FROM books WHERE book='"+passDataObject.book+"' AND chapter='"+passDataObject.chapter+"' ORDER BY id", [], function (tx, results) {
                    var len = results.rows.length;

                    var output = '';

                    if (len > 0) {
                        for (var i = 0; i < len; i++) {
                            output += '<p style="font-size:1.5em;"><span style="font-weight:bold;color:red; font-size:.83em;">'+results.rows.item(i)['verse']+'</span> '+results.rows.item(i)['scripture']+ '<hr/></p>';
                        }

                        $('#s-read').html(output);
                    }
                });
            });

        });


    }