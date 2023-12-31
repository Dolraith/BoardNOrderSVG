const View = require(global.classPaths.view);
class v_index extends View{
    init(){
        this.addDependency('bootstrap');
        this.addDependency([{name:'vue',path:'/modules/BoardNOrderSVG/_js/j_index.js'}],'modules');
        this.addDependency('vue');
        this.setTemplate('modules/BoardNOrderSVG/_templates/t_index.html');
        this.setVueData("tags",this.getDataProp("tags"));
        this.setVueData("paths",this.getDataProp("paths"));
        this.setVueData("mappings",this.getDataProp("mappings"));

    }    
}
module.exports = v_index;