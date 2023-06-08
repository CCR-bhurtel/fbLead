(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[829],{9219:function(t,e,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/databoard",function(){return a(1750)}])},1750:function(t,e,a){"use strict";a.r(e),a.d(e,{default:function(){return F}});var n=a(1309),i=a(4586),r=a(5893),s=a(7294),l=function(){return(0,r.jsxs)("div",{className:"item",children:[(0,r.jsxs)("div",{style:{textAlign:"start"},children:[(0,r.jsx)("i",{className:"fa-solid fa-chart-simple"})," Moduli Grafico Lineare"]}),(0,r.jsx)("canvas",{id:"chart"})]})},o=function(){return(0,r.jsxs)("div",{className:"item",children:[(0,r.jsxs)("div",{style:{textAlign:"start"},children:[(0,r.jsx)("i",{className:"fa-solid fa-chart-simple"})," Moduli Grafico a Torta"]}),(0,r.jsx)("div",{style:{height:"50vh"},id:"chart-container"})]})},d=a(2882),c=a(7906),u=a(3184),f=a(8509),h=a(7196),m=a(295),g=function(t){var e=t.data;return(0,r.jsx)(d.Z,{children:(0,r.jsxs)(c.Z,{children:[(0,r.jsx)(u.Z,{children:(0,r.jsxs)(f.Z,{children:[(0,r.jsx)(h.Z,{children:"Modulo"}),(0,r.jsx)(h.Z,{align:"right",children:"Totale Soggiorno"}),(0,r.jsx)(h.Z,{align:"right",children:"Preventivo Confermato"})]})}),(0,r.jsx)(m.Z,{children:e.map(function(t){return(0,r.jsxs)(f.Z,{sx:{"&:last-child td, &:last-child th":{border:0}},children:[(0,r.jsx)(h.Z,{align:"left",children:t.name}),(0,r.jsx)(h.Z,{align:"right",children:t.value.total.toLocaleString("de-DE",{minimumFractionDigits:2,maximumFractionDigits:2})+" $"}),(0,r.jsx)(h.Z,{align:"right",children:t.value.preventivo.toLocaleString("de-DE",{minimumFractionDigits:2,maximumFractionDigits:2})+" $"})]},t.name)})})]})})},D=a(6501),x={src:"/_next/static/media/loading.14bfe4a0.gif",height:200,width:200,blurWidth:0,blurHeight:0},y=function(){return(0,r.jsx)("div",{style:{minWidth:"100%",minHeight:"100%",display:"flex",alignItems:"center",justifyContent:"center"},children:(0,r.jsx)("img",{src:x.src,style:{width:"10rem"},alt:"Loading..."})})},p=a(5437),w=a(2127),b=a(8429),O=a(6154),j=a(3053),v=a(9122),L=a(194),k=a(3761),_=a(405),Z=a(1106),E=a(2414),S=a(8548),M=a(8187),C=a(1290),T=a(7852),W=a(2946),F=function(){var t=function(){x(d()),N(a())},e=function(){f(!0),O.Z.get("/api/data?startDate=".concat(X.startDate,"&endDate=").concat(X.endDate)).then(function(t){var e=t.data;R(e.pieChartAndTableData.pieChartData),G(e.barGraphData),B(e.pieChartAndTableData.tableData),f(!1)}).catch(function(t){f(!1),D.Am.error("Error loading data"),console.log(t)})},a=function(){if(z.length){var t=echarts.init(document.getElementById("chart-container"));return t.setOption({tooltip:{trigger:"item",formatter:function(t){return"".concat(t.data.name,": ").concat(t.data.value.toLocaleString("de-DE",{style:"decimal",useGrouping:!0,minimumFractionDigits:2,maximumFractionDigits:2})," $")}},legend:{top:"5%",left:"center"},series:[{name:"",type:"pie",avoidLabelOverlap:!1,label:{show:!1,position:"center"},itemStyle:{borderColor:"#fff",borderWidth:1},emphasis:{label:{show:!0,fontSize:40,fontWeight:"bold"}},labelLine:{show:!1},data:z}]}),t}},d=function(){var t={labels:I.labels,datasets:[{label:"deal won",data:I.data,fill:!1,borderColor:"rgb(75, 192, 192)",tension:.4}]};if(I.data)try{return new Chart(document.getElementById("chart"),{type:"line",data:t,options:{scales:{y:{ticks:{callback:function(t,e,a){return t.toLocaleString("de-DE",{minimumFractionDigits:2,maximumFractionDigits:2})+" $"}}}},plugins:{tooltip:{callbacks:{label:function(t){var e=t.dataset.label||"";return e&&(e+=": "),e+=t.parsed.y.toLocaleString("de-DE",{minimumFractionDigits:2,maximumFractionDigits:2})+" $"}}},legend:{display:!1}},maintainAspectRatio:!1,aspectRatio:.8}})}catch(t){}},c=(0,n._)((0,s.useState)(!0),2),u=c[0],f=c[1],h=(0,n._)((0,s.useState)(null),2),m=h[0],x=h[1],F=(0,n._)((0,s.useState)(null),2),Y=F[0],N=F[1],A=(0,n._)((0,s.useState)([]),2),z=A[0],R=A[1],$=(0,n._)((0,s.useState)({}),2),I=$[0],G=$[1],P=(0,n._)((0,s.useState)([]),2),Q=P[0],B=P[1],H=(0,n._)((0,s.useState)({startDate:(0,w.kh)(),endDate:new Date,key:"selection"}),2),X=H[0],q=H[1];(0,s.useEffect)(function(){e()},[]),(0,s.useEffect)(function(){console.log(u)},[u]),(0,s.useEffect)(function(){t()},[z,I,Q]);var J={startOfWeek:(0,v.default)(new Date),endOfWeek:(0,L.default)(new Date),startOfLastWeek:(0,v.default)((0,k.default)(new Date,-7)),endOfLastWeek:(0,L.default)((0,k.default)(new Date,-7)),startOfToday:(0,_.default)(new Date),startOfLastSevenDay:(0,_.default)((0,k.default)(new Date,-7)),startOfLastThirtyDay:(0,_.default)((0,k.default)(new Date,-30)),startOfLastNintyDay:(0,_.default)((0,k.default)(new Date,-90)),endOfToday:(0,Z.default)(new Date),startOfYesterday:(0,_.default)((0,k.default)(new Date,-1)),endOfYesterday:(0,Z.default)((0,k.default)(new Date,-1)),startOfMonth:(0,E.default)(new Date),endOfMonth:(0,S.default)(new Date),startOfLastMonth:(0,E.default)((0,M.default)(new Date,-1)),endOfLastMonth:(0,S.default)((0,M.default)(new Date,-1)),startOfYear:(0,C.Z)(new Date),endOfYear:(0,T.Z)(new Date),startOflastYear:(0,C.Z)((0,W.default)(new Date,-1)),endOflastYear:(0,T.Z)((0,W.default)(new Date,-1))},K=(0,i._)((0,p.$z)([{label:"Oggi",range:function(){return{startDate:J.startOfToday,endDate:J.endOfToday}}},{label:"Ieri",range:function(){return{startDate:J.startOfYesterday,endDate:J.endOfYesterday}}},{label:"Questa settimana",range:function(){return{startDate:J.startOfWeek,endDate:J.endOfWeek}}},{label:"La settimana scorsa",range:function(){return{startDate:J.startOfLastWeek,endDate:J.endOfLastWeek}}},{label:"Questo mese",range:function(){return{startDate:J.startOfMonth,endDate:J.endOfMonth}}},{label:"Lo scorso mese",range:function(){return{startDate:J.startOfLastMonth,endDate:J.endOfLastMonth}}},{label:"Quest'anno",range:function(){return{startDate:J.startOfYear,endDate:J.endOfYear}}},{label:"L'anno scorso",range:function(){return{startDate:J.startOflastYear,endDate:J.endOflastYear}}}]));return(0,s.useEffect)(function(){window.addEventListener("resize",function(){m&&m.resize(),Y&&Y.resize()})},[m,Y]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(D.x7,{}),u?(0,r.jsx)(y,{}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{style:{margin:"2rem"},children:[(0,r.jsxs)("div",{style:{display:"flex",minWidth:"100%",alignItems:"center",justifyContent:"center",flexDirection:"column"},children:[(0,r.jsx)(p.Dw,{locale:b.Z,onChange:function(t){q(t.selection)},ranges:[X],showPreview:!1,staticRanges:K,inputRanges:[],renderMonthText:function(t){return(0,j.default)(t,"MMMM yyyy",{locale:b.Z})}}),(0,r.jsx)("button",{style:{padding:"0.5rem",fontSize:"1.1rem",backgroundColor:"blue",marginTop:"1rem",color:"white",borderRadius:"10px"},type:"primary",onClick:e,children:"Aggiorna Dati"})]}),(0,r.jsxs)("div",{className:"section",children:[(0,r.jsx)(o,{}),(0,r.jsx)(l,{})]})]}),(0,r.jsx)("div",{style:{margin:"60px",padding:"5px",backgroundColor:"white",borderRadius:"5px"},children:(0,r.jsx)(g,{data:Q})})]})]})}},2127:function(t,e){e.kh=function(){var t=new Date;return new Date(t.getTime()-6048e5)}}},function(t){t.O(0,[915,254,774,888,179],function(){return t(t.s=9219)}),_N_E=t.O()}]);