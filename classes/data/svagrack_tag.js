/* global global */
Data_Class = require(global.classPaths.data_super);
class Svagrack_Tag extends Data_Class{
    constructor(){
        super();
        this.table = "svagrack_tag";
        this.fields({
            name: ""
        });
    }
}

module.exports = Svagrack_Tag;