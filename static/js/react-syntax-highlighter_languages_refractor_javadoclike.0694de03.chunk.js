"use strict";(self.webpackChunkcarbonorm=self.webpackChunkcarbonorm||[]).push([[902],{39285:function(a){function e(a){!function(a){var e=a.languages.javadoclike={parameter:{pattern:/(^[\t ]*(?:\/{3}|\*|\/\*\*)\s*@(?:arg|arguments|param)\s+)\w+/m,lookbehind:!0},keyword:{pattern:/(^[\t ]*(?:\/{3}|\*|\/\*\*)\s*|\{)@[a-z][a-zA-Z-]+\b/m,lookbehind:!0},punctuation:/[{}]/};Object.defineProperty(e,"addSupport",{value:function(e,n){"string"===typeof e&&(e=[e]),e.forEach((function(e){!function(e,n){var t="doc-comment",r=a.languages[e];if(r){var o=r[t];if(!o){var i={};i[t]={pattern:/(^|[^\\])\/\*\*[^/][\s\S]*?(?:\*\/|$)/,lookbehind:!0,alias:"comment"},o=(r=a.languages.insertBefore(e,"comment",i))[t]}if(o instanceof RegExp&&(o=r[t]={pattern:o}),Array.isArray(o))for(var s=0,c=o.length;s<c;s++)o[s]instanceof RegExp&&(o[s]={pattern:o[s]}),n(o[s]);else n(o)}}(e,(function(a){a.inside||(a.inside={}),a.inside.rest=n}))}))}}),e.addSupport(["java","javascript","php"],e)}(a)}a.exports=e,e.displayName="javadoclike",e.aliases=[]}}]);
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_javadoclike.0694de03.chunk.js.map