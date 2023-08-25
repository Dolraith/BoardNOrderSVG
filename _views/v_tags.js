const View = require(global.classPaths.view);
class v_index extends View{
    init(){
        this.addDependency('bootstrap');
        this.addDependency([{name:'vue',path:'/modules/BoardNOrderSVG/_js/j_tags.js'}],'modules');
        this.addDependency('vue');
        this.setTemplate('modules/BoardNOrderSVG/_templates/t_tags.html');
        this.setVueData("tags",this.getDataProp("tags"));
    }    
}
module.exports = v_index;