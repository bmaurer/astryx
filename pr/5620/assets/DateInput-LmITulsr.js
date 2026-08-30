import{i as e,s as t}from"./preload-helper-CT_b8DTk.js";import{t as n}from"./react-B7Te67-h.js";import{D as ee,E as te,F as r,M as i,N as ne,P as a,n as re,p as o,s}from"./ime-Dy4QRKoo.js";import{F as ie,_t as ae,a as oe,c as se,et as ce,ft as le,j as ue,jt as de,kt as fe,lt as pe,o as me,ot as c,rt as he,t as ge,vt as _e,y as ve}from"./utils-CPeIlZn6.js";import{t as l}from"./jsx-runtime-DqZldVDK.js";import{n as ye}from"./useTooltip-Bulizout.js";import{n as be,t as xe}from"./useMergedRefs-Ci_GFTRu.js";import{n as Se,t as u}from"./Spinner-kJ_QUPGl.js";import{n as Ce,t as d}from"./VisuallyHidden-DDrJpIxj.js";import{n as we,r as Te}from"./SizeContext-fcGnTOs5.js";import{t as Ee}from"./Button-BDniLuhD.js";import{n as De,t as Oe}from"./interactionOverlay.stylex-C5f1Dywb.js";import{l as ke,s as Ae,t as je}from"./i18n-kKxerGb3.js";import{t as Me}from"./Button-Co2OC00k.js";import{a as f,o as Ne}from"./useTheme-FMiVXHDm.js";import{t as Pe}from"./Icon-CgG-b0IT.js";import{t as p}from"./Icon-eSRldnS4.js";import{a as Fe,i as m,t as h}from"./hooks-C3TzANEH.js";import{t as Ie}from"./Tooltip-DmPgQ55f.js";import{i as Le,t as Re}from"./BottomSheet-BeFOVWzk.js";import{n as g}from"./usePopover-3DQuRMBa.js";import{n as ze,t as _}from"./IconButton-C3fS5XQR.js";import{t as v}from"./Popover-1we_IoCe.js";import{a as Be,c as Ve,i as y,n as b,o as x,t as S}from"./Calendar-CI72qjed.js";import{t as He}from"./Field-B8Mz5Syc.js";import{c as Ue,l as We,n as Ge,o as Ke,s as qe,t as C}from"./Field-wIXdcZhj.js";import{n as Je,t as w}from"./useResolvedRequired-DwUGI7xP.js";import{a as T,i as Ye,n as Xe,r as Ze}from"./InputGroupContext-BonpDGzu.js";import{a as Qe,c as E,d as D,f as O,l as k,m as A,n as $e,o as j,p as M,s as N,t as P,u as F}from"./MonthYearWheels-CEsA2nZd.js";import{t as I}from"./InputGroup-CxZcX3vD.js";import{t as L}from"./SizeContext-i5ojWMEJ.js";function R({label:e,isLabelHidden:t=!1,description:n,isOptional:te=!1,isRequired:i=!1,isDisabled:a=!1,disabledMessage:re,value:o,onChange:s,isLoading:ae=!1,min:se,max:le,dateConstraints:ue,placeholder:de,size:me,status:c,statusVariant:he=`attached`,labelTooltip:ge,hasClear:l=!1,numberOfMonths:xe,weekStartsOn:u,format:d=`date_long`,width:we,xstyle:Ee,className:De,style:Oe,ref:je,...Me}){let f=ke(),p=Ae(),m=Je({isRequired:i,isOptional:te}),h=de??f(`@astryx.dateInput.placeholder`),Ie=Te(me,`md`),Le=Ne(`(pointer: coarse)`),Re=(0,z.useId)(),g=(0,z.useId)(),ze=(0,z.useId)(),_=(0,z.useId)(),v=(0,z.useRef)(null),Be=be(je,v),y=Ze(),b=a||ae,x=a&&!!re,S=ye({placement:`above`,focusTrigger:`always`,isEnabled:x}),{isDateDisabled:C}=Ve({min:se,max:le,dateConstraints:ue}),{statusIcon:w,describedBy:T}=Fe({status:c,statusVariant:he,isInGroup:!!y}),{ariaLabelledBy:Xe,ariaDescribedBy:Qe}=ve(g,[n?ze:null,he!==`tooltip`&&c?.message?_:null,T,x?S.describedBy:null],y),[E,D]=(0,z.useState)(null),[O,k]=(0,z.useState)(!1),[A,$e]=(0,z.useState)(!1),j=(0,z.useRef)(null),N=(0,z.useRef)(o);o!==N.current&&(N.current=o,j.current=null,E!==null&&D(null));let P=o&&tt.test(o)?o:``,F=E===null,I=(0,z.useCallback)(e=>typeof d==`function`?d(e):pe(_e(e),d,p),[d,p]),L=P?I(P):h,R=!!L&&!(O&&A),H=(0,z.useCallback)(e=>{if(b||j.current===e)return;if(j.current=e,!e){D(null),o!==void 0&&s?.(void 0);return}let t=ce(e,p);if(!t)return;if(C(t)){D(e);return}D(null);let n=fe(t);n!==o&&s?.(n)},[o,s,C,b,p]),U=(0,z.useCallback)(e=>{H(e.target.value)},[H]),W=(0,z.useRef)(H);(0,z.useEffect)(()=>{W.current=H}),(0,z.useEffect)(()=>{let e=v.current;if(!e)return;let t=()=>W.current(e.value);return e.addEventListener(`input`,t),e.addEventListener(`change`,t),()=>{e.removeEventListener(`input`,t),e.removeEventListener(`change`,t)}},[]);let G=(0,z.useRef)(null);G.current===null&&(G.current=P),(0,z.useEffect)(()=>{if(O)return;let e=v.current;e&&e.value!==P&&(e.value=P)},[O,P]);let nt=(0,z.useCallback)(()=>{$e(M(Le)),k(!0)},[Le]),K=(0,z.useCallback)(()=>{let e=v.current?.value;k(!1),D(null),e!==void 0&&e!==P&&H(e)},[H,P]),rt=(0,z.useCallback)(()=>{s?.(void 0)},[s]),q=(0,z.useCallback)(()=>{if(b)return;let e=v.current;if(e&&(e.focus(),typeof e.showPicker==`function`))try{e.showPicker()}catch{}},[b]),J=(0,B.jsxs)(`div`,{ref:e=>{S.ref(e)},...Me,...ie(ee(`date-input`,{size:Ie,status:c?.type??null,disabled:a?`disabled`:null}),r(We.base,V[Ie],et.wrapper,b&&We.disabled,c&&Ke[c.type],c&&!b&&Ue[c.type],c&&qe[c.type],y&&Ye.inGroup,Ee),De,Oe),children:[y&&(0,B.jsx)(Ce,{id:g,children:e}),(0,B.jsx)(`button`,{type:`button`,onClick:q,disabled:b,"aria-label":f(`@astryx.dateInput.openCalendar`),tabIndex:-1,...r(oe.focusVisible,et.iconButton,b&&et.iconButtonDisabled),children:(0,B.jsx)(Pe,{icon:`calendar`,size:`sm`,color:`secondary`,...ee(`date-input-toggle-icon`,{state:`collapsed`})})}),(0,B.jsxs)(`span`,{className:`astryx1n2onr6 astryx78zum5 astryx6s0dn4 astryx98rzlu astryxeuugli`,children:[(0,B.jsx)(`input`,{ref:Be,id:Re,type:`date`,defaultValue:G.current??``,onChange:U,onFocus:nt,onBlur:K,min:se,max:le,disabled:b&&!x,"aria-disabled":x?`true`:void 0,readOnly:x||void 0,"aria-labelledby":Xe,"aria-describedby":Qe,"aria-required":m?`true`:void 0,"aria-invalid":c?.type===`error`||!F?`true`:void 0,"aria-busy":ae||void 0,...{0:{className:`astryx1lliihq astryx98rzlu astryxeuugli astryxc342km astryxng3xce astryx1717udv astryx9ynric astryxjm74w1 astryx6pjikd astryxw6l6zx astryx1tgivj0 astryxjbqb8w astryx1a2a7pz astryx1oglpa6 astryx1lugfcp astryxjyslct astryxolhmmf astryx9rmy9g astryxpsyfx0 astryx1qqcexc astryx1x4c3m6 astryxkqr7wz astryx1f74mqm astryxec4aax astryxtbxizx astryxslb4at astryx15bqym3`},4:{className:`astryx1lliihq astryx98rzlu astryxeuugli astryxc342km astryxng3xce astryx1717udv astryx9ynric astryxjm74w1 astryx6pjikd astryxw6l6zx astryxjbqb8w astryx1a2a7pz astryx1oglpa6 astryx1lugfcp astryxjyslct astryxolhmmf astryx9rmy9g astryxpsyfx0 astryx1qqcexc astryx1x4c3m6 astryxkqr7wz astryx1f74mqm astryxec4aax astryxtbxizx astryxslb4at astryx15bqym3 astryx19co3pv astryxg7jpbn`},2:{className:`astryx1lliihq astryx98rzlu astryxeuugli astryxc342km astryxng3xce astryx1717udv astryx9ynric astryxjm74w1 astryx6pjikd astryxw6l6zx astryx1tgivj0 astryxjbqb8w astryx1a2a7pz astryx1oglpa6 astryx1lugfcp astryxjyslct astryxolhmmf astryx9rmy9g astryxpsyfx0 astryx1qqcexc astryx1x4c3m6 astryxkqr7wz astryx1f74mqm astryxec4aax astryxtbxizx astryxslb4at astryx15bqym3 astryxt0e3qv`},6:{className:`astryx1lliihq astryx98rzlu astryxeuugli astryxc342km astryxng3xce astryx1717udv astryx9ynric astryxjm74w1 astryx6pjikd astryxw6l6zx astryxjbqb8w astryx1a2a7pz astryx1oglpa6 astryx1lugfcp astryxjyslct astryxolhmmf astryx9rmy9g astryxpsyfx0 astryx1qqcexc astryx1x4c3m6 astryxkqr7wz astryx1f74mqm astryxec4aax astryxtbxizx astryxslb4at astryx15bqym3 astryx19co3pv astryxg7jpbn astryxt0e3qv`},1:{className:`astryx1lliihq astryx98rzlu astryxeuugli astryxc342km astryxng3xce astryx1717udv astryx9ynric astryxjm74w1 astryx6pjikd astryxw6l6zx astryxjbqb8w astryx1a2a7pz astryx1oglpa6 astryx1lugfcp astryxjyslct astryxolhmmf astryx9rmy9g astryxpsyfx0 astryx1qqcexc astryx1x4c3m6 astryxkqr7wz astryx1f74mqm astryxec4aax astryxtbxizx astryxslb4at astryx15bqym3 astryxv1l7n4`},5:{className:`astryx1lliihq astryx98rzlu astryxeuugli astryxc342km astryxng3xce astryx1717udv astryx9ynric astryxjm74w1 astryx6pjikd astryxw6l6zx astryxjbqb8w astryx1a2a7pz astryx1oglpa6 astryx1lugfcp astryxjyslct astryxolhmmf astryx9rmy9g astryxpsyfx0 astryx1qqcexc astryx1x4c3m6 astryxkqr7wz astryx1f74mqm astryxec4aax astryxtbxizx astryxslb4at astryx15bqym3 astryxg7jpbn astryxv1l7n4`},3:{className:`astryx1lliihq astryx98rzlu astryxeuugli astryxc342km astryxng3xce astryx1717udv astryx9ynric astryxjm74w1 astryx6pjikd astryxw6l6zx astryxjbqb8w astryx1a2a7pz astryx1oglpa6 astryx1lugfcp astryxjyslct astryxolhmmf astryx9rmy9g astryxpsyfx0 astryx1qqcexc astryx1x4c3m6 astryxkqr7wz astryx1f74mqm astryxec4aax astryxtbxizx astryxslb4at astryx15bqym3 astryxt0e3qv astryxv1l7n4`},7:{className:`astryx1lliihq astryx98rzlu astryxeuugli astryxc342km astryxng3xce astryx1717udv astryx9ynric astryxjm74w1 astryx6pjikd astryxw6l6zx astryxjbqb8w astryx1a2a7pz astryx1oglpa6 astryx1lugfcp astryxjyslct astryxolhmmf astryx9rmy9g astryxpsyfx0 astryx1qqcexc astryx1x4c3m6 astryxkqr7wz astryx1f74mqm astryxec4aax astryxtbxizx astryxslb4at astryx15bqym3 astryxg7jpbn astryxt0e3qv astryxv1l7n4`}}[!!R<<2|!!b<<1|!F<<0]}),R&&(0,B.jsx)(`span`,{"aria-hidden":`true`,...{0:{className:`astryx10l6tqk astryx1o0tod astryxtijo5x astryx10no89f astryx1lliihq astryxjm74w1 astryx6pjikd astryxw6l6zx astryx47corl astryxb3r6kr astryxuxw1ft astryxlyipyv astryxv1l7n4`},4:{className:`astryx10l6tqk astryx1o0tod astryxtijo5x astryx10no89f astryx1lliihq astryxjm74w1 astryx6pjikd astryxw6l6zx astryx47corl astryxb3r6kr astryxuxw1ft astryxlyipyv astryx1tgivj0`},2:{className:`astryx10l6tqk astryx1o0tod astryxtijo5x astryx10no89f astryx1lliihq astryxjm74w1 astryx6pjikd astryxw6l6zx astryx47corl astryxb3r6kr astryxuxw1ft astryxlyipyv astryxv1l7n4 astryxt0e3qv`},6:{className:`astryx10l6tqk astryx1o0tod astryxtijo5x astryx10no89f astryx1lliihq astryxjm74w1 astryx6pjikd astryxw6l6zx astryx47corl astryxb3r6kr astryxuxw1ft astryxlyipyv astryx1tgivj0 astryxt0e3qv`},1:{className:`astryx10l6tqk astryx1o0tod astryxtijo5x astryx10no89f astryx1lliihq astryxjm74w1 astryx6pjikd astryxw6l6zx astryx47corl astryxb3r6kr astryxuxw1ft astryxlyipyv astryxv1l7n4`},5:{className:`astryx10l6tqk astryx1o0tod astryxtijo5x astryx10no89f astryx1lliihq astryxjm74w1 astryx6pjikd astryxw6l6zx astryx47corl astryxb3r6kr astryxuxw1ft astryxlyipyv astryxv1l7n4`},3:{className:`astryx10l6tqk astryx1o0tod astryxtijo5x astryx10no89f astryx1lliihq astryxjm74w1 astryx6pjikd astryxw6l6zx astryx47corl astryxb3r6kr astryxuxw1ft astryxlyipyv astryxt0e3qv astryxv1l7n4`},7:{className:`astryx10l6tqk astryx1o0tod astryxtijo5x astryx10no89f astryx1lliihq astryxjm74w1 astryx6pjikd astryxw6l6zx astryx47corl astryxb3r6kr astryxuxw1ft astryxlyipyv astryxt0e3qv astryxv1l7n4`}}[!!P<<2|!!b<<1|!!(!F&&P)<<0],children:L})]}),(0,B.jsx)(Ce,{as:`div`,role:`alert`,"aria-live":`assertive`,children:F?``:f(`@astryx.dateInput.invalidDate`)}),l&&o!==void 0&&!b&&(0,B.jsx)(Ge,{label:f(`@astryx.dateInput.clear`,{label:e}),onClick:rt,iconClassName:ne(`date-input-clear-icon`)}),ae&&(0,B.jsx)(Se,{size:`sm`}),w,x&&S.renderTooltip(re)]});return y?J:(0,B.jsx)(He,{label:e,isLabelHidden:t,description:n,inputID:Re,descriptionID:n?ze:void 0,isOptional:te,isRequired:i,isDisabled:a,status:c?{type:c.type,message:c.message,messageID:c.message?_:void 0}:void 0,statusVariant:he,labelTooltip:ge,width:we,children:J})}var z,B,et,V,tt,H=e((()=>{z=t(n(),1),a(),S(),A(),C(),h(),f(),w(),p(),je(),I(),T(),i(),L(),u(),Ie(),d(),ge(),B=l(),et={wrapper:{kOIVth:`astryx167g77z`,khm7nJ:null,k1C7PZ:null,$$css:!0},iconButton:{k1xSpc:`astryx78zum5`,kGNEyG:`astryx6s0dn4`,kjj79g:`astryxl56j7k`,kmVPX3:`astryx1717udv`,kg3NbH:null,kuDDbn:null,kE3dHu:null,kP0aTx:null,kpe85a:null,k8WAf4:null,kLKAdn:null,kGO01o:null,kogj98:`astryx1ghz6dp`,kUOVxO:null,keTefX:null,koQZXg:null,k71WvV:null,km5ZXQ:null,kqGvvJ:null,keoZOQ:null,k1K539:null,kMzoRj:`astryxc342km`,kjGldf:null,k2ei4v:null,kZ1KPB:null,ke9TFa:null,kWqL5O:null,kLoX6v:null,kEafiO:null,kt9PQ7:null,ksu8eU:`astryxng3xce`,kJRH4f:null,kVhnKS:null,k4WBpm:null,k8ry5P:null,kSWEuD:null,kDUl1X:null,kPef9Z:null,kfdmCh:null,kWkggS:`astryxjbqb8w`,kkrTdU:`astryx1ypdohk astryx16khyan`,kaIpWk:`astryxh6dtrn`,krdFHd:null,kfmiAY:null,kVL7Gh:null,kT0f0o:null,kIxVMA:null,ksF3WI:null,kqGeR4:null,kYm2EN:null,$$css:!0},iconButtonDisabled:{kkrTdU:`astryxt0e3qv`,$$css:!0}},V={sm:{kZKoxP:`astryx6k0iem`,k7Eaqz:`astryxfb3i0g`,$$css:!0},md:{kZKoxP:`astryx1ueg155`,k7Eaqz:`astryxfb3i0g`,$$css:!0},lg:{kZKoxP:`astryxssyfek`,k7Eaqz:`astryxfb3i0g`,$$css:!0}},tt=/^\d{4}-\d{2}-\d{2}$/,R.displayName=`NativeDateField`,R.__docgenInfo={description:"The OS-picker surface. Takes `DateInput`'s props verbatim; see\n{@link DateInput} for when it is chosen over the other two.",methods:[],displayName:`NativeDateField`,props:{ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLInputElement>`,elements:[{name:`HTMLInputElement`}]},description:`Ref forwarded to the root element`},label:{required:!0,tsType:{name:`string`},description:`Label text for the input (required for accessibility).`},isLabelHidden:{required:!1,tsType:{name:`boolean`},description:`Whether to visually hide the label (still accessible to screen readers).
@default false`,defaultValue:{value:`false`,computed:!1}},description:{required:!1,tsType:{name:`string`},description:`Description text displayed between the label and input.`},isOptional:{required:!1,tsType:{name:`boolean`},description:`Whether the field is optional. Mutually exclusive with isRequired.
@default false`,defaultValue:{value:`false`,computed:!1}},isRequired:{required:!1,tsType:{name:`boolean`},description:`Whether the field is required. Mutually exclusive with isOptional.
@default false`,defaultValue:{value:`false`,computed:!1}},isDisabled:{required:!1,tsType:{name:`boolean`},description:`Whether the input is disabled.
@default false`,defaultValue:{value:`false`,computed:!1}},disabledMessage:{required:!1,tsType:{name:`string`},description:`Explains why the input is disabled. When set together with
\`isDisabled\`, the input shows a tooltip with this text on hover and
keyboard focus, and the field stays focusable (via \`aria-disabled\`)
so the reason is discoverable by keyboard and assistive technology.
Typing and calendar activation stay blocked.

Use this instead of wrapping a disabled input in \`Tooltip\` — disabled
controls don't emit the pointer events an external tooltip needs.

@example
\`\`\`
<DateInput
  label="Event date"
  value={date}
  onChange={setDate}
  isDisabled
  disabledMessage="You need the Editor role to change this"
/>
\`\`\``},value:{required:!1,tsType:{name:`literal`,value:"`${number}${number}${number}${number}-${number}${number}-${number}${number}`"},description:`The selected date in ISO format (YYYY-MM-DD).`},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(value: ISODateString | undefined) => void`,signature:{arguments:[{type:{name:`union`,raw:`ISODateString | undefined`,elements:[{name:`literal`,value:"`${number}${number}${number}${number}-${number}${number}-${number}${number}`"},{name:`undefined`}]},name:`value`}],return:{name:`void`}}},description:`Callback fired when the date changes.
Called with undefined when input is cleared.`},changeAction:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(value: ISODateString | undefined) => void | Promise<void>`,signature:{arguments:[{type:{name:`union`,raw:`ISODateString | undefined`,elements:[{name:`literal`,value:"`${number}${number}${number}${number}-${number}${number}-${number}${number}`"},{name:`undefined`}]},name:`value`}],return:{name:`union`,raw:`void | Promise<void>`,elements:[{name:`void`},{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`}]}}},description:`Async action on change. Fires after onChange.`},isLoading:{required:!1,tsType:{name:`boolean`},description:`Whether the input is in a loading state.
@default false`,defaultValue:{value:`false`,computed:!1}},min:{required:!1,tsType:{name:`literal`,value:"`${number}${number}${number}${number}-${number}${number}-${number}${number}`"},description:`Minimum selectable date in ISO format.`},max:{required:!1,tsType:{name:`literal`,value:"`${number}${number}${number}${number}-${number}${number}-${number}${number}`"},description:`Maximum selectable date in ISO format.`},dateConstraints:{required:!1,tsType:{name:`ReadonlyArray`,elements:[{name:`signature`,type:`function`,raw:`(date: Date) => boolean`,signature:{arguments:[{type:{name:`Date`},name:`date`}],return:{name:`boolean`}}}],raw:`ReadonlyArray<(date: Date) => boolean>`},description:`Custom date constraint functions. Date is disabled if ANY function returns false.`},placeholder:{required:!1,tsType:{name:`string`},description:`Placeholder text shown when no date is selected.
@default "Select a date"`},size:{required:!1,tsType:{name:`unknown`},description:`The size of the input.
- 'sm': Compact size (18px height)
- 'md': Default size (26px height)
@default 'md'`},status:{required:!1,tsType:{name:`InputStatus`},description:`Status indicator for the input.
When set, displays a colored border and status icon.
If message is provided, displays below the input.`},statusVariant:{required:!1,tsType:{name:`FieldStatusVariantMap`},description:`How the status message is placed relative to the input.
- 'attached': message overlaps directly below the input (bordered treatment)
- 'detached': message floats below as a separate element with spacing
- 'tooltip': no message box; the status icon becomes a focusable info-tip button that reveals the message on hover, keyboard focus, or tap
@default 'attached'`,defaultValue:{value:`'attached'`,computed:!1}},width:{required:!1,tsType:{name:`union`,raw:`number | string`,elements:[{name:`number`},{name:`string`}]},description:"Width of the field. Numbers are treated as pixels, strings are used as-is\n(e.g. `'100%'`). Sizes the whole field (label, control, and status) so they\nstay aligned, unlike setting width via `xstyle`/`className`/`style`."},labelTooltip:{required:!1,tsType:{name:`string`},description:`Tooltip text to display in an info icon at the end of the label.`},hasClear:{required:!1,tsType:{name:`boolean`},description:`Whether to show a clear button when a date is set.
When clicked, resets the value to undefined and returns focus to the input.
@default false`,defaultValue:{value:`false`,computed:!1}},numberOfMonths:{required:!1,tsType:{name:`union`,raw:`1 | 2`,elements:[{name:`literal`,value:`1`},{name:`literal`,value:`2`}]},description:`Number of months to display in the calendar popover.
@default 1`},weekStartsOn:{required:!1,tsType:{name:`union`,raw:`DayOfWeek | DayOfWeekName`,elements:[{name:`union`,raw:`0 | 1 | 2 | 3 | 4 | 5 | 6`,elements:[{name:`literal`,value:`0`},{name:`literal`,value:`1`},{name:`literal`,value:`2`},{name:`literal`,value:`3`},{name:`literal`,value:`4`},{name:`literal`,value:`5`},{name:`literal`,value:`6`}]},{name:`union`,raw:`| 'sun'
| 'mon'
| 'tue'
| 'wed'
| 'thu'
| 'fri'
| 'sat'`,elements:[{name:`literal`,value:`'sun'`},{name:`literal`,value:`'mon'`},{name:`literal`,value:`'tue'`},{name:`literal`,value:`'wed'`},{name:`literal`,value:`'thu'`},{name:`literal`,value:`'fri'`},{name:`literal`,value:`'sat'`}]}]},description:`First day of week in the calendar popover. Accepts a number
(0 = Sunday … 6 = Saturday) or a three-letter day name ('sun'–'sat',
case-insensitive).
@default 0`},format:{required:!1,tsType:{name:`union`,raw:`DateInputFormat | ((value: ISODateString) => string)`,elements:[{name:`Extract`,elements:[{name:`union`,raw:`| 'relative'
| 'relative_short'
| 'auto'
| 'date'
| 'date_long'
| 'date_weekday'
| 'date_time'
| 'time'
| 'system_date'
| 'system_date_time'
| 'system_time'
| 'unix_seconds'`,elements:[{name:`literal`,value:`'relative'`},{name:`literal`,value:`'relative_short'`},{name:`literal`,value:`'auto'`},{name:`literal`,value:`'date'`},{name:`literal`,value:`'date_long'`},{name:`literal`,value:`'date_weekday'`},{name:`literal`,value:`'date_time'`},{name:`literal`,value:`'time'`},{name:`literal`,value:`'system_date'`},{name:`literal`,value:`'system_date_time'`},{name:`literal`,value:`'system_time'`},{name:`literal`,value:`'unix_seconds'`}]},{name:`union`,raw:`'date' | 'date_long' | 'date_weekday' | 'system_date'`,elements:[{name:`literal`,value:`'date'`},{name:`literal`,value:`'date_long'`},{name:`literal`,value:`'date_weekday'`},{name:`literal`,value:`'system_date'`}]}],raw:`Extract<
  TimestampFormat,
  'date' | 'date_long' | 'date_weekday' | 'system_date'
>`},{name:`unknown`}]},description:`How the committed date value is displayed in the text field. Accepts a
named format reused from \`Timestamp\`'s \`format\` vocabulary (so the same
literal renders the same date shape in both components) or a function that
maps the ISO value to a custom display string.

- \`'date_long'\` (default): long-month date, e.g. "March 21, 2026"
- \`'date'\`: short-month date, e.g. "Mar 21, 2026"
- \`'date_weekday'\`: short weekday + date, e.g. "Wed, Mar 21, 2026"
- \`'system_date'\`: ISO 8601 calendar date, e.g. "2026-03-21"
- \`(value: ISODateString) => string\`: fully custom display string

Formatting applies only to the committed value — never to text the user is
actively typing. A custom function's output that \`parseDateInput\` cannot
read back can't be re-committed after an edit; external \`value\` changes
always recompute the display from the ISO value.

@default 'date_long'
@example
\`\`\`
<DateInput label="Ship date" value={date} onChange={setDate} format="date" />
<DateInput
  label="Ship date"
  value={date}
  onChange={setDate}
  format={iso => new Date(iso + 'T00:00').toDateString()}
/>
\`\`\``,defaultValue:{value:`'date_long'`,computed:!1}},nativePicker:{required:!1,tsType:{name:`union`,raw:`'touch' | 'always' | 'never'`,elements:[{name:`literal`,value:`'touch'`},{name:`literal`,value:`'always'`},{name:`literal`,value:`'never'`}]},description:`When date picking is handed to the browser/OS instead of Astryx's own
surfaces: the field becomes an \`<input type="date">\` and the platform
draws the picker — the iOS wheel, the Android calendar dialog — with the
OS's own hit areas, momentum scrolling, locale and accessibility
settings.

- \`'touch'\` (default): native on touch devices (coarse pointer), the text
  field and calendar popover on mouse-driven ones
- \`'always'\`: native wherever the browser supports \`<input type="date">\`
- \`'never'\`: Astryx's own pickers everywhere — the touch picker on a
  finger, the calendar popover on a mouse

\`format\` and \`placeholder\` still apply in native mode: DateInput paints
the closed field's text itself, over the control. \`numberOfMonths\` and
\`weekStartsOn\` do not — they describe a calendar grid the native picker
does not have — so a field that needs either should pass \`'never'\`.

\`min\` and \`max\` are forwarded, but note that a native picker may not
*show* them: on iOS they are constraint-validation flags rather than
clamps, so an out-of-range date can be selected and is refused on commit
(announced to assistive technology) rather than being greyed out in the
picker. \`dateConstraints\` is enforced the same way, on commit, and is
reason enough to prefer \`'never'\` on a field that uses it.

@default 'touch'
@example
\`\`\`
// Astryx's own touch picker instead of the platform's
<DateInput label="Event date" value={date} onChange={setDate} nativePicker="never" />
\`\`\``}},composes:[`Omit`]}}));function U({label:e,isLabelHidden:t=!1,description:n,isOptional:te=!1,isRequired:i=!1,isDisabled:a=!1,disabledMessage:o,value:s,onChange:ce,changeAction:le,isLoading:ue=!1,min:fe,max:me,dateConstraints:ge,placeholder:l,size:xe,status:u,statusVariant:d=`attached`,labelTooltip:we,hasClear:Oe=!1,numberOfMonths:je,weekStartsOn:Me=0,format:f=`date_long`,width:Ne,xstyle:p,className:m,style:h,ref:Ie,...Re}){let g=ke(),_=Ae(),v=Je({isRequired:i,isOptional:te}),y=l??g(`@astryx.dateInput.placeholder`),b=Te(xe,`md`),x=Be(Me),S=(0,W.useId)(),C=(0,W.useId)(),w=(0,W.useId)(),T=(0,W.useId)(),Xe=(0,W.useRef)(null),D=be(Ie,Xe),O=Ze(),[,k]=(0,W.useTransition)(),[A,$e]=(0,W.useOptimistic)(s),j=ue||A!==s,M=a||j,I=a&&!!o,L=ye({placement:`above`,focusTrigger:`always`,isEnabled:I}),{isDateDisabled:R}=Ve({min:fe,max:me,dateConstraints:ge}),{statusIcon:z,describedBy:B}=Fe({status:u,statusVariant:d,isInGroup:!!O}),{ariaLabelledBy:et,ariaDescribedBy:V}=ve(C,[n?w:null,d!==`tooltip`&&u?.message?T:null,B,I?L.describedBy:null],O),[tt,H]=(0,W.useState)(!1),[U,rt]=(0,W.useState)(!1),q=(0,W.useRef)(null),J=(0,W.useRef)(null);(0,W.useEffect)(()=>()=>{J.current!=null&&clearTimeout(J.current)},[]);let Y=(0,W.useMemo)(()=>de(),[]),X=(0,W.useMemo)(()=>A!=null&&/^\d{4}-\d{2}-\d{2}$/.test(A)?_e(A):null,[A]),[it]=(0,W.useState)(()=>F(s!=null&&/^\d{4}-\d{2}-\d{2}$/.test(s)?_e(s):de())),Z=fe==null?it-600:F(_e(fe)),Q=me==null?it+600:F(_e(me)),[$,at]=(0,W.useState)(()=>N(it,Z,Q)),{year:ot,month:st}=E($),ct=(0,W.useMemo)(()=>Array.from({length:7},(e,t)=>ae({year:1970,month:1,day:4+(x+t)%7},c,_)),[_,x]),lt=ae({year:ot,month:st,day:1},he,_),ut=A!=null&&/^\d{4}-\d{2}-\d{2}$/.test(A)?typeof f==`function`?f(A):pe(_e(A),f,_):``,dt=(0,W.useCallback)(e=>{j||(ce?.(e),le&&k(async()=>{$e(e),await le(e)}))},[j,ce,le,k,$e]),ft=(0,W.useCallback)(()=>{M||(rt(!1),H(!0))},[M]),pt=(0,W.useCallback)(()=>{dt(void 0);let e=Xe.current;e!=null&&(J.current=window.setTimeout(()=>{J.current=null,e.focus({preventScroll:!0})},0))},[dt]),mt=(0,W.useCallback)(()=>{dt(void 0);let e=F(Y);e<Z||e>Q||e!==$&&(at(e),q.current?.scrollToMonth(e,`smooth`))},[dt,Y,$,Z,Q]),ht=(0,W.useCallback)(e=>{dt(e)},[dt]),gt=$>Z,_t=$<Q,vt=(0,W.useCallback)(e=>{let t=N($+e,Z,Q);t!==$&&(at(t),q.current?.scrollToMonth(t,`smooth`))},[$,Z,Q]),yt=(0,W.useCallback)(e=>{at(e),q.current?.scrollToMonth(e,`auto`)},[]),bt=(0,W.useCallback)(e=>{U||at(e)},[U]),xt=(0,W.useRef)($);xt.current=$,(0,W.useEffect)(()=>{U||q.current?.scrollToMonth(xt.current,`auto`)},[U]);let St=(0,W.useCallback)(e=>{re(e.nativeEvent)||(e.key===`ArrowDown`||e.key===`Enter`||e.key===` `||e.key===`Spacebar`)&&(e.preventDefault(),ft())},[ft]),Ct=(0,G.jsxs)(`div`,{className:`astryx78zum5 astryxdt5ytf astryxh8yej3`,children:[(0,G.jsxs)(`div`,{className:`astryx78zum5 astryx6s0dn4 astryx1qughib astryx1txdalj astryxssyfek`,children:[(0,G.jsxs)(`button`,{type:`button`,onClick:()=>rt(e=>!e),"aria-expanded":U,"aria-label":g(`@astryx.dateInput.chooseMonthYear`,{monthYear:lt}),"data-title":`month-year`,...r(K.title,De.backgroundColor,oe.focusVisible),children:[(0,G.jsx)(`span`,{className:`astryxeuugli astryxb3r6kr astryxlyipyv`,children:lt}),(0,G.jsx)(Pe,{icon:`chevronDown`,size:`sm`,color:`secondary`,xstyle:[K.titleChevron,U&&K.titleChevronOpen]})]}),(0,G.jsxs)(`span`,{"data-arrows":`months`,inert:U?!0:void 0,...{0:{className:`astryx78zum5 astryx6s0dn4 astryx1lsbc85 astryxvc5jky astryx1jl3cmp astryxuedmi6 astryxcj1dhv astryxzg1mie`},1:{className:`astryx78zum5 astryx6s0dn4 astryx1lsbc85 astryxvc5jky astryx1jl3cmp astryxuedmi6 astryxcj1dhv astryxzg1mie astryxlshs6z astryxg01cxk astryx47corl`}}[!!U<<0],children:[(0,G.jsx)(ze,{variant:`ghost`,size:`sm`,xstyle:[K.monthArrow,!gt&&K.monthArrowUnavailable],isDisabled:!gt,onClick:()=>vt(-1),label:g(`@astryx.calendar.previousMonth`),icon:(0,G.jsx)(`span`,{...r(K.monthArrowIcon,se.mirror),children:(0,G.jsx)(Pe,{icon:`chevronLeft`,size:`sm`,color:`inherit`})})}),(0,G.jsx)(ze,{variant:`ghost`,size:`sm`,xstyle:[K.monthArrow,!_t&&K.monthArrowUnavailable],isDisabled:!_t,onClick:()=>vt(1),label:g(`@astryx.calendar.nextMonth`),icon:(0,G.jsx)(`span`,{...r(K.monthArrowIcon,se.mirror),children:(0,G.jsx)(Pe,{icon:`chevronRight`,size:`sm`,color:`inherit`})})})]}),(0,G.jsx)(`span`,{"data-action":`reset`,inert:U?!0:void 0,...{0:{className:`astryx78zum5 astryx6s0dn4 astryx1jl3cmp astryxuedmi6 astryxcj1dhv astryxzg1mie`},1:{className:`astryx78zum5 astryx6s0dn4 astryx1jl3cmp astryxuedmi6 astryxcj1dhv astryxzg1mie astryxlshs6z astryxg01cxk astryx47corl`}}[!!U<<0],children:(0,G.jsx)(Ee,{variant:`ghost`,size:`sm`,xstyle:K.resetButton,label:g(`@astryx.dateInput.resetPicking`),onClick:mt})})]}),(0,G.jsx)(`div`,{"aria-hidden":`true`,...{0:{className:`astryxrvj5dj astryx1mzazjb astryx6k0iem astryx6s0dn4 astryx1jl3cmp astryxuedmi6 astryxcj1dhv astryxzg1mie`},1:{className:`astryxrvj5dj astryx1mzazjb astryx6k0iem astryx6s0dn4 astryx1jl3cmp astryxuedmi6 astryxcj1dhv astryxzg1mie astryxlshs6z astryxg01cxk`}}[!!U<<0],children:ct.map(e=>(0,G.jsx)(`div`,{className:`astryx2b8uid astryx141an7d astryx1sodnla astryxv1l7n4`,children:e},e))}),(0,G.jsxs)(`div`,{className:`astryxrvj5dj astryx9hmfof astryx1n2onr6`,children:[(0,G.jsx)(`div`,{"data-panel":`calendar`,inert:U?!0:void 0,...{0:{className:`astryx15r89dc astryxeuugli astryx74b7sa astryxuedmi6 astryxzg1mie`},1:{className:`astryx15r89dc astryxeuugli astryx74b7sa astryxuedmi6 astryxzg1mie astryxlshs6z astryx47corl`}}[!!U<<0],children:(0,G.jsx)(Qe,{handleRef:q,minMonthIndex:Z,maxMonthIndex:Q,initialMonthIndex:$,onVisibleMonthChange:bt,selectedDate:X,today:Y,isDateDisabled:R,weekStartsOn:x,onSelect:ht},`${Z}:${Q}`)}),(0,G.jsx)(`div`,{"data-panel":`wheels`,inert:U?void 0:!0,...{0:{className:`astryx15r89dc astryxeuugli astryx10xzikg astryxc8icb0 astryx1jl3cmp astryxuedmi6 astryxcj1dhv astryxzg1mie`},1:{className:`astryx15r89dc astryxeuugli astryx10xzikg astryxc8icb0 astryx1jl3cmp astryxuedmi6 astryxcj1dhv astryxzg1mie astryxlshs6z astryxg01cxk astryx47corl`}}[!U<<0],children:(0,G.jsx)(P,{monthIndex:$,minMonthIndex:Z,maxMonthIndex:Q,onChange:yt,monthLabel:g(`@astryx.dateInput.monthWheel`),yearLabel:g(`@astryx.dateInput.yearWheel`),isActive:U})})]}),(0,G.jsxs)(`div`,{className:`astryx1xye8es astryxrvj5dj astryx1y6fwsi`,children:[(0,G.jsx)(`div`,{inert:U?!0:void 0,...{0:{className:`astryx15r89dc astryx78zum5 astryx74b7sa astryxuedmi6 astryxzg1mie`},1:{className:`astryx15r89dc astryx78zum5 astryx74b7sa astryxuedmi6 astryxzg1mie astryxlshs6z astryx47corl`}}[!!U<<0],children:(0,G.jsx)(Ee,{variant:`primary`,size:`md`,width:`100%`,label:g(`@astryx.dateInput.savePicking`),onClick:()=>H(!1)})}),(0,G.jsx)(`div`,{inert:U?void 0:!0,...{0:{className:`astryx15r89dc astryx78zum5 astryx10xzikg astryxc8icb0 astryx1jl3cmp astryxuedmi6 astryxcj1dhv astryxzg1mie`},1:{className:`astryx15r89dc astryx78zum5 astryx10xzikg astryxc8icb0 astryx1jl3cmp astryxuedmi6 astryxcj1dhv astryxzg1mie astryxlshs6z astryxg01cxk astryx47corl`}}[!U<<0],children:(0,G.jsx)(Ee,{variant:`secondary`,size:`md`,width:`100%`,label:g(`@astryx.dateInput.doneChoosingMonth`),onClick:()=>rt(!1)})})]})]}),wt=(0,G.jsxs)(`div`,{ref:e=>{L.ref(e)},...Re,...ie(ee(`date-input`,{size:b,status:u?.type??null,disabled:a?`disabled`:null}),r(We.base,nt[b],K.wrapper,M&&We.disabled,u&&Ke[u.type],u&&!M&&Ue[u.type],u&&qe[u.type],O&&Ye.inGroup,p),m,h),children:[O&&(0,G.jsx)(Ce,{id:C,children:e}),(0,G.jsx)(`button`,{type:`button`,onClick:ft,disabled:M,"aria-label":g(`@astryx.dateInput.openCalendar`),tabIndex:-1,...r(oe.focusVisible,K.iconButton,M&&K.iconButtonDisabled),children:(0,G.jsx)(Pe,{icon:`calendar`,size:`sm`,color:`secondary`,...ee(`date-input-toggle-icon`,{state:tt?`expanded`:`collapsed`})})}),(0,G.jsx)(`input`,{ref:D,id:S,type:`text`,role:`combobox`,value:ut,readOnly:!0,inputMode:`none`,onChange:()=>{},onClick:ft,onKeyDown:St,placeholder:y,disabled:M&&!I,"aria-disabled":I?`true`:void 0,"aria-labelledby":et,"aria-describedby":V,"aria-required":v?`true`:void 0,"aria-invalid":u?.type===`error`?`true`:void 0,"aria-busy":j||void 0,"aria-expanded":tt,"aria-haspopup":`dialog`,"aria-autocomplete":`none`,autoComplete:`off`,...{0:{className:`astryx1lliihq astryx98rzlu astryxeuugli astryxc342km astryxng3xce astryx1717udv astryx9ynric astryxjm74w1 astryx6pjikd astryxw6l6zx astryx1tgivj0 astryxjbqb8w astryx1a2a7pz astryxbuiw85 astryx1ypdohk astryx16khyan astryx87ps6o astryxeyghm5`},1:{className:`astryx1lliihq astryx98rzlu astryxeuugli astryxc342km astryxng3xce astryx1717udv astryx9ynric astryxjm74w1 astryx6pjikd astryxw6l6zx astryx1tgivj0 astryxjbqb8w astryx1a2a7pz astryxbuiw85 astryx87ps6o astryxeyghm5 astryxt0e3qv`}}[!!M<<0]}),Oe&&s!==void 0&&!M&&(0,G.jsx)(Ge,{label:g(`@astryx.dateInput.clear`,{label:e}),onClick:pt,iconClassName:ne(`date-input-clear-icon`)}),j&&(0,G.jsx)(Se,{size:`sm`}),z,(0,G.jsx)(Le,{isOpen:tt,onOpenChange:H,label:g(`@astryx.dateInput.dialogLabel`),height:`hug`,children:(0,G.jsx)(`div`,{className:`astryx1pzlopt astryx1adxfkp astryx1awphl8`,children:Ct})}),I&&L.renderTooltip(o)]});return O?wt:(0,G.jsx)(He,{label:e,isLabelHidden:t,description:n,inputID:S,descriptionID:n?w:void 0,isOptional:te,isRequired:i,isDisabled:a,status:u?{type:u.type,message:u.message,messageID:u.message?T:void 0}:void 0,statusVariant:d,labelTooltip:we,width:Ne,children:wt})}var W,G,nt,K,rt=e((()=>{W=t(n(),1),a(),Re(),Me(),S(),C(),h(),w(),p(),_(),je(),I(),T(),i(),L(),u(),o(),Ie(),d(),ge(),Oe(),y(),j(),$e(),k(),O(),G=l(),D.daySize,s[`--duration-fast`],nt={sm:{kZKoxP:`astryx6k0iem`,k7Eaqz:`astryxfb3i0g`,$$css:!0},md:{kZKoxP:`astryx1ueg155`,k7Eaqz:`astryxfb3i0g`,$$css:!0},lg:{kZKoxP:`astryxssyfek`,k7Eaqz:`astryxfb3i0g`,$$css:!0}},K={wrapper:{kOIVth:`astryx1txdalj`,khm7nJ:null,k1C7PZ:null,$$css:!0},iconButton:{k1xSpc:`astryx78zum5`,kGNEyG:`astryx6s0dn4`,kjj79g:`astryxl56j7k`,kmVPX3:`astryx1717udv`,kg3NbH:null,kuDDbn:null,kE3dHu:null,kP0aTx:null,kpe85a:null,k8WAf4:null,kLKAdn:null,kGO01o:null,kogj98:`astryx1ghz6dp`,kUOVxO:null,keTefX:null,koQZXg:null,k71WvV:null,km5ZXQ:null,kqGvvJ:null,keoZOQ:null,k1K539:null,kMzoRj:`astryxc342km`,kjGldf:null,k2ei4v:null,kZ1KPB:null,ke9TFa:null,kWqL5O:null,kLoX6v:null,kEafiO:null,kt9PQ7:null,ksu8eU:`astryxng3xce`,kJRH4f:null,kVhnKS:null,k4WBpm:null,k8ry5P:null,kSWEuD:null,kDUl1X:null,kPef9Z:null,kfdmCh:null,kWkggS:`astryxjbqb8w`,kkrTdU:`astryx1ypdohk astryx16khyan`,kaIpWk:`astryxh6dtrn`,krdFHd:null,kfmiAY:null,kVL7Gh:null,kT0f0o:null,kIxVMA:null,ksF3WI:null,kqGeR4:null,kYm2EN:null,$$css:!0},iconButtonDisabled:{kkrTdU:`astryxt0e3qv`,$$css:!0},monthArrowUnavailable:{k33iCy:`astryxlshs6z`,$$css:!0},monthArrow:{kAzted:`astryx3z0ggl`,k7Eaqz:`astryx1om6rbs`,$$css:!0},monthArrowIcon:{k1xSpc:`astryx3nfvp2`,$$css:!0},resetButton:{kAzted:`astryx3z0ggl`,$$css:!0},title:{k1xSpc:`astryx78zum5`,kGNEyG:`astryx6s0dn4`,kOIVth:`astryxzye2dw`,kZKoxP:`astryx5yr21d`,kg3NbH:`astryxf314gf`,keTefX:`astryx1s1akpx`,kMzoRj:`astryxc342km`,ksu8eU:`astryxng3xce`,kaIpWk:`astryxh6dtrn`,kWkggS:`astryxjbqb8w`,kMwMTN:`astryx1tgivj0`,kGuDYH:`astryx18juvz8`,k63SB2:`astryx2mo6ok`,kkrTdU:`astryx1ypdohk astryx16khyan`,khDVqt:`astryxuxw1ft`,k7Eaqz:`astryxeuugli`,kVQacm:`astryxb3r6kr`,$$css:!0},titleChevron:{k1xSpc:`astryx3nfvp2`,kmuXW:`astryx2lah0s`,k1ekBW:`astryx11xpdln`,kIyJzY:`astryxuedmi6`,kAMwcw:`astryxlr8y92`,k6CgDc:`astryxzg1mie`,$$css:!0},titleChevronOpen:{k3aq6I:`astryx19jd1h0`,$$css:!0}},U.displayName=`TouchDateField`,U.__docgenInfo={description:"The touch surface. Takes `DateInput`'s props verbatim; see\n{@link DateInput} for when it is chosen over the desktop control.",methods:[],displayName:`TouchDateField`,props:{ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLInputElement>`,elements:[{name:`HTMLInputElement`}]},description:`Ref forwarded to the root element`},label:{required:!0,tsType:{name:`string`},description:`Label text for the input (required for accessibility).`},isLabelHidden:{required:!1,tsType:{name:`boolean`},description:`Whether to visually hide the label (still accessible to screen readers).
@default false`,defaultValue:{value:`false`,computed:!1}},description:{required:!1,tsType:{name:`string`},description:`Description text displayed between the label and input.`},isOptional:{required:!1,tsType:{name:`boolean`},description:`Whether the field is optional. Mutually exclusive with isRequired.
@default false`,defaultValue:{value:`false`,computed:!1}},isRequired:{required:!1,tsType:{name:`boolean`},description:`Whether the field is required. Mutually exclusive with isOptional.
@default false`,defaultValue:{value:`false`,computed:!1}},isDisabled:{required:!1,tsType:{name:`boolean`},description:`Whether the input is disabled.
@default false`,defaultValue:{value:`false`,computed:!1}},disabledMessage:{required:!1,tsType:{name:`string`},description:`Explains why the input is disabled. When set together with
\`isDisabled\`, the input shows a tooltip with this text on hover and
keyboard focus, and the field stays focusable (via \`aria-disabled\`)
so the reason is discoverable by keyboard and assistive technology.
Typing and calendar activation stay blocked.

Use this instead of wrapping a disabled input in \`Tooltip\` — disabled
controls don't emit the pointer events an external tooltip needs.

@example
\`\`\`
<DateInput
  label="Event date"
  value={date}
  onChange={setDate}
  isDisabled
  disabledMessage="You need the Editor role to change this"
/>
\`\`\``},value:{required:!1,tsType:{name:`literal`,value:"`${number}${number}${number}${number}-${number}${number}-${number}${number}`"},description:`The selected date in ISO format (YYYY-MM-DD).`},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(value: ISODateString | undefined) => void`,signature:{arguments:[{type:{name:`union`,raw:`ISODateString | undefined`,elements:[{name:`literal`,value:"`${number}${number}${number}${number}-${number}${number}-${number}${number}`"},{name:`undefined`}]},name:`value`}],return:{name:`void`}}},description:`Callback fired when the date changes.
Called with undefined when input is cleared.`},changeAction:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(value: ISODateString | undefined) => void | Promise<void>`,signature:{arguments:[{type:{name:`union`,raw:`ISODateString | undefined`,elements:[{name:`literal`,value:"`${number}${number}${number}${number}-${number}${number}-${number}${number}`"},{name:`undefined`}]},name:`value`}],return:{name:`union`,raw:`void | Promise<void>`,elements:[{name:`void`},{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`}]}}},description:`Async action on change. Fires after onChange.`},isLoading:{required:!1,tsType:{name:`boolean`},description:`Whether the input is in a loading state.
@default false`,defaultValue:{value:`false`,computed:!1}},min:{required:!1,tsType:{name:`literal`,value:"`${number}${number}${number}${number}-${number}${number}-${number}${number}`"},description:`Minimum selectable date in ISO format.`},max:{required:!1,tsType:{name:`literal`,value:"`${number}${number}${number}${number}-${number}${number}-${number}${number}`"},description:`Maximum selectable date in ISO format.`},dateConstraints:{required:!1,tsType:{name:`ReadonlyArray`,elements:[{name:`signature`,type:`function`,raw:`(date: Date) => boolean`,signature:{arguments:[{type:{name:`Date`},name:`date`}],return:{name:`boolean`}}}],raw:`ReadonlyArray<(date: Date) => boolean>`},description:`Custom date constraint functions. Date is disabled if ANY function returns false.`},placeholder:{required:!1,tsType:{name:`string`},description:`Placeholder text shown when no date is selected.
@default "Select a date"`},size:{required:!1,tsType:{name:`unknown`},description:`The size of the input.
- 'sm': Compact size (18px height)
- 'md': Default size (26px height)
@default 'md'`},status:{required:!1,tsType:{name:`InputStatus`},description:`Status indicator for the input.
When set, displays a colored border and status icon.
If message is provided, displays below the input.`},statusVariant:{required:!1,tsType:{name:`FieldStatusVariantMap`},description:`How the status message is placed relative to the input.
- 'attached': message overlaps directly below the input (bordered treatment)
- 'detached': message floats below as a separate element with spacing
- 'tooltip': no message box; the status icon becomes a focusable info-tip button that reveals the message on hover, keyboard focus, or tap
@default 'attached'`,defaultValue:{value:`'attached'`,computed:!1}},width:{required:!1,tsType:{name:`union`,raw:`number | string`,elements:[{name:`number`},{name:`string`}]},description:"Width of the field. Numbers are treated as pixels, strings are used as-is\n(e.g. `'100%'`). Sizes the whole field (label, control, and status) so they\nstay aligned, unlike setting width via `xstyle`/`className`/`style`."},labelTooltip:{required:!1,tsType:{name:`string`},description:`Tooltip text to display in an info icon at the end of the label.`},hasClear:{required:!1,tsType:{name:`boolean`},description:`Whether to show a clear button when a date is set.
When clicked, resets the value to undefined and returns focus to the input.
@default false`,defaultValue:{value:`false`,computed:!1}},numberOfMonths:{required:!1,tsType:{name:`union`,raw:`1 | 2`,elements:[{name:`literal`,value:`1`},{name:`literal`,value:`2`}]},description:`Number of months to display in the calendar popover.
@default 1`},weekStartsOn:{required:!1,tsType:{name:`union`,raw:`DayOfWeek | DayOfWeekName`,elements:[{name:`union`,raw:`0 | 1 | 2 | 3 | 4 | 5 | 6`,elements:[{name:`literal`,value:`0`},{name:`literal`,value:`1`},{name:`literal`,value:`2`},{name:`literal`,value:`3`},{name:`literal`,value:`4`},{name:`literal`,value:`5`},{name:`literal`,value:`6`}]},{name:`union`,raw:`| 'sun'
| 'mon'
| 'tue'
| 'wed'
| 'thu'
| 'fri'
| 'sat'`,elements:[{name:`literal`,value:`'sun'`},{name:`literal`,value:`'mon'`},{name:`literal`,value:`'tue'`},{name:`literal`,value:`'wed'`},{name:`literal`,value:`'thu'`},{name:`literal`,value:`'fri'`},{name:`literal`,value:`'sat'`}]}]},description:`First day of week in the calendar popover. Accepts a number
(0 = Sunday … 6 = Saturday) or a three-letter day name ('sun'–'sat',
case-insensitive).
@default 0`,defaultValue:{value:`0`,computed:!1}},format:{required:!1,tsType:{name:`union`,raw:`DateInputFormat | ((value: ISODateString) => string)`,elements:[{name:`Extract`,elements:[{name:`union`,raw:`| 'relative'
| 'relative_short'
| 'auto'
| 'date'
| 'date_long'
| 'date_weekday'
| 'date_time'
| 'time'
| 'system_date'
| 'system_date_time'
| 'system_time'
| 'unix_seconds'`,elements:[{name:`literal`,value:`'relative'`},{name:`literal`,value:`'relative_short'`},{name:`literal`,value:`'auto'`},{name:`literal`,value:`'date'`},{name:`literal`,value:`'date_long'`},{name:`literal`,value:`'date_weekday'`},{name:`literal`,value:`'date_time'`},{name:`literal`,value:`'time'`},{name:`literal`,value:`'system_date'`},{name:`literal`,value:`'system_date_time'`},{name:`literal`,value:`'system_time'`},{name:`literal`,value:`'unix_seconds'`}]},{name:`union`,raw:`'date' | 'date_long' | 'date_weekday' | 'system_date'`,elements:[{name:`literal`,value:`'date'`},{name:`literal`,value:`'date_long'`},{name:`literal`,value:`'date_weekday'`},{name:`literal`,value:`'system_date'`}]}],raw:`Extract<
  TimestampFormat,
  'date' | 'date_long' | 'date_weekday' | 'system_date'
>`},{name:`unknown`}]},description:`How the committed date value is displayed in the text field. Accepts a
named format reused from \`Timestamp\`'s \`format\` vocabulary (so the same
literal renders the same date shape in both components) or a function that
maps the ISO value to a custom display string.

- \`'date_long'\` (default): long-month date, e.g. "March 21, 2026"
- \`'date'\`: short-month date, e.g. "Mar 21, 2026"
- \`'date_weekday'\`: short weekday + date, e.g. "Wed, Mar 21, 2026"
- \`'system_date'\`: ISO 8601 calendar date, e.g. "2026-03-21"
- \`(value: ISODateString) => string\`: fully custom display string

Formatting applies only to the committed value — never to text the user is
actively typing. A custom function's output that \`parseDateInput\` cannot
read back can't be re-committed after an edit; external \`value\` changes
always recompute the display from the ISO value.

@default 'date_long'
@example
\`\`\`
<DateInput label="Ship date" value={date} onChange={setDate} format="date" />
<DateInput
  label="Ship date"
  value={date}
  onChange={setDate}
  format={iso => new Date(iso + 'T00:00').toDateString()}
/>
\`\`\``,defaultValue:{value:`'date_long'`,computed:!1}},nativePicker:{required:!1,tsType:{name:`union`,raw:`'touch' | 'always' | 'never'`,elements:[{name:`literal`,value:`'touch'`},{name:`literal`,value:`'always'`},{name:`literal`,value:`'never'`}]},description:`When date picking is handed to the browser/OS instead of Astryx's own
surfaces: the field becomes an \`<input type="date">\` and the platform
draws the picker — the iOS wheel, the Android calendar dialog — with the
OS's own hit areas, momentum scrolling, locale and accessibility
settings.

- \`'touch'\` (default): native on touch devices (coarse pointer), the text
  field and calendar popover on mouse-driven ones
- \`'always'\`: native wherever the browser supports \`<input type="date">\`
- \`'never'\`: Astryx's own pickers everywhere — the touch picker on a
  finger, the calendar popover on a mouse

\`format\` and \`placeholder\` still apply in native mode: DateInput paints
the closed field's text itself, over the control. \`numberOfMonths\` and
\`weekStartsOn\` do not — they describe a calendar grid the native picker
does not have — so a field that needs either should pass \`'never'\`.

\`min\` and \`max\` are forwarded, but note that a native picker may not
*show* them: on iOS they are constraint-validation flags rather than
clamps, so an out-of-range date can be selected and is refused on commit
(announced to assistive technology) rather than being greyed out in the
picker. \`dateConstraints\` is enforced the same way, on commit, and is
reason enough to prefer \`'never'\` on a field that uses it.

@default 'touch'
@example
\`\`\`
// Astryx's own touch picker instead of the platform's
<DateInput label="Event date" value={date} onChange={setDate} nativePicker="never" />
\`\`\``}},composes:[`Omit`]}}));function q({label:e,isLabelHidden:t=!1,description:n,isOptional:te=!1,isRequired:i=!1,isDisabled:a=!1,disabledMessage:o,value:s,onChange:ae,changeAction:se,isLoading:le=!1,min:de,max:me,dateConstraints:c,placeholder:he,size:ge,status:l,statusVariant:xe=`attached`,labelTooltip:u,hasClear:d=!1,numberOfMonths:we=1,weekStartsOn:Ee,format:De=`date_long`,width:Oe,xstyle:je,className:Me,style:f,ref:Ne,...p}){let m=ke(),h=Ae(),Ie=Je({isRequired:i,isOptional:te}),Le=he??m(`@astryx.dateInput.placeholder`),Re=Te(ge,`md`),ze=(0,Y.useId)(),_=(0,Y.useId)(),v=(0,Y.useId)(),Be=(0,Y.useId)(),y=(0,Y.useRef)(null),x=(0,Y.useRef)(null),S=(0,Y.useRef)(void 0),C=Ze(),[,w]=(0,Y.useTransition)(),[T,Xe]=(0,Y.useOptimistic)(s),Qe=le||T!==s,E=a||Qe,D=a&&!!o,O=ye({placement:`above`,focusTrigger:`always`,isEnabled:D}),{isDateDisabled:k}=Ve({min:de,max:me,dateConstraints:c}),{statusIcon:A,describedBy:$e}=Fe({status:l,statusVariant:xe,isInGroup:!!C}),{ariaLabelledBy:j,ariaDescribedBy:M}=ve(_,[n?v:null,xe!==`tooltip`&&l?.message?Be:null,$e,D?O.describedBy:null],C),[N,P]=(0,Y.useState)(null),F=(0,Y.useRef)(s);s!==F.current&&(F.current=s,s!==S.current&&(S.current=void 0,N!==null&&P(null)));let I=(0,Y.useCallback)(e=>typeof De==`function`?De(e):pe(_e(e),De,h),[De,h]),L=N===null?T&&/^\d{4}-\d{2}-\d{2}$/.test(T)?I(T):``:N,R=N===null||!N.trim()?!0:ce(N,h)!==null,z=g({dialogLabel:m(`@astryx.dateInput.dialogLabel`),closeButtonLabel:m(`@astryx.dateInput.closeCalendar`),onHide:()=>{ue()&&y.current?.focus()}}),B=(0,Y.useCallback)(()=>{E||(z.isOpen?z.hide():z.show())},[E,z]),et=(0,Y.useCallback)(()=>{!E&&!z.isOpen&&z.show({skipAutoFocus:!0})},[E,z]),V=(0,Y.useCallback)(e=>{Qe||(ae?.(e),se&&w(async()=>{Xe(e),await se(e)}))},[Qe,ae,se,w,Xe]),tt=(0,Y.useCallback)(()=>{V(void 0),y.current?.focus()},[V]),H=(0,Y.useCallback)(e=>{V(e),P(null),z.hide()},[V,z]),U=(0,Y.useCallback)(e=>{if(E)return;let t=e.target.value;P(t);let n=ce(t,h);if(n&&fe(n)!==s&&!k(n)){let e=fe(n);S.current=e,V(e),x.current?.navigateTo(e)}},[s,V,k,E,h]),W=(0,Y.useCallback)(()=>{if(N===null)return;if(!N.trim()){s!==void 0&&V(void 0),P(null);return}let e=ce(N,h);if(e&&!k(e)){let t=fe(e);t!==s&&V(t)}P(null)},[N,s,V,k,h]),G=(0,Y.useCallback)(()=>{W()},[W]),nt=(0,Y.useCallback)(e=>{re(e.nativeEvent)||(e.key===`Escape`&&z.isOpen?(e.preventDefault(),z.hide()):(e.key===`ArrowDown`||e.altKey&&e.key===`ArrowDown`)&&!z.isOpen?(e.preventDefault(),E||z.show({skipAutoFocus:!0})):e.key===`Enter`&&(e.preventDefault(),W()))},[z,W,E]),K=(0,X.jsxs)(`div`,{ref:e=>{z.triggerRef(e),O.ref(e)},...p,...ie(ee(`date-input`,{size:Re,status:l?.type??null,disabled:a?`disabled`:null}),r(We.base,Z[Re],E&&We.disabled,l&&Ke[l.type],l&&!E&&Ue[l.type],l&&qe[l.type],C&&Ye.inGroup,je),Me,f),children:[C&&(0,X.jsx)(Ce,{id:_,children:e}),(0,X.jsx)(`button`,{type:`button`,onClick:B,disabled:E,"aria-label":z.isOpen?m(`@astryx.dateInput.toggleCalendarClose`):m(`@astryx.dateInput.openCalendar`),...r(oe.focusVisible,it.iconButton,E&&it.iconButtonDisabled),children:(0,X.jsx)(Pe,{icon:`calendar`,size:`sm`,color:`secondary`,...ee(`date-input-toggle-icon`,{state:z.isOpen?`expanded`:`collapsed`})})}),(0,X.jsx)(`input`,{ref:be(Ne,y),id:ze,type:`text`,role:`combobox`,value:L,onChange:U,onBlur:G,onClick:et,onKeyDown:nt,placeholder:Le,disabled:E&&!D,"aria-disabled":D?`true`:void 0,readOnly:D||void 0,"aria-labelledby":j,"aria-describedby":M,"aria-required":Ie?`true`:void 0,"aria-invalid":l?.type===`error`||!R?`true`:void 0,"aria-busy":Qe||void 0,"aria-expanded":z.isOpen,"aria-haspopup":`dialog`,"aria-controls":z.isOpen?z.id:void 0,"aria-autocomplete":`none`,autoComplete:`off`,...{0:{className:`astryx1lliihq astryx98rzlu astryxeuugli astryxc342km astryxng3xce astryx1717udv astryx9ynric astryxjm74w1 astryx6pjikd astryxw6l6zx astryx1tgivj0 astryxjbqb8w astryx1a2a7pz astryxeyghm5`},2:{className:`astryx1lliihq astryx98rzlu astryxeuugli astryxc342km astryxng3xce astryx1717udv astryx9ynric astryxjm74w1 astryx6pjikd astryxw6l6zx astryx1tgivj0 astryxjbqb8w astryx1a2a7pz astryxeyghm5 astryxt0e3qv`},1:{className:`astryx1lliihq astryx98rzlu astryxeuugli astryxc342km astryxng3xce astryx1717udv astryx9ynric astryxjm74w1 astryx6pjikd astryxw6l6zx astryxjbqb8w astryx1a2a7pz astryxeyghm5 astryxv1l7n4`},3:{className:`astryx1lliihq astryx98rzlu astryxeuugli astryxc342km astryxng3xce astryx1717udv astryx9ynric astryxjm74w1 astryx6pjikd astryxw6l6zx astryxjbqb8w astryx1a2a7pz astryxeyghm5 astryxt0e3qv astryxv1l7n4`}}[!!E<<1|!R<<0]}),(0,X.jsx)(Ce,{as:`div`,role:`alert`,"aria-live":`assertive`,children:R?``:m(`@astryx.dateInput.invalidDate`)}),d&&s!==void 0&&!E&&(0,X.jsx)(Ge,{label:m(`@astryx.dateInput.clear`,{label:e}),onClick:tt,iconClassName:ne(`date-input-clear-icon`)}),Qe&&(0,X.jsx)(Se,{size:`sm`}),A,z.render((0,X.jsx)(b,{handleRef:x,mode:`single`,value:T,onChange:H,min:de,max:me,dateConstraints:c,numberOfMonths:we,weekStartsOn:Ee}),{placement:`below`,alignment:`start`}),D&&O.renderTooltip(o)]});return C?K:(0,X.jsx)(He,{label:e,isLabelHidden:t,description:n,inputID:ze,descriptionID:n?v:void 0,isOptional:te,isRequired:i,isDisabled:a,status:l?{type:l.type,message:l.message,messageID:l.message?Be:void 0}:void 0,statusVariant:xe,labelTooltip:u,width:Oe,children:K})}function J(e){let t=Ne(Q),n=e.nativePicker??`touch`;return n===`always`||n===`touch`&&t?(0,X.jsx)(R,{...e}):t?(0,X.jsx)(U,{...e}):(0,X.jsx)(q,{...e})}var Y,X,it,Z,Q,$=e((()=>{Y=t(n(),1),a(),C(),p(),d(),Xe(),T(),we(),u(),S(),x(),m(),f(),w(),v(),H(),rt(),Ie(),ge(),le(),X=l(),te(),me(),i(),je(),xe(),it={iconButton:{k1xSpc:`astryx78zum5`,kGNEyG:`astryx6s0dn4`,kjj79g:`astryxl56j7k`,kmVPX3:`astryx1717udv`,kg3NbH:null,kuDDbn:null,kE3dHu:null,kP0aTx:null,kpe85a:null,k8WAf4:null,kLKAdn:null,kGO01o:null,kogj98:`astryx1ghz6dp`,kUOVxO:null,keTefX:null,koQZXg:null,k71WvV:null,km5ZXQ:null,kqGvvJ:null,keoZOQ:null,k1K539:null,kMzoRj:`astryxc342km`,kjGldf:null,k2ei4v:null,kZ1KPB:null,ke9TFa:null,kWqL5O:null,kLoX6v:null,kEafiO:null,kt9PQ7:null,ksu8eU:`astryxng3xce`,kJRH4f:null,kVhnKS:null,k4WBpm:null,k8ry5P:null,kSWEuD:null,kDUl1X:null,kPef9Z:null,kfdmCh:null,kWkggS:`astryxjbqb8w`,kkrTdU:`astryx1ypdohk astryx16khyan`,kaIpWk:`astryxh6dtrn`,krdFHd:null,kfmiAY:null,kVL7Gh:null,kT0f0o:null,kIxVMA:null,ksF3WI:null,kqGeR4:null,kYm2EN:null,$$css:!0},iconButtonDisabled:{kkrTdU:`astryxt0e3qv`,$$css:!0}},Z={sm:{kZKoxP:`astryx6k0iem`,k7Eaqz:`astryxfb3i0g`,$$css:!0},md:{kZKoxP:`astryx1ueg155`,k7Eaqz:`astryxfb3i0g`,$$css:!0},lg:{kZKoxP:`astryxssyfek`,k7Eaqz:`astryxfb3i0g`,$$css:!0}},Q=`(pointer: coarse)`,q.displayName=`PointerDateField`,J.displayName=`DateInput`,J.__docgenInfo={description:`A date picker that fits the pointer it is being used with.

With a mouse or trackpad this is a text input you can type into, with a
calendar in a popover — unchanged, and still the surface every existing
consumer gets. With a finger it is a picker built for one: a bottom sheet
holding one month per screen, swiped sideways, with month and year wheels
behind the header title for the far jumps swiping is bad at.

The props are identical either way — this is one component with two
surfaces, not two components — so nothing at the call site changes, and a
date typed on a laptop and a date thumbed on a phone are the same value.

## Why a runtime switch and not CSS

The two surfaces are structurally different — a popover anchored to a text
field versus a full-width sheet holding a scroller — so "render both, hide
one" would double the DOM, double the tab stops, and mount two calendars.
The condition is not layout either: it is *which interaction is faster*,
and that depends on the pointer, which CSS cannot hand to JS.

They are two components rather than one with a branch inside because the
hook lists differ; keeping them separate is what lets each own its own.

## Hydration

\`useMediaQuery\` reports false during SSR, so server HTML is always the
pointer field and the swap happens after hydration. That is deliberately
unobservable: both surfaces render the SAME closed field — a bordered input
with a calendar icon and the formatted date — and differ only in what
opens. Nothing moves; the field just starts opening a sheet.

@example
\`\`\`
<DateInput
  label="Event date"
  value={date}
  onChange={setDate}
/>
\`\`\``,methods:[],displayName:`DateInput`,props:{ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLInputElement>`,elements:[{name:`HTMLInputElement`}]},description:`Ref forwarded to the root element`},label:{required:!0,tsType:{name:`string`},description:`Label text for the input (required for accessibility).`},isLabelHidden:{required:!1,tsType:{name:`boolean`},description:`Whether to visually hide the label (still accessible to screen readers).
@default false`},description:{required:!1,tsType:{name:`string`},description:`Description text displayed between the label and input.`},isOptional:{required:!1,tsType:{name:`boolean`},description:`Whether the field is optional. Mutually exclusive with isRequired.
@default false`},isRequired:{required:!1,tsType:{name:`boolean`},description:`Whether the field is required. Mutually exclusive with isOptional.
@default false`},isDisabled:{required:!1,tsType:{name:`boolean`},description:`Whether the input is disabled.
@default false`},disabledMessage:{required:!1,tsType:{name:`string`},description:`Explains why the input is disabled. When set together with
\`isDisabled\`, the input shows a tooltip with this text on hover and
keyboard focus, and the field stays focusable (via \`aria-disabled\`)
so the reason is discoverable by keyboard and assistive technology.
Typing and calendar activation stay blocked.

Use this instead of wrapping a disabled input in \`Tooltip\` — disabled
controls don't emit the pointer events an external tooltip needs.

@example
\`\`\`
<DateInput
  label="Event date"
  value={date}
  onChange={setDate}
  isDisabled
  disabledMessage="You need the Editor role to change this"
/>
\`\`\``},value:{required:!1,tsType:{name:`literal`,value:"`${number}${number}${number}${number}-${number}${number}-${number}${number}`"},description:`The selected date in ISO format (YYYY-MM-DD).`},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(value: ISODateString | undefined) => void`,signature:{arguments:[{type:{name:`union`,raw:`ISODateString | undefined`,elements:[{name:`literal`,value:"`${number}${number}${number}${number}-${number}${number}-${number}${number}`"},{name:`undefined`}]},name:`value`}],return:{name:`void`}}},description:`Callback fired when the date changes.
Called with undefined when input is cleared.`},changeAction:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(value: ISODateString | undefined) => void | Promise<void>`,signature:{arguments:[{type:{name:`union`,raw:`ISODateString | undefined`,elements:[{name:`literal`,value:"`${number}${number}${number}${number}-${number}${number}-${number}${number}`"},{name:`undefined`}]},name:`value`}],return:{name:`union`,raw:`void | Promise<void>`,elements:[{name:`void`},{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`}]}}},description:`Async action on change. Fires after onChange.`},isLoading:{required:!1,tsType:{name:`boolean`},description:`Whether the input is in a loading state.
@default false`},min:{required:!1,tsType:{name:`literal`,value:"`${number}${number}${number}${number}-${number}${number}-${number}${number}`"},description:`Minimum selectable date in ISO format.`},max:{required:!1,tsType:{name:`literal`,value:"`${number}${number}${number}${number}-${number}${number}-${number}${number}`"},description:`Maximum selectable date in ISO format.`},dateConstraints:{required:!1,tsType:{name:`ReadonlyArray`,elements:[{name:`signature`,type:`function`,raw:`(date: Date) => boolean`,signature:{arguments:[{type:{name:`Date`},name:`date`}],return:{name:`boolean`}}}],raw:`ReadonlyArray<(date: Date) => boolean>`},description:`Custom date constraint functions. Date is disabled if ANY function returns false.`},placeholder:{required:!1,tsType:{name:`string`},description:`Placeholder text shown when no date is selected.
@default "Select a date"`},size:{required:!1,tsType:{name:`unknown`},description:`The size of the input.
- 'sm': Compact size (18px height)
- 'md': Default size (26px height)
@default 'md'`},status:{required:!1,tsType:{name:`InputStatus`},description:`Status indicator for the input.
When set, displays a colored border and status icon.
If message is provided, displays below the input.`},statusVariant:{required:!1,tsType:{name:`FieldStatusVariantMap`},description:`How the status message is placed relative to the input.
- 'attached': message overlaps directly below the input (bordered treatment)
- 'detached': message floats below as a separate element with spacing
- 'tooltip': no message box; the status icon becomes a focusable info-tip button that reveals the message on hover, keyboard focus, or tap
@default 'attached'`},width:{required:!1,tsType:{name:`union`,raw:`number | string`,elements:[{name:`number`},{name:`string`}]},description:"Width of the field. Numbers are treated as pixels, strings are used as-is\n(e.g. `'100%'`). Sizes the whole field (label, control, and status) so they\nstay aligned, unlike setting width via `xstyle`/`className`/`style`."},labelTooltip:{required:!1,tsType:{name:`string`},description:`Tooltip text to display in an info icon at the end of the label.`},hasClear:{required:!1,tsType:{name:`boolean`},description:`Whether to show a clear button when a date is set.
When clicked, resets the value to undefined and returns focus to the input.
@default false`},numberOfMonths:{required:!1,tsType:{name:`union`,raw:`1 | 2`,elements:[{name:`literal`,value:`1`},{name:`literal`,value:`2`}]},description:`Number of months to display in the calendar popover.
@default 1`},weekStartsOn:{required:!1,tsType:{name:`union`,raw:`DayOfWeek | DayOfWeekName`,elements:[{name:`union`,raw:`0 | 1 | 2 | 3 | 4 | 5 | 6`,elements:[{name:`literal`,value:`0`},{name:`literal`,value:`1`},{name:`literal`,value:`2`},{name:`literal`,value:`3`},{name:`literal`,value:`4`},{name:`literal`,value:`5`},{name:`literal`,value:`6`}]},{name:`union`,raw:`| 'sun'
| 'mon'
| 'tue'
| 'wed'
| 'thu'
| 'fri'
| 'sat'`,elements:[{name:`literal`,value:`'sun'`},{name:`literal`,value:`'mon'`},{name:`literal`,value:`'tue'`},{name:`literal`,value:`'wed'`},{name:`literal`,value:`'thu'`},{name:`literal`,value:`'fri'`},{name:`literal`,value:`'sat'`}]}]},description:`First day of week in the calendar popover. Accepts a number
(0 = Sunday … 6 = Saturday) or a three-letter day name ('sun'–'sat',
case-insensitive).
@default 0`},format:{required:!1,tsType:{name:`union`,raw:`DateInputFormat | ((value: ISODateString) => string)`,elements:[{name:`Extract`,elements:[{name:`union`,raw:`| 'relative'
| 'relative_short'
| 'auto'
| 'date'
| 'date_long'
| 'date_weekday'
| 'date_time'
| 'time'
| 'system_date'
| 'system_date_time'
| 'system_time'
| 'unix_seconds'`,elements:[{name:`literal`,value:`'relative'`},{name:`literal`,value:`'relative_short'`},{name:`literal`,value:`'auto'`},{name:`literal`,value:`'date'`},{name:`literal`,value:`'date_long'`},{name:`literal`,value:`'date_weekday'`},{name:`literal`,value:`'date_time'`},{name:`literal`,value:`'time'`},{name:`literal`,value:`'system_date'`},{name:`literal`,value:`'system_date_time'`},{name:`literal`,value:`'system_time'`},{name:`literal`,value:`'unix_seconds'`}]},{name:`union`,raw:`'date' | 'date_long' | 'date_weekday' | 'system_date'`,elements:[{name:`literal`,value:`'date'`},{name:`literal`,value:`'date_long'`},{name:`literal`,value:`'date_weekday'`},{name:`literal`,value:`'system_date'`}]}],raw:`Extract<
  TimestampFormat,
  'date' | 'date_long' | 'date_weekday' | 'system_date'
>`},{name:`unknown`}]},description:`How the committed date value is displayed in the text field. Accepts a
named format reused from \`Timestamp\`'s \`format\` vocabulary (so the same
literal renders the same date shape in both components) or a function that
maps the ISO value to a custom display string.

- \`'date_long'\` (default): long-month date, e.g. "March 21, 2026"
- \`'date'\`: short-month date, e.g. "Mar 21, 2026"
- \`'date_weekday'\`: short weekday + date, e.g. "Wed, Mar 21, 2026"
- \`'system_date'\`: ISO 8601 calendar date, e.g. "2026-03-21"
- \`(value: ISODateString) => string\`: fully custom display string

Formatting applies only to the committed value — never to text the user is
actively typing. A custom function's output that \`parseDateInput\` cannot
read back can't be re-committed after an edit; external \`value\` changes
always recompute the display from the ISO value.

@default 'date_long'
@example
\`\`\`
<DateInput label="Ship date" value={date} onChange={setDate} format="date" />
<DateInput
  label="Ship date"
  value={date}
  onChange={setDate}
  format={iso => new Date(iso + 'T00:00').toDateString()}
/>
\`\`\``},nativePicker:{required:!1,tsType:{name:`union`,raw:`'touch' | 'always' | 'never'`,elements:[{name:`literal`,value:`'touch'`},{name:`literal`,value:`'always'`},{name:`literal`,value:`'never'`}]},description:`When date picking is handed to the browser/OS instead of Astryx's own
surfaces: the field becomes an \`<input type="date">\` and the platform
draws the picker — the iOS wheel, the Android calendar dialog — with the
OS's own hit areas, momentum scrolling, locale and accessibility
settings.

- \`'touch'\` (default): native on touch devices (coarse pointer), the text
  field and calendar popover on mouse-driven ones
- \`'always'\`: native wherever the browser supports \`<input type="date">\`
- \`'never'\`: Astryx's own pickers everywhere — the touch picker on a
  finger, the calendar popover on a mouse

\`format\` and \`placeholder\` still apply in native mode: DateInput paints
the closed field's text itself, over the control. \`numberOfMonths\` and
\`weekStartsOn\` do not — they describe a calendar grid the native picker
does not have — so a field that needs either should pass \`'never'\`.

\`min\` and \`max\` are forwarded, but note that a native picker may not
*show* them: on iOS they are constraint-validation flags rather than
clamps, so an out-of-range date can be selected and is refused on commit
(announced to assistive technology) rather than being greyed out in the
picker. \`dateConstraints\` is enforced the same way, on commit, and is
reason enough to prefer \`'never'\` on a field that uses it.

@default 'touch'
@example
\`\`\`
// Astryx's own touch picker instead of the platform's
<DateInput label="Event date" value={date} onChange={setDate} nativePicker="never" />
\`\`\``}},composes:[`Omit`]}})),at=e((()=>{$()}));export{J as n,$ as r,at as t};