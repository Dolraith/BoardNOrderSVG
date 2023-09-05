import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
export function initVue(initData, components){    
    var vue = createApp({
        components:{},
        template:"#vuetemplate",
        data() {
            var data = {
                newFolderPath:"",
            };
            
            for(var i in initData){
                data[i] = initData[i];
            }
            data.folders.sort((a,b)=>{return a.path.localeCompare(b.path)});
            return data;
        },
        methods: {
            async addFolder(){
                const encoded = encodeURI(this.newFolderPath);
                //no duplicate
                for(var i in this.folders){
                    if(this.newFolderPath == this.folders[i].path){
                        alert("Can't create duplicate folder path!");
                        return;
                    }
                }
                const body = JSON.stringify({path:encoded});
                const request = new Request("folders/addFolder",
                {
                    method: "POST",
                    headers: new Headers({'content-type': 'application/json'}),
                    cache: "default",
                    body: body
                });
                var data = await fetch(request).then((response) => response.json());
                if(data._id){
                    var newFolder = {
                        _id: data._id,
                        path: encoded,
                        count: 0,
                        last_scan: null
                    };
                    this.folders.push(newFolder);
                    this.newFolderPath = "";
                }
                this.folders.sort((a,b)=>{return a.path.localeCompare(b.path)});
            },
            async removeFolder(id, index){
                const body = JSON.stringify({folderId:id});
                const request = new Request("folders/removeFolder",
                {
                    method: "POST",
                    headers: new Headers({'content-type':'application/json'}),
                    cache: "default",
                    body:body
                });
                var data = await fetch(request).then((response) => response.json());
                if(data.success == true){
                    this.folders.splice(index, 1);
                    console.log("spliced!");
                }
            },
            async scan(folder){
                const body = JSON.stringify({folderId:folder._id});
                const request = new Request("folders/scan",
                {
                    method: "POST",
                    headers: new Headers({'content-type':'application/json'}),
                    cache: "default",
                    body:body
                });
                var data = await fetch(request).then((response) => response.json());
                if(data.success == true){
                    console.log(data);
                    folder.last_scan = new Date();
                    folder.count = data.count;
                }
            }
        }
    });

    for(var comp of components){
        vue.component(comp, eval(comp));
    }
    vue.mount("#vuemain");
}