import{i as e,s as t}from"./preload-helper-CT_b8DTk.js";import{t as n}from"./react-B7Te67-h.js";import{D as r,E as i,F as a,P as o}from"./ime-Dy4QRKoo.js";import{F as s,t as c}from"./utils-BvLSJGCk.js";import{t as l}from"./jsx-runtime-DqZldVDK.js";import{n as u,t as d}from"./Text-DSB4YHcH.js";function f(){b=!1;let e=[];for(let t of y)e.push(...t.getAnimations());y.clear();for(let t of e)t.startTime=0}function p(e){if(!(e==null||typeof e.getAnimations!=`function`))return y.add(e),b||(b=!0,requestAnimationFrame(f)),()=>{y.delete(e)}}function m({size:e=`md`,shade:t=`default`,label:n,xstyle:i,className:o,style:c,"aria-label":l,"data-testid":u,ref:f,...m}){let{border:y,diameter:b}=v[e],w=b+y*2,T=w/2,E=Math.PI*b,D=E*_,O=n!=null,k=(0,h.useId)(),A=O&&typeof n==`string`&&l==null,j=(0,g.jsx)(`span`,{ref:O?void 0:f,role:`status`,"aria-label":A?void 0:l??(typeof n==`string`?n:void 0)??`Loading`,"aria-labelledby":A?k:void 0,"data-testid":O?void 0:u,...O?{}:m,...s(O?``:r(`spinner`,{size:e,shade:t}),a(x.spinner,!O&&i),O?void 0:o,{...O?{}:c,width:w,height:w}),children:(0,g.jsxs)(`svg`,{ref:p,width:w,height:w,viewBox:`0 0 ${w} ${w}`,"aria-hidden":`true`,className:`astryxlp1x4z astryx1lliihq astryx1so62im astryx14qxm4i astryxnh0sag astryxa4qsjk astryx48ohth astryx1esw782`,children:[(0,g.jsx)(`circle`,{cx:T,cy:T,r:b/2,strokeWidth:y,...a(x.circle,C[t])}),(0,g.jsx)(`circle`,{cx:T,cy:T,r:b/2,strokeWidth:y,strokeDasharray:`${D} ${E-D}`,transform:`rotate(-90 ${T} ${T})`,...a(x.circle,S[t])})]})});return O?(0,g.jsxs)(`div`,{ref:f,"data-testid":u,...m,...s(r(`spinner`,{size:e,shade:t}),a(x.wrapper,i),o,c),children:[j,typeof n==`string`?(0,g.jsx)(d,{id:k,type:`body`,weight:`bold`,children:n}):n]}):j}var h,g,_,v,y,b,x,S,C,w=e((()=>{h=t(n(),1),o(),u(),c(),i(),g=l(),_=.375,v={sm:{diameter:10,border:2},md:{diameter:14,border:3},lg:{diameter:18,border:3},xl:{diameter:28,border:4}},y=new Set,b=!1,x={wrapper:{k1xSpc:`astryx3nfvp2`,kXwgrk:`astryxdt5ytf`,kGNEyG:`astryx6s0dn4`,kOIVth:`astryx1txdalj`,$$css:!0},spinner:{k1xSpc:`astryxwz0xwf`,kgQiWS:`astryx1ku5rj1`,kVQacm:`astryxb3r6kr`,kXLuUW:`astryxxymvpz`,$$css:!0},circle:{kDwRjp:`astryxbh8q5q`,kU5bRw:`astryx1owpc8m`,$$css:!0}},S={default:{kjVXCG:`astryxjsr54c`,$$css:!0},subtle:{kjVXCG:`astryxxvau67`,$$css:!0},onMedia:{kjVXCG:`astryx16lqycg`,$$css:!0},inherit:{kjVXCG:`astryx73je2i`,$$css:!0}},C={default:{kjVXCG:`astryxpi25hw`,kDd8S0:`astryx1g350g8`,$$css:!0},subtle:{kjVXCG:`astryxpi25hw`,kDd8S0:`astryx1g350g8`,$$css:!0},onMedia:{kjVXCG:`astryx16lqycg`,kDd8S0:`astryx1smxkh6`,$$css:!0},inherit:{kjVXCG:`astryx73je2i`,kDd8S0:`astryx7bo2k`,$$css:!0}},m.displayName=`Spinner`,m.__docgenInfo={description:`An animated loading indicator. Available in four sizes and four color shades.

@example
\`\`\`
<Spinner />
<Spinner size="sm" />
<Spinner size="lg" shade="onMedia" />
<Spinner label="Loading..." />
<Spinner aria-label="Loading data" />
\`\`\``,methods:[],displayName:`Spinner`,props:{xstyle:{required:!1,tsType:{name:`StyleXStyles`},description:"StyleX styles created via `stylex.create()`. Merged with the component's\nbase styles inside a single `stylex.props()` call for optimal deduplication.\n\n@example\n```\nconst overrides = stylex.create({ root: { marginBottom: 8 } });\n<Component xstyle={overrides.root} />\n```"},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLSpanElement>`,elements:[{name:`HTMLSpanElement`}]},description:`Ref forwarded to the root element`},size:{required:!1,tsType:{name:`union`,raw:`keyof typeof SIZES`,elements:[{name:`literal`,value:`sm`},{name:`literal`,value:`md`},{name:`literal`,value:`lg`},{name:`literal`,value:`xl`}]},description:`Spinner size.
- 'sm': 10px diameter
- 'md': 14px diameter
- 'lg': 18px diameter
- 'xl': 28px diameter
@default 'md'`,defaultValue:{value:`'md'`,computed:!1}},shade:{required:!1,tsType:{name:`union`,raw:`'default' | 'onMedia' | 'subtle' | 'inherit'`,elements:[{name:`literal`,value:`'default'`},{name:`literal`,value:`'onMedia'`},{name:`literal`,value:`'subtle'`},{name:`literal`,value:`'inherit'`}]},description:`Color shade.
- 'default': accent color on light backgrounds
- 'onMedia': white on dark/accent backgrounds
- 'subtle': secondary text color, less prominent — for inline use in lists
- 'inherit': inherits the parent's \`currentColor\` (with a translucent
  track) — use inside colored elements like buttons so the ring matches
  the resolved foreground regardless of theme/variant
@default 'default'`,defaultValue:{value:`'default'`,computed:!1}},label:{required:!1,tsType:{name:`ReactNode`},description:`Visible content displayed below the spinner.
Accepts a string or ReactNode for rich content.

When \`label\` is a string, the visible text also provides the accessible
name of the status element (via aria-labelledby, avoiding a duplicate
announcement) unless \`aria-label\` is explicitly set.

@example
\`\`\`
<Spinner label="Loading..." />
<Spinner label={<><strong>Fetching data</strong><br/>This may take a moment</>} aria-label="Fetching data" />
\`\`\``},"data-testid":{required:!1,tsType:{name:`string`},description:`Test ID for the root element.`}},composes:[`Omit`]}})),T=e((()=>{w()}));export{m as n,w as r,T as t};