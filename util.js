this.removeDead = function(list, deadKey) {    
    for (let i = 0; i < list.length; i++) {
        if (list[i][deadKey]) {
            list.splice(i, 1);                
        }
    }
}