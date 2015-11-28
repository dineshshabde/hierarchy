/**
 * Created by dinesh on 28/11/15.
 */
module.exports = (function () {

    var common = function (options) {

        options = options || {};

        this.common = new common(options);
        this.common.refId = options.refId || false;
        this.extraOptions = '';
        this.transactionTypes = [
            'AuthOnly', 'AuthCapture',
            'CaptureOnly', 'PriorAuthCapture',
            'Refund', 'Void'
        ];

    };

    common.getCategories = function () {
        var selectCategoryQuery = "SELECT child.*, CONCAT( REPEAT ( ' - ', (COUNT(child.category_id) - 1)), child.product_name ) AS t FROM nested_category AS child, nested_category AS parent WHERE child.lft BETWEEN parent.lft AND parent.rgt GROUP BY child.category_id";
        var deferred = Q.defer();

        query = db.query(selectCategoryQuery, deferred.makeNodeResolver());

        return deferred.promise;
        //db.query(selectCategoryQuery, function (err, rows, fields) {
        //    if (err) throw err;
        //
        //    console.log('The solution is: ', rows);
        //}, deferred.resolve);
        //return deferred.promise;
    };

    return common;
})();