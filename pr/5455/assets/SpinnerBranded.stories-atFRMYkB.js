import{i as e}from"./preload-helper-CT_b8DTk.js";import{t}from"./jsx-runtime-DqZldVDK.js";import{s as n}from"./useTheme-CJYItYzy.js";import{t as r}from"./Button-Djh_f1Xl.js";import{t as i}from"./Button-BkZG2xr-.js";import{t as a,x as o}from"./theme-Cev_i3Y3.js";import{r as s}from"./Heading-CaHx9DQH.js";import{i as c,o as l}from"./Stack-BPa9qrGQ.js";import{t as u}from"./Layout-0OukcJ33.js";import{t as d}from"./Text-CfcCRLVq.js";import{n as f,t as p}from"./TextInput-djNw9u9Y.js";import{D as m,E as h,Fn as g,Pn as _}from"./iframe-DNYR6K_m.js";function v({size:e=`md`}){let t=Math.round(w[e]/2.2);return(0,S.jsxs)(`span`,{"aria-hidden":`true`,className:`x3nfvp2 x6s0dn4 x195vfkc x15ami61`,children:[(0,S.jsx)(`span`,{className:`xtwfq29 x16rqkct x1eneg1z x1q3qbx4 xa4qsjk x4hg4is`,style:{width:t,height:t}}),(0,S.jsx)(`span`,{className:`xtwfq29 x16rqkct x1eneg1z x1q3qbx4 xa4qsjk x4hg4is xmmqq2k`,style:{width:t,height:t}}),(0,S.jsx)(`span`,{className:`xtwfq29 x16rqkct x1eneg1z x1q3qbx4 xa4qsjk x4hg4is x1x1c4bx`,style:{width:t,height:t}})]})}function y({size:e=`md`}){let t=w[e];return(0,S.jsx)(`span`,{"aria-hidden":`true`,className:`x1rg5ohu x2qhyzs xtwfq29 x1cum3z5 xcadkff xr7ufhj xa4qsjk x4hg4is`,style:{width:t,height:t}})}function b({size:e=`md`}){let t=w[e]+6,n=t/2-2,r=2*Math.PI*n;return(0,S.jsx)(`svg`,{"aria-hidden":`true`,width:t,height:t,viewBox:`0 0 ${t} ${t}`,className:`x1lliihq x1y1voi5 x1yr7pzp xegkacw xa4qsjk x1esw782`,children:(0,S.jsx)(`circle`,{cx:t/2,cy:t/2,r:n,strokeWidth:2,strokeDasharray:`${r*.75} ${r*.25}`,className:`xbh8q5q x73je2i x5lxx2x`})})}function x({size:e=`md`}){let t=w[e]+4;return(0,S.jsx)(`svg`,{"aria-hidden":`true`,width:t,height:t,viewBox:`0 0 24 24`,className:`x1lliihq xhmc904 xvelmlr x1sbju2s xa4qsjk x4hg4is`,children:(0,S.jsx)(`path`,{d:`M12 1.5 22.5 20.5H1.5Z`,fill:`none`,stroke:`currentColor`,strokeWidth:3,strokeLinejoin:`round`})})}var S,C,w,T,E,D,O,k;e((()=>{i(),h(),_(),d(),p(),a(),u(),S=t(),C={title:`Core/Spinner/Branded Replacements`},w={sm:10,md:14,lg:18,xl:28},T=[{label:`indicators: {spinner: BouncingDots}   ← wide, not square`,theme:n({name:`brand-dots`,indicators:{spinner:v}})},{label:`indicators: {spinner: PulsingSquare}`,theme:n({name:`brand-square`,indicators:{spinner:y}})},{label:`indicators: {spinner: ReverseArc}`,theme:n({name:`brand-arc`,indicators:{spinner:b}})},{label:`indicators: {spinner: LogoMark}`,theme:n({name:`brand-mark`,indicators:{spinner:x}})}],E=[{label:`default — the ring we ship`,theme:null},...T],D={render:()=>(0,S.jsxs)(`div`,{className:`x78zum5 xdt5ytf x1c1vhfx xe8ttls`,children:[(0,S.jsxs)(`div`,{className:`xrvj5dj xpxqrsz x6s0dn4 xou54vl`,children:[(0,S.jsx)(s,{type:`supporting`,children:`theme`}),(0,S.jsx)(s,{type:`supporting`,children:`Button (loading)`}),(0,S.jsx)(s,{type:`supporting`,children:`TextInput (busy)`}),(0,S.jsx)(s,{type:`supporting`,children:`Switch`}),(0,S.jsx)(s,{type:`supporting`,children:`standalone`})]}),E.map(({label:e,theme:t})=>{let n=(0,S.jsxs)(`div`,{className:`xrvj5dj xpxqrsz x6s0dn4 xou54vl`,children:[(0,S.jsx)(`span`,{className:`x1n2ylgu x1j6dyjg`,children:e}),(0,S.jsx)(r,{label:`Save`,isLoading:!0}),(0,S.jsx)(f,{label:`Search`,value:`astryx`,isLoading:!0}),(0,S.jsx)(g,{label:`Sync`,isLabelHidden:!0,value:!0,isLoading:!0}),(0,S.jsx)(m,{size:`md`})]},e);return t==null?n:(0,S.jsx)(o,{theme:t,mode:`light`,children:n},e)})]})},O={render:()=>(0,S.jsx)(c,{gap:6,children:T.map(({label:e,theme:t})=>(0,S.jsx)(o,{theme:t,mode:`light`,children:(0,S.jsxs)(l,{gap:6,vAlign:`center`,children:[(0,S.jsx)(m,{size:`sm`}),(0,S.jsx)(m,{size:`md`}),(0,S.jsx)(m,{size:`lg`}),(0,S.jsx)(m,{size:`xl`})]})},e))})},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <div {...stylex.props(layout.page)}>
      <div {...stylex.props(layout.row)}>
        <Text type="supporting">theme</Text>
        <Text type="supporting">Button (loading)</Text>
        <Text type="supporting">TextInput (busy)</Text>
        <Text type="supporting">Switch</Text>
        <Text type="supporting">standalone</Text>
      </div>
      {themes.map(({
      label,
      theme
    }) => {
      const row = <div {...stylex.props(layout.row)} key={label}>
            <span {...stylex.props(layout.mono)}>{label}</span>
            <Button label="Save" isLoading />
            <TextInput label="Search" value="astryx" isLoading />
            <Switch label="Sync" isLabelHidden value isLoading />
            <Spinner size="md" />
          </div>;
      return theme == null ? row : <Theme theme={theme} mode="light" key={label}>
            {row}
          </Theme>;
    })}
    </div>
}`,...D.parameters?.docs?.source},description:{story:`One registry entry, four hosts, five rows. The hosts are unchanged between
rows and none of them knows which visual it is rendering.`,...D.parameters?.docs?.description}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <VStack gap={6}>
      {brandThemes.map(({
      label,
      theme
    }) => <Theme theme={theme} mode="light" key={label}>
          <HStack gap={6} vAlign="center">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
            <Spinner size="xl" />
          </HStack>
        </Theme>)}
    </VStack>
}`,...O.parameters?.docs?.source},description:{story:"The same replacement at every size the busy family declares. `lg` and `xl`\nexist only for a standalone spinner; no control passes them.",...O.parameters?.docs?.description}}},k=[`BrandedSpinners`,`BrandedSizes`]}))();export{O as BrandedSizes,D as BrandedSpinners,k as __namedExportsOrder,C as default};