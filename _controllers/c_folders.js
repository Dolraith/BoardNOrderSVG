/* global global */
Controller = require(global.classPaths.controller);
Data_Factory = require("../../feather_core/classes/data_factory");
Svagrack_Folder = require("./../classes/data/svagrack_folder");
Svagrack_Path = require("./../classes/data/svagrack_path");
var fs = require('fs');
var path = require('path');
var moment = require('moment');

class CFodlers extends Controller {
    factory;
    fileTypes = ['.svg','.png','.jpg','.bmp'];
    async index(){
        var factory = new Data_Factory(Svagrack_Folder);
        this.setView('modules/BoardNOrderSVG/_views/v_folders');
        var folders = await factory.many_query("",true);
        var paths = await new Data_Factory(Svagrack_Path).many_query("", true);
        for(var folder of folders){
            folder.count = 0;
        }
        for(var path of paths){
            for(var folder of folders){
                if(path.svagrack_folder_id === folder._id){
                    folder.count++;
                }
            }
        }
        this.setViewData("folders",folders);
    }

    async addFolder(){
        var factory = new Data_Factory(Svagrack_Folder);
        var path = this._request.body.path;
        var folder = factory.make();
        folder.set("path",path);
        folder.set("last_scan","1000-01-01 00:00:00.000000");
        var resultId = await folder.save();
        this.setView({message:"Saved!", success:true, _id:resultId});
    }

    async removeFolder(){
        var factory = new Data_Factory(Svagrack_Folder);
        var id = this._request.body.folderId;
        var success = await factory.delete(id);
        this.setView({message:"Deleted!", success: success});
    }
    async scan(){
        var factory = new Data_Factory(Svagrack_Folder);
        var id = this._request.body.folderId;
        var folder = await factory.id(id);
        var path = decodeURI(folder.get("path"));
        var results = this.scanR(path);
        var now = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
        folder.set("last_scan", now);
        folder.save();

        var pathFactory = new Data_Factory(Svagrack_Path);
        var paths = await pathFactory.many_query("svagrack_folder_id="+id, true);
        var oldPathArray = [];
        var count = 0;
        var removed = 0;
        var newPaths = 0;
        var oldPaths = 0;
        for(path of paths){
            const decoded = decodeURI(path.path);
            if(fs.existsSync(decoded)){
                oldPathArray.push(path.path);
                count++;
            }else{
                pathFactory.delete(path._id);
                removed++;
            }
        }
        for(var i in results){
            var encoded = encodeURI(results[i]);
            //check if exists
            if(oldPathArray.includes(encoded)){
                oldPaths++;
            }else{
                newPaths++;    
                count++;
                var cur = pathFactory.make();
                cur.set("svagrack_folder_id",id);
                cur.set("path",encoded);
                cur.save();
            }

        }

        this.setView({success:true, count: count, new:newPaths, old: oldPaths, removed: removed});
    }

    scanR(dir){
        var results = [];
        var files = fs.readdirSync(dir);
        for(const file of files){
            const fullPath = dir + path.sep + file;
            const stat = fs.lstatSync(fullPath);
            if(stat.isDirectory()){
                results = results.concat(this.scanR(fullPath));
            }else{
                var extension = path.extname(file);
                if(this.fileTypes.includes(extension)){
                    results.push(fullPath);
                }
            }
        }
        return results;
    }
}
module.exports=CFodlers;