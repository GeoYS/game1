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