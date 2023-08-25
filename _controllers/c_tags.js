Controller = require(global.classPaths.controller);
Data_Factory = require("../../feather_core/classes/data_factory");
Svagrack_Tag = require("./../classes/data/svagrack_tag");

class CTags extends Controller {
    factory;
    async index(){
        var factory = new Data_Factory(Svagrack_Tag);
        this.setView('modules/BoardNOrderSVG/_views/v_tags');
        var tags = await factory.many_query("",true);
        this.setViewData("tags",tags);
    }

    async addTag(){
        var factory = new Data_Factory(Svagrack_Tag);
        console.log("I'm here!")
        var name = this._request.body.name;
        var tag = factory.make();
        tag.set("name",name);
        var resultId = await tag.save();
        console.log(resultId);
        this.setView({message:"Saved!", success:true, _id:resultId});
    }

    async load(){

    }
}
module.exports=CTags