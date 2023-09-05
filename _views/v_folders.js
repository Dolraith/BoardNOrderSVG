const View = require(global.classPaths.view);
class v_index extends View{
    init(){
        this.addDependency('bootstrap');
        this.addDependency([{name:'vue',path:'/modules/BoardNOrderSVG/_js/j_folders.js'}],'modules');
        this.addDependency('vue');
        this.setTemplate('modules/BoardNOrderSVG/_templates/t_folders.html');
        this.setVueData("folders",this.getDataProp("folders"));
    }    
}
module.exports = v_index;