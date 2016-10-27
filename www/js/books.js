
    document.addEventListener("deviceready", onDeviceReady, false);
    // Cordova is ready


    function onDeviceReady() {

        $(document).ready(function() {
                var db = null;

                // Wait for Cordova to load
                //

                db = window.sqlitePlugin.openDatabase({
                     name : "bible_data.db" , location: 'default'
                });


               db.transaction(function (tx) {

                    var output = '';

                    tx.executeSql("SELECT DISTINCT book FROM books WHERE testament='OT' ORDER BY id", [], function (tx, results) {
                        var len = results.rows.length;

                        output += '<li data-role="list-divider" data-theme="d">Testamente ea khale</li>';

                        if (len > 0) {
                            for (var i = 0; i < len; i++) {
                                output += '<li><a  href="#" data-transition="slide">' + results.rows.item(i)['book'] + '</a></li>';
                            }
                        }
                    });


                    tx.executeSql("SELECT DISTINCT book FROM books WHERE testament='NT' ORDER BY id", [], function (tx, results) {
                        var len = results.rows.length;

                        output += '<li data-role="list-divider" data-theme="d">Testamente e ncha</li>';

                        if (len > 0) {
                            for (var i = 0; i < len; i++) {
                                output += '<li><a  href="#" data-transition="slide">' + results.rows.item(i)['book'] + '</a></li>';
                            }
                        }


                        $('#listLibuka').listview();
                        $('#listLibuka').html(output).listview("refresh");

                    });

                });

       });
    }