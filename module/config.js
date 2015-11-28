/**
 * Created by dinesh on 28/11/15.
 */
var mysql = require("mysql");

module.exports = (function () {

    var config = function (options) {

        options = options || {};

        this.config = new config(options);
        this.config.refId = options.refId || false;
        this.extraOptions = '';
        this.config.url = "http://127.0.0.1:8080";
        this.transactionTypes = [
            'AuthOnly', 'AuthCapture',
            'CaptureOnly', 'PriorAuthCapture',
            'Refund', 'Void'
        ];

    };

    config.initDatabase = function () {
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'hierarchy',
            multipleStatements: true
        });

        connection.connect();

        return connection;
    };

    return config;
})();