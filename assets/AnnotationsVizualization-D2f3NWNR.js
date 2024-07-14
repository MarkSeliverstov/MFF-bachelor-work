import{_ as p,u as y,r as d,o as l,c as o,a as n,w as i,Q as b,F as m,b as g,d as h,e as u,f,g as w,t as v,j as k,h as x,i as A,q as Q,m as C,p as F}from"./index-kbEpxEMD.js";const V=[{name:"line",align:"center",label:"Line",field:"lineNumber",sortable:!0,style:"width: 30px"},{name:"name",align:"left",label:"Name",field:"name",sortable:!0},{name:"value",align:"left",label:"Value",field:"value",sortable:!0,format:e=>e||"N/A"}],N={setup(){y();const e=d(""),t=d(null);return{filter:e,filterRef:t,columns:V,resetFilter(){e.value="",t.value.focus()}}},data(){return{loading:!0,entities:{}}},async beforeMount(){this.entities=await this.fetchData(),this.loading=!1},methods:{notify(e){this.$q.notify({color:"red",message:e,position:"top-right",icon:"error",timeout:1e3})},async fetchData(){try{const e="annotations.json",t=await fetch(e);if(!t.ok)throw new Error(`File not found at ${e}`);return this.entities=await t.json(),this.entities}catch(e){this.notify(`Failed to fetch data: ${e}`)}},filtredAnnotations(e){return e.filter(t=>t.value===null?!1:t.value.toLowerCase().includes(this.filter.toLowerCase()))},filteredCount(){return this.entities.filesAnnotations.reduce((e,t)=>e+this.filtredAnnotations(t.annotations).length,0)}}},z=f("h4",{class:"text-subtitle",style:{margin:"0 10px 10px 0"}},"Annotations",-1),I=f("p",null," This is a list of all annotations from your project files, displayed line by line. You can filter the list by typing in the input field below. ",-1),L={key:1,style:{"font-size":"16px"}};function j(e,t,_,s,r,c){return l(),o(m,null,[z,I,n(b,{ref:"filterRef",filled:"",modelValue:s.filter,"onUpdate:modelValue":t[0]||(t[0]=a=>s.filter=a),label:"Filter"},{append:i(()=>[s.filter!==""?(l(),h(w,{key:0,name:"clear",class:"cursor-pointer",onClick:s.resetFilter},null,8,["onClick"])):u("",!0),r.entities.filesAnnotations?(l(),o("div",L," Found "+v(c.filteredCount())+" annotations ",1)):u("",!0)]),_:1},8,["modelValue"]),(l(!0),o(m,null,g(r.entities.filesAnnotations,a=>(l(),o("div",{key:a.identifier},[n(C,{flat:"",bordered:"",class:"q-ma-md"},{default:i(()=>[n(k,null,{default:i(()=>[n(x,null,{default:i(()=>[n(A,{label:a.relativeFilePath,"header-class":"text-h6",dense:"","switch-toggle-side":"",style:{"font-size":"16px"}},{default:i(()=>[f("div",null,[n(Q,{class:"my-sticky-virtscroll-table",dense:"","virtual-scroll":"",flat:"","rows-per-page-options":[0],"virtual-scroll-sticky-size-start":48,"row-key":"lineNumber",rows:c.filtredAnnotations(a.annotations),columns:s.columns},null,8,["rows","columns"])])]),_:2},1032,["label"])]),_:2},1024)]),_:2},1024)]),_:2},1024)]))),128)),r.loading?(l(),h(F,{key:0,color:"primary",size:"3em",style:{position:"absolute",height:"30vh",left:"50%"}})):u("",!0)],64)}const q=p(N,[["render",j]]),B={class:"q-pa-md"},E={__name:"AnnotationsVizualization",setup(e){return(t,_)=>(l(),o("main",B,[n(q)]))}};export{E as default};
