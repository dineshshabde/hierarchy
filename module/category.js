/**
 * Created by dinesh on 28/11/15.
 */
module.exports = (function () {

    var category = function (options) {

        options = options || {};

        this.category = new category(options);
        this.category.refId = options.refId || false;
        this.extraOptions = '';
        this.transactionTypes = [
            'AuthOnly', 'AuthCapture',
            'CaptureOnly', 'PriorAuthCapture',
            'Refund', 'Void'
        ];

    };

    /**
     * Selects category from database along with one column for formatted view
     * @returns {*|promise}
     */
    category.getCategories = function () {
        var selectCategoryQuery = "SELECT child.*, CONCAT( REPEAT ( ' - ', (COUNT(child.category_id) - 1)), child.category_name ) AS t FROM nested_category AS child, nested_category AS parent WHERE child.lft BETWEEN parent.lft AND parent.rgt GROUP BY child.category_id ORDER BY child.lft;";
        var deferred = Q.defer();
        query = db.query(selectCategoryQuery, deferred.makeNodeResolver());
        return deferred.promise;
    };

    /**
     * Inserts a node as child category for the specified parent category ID
     * @param req
     * @returns {*|promise}
     */
    category.addCategory = function (req) {
        var parent_category_id = (typeof(req.body.parent_category_id) == "undefined") ? 0 : req.body.parent_category_id;
        var category_name = (typeof(req.body.category_name) == "undefined") ? 0 : req.body.category_name;
        var selectCategoryQuery = "LOCK TABLE nested_category WRITE;" +
            "SELECT @myLeft := lft FROM nested_category WHERE category_id = " + parent_category_id + ";" +
            "UPDATE nested_category SET rgt = rgt + 2 WHERE rgt > @myLeft;" +
            "UPDATE nested_category SET lft = lft + 2 WHERE lft > @myLeft;" +
            "INSERT INTO nested_category(category_name, lft, rgt, parent_category_id) VALUES('" + category_name + "', @myLeft + 1, @myLeft + 2, " + parent_category_id + ");" +
            "UNLOCK TABLES;";
        var deferred = Q.defer();
        query = db.query(selectCategoryQuery, deferred.makeNodeResolver()).on('error', function (err) {
            console.error(err);
        });
        return deferred.promise;
    };

    /**
     * Removes category or sub category for the given category ID
     * @param req
     * @returns {*|promise}
     */
    category.removeCategory = function (req) {
        var category_id = (typeof(req.params.category_id) == "undefined") ? 0 : req.params.category_id;
        var deleteCategoryQuery = "LOCK TABLE nested_category WRITE;" +
            "SELECT @myLeft := lft, @myRight := rgt, @myWidth := rgt - lft + 1 FROM nested_category WHERE category_id = " + category_id + ";" +
            "DELETE FROM nested_category WHERE lft BETWEEN @myLeft AND @myRight;" +
            "UPDATE nested_category SET rgt = rgt - @myWidth WHERE rgt > @myRight;" +
            "UPDATE nested_category SET lft = lft - @myWidth WHERE lft > @myRight;" +
            "UNLOCK TABLES;";
        var deferred = Q.defer();
        query = db.query(deleteCategoryQuery, deferred.makeNodeResolver()).on('error', function (err) {
            console.error(err);
        });
        return deferred.promise;
    };

    return category;
})();