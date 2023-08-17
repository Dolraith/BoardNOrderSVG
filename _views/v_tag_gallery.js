const View = require(global.classPaths.view);
class v_index extends View{
    init(){
        this.addDependency('bootstrap');
        this.addDependency([{name:'vue',path:'/modules/tag_gallery/_js/j_tag_gallery.js'}],'modules');
        this.addDependency('vue');
        this.setTemplate('modules/tag_gallery/_templates/t_tag_gallery.html');

    }    
}
module.exports = v_index;