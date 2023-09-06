import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
export function initVue(initData, components){    
    var vue = createApp({
        components:{},
        template:"#vuetemplate",
        data() {
            var data = {
                newTagName: ""
            };
            for(var i in initData){
                data[i] = initData[i];
            }
            data.tags.sort((a,b)=>{return a.name.localeCompare(b.name)});
            return data;
        },
        methods:{
            async addTag(){
                const body = JSON.stringify({name:this.newTagName});
                const request = new Request("tags/addTag",
                {
                    method: "POST",
                    headers: new Headers({'content-type': 'application/json'}),
                    cache: "default",
                    body: body
                });
                var data = await fetch(request).then((response) => response.json());
                if(data._id){
                    var newTag = {
                        _id: data._id,
                        name: this.newTagName
                    };
                    this.tags.push(newTag);
                    this. newTagName = "";
                }
                this.tags.sort((a,b)=>{return a.name.localeCompare(b.name)});
            },
            async removeTag(id, index){
                const body = JSON.stringify({tagId:id});
                const request = new Request("tags/removeTag",
                {
                    method: "POST",
                    headers: new Headers({'content-type':'application/json'}),
                    cache: "default",
                    body:body
                });
                var data = await fetch(request).then((response) => response.json());
                if(data.success == true){
                    this.tags.splice(index, 1);
                }
            }
        }
    });

    for(var comp of components){
        vue.component(comp, eval(comp));
    }
    vue.mount("#vuemain");
}