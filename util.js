this.removeDead = function(list, deadKey) {    
    for (let i = 0; i < list.length; i++) {
        if (list[i][deadKey]) {
            list.splice(i, 1);                
        }
    }
}

this.guid = function() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

this.logDebug = function(logMsg, dbgLevel) {
    if(dbgLevel <= debugLevel) {
        var prefix = "";
        switch(dbgLevel) {
            case ERROR_LOG_LEVEL: prefix = "LOG_ERROR: "; break;
            case WARNING_LOG_LEVEL: prefix = "LOG_WARNING: "; break;
            case INFO_LOG_LEVEL: prefix = "LOG_INFO: "; break;
            case VERBOSE_LOG_LEVEL: prefix = "LOG_VERBOSE: "; break;
            case VERYVERBOSE_LOG_LEVEL: prefix = "LOG_VERYVERBOSE: "; break;
            default: prefix = "LOG_UNKNOWN: "; break;
        }

        console.log(prefix + logMsg);
    }
}