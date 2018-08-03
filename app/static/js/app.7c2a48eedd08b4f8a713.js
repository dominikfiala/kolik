webpackJsonp([1],[,,,,,,function(t,e,i){"use strict";var s=i(26),a=i(83),n=i(3),r=n(s.a,a.a,!1,null,null,null);e.a=r.exports},,function(t,e,i){"use strict";var s=i(25),a=i(82),n=i(3),r=n(s.a,a.a,!1,null,null,null);e.a=r.exports},function(t,e,i){"use strict";function s(t){i(84)}var a=i(27),n=i(85),r=i(3),o=s,c=r(a.a,n.a,!1,o,null,null);e.a=c.exports},,,,,,,,,,,function(t,e,i){"use strict";e.a={name:"app",computed:{metrics:function(){return this.$store.state.metrics}}}},function(t,e,i){"use strict";var s=i(54),a=i.n(s),n=i(5),r=i.n(n),o=i(8),c=i(6),l=i(9);e.a={name:"HomePage",computed:{metrics:function(){var t=this.$store.state.metrics.metrics.reduce(function(t,e){return t[e.id]={metric:e,stats:{total:0,latest:null}},t},{});return this.$store.state.records.records.map(function(e){var i=t[e.metric],s=new r.a(e.time),a=(new r.a).startOf(i.metric.period);if(s.isAfter(a)){var n=i.stats;n.total++,n.latest||(n.latest=e.time)}}),a()(t)}},methods:{iterate:function(t){this.$store.commit("records/SAVE",{metric:t,time:Date.now()})}},components:{AppToolbar:o.a,AppNavbar:c.a,EmptyPage:l.a}}},,,,function(t,e,i){"use strict";e.a={name:"app-toolbar",computed:{routes:function(){var t=[];for(var e in this.$router.options.routes)if(this.$router.options.routes.hasOwnProperty(e)){var i=this.$router.options.routes[e];i.hasOwnProperty("title")&&t.push(i)}return t}},methods:{click:function(){console.log("domo")}}}},function(t,e,i){"use strict";e.a={name:"app-navbar"}},function(t,e,i){"use strict";e.a={name:"EmptyPage"}},function(t,e,i){"use strict";var s=i(8),a=i(6),n=i(9);e.a={name:"MetricsPage",data:function(){return{sortEnabled:!1}},methods:{sort:function(t){t.detail.from!==t.detail.to&&this.$store.commit("metrics/SWAP",{from:t.detail.from,to:t.detail.to})},toggleSort:function(){this.sortEnabled=!this.sortEnabled,window.f7.sortable.toggle()}},computed:{metrics:function(){return this.$store.state.metrics.metrics}},components:{AppToolbar:s.a,AppNavbar:a.a,EmptyPage:n.a}}},function(t,e,i){"use strict";var s=i(5),a=i.n(s),n=i(8),r=i(6),o=i(9);e.a={name:"MetricPage",methods:{showTab:function(t){window.f7.tab.show(t.target.getAttribute("href"),t.target)}},computed:{id:function(){return parseInt(this.$route.params.id)},metric:function(){var t=this;return this.$store.state.metrics.metrics.find(function(e){return e.id===t.id})},records:function(){var t=this;return this.$store.state.records.records.filter(function(e){return e.metric===t.id})},stats:function(){var t={total:this.records.length,oldest:this.records[this.records.length-1].time,latest:this.records[0].time,days:0,avarage:0};if(t.oldest){var e=new a.a(t.oldest),i=a.a.duration(e.diff());t.days=0===i.get("days")?1:Math.abs(i.get("days"))}var s=0;return"day"===this.metric.period?s=1:"week"===this.metric.period?s=7:"month"===this.metric.period?s=30:"quarter"===this.metric.period?s=91:"year"===this.metric.period&&(s=365),t.avarage=Math.round(t.total/s*10)/10,t}},created:function(){this.metric||this.$router.push("/")},components:{AppToolbar:n.a,AppNavbar:r.a,EmptyPage:o.a}}},function(t,e,i){"use strict";var s=i(6);e.a={name:"MetricsEditPage",data:function(){return{presets:[{emoji:"🚬",name:"Cígo"},{emoji:"☕",name:"Kafe"},{emoji:"🏃",name:"Běh"},{emoji:"🚴",name:"Kolo"},{emoji:"🐶",name:"Venčení"},{emoji:"💑",name:"Sex"},{emoji:"🍔",name:"Fast-food"}],name:"",emoji:"",period:"day"}},computed:{id:function(){return parseInt(this.$route.params.id)}},methods:{preset:function(t){var e=this.presets[t];e?(this.emoji=e.emoji,this.name=e.name):(this.emoji="",this.name="")},submit:function(){this.$refs.form.reportValidity&&!this.$refs.form.reportValidity()||(this.$store.commit("metrics/SAVE",{id:this.id,emoji:this.emoji,name:this.name,period:this.period}),this.$router.go("-1"))},reset:function(){window.confirm("Opravdu vynulovat tuto jednotku?")&&this.$store.commit("records/RESET",this.id)},remove:function(){window.confirm("Opravdu smazat tuto jednotku? Smazány budou i veškeré její záznamy.")&&(this.$store.commit("records/RESET",this.id),this.$store.commit("metrics/DELETE",this.id),this.$router.push("/metrics"))}},created:function(){var t=this,e=this.$store.state.metrics.metrics.find(function(e){return e.id===t.id});e&&(this.emoji=e.emoji,this.name=e.name,this.period=e.period)},components:{AppNavbar:s.a}}},function(t,e,i){"use strict";var s=i(5),a=i.n(s),n=i(6);e.a={name:"RecordsEditPage",data:function(){return{metric:null,time:(new a.a).format(a.a.HTML5_FMT.DATETIME_LOCAL)}},computed:{id:function(){return parseInt(this.$route.params.id)},metrics:function(){return this.$store.state.metrics.metrics}},methods:{submit:function(){this.$refs.form.reportValidity&&!this.$refs.form.reportValidity()||(this.$store.commit("records/SAVE",{id:this.id,metric:this.metric,time:parseInt(new a.a(this.time).format("x"))}),this.$router.go("-1"))},remove:function(){window.confirm("Opravdu smazat tento záznam?")&&(this.$store.commit("records/DELETE",this.id),this.$router.go("-1"))}},created:function(){var t=this,e=this.$store.state.records.records.find(function(e){return e.time===t.id});e?(this.metric=e.metric,this.time=new a.a(e.time).format(a.a.HTML5_FMT.DATETIME_LOCAL)):1===this.metrics.length&&(this.metric=this.metrics[0].id)},components:{AppNavbar:n.a}}},function(t,e,i){"use strict";var s=i(5),a=i.n(s),n=i(8),r=i(6),o=i(9);e.a={name:"TimelinePage",computed:{recordsByDay:function(){var t=[],e=this.$store.state.metrics.metrics.reduce(function(t,e){return t[e.id]=e.emoji+" "+e.name,t},{});return this.$store.state.records.records.map(function(i){var s=parseInt(new a.a(i.time).startOf("day").format("x")),n={time:i.time,name:e[i.metric]},r=t.find(function(t){return t.day===s});r?r.items.push(n):t.push({day:s,items:[n]})}),t}},components:{AppToolbar:n.a,AppNavbar:r.a,EmptyPage:o.a}}},function(t,e,i){"use strict";var s=i(8),a=i(6),n=i(9);e.a={name:"NotFoundPage",components:{AppToolbar:s.a,AppNavbar:a.a,EmptyPage:n.a}}},,,,,,,function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i(11),a=i(5),n=i.n(a),r=i(45),o=(i.n(r),i(46)),c=i(50),l=i(100),m=(i(105),i(106)),v=(i.n(m),i(107)),u=i(137),d=i(138),p=i(139);i.n(p);n.a.locale("cs"),Object(m.sync)(l.a,c.a),s.a.config.productionTip=!1,v.a.use([u.a,d.a]),window.vueApp=new s.a({router:c.a,store:l.a,render:function(t){return t(o.a)},mounted:function(){window.f7=new v.a({root:"#app",clicks:{externalLinks:"*"}})}}).$mount("#app")},,,,,,function(t,e,i){"use strict";function s(t){i(47)}var a=i(20),n=i(49),r=i(3),o=s,c=r(a.a,n.a,!1,o,null,null);e.a=c.exports},function(t,e){},,function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement;return(t._self._c||e)("router-view")},a=[],n={render:s,staticRenderFns:a};e.a=n},function(t,e,i){"use strict";var s=i(11),a=i(51),n=i(52),r=i(87),o=i(89),c=i(91),l=i(93),m=i(96),v=i(98);s.a.use(a.a),e.a=new a.a({routes:[{path:"/",name:"home",title:"Záznam",component:n.a,meta:{base:"/",icon:"ion-add"}},{path:"/metrics",name:"metrics",title:"Jednotky",component:r.a,meta:{base:"/metrics",icon:"ion-list"}},{path:"/timeline",name:"timeline",title:"Časová osa",component:m.a,meta:{base:"/timeline",icon:"ion-time"}},{path:"/metrics/:id",name:"metric",component:o.a},{path:"/metrics-edit/:id?",name:"metrics-edit",component:c.a},{path:"/records-edit/:id?",name:"records-edit",component:l.a},{path:"*",name:"404",component:v.a}]})},,function(t,e,i){"use strict";function s(t){i(53)}var a=i(21),n=i(86),r=i(3),o=s,c=r(a.a,n.a,!1,o,null,null);e.a=c.exports},function(t,e){},,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"toolbar tabbar tabbar-labels toolbar-bottom-md"},[i("div",{staticClass:"toolbar-inner"},t._l(t.routes,function(e){return i("router-link",{key:e.name,staticClass:"tab-link",attrs:{to:e.meta.base,exact:"home"===e.name,"active-class":"tab-link-active"}},[i("i",{staticClass:"f7-icons"},[t._v(t._s(e.meta.icon))]),t._v(" "),i("span",{staticClass:"tabbar-label"},[t._v(t._s(e.title))])])}))])},a=[],n={render:s,staticRenderFns:a};e.a=n},function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"navbar"},[i("div",{staticClass:"navbar-inner"},[i("div",{staticClass:"left"},[t._t("left")],2),t._v(" "),i("div",{staticClass:"title"},[t._t("title")],2),t._v(" "),i("div",{staticClass:"right"},[t._t("right")],2)])])},a=[],n={render:s,staticRenderFns:a};e.a=n},function(t,e){},function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"page-content"},[i("div",{staticClass:"block block-strong text-align-center"},[t._t("default")],2)])},a=[],n={render:s,staticRenderFns:a};e.a=n},function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"view"},[i("div",{staticClass:"page"},[i("app-navbar",[t.metrics.length?i("router-link",{staticClass:"link",attrs:{slot:"right",to:"/records-edit/0"},slot:"right"},[t._v("Přidat zpětně")]):t._e()],1),t._v(" "),i("app-toolbar"),t._v(" "),0===t.metrics.length?i("empty-page",[i("p",[t._v("Zatím nemáš založenou"),i("br"),t._v("žádnou počítanou jednotku.")]),t._v(" "),i("router-link",{attrs:{to:"/metrics-edit/0"}},[t._v("Přidat jednotku")])],1):t._e(),t._v(" "),t.metrics.length?i("div",{staticClass:"page-content"},[i("div",{staticClass:"block-title"},[t._v("\n        Zaznamenej jednotku klepnutím\n      ")]),t._v(" "),i("div",{staticClass:"list media-list"},[i("ul",t._l(t.metrics,function(e){return i("li",{key:e.metric.id},[i("div",{staticClass:"item-content",on:{click:function(i){t.iterate(e.metric.id)}}},[i("div",{staticClass:"item-media margin-vertical"},[t._v(t._s(e.metric.emoji))]),t._v(" "),i("div",{staticClass:"item-inner display-flex"},[i("div",{},[i("div",{staticClass:"item-title-row"},[i("div",{staticClass:"item-title"},[t._v(t._s(t._f("trim")(e.metric.name)))])]),t._v(" "),i("div",{staticClass:"item-subtitle"},[e.stats.latest?i("span",[t._v("\n                      Naposledy "+t._s(t._f("fromnow")(e.stats.latest))+"\n                    ")]):i("span",[t._v("\n                      Zatím nezapočítáno\n                    ")])]),t._v(" "),i("div",{staticClass:"item-text"},[t._v("\n                    Měřeno "+t._s(t._f("period")(e.metric.period))+"\n                  ")])]),t._v(" "),i("div",{},[i("span",{staticClass:"badge color-blue metric-total"},[t._v(t._s(e.stats.total))])])])])])}))])]):t._e()],1)])},a=[],n={render:s,staticRenderFns:a};e.a=n},function(t,e,i){"use strict";var s=i(28),a=i(88),n=i(3),r=n(s.a,a.a,!1,null,null,null);e.a=r.exports},function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"view"},[i("div",{staticClass:"page"},[i("app-navbar",[i("a",{staticClass:"link",attrs:{slot:"left"},on:{click:t.toggleSort},slot:"left"},[i("span",{directives:[{name:"show",rawName:"v-show",value:t.sortEnabled&&t.metrics.length>1,expression:"sortEnabled && metrics.length > 1"}]},[t._v("Hotovo")]),t._v(" "),i("span",{directives:[{name:"show",rawName:"v-show",value:!t.sortEnabled&&t.metrics.length>1,expression:"!sortEnabled && metrics.length > 1"}]},[t._v("Řadit")])]),t._v(" "),i("router-link",{staticClass:"link",attrs:{slot:"right",to:"/metrics-edit/0"},slot:"right"},[t._v("Přidat")])],1),t._v(" "),i("app-toolbar"),t._v(" "),0===t.metrics.length?i("empty-page",[i("p",[t._v("Zatím nemáš založenou"),i("br"),t._v("žádnou počítanou jednotku.")]),t._v(" "),i("router-link",{attrs:{to:"/metrics-edit/0"}},[t._v("Přidat jednotku")])],1):t._e(),t._v(" "),t.metrics.length?i("div",{staticClass:"page-content"},[i("div",{staticClass:"block-title"},[t._v("\n        Zobraz více voleb klepnutím\n      ")]),t._v(" "),i("div",{staticClass:"list sortable"},[i("ul",t._l(t.metrics,function(e){return i("li",{key:e.id,on:{"sortable:sort":t.sort}},[i("router-link",{staticClass:"item-link item-content",attrs:{to:"/metrics/"+e.id}},[i("div",{staticClass:"item-media"},[t._v(t._s(e.emoji))]),t._v(" "),i("div",{staticClass:"item-inner"},[t._v(t._s(e.name))])]),t._v(" "),i("div",{staticClass:"sortable-handler"})],1)}))])]):t._e()],1)])},a=[],n={render:s,staticRenderFns:a};e.a=n},function(t,e,i){"use strict";var s=i(29),a=i(90),n=i(3),r=n(s.a,a.a,!1,null,null,null);e.a=r.exports},function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"page page-with-subnavbar"},[i("app-navbar",[i("router-link",{staticClass:"link",attrs:{slot:"left",to:"/metrics"},slot:"left"},[t._v("Zpět")]),t._v(" "),i("router-link",{staticClass:"link",attrs:{slot:"right",to:"/metrics-edit/"+t.metric.id},slot:"right"},[t._v("Upravit")])],1),t._v(" "),i("div",{staticClass:"subnavbar"},[i("div",{staticClass:"subnavbar-inner"},[i("div",{staticClass:"segmented"},[i("a",{staticClass:"button tab-link tab-link-active",attrs:{href:"#stats"},on:{click:function(e){return e.preventDefault(),t.showTab(e)}}},[t._v("Statistiky")]),t._v(" "),i("a",{staticClass:"button tab-link",attrs:{href:"#records"},on:{click:function(e){return e.preventDefault(),t.showTab(e)}}},[t._v("Záznamy")]),t._v(" "),i("a",{staticClass:"button tab-link",attrs:{href:"#details"},on:{click:function(e){return e.preventDefault(),t.showTab(e)}}},[t._v("Detaily")])])])]),t._v(" "),i("app-toolbar"),t._v(" "),i("div",{staticClass:"page-content"},[i("div",{staticClass:"tabs"},[i("div",{staticClass:"tab tab-active",attrs:{id:"stats"}},[i("div",{staticClass:"block-title"},[t._v(t._s(t.metric.emoji)+" "+t._s(t.metric.name)+" / Statistiky")]),t._v(" "),i("div",{staticClass:"list"},[i("ul",[i("li",[i("div",{staticClass:"item-content"},[i("div",{staticClass:"item-inner"},[i("div",{staticClass:"item-title"},[t._v("Celkem záznamů")]),t._v(" "),i("div",{staticClass:"item-after text-color-black"},[t._v("\n                    "+t._s(t.stats.total)+"\n                  ")])])])]),t._v(" "),i("li",[i("div",{staticClass:"item-content"},[i("div",{staticClass:"item-inner"},[i("div",{staticClass:"item-title"},[t._v("Průměr")]),t._v(" "),i("div",{staticClass:"item-after text-color-black"},[t._v("\n                    "+t._s(t.stats.avarage)+" "+t._s(t._f("period")(t.metric.period))+"\n                  ")])])])]),t._v(" "),i("li",[i("div",{staticClass:"item-content"},[i("div",{staticClass:"item-inner"},[i("div",{staticClass:"item-title"},[t._v("Nejnovější")]),t._v(" "),i("div",{staticClass:"item-after text-color-black"},[t.stats.latest?i("span",[t._v(t._s(t._f("datetime")(t.stats.latest)))]):i("span",[t._v("—")])])])])]),t._v(" "),i("li",[i("div",{staticClass:"item-content"},[i("div",{staticClass:"item-inner"},[i("div",{staticClass:"item-title"},[t._v("Nejstarší")]),t._v(" "),i("div",{staticClass:"item-after text-color-black"},[t.stats.oldest?i("span",[t._v(t._s(t._f("datetime")(t.stats.oldest)))]):i("span",[t._v("—")])])])])]),t._v(" "),i("li",[i("div",{staticClass:"item-content"},[i("div",{staticClass:"item-inner"},[i("div",{staticClass:"item-title"},[t._v("Měřených dní")]),t._v(" "),i("div",{staticClass:"item-after text-color-black"},[t._v("\n                    "+t._s(t.stats.days)+"\n                  ")])])])])])])]),t._v(" "),i("div",{staticClass:"tab",attrs:{id:"records"}},[i("div",{staticClass:"block-title"},[t._v(t._s(t.metric.emoji)+" "+t._s(t.metric.name)+" / Záznamy")]),t._v(" "),i("div",{staticClass:"list"},[i("ul",t._l(t.records,function(e){return i("li",{key:e.time},[i("router-link",{staticClass:"item-content item-link",attrs:{to:"/records-edit/"+e.time}},[i("div",{staticClass:"item-inner"},[i("div",{staticClass:"item-title"},[t._v(t._s(t._f("datetime")(e.time)))])])])],1)}))])]),t._v(" "),i("div",{staticClass:"tab",attrs:{id:"details"}},[i("div",{staticClass:"block-title"},[t._v(t._s(t.metric.emoji)+" "+t._s(t.metric.name)+" / Detaily")]),t._v(" "),i("div",{staticClass:"list"},[i("ul",[i("li",[i("div",{staticClass:"item-content"},[i("div",{staticClass:"item-inner"},[i("div",{staticClass:"item-title"},[t._v("Název")]),t._v(" "),i("div",{staticClass:"item-after text-color-black"},[t._v(t._s(t._f("trim")(t.metric.name)))])])])]),t._v(" "),i("li",[i("div",{staticClass:"item-content"},[i("div",{staticClass:"item-inner"},[i("div",{staticClass:"item-title"},[t._v("Emoji")]),t._v(" "),i("div",{staticClass:"item-after text-color-black"},[t._v(t._s(t.metric.emoji))])])])]),t._v(" "),i("li",[i("div",{staticClass:"item-content"},[i("div",{staticClass:"item-inner"},[i("div",{staticClass:"item-title"},[t._v("Měřené období")]),t._v(" "),i("div",{staticClass:"item-after text-color-black"},[t._v(t._s(t._f("period")(t.metric.period)))])])])])])])])])])],1)},a=[],n={render:s,staticRenderFns:a};e.a=n},function(t,e,i){"use strict";var s=i(30),a=i(92),n=i(3),r=n(s.a,a.a,!1,null,null,null);e.a=r.exports},function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"page"},[i("app-navbar",[i("a",{staticClass:"link",attrs:{slot:"left"},on:{click:function(e){t.$router.go("-1")}},slot:"left"},[t._v("Zrušit")]),t._v(" "),i("a",{staticClass:"link",attrs:{slot:"right"},on:{click:t.submit},slot:"right"},[t._v("Uložit")])]),t._v(" "),i("div",{staticClass:"page-content"},[i("div",{staticClass:"block-title"},[0===t.id?i("span",[t._v("Nová jednotka")]):i("span",[t._v("Upravit jednotku")])]),t._v(" "),i("form",{ref:"form",staticClass:"list",on:{submit:function(e){return e.preventDefault(),t.submit(e)}}},[i("ul",[0===t.id?i("li",[i("div",{staticClass:"item-content item-input"},[i("div",{staticClass:"item-inner"},[i("div",{staticClass:"item-title item-label"},[t._v("Přednastavené jednotky")]),t._v(" "),i("div",{staticClass:"item-input-wrap"},[i("select",{on:{change:function(e){t.preset(e.target.value)}}},[i("option",[t._v("Vyber jednotku")]),t._v(" "),t._l(t.presets,function(e,s){return i("option",{key:e.name,domProps:{value:s}},[t._v("\n                    "+t._s(e.emoji)+" "+t._s(e.name)+"\n                  ")])})],2)])])])]):t._e(),t._v(" "),i("li",[i("div",{staticClass:"item-content item-input"},[i("div",{staticClass:"item-inner"},[i("div",{staticClass:"item-title item-label"},[t._v("Název")]),t._v(" "),i("div",{staticClass:"item-input-wrap"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],attrs:{type:"text",placeholder:"Vlastní jednotka",required:""},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}})])])])]),t._v(" "),i("li",[i("div",{staticClass:"item-content item-input"},[i("div",{staticClass:"item-inner"},[i("div",{staticClass:"item-title item-label"},[t._v("Emoji")]),t._v(" "),i("div",{staticClass:"item-input-wrap"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.emoji,expression:"emoji"}],attrs:{type:"text",maxlength:"1",placeholder:"❔",required:""},domProps:{value:t.emoji},on:{input:function(e){e.target.composing||(t.emoji=e.target.value)}}})])])])]),t._v(" "),i("li",[i("div",{staticClass:"item-content item-input"},[i("div",{staticClass:"item-inner"},[i("div",{staticClass:"item-title item-label"},[t._v("Měřené období")]),t._v(" "),i("div",{staticClass:"item-input-wrap"},[i("select",{directives:[{name:"model",rawName:"v-model",value:t.period,expression:"period"}],on:{change:function(e){var i=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.period=e.target.multiple?i:i[0]}}},[i("option",{attrs:{value:"day"}},[t._v("Den")]),t._v(" "),i("option",{attrs:{value:"week"}},[t._v("Týden")]),t._v(" "),i("option",{attrs:{value:"month"}},[t._v("Měsíc")]),t._v(" "),i("option",{attrs:{value:"quarter"}},[t._v("Čtvrtletí")]),t._v(" "),i("option",{attrs:{value:"year"}},[t._v("Rok")])])])])])])])]),t._v(" "),0!==t.id?i("div",{},[i("div",{staticClass:"block-title"},[t._v("Další volby")]),t._v(" "),i("div",{staticClass:"list"},[i("ul",[i("li",{on:{click:t.reset}},[t._m(0)]),t._v(" "),i("li",{on:{click:t.remove}},[t._m(1)])])])]):t._e()])],1)},a=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"item-content"},[i("div",{staticClass:"item-inner"},[i("div",{staticClass:"item-title text-color-red"},[t._v("Vynulovat jednotku")])])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"item-content"},[i("div",{staticClass:"item-inner"},[i("div",{staticClass:"item-title text-color-red"},[t._v("Smazat jednotku")])])])}],n={render:s,staticRenderFns:a};e.a=n},function(t,e,i){"use strict";function s(t){i(94)}var a=i(31),n=i(95),r=i(3),o=s,c=r(a.a,n.a,!1,o,null,null);e.a=c.exports},function(t,e){},function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"page"},[i("app-navbar",[i("a",{staticClass:"link",attrs:{slot:"left"},on:{click:function(e){t.$router.go("-1")}},slot:"left"},[t._v("Zrušit")]),t._v(" "),i("a",{staticClass:"link",attrs:{slot:"right"},on:{click:t.submit},slot:"right"},[t._v("Uložit")])]),t._v(" "),i("div",{staticClass:"page-content"},[i("div",{staticClass:"block-title"},[0===t.id?i("span",[t._v("Nový záznam")]):i("span",[t._v("Upravit záznam")])]),t._v(" "),i("form",{ref:"form",staticClass:"list",on:{submit:function(e){return e.preventDefault(),t.submit(e)}}},[i("ul",[i("li",[i("div",{staticClass:"item-content item-input"},[i("div",{staticClass:"item-inner"},[i("div",{staticClass:"item-title item-label"},[t._v("Jednotka")]),t._v(" "),i("div",{staticClass:"item-input-wrap"},[i("select",{directives:[{name:"model",rawName:"v-model",value:t.metric,expression:"metric"}],attrs:{required:""},on:{change:function(e){var i=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.metric=e.target.multiple?i:i[0]}}},[i("option",{domProps:{value:null}},[t._v("Vyber jednotku")]),t._v(" "),t._l(t.metrics,function(e){return i("option",{key:e.id,domProps:{value:e.id}},[t._v("\n                    "+t._s(e.emoji)+" "+t._s(e.name)+"\n                  ")])})],2)])])])]),t._v(" "),i("li",[i("div",{staticClass:"item-content item-input"},[i("div",{staticClass:"item-inner"},[i("div",{staticClass:"item-title item-label"},[t._v("Datum a čas")]),t._v(" "),i("div",{staticClass:"item-input-wrap"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.time,expression:"time"}],attrs:{type:"datetime-local",max:t.time,required:""},domProps:{value:t.time},on:{input:function(e){e.target.composing||(t.time=e.target.value)}}})])])])])])]),t._v(" "),0!==t.id?i("div",{staticClass:"list"},[i("ul",[i("li",{on:{click:t.remove}},[t._m(0)])])]):t._e()])],1)},a=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"item-content"},[i("div",{staticClass:"item-inner"},[i("div",{staticClass:"item-title text-color-red"},[t._v("Smazat záznam")])])])}],n={render:s,staticRenderFns:a};e.a=n},function(t,e,i){"use strict";var s=i(32),a=i(97),n=i(3),r=n(s.a,a.a,!1,null,null,null);e.a=r.exports},function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"view"},[i("div",{staticClass:"page"},[i("app-toolbar"),t._v(" "),0===t.recordsByDay.length?i("empty-page",[i("p",[t._v("Zatím nemáš záznam"),i("br"),t._v("žádné počítané jednotky.")])]):t._e(),t._v(" "),t.recordsByDay.length?i("div",{staticClass:"page-content"},[i("div",{staticClass:"timeline margin-bottom"},t._l(t.recordsByDay,function(e){return i("div",{key:e.day,staticClass:"timeline-item"},[i("div",{staticClass:"timeline-item-date"},[t._v(t._s(t._f("date")(e.day)))]),t._v(" "),i("div",{staticClass:"timeline-item-divider"}),t._v(" "),i("div",{staticClass:"timeline-item-content"},t._l(e.items,function(e){return i("div",{key:e.time,staticClass:"timeline-item-inner"},[i("div",{staticClass:"timeline-item-time"},[t._v(t._s(t._f("time")(e.time)))]),t._v(" "),i("div",{staticClass:"timeline-item-title"},[t._v(t._s(e.name))])])}))])}))]):t._e()],1)])},a=[],n={render:s,staticRenderFns:a};e.a=n},function(t,e,i){"use strict";var s=i(33),a=i(99),n=i(3),r=n(s.a,a.a,!1,null,null,null);e.a=r.exports},function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"view"},[i("div",{staticClass:"page"},[i("app-navbar",[i("span",{attrs:{slot:"title"},slot:"title"},[t._v("Hups!")])]),t._v(" "),i("app-toolbar"),t._v(" "),i("empty-page",[i("p",[t._v("Nemám páru jak se ti to povedlo,"),i("br"),t._v("ale nemůžu najít co hledáš.")]),t._v(" "),i("router-link",{attrs:{to:"/"}},[t._v("Zpět na hlavní obrazovku")])],1)],1)])},a=[],n={render:s,staticRenderFns:a};e.a=n},function(t,e,i){"use strict";var s=i(11),a=i(101),n=i(102);s.a.use(a.a),e.a=new a.a.Store({modules:{metrics:{namespaced:!0,state:{metrics:[]},mutations:{SWAP:function(t,e){var i=t.metrics[e.from];t.metrics[e.from]=t.metrics[e.to],t.metrics[e.to]=i},SAVE:function(t,e){if(e.id){var i=t.metrics.findIndex(function(t){return t.id===e.id});s.a.set(t.metrics,i,e)}else e.id=Date.now(),t.metrics.push(e)},DELETE:function(t,e){t.metrics=t.metrics.filter(function(t){return t.id!==e})}}},records:{namespaced:!0,state:{records:[]},mutations:{DELETE:function(t,e){t.records=t.records.filter(function(t){return t.time!==e})},RESET:function(t,e){t.records=t.records.filter(function(t){return t.metric!==e})},SAVE:function(t,e){e.id&&e.it!==e.time&&(t.records=t.records.filter(function(t){return t.time!==e.id})),delete e.id,t.records.push(e),t.records.sort(function(t,e){return e.time-t.time})}}}},plugins:[Object(n.a)()]})},,,,,function(t,e,i){"use strict";var s=i(11),a=i(5),n=i.n(a);s.a.filter("datetime",function(t){return n()(t).format("ddd D. MMMM HH:mm")}),s.a.filter("time",function(t){return n()(t).format("HH:mm")}),s.a.filter("date",function(t){return n()(t).format("D. MMM")}),s.a.filter("fromnow",function(t){return n()(t).fromNow()}),s.a.filter("trim",function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:24;return t.length>e?t.substring(0,e-1)+"…":t}),s.a.filter("period",function(t){return"day"===t?"denně":"week"===t?"týdně":"month"===t?"měsíčně":"quarter"===t?"čtvrtletně":"year"===t?"ročně":"měřené období"})},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e){}],[40]);
//# sourceMappingURL=app.7c2a48eedd08b4f8a713.js.map