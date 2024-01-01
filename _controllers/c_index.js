/* global global */
Data_Factory = require("../../feather_core/classes/data_factory");
Svagrack_Path = require("./../classes/data/svagrack_path");
Svagrack_Tag = require("./../classes/data/svagrack_tag");
Svagrack_Path_Tag_Map = require("../classes/data/svagrack_path_tag_map");


var Controller = require(global.classPaths.controller);

class CIndex extends Controller {
    async index(){
        var paths = await new Data_Factory(Svagrack_Path).many_query("",true);
        var tags = await new Data_Factory(Svagrack_Tag).many_query("", true);
        var mappings = await new Data_Factory(Svagrack_Path_Tag_Map).many_query("",true);
        this.setViewData("paths",paths);
        this.setViewData("tags",tags);
        this.setViewData("mappings",mappings);
        this.setView('modules/BoardNOrderSVG/_views/v_index');
    }

    async getImage(){
        var path = await new Data_Factory(Svagrack_Path).id(this._request.query.pathId);
        this.sendFile(decodeURI(path.get("path")));
    }

    async tagPath(){
        var path_id = this._request.body.path;
        var tag_id = this._request.body.tag;
        var mapping = (new Data_Factory(Svagrack_Path_Tag_Map)).make();
        mapping.set("svagrack_path_id",path_id);
        mapping.set("svagrack_tag_id",tag_id);
        var resultId = await mapping.save();
        this.setView({message:"Saved!", success:true, _id:resultId});
    }
    async untagPath(){
        var mappingId = this._request.body.mappingId;
        var factory = new Data_Factory(Svagrack_Path_Tag_Map);
        var success = await factory.delete(mappingId);
        this.setView({message:"Deleted!", success: success});
    }
    async queryPathMapping(){
        var tagQuery = this._request.body.tagQuery;
        var factory = new Data_Factory(Svagrack_Path);
        var fullQuery = "select svagrack_path.*,svagrack_path_tag_map.svagrack_tag_id from svagrack_path join svagrack_path_tag_map on svagrack_path._id = svagrack_path_tag_map.svagrack_path_id where " + tagQuery;
        var results = await factory.direct_query(fullQuery);
        this.setView({success:true,paths:results});
    }
    async getAllPaths(){
        var paths = await new Data_Factory(Svagrack_Path).many_query("",true);
        this.setView({success:true,paths:paths});
    }
}
module.exports=CIndex;