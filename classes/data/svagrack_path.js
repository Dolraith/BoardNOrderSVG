Data_Class = require(global.classPaths.data_super)
class Svagrack_Path extends Data_Class{
    constructor(){
        super()
        this.table = "svagrack_path";
        this.fields({
            path:"",
            svagrack_folder_id:0
        })
    }
}

module.exports = Svagrack_Path;