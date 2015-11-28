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

    return common;
})();