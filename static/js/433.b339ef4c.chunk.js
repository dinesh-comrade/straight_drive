"use strict";(self.webpackChunkstraight_drive=self.webpackChunkstraight_drive||[]).push([[433],{1433:(e,a,l)=>{l.r(a),l.d(a,{default:()=>m});var s=l(5043),t=l(7154);const c=l.p+"static/media/arrows.fb25130ec5d6552cb043a58b3f0df97a.svg";const i=l.p+"static/media/calendar.9a116f5464b9da2619a1c340e1104a45.svg";var n=l(1899),o=l.n(n),r=(l(5015),l(7752)),d=(l(2851),l(2702),l(579));const m=()=>{const[e,a]=(0,s.useState)(null),[l,n]=(0,s.useState)(null),m=(0,s.forwardRef)(((e,a)=>{let{value:l,onClick:s}=e;return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)("div",{className:"input-group",children:[(0,d.jsx)("span",{className:"input-group-text",id:"basic-addon1",onClick:s,ref:a,children:(0,d.jsx)("img",{src:i,alt:"calendar",className:"calendar-icon"})}),(0,d.jsx)("input",{value:l,onChange:()=>{},className:"form-control","aria-label":"Calendar","aria-describedby":"basic-addon1"})]})})})),[h,u]=(0,s.useState)([]),[x,j]=(0,s.useState)([{field:"athlete",filter:"agTextColumnFilter",tooltipField:"country"},{field:"age",filter:"agNumberColumnFilter"},{field:"country",filter:"agTextColumnFilter"},{field:"date",filter:"agDateColumnFilter",filterParams:{comparator:function(e,a){var l=a.split("/"),s=new Date(Number(l[2]),Number(l[1])-1,Number(l[0]));return e.getTime()===s.getTime()?0:s<e?-1:s>e?1:void 0}}}]);(0,s.useEffect)((()=>{t.A.get("https://www.ag-grid.com/example-assets/olympic-winners.json").then((e=>{u(e.data)})).catch((e=>{console.log(e)}))}),[]);const p=(0,s.useMemo)((()=>({sortable:!0,filter:!0,floatingFilter:!0,filterParams:{debounceMs:200},flex:1,minWidth:100,resizable:!0})),[]);return(0,d.jsx)("main",{className:"data-logs",children:(0,d.jsxs)("div",{className:"container",children:[(0,d.jsx)("div",{className:"row",children:(0,d.jsx)("div",{className:"col-12",children:(0,d.jsx)("h1",{className:"text-center data-title",children:"Data Logs"})})}),(0,d.jsxs)("div",{className:"data-logs-body",children:[(0,d.jsxs)("div",{className:"mb-3 row",children:[(0,d.jsx)("label",{htmlFor:"staticEmail",className:"col-sm-2 col-form-label data-label",children:"Company"}),(0,d.jsx)("div",{className:"col-sm-10",children:(0,d.jsxs)("select",{className:"form-select data-select","aria-label":"Default select example",children:[(0,d.jsx)("option",{selected:!0,children:"Company 1"}),(0,d.jsx)("option",{value:"1",children:"Company 2"}),(0,d.jsx)("option",{value:"2",children:"Company 3"}),(0,d.jsx)("option",{value:"3",children:"Company 4"})]})})]}),(0,d.jsxs)("div",{className:"mb-3 row",children:[(0,d.jsx)("label",{htmlFor:"staticEmail",className:"col-sm-2 col-form-label data-label",children:"Machine"}),(0,d.jsx)("div",{className:"col-sm-10",children:(0,d.jsxs)("select",{className:"form-select data-select","aria-label":"Default select example",children:[(0,d.jsx)("option",{selected:!0,children:"Machine 1"}),(0,d.jsx)("option",{value:"1",children:"Machine 2"}),(0,d.jsx)("option",{value:"2",children:"Machine 3"}),(0,d.jsx)("option",{value:"3",children:"Machine 4"})]})})]}),(0,d.jsxs)("div",{className:"mb-3 row",children:[(0,d.jsx)("div",{className:"col-lg-5 col-md-4 col-sm-2",children:(0,d.jsxs)("div",{className:"Date-container fromDate-container",children:[(0,d.jsx)("label",{htmlFor:"fromDate",className:"date-label",children:"From Date"}),(0,d.jsx)(o(),{id:"fromDate",selected:e,onChange:e=>a(e),dateFormat:"dd/MM/yyyy",customInput:(0,d.jsx)(m,{})})]})}),(0,d.jsx)("div",{className:"col-lg-2 col-md-1 col-sm-1",children:(0,d.jsx)("div",{className:"d-flex justify-content-center align-items-center",children:(0,d.jsx)("img",{src:c,alt:"arrows",className:"arrows"})})}),(0,d.jsx)("div",{className:"col-lg-5 col-md-4 col-sm-1",children:(0,d.jsxs)("div",{className:"Date-container",children:[(0,d.jsx)("label",{htmlFor:"toDate",className:"date-label",children:"To Date"}),(0,d.jsx)(o(),{id:"toDate",selected:l,onChange:e=>n(e),dateFormat:"dd/MM/yyyy",customInput:(0,d.jsx)(m,{})})]})})]}),(0,d.jsx)("div",{className:"mb-3 row justify-content-center",children:(0,d.jsx)("div",{className:"col-lg-4 col-md-2 col-sm-2 col-12 d-flex justify-content-center",children:(0,d.jsx)("button",{className:"btn btn-primary px-4 py-1 rounded-pill btn-datas",type:"button",children:"Show Datas"})})})]}),(0,d.jsx)("div",{className:"mb-3 row mt-5",children:(0,d.jsx)("div",{className:"ag-theme-alpine",style:{height:"800px",width:"100%"},children:(0,d.jsx)(r.AgGridReact,{popupParent:document.body,rowData:h,columnDefs:x,defaultColDef:p,animateRows:!0,pagination:!0,paginationPageSize:10,paginationPageSizeSelector:!1,paginationAutoPageSize:!1,domLayout:"autoHeight"})})})]})})}}}]);
//# sourceMappingURL=433.b339ef4c.chunk.js.map