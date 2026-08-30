import{i as e}from"./preload-helper-CT_b8DTk.js";import{D as t,E as n,F as r,P as i}from"./ime-Dy4QRKoo.js";import{F as a,S as o,t as s}from"./utils-HJIp2CYO.js";import{t as c}from"./jsx-runtime-DqZldVDK.js";import{f as l,i as u,n as d,p as f}from"./useTheme-CJYItYzy.js";import{n as p,t as m}from"./Icon-CDNRBkXA.js";function h({state:e,size:n=`md`,isDisabled:i=!1,children:s,ref:c,className:l,style:u,xstyle:d,...f}){let p=e===`checked`,m=e===`indeterminate`,h=p||m;return(0,g.jsx)(`span`,{...f,ref:c,"aria-hidden":`true`,...a(t(`checkbox-indicator`,{size:n,checked:p?`checked`:m?`indeterminate`:null,disabled:i?`disabled`:null},{legacyNames:[`checkbox`]}),r(_.box,_.busySlot,v[n],h?_.checked:_.unchecked,i&&_.disabled,i&&!h&&_.disabledUnchecked,d),l,u),children:o(s)?s:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(`svg`,{viewBox:`0 0 10 10`,...a(t(`checkbox-indicator-check`,{size:n}),r(_.checkmark,y[n],p&&_.checkmarkVisible)),children:(0,g.jsx)(`path`,{d:`M8.5 2.5L4 7.5L1.5 5`,stroke:`currentColor`,strokeWidth:`1.5`,fill:`none`,strokeLinecap:`round`,strokeLinejoin:`round`})}),(0,g.jsx)(`span`,{...a(t(`checkbox-indicator-dash`,{size:n}),r(_.indeterminateMark,b[n],m&&_.indeterminateMarkVisible))})]})})}var g,_,v,y,b,x=e((()=>{i(),s(),g=c(),_={busySlot:{"--_spinner-color":`astryxnxwlyo`,"--_spinner-track-color":`astryx1uoj5ry`,"--_spinner-track-opacity":`astryx33z6b6`,$$css:!0},box:{kB7OPa:`astryx9f619`,k1xSpc:`astryx78zum5`,kGNEyG:`astryx6s0dn4`,kjj79g:`astryxl56j7k`,kmuXW:`astryx2lah0s`,kMzoRj:`astryx1litavf`,ksu8eU:`astryx1y0btm7`,kaIpWk:`astryxx3sua9`,k1ekBW:`astryxts7igz`,kIyJzY:`astryxuedmi6 astryx12w9bfk`,kAMwcw:`astryxlr8y92`,$$css:!0},unchecked:{kMwMTN:`astryxqwr325`,kVAM5u:`astryxvy26l8 astryxvr0s6v`,kzOINU:null,kGJrpR:null,kaZRDh:null,kBCPoo:null,k26BEO:null,k5QoK5:null,kLZC3w:null,kL6WhQ:null,kWkggS:`astryx10xzikg astryx1orexks`,$$css:!0},checked:{kMwMTN:`astryx17wrial`,kVAM5u:`astryxad5do astryx1nccqs`,kzOINU:null,kGJrpR:null,kaZRDh:null,kBCPoo:null,k26BEO:null,k5QoK5:null,kLZC3w:null,kL6WhQ:null,kWkggS:`astryx1ewilqj astryxe50u90`,$$css:!0},disabled:{kSiTet:`astryxbyyjgo`,kVAM5u:`astryx14i3s5s astryxzl8x75`,kzOINU:null,kGJrpR:null,kaZRDh:null,kBCPoo:null,k26BEO:null,k5QoK5:null,kLZC3w:null,kL6WhQ:null,$$css:!0},disabledUnchecked:{kWkggS:`astryxwmxj5m astryxejnnay`,$$css:!0},checkmark:{k1xSpc:`astryx1s85apg`,kMwMTN:`astryx17wrial astryxs5hli`,$$css:!0},checkmarkVisible:{k1xSpc:`astryx1lliihq`,$$css:!0},indeterminateMark:{k1xSpc:`astryx1s85apg`,kWkggS:`astryx1azo05 astryxwvh9j7`,kaIpWk:`astryxjspbzw`,$$css:!0},indeterminateMarkVisible:{k1xSpc:`astryx1lliihq`,$$css:!0}},v={sm:{kzqmXN:`astryxw4jnvo`,kZKoxP:`astryx1qx5ct2`,$$css:!0},md:{kzqmXN:`astryxvy4d1p`,kZKoxP:`astryxxk0z11`,$$css:!0}},y={sm:{kzqmXN:`astryxsmyaan`,kZKoxP:`astryx1kpxq89`,$$css:!0},md:{kzqmXN:`astryx6jxa94`,kZKoxP:`astryx1v9usgg`,$$css:!0}},b={sm:{kzqmXN:`astryx1fsd2vl`,kZKoxP:`astryx36qwtl`,$$css:!0},md:{kzqmXN:`astryxsmyaan`,kZKoxP:`astryx36qwtl`,$$css:!0}},h.displayName=`CheckboxIndicator`,h.__docgenInfo={description:`The default checkbox visual: a square box with a checkmark or an
indeterminate bar.

Decorative and non-interactive — it renders \`aria-hidden\` and owns no input,
role, or focus behavior. The focus ring lives on the owner's control wrapper
(see CheckboxInput), so a theme that replaces this component keeps a visible
focus indicator for free. Themes replace it wholesale through
\`defineTheme({indicators: {checkbox: MyCheckbox}})\`, or restyle it through
the \`checkbox\` theme target like any other component.

@example
\`\`\`
<CheckboxIndicator state="indeterminate" size="sm" />
\`\`\``,methods:[],displayName:`CheckboxIndicator`,props:{ref:{required:!1,tsType:{name:`Ref`,elements:[{name:`HTMLSpanElement`}],raw:`Ref<HTMLSpanElement>`},description:`Ref forwarded to the indicator's root element.`},isDisabled:{required:!1,tsType:{name:`boolean`},description:`Whether the owning control is disabled. Purely visual — the owner still
owns the actual disabled semantics.
@default false`,defaultValue:{value:`false`,computed:!1}},children:{required:!1,tsType:{name:`ReactNode`},description:`Content rendered inside the indicator chrome *instead of* the state mark.
CheckboxInput uses this to show a loading Spinner inside the box while a
change action is pending.`},size:{required:!1,tsType:{name:`IndicatorFamilySizeMap[F]`,raw:`IndicatorFamilySizeMap[F]`},description:`Control size. The scale is fixed by the family.
@default 'md'`,defaultValue:{value:`'md'`,computed:!1}}},composes:[`Omit`]}}));function S({state:e,size:t=`md`,isDisabled:n=!1,children:i,ref:s,className:c,style:l,xstyle:u,...d}){let f=e===`checked`;return o(i)?(0,C.jsx)(`span`,{...d,ref:s,"aria-hidden":`true`,...a(r(T.slot,n?T.disabled:T.enabled,u),c,l),children:i}):f?(0,C.jsx)(m,{...d,"aria-hidden":`true`,icon:`check`,size:w[t],color:n?`disabled`:`accent`,xstyle:u,className:c,style:l}):null}var C,w,T,E=e((()=>{i(),p(),s(),C=c(),w={sm:`sm`,md:`sm`},T={slot:{k1xSpc:`astryx3nfvp2`,kGNEyG:`astryx6s0dn4`,kjj79g:`astryxl56j7k`,kmuXW:`astryx2lah0s`,kzqmXN:`astryxcdlrvm`,kZKoxP:`astryx1l36t39`,$$css:!0},enabled:{kMwMTN:`astryxqwr325`,$$css:!0},disabled:{kMwMTN:`astryxqa6c3m`,$$css:!0}},S.displayName=`CheckIndicator`,S.__docgenInfo={description:`The default single-selection mark: a checkmark when chosen, nothing when not.

Decorative and non-interactive — it renders \`aria-hidden\` and owns no role,
state, or focus behavior; the option or row that hosts it keeps all of that.

@example
\`\`\`
<CheckIndicator state={isSelected ? 'checked' : 'unchecked'} size="sm" />
\`\`\`

Swap every single-selection mark for a radio:

@example
\`\`\`
import {RadioIndicator} from '@astryxdesign/core/Indicator';
defineTheme({name: 'brand', indicators: {check: RadioIndicator}});
\`\`\``,methods:[],displayName:`CheckIndicator`,props:{ref:{required:!1,tsType:{name:`Ref`,elements:[{name:`HTMLSpanElement`}],raw:`Ref<HTMLSpanElement>`},description:`Ref forwarded to the indicator's root element.`},isDisabled:{required:!1,tsType:{name:`boolean`},description:`Whether the owning control is disabled. Purely visual — the owner still
owns the actual disabled semantics.
@default false`,defaultValue:{value:`false`,computed:!1}},children:{required:!1,tsType:{name:`ReactNode`},description:`Content rendered inside the indicator chrome *instead of* the state mark.
CheckboxInput uses this to show a loading Spinner inside the box while a
change action is pending.`},size:{required:!1,tsType:{name:`IndicatorFamilySizeMap[F]`,raw:`IndicatorFamilySizeMap[F]`},description:`Control size. The scale is fixed by the family.
@default 'md'`,defaultValue:{value:`'md'`,computed:!1}}},composes:[`Omit`]}}));function D({state:e,size:n=`md`,isDisabled:i=!1,children:s,ref:c,className:l,style:u,xstyle:d,...f}){let p=e!==`unchecked`;return(0,O.jsx)(`span`,{...f,ref:c,"aria-hidden":`true`,...a(t(`radio-indicator`,{size:n,checked:p?`checked`:null,disabled:i?`disabled`:null},{legacyNames:[`radio`]}),r(k.circle,A[n],p?k.checked:k.unchecked,i&&k.disabled,i&&!p&&k.disabledUnchecked,d),l,u),children:o(s)?s:p&&(0,O.jsx)(`span`,{...a(t(`radio-indicator-dot`,{size:n},{legacyNames:[`radio-dot`]}),r(k.dot,j[n]))})})}var O,k,A,j,M=e((()=>{i(),s(),O=c(),k={circle:{kB7OPa:`astryx9f619`,k1xSpc:`astryx78zum5`,kGNEyG:`astryx6s0dn4`,kjj79g:`astryxl56j7k`,kmuXW:`astryx2lah0s`,kMzoRj:`astryx1litavf`,ksu8eU:`astryx1y0btm7`,kaIpWk:`astryxjspbzw`,k1ekBW:`astryxts7igz`,kIyJzY:`astryxuedmi6 astryx12w9bfk`,kAMwcw:`astryxlr8y92`,$$css:!0},unchecked:{kVAM5u:`astryxvy26l8 astryxvr0s6v`,kzOINU:null,kGJrpR:null,kaZRDh:null,kBCPoo:null,k26BEO:null,k5QoK5:null,kLZC3w:null,kL6WhQ:null,kWkggS:`astryx10xzikg astryx1orexks`,$$css:!0},checked:{kVAM5u:`astryxad5do astryx1nccqs`,kzOINU:null,kGJrpR:null,kaZRDh:null,kBCPoo:null,k26BEO:null,k5QoK5:null,kLZC3w:null,kL6WhQ:null,kWkggS:`astryx1ewilqj astryxe50u90`,$$css:!0},disabled:{kSiTet:`astryxbyyjgo`,kVAM5u:`astryx14i3s5s astryxzl8x75`,kzOINU:null,kGJrpR:null,kaZRDh:null,kBCPoo:null,k26BEO:null,k5QoK5:null,kLZC3w:null,kL6WhQ:null,$$css:!0},disabledUnchecked:{kWkggS:`astryxwmxj5m astryxejnnay`,$$css:!0},dot:{kaIpWk:`astryxjspbzw`,kWkggS:`astryx1azo05 astryxwvh9j7`,$$css:!0}},A={sm:{kzqmXN:`astryxw4jnvo`,kZKoxP:`astryx1qx5ct2`,$$css:!0},md:{kzqmXN:`astryxvy4d1p`,kZKoxP:`astryxxk0z11`,$$css:!0}},j={sm:{kzqmXN:`astryx1xc55vz`,kZKoxP:`astryxdk7pt`,$$css:!0},md:{kzqmXN:`astryx1fsd2vl`,kZKoxP:`astryx170jfvy`,$$css:!0}},D.displayName=`RadioIndicator`,D.__docgenInfo={description:`The default radio visual: a circle with a filled inner dot when selected.

Decorative and non-interactive — it renders \`aria-hidden\` and owns no input,
role, or focus behavior. Themes replace it wholesale through
\`defineTheme({indicators: {radio: MyRadio}})\`, or restyle it through the
\`radio\` / \`radio-dot\` theme targets like any other component.

Unlike an icon, a radio draws in *both* states — an empty circle when
unchecked. That is what makes it usable as a selection indicator in
components whose default is "a checkmark when selected, nothing otherwise".

@example
\`\`\`
<RadioIndicator state="checked" size="md" />
\`\`\``,methods:[],displayName:`RadioIndicator`,props:{ref:{required:!1,tsType:{name:`Ref`,elements:[{name:`HTMLSpanElement`}],raw:`Ref<HTMLSpanElement>`},description:`Ref forwarded to the indicator's root element.`},isDisabled:{required:!1,tsType:{name:`boolean`},description:`Whether the owning control is disabled. Purely visual — the owner still
owns the actual disabled semantics.
@default false`,defaultValue:{value:`false`,computed:!1}},children:{required:!1,tsType:{name:`ReactNode`},description:`Content rendered inside the indicator chrome *instead of* the state mark.
CheckboxInput uses this to show a loading Spinner inside the box while a
change action is pending.`},size:{required:!1,tsType:{name:`IndicatorFamilySizeMap[F]`,raw:`IndicatorFamilySizeMap[F]`},description:`Control size. The scale is fixed by the family.
@default 'md'`,defaultValue:{value:`'md'`,computed:!1}}},composes:[`Omit`]}}));function ee(){if(!(typeof CSS>`u`||typeof CSS.registerProperty!=`function`))for(let e of[L,R])try{CSS.registerProperty({name:e,syntax:`<length>`,inherits:!0,initialValue:`0px`})}catch{}}function te(){V=!1;let e=[];for(let t of B)e.push(...t.getAnimations());B.clear();for(let t of e)t.startTime=0}function ne(e){if(!(e==null||typeof e.getAnimations!=`function`))return B.add(e),V||(V=!0,requestAnimationFrame(te)),()=>{B.delete(e)}}function N({size:e=`md`,isDisabled:n=!1,children:i,ref:o,className:s,style:c,xstyle:l,...u}){let{border:d,diameter:f}=I[e],p=f+d*2,m=p/2,h=Math.PI*f,g=h*F;return(0,P.jsx)(`span`,{...u,ref:o,"aria-hidden":`true`,...a(t(`spinner-indicator`,{size:e},{legacyNames:[`spinner`]}),r(H.root,U[e],n&&H.disabled,l),s,{...c,width:`var(${z}, ${p}px)`,height:`var(${z}, ${p}px)`}),children:i??(0,P.jsxs)(`svg`,{ref:ne,width:p,height:p,viewBox:`0 0 ${p} ${p}`,"aria-hidden":`true`,className:`astryxlp1x4z astryx1lliihq astryx1so62im astryx1rea2x4 astryx14qxm4i astryxnh0sag astryxa4qsjk astryx48ohth astryx1esw782`,children:[(0,P.jsx)(`circle`,{cx:m,cy:m,r:f/2,strokeWidth:d,className:`astryxbh8q5q astryx1owpc8m astryxio8zfp astryxgw3ha0 astryx101pr9m astryx108cys5`}),(0,P.jsx)(`circle`,{cx:m,cy:m,r:f/2,strokeWidth:d,strokeDasharray:`${g} ${h-g}`,transform:`rotate(-90 ${m} ${m})`,className:`astryxbh8q5q astryx1owpc8m astryxio8zfp astryxgw3ha0 astryxdyqrd9 astryx1vy8frr`})]})})}var P,F,I,L,R,z,B,V,H,U,W=e((()=>{i(),s(),n(),P=c(),F=.375,I={sm:{diameter:10,border:2},md:{diameter:14,border:3},lg:{diameter:18,border:3},xl:{diameter:28,border:4}},L=`--_spinner-ring-diameter`,R=`--_spinner-ring-stroke`,z=`--_spinner-box-size`,ee(),B=new Set,V=!1,H={root:{k1xSpc:`astryxwz0xwf`,kgQiWS:`astryx1ku5rj1`,kVQacm:`astryxb3r6kr`,kXLuUW:`astryxxymvpz`,kmuXW:`astryx2lah0s`,kMwMTN:`astryxg34x71`,"--_spinner-box-size":`astryx69vvuq`,$$css:!0},disabled:{kSiTet:`astryxbyyjgo`,$$css:!0}},U={sm:{"--_spinner-ring-diameter":`astryxmr69yb`,"--_spinner-ring-stroke":`astryxm68j8h`,$$css:!0},md:{"--_spinner-ring-diameter":`astryx9h30zq`,"--_spinner-ring-stroke":`astryx1xryxjw`,$$css:!0},lg:{"--_spinner-ring-diameter":`astryx17ly1k6`,"--_spinner-ring-stroke":`astryx1xryxjw`,$$css:!0},xl:{"--_spinner-ring-diameter":`astryx1mogdv6`,"--_spinner-ring-stroke":`astryx10jxcgq`,$$css:!0}},N.displayName=`SpinnerIndicator`,N.__docgenInfo={description:`The default busy visual: a rotating arc over a faint track.

Decorative and non-interactive — \`aria-hidden\`, no role, no accessible name.
The control that renders it owns \`aria-busy\` and whatever it announces.

@example
\`\`\`
const Busy = useIndicator('spinner');
<Busy size="sm" />
\`\`\`

Replace the loading visual everywhere at once:

@example
\`\`\`
defineTheme({name: 'brand', indicators: {spinner: BouncingDots}});
\`\`\``,methods:[],displayName:`SpinnerIndicator`,props:{ref:{required:!1,tsType:{name:`Ref`,elements:[{name:`HTMLSpanElement`}],raw:`Ref<HTMLSpanElement>`},description:`Ref forwarded to the indicator's root element.`},isDisabled:{required:!1,tsType:{name:`boolean`},description:`Whether the owning control is disabled. Purely visual — the owner still
owns the actual disabled semantics.
@default false`,defaultValue:{value:`false`,computed:!1}},children:{required:!1,tsType:{name:`ReactNode`},description:`Content rendered inside the indicator chrome *instead of* the state mark.
CheckboxInput uses this to show a loading Spinner inside the box while a
change action is pending.`},size:{required:!1,tsType:{name:`IndicatorFamilySizeMap[F]`,raw:`IndicatorFamilySizeMap[F]`},description:`Control size. The scale is fixed by the family.
@default 'md'`,defaultValue:{value:`'md'`,computed:!1}}},composes:[`Omit`]}}));function re(e){return e==null?null:typeof e==`string`?l(e):e}function ie(e){return re(e)?.indicators??null}function ae(e,t){return ie(t)?.[e]??G[e]}var G,K=e((()=>{f(),x(),E(),M(),W(),G={check:S,checkbox:h,radio:D,spinner:N}}));function q(e){return ae(e,u())}var J=e((()=>{d(),K()}));function Y(e){return(0,X.jsx)(q(`spinner`),{...e})}var X,Z=e((()=>{J(),X=c(),Y.displayName=`BusyIndicator`,Y.__docgenInfo={description:``,methods:[],displayName:`BusyIndicator`,props:{ref:{required:!1,tsType:{name:`Ref`,elements:[{name:`HTMLSpanElement`}],raw:`Ref<HTMLSpanElement>`},description:`Ref forwarded to the indicator's root element.`},isDisabled:{required:!1,tsType:{name:`boolean`},description:`Whether the owning control is disabled. Purely visual — the owner still
owns the actual disabled semantics.
@default false`},children:{required:!1,tsType:{name:`ReactNode`},description:`Content rendered inside the indicator chrome *instead of* the state mark.
CheckboxInput uses this to show a loading Spinner inside the box while a
change action is pending.`},size:{required:!1,tsType:{name:`IndicatorFamilySizeMap[F]`,raw:`IndicatorFamilySizeMap[F]`},description:`Control size. The scale is fixed by the family.
@default 'md'`}},composes:[`Omit`]}})),Q,$=e((()=>{Q={astryx1odsvnm:`astryx1odsvnm`,$$css:!0}})),oe=e((()=>{Z(),x(),E(),M(),W(),K(),J(),$()}));export{Z as a,D as c,E as d,h as f,Y as i,M as l,Q as n,J as o,x as p,$ as r,q as s,oe as t,S as u};