const p="[A-Za-z$_][0-9A-Za-z$_]*",G=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],K=["true","false","null","undefined","NaN","Infinity"],v=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],L=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],w=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],H=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],J=[].concat(w,v,L);function X(e){const a=e.regex,B=(t,{after:r})=>{const l="</"+t[0].slice(1);return t.input.indexOf(l,r)!==-1},n=p,A={begin:"<>",end:"</>"},x=/<[A-Za-z0-9\\._:-]+\s*\/>/,o={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(t,r)=>{const l=t[0].length+t.index,d=t.input[l];if(d==="<"||d===","){r.ignoreMatch();return}d===">"&&(B(t,{after:l})||r.ignoreMatch());let u;const M=t.input.substring(l);if(u=M.match(/^\s*=/)){r.ignoreMatch();return}if((u=M.match(/^\s+extends\s+/))&&u.index===0){r.ignoreMatch();return}}},s={$pattern:p,keyword:G,literal:K,built_in:J,"variable.language":H},_="[0-9](_?[0-9])*",E=`\\.(${_})`,N="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",S={className:"number",variants:[{begin:`(\\b(${N})((${E})|\\.)?|(${E}))[eE][+-]?(${_})\\b`},{begin:`\\b(${N})\\b((${E})\\b|\\.)?|(${E})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},c={className:"subst",begin:"\\$\\{",end:"\\}",keywords:s,contains:[]},m={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,c],subLanguage:"xml"}},T={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,c],subLanguage:"css"}},f={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,c],subLanguage:"graphql"}},R={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,c]},b={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:n+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},y=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,m,T,f,R,{match:/\$\d+/},S];c.contains=y.concat({begin:/\{/,end:/\}/,keywords:s,contains:["self"].concat(y)});const I=[].concat(b,c.contains),g=I.concat([{begin:/\(/,end:/\)/,keywords:s,contains:["self"].concat(I)}]),i={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:g},U={variants:[{match:[/class/,/\s+/,n,/\s+/,/extends/,/\s+/,a.concat(n,"(",a.concat(/\./,n),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,n],scope:{1:"keyword",3:"title.class"}}]},O={relevance:0,match:a.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...v,...L]}},h={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},D={variants:[{match:[/function/,/\s+/,n,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[i],illegal:/%/},k={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function P(t){return a.concat("(?!",t.join("|"),")")}const $={match:a.concat(/\b/,P([...w,"super","import"]),n,a.lookahead(/\(/)),className:"title.function",relevance:0},Z={begin:a.concat(/\./,a.lookahead(a.concat(n,/(?![0-9A-Za-z$_(])/))),end:n,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},F={match:[/get|set/,/\s+/,n,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},i]},C="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",z={match:[/const|var|let/,/\s+/,n,/\s*/,/=\s*/,/(async\s*)?/,a.lookahead(C)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[i]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:s,exports:{PARAMS_CONTAINS:g,CLASS_REFERENCE:O},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),h,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,m,T,f,R,b,{match:/\$\d+/},S,O,{className:"attr",begin:n+a.lookahead(":"),relevance:0},z,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[b,e.REGEXP_MODE,{className:"function",begin:C,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:g}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:A.begin,end:A.end},{match:x},{begin:o.begin,"on:begin":o.isTrulyOpeningTag,end:o.end}],subLanguage:"xml",contains:[{begin:o.begin,end:o.end,skip:!0,contains:["self"]}]}]},D,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[i,e.inherit(e.TITLE_MODE,{begin:n,className:"title.function"})]},{match:/\.\.\./,relevance:0},Z,{match:"\\$"+n,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[i]},$,k,U,F,{match:/\$[(.]/}]}}export{X as default};
