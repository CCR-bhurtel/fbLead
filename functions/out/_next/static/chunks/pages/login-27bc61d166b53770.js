(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[459],{6429:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/login",function(){return r(4759)}])},6207:function(e,t){"use strict";t.Z={src:"/_next/static/media/logo.84dd46a7.png",height:40,width:156,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAACCAMAAABSSm3fAAAAG1BMVEUkg8UjhMJpl6IcfsEzmcwff7+Di38ZfcZHhKc1/KZ/AAAACXRSTlM2RWBhBSBAUU9ap+PwAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGklEQVR4nGNg4GBjYGBkZWFgZ2JiZmRmZAAAAccALJ5Yx3YAAAAASUVORK5CYII=",blurWidth:8,blurHeight:2}},4759:function(e,t,r){"use strict";r.r(t);var a=r(5766),o=r(2253),s=r(4932),i=r(1309),n=r(5893),l=r(7294),c=r(6207),d=r(6501),u=r(1163),p=r(8506);r(3294);var m=r(6154);t.default=function(){var e=(0,i._)((0,l.useState)({email:"",password:""}),2),t=e[0],r=e[1],f=(0,l.useContext)(p.Vo),g=f.dispatch,h=f.state,b=(0,u.useRouter)(),y=function(e){m.Z.get("/api/user",{headers:{"x-auth-token":e}}).then(function(t){g({type:"USER_LOADED",payload:{token:e}})}).catch(function(e){console.log(e),g({type:"AUTHENTICATION_ERROR"})})};(0,l.useEffect)(function(){var e=localStorage.getItem("token");e&&y(e)},[]),(0,l.useEffect)(function(){h.isLoggedIn&&b.push("/dashboard")},[h.isLoggedIn,b]);var x=function(e){r((0,s._)((0,o._)({},t),(0,a._)({},e.target.name,e.target.value)))};return(0,n.jsxs)("div",{className:"container min-w-screen min-h-screen flex items-center justify-center",children:[(0,n.jsx)(d.x7,{}),(0,n.jsxs)("div",{className:"login-wrapper shadow-lg rounded-md p-2 flex-col flex items-center justify-items-start min-w-[500px] max-w-[700px]",children:[(0,n.jsx)("img",{src:c.Z.src,alt:"infologo",className:"w-[120px]"}),(0,n.jsxs)("form",{onSubmit:function(e){e.preventDefault(),t.email&&t.password||d.Am.error("Please enter all data"),m.Z.post("/api/user/login",(0,o._)({},t)).then(function(e){var t=e.data;localStorage.setItem("token",t.token),d.Am.success("Logged in successfully"),g("LOGGED_IN",{token:t.token}),b.push("/dashboard")}).catch(function(e){var t;console.log(e),d.Am.error((null===(t=e.response)||void 0===t?void 0:t.data.message)||"Error signing up"),g("AUTHENTICATION_ERROR")})},className:"formContainer flex flex-col items-center",children:[(0,n.jsx)("input",{type:"email",name:"email",onChange:x,value:t.email,placeholder:"Email",required:!0,className:"outline-0 border-[0.5px] mt-4 border-gray-400 focus:border rounded-md focus:border-blue-300 w-[20rem] p-[10px]"}),(0,n.jsx)("input",{type:"password",onChange:x,value:t.password,name:"password",placeholder:"Password",required:!0,className:"outline-0 border-[0.5px] mt-4 border-gray-400 rounded-md focus:border rounde-md focus:border-blue-300 w-[20rem] p-[10px]"}),(0,n.jsx)("button",{className:"bg-blue-600 mt-4 text-white w-[5rem] p-3 rounded-md hover:bg-transparent hover:border-[1px] hover:border-blue-600 hover:text-blue-600",children:"Login"})]})]})]})}},1163:function(e,t,r){e.exports=r(6885)},6501:function(e,t,r){"use strict";let a,o;r.d(t,{x7:function(){return eo},Am:function(){return U}});var s,i=r(7294);let n={data:""},l=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||n,c=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,d=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,p=(e,t)=>{let r="",a="",o="";for(let s in e){let i=e[s];"@"==s[0]?"i"==s[1]?r=s+" "+i+";":a+="f"==s[1]?p(i,s):s+"{"+p(i,"k"==s[1]?"":t)+"}":"object"==typeof i?a+=p(i,t?t.replace(/([^,])+/g,e=>s.replace(/(^:.*)|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):s):null!=i&&(s=/^--/.test(s)?s:s.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=p.p?p.p(s,i):s+":"+i+";")}return r+(t&&o?t+"{"+o+"}":o)+a},m={},f=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+f(e[r]);return t}return e},g=(e,t,r,a,o)=>{var s,i;let n=f(e),l=m[n]||(m[n]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(n));if(!m[l]){let t=n!==e?e:(e=>{let t,r,a=[{}];for(;t=c.exec(e.replace(d,""));)t[4]?a.shift():t[3]?(r=t[3].replace(u," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(u," ").trim();return a[0]})(e);m[l]=p(o?{["@keyframes "+l]:t}:t,r?"":"."+l)}let g=r&&m.g?m.g:null;return r&&(m.g=m[l]),s=m[l],i=t,g?i.data=i.data.replace(g,s):-1===i.data.indexOf(s)&&(i.data=a?s+i.data:i.data+s),l},h=(e,t,r)=>e.reduce((e,a,o)=>{let s=t[o];if(s&&s.call){let e=s(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;s=t?"."+t:e&&"object"==typeof e?e.props?"":p(e,""):!1===e?"":e}return e+a+(null==s?"":s)},"");function b(e){let t=this||{},r=e.call?e(t.p):e;return g(r.unshift?r.raw?h(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,l(t.target),t.g,t.o,t.k)}b.bind({g:1});let y,x,v,A=b.bind({k:1});function w(e,t){let r=this||{};return function(){let a=arguments;function o(s,i){let n=Object.assign({},s),l=n.className||o.className;r.p=Object.assign({theme:x&&x()},n),r.o=/ *go\d+/.test(l),n.className=b.apply(r,a)+(l?" "+l:""),t&&(n.ref=i);let c=e;return e[0]&&(c=n.as||e,delete n.as),v&&c[0]&&v(n),y(c,n)}return t?t(o):o}}var E=e=>"function"==typeof e,k=(e,t)=>E(e)?e(t):e,N=(a=0,()=>(++a).toString()),_=()=>{if(void 0===o&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");o=!e||e.matches}return o},j=new Map,C=e=>{if(j.has(e))return;let t=setTimeout(()=>{j.delete(e),T({type:4,toastId:e})},1e3);j.set(e,t)},O=e=>{let t=j.get(e);t&&clearTimeout(t)},I=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return t.toast.id&&O(t.toast.id),{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return e.toasts.find(e=>e.id===r.id)?I(e,{type:1,toast:r}):I(e,{type:0,toast:r});case 3:let{toastId:a}=t;return a?C(a):e.toasts.forEach(e=>{C(e.id)}),{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+o}))}}},$=[],R={toasts:[],pausedAt:void 0},T=e=>{R=I(R,e),$.forEach(e=>{e(R)})},D={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},S=(e={})=>{let[t,r]=(0,i.useState)(R);(0,i.useEffect)(()=>($.push(r),()=>{let e=$.indexOf(r);e>-1&&$.splice(e,1)}),[t]);let a=t.toasts.map(t=>{var r,a;return{...e,...e[t.type],...t,duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||D[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...t,toasts:a}},L=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||N()}),P=e=>(t,r)=>{let a=L(t,e,r);return T({type:2,toast:a}),a.id},U=(e,t)=>P("blank")(e,t);U.error=P("error"),U.success=P("success"),U.loading=P("loading"),U.custom=P("custom"),U.dismiss=e=>{T({type:3,toastId:e})},U.remove=e=>T({type:4,toastId:e}),U.promise=(e,t,r)=>{let a=U.loading(t.loading,{...r,...null==r?void 0:r.loading});return e.then(e=>(U.success(k(t.success,e),{id:a,...r,...null==r?void 0:r.success}),e)).catch(e=>{U.error(k(t.error,e),{id:a,...r,...null==r?void 0:r.error})}),e};var Z=(e,t)=>{T({type:1,toast:{id:e,height:t}})},z=()=>{T({type:5,time:Date.now()})},M=e=>{let{toasts:t,pausedAt:r}=S(e);(0,i.useEffect)(()=>{if(r)return;let e=Date.now(),a=t.map(t=>{if(t.duration===1/0)return;let r=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(r<0){t.visible&&U.dismiss(t.id);return}return setTimeout(()=>U.dismiss(t.id),r)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[t,r]);let a=(0,i.useCallback)(()=>{r&&T({type:6,time:Date.now()})},[r]),o=(0,i.useCallback)((e,r)=>{let{reverseOrder:a=!1,gutter:o=8,defaultPosition:s}=r||{},i=t.filter(t=>(t.position||s)===(e.position||s)&&t.height),n=i.findIndex(t=>t.id===e.id),l=i.filter((e,t)=>t<n&&e.visible).length;return i.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+o,0)},[t]);return{toasts:t,handlers:{updateHeight:Z,startPause:z,endPause:a,calculateOffset:o}}},B=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${A`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${A`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${A`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,H=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${A`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`} 1s linear infinite;
`,G=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${A`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${A`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,F=w("div")`
  position: absolute;
`,Y=w("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,V=w("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${A`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,X=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?i.createElement(V,null,t):t:"blank"===r?null:i.createElement(Y,null,i.createElement(H,{...a}),"loading"!==r&&i.createElement(F,null,"error"===r?i.createElement(B,{...a}):i.createElement(G,{...a})))},K=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,W=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,q=w("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,J=w("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Q=(e,t)=>{let r=e.includes("top")?1:-1,[a,o]=_()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[K(r),W(r)];return{animation:t?`${A(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${A(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},ee=i.memo(({toast:e,position:t,style:r,children:a})=>{let o=e.height?Q(e.position||t||"top-center",e.visible):{opacity:0},s=i.createElement(X,{toast:e}),n=i.createElement(J,{...e.ariaProps},k(e.message,e));return i.createElement(q,{className:e.className,style:{...o,...r,...e.style}},"function"==typeof a?a({icon:s,message:n}):i.createElement(i.Fragment,null,s,n))});s=i.createElement,p.p=void 0,y=s,x=void 0,v=void 0;var et=({id:e,className:t,style:r,onHeightUpdate:a,children:o})=>{let s=i.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return i.createElement("div",{ref:s,className:t,style:r},o)},er=(e,t)=>{let r=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:_()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...r?{top:0}:{bottom:0},...a}},ea=b`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,eo=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:o,containerStyle:s,containerClassName:n})=>{let{toasts:l,handlers:c}=M(r);return i.createElement("div",{style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...s},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},l.map(r=>{let s=r.position||t,n=er(s,c.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}));return i.createElement(et,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?ea:"",style:n},"custom"===r.type?k(r.message,r):o?o(r):i.createElement(ee,{toast:r,position:s}))}))}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=6429)}),_N_E=e.O()}]);