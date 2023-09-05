Data_Class = require(global.classPaths.data_super)
class Svagrack_Folder extends Data_Class{
    constructor(){
        super()
        this.table = "svagrack_folder";
        this.fields({
            path: "",
            last_scan:null
        })
    }
}

module.exports = Svagrack_Folder;