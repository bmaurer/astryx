import{i as e,s as t}from"./preload-helper-CT_b8DTk.js";import{t as n}from"./react-B7Te67-h.js";import{t as r}from"./jsx-runtime-DqZldVDK.js";import{t as i}from"./Text-IeUp72Rc.js";import{t as a}from"./Button-BDniLuhD.js";import{t as o}from"./Button-Co2OC00k.js";import{t as s}from"./Divider-BzKkd_zR.js";import{t as c}from"./Divider-BDHAhJpM.js";import{t as l}from"./Heading-DgFEqS4T.js";import{i as u,o as d,t as f}from"./Stack-B9pi7ZUb.js";import{t as p}from"./Section-2qDtbU00.js";import{t as m}from"./Section-DqzsisiF.js";import{n as h,t as g}from"./Text-CYeQwSrp.js";import{t as _}from"./CheckboxInput-DnRbxbSr.js";import{t as v}from"./CheckboxInput-DSv4dnZd.js";import{t as y,xn as b}from"./src-IC93347C.js";var x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I;e((()=>{x=t(n()),y(),o(),v(),c(),h(),m(),f(),g(),S=r(),C={title:`Lab/Drawer`,component:b,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:[`A side panel that **floats above** page content — it overlays the`,`layout instead of reflowing it, which is what separates a drawer`,`from a docked panel.`,``,`- Anchors to the **inline start or end** edge only (left/right in`,"  LTR); block-axis sheets are `BottomSheet`.","- Works on **desktop and touch**: `width` is the desktop budget",`  budget, and below 640px the panel preserves a 56px reveal`,"  without exceeding that budget (`isFullWidthOnMobile` makes it",`  edge to edge).`,"- **Three independent axes**: `containerRef` chooses scope,","  `modality` chooses whether that scope is blocked, and `hasScrim`",`  chooses whether it is dimmed. Defaults remain modal + scrim.`,`- **Square corners** (0px radius) — the panel is flush with three`,`  viewport edges.`].join(`
`)}}},decorators:[e=>(0,S.jsx)(`div`,{style:{width:560,minHeight:360,padding:32},children:(0,S.jsx)(e,{})})]},w=[{id:`web-01`,region:`us-east-1`,status:`Healthy`,cpu:`32%`},{id:`web-02`,region:`us-east-1`,status:`Healthy`,cpu:`41%`},{id:`worker-01`,region:`eu-west-1`,status:`Degraded`,cpu:`87%`}],T=[`us-east-1`,`eu-west-1`,`ap-south-1`],E={render:()=>{let[e,t]=(0,x.useState)(!1);return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(a,{label:`Open inspector`,onClick:()=>t(!0)}),(0,S.jsx)(b,{isOpen:e,onOpenChange:t,label:`Deployment details`,width:400,children:(0,S.jsx)(p,{padding:4,children:(0,S.jsxs)(u,{gap:4,children:[(0,S.jsxs)(u,{gap:1,children:[(0,S.jsx)(l,{level:3,children:`web-prod-04`}),(0,S.jsx)(i,{type:`supporting`,color:`secondary`,children:`us-east-1, deployed 12 min ago`})]}),(0,S.jsx)(s,{}),(0,S.jsxs)(u,{gap:2,children:[(0,S.jsx)(i,{type:`label`,children:`Status`}),(0,S.jsx)(i,{type:`body`,children:`Healthy - all 6 instances passing readiness checks.`})]}),(0,S.jsxs)(u,{gap:2,children:[(0,S.jsx)(i,{type:`label`,children:`Build`}),(0,S.jsx)(i,{type:`body`,children:`#4821 - main @ 03536f1`})]})]})})})]})}},D={render:()=>{let[e,t]=(0,x.useState)(null),n=w.find(t=>t.id===e);return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(u,{gap:1,children:w.map(e=>(0,S.jsx)(a,{variant:`ghost`,label:`${e.id} / ${e.region}`,onClick:()=>t(e.id)},e.id))}),(0,S.jsx)(b,{isOpen:n!=null,onOpenChange:e=>!e&&t(null),label:n?`Host details: ${n.id}`:`Host details`,modality:`nonModal`,width:360,children:n!=null&&(0,S.jsx)(p,{padding:4,children:(0,S.jsxs)(u,{gap:4,children:[(0,S.jsxs)(u,{gap:1,children:[(0,S.jsx)(l,{level:3,children:n.id}),(0,S.jsx)(i,{type:`supporting`,color:`secondary`,children:n.region})]}),(0,S.jsx)(s,{}),(0,S.jsxs)(u,{gap:2,children:[(0,S.jsx)(i,{type:`label`,children:`Status`}),(0,S.jsx)(i,{type:`body`,children:n.status}),(0,S.jsx)(i,{type:`label`,children:`CPU`}),(0,S.jsx)(i,{type:`body`,children:n.cpu})]}),(0,S.jsx)(a,{label:`Close inspector`,variant:`secondary`,onClick:()=>t(null)})]})})})]})}},O={render:()=>{let e=(0,x.useRef)(null),[t,n]=(0,x.useState)(null),r=w.find(e=>e.id===t);return(0,S.jsxs)(u,{gap:3,children:[(0,S.jsx)(i,{type:`supporting`,color:`secondary`,children:`The drawer is bound to the bordered pane. Everything outside it stays interactive while the drawer is open.`}),(0,S.jsx)(`div`,{ref:e,style:{position:`relative`,overflow:`hidden`,height:300,border:`1px solid var(--color-border)`,borderRadius:`var(--radius-md)`},children:(0,S.jsx)(p,{padding:4,children:(0,S.jsxs)(u,{gap:1,children:[(0,S.jsx)(l,{level:3,children:`Hosts`}),w.map(e=>(0,S.jsx)(a,{variant:`ghost`,label:`${e.id} / ${e.region}`,onClick:()=>n(e.id)},e.id))]})})}),(0,S.jsx)(a,{label:`Still clickable while the drawer is open`,variant:`secondary`}),(0,S.jsx)(b,{isOpen:r!=null,onOpenChange:e=>!e&&n(null),label:r?`Host details: ${r.id}`:`Host details`,containerRef:e,width:260,children:r!=null&&(0,S.jsx)(p,{padding:4,children:(0,S.jsxs)(u,{gap:4,children:[(0,S.jsxs)(u,{gap:1,children:[(0,S.jsx)(l,{level:3,children:r.id}),(0,S.jsx)(i,{type:`supporting`,color:`secondary`,children:r.region})]}),(0,S.jsx)(s,{}),(0,S.jsxs)(u,{gap:2,children:[(0,S.jsx)(i,{type:`label`,children:`Status`}),(0,S.jsx)(i,{type:`body`,children:r.status}),(0,S.jsx)(i,{type:`label`,children:`CPU`}),(0,S.jsx)(i,{type:`body`,children:r.cpu})]})]})})})]})}},k={name:`Bounded in a scrolling pane`,render:()=>{let e=(0,x.useRef)(null),[t,n]=(0,x.useState)(null),r=w.find(e=>e.id===t),o=[...w,...w,...w,...w];return(0,S.jsxs)(u,{gap:3,children:[(0,S.jsx)(i,{type:`supporting`,color:`secondary`,children:`Open the drawer, then scroll the pane behind it. The panel stays put.`}),(0,S.jsx)(`div`,{ref:e,style:{position:`relative`,overflow:`auto`,height:300,border:`1px solid var(--color-border)`,borderRadius:`var(--radius-md)`},children:(0,S.jsx)(p,{padding:4,children:(0,S.jsxs)(u,{gap:1,children:[(0,S.jsx)(l,{level:3,children:`Hosts`}),o.map((e,t)=>(0,S.jsx)(a,{variant:`ghost`,label:`${e.id} / ${e.region}`,onClick:()=>n(e.id)},`${e.id}-${t}`))]})})}),(0,S.jsx)(a,{label:`Still clickable while the drawer is open`,variant:`secondary`}),(0,S.jsx)(b,{isOpen:r!=null,onOpenChange:e=>!e&&n(null),label:r?`Host details: ${r.id}`:`Host details`,containerRef:e,width:260,children:r!=null&&(0,S.jsx)(p,{padding:4,children:(0,S.jsxs)(u,{gap:2,children:[(0,S.jsx)(l,{level:3,children:r.id}),(0,S.jsx)(i,{type:`body`,children:r.region}),(0,S.jsx)(s,{}),(0,S.jsx)(i,{type:`label`,children:`Status`}),(0,S.jsx)(i,{type:`body`,children:r.status})]})})})]})}},A={render:()=>{let[e,t]=(0,x.useState)(null);return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsxs)(d,{gap:2,children:[(0,S.jsx)(a,{label:`Open from start`,onClick:()=>t(`start`)}),(0,S.jsx)(a,{label:`Open from end`,onClick:()=>t(`end`)})]}),(0,S.jsx)(b,{isOpen:e!=null,onOpenChange:e=>!e&&t(null),label:`Filters (${e??`end`})`,side:e??`end`,children:(0,S.jsx)(p,{padding:4,children:(0,S.jsxs)(u,{gap:4,children:[(0,S.jsx)(l,{level:3,children:`Filter by region`}),(0,S.jsxs)(i,{type:`supporting`,color:`secondary`,children:[`Sliding in from the `,e,` edge.`]})]})})})]})}},j={render:()=>{let[e,t]=(0,x.useState)(null);return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsxs)(d,{gap:2,children:[(0,S.jsx)(a,{label:`320px`,onClick:()=>t(320)}),(0,S.jsx)(a,{label:`480px`,onClick:()=>t(480)}),(0,S.jsx)(a,{label:`50%`,onClick:()=>t(`50%`)})]}),(0,S.jsx)(b,{isOpen:e!=null,onOpenChange:e=>!e&&t(null),label:`Details`,width:e??400,children:(0,S.jsx)(p,{padding:4,children:(0,S.jsxs)(u,{gap:4,children:[(0,S.jsx)(l,{level:3,children:`web-prod-04`}),(0,S.jsxs)(i,{type:`body`,children:[`Desktop width budget: `,String(e)]})]})})})]})}},M={render:()=>{let[e,t]=(0,x.useState)(!1),[n,r]=(0,x.useState)(!1),[o,s]=(0,x.useState)(T.slice(0,1)),c=(0,S.jsx)(p,{padding:4,children:(0,S.jsxs)(u,{gap:4,children:[(0,S.jsxs)(u,{gap:1,children:[(0,S.jsx)(l,{level:3,children:`Filter by region`}),(0,S.jsxs)(i,{type:`supporting`,color:`secondary`,children:[`Showing hosts in `,o.length,` of `,T.length,` regions`]})]}),(0,S.jsx)(u,{gap:2,children:T.map(e=>(0,S.jsx)(_,{label:e,value:o.includes(e),onChange:t=>s(n=>t?[...n,e]:n.filter(t=>t!==e))},e))}),(0,S.jsx)(a,{label:`Apply filters`,onClick:()=>{t(!1),r(!1)},"data-autofocus":!0})]})});return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsxs)(d,{gap:2,children:[(0,S.jsx)(a,{label:`56px reveal on mobile`,onClick:()=>r(!0)}),(0,S.jsx)(a,{label:`Full width on mobile`,variant:`secondary`,onClick:()=>t(!0)})]}),(0,S.jsx)(b,{isOpen:n,onOpenChange:r,label:`Region filters`,children:c}),(0,S.jsx)(b,{isOpen:e,onOpenChange:t,label:`Region filters (full width)`,isFullWidthOnMobile:!0,children:c})]})}},N={render:()=>{let[e,t]=(0,x.useState)(!1);return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsxs)(u,{gap:3,children:[(0,S.jsx)(a,{label:e?`Close drawer`:`Open drawer`,onClick:()=>t(e=>!e)}),(0,S.jsx)(l,{level:3,children:`Deployment log`}),[`The page keeps its full width while the drawer is open.`,`No column reflows, no content jumps, nothing is pushed aside.`,`The drawer is painted on top and the layout underneath is`,`untouched — which is exactly what a docked panel would not do.`].map(e=>(0,S.jsx)(i,{type:`body`,children:e},e))]}),(0,S.jsx)(b,{isOpen:e,onOpenChange:t,label:`Deployment details`,modality:`nonModal`,children:(0,S.jsx)(p,{padding:4,children:(0,S.jsxs)(u,{gap:4,children:[(0,S.jsx)(l,{level:3,children:`web-prod-04`}),(0,S.jsx)(i,{type:`supporting`,color:`secondary`,children:`Floating above the page, not docked beside it.`})]})})})]})}},P={render:()=>{let[e,t]=(0,x.useState)(null),n=e?.startsWith(`modal-`)??!0,r=e?.endsWith(`-scrim`)??!0;return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsxs)(u,{gap:3,children:[(0,S.jsxs)(d,{gap:2,wrap:`wrap`,children:[(0,S.jsx)(a,{label:`Modal + scrim`,onClick:()=>t(`modal-scrim`)}),(0,S.jsx)(a,{label:`Modal + clear`,variant:`secondary`,onClick:()=>t(`modal-clear`)}),(0,S.jsx)(a,{label:`Non-modal + scrim`,variant:`secondary`,onClick:()=>t(`nonmodal-scrim`)}),(0,S.jsx)(a,{label:`Non-modal + clear`,variant:`secondary`,onClick:()=>t(`nonmodal-clear`)})]}),(0,S.jsx)(i,{type:`supporting`,color:`secondary`,children:`Scope, enforcement and paint are independent: containerRef chooses where, modality chooses blocking, and hasScrim chooses dimming.`})]}),(0,S.jsx)(b,{isOpen:e!=null,onOpenChange:e=>!e&&t(null),label:`Drawer axis combination`,modality:n?`modal`:`nonModal`,hasScrim:r,children:(0,S.jsx)(p,{padding:4,children:(0,S.jsxs)(u,{gap:4,children:[(0,S.jsx)(l,{level:3,children:n?`Modal`:`Non-modal`}),(0,S.jsxs)(i,{type:`body`,children:[r?`Scrim painted.`:`No scrim painted.`,` `,n?`The area behind is blocked.`:`The area behind remains interactive.`]})]})})})]})}},F={render:()=>{let[e,t]=(0,x.useState)(0),n=[1,2,3];return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsxs)(u,{gap:3,children:[(0,S.jsx)(a,{label:`Open level 1`,onClick:()=>t(1)}),(0,S.jsx)(i,{type:`supporting`,color:`secondary`,children:`Open another level from inside the drawer to see the stack fan back.`})]}),n.map(r=>(0,S.jsx)(b,{isOpen:e>=r,onOpenChange:e=>!e&&t(r-1),label:`Level ${r}`,width:360,children:(0,S.jsx)(p,{padding:4,children:(0,S.jsxs)(u,{gap:4,children:[(0,S.jsxs)(l,{level:3,children:[`Level `,r]}),(0,S.jsx)(i,{type:`body`,children:r<n.length?`Open the next level: this panel stays visible behind it.`:`The deepest level. Close it to bring the one behind forward.`}),r<n.length&&(0,S.jsx)(a,{label:`Open level ${r+1}`,onClick:()=>t(r+1)})]})})},r))]})}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <Button label="Open inspector" onClick={() => setIsOpen(true)} />
        <Drawer isOpen={isOpen} onOpenChange={setIsOpen} label="Deployment details" width={400}>
          <Section padding={4}>
            <VStack gap={4}>
              <VStack gap={1}>
                <Heading level={3}>web-prod-04</Heading>
                <Text type="supporting" color="secondary">
                  us-east-1, deployed 12 min ago
                </Text>
              </VStack>
              <Divider />
              <VStack gap={2}>
                <Text type="label">Status</Text>
                <Text type="body">
                  Healthy - all 6 instances passing readiness checks.
                </Text>
              </VStack>
              <VStack gap={2}>
                <Text type="label">Build</Text>
                <Text type="body">#4821 - main @ 03536f1</Text>
              </VStack>
            </VStack>
          </Section>
        </Drawer>
      </>;
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const selected = HOSTS.find(host => host.id === selectedId);
    return <>
        <VStack gap={1}>
          {HOSTS.map(host => <Button key={host.id} variant="ghost" label={\`\${host.id} / \${host.region}\`} onClick={() => setSelectedId(host.id)} />)}
        </VStack>
        <Drawer isOpen={selected != null} onOpenChange={isOpen => !isOpen && setSelectedId(null)} label={selected ? \`Host details: \${selected.id}\` : 'Host details'} modality="nonModal" width={360}>
          {selected != null && <Section padding={4}>
              <VStack gap={4}>
                <VStack gap={1}>
                  <Heading level={3}>{selected.id}</Heading>
                  <Text type="supporting" color="secondary">
                    {selected.region}
                  </Text>
                </VStack>
                <Divider />
                <VStack gap={2}>
                  <Text type="label">Status</Text>
                  <Text type="body">{selected.status}</Text>
                  <Text type="label">CPU</Text>
                  <Text type="body">{selected.cpu}</Text>
                </VStack>
                <Button label="Close inspector" variant="secondary" onClick={() => setSelectedId(null)} />
              </VStack>
            </Section>}
        </Drawer>
      </>;
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => {
    const paneRef = useRef<HTMLDivElement>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const selected = HOSTS.find(host => host.id === selectedId);
    return <VStack gap={3}>
        <Text type="supporting" color="secondary">
          The drawer is bound to the bordered pane. Everything outside it stays
          interactive while the drawer is open.
        </Text>
        <div ref={paneRef} style={{
        position: 'relative',
        overflow: 'hidden',
        height: 300,
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)'
      }}>
          <Section padding={4}>
            <VStack gap={1}>
              <Heading level={3}>Hosts</Heading>
              {HOSTS.map(host => <Button key={host.id} variant="ghost" label={\`\${host.id} / \${host.region}\`} onClick={() => setSelectedId(host.id)} />)}
            </VStack>
          </Section>
        </div>
        <Button label="Still clickable while the drawer is open" variant="secondary" />
        <Drawer isOpen={selected != null} onOpenChange={isOpen => !isOpen && setSelectedId(null)} label={selected ? \`Host details: \${selected.id}\` : 'Host details'} containerRef={paneRef} width={260}>
          {selected != null && <Section padding={4}>
              <VStack gap={4}>
                <VStack gap={1}>
                  <Heading level={3}>{selected.id}</Heading>
                  <Text type="supporting" color="secondary">
                    {selected.region}
                  </Text>
                </VStack>
                <Divider />
                <VStack gap={2}>
                  <Text type="label">Status</Text>
                  <Text type="body">{selected.status}</Text>
                  <Text type="label">CPU</Text>
                  <Text type="body">{selected.cpu}</Text>
                </VStack>
              </VStack>
            </Section>}
        </Drawer>
      </VStack>;
  }
}`,...O.parameters?.docs?.source},description:{story:"`containerRef` binds the drawer to an element instead of the viewport: the\npanel slides against the pane's edge, at the pane's height, and its scrim\ndims only that pane. `modality` then applies to the pane rather than the\npage — the pane is `inert` while the drawer is open, and the rest of the\npage stays live. The mechanism differs because the browser top layer is\nalways viewport-sized, so a bounded modal is not `aria-modal` and does not\nlock body scroll. Give the container `position: relative`.",...O.parameters?.docs?.description}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: 'Bounded in a scrolling pane',
  render: () => {
    const paneRef = useRef<HTMLDivElement>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const selected = HOSTS.find(host => host.id === selectedId);
    // Enough rows that the pane genuinely scrolls.
    const rows = [...HOSTS, ...HOSTS, ...HOSTS, ...HOSTS];
    return <VStack gap={3}>
        <Text type="supporting" color="secondary">
          Open the drawer, then scroll the pane behind it. The panel stays put.
        </Text>
        <div ref={paneRef} style={{
        position: 'relative',
        overflow: 'auto',
        height: 300,
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)'
      }}>
          <Section padding={4}>
            <VStack gap={1}>
              <Heading level={3}>Hosts</Heading>
              {rows.map((host, index) => <Button key={\`\${host.id}-\${index}\`} variant="ghost" label={\`\${host.id} / \${host.region}\`} onClick={() => setSelectedId(host.id)} />)}
            </VStack>
          </Section>
        </div>
        <Button label="Still clickable while the drawer is open" variant="secondary" />
        <Drawer isOpen={selected != null} onOpenChange={isOpen => !isOpen && setSelectedId(null)} label={selected ? \`Host details: \${selected.id}\` : 'Host details'} containerRef={paneRef} width={260}>
          {selected != null && <Section padding={4}>
              <VStack gap={2}>
                <Heading level={3}>{selected.id}</Heading>
                <Text type="body">{selected.region}</Text>
                <Divider />
                <Text type="label">Status</Text>
                <Text type="body">{selected.status}</Text>
              </VStack>
            </Section>}
        </Drawer>
      </VStack>;
  }
}`,...k.parameters?.docs?.source},description:{story:`A bounded drawer in a pane that SCROLLS. The panel is pinned to the pane's
scrollport, so scrolling the host list moves the list and leaves the
inspector where it is — an absolutely positioned child would ride the
content out of view instead. With the scrim up, the list behind it is
\`inert\`: it cannot be clicked, and it cannot be tabbed into either.`,...k.parameters?.docs?.description}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [side, setSide] = useState<'start' | 'end' | null>(null);
    return <>
        <HStack gap={2}>
          <Button label="Open from start" onClick={() => setSide('start')} />
          <Button label="Open from end" onClick={() => setSide('end')} />
        </HStack>
        <Drawer isOpen={side != null} onOpenChange={isOpen => !isOpen && setSide(null)} label={\`Filters (\${side ?? 'end'})\`} side={side ?? 'end'}>
          <Section padding={4}>
            <VStack gap={4}>
              <Heading level={3}>Filter by region</Heading>
              <Text type="supporting" color="secondary">
                Sliding in from the {side} edge.
              </Text>
            </VStack>
          </Section>
        </Drawer>
      </>;
  }
}`,...A.parameters?.docs?.source},description:{story:'Both edges. `side="start"` is left in LTR (and right in RTL) — use it for\nnavigation-adjacent content; `end` is the inspector convention.',...A.parameters?.docs?.description}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [width, setWidth] = useState<number | string | null>(null);
    return <>
        <HStack gap={2}>
          <Button label="320px" onClick={() => setWidth(320)} />
          <Button label="480px" onClick={() => setWidth(480)} />
          <Button label="50%" onClick={() => setWidth('50%')} />
        </HStack>
        <Drawer isOpen={width != null} onOpenChange={isOpen => !isOpen && setWidth(null)} label="Details" width={width ?? 400}>
          <Section padding={4}>
            <VStack gap={4}>
              <Heading level={3}>web-prod-04</Heading>
              <Text type="body">Desktop width budget: {String(width)}</Text>
            </VStack>
          </Section>
        </Drawer>
      </>;
  }
}`,...j.parameters?.docs?.source},description:{story:`\`width\` is the desktop budget: a number of pixels or any CSS length.
Narrow the browser below 640px: each width remains an upper bound while
the drawer preserves a 56px reveal of the page behind.`,...j.parameters?.docs?.description}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [openFull, setOpenFull] = useState(false);
    const [openPartial, setOpenPartial] = useState(false);
    const [selected, setSelected] = useState<string[]>(REGIONS.slice(0, 1));
    const filters = <Section padding={4}>
        <VStack gap={4}>
          <VStack gap={1}>
            <Heading level={3}>Filter by region</Heading>
            <Text type="supporting" color="secondary">
              Showing hosts in {selected.length} of {REGIONS.length} regions
            </Text>
          </VStack>
          <VStack gap={2}>
            {REGIONS.map(region => <CheckboxInput key={region} label={region} value={selected.includes(region)} onChange={checked => setSelected(current => checked ? [...current, region] : current.filter(r => r !== region))} />)}
          </VStack>
          <Button label="Apply filters" onClick={() => {
          setOpenFull(false);
          setOpenPartial(false);
        }} data-autofocus />
        </VStack>
      </Section>;
    return <>
        <HStack gap={2}>
          <Button label="56px reveal on mobile" onClick={() => setOpenPartial(true)} />
          <Button label="Full width on mobile" variant="secondary" onClick={() => setOpenFull(true)} />
        </HStack>
        <Drawer isOpen={openPartial} onOpenChange={setOpenPartial} label="Region filters">
          {filters}
        </Drawer>
        <Drawer isOpen={openFull} onOpenChange={setOpenFull} label="Region filters (full width)" isFullWidthOnMobile>
          {filters}
        </Drawer>
      </>;
  }
}`,...M.parameters?.docs?.source},description:{story:`On touch viewports (below 640px) the drawer preserves a 56px reveal of the
page behind without exceeding its width budget; \`isFullWidthOnMobile\` makes
it edge to edge. Resize the preview below 640px to compare.`,...M.parameters?.docs?.description}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <VStack gap={3}>
          <Button label={isOpen ? 'Close drawer' : 'Open drawer'} onClick={() => setIsOpen(open => !open)} />
          <Heading level={3}>Deployment log</Heading>
          {['The page keeps its full width while the drawer is open.', 'No column reflows, no content jumps, nothing is pushed aside.', 'The drawer is painted on top and the layout underneath is', 'untouched — which is exactly what a docked panel would not do.'].map(line => <Text key={line} type="body">
              {line}
            </Text>)}
        </VStack>
        <Drawer isOpen={isOpen} onOpenChange={setIsOpen} label="Deployment details" modality="nonModal">
          <Section padding={4}>
            <VStack gap={4}>
              <Heading level={3}>web-prod-04</Heading>
              <Text type="supporting" color="secondary">
                Floating above the page, not docked beside it.
              </Text>
            </VStack>
          </Section>
        </Drawer>
      </>;
  }
}`,...N.parameters?.docs?.source},description:{story:`A drawer floats above the page: the content underneath keeps its layout
and never reflows to make room, which is the difference between a drawer
and a docked panel. Compare the text column with the drawer open and
closed — nothing behind it moves.`,...N.parameters?.docs?.description}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => {
    type Combination = 'modal-scrim' | 'modal-clear' | 'nonmodal-scrim' | 'nonmodal-clear';
    const [combination, setCombination] = useState<Combination | null>(null);
    const blocksBehind = combination?.startsWith('modal-') ?? true;
    const hasScrim = combination?.endsWith('-scrim') ?? true;
    return <>
        <VStack gap={3}>
          <HStack gap={2} wrap="wrap">
            <Button label="Modal + scrim" onClick={() => setCombination('modal-scrim')} />
            <Button label="Modal + clear" variant="secondary" onClick={() => setCombination('modal-clear')} />
            <Button label="Non-modal + scrim" variant="secondary" onClick={() => setCombination('nonmodal-scrim')} />
            <Button label="Non-modal + clear" variant="secondary" onClick={() => setCombination('nonmodal-clear')} />
          </HStack>
          <Text type="supporting" color="secondary">
            Scope, enforcement and paint are independent: containerRef chooses
            where, modality chooses blocking, and hasScrim chooses dimming.
          </Text>
        </VStack>
        <Drawer isOpen={combination != null} onOpenChange={isOpen => !isOpen && setCombination(null)} label="Drawer axis combination" modality={blocksBehind ? 'modal' : 'nonModal'} hasScrim={hasScrim}>
          <Section padding={4}>
            <VStack gap={4}>
              <Heading level={3}>
                {blocksBehind ? 'Modal' : 'Non-modal'}
              </Heading>
              <Text type="body">
                {hasScrim ? 'Scrim painted.' : 'No scrim painted.'}{' '}
                {blocksBehind ? 'The area behind is blocked.' : 'The area behind remains interactive.'}
              </Text>
            </VStack>
          </Section>
        </Drawer>
      </>;
  }
}`,...P.parameters?.docs?.source},description:{story:"`modality` controls interaction; `hasScrim` controls paint. Their defaults\nmatch, while all four combinations remain available for future products.\nA non-modal scrim is visual only and does not intercept the page behind it.",...P.parameters?.docs?.description}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [depth, setDepth] = useState(0);
    const levels = [1, 2, 3];
    return <>
        <VStack gap={3}>
          <Button label="Open level 1" onClick={() => setDepth(1)} />
          <Text type="supporting" color="secondary">
            Open another level from inside the drawer to see the stack fan back.
          </Text>
        </VStack>
        {levels.map(level => <Drawer key={level} isOpen={depth >= level} onOpenChange={isOpen => !isOpen && setDepth(level - 1)} label={\`Level \${level}\`} width={360}>
            <Section padding={4}>
              <VStack gap={4}>
                <Heading level={3}>Level {level}</Heading>
                <Text type="body">
                  {level < levels.length ? 'Open the next level: this panel stays visible behind it.' : 'The deepest level. Close it to bring the one behind forward.'}
                </Text>
                {level < levels.length && <Button label={\`Open level \${level + 1}\`} onClick={() => setDepth(level + 1)} />}
              </VStack>
            </Section>
          </Drawer>)}
      </>;
  }
}`,...F.parameters?.docs?.source},description:{story:"Sibling drawers stack last-opened-on-top, and a buried drawer recedes: it\nwithdraws toward its own edge and shrinks a little per level, so the stack\nreads as layered pages with each leading edge still visible. The user can\nsee what they came from and how deep they are.\n\nDepth comes from the drawer stack itself, so this works with the documented\nsibling pattern — no nesting. Retune the geometry on the theme\n(`--drawer-stack-peek`, `--drawer-stack-scale-step`,\n`--drawer-stack-min-scale`, `--drawer-stack-radius`), or set\n`hasStackRecede={false}` to keep a panel at rest.",...F.parameters?.docs?.description}}},I=[`Showcase`,`RowInspector`,`Bounded`,`BoundedInAScrollingPane`,`Sides`,`Widths`,`MobileWidth`,`FloatsOverContent`,`Scrim`,`NestedStack`]}))();export{O as Bounded,k as BoundedInAScrollingPane,N as FloatsOverContent,M as MobileWidth,F as NestedStack,D as RowInspector,P as Scrim,E as Showcase,A as Sides,j as Widths,I as __namedExportsOrder,C as default};