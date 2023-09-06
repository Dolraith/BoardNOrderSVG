import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
export function initVue(initData, components){    
    var vue = createApp({
        components:{},
        template:"#vuetemplate",
        data() {
            var data = {
                page:0,
                cols:4,
                rows:4,
                pageSize:0,
                pages:0,

                tag_selected:0,
                add_tag_selected:0,
                path_selected:{
                    _id:-1,
                    name:"name",
                    source:"src",
                    tags:[]
                }
            };
            for(var i in initData){
                data[i] = initData[i];
            }
            data.pageSize = data.cols*data.rows;
            data.pages = Math.ceil(data.paths.length / data.pageSize);
            return data;
        },
        methods:{
            extractName(path){
                return decodeURI(path.path).split(/[\\\/]/).pop().split(".")[0];
            },
            getPath(row,col){
                var index = (this.page * (this.rows+this.cols)) + (row * this.cols) + col;
                if(index < this.paths.length){
                    return this.paths[index];
                }
                return null;
            },
            getTagsForPath(pathId){
                var results = [];
                var tagIds = [];
                for(var mapping of this.mappings){
                    if(mapping.svagrack_path_id == pathId){
                        tagIds.push(mapping.svagrack_tag_id);
                    }
                }
                for(var tag of this.tags){
                    if(tagIds.includes(tag._id)){
                        results.push(tag);
                    }
                };
                return results;
            },
            selectPath(row, col){
                var pathObj = this.getPath(row, col);
                this.path_selected._id = pathObj._id;
                this.path_selected.name = this.extractName(pathObj);
                this.path_selected.source = "svagrack/index/getImage?pathId=" + pathObj._id;
                this.path_selected.tags.splice(0,this.path_selected.tags.length);
                var newTags = this.getTagsForPath(pathObj._id);
                for(var tag of newTags){
                    this.path_selected.tags.push(tag);
                }
            }, 
            async tagPath(path_id){
                const body = JSON.stringify({tag:this.add_tag_selected, path:path_id});
                const request = new Request("svagrack/index/tagPath",
                {
                    method: "POST",
                    headers: new Headers({'content-type': 'application/json'}),
                    cache: "default",
                    body: body
                });
                var data = await fetch(request).then((response) => response.json());
                if(data._id){
                    for(var tag of this.tags){
                        if(tag._id == this.add_tag_selected){
                            this.mappings.push({_id:data._id, svagrack_path_id:path_id, svagrack_tag_id:tag._id});
                            this.path_selected.tags.push(tag);
                            break;
                        }
                    }
                }
            },
            async untagPath(tag){
                var mappingId = -1;
                for(var i in this.mappings){
                    if(this.mappings[i].svagrack_path_id == this.path_selected._id && this.mappings[i].svagrack_tag_id == tag._id){
                        mappingId = this.mappings[i]._id;
                        this.mappings.splice(i,1);                        
                        break;
                    }
                }
                const body = JSON.stringify({mappingId:mappingId});
                const request = new Request("svagrack/index/untagPath",
                {
                    method: "POST",
                    headers: new Headers({'content-type':'application/json'}),
                    cache: "default",
                    body:body
                });
                var data = await fetch(request).then((response) => response.json());
                if(data.success){
                    for(var i in this.path_selected.tags){
                        if(this.path_selected.tags[i]._id == tag._id){
                            this.path_selected.tags.splice(i,1);
                            break;
                        }
                    }
                }
            },
            async singleTagSearch(){
                var query = "svagrack_tag_id=" + this.tag_selected;
                this.queryMapping(query);
            },
            async resetTagSearch(){
                const request = new Request("svagrack/index/getAllPaths",
                {
                    method: "POST",
                    headers: new Headers({'content-type':'application/json'}),
                    cache: "default",
                    body:""
                });
                var data = await fetch(request).then((response) => response.json());
                if(data.success){
                    this.paths.splice(0, this.paths.length);
                    for(var path of data.paths){
                        this.paths.push(path);
                    }
                    this.page=0;
                    this.pages = Math.ceil(this.paths.length / this.pageSize);
                }
            },
            async queryMapping(query){
                var body = JSON.stringify({tagQuery:query});
                const request = new Request("svagrack/index/queryPathMapping",
                {
                    method: "POST",
                    headers: new Headers({'content-type':'application/json'}),
                    cache: "default",
                    body:body
                });
                var data = await fetch(request).then((response) => response.json());
                if(data.success){
                    this.paths.splice(0, this.paths.length);
                    for(var path of data.paths){
                        this.paths.push(path);
                    }
                    this.page = 0;
                    this.pages = Math.ceil(this.paths.length / this.pageSize);
                }
            }
        }
    });

    for(var comp of components){
        vue.component(comp, eval(comp));
    }
    vue.mount("#vuemain");
}