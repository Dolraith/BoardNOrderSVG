var Controller = require(global.classPaths.controller);
class CIndex extends Controller {
    async index(){
        this.setView('modules/tag_gallery/_views/v_tag_gallery');
    }
}
module.exports=CIndex