import"./modulepreload-polyfill-3cfb730f.js";const n=1;if(window.location.pathname.startsWith("/lustre")){const t=window.location.protocol,a=window.location.hostname,o=window.location.port,i=window.location.pathname.split("/").slice(0,1+n).join("/"),c=window.location.pathname.slice(1).split("/").slice(n).join("/").replace(/&/g,"~and~"),e=window.location.search?"&"+window.location.search.slice(1).replace(/&/g,"~and~"):"",s=window.location.hash;window.location.replace(`${t}//${a}${o?":"+o:""}${i}/?/${c}${e}${s}`)}