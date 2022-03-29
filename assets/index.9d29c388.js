import{C as r,D as c}from"./vendor.b59b74b7.js";const g=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function u(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(e){if(e.ep)return;e.ep=!0;const s=u(e);fetch(e.href,s)}};g();async function p(a){const t=await fetch(a);if(!t.ok){const i=`An error has occured: ${t.status}`;throw new Error(i)}return await t.json()}const m=document.getElementById("myChart").getContext("2d"),f=document.getElementById("ig_reach_chart").getContext("2d"),y=document.getElementById("ig_impression_chart").getContext("2d"),b=document.getElementById("fb_engaged_user_chart").getContext("2d"),h=document.getElementById("fb_impression_chart").getContext("2d"),o={labels:[],datasets:[{data:[],backgroundColor:"rgba(82, 186, 92, 1)",borderColor:"rgb(82, 186, 92, 1)",borderWidth:2,pointRadius:0,pointHitRadius:100}]},n={plugins:{legend:{display:!1},title:{display:!0,text:"Insights",align:"start",font:{size:18}}},scales:{x:{time:{unit:"week"},type:"time",offset:!0,title:{display:!0,text:"Date"},grid:{display:!1}},y:{beginAtZero:!0}}},l={labels:[],datasets:[{label:"Instagram",data:[],fill:!1,backgroundColor:"rgb(193, 53, 132)",borderColor:"rgb(225, 48, 108)",tension:.1,borderWidth:2,pointRadius:0,pointHitRadius:100},{label:"Facebook",data:[],fill:!1,backgroundColor:"rgb(66, 103, 178)",borderColor:"rgb(66, 103, 178)",tension:.1,borderWidth:2,pointRadius:0,pointHitRadius:100}]},w={responsive:!0,plugins:{title:{display:!0,text:"Total Followers over Time",align:"start",font:{size:22}},legend:{align:"end"}},scales:{x:{type:"time",title:{display:!0,text:"Date"},grid:{display:!1},time:{unit:"week"}},y:{title:{display:!0,text:"followers"}}}},x=new r(m,{type:"line",data:l,options:w}),C=new r(f,{type:"line",data:o,options:n}),I=new r(y,{type:"line",data:o,options:n}),v=new r(b,{type:"line",data:o,options:n}),_=new r(h,{type:"line",data:o,options:n});p("https://real-sheet-26ui5cq6.wl.gateway.dev/display_data?source=follower_counts").then(a=>{l.labels=a.values[0].map(t=>c.fromISO(t).toJSDate()),l.datasets[0].data=a.values[1].map(t=>parseInt(t)),l.datasets[1].data=a.values[2].map(t=>parseInt(t)),x.update()});p("https://real-sheet-26ui5cq6.wl.gateway.dev/display_data?source=insights").then(a=>{o.labels=a.values[0].map(t=>c.fromISO(t).toJSDate()),o.datasets[0].data=a.values[1].map(t=>parseInt(t)),n.plugins.title.text="Instagram Reach over Time",C.update(),o.datasets[0].data=a.values[2].map(t=>parseInt(t)),n.plugins.title.text="Instagram Impression over Time",I.update(),o.datasets[0].data=a.values[3].map(t=>parseInt(t)),o.datasets[0].type="bar",n.plugins.title.text="Facebook Page Engaged Users over Time",v.update(),o.datasets[0].data=a.values[4].map(t=>parseInt(t)),n.plugins.title.text="Facebook Page Impression over Time",_.update()});
