import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
export function initVue(initData, components){    
    var vue = createApp({
        components:{},
        template:"#vuetemplate",
        data() {
            var data = {
                rows:3,
                cols:6,
                cells: []
            };
            for(var x = 0; x < data.rows; x++){
                var row = [];
                for(var y = 0; y < data.cols; y++){
                    var index = "picture-"+x+"|"+y;
                    var obj = {
                        "name":index,
                        "path":"modules/BoardNOrderSVG/images/deer"+x+".svg"};
                    row.push(obj);
                }
                data.cells.push(row);
            }
            for(var i in initData){
                data[i] = initData[i];
            }
            return data;
        }

    });

    for(var comp of components){
        vue.component(comp, eval(comp));
    }
    vue.mount("#vuemain");
}