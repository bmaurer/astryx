import{i as e}from"./preload-helper-CT_b8DTk.js";import{t}from"./jsx-runtime-DqZldVDK.js";import{n,t as r}from"./LineClamp-BNO5ENhu.js";var i,a,o,s,c,l,u,d,f,p;e((()=>{r(),i=t(),a=`Astryx is an open source design system that grew inside Meta over the last eight years, where it became the most-used and largest design system in the company — powering thousands of apps and shaped by the engineers, designers, and product teams who depend on it every day.`,o={title:`Lab/LineClamp`,component:n,tags:[`autodocs`],argTypes:{maxLines:{control:{type:`number`,min:1,max:6,step:1},description:`Maximum number of lines before clamping`},hasTooltip:{control:`boolean`,description:`Show full content in a tooltip when clamped`},as:{control:`select`,options:[`div`,`span`,`p`],description:`HTML element to render`}},decorators:[e=>(0,i.jsx)(`div`,{style:{maxWidth:320},children:(0,i.jsx)(e,{})})]},s={args:{maxLines:3,children:a}},c={args:{maxLines:2,children:a}},l={args:{maxLines:1,children:a}},u={args:{maxLines:2,hasTooltip:!1,children:a}},d={args:{maxLines:2,children:(0,i.jsxs)(i.Fragment,{children:[`This card description mixes `,(0,i.jsx)(`strong`,{children:`bold`}),`, `,(0,i.jsx)(`em`,{children:`italic`}),`, and plain text — content a single `,(0,i.jsx)(`code`,{children:`<Text>`}),` node can't compose, which is exactly what LineClamp wraps around instead.`]})}},f={args:{maxLines:3,children:`This content is short enough that it never clamps.`}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    maxLines: 3,
    children: LONG_TEXT
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    maxLines: 2,
    children: LONG_TEXT
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    maxLines: 1,
    children: LONG_TEXT
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    maxLines: 2,
    hasTooltip: false,
    children: LONG_TEXT
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    maxLines: 2,
    children: <>
        This card description mixes <strong>bold</strong>, <em>italic</em>, and
        plain text — content a single <code>{'<Text>'}</code> node can&apos;t
        compose, which is exactly what LineClamp wraps around instead.
      </>
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    maxLines: 3,
    children: 'This content is short enough that it never clamps.'
  }
}`,...f.parameters?.docs?.source}}},p=[`Default`,`TwoLines`,`SingleLine`,`WithoutTooltip`,`MixedContent`,`ShortContentNotClamped`]}))();export{s as Default,d as MixedContent,f as ShortContentNotClamped,l as SingleLine,c as TwoLines,u as WithoutTooltip,p as __namedExportsOrder,o as default};