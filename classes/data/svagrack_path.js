Data_Factory = require("./svagrack_data_factory");
class Svagrack_Path extends Data_Class{
    constructor(){
        super()
        this.table = "svagrack_path";
        this.fields({
            name: "",
            path:""
        })
    }
}

module.exports = Svagrack_Path;