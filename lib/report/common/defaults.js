/*
 Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

var Report  = require('../index');
var supportsColor = require('supports-color');

module.exports = {
    watermarks: function () {
        return {
            statements: [ 50, 80 ],
            lines: [ 50, 80 ],
            functions: [ 50, 80],
            branches: [ 50, 80 ]
        };
    },

    classFor: function (type, metrics, watermarks) {
        var mark = watermarks[type],
            value = metrics[type].pct;
        return value >= mark[1] ? 'high' : value >= mark[0] ? 'medium' : 'low';
    },

    colorize: function (str, clazz) {
        /* istanbul ignore if: untestable in batch mode */
        if (supportsColor) {
            switch (clazz) {
                case 'low' : str = '\x1B[91m' + str + '\x1B[0m'; break;
                case 'medium': str = '\x1B[93m' + str + '\x1B[0m'; break;
                case 'high': str = '\x1B[92m' + str + '\x1B[0m'; break;
            }
        }
        return str;
    },

    defaultReportConfig: function () {
        var cfg = {};
        Report.getReportList().forEach(function (type) {
            var rpt = Report.create(type),
                c = rpt.getDefaultConfig();
            if (c) {
                cfg[type] = c;
            }
        });
        return cfg;
    }
};

