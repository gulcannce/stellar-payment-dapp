import{A as e,B as t,C as n,D as r,E as i,F as a,H as o,I as s,L as c,M as l,N as u,O as d,P as f,R as p,S as m,T as h,V as g,_ as ee,b as te,c as _,d as ne,f as re,h as ie,i as v,l as y,n as ae,o as oe,p as se,r as b,s as ce,t as le,u as x,v as ue,w as de,x as S,z as fe}from"./utils-CvXVmuMo.js";var pe=function(e,t,n,r){var i;t[0]=0;for(var a=1;a<t.length;a++){var o=t[a++],s=t[a]?(t[0]|=o?1:2,n[t[a++]]):t[++a];o===3?r[0]=s:o===4?r[1]=Object.assign(r[1]||{},s):o===5?(r[1]=r[1]||{})[t[++a]]=s:o===6?r[1][t[++a]]+=s+``:o?(i=e.apply(s,pe(e,s,n,[``,null])),r.push(i),s[0]?t[0]|=2:(t[a-2]=0,t[a]=i)):r.push(s)}return r},me=new Map;function he(e){var t=me.get(this);return t||(t=new Map,me.set(this,t)),(t=pe(this,t.get(e)||(t.set(e,t=function(e){for(var t,n,r=1,i=``,a=``,o=[0],s=function(e){r===1&&(e||(i=i.replace(/^\s*\n\s*|\s*\n\s*$/g,``)))?o.push(0,e,i):r===3&&(e||i)?(o.push(3,e,i),r=2):r===2&&i===`...`&&e?o.push(4,e,0):r===2&&i&&!e?o.push(5,0,!0,i):r>=5&&((i||!e&&r===5)&&(o.push(r,0,i,n),r=6),e&&(o.push(r,e,0,n),r=6)),i=``},c=0;c<e.length;c++){c&&(r===1&&s(),s(c));for(var l=0;l<e[c].length;l++)t=e[c][l],r===1?t===`<`?(s(),o=[o],r=3):i+=t:r===4?i===`--`&&t===`>`?(r=1,i=``):i=t+i[0]:a?t===a?a=``:i+=t:t===`"`||t===`'`?a=t:t===`>`?(s(),r=1):r&&(t===`=`?(r=5,n=i,i=``):t===`/`&&(r<5||e[c][l+1]===`>`)?(s(),r===3&&(o=o[0]),r=o,(o=o[0]).push(2,0,r),r=0):t===` `||t===`	`||t===`
`||t===`\r`?(s(),r=2):i+=t),r===3&&i===`!--`&&(r=4,o=o[0])}return s(),o}(e)),t),arguments,[])).length>1?t:t[0]}var C=he.bind(o),w=globalThis.localStorage,ge=globalThis.document,_e=s(()=>{if(ge)for(let[e,t]of Object.entries(h.value))ge.documentElement.style.setProperty(`--swk-${e}`,t)}),ve=s(()=>{if(w&&y.value)try{let t=w.getItem(e.usedWalletsIds),n=t?new Set(JSON.parse(t)):new Set;n.has(y.value.productId)&&n.delete(y.value.productId),w.setItem(e.usedWalletsIds,JSON.stringify([y.value.productId,...n]))}catch(e){console.error(e)}}),ye=s(()=>{w&&(_.value?w.setItem(e.activeAddress,_.value):w.removeItem(e.activeAddress),m.value?w.setItem(e.selectedModuleId,m.value):w.removeItem(e.selectedModuleId),re.value!==void 0&&w.setItem(e.hardwareWalletPaths,JSON.stringify(re.value)),i.value!==void 0&&w.setItem(e.wcSessionPaths,JSON.stringify(i.value)))}),be;function xe(e){return[...e.v,(e.i?`!`:``)+e.n].join(`:`)}function Se(e,t=`,`){return e.map(xe).join(t)}var Ce=typeof CSS<`u`&&CSS.escape||(e=>e.replace(/[!"'`*+.,;:\\/<=>?@#$%&^|~()[\]{}]/g,`\\$&`).replace(/^\d/,`\\3$& `));function T(e){for(var t=9,n=e.length;n--;)t=Math.imul(t^e.charCodeAt(n),1597334677);return`#`+((t^t>>>9)>>>0).toString(36)}function we(e,t=`@media `){return t+E(e).map(e=>(typeof e==`string`&&(e={min:e}),e.raw||Object.keys(e).map(t=>`(${t}-width:${e[t]})`).join(` and `))).join(`,`)}function E(e=[]){return Array.isArray(e)?e:e==null?[]:[e]}function Te(e){return e}function Ee(){}var D={d:0,b:134217728,c:268435456,a:671088640,u:805306368,o:939524096};function De(e){return e.match(/[-=:;]/g)?.length||0}function Oe(e){return Math.min(/(?:^|width[^\d]+)(\d+(?:.\d+)?)(p)?/.test(e)?Math.max(0,29.63*(RegExp.$1/(RegExp.$2?15:1))**.137-43):0,15)<<22|Math.min(De(e),15)<<18}var ke=[`rst-c`,`st-ch`,`h-chi`,`y-lin`,`nk`,`sited`,`ecked`,`pty`,`ad-on`,`cus-w`,`ver`,`cus`,`cus-v`,`tive`,`sable`,`tiona`,`quire`];function Ae({n:e,i:t,v:n=[]},r,i,a){e&&=xe({n:e,i:t,v:n}),a=[...E(a)];for(let e of n){let t=r.theme(`screens`,e);for(let n of E(t&&we(t)||r.v(e))){var o;a.push(n),i|=t?67108864|Oe(n):e==`dark`?1073741824:n[0]==`@`?Oe(n):(o=n,1<<~(/:([a-z-]+)/.test(o)&&~ke.indexOf(RegExp.$1.slice(2,7))||-18))}}return{n:e,p:i,r:a,i:t}}var je=new Map;function Me(e){if(e.d){let t=[],n=Ne(e.r.reduce((e,n)=>n[0]==`@`?(t.push(n),e):n?Ne(e,e=>Ne(n,t=>{let n=/(:merge\(.+?\))(:[a-z-]+|\\[.+])/.exec(t);if(n){let r=e.indexOf(n[1]);return~r?e.slice(0,r)+n[0]+e.slice(r+n[1].length):Pe(e,t)}return Pe(t,e)})):e,`&`),t=>Pe(t,e.n?`.`+Ce(e.n):``));return n&&t.push(n.replace(/:merge\((.+?)\)/g,`$1`)),t.reduceRight((e,t)=>t+`{`+e+`}`,e.d)}}function Ne(e,t){return e.replace(/ *((?:\(.+?\)|\[.+?\]|[^,])+) *(,|$)/g,(e,n,r)=>t(n)+r)}function Pe(e,t){return e.replace(/&/g,t)}var Fe=new Intl.Collator(`en`,{numeric:!0});function Ie(e,t){for(var n=0,r=e.length;n<r;){let i=r+n>>1;0>=Le(e[i],t)?n=i+1:r=i}return r}function Le(e,t){let n=e.p&D.o;return n==(t.p&D.o)&&(n==D.b||n==D.o)?0:e.p-t.p||e.o-t.o||Fe.compare(Re(e.n),Re(t.n))||Fe.compare(ze(e.n),ze(t.n))}function Re(e){return(e||``).split(/:/).pop().split(`/`).pop()||`\0`}function ze(e){return(e||``).replace(/\W/g,e=>String.fromCharCode(127+e.charCodeAt(0)))+`\0`}function Be(e,t){return Math.round(parseInt(e,16)*t)}function O(e,t={}){if(typeof e==`function`)return e(t);let{opacityValue:n=`1`,opacityVariable:r}=t,i=r?`var(${r})`:n;if(e.includes(`<alpha-value>`))return e.replace(`<alpha-value>`,i);if(e[0]==`#`&&(e.length==4||e.length==7)){let t=(e.length-1)/3,n=[17,1,.062272][t-1];return`rgba(${[Be(e.substr(1,t),n),Be(e.substr(1+t,t),n),Be(e.substr(1+2*t,t),n),i]})`}return i==`1`?e:i==`0`?`#0000`:e.replace(/^(rgb|hsl)(\([^)]+)\)$/,`$1a$2,${i})`)}function Ve(e,t,n,r,i=[]){return function e(t,{n,p:r,r:i=[],i:a},o){let s=[],c=``,l=0,u=0;for(let p in t||{}){var d,f;let m=t[p];if(p[0]==`@`){if(!m)continue;if(p[1]==`a`){s.push(...Ge(n,r,k(``+m),o,r,i,a,!0));continue}if(p[1]==`l`){for(let t of E(m))s.push(...e(t,{n,p:(d=D[p[7]],r&~D.o|d),r:p[7]==`d`?[]:i,i:a},o));continue}if(p[1]==`i`){s.push(...E(m).map(e=>({p:-1,o:0,r:[],d:p+` `+e})));continue}if(p[1]==`k`){s.push({p:D.d,o:0,r:[p],d:e(m,{p:D.d},o).map(Me).join(``)});continue}if(p[1]==`f`){s.push(...E(m).map(t=>({p:D.d,o:0,r:[p],d:e(t,{p:D.d},o).map(Me).join(``)})));continue}}if(typeof m!=`object`||Array.isArray(m))p==`label`&&m?n=m+T(JSON.stringify([r,a,t])):(m||m===0)&&(p=p.replace(/[A-Z]/g,e=>`-`+e.toLowerCase()),u+=1,l=Math.max(l,(f=p)[0]==`-`?0:De(f)+(/^(?:(border-(?!w|c|sty)|[tlbr].{2,4}m?$|c.{7,8}$)|([fl].{5}l|g.{8}$|pl))/.test(f)?+!!RegExp.$1||-!!RegExp.$2:0)+1),c+=(c?`;`:``)+E(m).map(e=>o.s(p,He(``+e,o.theme)+(a?` !important`:``))).join(`;`));else if(p[0]==`@`||p.includes(`&`)){let t=r;p[0]==`@`&&(p=p.replace(/\bscreen\(([^)]+)\)/g,(e,n)=>{let r=o.theme(`screens`,n);return r?(t|=67108864,we(r,``)):e}),t|=Oe(p)),s.push(...e(m,{n,p:t,r:[...i,p],i:a},o))}else s.push(...e(m,{p:r,r:[...i,p]},o))}return s.unshift({n,p:r,o:Math.max(0,15-u)+1.5*Math.min(l||15,15),r:i,d:c}),s.sort(Le)}(e,Ae(t,n,r,i),n)}function He(e,t){return e.replace(/theme\((["'`])?(.+?)\1(?:\s*,\s*(["'`])?(.+?)\3)?\)/g,(e,n,r,i,a=``)=>{let o=t(r,a);return typeof o==`function`&&/color|fill|stroke/i.test(r)?O(o):``+E(o).filter(e=>Object(e)!==e)})}function Ue(e,t){let n,r=[];for(let i of e)i.d&&i.n?n?.p==i.p&&``+n.r==``+i.r?(n.c=[n.c,i.c].filter(Boolean).join(` `),n.d=n.d+`;`+i.d):r.push(n={...i,n:i.n&&t}):r.push({...i,n:i.n&&t});return r}function We(e,t,n=D.u,r,i){let a=[];for(let o of e)for(let e of function(e,t,n,r,i){e={...e,i:e.i||i};let a=function(e,t){let n=je.get(e.n);return n?n(e,t):t.r(e.n,e.v[0]==`dark`)}(e,t);return a?typeof a==`string`?({r,p:n}=Ae(e,t,n,r),Ue(We(k(a),t,n,r,e.i),e.n)):Array.isArray(a)?a.map(e=>{var t,i;return{o:0,...e,r:[...E(r),...E(e.r)],p:(t=n,i=e.p??n,t&~D.o|i)}}):Ve(a,e,t,n,r):[{c:xe(e),p:0,o:0,r:[]}]}(o,t,n,r,i))a.splice(Ie(a,e),0,e);return a}function Ge(e,t,n,r,i,a,o,s){return Ue((s?n.flatMap(e=>We([e],r,i,a,o)):We(n,r,i,a,o)).map(e=>e.p&D.o&&(e.n||t==D.b)?{...e,p:e.p&~D.o|t,o:0}:e),e)}function Ke(e,t,n,r){var i;return i=(e,i)=>{let{n:a,p:o,r:s,i:c}=Ae(e,i,t);return n&&Ge(a,t,n,i,o,s,c,r)},je.set(e,i),e}function qe(e,t,n){if(e[e.length-1]!=`(`){let n=[],r=!1,i=!1,a=``;for(let t of e)if(!(t==`(`||/[~@]$/.test(t))){if(t[0]==`!`&&(t=t.slice(1),r=!r),t.endsWith(`:`)){n[t==`dark:`?`unshift`:`push`](t.slice(0,-1));continue}t[0]==`-`&&(t=t.slice(1),i=!i),t.endsWith(`-`)&&(t=t.slice(0,-1)),t&&t!=`&`&&(a+=(a&&`-`)+t)}a&&(i&&(a=`-`+a),t[0].push({n:a,v:n.filter(Je),i:r}))}}function Je(e,t,n){return n.indexOf(e)==t}var Ye=new Map;function k(e){let t=Ye.get(e);if(!t){let n=[],r=[[]],i=0,a=0,o=null,s=0,c=(t,a=0)=>{i!=s&&(n.push(e.slice(i,s+a)),t&&qe(n,r)),i=s+1};for(;s<e.length;s++){let t=e[s];if(a)e[s-1]!=`\\`&&(a+=+(t==`[`)||-(t==`]`));else if(t==`[`)a+=1;else if(o)e[s-1]!=`\\`&&o.test(e.slice(s))&&(o=null,i=s+RegExp.lastMatch.length);else if(t==`/`&&e[s-1]!=`\\`&&(e[s+1]==`*`||e[s+1]==`/`))o=e[s+1]==`*`?/^\*\//:/^[\r\n]/;else if(t==`(`)c(),n.push(t);else if(t==`:`)e[s+1]!=`:`&&c(!1,1);else if(/[\s,)]/.test(t)){c(!0);let e=n.lastIndexOf(`(`);if(t==`)`){let t=n[e-1];if(/[~@]$/.test(t)){let i=r.shift();n.length=e,qe([...n,`#`],r);let{v:a}=r[0].pop();for(let e of i)e.v.splice((e.v[0]==`dark`)-+(a[0]==`dark`),a.length);qe([...n,Ke(t.length>1?t.slice(0,-1)+T(JSON.stringify([t,i])):t+`(`+Se(i)+`)`,D.a,i,/@$/.test(t))],r)}e=n.lastIndexOf(`(`,e-1)}n.length=e+1}else/[~@]/.test(t)&&e[s+1]==`(`&&r.unshift([])}c(!0),Ye.set(e,t=r[0])}return t}function Xe(e,t,n){return t.reduce((t,r,i)=>t+n(r)+e[i+1],e[0])}function Ze(e,t){return Array.isArray(e)&&Array.isArray(e.raw)?Xe(e,t,e=>Qe(e).trim()):t.filter(Boolean).reduce((e,t)=>e+Qe(t),e?Qe(e):``)}function Qe(e){let t,n=``;if(e&&typeof e==`object`)if(Array.isArray(e))(t=Ze(e[0],e.slice(1)))&&(n+=` `+t);else for(let t in e)e[t]&&(n+=` `+t);else e!=null&&typeof e!=`boolean`&&(n+=` `+e);return n}function A(e,t){return Array.isArray(e)?et(Xe(e,t,e=>e!=null&&typeof e!=`boolean`?e:``)):typeof e==`string`?et(e):[e]}var $e=/ *(?:(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}))/g;function et(e){let t;e=e.replace(/\/\*[^]*?\*\/|\s\s+|\n/gm,` `);let n=[{}],r=[n[0]],i=[];for(;t=$e.exec(e);)t[4]&&(n.shift(),i.shift()),t[3]?(i.unshift(t[3]),n.unshift({}),r.push(i.reduce((e,t)=>({[t]:e}),n[0]))):t[4]||(n[0][t[1]]&&(n.unshift({}),r.push(i.reduce((e,t)=>({[t]:e}),n[0]))),n[0][t[1]]=t[2]);return r}function j(e,...t){var n;let r=A(e,t),i=(r.find(e=>e.label)?.label||`css`)+T(JSON.stringify(r));return n=(e,t)=>Ue(r.flatMap(n=>Ve(n,e,t,D.o)),i),je.set(i,n),i}function M(e,t,n){return[e,tt(t,n)]}function tt(e,t){return typeof e==`function`?e:typeof e==`string`&&/^[\w-]+$/.test(e)?(n,r)=>({[e]:t?t(n,r):nt(n,1)}):t=>e||{[t[1]]:nt(t,2)}}function nt(e,t,n=e.slice(t).find(Boolean)||e.$$||e.input){return e.input[0]==`-`?`calc(${n} * -1)`:n}function N(e,t,n,r){return[e,rt(t,n,r)]}function rt(e,t,n){let r=typeof t==`string`?(e,r)=>({[t]:n?n(e,r):e._}):t||(({1:e,_:t},n,r)=>({[e||r]:t}));return(t,n)=>{let i=ot(e||t[1]),a=n.theme(i,t.$$)??I(t.$$,i,n);if(a!=null)return t._=nt(t,0,a),r(t,n,i)}}function P(e,t={},n){return[e,it(t,n)]}function it(e={},t){return(n,r)=>{let{section:i=ot(n[0]).replace(`-`,``)+`Color`}=e,[a,o]=at(n.$$);if(!a)return;let s=r.theme(i,a)||I(a,i,r);if(!s||typeof s==`object`)return;let{opacityVariable:c=`--tw-${n[0].replace(/-$/,``)}-opacity`,opacitySection:l=i.replace(`Color`,`Opacity`),property:u=i,selector:d}=e,f=r.theme(l,o||`DEFAULT`)||o&&I(o,l,r),p=t||(({_:e})=>{let t=F(u,e);return d?{[d]:t}:t});n._={value:O(s,{opacityVariable:c||void 0,opacityValue:f||void 0}),color:e=>O(s,e),opacityVariable:c||void 0,opacityValue:f||void 0};let m=p(n,r);if(!n.dark){let e=r.d(i,a,s);e&&e!==s&&(n._={value:O(e,{opacityVariable:c||void 0,opacityValue:f||`1`}),color:t=>O(e,t),opacityVariable:c||void 0,opacityValue:f||void 0},m={"&":m,[r.v(`dark`)]:p(n,r)})}return m}}function at(e){return(e.match(/^(\[[^\]]+]|[^/]+?)(?:\/(.+))?$/)||[]).slice(1)}function F(e,t){let n={};return typeof t==`string`?n[e]=t:(t.opacityVariable&&t.value.includes(t.opacityVariable)&&(n[t.opacityVariable]=t.opacityValue||`1`),n[e]=t.value),n}function I(e,t,n){if(e[0]==`[`&&e.slice(-1)==`]`){if(e=L(He(e.slice(1,-1),n.theme)),!t)return e;if(!(/color|fill|stroke/i.test(t)&&!(/^color:/.test(e)||/^(#|((hsl|rgb)a?|hwb|lab|lch|color)\(|[a-z]+$)/.test(e))||/image/i.test(t)&&!(/^image:/.test(e)||/^[a-z-]+\(/.test(e))||/weight/i.test(t)&&!(/^(number|any):/.test(e)||/^\d+$/.test(e))||/position/i.test(t)&&/^(length|size):/.test(e)))return e.replace(/^[a-z-]+:/,``)}}function ot(e){return e.replace(/-./g,e=>e[1].toUpperCase())}function L(e){return e.includes(`url(`)?e.replace(/(.*?)(url\(.*?\))(.*?)/g,(e,t=``,n,r=``)=>L(t)+n+L(r)):e.replace(/(^|[^\\])_+/g,(e,t)=>t+` `.repeat(e.length-t.length)).replace(/\\_/g,`_`).replace(/(calc|min|max|clamp)\(.+\)/g,e=>e.replace(/(-?\d*\.?\d(?!\b-.+[,)](?![^+\-/*])\D)(?:%|[a-z]+)?|\))([+\-/*])/g,`$1 $2 `))}function R(e,...t){return Se(k(Ze(e,t)),` `)}function st({presets:e=[],...t}){let n={darkMode:void 0,darkColor:void 0,preflight:!1!==t.preflight&&[],theme:{},variants:E(t.variants),rules:E(t.rules),ignorelist:E(t.ignorelist),hash:void 0,stringify:(e,t)=>e+`:`+t,finalize:[]};for(let r of E([...e,{darkMode:t.darkMode,darkColor:t.darkColor,preflight:!1!==t.preflight&&E(t.preflight),theme:t.theme,hash:t.hash,stringify:t.stringify,finalize:t.finalize}])){let{preflight:e,darkMode:t=n.darkMode,darkColor:i=n.darkColor,theme:a,variants:o,rules:s,ignorelist:c,hash:l=n.hash,stringify:u=n.stringify,finalize:d}=typeof r==`function`?r(n):r;n={preflight:!1!==n.preflight&&!1!==e&&[...n.preflight,...E(e)],darkMode:t,darkColor:i,theme:{...n.theme,...a,extend:{...n.theme.extend,...a?.extend}},variants:[...n.variants,...E(o)],rules:[...n.rules,...E(s)],ignorelist:[...n.ignorelist,...E(c)],hash:l,stringify:u,finalize:[...n.finalize,...E(d)]}}return n}function ct(e,t,n,r,i,a){for(let o of t){let t=n.get(o);t||n.set(o,t=r(o));let s=t(e,i,a);if(s)return s}}function lt(e){var t;return dt(e[0],typeof(t=e[1])==`function`?t:()=>t)}function ut(e){var t,n;return Array.isArray(e)?dt(e[0],tt(e[1],e[2])):dt(e,tt(t,n))}function dt(e,t){return ft(e,(e,n,r,i)=>{let a=n.exec(e);if(a)return a.$$=e.slice(a[0].length),a.dark=i,t(a,r)})}function ft(e,t){let n=E(e).map(pt);return(e,r,i)=>{for(let a of n){let n=t(e,a,r,i);if(n)return n}}}function pt(e){return typeof e==`string`?RegExp(`^`+e+(e.includes(`$`)||e.slice(-1)==`-`?``:`$`)):e}function mt(e,t){let n=st(e),r=function({theme:e,darkMode:t,darkColor:n=Ee,variants:r,rules:i,hash:a,stringify:o,ignorelist:s,finalize:c}){let l=new Map,u=new Map,d=new Map,f=new Map,p=ft(s,(e,t)=>t.test(e));r.push([`dark`,Array.isArray(t)||t==`class`?`${E(t)[1]||`.dark`} &`:typeof t==`string`&&t!=`media`?t:`@media (prefers-color-scheme:dark)`]);let m=typeof a==`function`?e=>a(e,T):a?T:Te;m!==Te&&c.push(e=>({...e,n:e.n&&m(e.n),d:e.d?.replace(/--(tw(?:-[\w-]+)?)\b/g,(e,t)=>`--`+m(t).replace(`#`,``))}));let h={theme:function({extend:e={},...t}){let n={},r={get colors(){return i(`colors`)},theme:i,negative(){return{}},breakpoints(e){let t={};for(let n in e)typeof e[n]==`string`&&(t[`screen-`+n]=e[n]);return t}};return i;function i(r,o,s,c){if(r){if({1:r,2:c}=/^(\S+?)(?:\s*\/\s*([^/]+))?$/.exec(r)||[,r],/[.[]/.test(r)){let e=[];r.replace(/\[([^\]]+)\]|([^.[]+)/g,(t,n,r=n)=>e.push(r)),r=e.shift(),s=o,o=e.join(`-`)}let l=n[r]||Object.assign(Object.assign(n[r]={},a(t,r)),a(e,r));if(o==null)return l;o||=`DEFAULT`;let u=l[o]??o.split(`-`).reduce((e,t)=>e?.[t],l)??s;return c?O(u,{opacityValue:He(c,i)}):u}let l={};for(let n of[...Object.keys(t),...Object.keys(e)])l[n]=i(n);return l}function a(e,t){let n=e[t];return typeof n==`function`&&(n=n(r)),n&&/color|fill|stroke/i.test(t)?function e(t,n=[]){let r={};for(let i in t){let a=t[i],o=[...n,i];r[o.join(`-`)]=a,i==`DEFAULT`&&(o=n,r[n.join(`-`)]=a),typeof a==`object`&&Object.assign(r,e(a,o))}return r}(n):n}}(e),e:Ce,h:m,s(e,t){return o(e,t,h)},d(e,t,r){return n(e,t,h,r)},v(e){return l.has(e)||l.set(e,ct(e,r,u,lt,h)||`&:`+e),l.get(e)},r(e,t){let n=JSON.stringify([e,t]);return d.has(n)||d.set(n,!p(e,h)&&ct(e,i,f,ut,h,t)),d.get(n)},f(e){return c.reduce((e,t)=>t(e,h),e)}};return h}(n),i=new Map,a=[],o=new Set;t.resume(e=>i.set(e,e),(e,n)=>{t.insert(e,a.length,n),a.push(n),o.add(e)});function s(e){let n=r.f(e),i=Me(n);if(i&&!o.has(i)){o.add(i);let n=Ie(a,e);t.insert(i,n,e),a.splice(n,0,e)}return n.n}return Object.defineProperties(function(e){if(!i.size)for(let e of E(n.preflight))typeof e==`function`&&(e=e(r)),e&&(typeof e==`string`?Ge(``,D.b,k(e),r,D.b,[],!1,!0):Ve(e,{},r,D.b)).forEach(s);e=``+e;let t=i.get(e);if(!t){let n=new Set;for(let t of We(k(e),r))n.add(t.c).add(s(t));t=[...n].filter(Boolean).join(` `),i.set(e,t).set(t,t)}return t},Object.getOwnPropertyDescriptors({get target(){return t.target},theme:r.theme,config:n,snapshot(){let e=t.snapshot(),n=new Set(o),r=new Map(i),s=[...a];return()=>{e(),o=n,i=r,a=s}},clear(){t.clear(),o=new Set,i=new Map,a=[]},destroy(){this.clear(),t.destroy()}}))}function ht(e){let t=document.querySelector(e||`style[data-twind=""]`);return(!t||t.tagName!=`STYLE`)&&(t=document.createElement(`style`),document.head.prepend(t)),t.dataset.twind=`claimed`,t}function gt(e){let t=e?.cssRules?e:(e&&typeof e!=`string`?e:ht(e)).sheet;return{target:t,snapshot(){let e=Array.from(t.cssRules,e=>e.cssText);return()=>{this.clear(),e.forEach(this.insert)}},clear(){for(let e=t.cssRules.length;e--;)t.deleteRule(e)},destroy(){t.ownerNode?.remove()},insert(e,n){try{t.insertRule(e,n)}catch{t.insertRule(`:root{}`,n)}},resume:Ee}}function _t(e){let t=[];return{target:t,snapshot(){let e=[...t];return()=>{t.splice(0,t.length,...e)}},clear(){t.length=0},destroy(){this.clear()},insert(n,r,i){t.splice(r,0,e?`/*!${i.p.toString(36)},${(2*i.o).toString(36)}${i.n?`,`+i.n:``}*/${n}`:n)},resume:Ee}}var vt=new Proxy(Ee,{apply(e,t,n){return be(n[0])},get(e,t){let n=be[t];return typeof n==`function`?function(){return n.apply(be,arguments)}:n}}),yt=function(e,...t){(typeof this==`function`?this:vt)(j({"@layer base":A(e,t)}))},bt=function e(t){return new Proxy(function(e,...n){return xt(t,``,e,n)},{get(n,r){return r===`bind`?e:r in n?n[r]:function(e,...n){return xt(t,r,e,n)}}})}();function xt(e,t,n,r){return{toString(){let i=A(n,r),a=Ce(t+T(JSON.stringify([t,i])));return(typeof e==`function`?e:vt)(j({[`@keyframes ${a}`]:A(n,r)})),a}}}var St=function(e,...t){return(typeof this==`function`?this:vt)(Ze(e,t))},Ct=new Map([[`align-self`,`-ms-grid-row-align`],[`color-adjust`,`-webkit-print-color-adjust`],[`column-gap`,`grid-column-gap`],[`forced-color-adjust`,`-ms-high-contrast-adjust`],[`gap`,`grid-gap`],[`grid-template-columns`,`-ms-grid-columns`],[`grid-template-rows`,`-ms-grid-rows`],[`justify-self`,`-ms-grid-column-align`],[`margin-inline-end`,`-webkit-margin-end`],[`margin-inline-start`,`-webkit-margin-start`],[`mask-border`,`-webkit-mask-box-image`],[`mask-border-outset`,`-webkit-mask-box-image-outset`],[`mask-border-slice`,`-webkit-mask-box-image-slice`],[`mask-border-source`,`-webkit-mask-box-image-source`],[`mask-border-repeat`,`-webkit-mask-box-image-repeat`],[`mask-border-width`,`-webkit-mask-box-image-width`],[`overflow-wrap`,`word-wrap`],[`padding-inline-end`,`-webkit-padding-end`],[`padding-inline-start`,`-webkit-padding-start`],[`print-color-adjust`,`color-adjust`],[`row-gap`,`grid-row-gap`],[`scroll-margin-bottom`,`scroll-snap-margin-bottom`],[`scroll-margin-left`,`scroll-snap-margin-left`],[`scroll-margin-right`,`scroll-snap-margin-right`],[`scroll-margin-top`,`scroll-snap-margin-top`],[`scroll-margin`,`scroll-snap-margin`],[`text-combine-upright`,`-ms-text-combine-horizontal`]]);function wt(e){return Ct.get(e)}function Tt(e){var t=/^(?:(text-(?:decoration$|e|or|si)|back(?:ground-cl|d|f)|box-d|mask(?:$|-[ispro]|-cl)|pr|hyphena|flex-d)|(tab-|column(?!-s)|text-align-l)|(ap)|u|hy)/i.exec(e);return t?t[1]?1:t[2]?2:t[3]?3:5:0}function Et(e,t){var n=/^(?:(pos)|(cli)|(background-i)|(flex(?:$|-b)|(?:max-|min-)?(?:block-s|inl|he|widt))|dis)/i.exec(e);return n?n[1]?+!!/^sti/i.test(t):n[2]?+!!/^pat/i.test(t):n[3]?+!!/^image-/i.test(t):n[4]?t[3]===`-`?2:0:/^(?:inline-)?grid$/i.test(t)?4:0:0}var Dt=[[`-webkit-`,1],[`-moz-`,2],[`-ms-`,4]];function Ot(){return({stringify:e})=>({stringify(t,n,r){let i=``,a=wt(t);a&&(i+=e(a,n,r)+`;`);let o=Tt(t),s=Et(t,n);for(let a of Dt)o&a[1]&&(i+=e(a[0]+t,n,r)+`;`),s&a[1]&&(i+=e(t,a[0]+n,r)+`;`);return i+e(t,n,r)}})}var kt={screens:{sm:`640px`,md:`768px`,lg:`1024px`,xl:`1280px`,"2xl":`1536px`},columns:{auto:`auto`,"3xs":`16rem`,"2xs":`18rem`,xs:`20rem`,sm:`24rem`,md:`28rem`,lg:`32rem`,xl:`36rem`,"2xl":`42rem`,"3xl":`48rem`,"4xl":`56rem`,"5xl":`64rem`,"6xl":`72rem`,"7xl":`80rem`},spacing:{px:`1px`,0:`0px`,...V(4,`rem`,4,.5,.5),...V(12,`rem`,4,5),14:`3.5rem`,...V(64,`rem`,4,16,4),72:`18rem`,80:`20rem`,96:`24rem`},durations:{75:`75ms`,100:`100ms`,150:`150ms`,200:`200ms`,300:`300ms`,500:`500ms`,700:`700ms`,1e3:`1000ms`},animation:{none:`none`,spin:`spin 1s linear infinite`,ping:`ping 1s cubic-bezier(0,0,0.2,1) infinite`,pulse:`pulse 2s cubic-bezier(0.4,0,0.6,1) infinite`,bounce:`bounce 1s infinite`},aspectRatio:{auto:`auto`,square:`1/1`,video:`16/9`},backdropBlur:H(`blur`),backdropBrightness:H(`brightness`),backdropContrast:H(`contrast`),backdropGrayscale:H(`grayscale`),backdropHueRotate:H(`hueRotate`),backdropInvert:H(`invert`),backdropOpacity:H(`opacity`),backdropSaturate:H(`saturate`),backdropSepia:H(`sepia`),backgroundColor:H(`colors`),backgroundImage:{none:`none`},backgroundOpacity:H(`opacity`),backgroundSize:{auto:`auto`,cover:`cover`,contain:`contain`},blur:{none:`none`,0:`0`,sm:`4px`,DEFAULT:`8px`,md:`12px`,lg:`16px`,xl:`24px`,"2xl":`40px`,"3xl":`64px`},brightness:{...V(200,``,100,0,50),...V(110,``,100,90,5),75:`0.75`,125:`1.25`},borderColor:({theme:e})=>({DEFAULT:e(`colors.gray.200`,`currentColor`),...e(`colors`)}),borderOpacity:H(`opacity`),borderRadius:{none:`0px`,sm:`0.125rem`,DEFAULT:`0.25rem`,md:`0.375rem`,lg:`0.5rem`,xl:`0.75rem`,"2xl":`1rem`,"3xl":`1.5rem`,"1/2":`50%`,full:`9999px`},borderSpacing:H(`spacing`),borderWidth:{DEFAULT:`1px`,...B(8,`px`)},boxShadow:{sm:`0 1px 2px 0 rgba(0,0,0,0.05)`,DEFAULT:`0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)`,md:`0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)`,lg:`0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)`,xl:`0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)`,"2xl":`0 25px 50px -12px rgba(0,0,0,0.25)`,inner:`inset 0 2px 4px 0 rgba(0,0,0,0.05)`,none:`0 0 #0000`},boxShadowColor:H(`colors`),caretColor:H(`colors`),accentColor:({theme:e})=>({auto:`auto`,...e(`colors`)}),contrast:{...V(200,``,100,0,50),75:`0.75`,125:`1.25`},content:{none:`none`},divideColor:H(`borderColor`),divideOpacity:H(`borderOpacity`),divideWidth:H(`borderWidth`),dropShadow:{sm:`0 1px 1px rgba(0,0,0,0.05)`,DEFAULT:[`0 1px 2px rgba(0,0,0,0.1)`,`0 1px 1px rgba(0,0,0,0.06)`],md:[`0 4px 3px rgba(0,0,0,0.07)`,`0 2px 2px rgba(0,0,0,0.06)`],lg:[`0 10px 8px rgba(0,0,0,0.04)`,`0 4px 3px rgba(0,0,0,0.1)`],xl:[`0 20px 13px rgba(0,0,0,0.03)`,`0 8px 5px rgba(0,0,0,0.08)`],"2xl":`0 25px 25px rgba(0,0,0,0.15)`,none:`0 0 #0000`},fill:({theme:e})=>({...e(`colors`),none:`none`}),grayscale:{DEFAULT:`100%`,0:`0`},hueRotate:{0:`0deg`,15:`15deg`,30:`30deg`,60:`60deg`,90:`90deg`,180:`180deg`},invert:{DEFAULT:`100%`,0:`0`},flex:{1:`1 1 0%`,auto:`1 1 auto`,initial:`0 1 auto`,none:`none`},flexBasis:({theme:e})=>({...e(`spacing`),...z(2,6),...z(12,12),auto:`auto`,full:`100%`}),flexGrow:{DEFAULT:1,0:0},flexShrink:{DEFAULT:1,0:0},fontFamily:{sans:`ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"`.split(`,`),serif:`ui-serif,Georgia,Cambria,"Times New Roman",Times,serif`.split(`,`),mono:`ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace`.split(`,`)},fontSize:{xs:[`0.75rem`,`1rem`],sm:[`0.875rem`,`1.25rem`],base:[`1rem`,`1.5rem`],lg:[`1.125rem`,`1.75rem`],xl:[`1.25rem`,`1.75rem`],"2xl":[`1.5rem`,`2rem`],"3xl":[`1.875rem`,`2.25rem`],"4xl":[`2.25rem`,`2.5rem`],"5xl":[`3rem`,`1`],"6xl":[`3.75rem`,`1`],"7xl":[`4.5rem`,`1`],"8xl":[`6rem`,`1`],"9xl":[`8rem`,`1`]},fontWeight:{thin:`100`,extralight:`200`,light:`300`,normal:`400`,medium:`500`,semibold:`600`,bold:`700`,extrabold:`800`,black:`900`},gap:H(`spacing`),gradientColorStops:H(`colors`),gridAutoColumns:{auto:`auto`,min:`min-content`,max:`max-content`,fr:`minmax(0,1fr)`},gridAutoRows:{auto:`auto`,min:`min-content`,max:`max-content`,fr:`minmax(0,1fr)`},gridColumn:{auto:`auto`,"span-full":`1 / -1`},gridRow:{auto:`auto`,"span-full":`1 / -1`},gridTemplateColumns:{none:`none`},gridTemplateRows:{none:`none`},height:({theme:e})=>({...e(`spacing`),...z(2,6),min:`min-content`,max:`max-content`,fit:`fit-content`,auto:`auto`,full:`100%`,screen:`100vh`}),inset:({theme:e})=>({...e(`spacing`),...z(2,4),auto:`auto`,full:`100%`}),keyframes:{spin:{from:{transform:`rotate(0deg)`},to:{transform:`rotate(360deg)`}},ping:{"0%":{transform:`scale(1)`,opacity:`1`},"75%,100%":{transform:`scale(2)`,opacity:`0`}},pulse:{"0%,100%":{opacity:`1`},"50%":{opacity:`.5`}},bounce:{"0%, 100%":{transform:`translateY(-25%)`,animationTimingFunction:`cubic-bezier(0.8,0,1,1)`},"50%":{transform:`none`,animationTimingFunction:`cubic-bezier(0,0,0.2,1)`}}},letterSpacing:{tighter:`-0.05em`,tight:`-0.025em`,normal:`0em`,wide:`0.025em`,wider:`0.05em`,widest:`0.1em`},lineHeight:{...V(10,`rem`,4,3),none:`1`,tight:`1.25`,snug:`1.375`,normal:`1.5`,relaxed:`1.625`,loose:`2`},margin:({theme:e})=>({auto:`auto`,...e(`spacing`)}),maxHeight:({theme:e})=>({full:`100%`,min:`min-content`,max:`max-content`,fit:`fit-content`,screen:`100vh`,...e(`spacing`)}),maxWidth:({theme:e,breakpoints:t})=>({...t(e(`screens`)),none:`none`,0:`0rem`,xs:`20rem`,sm:`24rem`,md:`28rem`,lg:`32rem`,xl:`36rem`,"2xl":`42rem`,"3xl":`48rem`,"4xl":`56rem`,"5xl":`64rem`,"6xl":`72rem`,"7xl":`80rem`,full:`100%`,min:`min-content`,max:`max-content`,fit:`fit-content`,prose:`65ch`}),minHeight:{0:`0px`,full:`100%`,min:`min-content`,max:`max-content`,fit:`fit-content`,screen:`100vh`},minWidth:{0:`0px`,full:`100%`,min:`min-content`,max:`max-content`,fit:`fit-content`},opacity:{...V(100,``,100,0,10),5:`0.05`,25:`0.25`,75:`0.75`,95:`0.95`},order:{first:`-9999`,last:`9999`,none:`0`},padding:H(`spacing`),placeholderColor:H(`colors`),placeholderOpacity:H(`opacity`),outlineColor:H(`colors`),outlineOffset:B(8,`px`),outlineWidth:B(8,`px`),ringColor:({theme:e})=>({...e(`colors`),DEFAULT:`#3b82f6`}),ringOffsetColor:H(`colors`),ringOffsetWidth:B(8,`px`),ringOpacity:({theme:e})=>({...e(`opacity`),DEFAULT:`0.5`}),ringWidth:{DEFAULT:`3px`,...B(8,`px`)},rotate:{...B(2,`deg`),...B(12,`deg`,3),...B(180,`deg`,45)},saturate:V(200,``,100,0,50),scale:{...V(150,``,100,0,50),...V(110,``,100,90,5),75:`0.75`,125:`1.25`},scrollMargin:H(`spacing`),scrollPadding:H(`spacing`),sepia:{0:`0`,DEFAULT:`100%`},skew:{...B(2,`deg`),...B(12,`deg`,3)},space:H(`spacing`),stroke:({theme:e})=>({...e(`colors`),none:`none`}),strokeWidth:V(2),textColor:H(`colors`),textDecorationColor:H(`colors`),textDecorationThickness:{"from-font":`from-font`,auto:`auto`,...B(8,`px`)},textUnderlineOffset:{auto:`auto`,...B(8,`px`)},textIndent:H(`spacing`),textOpacity:H(`opacity`),transitionDuration:({theme:e})=>({...e(`durations`),DEFAULT:`150ms`}),transitionDelay:H(`durations`),transitionProperty:{none:`none`,all:`all`,DEFAULT:`color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter`,colors:`color,background-color,border-color,text-decoration-color,fill,stroke`,opacity:`opacity`,shadow:`box-shadow`,transform:`transform`},transitionTimingFunction:{DEFAULT:`cubic-bezier(0.4,0,0.2,1)`,linear:`linear`,in:`cubic-bezier(0.4,0,1,1)`,out:`cubic-bezier(0,0,0.2,1)`,"in-out":`cubic-bezier(0.4,0,0.2,1)`},translate:({theme:e})=>({...e(`spacing`),...z(2,4),full:`100%`}),width:({theme:e})=>({min:`min-content`,max:`max-content`,fit:`fit-content`,screen:`100vw`,...e(`flexBasis`)}),willChange:{scroll:`scroll-position`},zIndex:{...V(50,``,1,0,10),auto:`auto`}};function z(e,t){let n={};do for(var r=1;r<e;r++)n[`${r}/${e}`]=Number((r/e*100).toFixed(6))+`%`;while(++e<=t);return n}function B(e,t,n=0){let r={};for(;n<=e;n=2*n||1)r[n]=n+t;return r}function V(e,t=``,n=1,r=0,i=1,a={}){for(;r<=e;r+=i)a[r]=r/n+t;return a}function H(e){return({theme:t})=>t(e)}var At={"*,::before,::after":{boxSizing:`border-box`,borderWidth:`0`,borderStyle:`solid`,borderColor:`theme(borderColor.DEFAULT, currentColor)`},"::before,::after":{"--tw-content":`''`},html:{lineHeight:1.5,WebkitTextSizeAdjust:`100%`,MozTabSize:`4`,tabSize:4,fontFamily:`theme(fontFamily.sans, ${kt.fontFamily.sans})`,fontFeatureSettings:`theme(fontFamily.sans[1].fontFeatureSettings, normal)`},body:{margin:`0`,lineHeight:`inherit`},hr:{height:`0`,color:`inherit`,borderTopWidth:`1px`},"abbr:where([title])":{textDecoration:`underline dotted`},"h1,h2,h3,h4,h5,h6":{fontSize:`inherit`,fontWeight:`inherit`},a:{color:`inherit`,textDecoration:`inherit`},"b,strong":{fontWeight:`bolder`},"code,kbd,samp,pre":{fontFamily:`theme(fontFamily.mono, ${kt.fontFamily.mono})`,fontFeatureSettings:`theme(fontFamily.mono[1].fontFeatureSettings, normal)`,fontSize:`1em`},small:{fontSize:`80%`},"sub,sup":{fontSize:`75%`,lineHeight:0,position:`relative`,verticalAlign:`baseline`},sub:{bottom:`-0.25em`},sup:{top:`-0.5em`},table:{textIndent:`0`,borderColor:`inherit`,borderCollapse:`collapse`},"button,input,optgroup,select,textarea":{fontFamily:`inherit`,fontSize:`100%`,lineHeight:`inherit`,color:`inherit`,margin:`0`,padding:`0`},"button,select":{textTransform:`none`},"button,[type='button'],[type='reset'],[type='submit']":{WebkitAppearance:`button`,backgroundColor:`transparent`,backgroundImage:`none`},":-moz-focusring":{outline:`auto`},":-moz-ui-invalid":{boxShadow:`none`},progress:{verticalAlign:`baseline`},"::-webkit-inner-spin-button,::-webkit-outer-spin-button":{height:`auto`},"[type='search']":{WebkitAppearance:`textfield`,outlineOffset:`-2px`},"::-webkit-search-decoration":{WebkitAppearance:`none`},"::-webkit-file-upload-button":{WebkitAppearance:`button`,font:`inherit`},summary:{display:`list-item`},"blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre":{margin:`0`},fieldset:{margin:`0`,padding:`0`},legend:{padding:`0`},"ol,ul,menu":{listStyle:`none`,margin:`0`,padding:`0`},textarea:{resize:`vertical`},"input::placeholder,textarea::placeholder":{opacity:1,color:`theme(colors.gray.400, #9ca3af)`},'button,[role="button"]':{cursor:`pointer`},":disabled":{cursor:`default`},"img,svg,video,canvas,audio,iframe,embed,object":{display:`block`,verticalAlign:`middle`},"img,video":{maxWidth:`100%`,height:`auto`},"[hidden]":{display:`none`}},jt=[M(`\\[([-\\w]+):(.+)]`,({1:e,2:t},n)=>({"@layer overrides":{"&":{[e]:I(`[${t}]`,``,n)}}})),M(`(group|peer)([~/][^-[]+)?`,({input:e},{h:t})=>[{c:t(e)}]),N(`aspect-`,`aspectRatio`),M(`container`,(e,{theme:t})=>{let{screens:n=t(`screens`),center:r,padding:i}=t(`container`),a={width:`100%`,marginRight:r&&`auto`,marginLeft:r&&`auto`,...o(`xs`)};for(let e in n){let t=n[e];typeof t==`string`&&(a[we(t)]={"&":{maxWidth:t,...o(e)}})}return a;function o(e){let t=i&&(typeof i==`string`?i:i[e]||i.DEFAULT);if(t)return{paddingRight:t,paddingLeft:t}}}),N(`content-`,`content`,({_:e})=>({"--tw-content":e,content:`var(--tw-content)`})),M(`(?:box-)?decoration-(slice|clone)`,`boxDecorationBreak`),M(`box-(border|content)`,`boxSizing`,({1:e})=>e+`-box`),M(`hidden`,{display:`none`}),M(`table-(auto|fixed)`,`tableLayout`),M([`(block|flex|table|grid|inline|contents|flow-root|list-item)`,`(inline-(block|flex|table|grid))`,`(table-(caption|cell|column|row|(column|row|footer|header)-group))`],`display`),`(float)-(left|right|none)`,`(clear)-(left|right|none|both)`,`(overflow(?:-[xy])?)-(auto|hidden|clip|visible|scroll)`,`(isolation)-(auto)`,M(`isolate`,`isolation`),M(`object-(contain|cover|fill|none|scale-down)`,`objectFit`),N(`object-`,`objectPosition`),M(`object-(top|bottom|center|(left|right)(-(top|bottom))?)`,`objectPosition`,Mt),M(`overscroll(-[xy])?-(auto|contain|none)`,({1:e=``,2:t})=>({[`overscroll-behavior`+e]:t})),M(`(static|fixed|absolute|relative|sticky)`,`position`),N(`-?inset(-[xy])?(?:$|-)`,`inset`,({1:e,_:t})=>({top:e!=`-x`&&t,right:e!=`-y`&&t,bottom:e!=`-x`&&t,left:e!=`-y`&&t})),N(`-?(top|bottom|left|right)(?:$|-)`,`inset`),M(`(visible|collapse)`,`visibility`),M(`invisible`,{visibility:`hidden`}),N(`-?z-`,`zIndex`),M(`flex-((row|col)(-reverse)?)`,`flexDirection`,Nt),M(`flex-(wrap|wrap-reverse|nowrap)`,`flexWrap`),N(`(flex-(?:grow|shrink))(?:$|-)`),N(`(flex)-`),N(`grow(?:$|-)`,`flexGrow`),N(`shrink(?:$|-)`,`flexShrink`),N(`basis-`,`flexBasis`),N(`-?(order)-`),`-?(order)-(\\d+)`,N(`grid-cols-`,`gridTemplateColumns`),M(`grid-cols-(\\d+)`,`gridTemplateColumns`,Bt),N(`col-`,`gridColumn`),M(`col-(span)-(\\d+)`,`gridColumn`,zt),N(`col-start-`,`gridColumnStart`),M(`col-start-(auto|\\d+)`,`gridColumnStart`),N(`col-end-`,`gridColumnEnd`),M(`col-end-(auto|\\d+)`,`gridColumnEnd`),N(`grid-rows-`,`gridTemplateRows`),M(`grid-rows-(\\d+)`,`gridTemplateRows`,Bt),N(`row-`,`gridRow`),M(`row-(span)-(\\d+)`,`gridRow`,zt),N(`row-start-`,`gridRowStart`),M(`row-start-(auto|\\d+)`,`gridRowStart`),N(`row-end-`,`gridRowEnd`),M(`row-end-(auto|\\d+)`,`gridRowEnd`),M(`grid-flow-((row|col)(-dense)?)`,`gridAutoFlow`,e=>Mt(Nt(e))),M(`grid-flow-(dense)`,`gridAutoFlow`),N(`auto-cols-`,`gridAutoColumns`),N(`auto-rows-`,`gridAutoRows`),N(`gap-x(?:$|-)`,`gap`,`columnGap`),N(`gap-y(?:$|-)`,`gap`,`rowGap`),N(`gap(?:$|-)`,`gap`),`(justify-(?:items|self))-`,M(`justify-`,`justifyContent`,Pt),M(`(content|items|self)-`,e=>({[`align-`+e[1]]:Pt(e)})),M(`(place-(content|items|self))-`,({1:e,$$:t})=>({[e]:(`wun`.includes(t[3])?`space-`:``)+t})),N(`p([xytrbl])?(?:$|-)`,`padding`,G(`padding`)),N(`-?m([xytrbl])?(?:$|-)`,`margin`,G(`margin`)),N(`-?space-(x|y)(?:$|-)`,`space`,({1:e,_:t})=>({"&>:not([hidden])~:not([hidden])":{[`--tw-space-${e}-reverse`]:`0`,[`margin-`+{y:`top`,x:`left`}[e]]:`calc(${t} * calc(1 - var(--tw-space-${e}-reverse)))`,[`margin-`+{y:`bottom`,x:`right`}[e]]:`calc(${t} * var(--tw-space-${e}-reverse))`}})),M(`space-(x|y)-reverse`,({1:e})=>({"&>:not([hidden])~:not([hidden])":{[`--tw-space-${e}-reverse`]:`1`}})),N(`w-`,`width`),N(`min-w-`,`minWidth`),N(`max-w-`,`maxWidth`),N(`h-`,`height`),N(`min-h-`,`minHeight`),N(`max-h-`,`maxHeight`),N(`font-`,`fontWeight`),N(`font-`,`fontFamily`,({_:e})=>typeof(e=E(e))[1]==`string`?{fontFamily:W(e)}:{fontFamily:W(e[0]),...e[1]}),M(`antialiased`,{WebkitFontSmoothing:`antialiased`,MozOsxFontSmoothing:`grayscale`}),M(`subpixel-antialiased`,{WebkitFontSmoothing:`auto`,MozOsxFontSmoothing:`auto`}),M(`italic`,`fontStyle`),M(`not-italic`,{fontStyle:`normal`}),M(`(ordinal|slashed-zero|(normal|lining|oldstyle|proportional|tabular)-nums|(diagonal|stacked)-fractions)`,({1:e,2:t=``,3:n})=>t==`normal`?{fontVariantNumeric:`normal`}:{[`--tw-`+(n?`numeric-fraction`:`pt`.includes(t[0])?`numeric-spacing`:t?`numeric-figure`:e)]:e,fontVariantNumeric:`var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction)`,...K({"--tw-ordinal":`var(--tw-empty,/*!*/ /*!*/)`,"--tw-slashed-zero":`var(--tw-empty,/*!*/ /*!*/)`,"--tw-numeric-figure":`var(--tw-empty,/*!*/ /*!*/)`,"--tw-numeric-spacing":`var(--tw-empty,/*!*/ /*!*/)`,"--tw-numeric-fraction":`var(--tw-empty,/*!*/ /*!*/)`})}),N(`tracking-`,`letterSpacing`),N(`leading-`,`lineHeight`),M(`list-(inside|outside)`,`listStylePosition`),N(`list-`,`listStyleType`),M(`list-`,`listStyleType`),N(`placeholder-opacity-`,`placeholderOpacity`,({_:e})=>({"&::placeholder":{"--tw-placeholder-opacity":e}})),P(`placeholder-`,{property:`color`,selector:`&::placeholder`}),M(`text-(left|center|right|justify|start|end)`,`textAlign`),M(`text-(ellipsis|clip)`,`textOverflow`),N(`text-opacity-`,`textOpacity`,`--tw-text-opacity`),P(`text-`,{property:`color`}),N(`text-`,`fontSize`,({_:e})=>typeof e==`string`?{fontSize:e}:{fontSize:e[0],...typeof e[1]==`string`?{lineHeight:e[1]}:e[1]}),N(`indent-`,`textIndent`),M(`(overline|underline|line-through)`,`textDecorationLine`),M(`no-underline`,{textDecorationLine:`none`}),N(`underline-offset-`,`textUnderlineOffset`),P(`decoration-`,{section:`textDecorationColor`,opacityVariable:!1,opacitySection:`opacity`}),N(`decoration-`,`textDecorationThickness`),M(`decoration-`,`textDecorationStyle`),M(`(uppercase|lowercase|capitalize)`,`textTransform`),M(`normal-case`,{textTransform:`none`}),M(`truncate`,{overflow:`hidden`,whiteSpace:`nowrap`,textOverflow:`ellipsis`}),M(`align-`,`verticalAlign`),M(`whitespace-`,`whiteSpace`),M(`break-normal`,{wordBreak:`normal`,overflowWrap:`normal`}),M(`break-words`,{overflowWrap:`break-word`}),M(`break-all`,{wordBreak:`break-all`}),M(`break-keep`,{wordBreak:`keep-all`}),P(`caret-`,{opacityVariable:!1,opacitySection:`opacity`}),P(`accent-`,{opacityVariable:!1,opacitySection:`opacity`}),M(`bg-gradient-to-([trbl]|[tb][rl])`,`backgroundImage`,({1:e})=>`linear-gradient(to ${U(e,` `)},var(--tw-gradient-stops))`),P(`from-`,{section:`gradientColorStops`,opacityVariable:!1,opacitySection:`opacity`},({_:e})=>({"--tw-gradient-from":e.value,"--tw-gradient-to":e.color({opacityValue:`0`}),"--tw-gradient-stops":`var(--tw-gradient-from),var(--tw-gradient-to)`})),P(`via-`,{section:`gradientColorStops`,opacityVariable:!1,opacitySection:`opacity`},({_:e})=>({"--tw-gradient-to":e.color({opacityValue:`0`}),"--tw-gradient-stops":`var(--tw-gradient-from),${e.value},var(--tw-gradient-to)`})),P(`to-`,{section:`gradientColorStops`,property:`--tw-gradient-to`,opacityVariable:!1,opacitySection:`opacity`}),M(`bg-(fixed|local|scroll)`,`backgroundAttachment`),M(`bg-origin-(border|padding|content)`,`backgroundOrigin`,({1:e})=>e+`-box`),M([`bg-(no-repeat|repeat(-[xy])?)`,`bg-repeat-(round|space)`],`backgroundRepeat`),M(`bg-blend-`,`backgroundBlendMode`),M(`bg-clip-(border|padding|content|text)`,`backgroundClip`,({1:e})=>e+(e==`text`?``:`-box`)),N(`bg-opacity-`,`backgroundOpacity`,`--tw-bg-opacity`),P(`bg-`,{section:`backgroundColor`}),N(`bg-`,`backgroundImage`),N(`bg-`,`backgroundPosition`),M(`bg-(top|bottom|center|(left|right)(-(top|bottom))?)`,`backgroundPosition`,Mt),N(`bg-`,`backgroundSize`),N(`rounded(?:$|-)`,`borderRadius`),N(`rounded-([trbl]|[tb][rl])(?:$|-)`,`borderRadius`,({1:e,_:t})=>{let n={t:[`tl`,`tr`],r:[`tr`,`br`],b:[`bl`,`br`],l:[`bl`,`tl`]}[e]||[e,e];return{[`border-${U(n[0])}-radius`]:t,[`border-${U(n[1])}-radius`]:t}}),M(`border-(collapse|separate)`,`borderCollapse`),N(`border-opacity(?:$|-)`,`borderOpacity`,`--tw-border-opacity`),M(`border-(solid|dashed|dotted|double|none)`,`borderStyle`),N(`border-spacing(-[xy])?(?:$|-)`,`borderSpacing`,({1:e,_:t})=>({...K({"--tw-border-spacing-x":`0`,"--tw-border-spacing-y":`0`}),[`--tw-border-spacing`+(e||`-x`)]:t,[`--tw-border-spacing`+(e||`-y`)]:t,"border-spacing":`var(--tw-border-spacing-x) var(--tw-border-spacing-y)`})),P(`border-([xytrbl])-`,{section:`borderColor`},G(`border`,`Color`)),P(`border-`),N(`border-([xytrbl])(?:$|-)`,`borderWidth`,G(`border`,`Width`)),N(`border(?:$|-)`,`borderWidth`),N(`divide-opacity(?:$|-)`,`divideOpacity`,({_:e})=>({"&>:not([hidden])~:not([hidden])":{"--tw-divide-opacity":e}})),M(`divide-(solid|dashed|dotted|double|none)`,({1:e})=>({"&>:not([hidden])~:not([hidden])":{borderStyle:e}})),M(`divide-([xy]-reverse)`,({1:e})=>({"&>:not([hidden])~:not([hidden])":{[`--tw-divide-`+e]:`1`}})),N(`divide-([xy])(?:$|-)`,`divideWidth`,({1:e,_:t})=>{let n={x:`lr`,y:`tb`}[e];return{"&>:not([hidden])~:not([hidden])":{[`--tw-divide-${e}-reverse`]:`0`,[`border-${U(n[0])}Width`]:`calc(${t} * calc(1 - var(--tw-divide-${e}-reverse)))`,[`border-${U(n[1])}Width`]:`calc(${t} * var(--tw-divide-${e}-reverse))`}}}),P(`divide-`,{property:`borderColor`,selector:`&>:not([hidden])~:not([hidden])`}),N(`ring-opacity(?:$|-)`,`ringOpacity`,`--tw-ring-opacity`),P(`ring-offset-`,{property:`--tw-ring-offset-color`,opacityVariable:!1}),N(`ring-offset(?:$|-)`,`ringOffsetWidth`,`--tw-ring-offset-width`),M(`ring-inset`,{"--tw-ring-inset":`inset`}),P(`ring-`,{property:`--tw-ring-color`}),N(`ring(?:$|-)`,`ringWidth`,({_:e},{theme:t})=>({...K({"--tw-ring-offset-shadow":`0 0 #0000`,"--tw-ring-shadow":`0 0 #0000`,"--tw-shadow":`0 0 #0000`,"--tw-shadow-colored":`0 0 #0000`,"&":{"--tw-ring-inset":`var(--tw-empty,/*!*/ /*!*/)`,"--tw-ring-offset-width":t(`ringOffsetWidth`,``,`0px`),"--tw-ring-offset-color":O(t(`ringOffsetColor`,``,`#fff`)),"--tw-ring-color":O(t(`ringColor`,``,`#93c5fd`),{opacityVariable:`--tw-ring-opacity`}),"--tw-ring-opacity":t(`ringOpacity`,``,`0.5`)}}),"--tw-ring-offset-shadow":`var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)`,"--tw-ring-shadow":`var(--tw-ring-inset) 0 0 0 calc(${e} + var(--tw-ring-offset-width)) var(--tw-ring-color)`,boxShadow:`var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)`})),P(`shadow-`,{section:`boxShadowColor`,opacityVariable:!1,opacitySection:`opacity`},({_:e})=>({"--tw-shadow-color":e.value,"--tw-shadow":`var(--tw-shadow-colored)`})),N(`shadow(?:$|-)`,`boxShadow`,({_:e})=>({...K({"--tw-ring-offset-shadow":`0 0 #0000`,"--tw-ring-shadow":`0 0 #0000`,"--tw-shadow":`0 0 #0000`,"--tw-shadow-colored":`0 0 #0000`}),"--tw-shadow":W(e),"--tw-shadow-colored":W(e).replace(/([^,]\s+)(?:#[a-f\d]+|(?:(?:hsl|rgb)a?|hwb|lab|lch|color|var)\(.+?\)|[a-z]+)(,|$)/g,`$1var(--tw-shadow-color)$2`),boxShadow:`var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)`})),N(`(opacity)-`),M(`mix-blend-`,`mixBlendMode`),...Ft(),...Ft(`backdrop-`),N(`transition(?:$|-)`,`transitionProperty`,(e,{theme:t})=>({transitionProperty:W(e),transitionTimingFunction:e._==`none`?void 0:W(t(`transitionTimingFunction`,``)),transitionDuration:e._==`none`?void 0:W(t(`transitionDuration`,``))})),N(`duration(?:$|-)`,`transitionDuration`,`transitionDuration`,W),N(`ease(?:$|-)`,`transitionTimingFunction`,`transitionTimingFunction`,W),N(`delay(?:$|-)`,`transitionDelay`,`transitionDelay`,W),N(`animate(?:$|-)`,`animation`,(e,{theme:t,h:n,e:r})=>{let i=W(e),a=i.split(` `),o=t(`keyframes`,a[0]);return o?{[`@keyframes `+(a[0]=r(n(a[0])))]:o,animation:a.join(` `)}:{animation:i}}),`(transform)-(none)`,M(`transform`,Lt),M(`transform-(cpu|gpu)`,({1:e})=>({"--tw-transform":Rt(e==`gpu`)})),N(`scale(-[xy])?-`,`scale`,({1:e,_:t})=>({[`--tw-scale`+(e||`-x`)]:t,[`--tw-scale`+(e||`-y`)]:t,...Lt()})),N(`-?(rotate)-`,`rotate`,It),N(`-?(translate-[xy])-`,`translate`,It),N(`-?(skew-[xy])-`,`skew`,It),M(`origin-(center|((top|bottom)(-(left|right))?)|left|right)`,`transformOrigin`,Mt),`(appearance)-`,N(`(columns)-`),`(columns)-(\\d+)`,`(break-(?:before|after|inside))-`,N(`(cursor)-`),`(cursor)-`,M(`snap-(none)`,`scroll-snap-type`),M(`snap-(x|y|both)`,({1:e})=>({...K({"--tw-scroll-snap-strictness":`proximity`}),"scroll-snap-type":e+` var(--tw-scroll-snap-strictness)`})),M(`snap-(mandatory|proximity)`,`--tw-scroll-snap-strictness`),M(`snap-(?:(start|end|center)|align-(none))`,`scroll-snap-align`),M(`snap-(normal|always)`,`scroll-snap-stop`),M(`scroll-(auto|smooth)`,`scroll-behavior`),N(`scroll-p([xytrbl])?(?:$|-)`,`padding`,G(`scroll-padding`)),N(`-?scroll-m([xytrbl])?(?:$|-)`,`scroll-margin`,G(`scroll-margin`)),M(`touch-(auto|none|manipulation)`,`touch-action`),M(`touch-(pinch-zoom|pan-(?:(x|left|right)|(y|up|down)))`,({1:e,2:t,3:n})=>({...K({"--tw-pan-x":`var(--tw-empty,/*!*/ /*!*/)`,"--tw-pan-y":`var(--tw-empty,/*!*/ /*!*/)`,"--tw-pinch-zoom":`var(--tw-empty,/*!*/ /*!*/)`,"--tw-touch-action":`var(--tw-pan-x) var(--tw-pan-y) var(--tw-pinch-zoom)`}),[`--tw-${t?`pan-x`:n?`pan-y`:e}`]:e,"touch-action":`var(--tw-touch-action)`})),M(`outline-none`,{outline:`2px solid transparent`,"outline-offset":`2px`}),M(`outline`,{outlineStyle:`solid`}),M(`outline-(dashed|dotted|double)`,`outlineStyle`),N(`-?(outline-offset)-`),P(`outline-`,{opacityVariable:!1,opacitySection:`opacity`}),N(`outline-`,`outlineWidth`),`(pointer-events)-`,N(`(will-change)-`),`(will-change)-`,[`resize(?:-(none|x|y))?`,`resize`,({1:e})=>({x:`horizontal`,y:`vertical`})[e]||e||`both`],M(`select-(none|text|all|auto)`,`userSelect`),P(`fill-`,{section:`fill`,opacityVariable:!1,opacitySection:`opacity`}),P(`stroke-`,{section:`stroke`,opacityVariable:!1,opacitySection:`opacity`}),N(`stroke-`,`strokeWidth`),M(`sr-only`,{position:`absolute`,width:`1px`,height:`1px`,padding:`0`,margin:`-1px`,overflow:`hidden`,whiteSpace:`nowrap`,clip:`rect(0,0,0,0)`,borderWidth:`0`}),M(`not-sr-only`,{position:`static`,width:`auto`,height:`auto`,padding:`0`,margin:`0`,overflow:`visible`,whiteSpace:`normal`,clip:`auto`})];function Mt(e){return(typeof e==`string`?e:e[1]).replace(/-/g,` `).trim()}function Nt(e){return(typeof e==`string`?e:e[1]).replace(`col`,`column`)}function U(e,t=`-`){let n=[];for(let t of e)n.push({t:`top`,r:`right`,b:`bottom`,l:`left`}[t]);return n.join(t)}function W(e){return e&&``+(e._||e)}function Pt({$$:e}){return({r:`flex-`,"":`flex-`,w:`space-`,u:`space-`,n:`space-`}[e[3]||``]||``)+e}function G(e,t=``){return({1:n,_:r})=>{let i={x:`lr`,y:`tb`}[n]||n+n;return i?{...F(e+`-`+U(i[0])+t,r),...F(e+`-`+U(i[1])+t,r)}:F(e+t,r)}}function Ft(e=``){let t=[`blur`,`brightness`,`contrast`,`grayscale`,`hue-rotate`,`invert`,e&&`opacity`,`saturate`,`sepia`,!e&&`drop-shadow`].filter(Boolean),n={};for(let r of t)n[`--tw-${e}${r}`]=`var(--tw-empty,/*!*/ /*!*/)`;return n={...K(n),[`${e}filter`]:t.map(t=>`var(--tw-${e}${t})`).join(` `)},[`(${e}filter)-(none)`,M(`${e}filter`,n),...t.map(t=>N(`${t[0]==`h`?`-?`:``}(${e}${t})(?:$|-)`,t,({1:e,_:r})=>({[`--tw-${e}`]:E(r).map(e=>`${t}(${e})`).join(` `),...n})))]}function It({1:e,_:t}){return{[`--tw-`+e]:t,...Lt()}}function Lt(){return{...K({"--tw-translate-x":`0`,"--tw-translate-y":`0`,"--tw-rotate":`0`,"--tw-skew-x":`0`,"--tw-skew-y":`0`,"--tw-scale-x":`1`,"--tw-scale-y":`1`,"--tw-transform":Rt()}),transform:`var(--tw-transform)`}}function Rt(e){return[e?`translate3d(var(--tw-translate-x),var(--tw-translate-y),0)`:`translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y))`,`rotate(var(--tw-rotate))`,`skewX(var(--tw-skew-x))`,`skewY(var(--tw-skew-y))`,`scaleX(var(--tw-scale-x))`,`scaleY(var(--tw-scale-y))`].join(` `)}function zt({1:e,2:t}){return`${e} ${t} / ${e} ${t}`}function Bt({1:e}){return`repeat(${e},minmax(0,1fr))`}function K(e){return{"@layer defaults":{"*,::before,::after":e,"::backdrop":e}}}var Vt=[[`sticky`,`@supports ((position: -webkit-sticky) or (position:sticky))`],[`motion-reduce`,`@media (prefers-reduced-motion:reduce)`],[`motion-safe`,`@media (prefers-reduced-motion:no-preference)`],[`print`,`@media print`],[`(portrait|landscape)`,({1:e})=>`@media (orientation:${e})`],[`contrast-(more|less)`,({1:e})=>`@media (prefers-contrast:${e})`],[`(first-(letter|line)|placeholder|backdrop|before|after)`,({1:e})=>`&::${e}`],[`(marker|selection)`,({1:e})=>`& *::${e},&::${e}`],[`file`,`&::file-selector-button`],[`(first|last|only)`,({1:e})=>`&:${e}-child`],[`even`,`&:nth-child(2n)`],[`odd`,`&:nth-child(odd)`],[`open`,`&[open]`],[`(aria|data)-`,({1:e,$$:t},n)=>t&&`&[${e}-${n.theme(e,t)||I(t,``,n)||`${t}="true"`}]`],[`((group|peer)(~[^-[]+)?)(-\\[(.+)]|[-[].+?)(\\/.+)?`,({2:e,3:t=``,4:n,5:r=``,6:i=t},{e:a,h:o,v:s})=>{let c=L(r)||(n[0]==`[`?n:s(n.slice(1)));return`${(c.includes(`&`)?c:`&`+c).replace(/&/g,`:merge(.${a(o(e+i))})`)}${e[0]==`p`?`~`:` `}&`}],[`(ltr|rtl)`,({1:e})=>`[dir="${e}"] &`],[`supports-`,({$$:e},t)=>{if(e&&=t.theme(`supports`,e)||I(e,``,t),e)return e.includes(`:`)||(e+=`:var(--tw)`),/^\w*\s*\(/.test(e)||(e=`(${e})`),`@supports ${e.replace(/\b(and|or|not)\b/g,` $1 `).trim()}`}],[`max-`,({$$:e},t)=>{if(e&&=t.theme(`screens`,e)||I(e,``,t),typeof e==`string`)return`@media not all and (min-width:${e})`}],[`min-`,({$$:e},t)=>(e&&=I(e,``,t),e&&`@media (min-width:${e})`)],[/^\[(.+)]$/,({1:e})=>/[&@]/.test(e)&&L(e).replace(/[}]+$/,``).split(`{`)]];function Ht({colors:e,disablePreflight:t}={}){return{preflight:t?void 0:At,theme:{...kt,colors:{inherit:`inherit`,current:`currentColor`,transparent:`transparent`,black:`#000`,white:`#fff`,...e}},variants:Vt,rules:jt,finalize(e){return e.n&&e.d&&e.r.some(e=>/^&::(before|after)$/.test(e))&&!/(^|;)content:/.test(e.d)?{...e,d:`content:var(--tw-content);`+e.d}:e}}}var Ut=mt(st({preflight:!1,hash:!0,darkMode:`class`,theme:{extend:{colors:{background:`var(--swk-background)`,"background-secondary":`var(--swk-background-secondary)`,"foreground-strong":`var(--swk-foreground-strong)`,foreground:`var(--swk-foreground)`,"foreground-secondary":`var(--swk-foreground-secondary)`,primary:`var(--swk-primary)`,"primary-foreground":`var(--swk-primary-foreground)`,transparent:`var(--swk-transparent)`,lighter:`var(--swk-lighter)`,light:`var(--swk-light)`,"light-gray":`var(--swk-light-gray)`,gray:`var(--swk-gray)`,danger:`var(--swk-danger)`,border:`var(--swk-border)`},boxShadow:{default:`0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)`},borderRadius:{default:`var(--swk-border-radius)`},fontFamily:{default:`var(--swk-font-family)`}}},presets:[Ot(),Ht({disablePreflight:!0})]}),typeof document>`u`?_t():gt(`style[data-library]`)),q=e=>Ut(`!(${e})`);St.bind(Ut),yt.bind(Ut),bt.bind(Ut);var Wt=j`
  .stellar-wallets-kit *,
  .stellar-wallets-kit ::after,
  .stellar-wallets-kit ::before,
  .stellar-wallets-kit ::backdrop,
  .stellar-wallets-kit ::file-selector-button {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0 solid;
  }
  .stellar-wallets-kit :host {
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    tab-size: 4;
    font-family:
      ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji";
    font-feature-settings: normal;
    font-variation-settings: normal;
    -webkit-tap-highlight-color: transparent;
  }
  .stellar-wallets-kit hr {
    height: 0;
    color: inherit;
    border-top-width: 1px;
  }
  .stellar-wallets-kit abbr:where([title]) {
    -webkit-text-decoration: underline dotted;
    text-decoration: underline dotted;
  }
  .stellar-wallets-kit h1,
  .stellar-wallets-kit h2,
  .stellar-wallets-kit h3,
  .stellar-wallets-kit h4,
  .stellar-wallets-kit h5,
  .stellar-wallets-kit h6 {
    font-size: inherit;
    font-weight: inherit;
  }
  .stellar-wallets-kit a {
    color: inherit;
    -webkit-text-decoration: inherit;
    text-decoration: inherit;
  }
  .stellar-wallets-kit b,
  .stellar-wallets-kit strong {
    font-weight: bolder;
  }
  .stellar-wallets-kit code,
  .stellar-wallets-kit kbd,
  .stellar-wallets-kit samp,
  .stellar-wallets-kit pre {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    font-feature-settings: normal;
    font-variation-settings: normal;
    font-size: 1em;
  }
  .stellar-wallets-kit small {
    font-size: 80%;
  }
  .stellar-wallets-kit sub,
  .stellar-wallets-kit sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  .stellar-wallets-kit sub {
    bottom: -0.25em;
  }
  .stellar-wallets-kit sup {
    top: -0.5em;
  }
  .stellar-wallets-kit table {
    text-indent: 0;
    border-color: inherit;
    border-collapse: collapse;
  }
  .stellar-wallets-kit :-moz-focusring {
    outline: auto;
  }
  .stellar-wallets-kit progress {
    vertical-align: baseline;
  }
  .stellar-wallets-kit summary {
    display: list-item;
  }
  .stellar-wallets-kit ol,
  .stellar-wallets-kit ul,
  .stellar-wallets-kit menu {
    list-style: none;
  }
  .stellar-wallets-kit img,
  .stellar-wallets-kit svg,
  .stellar-wallets-kit video,
  .stellar-wallets-kit canvas,
  .stellar-wallets-kit audio,
  .stellar-wallets-kit iframe,
  .stellar-wallets-kit embed,
  .stellar-wallets-kit object {
    display: block;
    vertical-align: middle;
  }
  .stellar-wallets-kit img,
  .stellar-wallets-kit video {
    max-width: 100%;
    height: auto;
  }
  .stellar-wallets-kit button,
  .stellar-wallets-kit input,
  .stellar-wallets-kit select,
  .stellar-wallets-kit optgroup,
  .stellar-wallets-kit textarea,
  .stellar-wallets-kit ::file-selector-button {
    font: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    letter-spacing: inherit;
    color: inherit;
    border-radius: 0;
    background-color: transparent;
    opacity: 1;
  }
  .stellar-wallets-kit :where(select:is([multiple], [size])) optgroup {
    font-weight: bolder;
  }
  .stellar-wallets-kit :where(select:is([multiple], [size])) optgroup option {
    padding-inline-start: 20px;
  }
  .stellar-wallets-kit ::file-selector-button {
    margin-inline-end: 4px;
  }
  .stellar-wallets-kit ::placeholder {
    opacity: 1;
  }
  .stellar-wallets-kit textarea {
    resize: vertical;
  }
  .stellar-wallets-kit ::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  .stellar-wallets-kit ::-webkit-date-and-time-value {
    min-height: 1lh;
    text-align: inherit;
  }
  .stellar-wallets-kit ::-webkit-datetime-edit {
    display: inline-flex;
  }
  .stellar-wallets-kit ::-webkit-datetime-edit-fields-wrapper {
    padding: 0;
  }
  .stellar-wallets-kit ::-webkit-datetime-edit,
  .stellar-wallets-kit ::-webkit-datetime-edit-year-field,
  .stellar-wallets-kit ::-webkit-datetime-edit-month-field,
  .stellar-wallets-kit ::-webkit-datetime-edit-day-field,
  .stellar-wallets-kit ::-webkit-datetime-edit-hour-field,
  .stellar-wallets-kit ::-webkit-datetime-edit-minute-field,
  .stellar-wallets-kit ::-webkit-datetime-edit-second-field,
  .stellar-wallets-kit ::-webkit-datetime-edit-millisecond-field,
  .stellar-wallets-kit ::-webkit-datetime-edit-meridiem-field {
    padding-block: 0;
  }
  .stellar-wallets-kit ::-webkit-calendar-picker-indicator {
    line-height: 1;
  }
  .stellar-wallets-kit :-moz-ui-invalid {
    box-shadow: none;
  }
  .stellar-wallets-kit button,
  .stellar-wallets-kit input:where([type="button"], [type="reset"], [type="submit"]),
  .stellar-wallets-kit ::file-selector-button {
    appearance: button;
  }
  .stellar-wallets-kit ::-webkit-inner-spin-button,
  .stellar-wallets-kit ::-webkit-outer-spin-button {
    height: auto;
  }
  .stellar-wallets-kit [hidden]:where(:not([hidden="until-found"])) {
    display: none !important;
  }
`,J;(function(e){e.xs=`xs`,e.sm=`sm`,e.md=`md`,e.lg=`lg`,e.xl=`xl`})(J||={});var Y;(function(e){e.primary=`primary`,e.secondary=`secondary`,e.ghost=`ghost`,e.free=`free`})(Y||={});var X;(function(e){e.regular=`regular`,e.icon=`icon`})(X||={});var Gt=`flex items-center justify-center font-semibold easy-in-out transition leading-none`;function Z({size:e=J.md,mode:t=Y.primary,shape:n=X.regular,classes:r,styles:i,children:a,onClick:o}){let s=R({"border-none bg-primary text-primary-foreground shadow-default hover:opacity-70 focus:opacity-90":t===Y.primary,"border-none bg-background text-foreground shadow-default hover:opacity-70 focus:opacity-90":t===Y.secondary,"bg-transparent text-foreground border-transparent border-1 hover:border-light-gray":t===Y.ghost}),c=R({"rounded-default":n===X.regular,"rounded-full":n===X.icon}),l=R({"text-xs":e===J.xs,"text-sm":e!==J.xs}),u=R({"px-2 py-1":n===X.regular&&(e===J.xs||e===J.sm),"px-2.5 py-1.5":n===X.regular&&e===J.md,"px-3 py-2":n===X.regular&&e===J.lg,"px-3.5 py-2.5":n===X.regular&&e===J.xl,"p-1":n===X.icon&&e===J.xs,"p-1.5":n===X.icon&&e===J.sm,"p-2":n===X.icon&&e===J.md,"p-2.5":n===X.icon&&e===J.lg,"p-3":n===X.icon&&e===J.xl});return C`
    <button onClick="${()=>o()}" type="button" style="${i}" class="${t===Y.free?``:q(R(`cursor-pointer`,Gt,s,c,l,u))} ${r}">
      ${a}
    </button>
  `}function Kt(){S.value=[]}function Q(e){te.value=e,S.value=[...S.value,e]}function qt(){let e=S.value;e.pop(),S.value=e.slice(),te.value=e[e.length-1]}function Jt({children:e,isActive:t,duration:n=300}){let[r,i]=p(t),[a,o]=p(t);return fe(()=>{if(t)o(!0),globalThis.requestAnimationFrame(()=>i(!0));else{i(!1);let e=globalThis.setTimeout(()=>o(!1),n);return()=>globalThis.clearTimeout(e)}},[t,n]),a?C`<div style=${{position:r?`relative`:`absolute`,inset:0,transition:`opacity ${n}ms ease, transform ${n}ms ease, position ${n}ms ease`,opacity:+!!r}}>${e}</div>`:null}function Yt({currentRoute:e,pages:t,duration:n=300}){return C`<div style=${{position:`relative`,width:`100%`,height:`100%`}}>${Object.entries(t).map(([t,r])=>C`
      <${Jt} id=${t} key=${t} isActive=${e===t} duration=${n}>
        <${r} />
      <//>
    `)}</div>`}function Xt(){Q(f.HELP_PAGE)}function Zt(){qt()}var Qt=a(()=>te.value===f.AUTH_OPTIONS?C`
      <${Z} onClick=${()=>Xt()}
                 size="${J.md}"
                 mode="${Y.ghost}"
                 shape="${X.icon}">
        <svg class="${q(`w-4 h-4`)}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM13 13.3551V14H11V12.5C11 11.9477 11.4477 11.5 12 11.5C12.8284 11.5 13.5 10.8284 13.5 10C13.5 9.17157 12.8284 8.5 12 8.5C11.2723 8.5 10.6656 9.01823 10.5288 9.70577L8.56731 9.31346C8.88637 7.70919 10.302 6.5 12 6.5C13.933 6.5 15.5 8.067 15.5 10C15.5 11.5855 14.4457 12.9248 13 13.3551Z"></path></svg>
      <//>
    `:S.value.length<2?C``:C`
      <${Z} onClick=${()=>Zt()}
                 size="${J.md}"
                 mode="${Y.ghost}"
                 shape="${X.icon}">
        
        <svg class="${q(`w-4 h-4`)}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path></svg>
      <//>
    `);function $t(){return C`
    <header class="${q(`flex items-center px-3 py-2`)}">
      <div class="${q(`w-3/12 flex justify-start`)}">
        ${Qt.value}
      </div>

      <div class="${q(`w-6/12 text-center`)}">
        <h1 class="${q(`text-foreground-strong font-semibold`)}">
          ${ee.value}
        </h1>
      </div>

      <div class="${q(`w-3/12 flex justify-end`)}">
        <${Z} onClick=${()=>v.next()}
                   size="${J.md}"
                   mode="${Y.ghost}"
                   shape="${X.icon}">

          <svg class="${q(`w-4 h-4`)}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>
        <//>
      </div>
    </header>
  `}function en(){return C`
    <footer class="${q(`w-full text-center p-2 border-t-1 border-t-border`)}">
      <p class="${q(`text-xs text-foreground`)}">
        Powered by
        <a target="_blank" href="https://stellarwalletskit.dev/" class="${q(`font-semibold underline ml-1`)}">
          Stellar Wallets Kit
        </a>
      </p>
    </footer>
  `}var $;(function(e){e.xs=`w-6 h-6`,e.sm=`w-8 h-8`,e.md=`w-10 h-10`,e.lg=`w-12 h-12`,e.xl=`w-14 h-14`})($||={});var tn=`inline-block rounded-full outline -outline-offset-1 outline-black/5 dark:outline-white/10`;function nn(e){return C`
    <img alt="${e.alt}" src="${e.image}" class="${q(R(tn,e.size))}" />
  `}var rn=a(()=>{let t=ne.value.reduce((e,t)=>({available:t.isAvailable?[...e.available,t]:e.available,unavailable:t.isAvailable?e.unavailable:[...e.unavailable,t]}),{available:[],unavailable:[]}),n;try{let t=globalThis?.localStorage.getItem(e.usedWalletsIds);n=t?JSON.parse(t):[]}catch(e){console.error(e),n=[]}let r=[],i=[];for(let e of t.available)n.find(t=>t===e.id)?r.push(e):i.push(e);return[...r.sort((e,t)=>n.indexOf(e.id)-n.indexOf(t.id)),...i,...t.unavailable]});async function an(e){if(!e.isAvailable){globalThis.open(e.url,`_blank`);return}if(m.value=e.id,ce.next(e),e.type===d.HW_WALLET)Q(f.HW_ACCOUNTS_FETCHER);else try{let{address:e}=await y.value.getAddress();_.value=e,b.next(e)}catch(e){b.next(e)}}function on(){ee.value=`Connect Wallet`;let e=rn.value.find(e=>e.isPlatformWrapper);if(e)return an(e).then(),C`
      <div class="${q(`w-full text-center px-4 py-8`)}">
        <div class="${q(`w-full mb-4`)}">
          <${nn} alt="${e.name} icon" image="${e.icon}" size="${$.md}" />
        </div>

        <p class="${q(`text-foreground text-lg w-full`)}">
          Connecting to your wallet using <b>${e.name}</b>
        </p>
      </div>
    `;let t=C`
    <div class="${q(`w-full text-center text-foreground font-semibold p-4`)}">Loading wallets...</div>
  `,n=rn.value.map(e=>C`
      <li
        onClick="${()=>an(e)}"
        class="${q(`px-2 py-2 cursor-pointer flex justify-between items-center bg-background hover:border-light-gray border-1 border-transparent rounded-default duration-150 ease active:bg-background active:border-gray`)}"
      >
        <div class="${q(`flex items-center gap-2`)}">
          <${nn} class="${q(`mr-2`)}" alt="${e.name} icon" image="${e.icon}" size="${$.sm}" />
          <p class="${q(`text-foreground font-semibold`)}">${e.name}</p>
        </div>

        ${de.value&&!e.isAvailable?C`
            <div class="${q(`ml-4 flex items-center`)}">
              <small
                class="${q(`inline-flex items-center border-1 border-border px-2 py-1 rounded-default text-foreground-secondary text-xs bg-background-secondary`)}"
              >
                ${ie.value}

                <svg class="${q(`w-4 h-4`)}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"></path>
                </svg>
              </small>
            </div>
          `:``}
      </li>
    `);return C`
    <ul class="${q(`w-full grid gap-2 px-2 py-4`)}">
      ${rn.value.length===0?t:n}
    </ul>
  `}function sn(){return C`
    <section class="${q(`w-full p-4 pb-8 rounded-tl-default`)}">
      <div class="${q(`w-full mb-6`)}">
        <h3 class="${q(`text-foreground-strong font-semibold text-lg mb-2`)}">What is a wallet?</h3>
        <p class="${q(`text-foreground text-sm`)}">
          Wallets are used to send, receive, and store the keys you use to sign blockchain transactions.
        </p>
      </div>

      <div class="w-full">
        <h3 class="${q(`text-foreground-strong font-semibold text-lg mb-2`)}">What is Stellar?</h3>
        <p class="${q(`text-foreground text-sm`)}">
          Stellar is a decentralized, public blockchain that gives developers the tools to create experiences that are more
          like cash than crypto.
        </p>
      </div>
    </section>
  `}var cn=c(!1);function ln(){if(!_.value)throw Error(`Text to copy to the clipboard can't be undefined`);navigator.clipboard.writeText(_.value).then(()=>{cn.value=!0,setTimeout(()=>{cn.value=!1},2500)}).catch(e=>console.error(e))}function un(){return ee.value=``,C`
    <section class="${q(`w-full flex flex-col pb-8`)}">
      <div class="${q(`w-full flex justify-center mb-4`)}">
        <${nn} alt="${y.value?.productName} icon" image="${y.value?.productIcon}" size="${$.xl}" />
      </div>
      
      <div class="${q(`w-full flex items-center justify-center mb-2`)}">
        <h1 class="${q(`text-lg font-semibold text-foreground`)}">
          ${_.value&&`${_.value.slice(0,6)}....${_.value.slice(-6)}`}
        </h1>
      </div>
      
      <div class="${q(`w-full flex flex-col items-center justify-center gap-2`)}">
        <${Z} mode="${Y.ghost}" onClick="${ln}" size="${J.sm}">
          ${cn.value?`Address copied!`:C`Copy address`} <svg class="${q(`w-4 h-4 ml-2`)}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z"></path></svg>
        <//>

        <${Z} mode="${Y.ghost}" onClick="${le}" size="${J.sm}">
          Disconnect <svg class="${q(`w-4 h-4 ml-2`)}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5 11H13V13H5V16L0 12L5 8V11ZM3.99927 18H6.70835C8.11862 19.2447 9.97111 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.97111 4 8.11862 4.75527 6.70835 6H3.99927C5.82368 3.57111 8.72836 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C8.72836 22 5.82368 20.4289 3.99927 18Z"></path></svg>
        <//>
      </div>
    </section>
  `}var dn={error:null,loading:!0,accounts:[]},fn=class extends t{constructor(){super(...arguments),Object.defineProperty(this,"stateSignal",{enumerable:!0,configurable:!0,writable:!0,value:c(dn)})}componentWillMount(){ee.value=`Wallet Accounts`,this.fetchAccounts()}async fetchAccounts(){let e=y.value;this.stateSignal.value=dn,e.disconnect&&(await e.disconnect(),await new Promise(e=>setTimeout(e,500)));try{let t=await e.getAddresses();this.stateSignal.value={...this.stateSignal.value,loading:!1,accounts:t}}catch(e){this.stateSignal.value={...this.stateSignal.value,error:e.message}}}async selectAccount(e){_.value=e.publicKey,b.next(e.publicKey)}render(){let e=C`
      <div class="${q(`py-8 w-full flex justify-center items-center text-foreground`)}">
        <svg class="${q(`w-8 h-8 text-gray-200 animate-spin`)}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3C16.9706 3 21 7.02944 21 12H19C19 8.13401 15.866 5 12 5V3Z"></path>
        </svg>
      </div>
    `,t=C`    
      <ul class="${q(`w-full grid gap-2 px-2 py-4 text-foreground`)}">
        ${re.value.map(({publicKey:e,index:t})=>C`
            <li onClick=${()=>this.selectAccount({publicKey:e,index:t})}
                class="${q(`px-2 py-2 cursor-pointer flex justify-between items-center bg-background hover:border-light-gray border-1 border-transparent rounded-default duration-150 ease active:bg-background active:border-gray`)}">
              ${e.slice(0,6)}....${e.slice(-6)}

              <span class="dialog-text">(44'/148'/${t}')</span>
            </li>
          `)}
      </ul>
    `,n=C`
      <div class="${q(`w-full text-center text-foreground py-4`)}">
        <div class="${q(`text-danger`)}">
          <svg class="${q(`inline-block mx-auto w-8 h-8 mb-2`)}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.8659 3.00017L22.3922 19.5002C22.6684 19.9785 22.5045 20.5901 22.0262 20.8662C21.8742 20.954 21.7017 21.0002 21.5262 21.0002H2.47363C1.92135 21.0002 1.47363 20.5525 1.47363 20.0002C1.47363 19.8246 1.51984 19.6522 1.60761 19.5002L11.1339 3.00017C11.41 2.52187 12.0216 2.358 12.4999 2.63414C12.6519 2.72191 12.7782 2.84815 12.8659 3.00017ZM4.20568 19.0002H19.7941L11.9999 5.50017L4.20568 19.0002ZM10.9999 16.0002H12.9999V18.0002H10.9999V16.0002ZM10.9999 9.00017H12.9999V14.0002H10.9999V9.00017Z"></path>
          </svg>
        </div>
        
        <h3 class="${q(`text-sm font-semibold`)}">
          Error while fetching accounts with reason:
        </h3>
        
        <p class="${q(`mb-4 text-sm`)}">
          ${this.stateSignal.value.error}
        </p>
        
        <div class="${q(`w-full flex justify-center items-center`)}">
          <${Z} onClick=${()=>this.fetchAccounts()} size="${J.md}">
            Retry
          <//>
        </div>
      </div>
    `;return this.stateSignal.value.error?n:this.stateSignal.value.loading?e:t}},pn={[f.AUTH_OPTIONS]:on,[f.HELP_PAGE]:sn,[f.PROFILE_PAGE]:un,[f.HW_ACCOUNTS_FETCHER]:fn},mn=j`
  .glass {
    backdrop-filter: blur(10px);
    background-color: color-mix(in srgb, var(--swk-background) 25%, transparent);
  }
`;function hn(){return C`
    <section class="stellar-wallets-kit ${q(R([ue.value===u.FIXED?`fixed flex left-0 top-0 z-[999] w-full h-full`:`inline-flex`,`font-default justify-center items-center`]))} ${q(Wt)} ${q(mn)}">
      ${ue.value===u.FIXED?C`
          <div class="${q(`absolute left-0 top-0 z-0 w-full h-full bg-[rgba(0,0,0,0.5)]`)}" onClick="${()=>v.next()}"></div>
        `:``}

      <section
        class="${q(`w-full h-fit relative max-w-[22rem] max-h-[39.4375rem] grid grid-cols-1 grid-rows-[auto_1fr_auto] bg-background rounded-default shadow-default transition-all duration-[0.5s] ease-in-out overflow-hidden max-h-[400px] overflow-y-scroll`)}"
      >
        <div class="${q(`col-span-1 top-0 sticky z-50`)} glass">
          <${$t} />
        </div>

        <div class="${q(`col-span-1 relative z-10`)}">
          <${Yt}
            currentRoute="${te.value}"
            pages="${pn}"
            duration="${400}"
          />
        </div>

        <div class="${q(`col-span-1 bottom-0 sticky z-50`)} glass">
          <${en} />
        </div>
      </section>
    </section>
  `}async function gn(e){if(e&&e(),x.value===void 0)throw Error(`The kit hasn't been initiated.`);!y.value||!_.value?await vn.authModal():await vn.profileModal()}function _n(e){let t=_.value?`${_.value.slice(0,4)}....${_.value.slice(-6)}`:`Connect Wallet`;return C`
    <div class="${q(Wt)} ${q(`inline-block`)}">      
      <${Z} styles=${e.styles} 
                 classes=${e.classes}
                 mode=${e.mode||Y.primary}
                 shape=${e.shape||X.regular}
                 size=${e.size}
                 onClick=${()=>gn(e.onClick)}>        
        ${e.children?e.children:t}
      <//>
    </div>
  `}var vn=class e{static init(t){x.value=t.modules,t.selectedWalletId&&e.setWallet(t.selectedWalletId),t.network&&e.setNetwork(t.network),t.theme&&e.setTheme(t.theme),t.authModal&&(t.authModal.showInstallLabel!==void 0&&(de.value=t.authModal.showInstallLabel),t.authModal.hideUnsupportedWallets!==void 0&&(se.value=t.authModal.hideUnsupportedWallets))}static get selectedModule(){if(!y.value)throw{code:-3,message:`Please set the wallet first`};return y.value}static setWallet(e){let t=x.value.find(t=>t.productId===e);if(!t)throw Error(`Wallet id "${e}" is not and existing module`);m.value=t.productId}static setNetwork(e){n.value=e}static setTheme(e=l){h.value=e}static async getAddress(){if(!_.value)throw{code:-1,message:`No wallet has been connected.`};return{address:_.value}}static async fetchAddress(){let{address:t}=await e.selectedModule.getAddress();return _.value=t,b.next(t),{address:t}}static signTransaction(t,r){return e.selectedModule.signTransaction(t,{...r,networkPassphrase:r?.networkPassphrase||n.value})}static signAuthEntry(t,r){return e.selectedModule.signAuthEntry(t,{...r,networkPassphrase:r?.networkPassphrase||n.value})}static signMessage(t,r){return e.selectedModule.signMessage(t,{...r,networkPassphrase:r?.networkPassphrase||n.value})}static signAndSubmitTransaction(t,r){let i=e.selectedModule;if(!i.signAndSubmitTransaction)throw{code:-3,message:`The selected module "${i.productName}" does not support the "signAndSubmitTransaction" method.`};return i.signAndSubmitTransaction(t,{...r,networkPassphrase:r?.networkPassphrase||n.value})}static getNetwork(){return e.selectedModule.getNetwork()}static async disconnect(){le()}static on(e,t){switch(e){case r.STATE_UPDATED:{let e,i;return s(()=>{(_.value!==e||n.value!==i)&&(e=_.value,i=n.value,t({eventType:r.STATE_UPDATED,payload:{address:_.value,networkPassphrase:n.value}}))})}case r.WALLET_SELECTED:{let e;return s(()=>{m.value!==e&&(e=m.value,t({eventType:r.WALLET_SELECTED,payload:{id:m.value}}))})}case r.DISCONNECT:return oe.subscribe(()=>{t({eventType:r.DISCONNECT,payload:{}})});default:throw Error(`${e} event type is not supported`)}}static async refreshSupportedWallets(){let e=await Promise.all(x.value.map(async e=>{let t=new Promise(e=>setTimeout(()=>e(!1),1e3));return{id:e.productId,name:e.productName,type:e.moduleType,icon:e.productIcon,isAvailable:await Promise.race([t,e.isAvailable()]).catch(()=>!1),isPlatformWrapper:await Promise.race([t,e.isPlatformWrapper?e.isPlatformWrapper():Promise.resolve(!1)]).catch(()=>!1),url:e.productUrl}}));return ne.value=e,e}static async createButton(e,t={}){g(C`
        <${_n}
          styles="${t.styles}"
          classes="${t.classes}"
          mode="${t.mode}"
          shape="${t.shape}"
          size="${t.size}"
          onClick="${()=>t.onClick&&t.onClick()}"
          children="${t.children}"
        />
      `,e)}static async authModal(t){Kt(),Q(f.AUTH_OPTIONS),ue.value=t?.container?u.BLOCK:u.FIXED;let n=document.createElement(`div`);(t?.container||document.body).appendChild(n),g(C`
        <${hn} />
      `,n),await e.refreshSupportedWallets();let r=[],i=()=>{for(let e of r)e();g(null,n),n.parentNode?.removeChild(n)};return new Promise((e,t)=>{let n=b.subscribe(n=>{typeof n==`string`?e({address:n}):t(ae(n))}),i=v.subscribe(()=>{t({code:-1,message:`The user closed the modal.`})});r.push(n),r.push(i)}).then(e=>(i(),e)).catch(e=>{throw i(),e})}static async profileModal(e){if(!_.value)throw{code:-1,message:`There is no active address, the user needs to authenticate first.`};Kt(),Q(f.PROFILE_PAGE),ue.value=e?.container?u.BLOCK:u.FIXED;let t=document.createElement(`div`);(e?.container||document.body).appendChild(t),g(C`
        <${hn} />
      `,t);let n=v.subscribe(()=>{n(),g(null,t),t.parentNode?.removeChild(t)})}};export{vn as StellarWalletsKit,en as a,Q as c,X as d,le as disconnect,J as f,_e as h,$ as i,Z as l,ve as m,hn as n,$t as o,ye as p,ae as parseError,nn as r,qt as s,_n as t,Y as u};