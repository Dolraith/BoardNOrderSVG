var Controller = require(global.classPaths.controller);
class CIndex extends Controller {
    async index(){
        this.setView('modules/BoardNOrderSVG/_views/v_index');
    }
}
module.exports=CIndex