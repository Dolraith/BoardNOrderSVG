/* global global */
Data_Class = require(global.classPaths.data_super);
class Svagrack_Path_Tag_Map extends Data_Class{
    constructor(){
        super();
        this.table = "svagrack_path_tag_map";
        this.fields({
            svagrack_path_id:0,
            svagrack_tag_id:0
        });
    }
}

module.exports = Svagrack_Path_Tag_Map;