/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const j = globalThis, ot = j.ShadowRoot && (j.ShadyCSS === void 0 || j.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, rt = Symbol(), ut = /* @__PURE__ */ new WeakMap();
let At = class {
  constructor(t, e, o) {
    if (this._$cssResult$ = !0, o !== rt)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (ot && t === void 0) {
      const o = e !== void 0 && e.length === 1;
      o && (t = ut.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), o && ut.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Nt = (s) => new At(typeof s == "string" ? s : s + "", void 0, rt), it = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((o, r, i) => o + ((n) => {
    if (n._$cssResult$ === !0)
      return n.cssText;
    if (typeof n == "number")
      return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + s[i + 1], s[0]);
  return new At(e, s, rt);
}, Rt = (s, t) => {
  if (ot)
    s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else
    for (const e of t) {
      const o = document.createElement("style"), r = j.litNonce;
      r !== void 0 && o.setAttribute("nonce", r), o.textContent = e.cssText, s.appendChild(o);
    }
}, pt = ot ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const o of t.cssRules)
    e += o.cssText;
  return Nt(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ht, defineProperty: Dt, getOwnPropertyDescriptor: Bt, getOwnPropertyNames: Wt, getOwnPropertySymbols: Vt, getPrototypeOf: jt } = Object, X = globalThis, dt = X.trustedTypes, zt = dt ? dt.emptyScript : "", qt = X.reactiveElementPolyfillSupport, N = (s, t) => s, q = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? zt : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, nt = (s, t) => !Ht(s, t), ft = { attribute: !0, type: String, converter: q, reflect: !1, hasChanged: nt };
Symbol.metadata ??= Symbol("metadata"), X.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
class k extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ft) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.elementProperties.set(t, e), !e.noAccessor) {
      const o = Symbol(), r = this.getPropertyDescriptor(t, o, e);
      r !== void 0 && Dt(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, o) {
    const { get: r, set: i } = Bt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get() {
      return r?.call(this);
    }, set(n) {
      const l = r?.call(this);
      i.call(this, n), this.requestUpdate(t, l, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ft;
  }
  static _$Ei() {
    if (this.hasOwnProperty(N("elementProperties")))
      return;
    const t = jt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(N("finalized")))
      return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(N("properties"))) {
      const e = this.properties, o = [...Wt(e), ...Vt(e)];
      for (const r of o)
        this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0)
        for (const [o, r] of e)
          this.elementProperties.set(o, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, o] of this.elementProperties) {
      const r = this._$Eu(e, o);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const o = new Set(t.flat(1 / 0).reverse());
      for (const r of o)
        e.unshift(pt(r));
    } else
      t !== void 0 && e.push(pt(t));
    return e;
  }
  static _$Eu(t, e) {
    const o = e.attribute;
    return o === !1 ? void 0 : typeof o == "string" ? o : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$Eg = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$ES(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$E_ ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$E_?.delete(t);
  }
  _$ES() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const o of e.keys())
      this.hasOwnProperty(o) && (t.set(o, this[o]), delete this[o]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Rt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$E_?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$E_?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, o) {
    this._$AK(t, o);
  }
  _$EO(t, e) {
    const o = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, o);
    if (r !== void 0 && o.reflect === !0) {
      const i = (o.converter?.toAttribute !== void 0 ? o.converter : q).toAttribute(e, o.type);
      this._$Em = t, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const o = this.constructor, r = o._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const i = o.getPropertyOptions(r), n = typeof i.converter == "function" ? { fromAttribute: i.converter } : i.converter?.fromAttribute !== void 0 ? i.converter : q;
      this._$Em = r, this[r] = n.fromAttribute(e, i.type), this._$Em = null;
    }
  }
  requestUpdate(t, e, o, r = !1, i) {
    if (t !== void 0) {
      if (o ??= this.constructor.getPropertyOptions(t), !(o.hasChanged ?? nt)(r ? i : this[t], e))
        return;
      this.C(t, e, o);
    }
    this.isUpdatePending === !1 && (this._$Eg = this._$EP());
  }
  C(t, e, o) {
    this._$AL.has(t) || this._$AL.set(t, e), o.reflect === !0 && this._$Em !== t && (this._$Ej ??= /* @__PURE__ */ new Set()).add(t);
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$Eg;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending)
      return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [r, i] of this._$Ep)
          this[r] = i;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0)
        for (const [r, i] of o)
          i.wrapped !== !0 || this._$AL.has(r) || this[r] === void 0 || this.C(r, this[r], i);
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$E_?.forEach((o) => o.hostUpdate?.()), this.update(e)) : this._$ET();
    } catch (o) {
      throw t = !1, this._$ET(), o;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$E_?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$ET() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$Eg;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Ej &&= this._$Ej.forEach((e) => this._$EO(e, this[e])), this._$ET();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
k.elementStyles = [], k.shadowRootOptions = { mode: "open" }, k[N("elementProperties")] = /* @__PURE__ */ new Map(), k[N("finalized")] = /* @__PURE__ */ new Map(), qt?.({ ReactiveElement: k }), (X.reactiveElementVersions ??= []).push("2.0.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const at = globalThis, F = at.trustedTypes, mt = F ? F.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Et = "$lit$", v = `lit$${(Math.random() + "").slice(9)}$`, St = "?" + v, Ft = `<${St}>`, U = document, R = () => U.createComment(""), H = (s) => s === null || typeof s != "object" && typeof s != "function", Ut = Array.isArray, Xt = (s) => Ut(s) || typeof s?.[Symbol.iterator] == "function", Y = `[ 	
\f\r]`, x = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, gt = /-->/g, $t = />/g, E = RegExp(`>|${Y}(?:([^\\s"'>=/]+)(${Y}*=${Y}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), bt = /'/g, yt = /"/g, Ct = /^(?:script|style|textarea|title)$/i, Jt = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), f = Jt(1), I = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), _t = /* @__PURE__ */ new WeakMap(), S = U.createTreeWalker(U, 129);
function Pt(s, t) {
  if (!Array.isArray(s) || !s.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return mt !== void 0 ? mt.createHTML(t) : t;
}
const Kt = (s, t) => {
  const e = s.length - 1, o = [];
  let r, i = t === 2 ? "<svg>" : "", n = x;
  for (let l = 0; l < e; l++) {
    const a = s[l];
    let p, d, h = -1, y = 0;
    for (; y < a.length && (n.lastIndex = y, d = n.exec(a), d !== null); )
      y = n.lastIndex, n === x ? d[1] === "!--" ? n = gt : d[1] !== void 0 ? n = $t : d[2] !== void 0 ? (Ct.test(d[2]) && (r = RegExp("</" + d[2], "g")), n = E) : d[3] !== void 0 && (n = E) : n === E ? d[0] === ">" ? (n = r ?? x, h = -1) : d[1] === void 0 ? h = -2 : (h = n.lastIndex - d[2].length, p = d[1], n = d[3] === void 0 ? E : d[3] === '"' ? yt : bt) : n === yt || n === bt ? n = E : n === gt || n === $t ? n = x : (n = E, r = void 0);
    const _ = n === E && s[l + 1].startsWith("/>") ? " " : "";
    i += n === x ? a + Ft : h >= 0 ? (o.push(p), a.slice(0, h) + Et + a.slice(h) + v + _) : a + v + (h === -2 ? l : _);
  }
  return [Pt(s, i + (s[e] || "<?>") + (t === 2 ? "</svg>" : "")), o];
};
class D {
  constructor({ strings: t, _$litType$: e }, o) {
    let r;
    this.parts = [];
    let i = 0, n = 0;
    const l = t.length - 1, a = this.parts, [p, d] = Kt(t, e);
    if (this.el = D.createElement(p, o), S.currentNode = this.el.content, e === 2) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (r = S.nextNode()) !== null && a.length < l; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes())
          for (const h of r.getAttributeNames())
            if (h.endsWith(Et)) {
              const y = d[n++], _ = r.getAttribute(h).split(v), V = /([.?@])?(.*)/.exec(y);
              a.push({ type: 1, index: i, name: V[2], strings: _, ctor: V[1] === "." ? Zt : V[1] === "?" ? Yt : V[1] === "@" ? Qt : J }), r.removeAttribute(h);
            } else
              h.startsWith(v) && (a.push({ type: 6, index: i }), r.removeAttribute(h));
        if (Ct.test(r.tagName)) {
          const h = r.textContent.split(v), y = h.length - 1;
          if (y > 0) {
            r.textContent = F ? F.emptyScript : "";
            for (let _ = 0; _ < y; _++)
              r.append(h[_], R()), S.nextNode(), a.push({ type: 2, index: ++i });
            r.append(h[y], R());
          }
        }
      } else if (r.nodeType === 8)
        if (r.data === St)
          a.push({ type: 2, index: i });
        else {
          let h = -1;
          for (; (h = r.data.indexOf(v, h + 1)) !== -1; )
            a.push({ type: 7, index: i }), h += v.length - 1;
        }
      i++;
    }
  }
  static createElement(t, e) {
    const o = U.createElement("template");
    return o.innerHTML = t, o;
  }
}
function O(s, t, e = s, o) {
  if (t === I)
    return t;
  let r = o !== void 0 ? e._$Co?.[o] : e._$Cl;
  const i = H(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== i && (r?._$AO?.(!1), i === void 0 ? r = void 0 : (r = new i(s), r._$AT(s, e, o)), o !== void 0 ? (e._$Co ??= [])[o] = r : e._$Cl = r), r !== void 0 && (t = O(s, r._$AS(s, t.values), r, o)), t;
}
class Gt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: o } = this._$AD, r = (t?.creationScope ?? U).importNode(e, !0);
    S.currentNode = r;
    let i = S.nextNode(), n = 0, l = 0, a = o[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let p;
        a.type === 2 ? p = new B(i, i.nextSibling, this, t) : a.type === 1 ? p = new a.ctor(i, a.name, a.strings, this, t) : a.type === 6 && (p = new te(i, this, t)), this._$AV.push(p), a = o[++l];
      }
      n !== a?.index && (i = S.nextNode(), n++);
    }
    return S.currentNode = U, r;
  }
  p(t) {
    let e = 0;
    for (const o of this._$AV)
      o !== void 0 && (o.strings !== void 0 ? (o._$AI(t, o, e), e += o.strings.length - 2) : o._$AI(t[e])), e++;
  }
}
class B {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, o, r) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = o, this.options = r, this._$Cv = r?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = O(this, t, e), H(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== I && this._(t) : t._$litType$ !== void 0 ? this.g(t) : t.nodeType !== void 0 ? this.$(t) : Xt(t) ? this.T(t) : this._(t);
  }
  k(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  $(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.k(t));
  }
  _(t) {
    this._$AH !== u && H(this._$AH) ? this._$AA.nextSibling.data = t : this.$(U.createTextNode(t)), this._$AH = t;
  }
  g(t) {
    const { values: e, _$litType$: o } = t, r = typeof o == "number" ? this._$AC(t) : (o.el === void 0 && (o.el = D.createElement(Pt(o.h, o.h[0]), this.options)), o);
    if (this._$AH?._$AD === r)
      this._$AH.p(e);
    else {
      const i = new Gt(r, this), n = i.u(this.options);
      i.p(e), this.$(n), this._$AH = i;
    }
  }
  _$AC(t) {
    let e = _t.get(t.strings);
    return e === void 0 && _t.set(t.strings, e = new D(t)), e;
  }
  T(t) {
    Ut(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let o, r = 0;
    for (const i of t)
      r === e.length ? e.push(o = new B(this.k(R()), this.k(R()), this, this.options)) : o = e[r], o._$AI(i), r++;
    r < e.length && (this._$AR(o && o._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t && t !== this._$AB; ) {
      const o = t.nextSibling;
      t.remove(), t = o;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class J {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, o, r, i) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = i, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = u;
  }
  _$AI(t, e = this, o, r) {
    const i = this.strings;
    let n = !1;
    if (i === void 0)
      t = O(this, t, e, 0), n = !H(t) || t !== this._$AH && t !== I, n && (this._$AH = t);
    else {
      const l = t;
      let a, p;
      for (t = i[0], a = 0; a < i.length - 1; a++)
        p = O(this, l[o + a], e, a), p === I && (p = this._$AH[a]), n ||= !H(p) || p !== this._$AH[a], p === u ? t = u : t !== u && (t += (p ?? "") + i[a + 1]), this._$AH[a] = p;
    }
    n && !r && this.O(t);
  }
  O(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Zt extends J {
  constructor() {
    super(...arguments), this.type = 3;
  }
  O(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class Yt extends J {
  constructor() {
    super(...arguments), this.type = 4;
  }
  O(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class Qt extends J {
  constructor(t, e, o, r, i) {
    super(t, e, o, r, i), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = O(this, t, e, 0) ?? u) === I)
      return;
    const o = this._$AH, r = t === u && o !== u || t.capture !== o.capture || t.once !== o.once || t.passive !== o.passive, i = t !== u && (o === u || r);
    r && this.element.removeEventListener(this.name, this, o), i && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class te {
  constructor(t, e, o) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    O(this, t);
  }
}
const ee = at.litHtmlPolyfillSupport;
ee?.(D, B), (at.litHtmlVersions ??= []).push("3.1.0");
const se = (s, t, e) => {
  const o = e?.renderBefore ?? t;
  let r = o._$litPart$;
  if (r === void 0) {
    const i = e?.renderBefore ?? null;
    o._$litPart$ = r = new B(t.insertBefore(R(), i), i, void 0, e ?? {});
  }
  return r._$AI(s), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class w extends k {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = se(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return I;
  }
}
w._$litElement$ = !0, w.finalized = !0, globalThis.litElementHydrateSupport?.({ LitElement: w });
const oe = globalThis.litElementPolyfillSupport;
oe?.({ LitElement: w });
(globalThis.litElementVersions ??= []).push("4.0.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const K = (s) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(s, t);
  }) : customElements.define(s, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const re = { attribute: !0, type: String, converter: q, reflect: !1, hasChanged: nt }, ie = (s = re, t, e) => {
  const { kind: o, metadata: r } = e;
  let i = globalThis.litPropertyMetadata.get(r);
  if (i === void 0 && globalThis.litPropertyMetadata.set(r, i = /* @__PURE__ */ new Map()), i.set(e.name, s), o === "accessor") {
    const { name: n } = e;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(n, a, s);
    }, init(l) {
      return l !== void 0 && this.C(n, void 0, s), l;
    } };
  }
  if (o === "setter") {
    const { name: n } = e;
    return function(l) {
      const a = this[n];
      t.call(this, l), this.requestUpdate(n, a, s);
    };
  }
  throw Error("Unsupported decorator location: " + o);
};
function c(s) {
  return (t, e) => typeof e == "object" ? ie(s, t, e) : ((o, r, i) => {
    const n = r.hasOwnProperty(i);
    return r.constructor.createProperty(i, n ? { ...o, wrapped: !0 } : o), n ? Object.getOwnPropertyDescriptor(r, i) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function W(s) {
  return c({ ...s, state: !0, attribute: !1 });
}
const kt = () => {
  const s = "UMB-XSRF-TOKEN", t = s.length + 1;
  return document.cookie.split(";").map((e) => e.trim()).filter((e) => e.substring(0, t) === `${s}=`).map((e) => decodeURIComponent(e.substring(t)))[0] || "";
}, ne = (s) => (s.startsWith(`)]}',
`) && (s = s.split(`
`)[1]), s), G = async (s) => {
  try {
    const t = {
      headers: { "X-Requested-With": "XMLHttpRequest", "X-UMB-XSRF-TOKEN": kt() }
    };
    if (s === void 0)
      throw "missing url";
    const e = await fetch(s, t);
    if (!e.ok)
      throw new Error(`${e.status} ${e.statusText}`);
    let o = await e.text();
    o = ne(o);
    const r = JSON.parse(o);
    if (r)
      return r;
  } catch (t) {
    throw t;
  }
}, Z = () => `${window.location.origin}/umbraco`.toLowerCase();
var ae = Object.defineProperty, he = Object.getOwnPropertyDescriptor, T = (s, t, e, o) => {
  for (var r = o > 1 ? void 0 : o ? he(t, e) : t, i = s.length - 1, n; i >= 0; i--)
    (n = s[i]) && (r = (o ? n(t, e, r) : n(r)) || r);
  return o && r && ae(t, e, r), r;
};
let A = class extends w {
  constructor() {
    super(...arguments), this.buttonLook = "primary", this.buttonColor = "default", this.icon = "icon-user";
  }
  async connectedCallback() {
    super.connectedCallback(), this.isLocalLogin || (this.umbIdPasswordEndpoint = window.Umbraco?.Sys.ServerVariables.umbId.urls.password, this.umbIdProfileEndpoint = window.Umbraco?.Sys.ServerVariables.umbId.urls.profile);
  }
  render() {
    return this.isLocalLogin && this.isUmbracoIdUser ? f`
    <div>
        <p>Profile edit and password change, is not available when doing local development</p>
    </div>` : !this.isLocalLogin && this.isUmbracoIdUser ? f`
      <form method="post" name="umbIdProfileForm"
        id="umbIdProfileForm"
        action="${this.umbIdProfileEndpoint ?? ""}"
        >
        <uui-button 
        type="submit" 
        .look=${this.buttonLook}
        .color=${this.buttonColor}
        label="Edit my Umbraco ID profile">
        <uui-icon .name=${this.icon}></uui-icon> Edit my Umbraco ID profile
      </uui-button>
    </form>

    <form method="post" name="umbIdPasswordForm"
        id="umbIdPasswordForm"
        action="${this.umbIdPasswordEndpoint ?? ""}"
        >
        <uui-button 
        type="submit" 
        .look=${this.buttonLook}
        .color=${this.buttonColor}
        label="Change my Umbraco ID password">
        <uui-icon .name=${this.icon}></uui-icon> Change my Umbraco ID password
      </uui-button>
    </form>` : f`<p>Local users cant be linked to Umbraco Id</p>`;
  }
};
A.styles = [
  it`
    uui-button {
      margin: 5px;
      padding: 6px 14 px;
    }
    `
];
T([
  c()
], A.prototype, "isLocalLogin", 2);
T([
  c()
], A.prototype, "isUmbracoIdUser", 2);
T([
  c()
], A.prototype, "buttonLook", 2);
T([
  c()
], A.prototype, "buttonColor", 2);
T([
  c()
], A.prototype, "icon", 2);
A = T([
  K("umbid-backoffice")
], A);
const ce = (s) => {
  const r = window.open(s, "ConnectWithOAuth", "location=0,status=0,width=800,height=600");
  if (!r || r.closed || typeof r.closed > "u")
    throw new ht("oauth popup was blocked");
  setTimeout(() => Lt(r, 200, 0), 200);
}, Lt = async (s, t, e = 0) => {
  if (!s.closed)
    if (pe(ue(s)) && de(s) && le())
      try {
        const o = await G(`${Z()}/backoffice/umbracoapi/authentication/GetCurrentUser`), r = s.opener;
        r.dispatchEvent(new CustomEvent("umb-login-success", { bubbles: !0, composed: !0, detail: o })), s.close();
        let i = "/umbraco";
        const n = r.location.search, l = new URLSearchParams(n);
        l.has("returnPath") && (i = l.get("returnPath")), r.location.href = i;
      } catch (o) {
        o.status === 401 ? vt(s, t, e) : o.status;
      }
    else
      vt(s, t, e);
}, vt = (s, t, e) => {
  if (e > 1500)
    throw s.close(), new ht("Umbraco ID authentication has timed out");
  e++, setTimeout(() => Lt(s, t, e), t);
}, le = () => kt().length > 0, ue = (s) => {
  try {
    return s.location.href;
  } catch {
    return "";
  }
}, pe = (s) => {
  if (!s)
    return !1;
  let t = s.split("?")[0];
  return t = t.split("#")[0], t = t.endsWith("/") ? t.slice(0, -1) : t, t === Z();
}, de = (s) => {
  let t, e = !1;
  try {
    t = s.document;
  } catch {
    return !1;
  }
  return t ? (t.readyState === "complete" ? wt(t) : e || (e = !0, t.addEventListener("readystatechange", (o) => {
    t.readyState !== "loading" && wt(t);
  })), !0) : !1;
}, wt = (s) => {
  const t = s.getElementsByTagName("body")[0], e = t.children;
  for (let r = 0; r < e.length; r++)
    e.item(r).style.display = "none";
  const o = s.createElement("h4");
  o.style.margin = "20px", o.appendChild(document.createTextNode("Logged in with Umbraco Id... please wait... ")), t.appendChild(o);
};
class ht extends Error {
  constructor(t) {
    super(t), this.name = "UmbracoIdError";
  }
}
var fe = Object.defineProperty, me = Object.getOwnPropertyDescriptor, C = (s, t, e, o) => {
  for (var r = o > 1 ? void 0 : o ? me(t, e) : t, i = s.length - 1, n; i >= 0; i--)
    (n = s[i]) && (r = (o ? n(t, e, r) : n(r)) || r);
  return o && r && fe(t, e, r), r;
};
let $ = class extends w {
  constructor() {
    super(...arguments), this.displayName = "Umbraco ID", this.buttonLook = "placeholder", this.buttonColor = "default", this.icon = "icon-user", this.errorMessage = "";
  }
  _umbracoIdPopup() {
    const s = `${Z()}/backoffice/UmbracoIdChallenge/Login`;
    try {
      ce(s);
    } catch (t) {
      t instanceof ht && (this.errorMessage = t.message, this.dispatchEvent(new CustomEvent("umbid:popup:error", { bubbles: !0, composed: !0 })));
    }
  }
  render() {
    return f`
    <uui-button
      type="submit"
      name="provider"
      .value=${this.providerName}
      title=${`Login using your ${this.displayName} account`}
      .label=${"Sign in with" + this.displayName}
      .look=${this.buttonLook}
      .color=${this.buttonColor}
      @click=${this._umbracoIdPopup}>
        <uui-icon .name=${this.icon}></uui-icon>
        Sign in with
        ${this.displayName}
    </uui-button>
`;
  }
};
$.styles = [
  it`
    uui-button {
      margin: 5px;
      padding: 6px 14 px;
      width: 100%;
    }
    `
];
C([
  c()
], $.prototype, "providerName", 2);
C([
  c()
], $.prototype, "displayName", 2);
C([
  c()
], $.prototype, "buttonLook", 2);
C([
  c()
], $.prototype, "buttonColor", 2);
C([
  c()
], $.prototype, "icon", 2);
C([
  c()
], $.prototype, "errorMessage", 2);
$ = C([
  K("umbid-login-popup")
], $);
var ge = Object.defineProperty, $e = Object.getOwnPropertyDescriptor, P = (s, t, e, o) => {
  for (var r = o > 1 ? void 0 : o ? $e(t, e) : t, i = s.length - 1, n; i >= 0; i--)
    (n = s[i]) && (r = (o ? n(t, e, r) : n(r)) || r);
  return o && r && ge(t, e, r), r;
}, be = (s, t, e) => {
  if (!t.has(s))
    throw TypeError("Cannot " + e);
}, ye = (s, t, e) => {
  if (t.has(s))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(s) : t.set(s, e);
}, _e = (s, t, e) => (be(s, t, "access private method"), e), Q, It;
let b = class extends w {
  constructor() {
    super(...arguments), ye(this, Q), this.isLocalLogin = !1, this.buttonLook = "placeholder", this.buttonColor = "default", this.icon = "icon-user", this.signoutUrl = "";
  }
  async connectedCallback() {
    super.connectedCallback(), this.signoutUrl = this.isLocalLogin ? "" : await _e(this, Q, It).call(this);
  }
  render() {
    return f`
    <p>
      You have logged out of the Umbraco Backoffice.<br />
      The session in Umbraco ID with this Umbraco Backoffice is still active.
    </p>
    <p>
      We also recommend that you also log out of the session in Umbraco ID.
    </p>
    ${this.isLocalLogin === !1 ? f`
    
    <uui-button        
    .href="${this.signoutUrl}" 
    .look=${this.buttonLook} 
    .color=${this.buttonColor}
    label="Sign out of Umbraco ID session">
    <uui-icon .name=${this.icon}></uui-icon> 

    Sign out of the Umbraco ID session
    </uui-button>
    ` : u}
    <p>
      To return to the Umbraco Backoffice, <a href="/umbraco/" style="font-weight:bold">click here</a>.
    </p>
    <p>
      To return to the Umbraco Cloud Portal, <a href="https://www.s1.umbraco.io/" style="font-weight:bold">click here</a>.
    </p>
    `;
  }
};
Q = /* @__PURE__ */ new WeakSet();
It = async function() {
  try {
    const s = await G(`${Z()}/backoffice/UmbracoId/UmbracoIdBackOffice/GetSignOutUrl`);
    if (s.signOutUrl)
      return s.signOutUrl;
    throw "Failed to retrieve backoffice url";
  } catch (s) {
    this.dispatchEvent(new CustomEvent("umbid:signout:error", { composed: !0, bubbles: !0 })), this.errorMessage = s.message;
  }
};
b.styles = [
  it`
    uui-button {
      margin: 5px;
      padding: 6px 14 px;
      width: 100%;
    }
    p {
      margin: 0.8em;
    }
    `
];
P([
  c()
], b.prototype, "isLocalLogin", 2);
P([
  c()
], b.prototype, "buttonLook", 2);
P([
  c()
], b.prototype, "buttonColor", 2);
P([
  c()
], b.prototype, "icon", 2);
P([
  c()
], b.prototype, "errorMessage", 2);
P([
  W()
], b.prototype, "signoutUrl", 2);
b = P([
  K("umbid-signed-out")
], b);
var ve = Object.defineProperty, we = Object.getOwnPropertyDescriptor, g = (s, t, e, o) => {
  for (var r = o > 1 ? void 0 : o ? we(t, e) : t, i = s.length - 1, n; i >= 0; i--)
    (n = s[i]) && (r = (o ? n(t, e, r) : n(r)) || r);
  return o && r && ve(t, e, r), r;
}, Ae = (s, t, e) => {
  if (!t.has(s))
    throw TypeError("Cannot " + e);
}, M = (s, t, e) => {
  if (t.has(s))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(s) : t.set(s, e);
}, L = (s, t, e) => (Ae(s, t, "access private method"), e), z, tt, ct, Ot, et, Tt, st, xt, lt, Mt;
let m = class extends w {
  constructor() {
    super(...arguments), M(this, z), M(this, ct), M(this, et), M(this, st), M(this, lt), this.providerName = "", this.displayName = "", this.icon = "icon-user", this.userViewState = "loggingIn", this.buttonLook = "primary", this.buttonColor = "default", this.isUmbracoIdUser = !0, this.loading = !0, this.showErrors = !1, this.errorMessage = "";
  }
  async connectedCallback() {
    super.connectedCallback();
    try {
      await L(this, st, xt).call(this), this.userViewState === "loggedIn" && await L(this, et, Tt).call(this);
    } catch (s) {
      this.showErrors = !0, this.errorMessage = s.message;
    } finally {
      this.loading = !1;
    }
  }
  shouldUpdate(s) {
    return !!(s.has("userViewState") || s.has("loading"));
  }
  handleErrorEvent(s) {
    if (s.target instanceof $) {
      const t = s.target;
      this.showErrors = !0, this.errorMessage = t.errorMessage;
    }
    if (s.target instanceof b) {
      const t = s.target;
      this.showErrors = !0, this.errorMessage = t.errorMessage;
    }
  }
  render() {
    return this.loading ? f`<uui-loader-bar></uui-loader-bar>` : f`
        <div style="width:100%">
      ${this.userViewState === "loggedIn" ? f`<h3>Umbraco ID</h3>
      ${this.renderLoggedIntoBackoffice()}` : this.renderSignedOutOfBackoffice()} 
    </div> 
    ${this.showErrors ? f`
    <div class="umbraco-id-error">
    <p>${this.errorMessage}</p>
    </div>
    ` : u}
    `;
  }
  renderSignedOutOfBackoffice() {
    return this.userViewState === "loggedOut" ? f`
      <umbid-signed-out 
        .isLocalLogin=${L(this, z, tt).call(this)}
        .buttonColor=${this.buttonColor}
      .buttonLook=${this.buttonLook}
      .icon=${this.icon}
        @umbid:signout:error=${this.handleErrorEvent}
        ></umbid-signed-out>
      ` : f`
    <umbid-login-popup 
      .buttonColor=${this.buttonColor}
      .buttonLook=${this.buttonLook}
      .displayName=${this.displayName}
      .providerName=${this.providerName}
      .icon=${this.icon}
      @umbid:popup:error=${this.handleErrorEvent}
    ></umbid-login-popup>`;
  }
  renderLoggedIntoBackoffice() {
    return f`
      <umbid-backoffice
      .buttonColor=${this.buttonColor}
      .buttonLook=${this.buttonLook}
      .icon=${this.icon}
      .isLocalLogin=${L(this, z, tt).call(this)}
      .isUmbracoIdUser=${this.isUmbracoIdUser}
      ></umbid-backoffice>
      `;
  }
};
z = /* @__PURE__ */ new WeakSet();
tt = function() {
  return window.Umbraco?.Sys.ServerVariables.umbId?.isLocalLogin ?? !1;
};
ct = /* @__PURE__ */ new WeakSet();
Ot = function() {
  return window.Umbraco?.Sys.ServerVariables.umbId.authType ?? "";
};
et = /* @__PURE__ */ new WeakSet();
Tt = async function() {
  try {
    const s = await L(this, lt, Mt).call(this);
    this.isUmbracoIdUser = !1, L(this, ct, Ot).call(this) in s ? this.isUmbracoIdUser = !0 : this.isUmbracoIdUser = !1;
  } catch (s) {
    this.showErrors = !0, this.errorMessage = s.message;
  }
};
st = /* @__PURE__ */ new WeakSet();
xt = async function() {
  try {
    if (await G("/umbraco/backoffice/umbracoapi/authentication/IsAuthenticated") && this.userViewState !== "timedOut") {
      this.userViewState = "loggedIn";
      return;
    }
    const t = window.location.search, o = new URLSearchParams(t).has("returnPath");
    window.location.href.includes("/login/false") && !o && (this.userViewState = "loggingIn");
  } catch (s) {
    this.showErrors = !0, this.errorMessage = s.message;
  }
};
lt = /* @__PURE__ */ new WeakSet();
Mt = async function() {
  try {
    return await G("/umbraco/backoffice/umbracoapi/currentuser/getcurrentuserlinkedlogins");
  } catch (s) {
    this.showErrors = !0, this.errorMessage = s.message;
  }
};
g([
  c({ type: String })
], m.prototype, "providerName", 2);
g([
  c({ type: String })
], m.prototype, "displayName", 2);
g([
  c({ type: String })
], m.prototype, "externalLoginUrl", 2);
g([
  c({ type: String })
], m.prototype, "icon", 2);
g([
  c()
], m.prototype, "userViewState", 2);
g([
  c()
], m.prototype, "buttonLook", 2);
g([
  c()
], m.prototype, "buttonColor", 2);
g([
  W()
], m.prototype, "isUmbracoIdUser", 2);
g([
  W()
], m.prototype, "loading", 2);
g([
  W()
], m.prototype, "showErrors", 2);
g([
  W()
], m.prototype, "errorMessage", 2);
m = g([
  K("umbid-custom-login")
], m);
export {
  m as default
};
