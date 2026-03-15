const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f || (m.f = ['assets/Home-C9NcnHLG.js', 'assets/Home-N2z00yhN.css'])
) => i.map(i => d[i]);
var Lh = Object.defineProperty;
var $h = (e, t, n) =>
  t in e
    ? Lh(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
    : (e[t] = n);
var Zi = (e, t, n) => $h(e, typeof t != 'symbol' ? t + '' : t, n);
function Fh(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != 'string' && !Array.isArray(r)) {
      for (const o in r)
        if (o !== 'default' && !(o in e)) {
          const i = Object.getOwnPropertyDescriptor(r, o);
          i &&
            Object.defineProperty(
              e,
              o,
              i.get ? i : { enumerable: !0, get: () => r[o] }
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' })
  );
}
(function () {
  const t = document.createElement('link').relList;
  if (t && t.supports && t.supports('modulepreload')) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o);
  new MutationObserver(o => {
    for (const i of o)
      if (i.type === 'childList')
        for (const s of i.addedNodes)
          s.tagName === 'LINK' && s.rel === 'modulepreload' && r(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(o) {
    const i = {};
    return (
      o.integrity && (i.integrity = o.integrity),
      o.referrerPolicy && (i.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === 'use-credentials'
        ? (i.credentials = 'include')
        : o.crossOrigin === 'anonymous'
          ? (i.credentials = 'omit')
          : (i.credentials = 'same-origin'),
      i
    );
  }
  function r(o) {
    if (o.ep) return;
    o.ep = !0;
    const i = n(o);
    fetch(o.href, i);
  }
})();
function ql(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default')
    ? e.default
    : e;
}
var pf = { exports: {} },
  xi = {},
  hf = { exports: {} },
  A = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Qr = Symbol.for('react.element'),
  bh = Symbol.for('react.portal'),
  Dh = Symbol.for('react.fragment'),
  Ah = Symbol.for('react.strict_mode'),
  Uh = Symbol.for('react.profiler'),
  jh = Symbol.for('react.provider'),
  Ih = Symbol.for('react.context'),
  zh = Symbol.for('react.forward_ref'),
  Mh = Symbol.for('react.suspense'),
  Bh = Symbol.for('react.memo'),
  Vh = Symbol.for('react.lazy'),
  Za = Symbol.iterator;
function Kh(e) {
  return e === null || typeof e != 'object'
    ? null
    : ((e = (Za && e[Za]) || e['@@iterator']),
      typeof e == 'function' ? e : null);
}
var mf = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  gf = Object.assign,
  yf = {};
function Hn(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = yf),
    (this.updater = n || mf);
}
Hn.prototype.isReactComponent = {};
Hn.prototype.setState = function (e, t) {
  if (typeof e != 'object' && typeof e != 'function' && e != null)
    throw Error(
      'setState(...): takes an object of state variables to update or a function which returns an object of state variables.'
    );
  this.updater.enqueueSetState(this, e, t, 'setState');
};
Hn.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, 'forceUpdate');
};
function vf() {}
vf.prototype = Hn.prototype;
function Xl(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = yf),
    (this.updater = n || mf);
}
var Yl = (Xl.prototype = new vf());
Yl.constructor = Xl;
gf(Yl, Hn.prototype);
Yl.isPureReactComponent = !0;
var eu = Array.isArray,
  wf = Object.prototype.hasOwnProperty,
  Jl = { current: null },
  _f = { key: !0, ref: !0, __self: !0, __source: !0 };
function Sf(e, t, n) {
  var r,
    o = {},
    i = null,
    s = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (s = t.ref),
    t.key !== void 0 && (i = '' + t.key),
    t))
      wf.call(t, r) && !_f.hasOwnProperty(r) && (o[r] = t[r]);
  var l = arguments.length - 2;
  if (l === 1) o.children = n;
  else if (1 < l) {
    for (var a = Array(l), u = 0; u < l; u++) a[u] = arguments[u + 2];
    o.children = a;
  }
  if (e && e.defaultProps)
    for (r in ((l = e.defaultProps), l)) o[r] === void 0 && (o[r] = l[r]);
  return {
    $$typeof: Qr,
    type: e,
    key: i,
    ref: s,
    props: o,
    _owner: Jl.current,
  };
}
function Hh(e, t) {
  return {
    $$typeof: Qr,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function Gl(e) {
  return typeof e == 'object' && e !== null && e.$$typeof === Qr;
}
function Wh(e) {
  var t = { '=': '=0', ':': '=2' };
  return (
    '$' +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var tu = /\/+/g;
function es(e, t) {
  return typeof e == 'object' && e !== null && e.key != null
    ? Wh('' + e.key)
    : t.toString(36);
}
function Ro(e, t, n, r, o) {
  var i = typeof e;
  (i === 'undefined' || i === 'boolean') && (e = null);
  var s = !1;
  if (e === null) s = !0;
  else
    switch (i) {
      case 'string':
      case 'number':
        s = !0;
        break;
      case 'object':
        switch (e.$$typeof) {
          case Qr:
          case bh:
            s = !0;
        }
    }
  if (s)
    return (
      (s = e),
      (o = o(s)),
      (e = r === '' ? '.' + es(s, 0) : r),
      eu(o)
        ? ((n = ''),
          e != null && (n = e.replace(tu, '$&/') + '/'),
          Ro(o, t, n, '', function (u) {
            return u;
          }))
        : o != null &&
          (Gl(o) &&
            (o = Hh(
              o,
              n +
                (!o.key || (s && s.key === o.key)
                  ? ''
                  : ('' + o.key).replace(tu, '$&/') + '/') +
                e
            )),
          t.push(o)),
      1
    );
  if (((s = 0), (r = r === '' ? '.' : r + ':'), eu(e)))
    for (var l = 0; l < e.length; l++) {
      i = e[l];
      var a = r + es(i, l);
      s += Ro(i, t, n, a, o);
    }
  else if (((a = Kh(e)), typeof a == 'function'))
    for (e = a.call(e), l = 0; !(i = e.next()).done; )
      (i = i.value), (a = r + es(i, l++)), (s += Ro(i, t, n, a, o));
  else if (i === 'object')
    throw (
      ((t = String(e)),
      Error(
        'Objects are not valid as a React child (found: ' +
          (t === '[object Object]'
            ? 'object with keys {' + Object.keys(e).join(', ') + '}'
            : t) +
          '). If you meant to render a collection of children, use an array instead.'
      ))
    );
  return s;
}
function so(e, t, n) {
  if (e == null) return e;
  var r = [],
    o = 0;
  return (
    Ro(e, r, '', '', function (i) {
      return t.call(n, i, o++);
    }),
    r
  );
}
function Qh(e) {
  if (e._status === -1) {
    var t = e._result;
    (t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = t));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var ye = { current: null },
  Oo = { transition: null },
  qh = {
    ReactCurrentDispatcher: ye,
    ReactCurrentBatchConfig: Oo,
    ReactCurrentOwner: Jl,
  };
function kf() {
  throw Error('act(...) is not supported in production builds of React.');
}
A.Children = {
  map: so,
  forEach: function (e, t, n) {
    so(
      e,
      function () {
        t.apply(this, arguments);
      },
      n
    );
  },
  count: function (e) {
    var t = 0;
    return (
      so(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      so(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!Gl(e))
      throw Error(
        'React.Children.only expected to receive a single React element child.'
      );
    return e;
  },
};
A.Component = Hn;
A.Fragment = Dh;
A.Profiler = Uh;
A.PureComponent = Xl;
A.StrictMode = Ah;
A.Suspense = Mh;
A.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = qh;
A.act = kf;
A.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      'React.cloneElement(...): The argument must be a React element, but you passed ' +
        e +
        '.'
    );
  var r = gf({}, e.props),
    o = e.key,
    i = e.ref,
    s = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((i = t.ref), (s = Jl.current)),
      t.key !== void 0 && (o = '' + t.key),
      e.type && e.type.defaultProps)
    )
      var l = e.type.defaultProps;
    for (a in t)
      wf.call(t, a) &&
        !_f.hasOwnProperty(a) &&
        (r[a] = t[a] === void 0 && l !== void 0 ? l[a] : t[a]);
  }
  var a = arguments.length - 2;
  if (a === 1) r.children = n;
  else if (1 < a) {
    l = Array(a);
    for (var u = 0; u < a; u++) l[u] = arguments[u + 2];
    r.children = l;
  }
  return { $$typeof: Qr, type: e.type, key: o, ref: i, props: r, _owner: s };
};
A.createContext = function (e) {
  return (
    (e = {
      $$typeof: Ih,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: jh, _context: e }),
    (e.Consumer = e)
  );
};
A.createElement = Sf;
A.createFactory = function (e) {
  var t = Sf.bind(null, e);
  return (t.type = e), t;
};
A.createRef = function () {
  return { current: null };
};
A.forwardRef = function (e) {
  return { $$typeof: zh, render: e };
};
A.isValidElement = Gl;
A.lazy = function (e) {
  return { $$typeof: Vh, _payload: { _status: -1, _result: e }, _init: Qh };
};
A.memo = function (e, t) {
  return { $$typeof: Bh, type: e, compare: t === void 0 ? null : t };
};
A.startTransition = function (e) {
  var t = Oo.transition;
  Oo.transition = {};
  try {
    e();
  } finally {
    Oo.transition = t;
  }
};
A.unstable_act = kf;
A.useCallback = function (e, t) {
  return ye.current.useCallback(e, t);
};
A.useContext = function (e) {
  return ye.current.useContext(e);
};
A.useDebugValue = function () {};
A.useDeferredValue = function (e) {
  return ye.current.useDeferredValue(e);
};
A.useEffect = function (e, t) {
  return ye.current.useEffect(e, t);
};
A.useId = function () {
  return ye.current.useId();
};
A.useImperativeHandle = function (e, t, n) {
  return ye.current.useImperativeHandle(e, t, n);
};
A.useInsertionEffect = function (e, t) {
  return ye.current.useInsertionEffect(e, t);
};
A.useLayoutEffect = function (e, t) {
  return ye.current.useLayoutEffect(e, t);
};
A.useMemo = function (e, t) {
  return ye.current.useMemo(e, t);
};
A.useReducer = function (e, t, n) {
  return ye.current.useReducer(e, t, n);
};
A.useRef = function (e) {
  return ye.current.useRef(e);
};
A.useState = function (e) {
  return ye.current.useState(e);
};
A.useSyncExternalStore = function (e, t, n) {
  return ye.current.useSyncExternalStore(e, t, n);
};
A.useTransition = function () {
  return ye.current.useTransition();
};
A.version = '18.3.1';
hf.exports = A;
var P = hf.exports;
const Zl = ql(P),
  Us = Fh({ __proto__: null, default: Zl }, [P]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Xh = P,
  Yh = Symbol.for('react.element'),
  Jh = Symbol.for('react.fragment'),
  Gh = Object.prototype.hasOwnProperty,
  Zh = Xh.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  em = { key: !0, ref: !0, __self: !0, __source: !0 };
function Ef(e, t, n) {
  var r,
    o = {},
    i = null,
    s = null;
  n !== void 0 && (i = '' + n),
    t.key !== void 0 && (i = '' + t.key),
    t.ref !== void 0 && (s = t.ref);
  for (r in t) Gh.call(t, r) && !em.hasOwnProperty(r) && (o[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) o[r] === void 0 && (o[r] = t[r]);
  return {
    $$typeof: Yh,
    type: e,
    key: i,
    ref: s,
    props: o,
    _owner: Zh.current,
  };
}
xi.Fragment = Jh;
xi.jsx = Ef;
xi.jsxs = Ef;
pf.exports = xi;
var Se = pf.exports,
  xf = { exports: {} },
  Ae = {},
  Cf = { exports: {} },
  Rf = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(O, $) {
    var D = O.length;
    O.push($);
    e: for (; 0 < D; ) {
      var U = (D - 1) >>> 1,
        z = O[U];
      if (0 < o(z, $)) (O[U] = $), (O[D] = z), (D = U);
      else break e;
    }
  }
  function n(O) {
    return O.length === 0 ? null : O[0];
  }
  function r(O) {
    if (O.length === 0) return null;
    var $ = O[0],
      D = O.pop();
    if (D !== $) {
      O[0] = D;
      e: for (var U = 0, z = O.length, Ze = z >>> 1; U < Ze; ) {
        var et = 2 * (U + 1) - 1,
          hn = O[et],
          Kt = et + 1,
          io = O[Kt];
        if (0 > o(hn, D))
          Kt < z && 0 > o(io, hn)
            ? ((O[U] = io), (O[Kt] = D), (U = Kt))
            : ((O[U] = hn), (O[et] = D), (U = et));
        else if (Kt < z && 0 > o(io, D)) (O[U] = io), (O[Kt] = D), (U = Kt);
        else break e;
      }
    }
    return $;
  }
  function o(O, $) {
    var D = O.sortIndex - $.sortIndex;
    return D !== 0 ? D : O.id - $.id;
  }
  if (typeof performance == 'object' && typeof performance.now == 'function') {
    var i = performance;
    e.unstable_now = function () {
      return i.now();
    };
  } else {
    var s = Date,
      l = s.now();
    e.unstable_now = function () {
      return s.now() - l;
    };
  }
  var a = [],
    u = [],
    c = 1,
    f = null,
    p = 3,
    y = !1,
    h = !1,
    v = !1,
    w = typeof setTimeout == 'function' ? setTimeout : null,
    m = typeof clearTimeout == 'function' ? clearTimeout : null,
    d = typeof setImmediate < 'u' ? setImmediate : null;
  typeof navigator < 'u' &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function g(O) {
    for (var $ = n(u); $ !== null; ) {
      if ($.callback === null) r(u);
      else if ($.startTime <= O)
        r(u), ($.sortIndex = $.expirationTime), t(a, $);
      else break;
      $ = n(u);
    }
  }
  function _(O) {
    if (((v = !1), g(O), !h))
      if (n(a) !== null) (h = !0), _e(k);
      else {
        var $ = n(u);
        $ !== null && Ne(_, $.startTime - O);
      }
  }
  function k(O, $) {
    (h = !1), v && ((v = !1), m(x), (x = -1)), (y = !0);
    var D = p;
    try {
      for (
        g($), f = n(a);
        f !== null && (!(f.expirationTime > $) || (O && !he()));

      ) {
        var U = f.callback;
        if (typeof U == 'function') {
          (f.callback = null), (p = f.priorityLevel);
          var z = U(f.expirationTime <= $);
          ($ = e.unstable_now()),
            typeof z == 'function' ? (f.callback = z) : f === n(a) && r(a),
            g($);
        } else r(a);
        f = n(a);
      }
      if (f !== null) var Ze = !0;
      else {
        var et = n(u);
        et !== null && Ne(_, et.startTime - $), (Ze = !1);
      }
      return Ze;
    } finally {
      (f = null), (p = D), (y = !1);
    }
  }
  var C = !1,
    R = null,
    x = -1,
    L = 5,
    T = -1;
  function he() {
    return !(e.unstable_now() - T < L);
  }
  function Vt() {
    if (R !== null) {
      var O = e.unstable_now();
      T = O;
      var $ = !0;
      try {
        $ = R(!0, O);
      } finally {
        $ ? ae() : ((C = !1), (R = null));
      }
    } else C = !1;
  }
  var ae;
  if (typeof d == 'function')
    ae = function () {
      d(Vt);
    };
  else if (typeof MessageChannel < 'u') {
    var we = new MessageChannel(),
      oo = we.port2;
    (we.port1.onmessage = Vt),
      (ae = function () {
        oo.postMessage(null);
      });
  } else
    ae = function () {
      w(Vt, 0);
    };
  function _e(O) {
    (R = O), C || ((C = !0), ae());
  }
  function Ne(O, $) {
    x = w(function () {
      O(e.unstable_now());
    }, $);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (O) {
      O.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      h || y || ((h = !0), _e(k));
    }),
    (e.unstable_forceFrameRate = function (O) {
      0 > O || 125 < O
        ? console.error(
            'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
          )
        : (L = 0 < O ? Math.floor(1e3 / O) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return p;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(a);
    }),
    (e.unstable_next = function (O) {
      switch (p) {
        case 1:
        case 2:
        case 3:
          var $ = 3;
          break;
        default:
          $ = p;
      }
      var D = p;
      p = $;
      try {
        return O();
      } finally {
        p = D;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (O, $) {
      switch (O) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          O = 3;
      }
      var D = p;
      p = O;
      try {
        return $();
      } finally {
        p = D;
      }
    }),
    (e.unstable_scheduleCallback = function (O, $, D) {
      var U = e.unstable_now();
      switch (
        (typeof D == 'object' && D !== null
          ? ((D = D.delay), (D = typeof D == 'number' && 0 < D ? U + D : U))
          : (D = U),
        O)
      ) {
        case 1:
          var z = -1;
          break;
        case 2:
          z = 250;
          break;
        case 5:
          z = 1073741823;
          break;
        case 4:
          z = 1e4;
          break;
        default:
          z = 5e3;
      }
      return (
        (z = D + z),
        (O = {
          id: c++,
          callback: $,
          priorityLevel: O,
          startTime: D,
          expirationTime: z,
          sortIndex: -1,
        }),
        D > U
          ? ((O.sortIndex = D),
            t(u, O),
            n(a) === null &&
              O === n(u) &&
              (v ? (m(x), (x = -1)) : (v = !0), Ne(_, D - U)))
          : ((O.sortIndex = z), t(a, O), h || y || ((h = !0), _e(k))),
        O
      );
    }),
    (e.unstable_shouldYield = he),
    (e.unstable_wrapCallback = function (O) {
      var $ = p;
      return function () {
        var D = p;
        p = $;
        try {
          return O.apply(this, arguments);
        } finally {
          p = D;
        }
      };
    });
})(Rf);
Cf.exports = Rf;
var tm = Cf.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var nm = P,
  Fe = tm;
function E(e) {
  for (
    var t = 'https://reactjs.org/docs/error-decoder.html?invariant=' + e, n = 1;
    n < arguments.length;
    n++
  )
    t += '&args[]=' + encodeURIComponent(arguments[n]);
  return (
    'Minified React error #' +
    e +
    '; visit ' +
    t +
    ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
  );
}
var Of = new Set(),
  Er = {};
function cn(e, t) {
  Un(e, t), Un(e + 'Capture', t);
}
function Un(e, t) {
  for (Er[e] = t, e = 0; e < t.length; e++) Of.add(t[e]);
}
var mt = !(
    typeof window > 'u' ||
    typeof window.document > 'u' ||
    typeof window.document.createElement > 'u'
  ),
  js = Object.prototype.hasOwnProperty,
  rm =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  nu = {},
  ru = {};
function om(e) {
  return js.call(ru, e)
    ? !0
    : js.call(nu, e)
      ? !1
      : rm.test(e)
        ? (ru[e] = !0)
        : ((nu[e] = !0), !1);
}
function im(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case 'function':
    case 'symbol':
      return !0;
    case 'boolean':
      return r
        ? !1
        : n !== null
          ? !n.acceptsBooleans
          : ((e = e.toLowerCase().slice(0, 5)), e !== 'data-' && e !== 'aria-');
    default:
      return !1;
  }
}
function sm(e, t, n, r) {
  if (t === null || typeof t > 'u' || im(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function ve(e, t, n, r, o, i, s) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = o),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = i),
    (this.removeEmptyString = s);
}
var le = {};
'children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
  .split(' ')
  .forEach(function (e) {
    le[e] = new ve(e, 0, !1, e, null, !1, !1);
  });
[
  ['acceptCharset', 'accept-charset'],
  ['className', 'class'],
  ['htmlFor', 'for'],
  ['httpEquiv', 'http-equiv'],
].forEach(function (e) {
  var t = e[0];
  le[t] = new ve(t, 1, !1, e[1], null, !1, !1);
});
['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (e) {
  le[e] = new ve(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  'autoReverse',
  'externalResourcesRequired',
  'focusable',
  'preserveAlpha',
].forEach(function (e) {
  le[e] = new ve(e, 2, !1, e, null, !1, !1);
});
'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
  .split(' ')
  .forEach(function (e) {
    le[e] = new ve(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
['checked', 'multiple', 'muted', 'selected'].forEach(function (e) {
  le[e] = new ve(e, 3, !0, e, null, !1, !1);
});
['capture', 'download'].forEach(function (e) {
  le[e] = new ve(e, 4, !1, e, null, !1, !1);
});
['cols', 'rows', 'size', 'span'].forEach(function (e) {
  le[e] = new ve(e, 6, !1, e, null, !1, !1);
});
['rowSpan', 'start'].forEach(function (e) {
  le[e] = new ve(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var ea = /[\-:]([a-z])/g;
function ta(e) {
  return e[1].toUpperCase();
}
'accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
  .split(' ')
  .forEach(function (e) {
    var t = e.replace(ea, ta);
    le[t] = new ve(t, 1, !1, e, null, !1, !1);
  });
'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'
  .split(' ')
  .forEach(function (e) {
    var t = e.replace(ea, ta);
    le[t] = new ve(t, 1, !1, e, 'http://www.w3.org/1999/xlink', !1, !1);
  });
['xml:base', 'xml:lang', 'xml:space'].forEach(function (e) {
  var t = e.replace(ea, ta);
  le[t] = new ve(t, 1, !1, e, 'http://www.w3.org/XML/1998/namespace', !1, !1);
});
['tabIndex', 'crossOrigin'].forEach(function (e) {
  le[e] = new ve(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
le.xlinkHref = new ve(
  'xlinkHref',
  1,
  !1,
  'xlink:href',
  'http://www.w3.org/1999/xlink',
  !0,
  !1
);
['src', 'href', 'action', 'formAction'].forEach(function (e) {
  le[e] = new ve(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function na(e, t, n, r) {
  var o = le.hasOwnProperty(t) ? le[t] : null;
  (o !== null
    ? o.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== 'o' && t[0] !== 'O') ||
      (t[1] !== 'n' && t[1] !== 'N')) &&
    (sm(t, n, o, r) && (n = null),
    r || o === null
      ? om(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, '' + n))
      : o.mustUseProperty
        ? (e[o.propertyName] = n === null ? (o.type === 3 ? !1 : '') : n)
        : ((t = o.attributeName),
          (r = o.attributeNamespace),
          n === null
            ? e.removeAttribute(t)
            : ((o = o.type),
              (n = o === 3 || (o === 4 && n === !0) ? '' : '' + n),
              r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var _t = nm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  lo = Symbol.for('react.element'),
  wn = Symbol.for('react.portal'),
  _n = Symbol.for('react.fragment'),
  ra = Symbol.for('react.strict_mode'),
  Is = Symbol.for('react.profiler'),
  Pf = Symbol.for('react.provider'),
  Nf = Symbol.for('react.context'),
  oa = Symbol.for('react.forward_ref'),
  zs = Symbol.for('react.suspense'),
  Ms = Symbol.for('react.suspense_list'),
  ia = Symbol.for('react.memo'),
  kt = Symbol.for('react.lazy'),
  Tf = Symbol.for('react.offscreen'),
  ou = Symbol.iterator;
function Jn(e) {
  return e === null || typeof e != 'object'
    ? null
    : ((e = (ou && e[ou]) || e['@@iterator']),
      typeof e == 'function' ? e : null);
}
var Q = Object.assign,
  ts;
function lr(e) {
  if (ts === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      ts = (t && t[1]) || '';
    }
  return (
    `
` +
    ts +
    e
  );
}
var ns = !1;
function rs(e, t) {
  if (!e || ns) return '';
  ns = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, 'props', {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == 'object' && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (u) {
          var r = u;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (u) {
          r = u;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (u) {
        r = u;
      }
      e();
    }
  } catch (u) {
    if (u && r && typeof u.stack == 'string') {
      for (
        var o = u.stack.split(`
`),
          i = r.stack.split(`
`),
          s = o.length - 1,
          l = i.length - 1;
        1 <= s && 0 <= l && o[s] !== i[l];

      )
        l--;
      for (; 1 <= s && 0 <= l; s--, l--)
        if (o[s] !== i[l]) {
          if (s !== 1 || l !== 1)
            do
              if ((s--, l--, 0 > l || o[s] !== i[l])) {
                var a =
                  `
` + o[s].replace(' at new ', ' at ');
                return (
                  e.displayName &&
                    a.includes('<anonymous>') &&
                    (a = a.replace('<anonymous>', e.displayName)),
                  a
                );
              }
            while (1 <= s && 0 <= l);
          break;
        }
    }
  } finally {
    (ns = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : '') ? lr(e) : '';
}
function lm(e) {
  switch (e.tag) {
    case 5:
      return lr(e.type);
    case 16:
      return lr('Lazy');
    case 13:
      return lr('Suspense');
    case 19:
      return lr('SuspenseList');
    case 0:
    case 2:
    case 15:
      return (e = rs(e.type, !1)), e;
    case 11:
      return (e = rs(e.type.render, !1)), e;
    case 1:
      return (e = rs(e.type, !0)), e;
    default:
      return '';
  }
}
function Bs(e) {
  if (e == null) return null;
  if (typeof e == 'function') return e.displayName || e.name || null;
  if (typeof e == 'string') return e;
  switch (e) {
    case _n:
      return 'Fragment';
    case wn:
      return 'Portal';
    case Is:
      return 'Profiler';
    case ra:
      return 'StrictMode';
    case zs:
      return 'Suspense';
    case Ms:
      return 'SuspenseList';
  }
  if (typeof e == 'object')
    switch (e.$$typeof) {
      case Nf:
        return (e.displayName || 'Context') + '.Consumer';
      case Pf:
        return (e._context.displayName || 'Context') + '.Provider';
      case oa:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ''),
            (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
          e
        );
      case ia:
        return (
          (t = e.displayName || null), t !== null ? t : Bs(e.type) || 'Memo'
        );
      case kt:
        (t = e._payload), (e = e._init);
        try {
          return Bs(e(t));
        } catch {}
    }
  return null;
}
function am(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return 'Cache';
    case 9:
      return (t.displayName || 'Context') + '.Consumer';
    case 10:
      return (t._context.displayName || 'Context') + '.Provider';
    case 18:
      return 'DehydratedFragment';
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ''),
        t.displayName || (e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')
      );
    case 7:
      return 'Fragment';
    case 5:
      return t;
    case 4:
      return 'Portal';
    case 3:
      return 'Root';
    case 6:
      return 'Text';
    case 16:
      return Bs(t);
    case 8:
      return t === ra ? 'StrictMode' : 'Mode';
    case 22:
      return 'Offscreen';
    case 12:
      return 'Profiler';
    case 21:
      return 'Scope';
    case 13:
      return 'Suspense';
    case 19:
      return 'SuspenseList';
    case 25:
      return 'TracingMarker';
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == 'function') return t.displayName || t.name || null;
      if (typeof t == 'string') return t;
  }
  return null;
}
function jt(e) {
  switch (typeof e) {
    case 'boolean':
    case 'number':
    case 'string':
    case 'undefined':
      return e;
    case 'object':
      return e;
    default:
      return '';
  }
}
function Lf(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === 'input' &&
    (t === 'checkbox' || t === 'radio')
  );
}
function um(e) {
  var t = Lf(e) ? 'checked' : 'value',
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = '' + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < 'u' &&
    typeof n.get == 'function' &&
    typeof n.set == 'function'
  ) {
    var o = n.get,
      i = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return o.call(this);
        },
        set: function (s) {
          (r = '' + s), i.call(this, s);
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (s) {
          r = '' + s;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function ao(e) {
  e._valueTracker || (e._valueTracker = um(e));
}
function $f(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = '';
  return (
    e && (r = Lf(e) ? (e.checked ? 'true' : 'false') : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function Mo(e) {
  if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u'))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Vs(e, t) {
  var n = t.checked;
  return Q({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function iu(e, t) {
  var n = t.defaultValue == null ? '' : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  (n = jt(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === 'checkbox' || t.type === 'radio'
          ? t.checked != null
          : t.value != null,
    });
}
function Ff(e, t) {
  (t = t.checked), t != null && na(e, 'checked', t, !1);
}
function Ks(e, t) {
  Ff(e, t);
  var n = jt(t.value),
    r = t.type;
  if (n != null)
    r === 'number'
      ? ((n === 0 && e.value === '') || e.value != n) && (e.value = '' + n)
      : e.value !== '' + n && (e.value = '' + n);
  else if (r === 'submit' || r === 'reset') {
    e.removeAttribute('value');
    return;
  }
  t.hasOwnProperty('value')
    ? Hs(e, t.type, n)
    : t.hasOwnProperty('defaultValue') && Hs(e, t.type, jt(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked);
}
function su(e, t, n) {
  if (t.hasOwnProperty('value') || t.hasOwnProperty('defaultValue')) {
    var r = t.type;
    if (
      !(
        (r !== 'submit' && r !== 'reset') ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    (t = '' + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (n = e.name),
    n !== '' && (e.name = ''),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== '' && (e.name = n);
}
function Hs(e, t, n) {
  (t !== 'number' || Mo(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = '' + e._wrapperState.initialValue)
      : e.defaultValue !== '' + n && (e.defaultValue = '' + n));
}
var ar = Array.isArray;
function Ln(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var o = 0; o < n.length; o++) t['$' + n[o]] = !0;
    for (n = 0; n < e.length; n++)
      (o = t.hasOwnProperty('$' + e[n].value)),
        e[n].selected !== o && (e[n].selected = o),
        o && r && (e[n].defaultSelected = !0);
  } else {
    for (n = '' + jt(n), t = null, o = 0; o < e.length; o++) {
      if (e[o].value === n) {
        (e[o].selected = !0), r && (e[o].defaultSelected = !0);
        return;
      }
      t !== null || e[o].disabled || (t = e[o]);
    }
    t !== null && (t.selected = !0);
  }
}
function Ws(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(E(91));
  return Q({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: '' + e._wrapperState.initialValue,
  });
}
function lu(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(E(92));
      if (ar(n)) {
        if (1 < n.length) throw Error(E(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ''), (n = t);
  }
  e._wrapperState = { initialValue: jt(n) };
}
function bf(e, t) {
  var n = jt(t.value),
    r = jt(t.defaultValue);
  n != null &&
    ((n = '' + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = '' + r);
}
function au(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== '' && t !== null && (e.value = t);
}
function Df(e) {
  switch (e) {
    case 'svg':
      return 'http://www.w3.org/2000/svg';
    case 'math':
      return 'http://www.w3.org/1998/Math/MathML';
    default:
      return 'http://www.w3.org/1999/xhtml';
  }
}
function Qs(e, t) {
  return e == null || e === 'http://www.w3.org/1999/xhtml'
    ? Df(t)
    : e === 'http://www.w3.org/2000/svg' && t === 'foreignObject'
      ? 'http://www.w3.org/1999/xhtml'
      : e;
}
var uo,
  Af = (function (e) {
    return typeof MSApp < 'u' && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, o) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, o);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== 'http://www.w3.org/2000/svg' || 'innerHTML' in e)
      e.innerHTML = t;
    else {
      for (
        uo = uo || document.createElement('div'),
          uo.innerHTML = '<svg>' + t.valueOf().toString() + '</svg>',
          t = uo.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function xr(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var dr = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  cm = ['Webkit', 'ms', 'Moz', 'O'];
Object.keys(dr).forEach(function (e) {
  cm.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (dr[t] = dr[e]);
  });
});
function Uf(e, t, n) {
  return t == null || typeof t == 'boolean' || t === ''
    ? ''
    : n || typeof t != 'number' || t === 0 || (dr.hasOwnProperty(e) && dr[e])
      ? ('' + t).trim()
      : t + 'px';
}
function jf(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf('--') === 0,
        o = Uf(n, t[n], r);
      n === 'float' && (n = 'cssFloat'), r ? e.setProperty(n, o) : (e[n] = o);
    }
}
var fm = Q(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  }
);
function qs(e, t) {
  if (t) {
    if (fm[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(E(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(E(60));
      if (
        typeof t.dangerouslySetInnerHTML != 'object' ||
        !('__html' in t.dangerouslySetInnerHTML)
      )
        throw Error(E(61));
    }
    if (t.style != null && typeof t.style != 'object') throw Error(E(62));
  }
}
function Xs(e, t) {
  if (e.indexOf('-') === -1) return typeof t.is == 'string';
  switch (e) {
    case 'annotation-xml':
    case 'color-profile':
    case 'font-face':
    case 'font-face-src':
    case 'font-face-uri':
    case 'font-face-format':
    case 'font-face-name':
    case 'missing-glyph':
      return !1;
    default:
      return !0;
  }
}
var Ys = null;
function sa(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var Js = null,
  $n = null,
  Fn = null;
function uu(e) {
  if ((e = Yr(e))) {
    if (typeof Js != 'function') throw Error(E(280));
    var t = e.stateNode;
    t && ((t = Ni(t)), Js(e.stateNode, e.type, t));
  }
}
function If(e) {
  $n ? (Fn ? Fn.push(e) : (Fn = [e])) : ($n = e);
}
function zf() {
  if ($n) {
    var e = $n,
      t = Fn;
    if (((Fn = $n = null), uu(e), t)) for (e = 0; e < t.length; e++) uu(t[e]);
  }
}
function Mf(e, t) {
  return e(t);
}
function Bf() {}
var os = !1;
function Vf(e, t, n) {
  if (os) return e(t, n);
  os = !0;
  try {
    return Mf(e, t, n);
  } finally {
    (os = !1), ($n !== null || Fn !== null) && (Bf(), zf());
  }
}
function Cr(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Ni(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case 'onClick':
    case 'onClickCapture':
    case 'onDoubleClick':
    case 'onDoubleClickCapture':
    case 'onMouseDown':
    case 'onMouseDownCapture':
    case 'onMouseMove':
    case 'onMouseMoveCapture':
    case 'onMouseUp':
    case 'onMouseUpCapture':
    case 'onMouseEnter':
      (r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === 'button' ||
          e === 'input' ||
          e === 'select' ||
          e === 'textarea'
        ))),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != 'function') throw Error(E(231, t, typeof n));
  return n;
}
var Gs = !1;
if (mt)
  try {
    var Gn = {};
    Object.defineProperty(Gn, 'passive', {
      get: function () {
        Gs = !0;
      },
    }),
      window.addEventListener('test', Gn, Gn),
      window.removeEventListener('test', Gn, Gn);
  } catch {
    Gs = !1;
  }
function dm(e, t, n, r, o, i, s, l, a) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (c) {
    this.onError(c);
  }
}
var pr = !1,
  Bo = null,
  Vo = !1,
  Zs = null,
  pm = {
    onError: function (e) {
      (pr = !0), (Bo = e);
    },
  };
function hm(e, t, n, r, o, i, s, l, a) {
  (pr = !1), (Bo = null), dm.apply(pm, arguments);
}
function mm(e, t, n, r, o, i, s, l, a) {
  if ((hm.apply(this, arguments), pr)) {
    if (pr) {
      var u = Bo;
      (pr = !1), (Bo = null);
    } else throw Error(E(198));
    Vo || ((Vo = !0), (Zs = u));
  }
}
function fn(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function Kf(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function cu(e) {
  if (fn(e) !== e) throw Error(E(188));
}
function gm(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = fn(e)), t === null)) throw Error(E(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var o = n.return;
    if (o === null) break;
    var i = o.alternate;
    if (i === null) {
      if (((r = o.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (o.child === i.child) {
      for (i = o.child; i; ) {
        if (i === n) return cu(o), e;
        if (i === r) return cu(o), t;
        i = i.sibling;
      }
      throw Error(E(188));
    }
    if (n.return !== r.return) (n = o), (r = i);
    else {
      for (var s = !1, l = o.child; l; ) {
        if (l === n) {
          (s = !0), (n = o), (r = i);
          break;
        }
        if (l === r) {
          (s = !0), (r = o), (n = i);
          break;
        }
        l = l.sibling;
      }
      if (!s) {
        for (l = i.child; l; ) {
          if (l === n) {
            (s = !0), (n = i), (r = o);
            break;
          }
          if (l === r) {
            (s = !0), (r = i), (n = o);
            break;
          }
          l = l.sibling;
        }
        if (!s) throw Error(E(189));
      }
    }
    if (n.alternate !== r) throw Error(E(190));
  }
  if (n.tag !== 3) throw Error(E(188));
  return n.stateNode.current === n ? e : t;
}
function Hf(e) {
  return (e = gm(e)), e !== null ? Wf(e) : null;
}
function Wf(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Wf(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Qf = Fe.unstable_scheduleCallback,
  fu = Fe.unstable_cancelCallback,
  ym = Fe.unstable_shouldYield,
  vm = Fe.unstable_requestPaint,
  X = Fe.unstable_now,
  wm = Fe.unstable_getCurrentPriorityLevel,
  la = Fe.unstable_ImmediatePriority,
  qf = Fe.unstable_UserBlockingPriority,
  Ko = Fe.unstable_NormalPriority,
  _m = Fe.unstable_LowPriority,
  Xf = Fe.unstable_IdlePriority,
  Ci = null,
  st = null;
function Sm(e) {
  if (st && typeof st.onCommitFiberRoot == 'function')
    try {
      st.onCommitFiberRoot(Ci, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var Xe = Math.clz32 ? Math.clz32 : xm,
  km = Math.log,
  Em = Math.LN2;
function xm(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((km(e) / Em) | 0)) | 0;
}
var co = 64,
  fo = 4194304;
function ur(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function Ho(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    o = e.suspendedLanes,
    i = e.pingedLanes,
    s = n & 268435455;
  if (s !== 0) {
    var l = s & ~o;
    l !== 0 ? (r = ur(l)) : ((i &= s), i !== 0 && (r = ur(i)));
  } else (s = n & ~o), s !== 0 ? (r = ur(s)) : i !== 0 && (r = ur(i));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & o) &&
    ((o = r & -r), (i = t & -t), o >= i || (o === 16 && (i & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - Xe(t)), (o = 1 << n), (r |= e[n]), (t &= ~o);
  return r;
}
function Cm(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Rm(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      o = e.expirationTimes,
      i = e.pendingLanes;
    0 < i;

  ) {
    var s = 31 - Xe(i),
      l = 1 << s,
      a = o[s];
    a === -1
      ? (!(l & n) || l & r) && (o[s] = Cm(l, t))
      : a <= t && (e.expiredLanes |= l),
      (i &= ~l);
  }
}
function el(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function Yf() {
  var e = co;
  return (co <<= 1), !(co & 4194240) && (co = 64), e;
}
function is(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function qr(e, t, n) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - Xe(t)),
    (e[t] = n);
}
function Om(e, t) {
  var n = e.pendingLanes & ~t;
  (e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements);
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var o = 31 - Xe(n),
      i = 1 << o;
    (t[o] = 0), (r[o] = -1), (e[o] = -1), (n &= ~i);
  }
}
function aa(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - Xe(n),
      o = 1 << r;
    (o & t) | (e[r] & t) && (e[r] |= t), (n &= ~o);
  }
}
var I = 0;
function Jf(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var Gf,
  ua,
  Zf,
  ed,
  td,
  tl = !1,
  po = [],
  Nt = null,
  Tt = null,
  Lt = null,
  Rr = new Map(),
  Or = new Map(),
  xt = [],
  Pm =
    'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit'.split(
      ' '
    );
function du(e, t) {
  switch (e) {
    case 'focusin':
    case 'focusout':
      Nt = null;
      break;
    case 'dragenter':
    case 'dragleave':
      Tt = null;
      break;
    case 'mouseover':
    case 'mouseout':
      Lt = null;
      break;
    case 'pointerover':
    case 'pointerout':
      Rr.delete(t.pointerId);
      break;
    case 'gotpointercapture':
    case 'lostpointercapture':
      Or.delete(t.pointerId);
  }
}
function Zn(e, t, n, r, o, i) {
  return e === null || e.nativeEvent !== i
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: i,
        targetContainers: [o],
      }),
      t !== null && ((t = Yr(t)), t !== null && ua(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      o !== null && t.indexOf(o) === -1 && t.push(o),
      e);
}
function Nm(e, t, n, r, o) {
  switch (t) {
    case 'focusin':
      return (Nt = Zn(Nt, e, t, n, r, o)), !0;
    case 'dragenter':
      return (Tt = Zn(Tt, e, t, n, r, o)), !0;
    case 'mouseover':
      return (Lt = Zn(Lt, e, t, n, r, o)), !0;
    case 'pointerover':
      var i = o.pointerId;
      return Rr.set(i, Zn(Rr.get(i) || null, e, t, n, r, o)), !0;
    case 'gotpointercapture':
      return (
        (i = o.pointerId), Or.set(i, Zn(Or.get(i) || null, e, t, n, r, o)), !0
      );
  }
  return !1;
}
function nd(e) {
  var t = qt(e.target);
  if (t !== null) {
    var n = fn(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = Kf(n)), t !== null)) {
          (e.blockedOn = t),
            td(e.priority, function () {
              Zf(n);
            });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function Po(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = nl(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (Ys = r), n.target.dispatchEvent(r), (Ys = null);
    } else return (t = Yr(n)), t !== null && ua(t), (e.blockedOn = n), !1;
    t.shift();
  }
  return !0;
}
function pu(e, t, n) {
  Po(e) && n.delete(t);
}
function Tm() {
  (tl = !1),
    Nt !== null && Po(Nt) && (Nt = null),
    Tt !== null && Po(Tt) && (Tt = null),
    Lt !== null && Po(Lt) && (Lt = null),
    Rr.forEach(pu),
    Or.forEach(pu);
}
function er(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    tl ||
      ((tl = !0),
      Fe.unstable_scheduleCallback(Fe.unstable_NormalPriority, Tm)));
}
function Pr(e) {
  function t(o) {
    return er(o, e);
  }
  if (0 < po.length) {
    er(po[0], e);
    for (var n = 1; n < po.length; n++) {
      var r = po[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    Nt !== null && er(Nt, e),
      Tt !== null && er(Tt, e),
      Lt !== null && er(Lt, e),
      Rr.forEach(t),
      Or.forEach(t),
      n = 0;
    n < xt.length;
    n++
  )
    (r = xt[n]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < xt.length && ((n = xt[0]), n.blockedOn === null); )
    nd(n), n.blockedOn === null && xt.shift();
}
var bn = _t.ReactCurrentBatchConfig,
  Wo = !0;
function Lm(e, t, n, r) {
  var o = I,
    i = bn.transition;
  bn.transition = null;
  try {
    (I = 1), ca(e, t, n, r);
  } finally {
    (I = o), (bn.transition = i);
  }
}
function $m(e, t, n, r) {
  var o = I,
    i = bn.transition;
  bn.transition = null;
  try {
    (I = 4), ca(e, t, n, r);
  } finally {
    (I = o), (bn.transition = i);
  }
}
function ca(e, t, n, r) {
  if (Wo) {
    var o = nl(e, t, n, r);
    if (o === null) ms(e, t, r, Qo, n), du(e, r);
    else if (Nm(o, e, t, n, r)) r.stopPropagation();
    else if ((du(e, r), t & 4 && -1 < Pm.indexOf(e))) {
      for (; o !== null; ) {
        var i = Yr(o);
        if (
          (i !== null && Gf(i),
          (i = nl(e, t, n, r)),
          i === null && ms(e, t, r, Qo, n),
          i === o)
        )
          break;
        o = i;
      }
      o !== null && r.stopPropagation();
    } else ms(e, t, r, null, n);
  }
}
var Qo = null;
function nl(e, t, n, r) {
  if (((Qo = null), (e = sa(r)), (e = qt(e)), e !== null))
    if (((t = fn(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = Kf(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (Qo = e), null;
}
function rd(e) {
  switch (e) {
    case 'cancel':
    case 'click':
    case 'close':
    case 'contextmenu':
    case 'copy':
    case 'cut':
    case 'auxclick':
    case 'dblclick':
    case 'dragend':
    case 'dragstart':
    case 'drop':
    case 'focusin':
    case 'focusout':
    case 'input':
    case 'invalid':
    case 'keydown':
    case 'keypress':
    case 'keyup':
    case 'mousedown':
    case 'mouseup':
    case 'paste':
    case 'pause':
    case 'play':
    case 'pointercancel':
    case 'pointerdown':
    case 'pointerup':
    case 'ratechange':
    case 'reset':
    case 'resize':
    case 'seeked':
    case 'submit':
    case 'touchcancel':
    case 'touchend':
    case 'touchstart':
    case 'volumechange':
    case 'change':
    case 'selectionchange':
    case 'textInput':
    case 'compositionstart':
    case 'compositionend':
    case 'compositionupdate':
    case 'beforeblur':
    case 'afterblur':
    case 'beforeinput':
    case 'blur':
    case 'fullscreenchange':
    case 'focus':
    case 'hashchange':
    case 'popstate':
    case 'select':
    case 'selectstart':
      return 1;
    case 'drag':
    case 'dragenter':
    case 'dragexit':
    case 'dragleave':
    case 'dragover':
    case 'mousemove':
    case 'mouseout':
    case 'mouseover':
    case 'pointermove':
    case 'pointerout':
    case 'pointerover':
    case 'scroll':
    case 'toggle':
    case 'touchmove':
    case 'wheel':
    case 'mouseenter':
    case 'mouseleave':
    case 'pointerenter':
    case 'pointerleave':
      return 4;
    case 'message':
      switch (wm()) {
        case la:
          return 1;
        case qf:
          return 4;
        case Ko:
        case _m:
          return 16;
        case Xf:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Rt = null,
  fa = null,
  No = null;
function od() {
  if (No) return No;
  var e,
    t = fa,
    n = t.length,
    r,
    o = 'value' in Rt ? Rt.value : Rt.textContent,
    i = o.length;
  for (e = 0; e < n && t[e] === o[e]; e++);
  var s = n - e;
  for (r = 1; r <= s && t[n - r] === o[i - r]; r++);
  return (No = o.slice(e, 1 < r ? 1 - r : void 0));
}
function To(e) {
  var t = e.keyCode;
  return (
    'charCode' in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function ho() {
  return !0;
}
function hu() {
  return !1;
}
function Ue(e) {
  function t(n, r, o, i, s) {
    (this._reactName = n),
      (this._targetInst = o),
      (this.type = r),
      (this.nativeEvent = i),
      (this.target = s),
      (this.currentTarget = null);
    for (var l in e)
      e.hasOwnProperty(l) && ((n = e[l]), (this[l] = n ? n(i) : i[l]));
    return (
      (this.isDefaultPrevented = (
        i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1
      )
        ? ho
        : hu),
      (this.isPropagationStopped = hu),
      this
    );
  }
  return (
    Q(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != 'unknown' && (n.returnValue = !1),
          (this.isDefaultPrevented = ho));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != 'unknown' && (n.cancelBubble = !0),
          (this.isPropagationStopped = ho));
      },
      persist: function () {},
      isPersistent: ho,
    }),
    t
  );
}
var Wn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  da = Ue(Wn),
  Xr = Q({}, Wn, { view: 0, detail: 0 }),
  Fm = Ue(Xr),
  ss,
  ls,
  tr,
  Ri = Q({}, Xr, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: pa,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return 'movementX' in e
        ? e.movementX
        : (e !== tr &&
            (tr && e.type === 'mousemove'
              ? ((ss = e.screenX - tr.screenX), (ls = e.screenY - tr.screenY))
              : (ls = ss = 0),
            (tr = e)),
          ss);
    },
    movementY: function (e) {
      return 'movementY' in e ? e.movementY : ls;
    },
  }),
  mu = Ue(Ri),
  bm = Q({}, Ri, { dataTransfer: 0 }),
  Dm = Ue(bm),
  Am = Q({}, Xr, { relatedTarget: 0 }),
  as = Ue(Am),
  Um = Q({}, Wn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  jm = Ue(Um),
  Im = Q({}, Wn, {
    clipboardData: function (e) {
      return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
    },
  }),
  zm = Ue(Im),
  Mm = Q({}, Wn, { data: 0 }),
  gu = Ue(Mm),
  Bm = {
    Esc: 'Escape',
    Spacebar: ' ',
    Left: 'ArrowLeft',
    Up: 'ArrowUp',
    Right: 'ArrowRight',
    Down: 'ArrowDown',
    Del: 'Delete',
    Win: 'OS',
    Menu: 'ContextMenu',
    Apps: 'ContextMenu',
    Scroll: 'ScrollLock',
    MozPrintableKey: 'Unidentified',
  },
  Vm = {
    8: 'Backspace',
    9: 'Tab',
    12: 'Clear',
    13: 'Enter',
    16: 'Shift',
    17: 'Control',
    18: 'Alt',
    19: 'Pause',
    20: 'CapsLock',
    27: 'Escape',
    32: ' ',
    33: 'PageUp',
    34: 'PageDown',
    35: 'End',
    36: 'Home',
    37: 'ArrowLeft',
    38: 'ArrowUp',
    39: 'ArrowRight',
    40: 'ArrowDown',
    45: 'Insert',
    46: 'Delete',
    112: 'F1',
    113: 'F2',
    114: 'F3',
    115: 'F4',
    116: 'F5',
    117: 'F6',
    118: 'F7',
    119: 'F8',
    120: 'F9',
    121: 'F10',
    122: 'F11',
    123: 'F12',
    144: 'NumLock',
    145: 'ScrollLock',
    224: 'Meta',
  },
  Km = {
    Alt: 'altKey',
    Control: 'ctrlKey',
    Meta: 'metaKey',
    Shift: 'shiftKey',
  };
function Hm(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Km[e]) ? !!t[e] : !1;
}
function pa() {
  return Hm;
}
var Wm = Q({}, Xr, {
    key: function (e) {
      if (e.key) {
        var t = Bm[e.key] || e.key;
        if (t !== 'Unidentified') return t;
      }
      return e.type === 'keypress'
        ? ((e = To(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
        : e.type === 'keydown' || e.type === 'keyup'
          ? Vm[e.keyCode] || 'Unidentified'
          : '';
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: pa,
    charCode: function (e) {
      return e.type === 'keypress' ? To(e) : 0;
    },
    keyCode: function (e) {
      return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === 'keypress'
        ? To(e)
        : e.type === 'keydown' || e.type === 'keyup'
          ? e.keyCode
          : 0;
    },
  }),
  Qm = Ue(Wm),
  qm = Q({}, Ri, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  yu = Ue(qm),
  Xm = Q({}, Xr, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: pa,
  }),
  Ym = Ue(Xm),
  Jm = Q({}, Wn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Gm = Ue(Jm),
  Zm = Q({}, Ri, {
    deltaX: function (e) {
      return 'deltaX' in e ? e.deltaX : 'wheelDeltaX' in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return 'deltaY' in e
        ? e.deltaY
        : 'wheelDeltaY' in e
          ? -e.wheelDeltaY
          : 'wheelDelta' in e
            ? -e.wheelDelta
            : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  eg = Ue(Zm),
  tg = [9, 13, 27, 32],
  ha = mt && 'CompositionEvent' in window,
  hr = null;
mt && 'documentMode' in document && (hr = document.documentMode);
var ng = mt && 'TextEvent' in window && !hr,
  id = mt && (!ha || (hr && 8 < hr && 11 >= hr)),
  vu = ' ',
  wu = !1;
function sd(e, t) {
  switch (e) {
    case 'keyup':
      return tg.indexOf(t.keyCode) !== -1;
    case 'keydown':
      return t.keyCode !== 229;
    case 'keypress':
    case 'mousedown':
    case 'focusout':
      return !0;
    default:
      return !1;
  }
}
function ld(e) {
  return (e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null;
}
var Sn = !1;
function rg(e, t) {
  switch (e) {
    case 'compositionend':
      return ld(t);
    case 'keypress':
      return t.which !== 32 ? null : ((wu = !0), vu);
    case 'textInput':
      return (e = t.data), e === vu && wu ? null : e;
    default:
      return null;
  }
}
function og(e, t) {
  if (Sn)
    return e === 'compositionend' || (!ha && sd(e, t))
      ? ((e = od()), (No = fa = Rt = null), (Sn = !1), e)
      : null;
  switch (e) {
    case 'paste':
      return null;
    case 'keypress':
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case 'compositionend':
      return id && t.locale !== 'ko' ? null : t.data;
    default:
      return null;
  }
}
var ig = {
  color: !0,
  date: !0,
  datetime: !0,
  'datetime-local': !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function _u(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === 'input' ? !!ig[e.type] : t === 'textarea';
}
function ad(e, t, n, r) {
  If(r),
    (t = qo(t, 'onChange')),
    0 < t.length &&
      ((n = new da('onChange', 'change', null, n, r)),
      e.push({ event: n, listeners: t }));
}
var mr = null,
  Nr = null;
function sg(e) {
  wd(e, 0);
}
function Oi(e) {
  var t = xn(e);
  if ($f(t)) return e;
}
function lg(e, t) {
  if (e === 'change') return t;
}
var ud = !1;
if (mt) {
  var us;
  if (mt) {
    var cs = 'oninput' in document;
    if (!cs) {
      var Su = document.createElement('div');
      Su.setAttribute('oninput', 'return;'),
        (cs = typeof Su.oninput == 'function');
    }
    us = cs;
  } else us = !1;
  ud = us && (!document.documentMode || 9 < document.documentMode);
}
function ku() {
  mr && (mr.detachEvent('onpropertychange', cd), (Nr = mr = null));
}
function cd(e) {
  if (e.propertyName === 'value' && Oi(Nr)) {
    var t = [];
    ad(t, Nr, e, sa(e)), Vf(sg, t);
  }
}
function ag(e, t, n) {
  e === 'focusin'
    ? (ku(), (mr = t), (Nr = n), mr.attachEvent('onpropertychange', cd))
    : e === 'focusout' && ku();
}
function ug(e) {
  if (e === 'selectionchange' || e === 'keyup' || e === 'keydown')
    return Oi(Nr);
}
function cg(e, t) {
  if (e === 'click') return Oi(t);
}
function fg(e, t) {
  if (e === 'input' || e === 'change') return Oi(t);
}
function dg(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var Je = typeof Object.is == 'function' ? Object.is : dg;
function Tr(e, t) {
  if (Je(e, t)) return !0;
  if (typeof e != 'object' || e === null || typeof t != 'object' || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var o = n[r];
    if (!js.call(t, o) || !Je(e[o], t[o])) return !1;
  }
  return !0;
}
function Eu(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function xu(e, t) {
  var n = Eu(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = Eu(n);
  }
}
function fd(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? fd(e, t.parentNode)
          : 'contains' in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1;
}
function dd() {
  for (var e = window, t = Mo(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == 'string';
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Mo(e.document);
  }
  return t;
}
function ma(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === 'input' &&
      (e.type === 'text' ||
        e.type === 'search' ||
        e.type === 'tel' ||
        e.type === 'url' ||
        e.type === 'password')) ||
      t === 'textarea' ||
      e.contentEditable === 'true')
  );
}
function pg(e) {
  var t = dd(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    fd(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && ma(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        'selectionStart' in n)
      )
        (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var o = n.textContent.length,
          i = Math.min(r.start, o);
        (r = r.end === void 0 ? i : Math.min(r.end, o)),
          !e.extend && i > r && ((o = r), (r = i), (i = o)),
          (o = xu(n, i));
        var s = xu(n, r);
        o &&
          s &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== o.node ||
            e.anchorOffset !== o.offset ||
            e.focusNode !== s.node ||
            e.focusOffset !== s.offset) &&
          ((t = t.createRange()),
          t.setStart(o.node, o.offset),
          e.removeAllRanges(),
          i > r
            ? (e.addRange(t), e.extend(s.node, s.offset))
            : (t.setEnd(s.node, s.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == 'function' && n.focus(), n = 0; n < t.length; n++)
      (e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top);
  }
}
var hg = mt && 'documentMode' in document && 11 >= document.documentMode,
  kn = null,
  rl = null,
  gr = null,
  ol = !1;
function Cu(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  ol ||
    kn == null ||
    kn !== Mo(r) ||
    ((r = kn),
    'selectionStart' in r && ma(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (gr && Tr(gr, r)) ||
      ((gr = r),
      (r = qo(rl, 'onSelect')),
      0 < r.length &&
        ((t = new da('onSelect', 'select', null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = kn))));
}
function mo(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n['Webkit' + e] = 'webkit' + t),
    (n['Moz' + e] = 'moz' + t),
    n
  );
}
var En = {
    animationend: mo('Animation', 'AnimationEnd'),
    animationiteration: mo('Animation', 'AnimationIteration'),
    animationstart: mo('Animation', 'AnimationStart'),
    transitionend: mo('Transition', 'TransitionEnd'),
  },
  fs = {},
  pd = {};
mt &&
  ((pd = document.createElement('div').style),
  'AnimationEvent' in window ||
    (delete En.animationend.animation,
    delete En.animationiteration.animation,
    delete En.animationstart.animation),
  'TransitionEvent' in window || delete En.transitionend.transition);
function Pi(e) {
  if (fs[e]) return fs[e];
  if (!En[e]) return e;
  var t = En[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in pd) return (fs[e] = t[n]);
  return e;
}
var hd = Pi('animationend'),
  md = Pi('animationiteration'),
  gd = Pi('animationstart'),
  yd = Pi('transitionend'),
  vd = new Map(),
  Ru =
    'abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
      ' '
    );
function zt(e, t) {
  vd.set(e, t), cn(t, [e]);
}
for (var ds = 0; ds < Ru.length; ds++) {
  var ps = Ru[ds],
    mg = ps.toLowerCase(),
    gg = ps[0].toUpperCase() + ps.slice(1);
  zt(mg, 'on' + gg);
}
zt(hd, 'onAnimationEnd');
zt(md, 'onAnimationIteration');
zt(gd, 'onAnimationStart');
zt('dblclick', 'onDoubleClick');
zt('focusin', 'onFocus');
zt('focusout', 'onBlur');
zt(yd, 'onTransitionEnd');
Un('onMouseEnter', ['mouseout', 'mouseover']);
Un('onMouseLeave', ['mouseout', 'mouseover']);
Un('onPointerEnter', ['pointerout', 'pointerover']);
Un('onPointerLeave', ['pointerout', 'pointerover']);
cn(
  'onChange',
  'change click focusin focusout input keydown keyup selectionchange'.split(' ')
);
cn(
  'onSelect',
  'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
    ' '
  )
);
cn('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']);
cn(
  'onCompositionEnd',
  'compositionend focusout keydown keypress keyup mousedown'.split(' ')
);
cn(
  'onCompositionStart',
  'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
);
cn(
  'onCompositionUpdate',
  'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
);
var cr =
    'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
      ' '
    ),
  yg = new Set('cancel close invalid load scroll toggle'.split(' ').concat(cr));
function Ou(e, t, n) {
  var r = e.type || 'unknown-event';
  (e.currentTarget = n), mm(r, t, void 0, e), (e.currentTarget = null);
}
function wd(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      o = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t)
        for (var s = r.length - 1; 0 <= s; s--) {
          var l = r[s],
            a = l.instance,
            u = l.currentTarget;
          if (((l = l.listener), a !== i && o.isPropagationStopped())) break e;
          Ou(o, l, u), (i = a);
        }
      else
        for (s = 0; s < r.length; s++) {
          if (
            ((l = r[s]),
            (a = l.instance),
            (u = l.currentTarget),
            (l = l.listener),
            a !== i && o.isPropagationStopped())
          )
            break e;
          Ou(o, l, u), (i = a);
        }
    }
  }
  if (Vo) throw ((e = Zs), (Vo = !1), (Zs = null), e);
}
function B(e, t) {
  var n = t[ul];
  n === void 0 && (n = t[ul] = new Set());
  var r = e + '__bubble';
  n.has(r) || (_d(t, e, 2, !1), n.add(r));
}
function hs(e, t, n) {
  var r = 0;
  t && (r |= 4), _d(n, e, r, t);
}
var go = '_reactListening' + Math.random().toString(36).slice(2);
function Lr(e) {
  if (!e[go]) {
    (e[go] = !0),
      Of.forEach(function (n) {
        n !== 'selectionchange' && (yg.has(n) || hs(n, !1, e), hs(n, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[go] || ((t[go] = !0), hs('selectionchange', !1, t));
  }
}
function _d(e, t, n, r) {
  switch (rd(t)) {
    case 1:
      var o = Lm;
      break;
    case 4:
      o = $m;
      break;
    default:
      o = ca;
  }
  (n = o.bind(null, t, n, e)),
    (o = void 0),
    !Gs ||
      (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') ||
      (o = !0),
    r
      ? o !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: o })
        : e.addEventListener(t, n, !0)
      : o !== void 0
        ? e.addEventListener(t, n, { passive: o })
        : e.addEventListener(t, n, !1);
}
function ms(e, t, n, r, o) {
  var i = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var s = r.tag;
      if (s === 3 || s === 4) {
        var l = r.stateNode.containerInfo;
        if (l === o || (l.nodeType === 8 && l.parentNode === o)) break;
        if (s === 4)
          for (s = r.return; s !== null; ) {
            var a = s.tag;
            if (
              (a === 3 || a === 4) &&
              ((a = s.stateNode.containerInfo),
              a === o || (a.nodeType === 8 && a.parentNode === o))
            )
              return;
            s = s.return;
          }
        for (; l !== null; ) {
          if (((s = qt(l)), s === null)) return;
          if (((a = s.tag), a === 5 || a === 6)) {
            r = i = s;
            continue e;
          }
          l = l.parentNode;
        }
      }
      r = r.return;
    }
  Vf(function () {
    var u = i,
      c = sa(n),
      f = [];
    e: {
      var p = vd.get(e);
      if (p !== void 0) {
        var y = da,
          h = e;
        switch (e) {
          case 'keypress':
            if (To(n) === 0) break e;
          case 'keydown':
          case 'keyup':
            y = Qm;
            break;
          case 'focusin':
            (h = 'focus'), (y = as);
            break;
          case 'focusout':
            (h = 'blur'), (y = as);
            break;
          case 'beforeblur':
          case 'afterblur':
            y = as;
            break;
          case 'click':
            if (n.button === 2) break e;
          case 'auxclick':
          case 'dblclick':
          case 'mousedown':
          case 'mousemove':
          case 'mouseup':
          case 'mouseout':
          case 'mouseover':
          case 'contextmenu':
            y = mu;
            break;
          case 'drag':
          case 'dragend':
          case 'dragenter':
          case 'dragexit':
          case 'dragleave':
          case 'dragover':
          case 'dragstart':
          case 'drop':
            y = Dm;
            break;
          case 'touchcancel':
          case 'touchend':
          case 'touchmove':
          case 'touchstart':
            y = Ym;
            break;
          case hd:
          case md:
          case gd:
            y = jm;
            break;
          case yd:
            y = Gm;
            break;
          case 'scroll':
            y = Fm;
            break;
          case 'wheel':
            y = eg;
            break;
          case 'copy':
          case 'cut':
          case 'paste':
            y = zm;
            break;
          case 'gotpointercapture':
          case 'lostpointercapture':
          case 'pointercancel':
          case 'pointerdown':
          case 'pointermove':
          case 'pointerout':
          case 'pointerover':
          case 'pointerup':
            y = yu;
        }
        var v = (t & 4) !== 0,
          w = !v && e === 'scroll',
          m = v ? (p !== null ? p + 'Capture' : null) : p;
        v = [];
        for (var d = u, g; d !== null; ) {
          g = d;
          var _ = g.stateNode;
          if (
            (g.tag === 5 &&
              _ !== null &&
              ((g = _),
              m !== null && ((_ = Cr(d, m)), _ != null && v.push($r(d, _, g)))),
            w)
          )
            break;
          d = d.return;
        }
        0 < v.length &&
          ((p = new y(p, h, null, n, c)), f.push({ event: p, listeners: v }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((p = e === 'mouseover' || e === 'pointerover'),
          (y = e === 'mouseout' || e === 'pointerout'),
          p &&
            n !== Ys &&
            (h = n.relatedTarget || n.fromElement) &&
            (qt(h) || h[gt]))
        )
          break e;
        if (
          (y || p) &&
          ((p =
            c.window === c
              ? c
              : (p = c.ownerDocument)
                ? p.defaultView || p.parentWindow
                : window),
          y
            ? ((h = n.relatedTarget || n.toElement),
              (y = u),
              (h = h ? qt(h) : null),
              h !== null &&
                ((w = fn(h)), h !== w || (h.tag !== 5 && h.tag !== 6)) &&
                (h = null))
            : ((y = null), (h = u)),
          y !== h)
        ) {
          if (
            ((v = mu),
            (_ = 'onMouseLeave'),
            (m = 'onMouseEnter'),
            (d = 'mouse'),
            (e === 'pointerout' || e === 'pointerover') &&
              ((v = yu),
              (_ = 'onPointerLeave'),
              (m = 'onPointerEnter'),
              (d = 'pointer')),
            (w = y == null ? p : xn(y)),
            (g = h == null ? p : xn(h)),
            (p = new v(_, d + 'leave', y, n, c)),
            (p.target = w),
            (p.relatedTarget = g),
            (_ = null),
            qt(c) === u &&
              ((v = new v(m, d + 'enter', h, n, c)),
              (v.target = g),
              (v.relatedTarget = w),
              (_ = v)),
            (w = _),
            y && h)
          )
            t: {
              for (v = y, m = h, d = 0, g = v; g; g = mn(g)) d++;
              for (g = 0, _ = m; _; _ = mn(_)) g++;
              for (; 0 < d - g; ) (v = mn(v)), d--;
              for (; 0 < g - d; ) (m = mn(m)), g--;
              for (; d--; ) {
                if (v === m || (m !== null && v === m.alternate)) break t;
                (v = mn(v)), (m = mn(m));
              }
              v = null;
            }
          else v = null;
          y !== null && Pu(f, p, y, v, !1),
            h !== null && w !== null && Pu(f, w, h, v, !0);
        }
      }
      e: {
        if (
          ((p = u ? xn(u) : window),
          (y = p.nodeName && p.nodeName.toLowerCase()),
          y === 'select' || (y === 'input' && p.type === 'file'))
        )
          var k = lg;
        else if (_u(p))
          if (ud) k = fg;
          else {
            k = ug;
            var C = ag;
          }
        else
          (y = p.nodeName) &&
            y.toLowerCase() === 'input' &&
            (p.type === 'checkbox' || p.type === 'radio') &&
            (k = cg);
        if (k && (k = k(e, u))) {
          ad(f, k, n, c);
          break e;
        }
        C && C(e, p, u),
          e === 'focusout' &&
            (C = p._wrapperState) &&
            C.controlled &&
            p.type === 'number' &&
            Hs(p, 'number', p.value);
      }
      switch (((C = u ? xn(u) : window), e)) {
        case 'focusin':
          (_u(C) || C.contentEditable === 'true') &&
            ((kn = C), (rl = u), (gr = null));
          break;
        case 'focusout':
          gr = rl = kn = null;
          break;
        case 'mousedown':
          ol = !0;
          break;
        case 'contextmenu':
        case 'mouseup':
        case 'dragend':
          (ol = !1), Cu(f, n, c);
          break;
        case 'selectionchange':
          if (hg) break;
        case 'keydown':
        case 'keyup':
          Cu(f, n, c);
      }
      var R;
      if (ha)
        e: {
          switch (e) {
            case 'compositionstart':
              var x = 'onCompositionStart';
              break e;
            case 'compositionend':
              x = 'onCompositionEnd';
              break e;
            case 'compositionupdate':
              x = 'onCompositionUpdate';
              break e;
          }
          x = void 0;
        }
      else
        Sn
          ? sd(e, n) && (x = 'onCompositionEnd')
          : e === 'keydown' && n.keyCode === 229 && (x = 'onCompositionStart');
      x &&
        (id &&
          n.locale !== 'ko' &&
          (Sn || x !== 'onCompositionStart'
            ? x === 'onCompositionEnd' && Sn && (R = od())
            : ((Rt = c),
              (fa = 'value' in Rt ? Rt.value : Rt.textContent),
              (Sn = !0))),
        (C = qo(u, x)),
        0 < C.length &&
          ((x = new gu(x, e, null, n, c)),
          f.push({ event: x, listeners: C }),
          R ? (x.data = R) : ((R = ld(n)), R !== null && (x.data = R)))),
        (R = ng ? rg(e, n) : og(e, n)) &&
          ((u = qo(u, 'onBeforeInput')),
          0 < u.length &&
            ((c = new gu('onBeforeInput', 'beforeinput', null, n, c)),
            f.push({ event: c, listeners: u }),
            (c.data = R)));
    }
    wd(f, t);
  });
}
function $r(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function qo(e, t) {
  for (var n = t + 'Capture', r = []; e !== null; ) {
    var o = e,
      i = o.stateNode;
    o.tag === 5 &&
      i !== null &&
      ((o = i),
      (i = Cr(e, n)),
      i != null && r.unshift($r(e, i, o)),
      (i = Cr(e, t)),
      i != null && r.push($r(e, i, o))),
      (e = e.return);
  }
  return r;
}
function mn(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Pu(e, t, n, r, o) {
  for (var i = t._reactName, s = []; n !== null && n !== r; ) {
    var l = n,
      a = l.alternate,
      u = l.stateNode;
    if (a !== null && a === r) break;
    l.tag === 5 &&
      u !== null &&
      ((l = u),
      o
        ? ((a = Cr(n, i)), a != null && s.unshift($r(n, a, l)))
        : o || ((a = Cr(n, i)), a != null && s.push($r(n, a, l)))),
      (n = n.return);
  }
  s.length !== 0 && e.push({ event: t, listeners: s });
}
var vg = /\r\n?/g,
  wg = /\u0000|\uFFFD/g;
function Nu(e) {
  return (typeof e == 'string' ? e : '' + e)
    .replace(
      vg,
      `
`
    )
    .replace(wg, '');
}
function yo(e, t, n) {
  if (((t = Nu(t)), Nu(e) !== t && n)) throw Error(E(425));
}
function Xo() {}
var il = null,
  sl = null;
function ll(e, t) {
  return (
    e === 'textarea' ||
    e === 'noscript' ||
    typeof t.children == 'string' ||
    typeof t.children == 'number' ||
    (typeof t.dangerouslySetInnerHTML == 'object' &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var al = typeof setTimeout == 'function' ? setTimeout : void 0,
  _g = typeof clearTimeout == 'function' ? clearTimeout : void 0,
  Tu = typeof Promise == 'function' ? Promise : void 0,
  Sg =
    typeof queueMicrotask == 'function'
      ? queueMicrotask
      : typeof Tu < 'u'
        ? function (e) {
            return Tu.resolve(null).then(e).catch(kg);
          }
        : al;
function kg(e) {
  setTimeout(function () {
    throw e;
  });
}
function gs(e, t) {
  var n = t,
    r = 0;
  do {
    var o = n.nextSibling;
    if ((e.removeChild(n), o && o.nodeType === 8))
      if (((n = o.data), n === '/$')) {
        if (r === 0) {
          e.removeChild(o), Pr(t);
          return;
        }
        r--;
      } else (n !== '$' && n !== '$?' && n !== '$!') || r++;
    n = o;
  } while (n);
  Pr(t);
}
function $t(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === '$' || t === '$!' || t === '$?')) break;
      if (t === '/$') return null;
    }
  }
  return e;
}
function Lu(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === '$' || n === '$!' || n === '$?') {
        if (t === 0) return e;
        t--;
      } else n === '/$' && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Qn = Math.random().toString(36).slice(2),
  ot = '__reactFiber$' + Qn,
  Fr = '__reactProps$' + Qn,
  gt = '__reactContainer$' + Qn,
  ul = '__reactEvents$' + Qn,
  Eg = '__reactListeners$' + Qn,
  xg = '__reactHandles$' + Qn;
function qt(e) {
  var t = e[ot];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[gt] || n[ot])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = Lu(e); e !== null; ) {
          if ((n = e[ot])) return n;
          e = Lu(e);
        }
      return t;
    }
    (e = n), (n = e.parentNode);
  }
  return null;
}
function Yr(e) {
  return (
    (e = e[ot] || e[gt]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function xn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(E(33));
}
function Ni(e) {
  return e[Fr] || null;
}
var cl = [],
  Cn = -1;
function Mt(e) {
  return { current: e };
}
function V(e) {
  0 > Cn || ((e.current = cl[Cn]), (cl[Cn] = null), Cn--);
}
function M(e, t) {
  Cn++, (cl[Cn] = e.current), (e.current = t);
}
var It = {},
  pe = Mt(It),
  xe = Mt(!1),
  tn = It;
function jn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return It;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var o = {},
    i;
  for (i in n) o[i] = t[i];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    o
  );
}
function Ce(e) {
  return (e = e.childContextTypes), e != null;
}
function Yo() {
  V(xe), V(pe);
}
function $u(e, t, n) {
  if (pe.current !== It) throw Error(E(168));
  M(pe, t), M(xe, n);
}
function Sd(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != 'function'))
    return n;
  r = r.getChildContext();
  for (var o in r) if (!(o in t)) throw Error(E(108, am(e) || 'Unknown', o));
  return Q({}, n, r);
}
function Jo(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || It),
    (tn = pe.current),
    M(pe, e),
    M(xe, xe.current),
    !0
  );
}
function Fu(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(E(169));
  n
    ? ((e = Sd(e, t, tn)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      V(xe),
      V(pe),
      M(pe, e))
    : V(xe),
    M(xe, n);
}
var ut = null,
  Ti = !1,
  ys = !1;
function kd(e) {
  ut === null ? (ut = [e]) : ut.push(e);
}
function Cg(e) {
  (Ti = !0), kd(e);
}
function Bt() {
  if (!ys && ut !== null) {
    ys = !0;
    var e = 0,
      t = I;
    try {
      var n = ut;
      for (I = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      (ut = null), (Ti = !1);
    } catch (o) {
      throw (ut !== null && (ut = ut.slice(e + 1)), Qf(la, Bt), o);
    } finally {
      (I = t), (ys = !1);
    }
  }
  return null;
}
var Rn = [],
  On = 0,
  Go = null,
  Zo = 0,
  je = [],
  Ie = 0,
  nn = null,
  ct = 1,
  ft = '';
function Ht(e, t) {
  (Rn[On++] = Zo), (Rn[On++] = Go), (Go = e), (Zo = t);
}
function Ed(e, t, n) {
  (je[Ie++] = ct), (je[Ie++] = ft), (je[Ie++] = nn), (nn = e);
  var r = ct;
  e = ft;
  var o = 32 - Xe(r) - 1;
  (r &= ~(1 << o)), (n += 1);
  var i = 32 - Xe(t) + o;
  if (30 < i) {
    var s = o - (o % 5);
    (i = (r & ((1 << s) - 1)).toString(32)),
      (r >>= s),
      (o -= s),
      (ct = (1 << (32 - Xe(t) + o)) | (n << o) | r),
      (ft = i + e);
  } else (ct = (1 << i) | (n << o) | r), (ft = e);
}
function ga(e) {
  e.return !== null && (Ht(e, 1), Ed(e, 1, 0));
}
function ya(e) {
  for (; e === Go; )
    (Go = Rn[--On]), (Rn[On] = null), (Zo = Rn[--On]), (Rn[On] = null);
  for (; e === nn; )
    (nn = je[--Ie]),
      (je[Ie] = null),
      (ft = je[--Ie]),
      (je[Ie] = null),
      (ct = je[--Ie]),
      (je[Ie] = null);
}
var $e = null,
  Le = null,
  K = !1,
  Qe = null;
function xd(e, t) {
  var n = ze(5, null, null, 0);
  (n.elementType = 'DELETED'),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function bu(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), ($e = e), (Le = $t(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === '' || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), ($e = e), (Le = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = nn !== null ? { id: ct, overflow: ft } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = ze(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            ($e = e),
            (Le = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function fl(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function dl(e) {
  if (K) {
    var t = Le;
    if (t) {
      var n = t;
      if (!bu(e, t)) {
        if (fl(e)) throw Error(E(418));
        t = $t(n.nextSibling);
        var r = $e;
        t && bu(e, t)
          ? xd(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (K = !1), ($e = e));
      }
    } else {
      if (fl(e)) throw Error(E(418));
      (e.flags = (e.flags & -4097) | 2), (K = !1), ($e = e);
    }
  }
}
function Du(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  $e = e;
}
function vo(e) {
  if (e !== $e) return !1;
  if (!K) return Du(e), (K = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== 'head' && t !== 'body' && !ll(e.type, e.memoizedProps))),
    t && (t = Le))
  ) {
    if (fl(e)) throw (Cd(), Error(E(418)));
    for (; t; ) xd(e, t), (t = $t(t.nextSibling));
  }
  if ((Du(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(E(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === '/$') {
            if (t === 0) {
              Le = $t(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== '$' && n !== '$!' && n !== '$?') || t++;
        }
        e = e.nextSibling;
      }
      Le = null;
    }
  } else Le = $e ? $t(e.stateNode.nextSibling) : null;
  return !0;
}
function Cd() {
  for (var e = Le; e; ) e = $t(e.nextSibling);
}
function In() {
  (Le = $e = null), (K = !1);
}
function va(e) {
  Qe === null ? (Qe = [e]) : Qe.push(e);
}
var Rg = _t.ReactCurrentBatchConfig;
function nr(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != 'function' && typeof e != 'object')
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(E(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(E(147, e));
      var o = r,
        i = '' + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == 'function' &&
        t.ref._stringRef === i
        ? t.ref
        : ((t = function (s) {
            var l = o.refs;
            s === null ? delete l[i] : (l[i] = s);
          }),
          (t._stringRef = i),
          t);
    }
    if (typeof e != 'string') throw Error(E(284));
    if (!n._owner) throw Error(E(290, e));
  }
  return e;
}
function wo(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      E(
        31,
        e === '[object Object]'
          ? 'object with keys {' + Object.keys(t).join(', ') + '}'
          : e
      )
    ))
  );
}
function Au(e) {
  var t = e._init;
  return t(e._payload);
}
function Rd(e) {
  function t(m, d) {
    if (e) {
      var g = m.deletions;
      g === null ? ((m.deletions = [d]), (m.flags |= 16)) : g.push(d);
    }
  }
  function n(m, d) {
    if (!e) return null;
    for (; d !== null; ) t(m, d), (d = d.sibling);
    return null;
  }
  function r(m, d) {
    for (m = new Map(); d !== null; )
      d.key !== null ? m.set(d.key, d) : m.set(d.index, d), (d = d.sibling);
    return m;
  }
  function o(m, d) {
    return (m = At(m, d)), (m.index = 0), (m.sibling = null), m;
  }
  function i(m, d, g) {
    return (
      (m.index = g),
      e
        ? ((g = m.alternate),
          g !== null
            ? ((g = g.index), g < d ? ((m.flags |= 2), d) : g)
            : ((m.flags |= 2), d))
        : ((m.flags |= 1048576), d)
    );
  }
  function s(m) {
    return e && m.alternate === null && (m.flags |= 2), m;
  }
  function l(m, d, g, _) {
    return d === null || d.tag !== 6
      ? ((d = xs(g, m.mode, _)), (d.return = m), d)
      : ((d = o(d, g)), (d.return = m), d);
  }
  function a(m, d, g, _) {
    var k = g.type;
    return k === _n
      ? c(m, d, g.props.children, _, g.key)
      : d !== null &&
          (d.elementType === k ||
            (typeof k == 'object' &&
              k !== null &&
              k.$$typeof === kt &&
              Au(k) === d.type))
        ? ((_ = o(d, g.props)), (_.ref = nr(m, d, g)), (_.return = m), _)
        : ((_ = Uo(g.type, g.key, g.props, null, m.mode, _)),
          (_.ref = nr(m, d, g)),
          (_.return = m),
          _);
  }
  function u(m, d, g, _) {
    return d === null ||
      d.tag !== 4 ||
      d.stateNode.containerInfo !== g.containerInfo ||
      d.stateNode.implementation !== g.implementation
      ? ((d = Cs(g, m.mode, _)), (d.return = m), d)
      : ((d = o(d, g.children || [])), (d.return = m), d);
  }
  function c(m, d, g, _, k) {
    return d === null || d.tag !== 7
      ? ((d = Zt(g, m.mode, _, k)), (d.return = m), d)
      : ((d = o(d, g)), (d.return = m), d);
  }
  function f(m, d, g) {
    if ((typeof d == 'string' && d !== '') || typeof d == 'number')
      return (d = xs('' + d, m.mode, g)), (d.return = m), d;
    if (typeof d == 'object' && d !== null) {
      switch (d.$$typeof) {
        case lo:
          return (
            (g = Uo(d.type, d.key, d.props, null, m.mode, g)),
            (g.ref = nr(m, null, d)),
            (g.return = m),
            g
          );
        case wn:
          return (d = Cs(d, m.mode, g)), (d.return = m), d;
        case kt:
          var _ = d._init;
          return f(m, _(d._payload), g);
      }
      if (ar(d) || Jn(d))
        return (d = Zt(d, m.mode, g, null)), (d.return = m), d;
      wo(m, d);
    }
    return null;
  }
  function p(m, d, g, _) {
    var k = d !== null ? d.key : null;
    if ((typeof g == 'string' && g !== '') || typeof g == 'number')
      return k !== null ? null : l(m, d, '' + g, _);
    if (typeof g == 'object' && g !== null) {
      switch (g.$$typeof) {
        case lo:
          return g.key === k ? a(m, d, g, _) : null;
        case wn:
          return g.key === k ? u(m, d, g, _) : null;
        case kt:
          return (k = g._init), p(m, d, k(g._payload), _);
      }
      if (ar(g) || Jn(g)) return k !== null ? null : c(m, d, g, _, null);
      wo(m, g);
    }
    return null;
  }
  function y(m, d, g, _, k) {
    if ((typeof _ == 'string' && _ !== '') || typeof _ == 'number')
      return (m = m.get(g) || null), l(d, m, '' + _, k);
    if (typeof _ == 'object' && _ !== null) {
      switch (_.$$typeof) {
        case lo:
          return (m = m.get(_.key === null ? g : _.key) || null), a(d, m, _, k);
        case wn:
          return (m = m.get(_.key === null ? g : _.key) || null), u(d, m, _, k);
        case kt:
          var C = _._init;
          return y(m, d, g, C(_._payload), k);
      }
      if (ar(_) || Jn(_)) return (m = m.get(g) || null), c(d, m, _, k, null);
      wo(d, _);
    }
    return null;
  }
  function h(m, d, g, _) {
    for (
      var k = null, C = null, R = d, x = (d = 0), L = null;
      R !== null && x < g.length;
      x++
    ) {
      R.index > x ? ((L = R), (R = null)) : (L = R.sibling);
      var T = p(m, R, g[x], _);
      if (T === null) {
        R === null && (R = L);
        break;
      }
      e && R && T.alternate === null && t(m, R),
        (d = i(T, d, x)),
        C === null ? (k = T) : (C.sibling = T),
        (C = T),
        (R = L);
    }
    if (x === g.length) return n(m, R), K && Ht(m, x), k;
    if (R === null) {
      for (; x < g.length; x++)
        (R = f(m, g[x], _)),
          R !== null &&
            ((d = i(R, d, x)), C === null ? (k = R) : (C.sibling = R), (C = R));
      return K && Ht(m, x), k;
    }
    for (R = r(m, R); x < g.length; x++)
      (L = y(R, m, x, g[x], _)),
        L !== null &&
          (e && L.alternate !== null && R.delete(L.key === null ? x : L.key),
          (d = i(L, d, x)),
          C === null ? (k = L) : (C.sibling = L),
          (C = L));
    return (
      e &&
        R.forEach(function (he) {
          return t(m, he);
        }),
      K && Ht(m, x),
      k
    );
  }
  function v(m, d, g, _) {
    var k = Jn(g);
    if (typeof k != 'function') throw Error(E(150));
    if (((g = k.call(g)), g == null)) throw Error(E(151));
    for (
      var C = (k = null), R = d, x = (d = 0), L = null, T = g.next();
      R !== null && !T.done;
      x++, T = g.next()
    ) {
      R.index > x ? ((L = R), (R = null)) : (L = R.sibling);
      var he = p(m, R, T.value, _);
      if (he === null) {
        R === null && (R = L);
        break;
      }
      e && R && he.alternate === null && t(m, R),
        (d = i(he, d, x)),
        C === null ? (k = he) : (C.sibling = he),
        (C = he),
        (R = L);
    }
    if (T.done) return n(m, R), K && Ht(m, x), k;
    if (R === null) {
      for (; !T.done; x++, T = g.next())
        (T = f(m, T.value, _)),
          T !== null &&
            ((d = i(T, d, x)), C === null ? (k = T) : (C.sibling = T), (C = T));
      return K && Ht(m, x), k;
    }
    for (R = r(m, R); !T.done; x++, T = g.next())
      (T = y(R, m, x, T.value, _)),
        T !== null &&
          (e && T.alternate !== null && R.delete(T.key === null ? x : T.key),
          (d = i(T, d, x)),
          C === null ? (k = T) : (C.sibling = T),
          (C = T));
    return (
      e &&
        R.forEach(function (Vt) {
          return t(m, Vt);
        }),
      K && Ht(m, x),
      k
    );
  }
  function w(m, d, g, _) {
    if (
      (typeof g == 'object' &&
        g !== null &&
        g.type === _n &&
        g.key === null &&
        (g = g.props.children),
      typeof g == 'object' && g !== null)
    ) {
      switch (g.$$typeof) {
        case lo:
          e: {
            for (var k = g.key, C = d; C !== null; ) {
              if (C.key === k) {
                if (((k = g.type), k === _n)) {
                  if (C.tag === 7) {
                    n(m, C.sibling),
                      (d = o(C, g.props.children)),
                      (d.return = m),
                      (m = d);
                    break e;
                  }
                } else if (
                  C.elementType === k ||
                  (typeof k == 'object' &&
                    k !== null &&
                    k.$$typeof === kt &&
                    Au(k) === C.type)
                ) {
                  n(m, C.sibling),
                    (d = o(C, g.props)),
                    (d.ref = nr(m, C, g)),
                    (d.return = m),
                    (m = d);
                  break e;
                }
                n(m, C);
                break;
              } else t(m, C);
              C = C.sibling;
            }
            g.type === _n
              ? ((d = Zt(g.props.children, m.mode, _, g.key)),
                (d.return = m),
                (m = d))
              : ((_ = Uo(g.type, g.key, g.props, null, m.mode, _)),
                (_.ref = nr(m, d, g)),
                (_.return = m),
                (m = _));
          }
          return s(m);
        case wn:
          e: {
            for (C = g.key; d !== null; ) {
              if (d.key === C)
                if (
                  d.tag === 4 &&
                  d.stateNode.containerInfo === g.containerInfo &&
                  d.stateNode.implementation === g.implementation
                ) {
                  n(m, d.sibling),
                    (d = o(d, g.children || [])),
                    (d.return = m),
                    (m = d);
                  break e;
                } else {
                  n(m, d);
                  break;
                }
              else t(m, d);
              d = d.sibling;
            }
            (d = Cs(g, m.mode, _)), (d.return = m), (m = d);
          }
          return s(m);
        case kt:
          return (C = g._init), w(m, d, C(g._payload), _);
      }
      if (ar(g)) return h(m, d, g, _);
      if (Jn(g)) return v(m, d, g, _);
      wo(m, g);
    }
    return (typeof g == 'string' && g !== '') || typeof g == 'number'
      ? ((g = '' + g),
        d !== null && d.tag === 6
          ? (n(m, d.sibling), (d = o(d, g)), (d.return = m), (m = d))
          : (n(m, d), (d = xs(g, m.mode, _)), (d.return = m), (m = d)),
        s(m))
      : n(m, d);
  }
  return w;
}
var zn = Rd(!0),
  Od = Rd(!1),
  ei = Mt(null),
  ti = null,
  Pn = null,
  wa = null;
function _a() {
  wa = Pn = ti = null;
}
function Sa(e) {
  var t = ei.current;
  V(ei), (e._currentValue = t);
}
function pl(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function Dn(e, t) {
  (ti = e),
    (wa = Pn = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (Ee = !0), (e.firstContext = null));
}
function Be(e) {
  var t = e._currentValue;
  if (wa !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), Pn === null)) {
      if (ti === null) throw Error(E(308));
      (Pn = e), (ti.dependencies = { lanes: 0, firstContext: e });
    } else Pn = Pn.next = e;
  return t;
}
var Xt = null;
function ka(e) {
  Xt === null ? (Xt = [e]) : Xt.push(e);
}
function Pd(e, t, n, r) {
  var o = t.interleaved;
  return (
    o === null ? ((n.next = n), ka(t)) : ((n.next = o.next), (o.next = n)),
    (t.interleaved = n),
    yt(e, r)
  );
}
function yt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return);
  return n.tag === 3 ? n.stateNode : null;
}
var Et = !1;
function Ea(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function Nd(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function pt(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function Ft(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), j & 2)) {
    var o = r.pending;
    return (
      o === null ? (t.next = t) : ((t.next = o.next), (o.next = t)),
      (r.pending = t),
      yt(e, n)
    );
  }
  return (
    (o = r.interleaved),
    o === null ? ((t.next = t), ka(r)) : ((t.next = o.next), (o.next = t)),
    (r.interleaved = t),
    yt(e, n)
  );
}
function Lo(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), aa(e, n);
  }
}
function Uu(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var o = null,
      i = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var s = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        i === null ? (o = i = s) : (i = i.next = s), (n = n.next);
      } while (n !== null);
      i === null ? (o = i = t) : (i = i.next = t);
    } else o = i = t;
    (n = {
      baseState: r.baseState,
      firstBaseUpdate: o,
      lastBaseUpdate: i,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n);
    return;
  }
  (e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t);
}
function ni(e, t, n, r) {
  var o = e.updateQueue;
  Et = !1;
  var i = o.firstBaseUpdate,
    s = o.lastBaseUpdate,
    l = o.shared.pending;
  if (l !== null) {
    o.shared.pending = null;
    var a = l,
      u = a.next;
    (a.next = null), s === null ? (i = u) : (s.next = u), (s = a);
    var c = e.alternate;
    c !== null &&
      ((c = c.updateQueue),
      (l = c.lastBaseUpdate),
      l !== s &&
        (l === null ? (c.firstBaseUpdate = u) : (l.next = u),
        (c.lastBaseUpdate = a)));
  }
  if (i !== null) {
    var f = o.baseState;
    (s = 0), (c = u = a = null), (l = i);
    do {
      var p = l.lane,
        y = l.eventTime;
      if ((r & p) === p) {
        c !== null &&
          (c = c.next =
            {
              eventTime: y,
              lane: 0,
              tag: l.tag,
              payload: l.payload,
              callback: l.callback,
              next: null,
            });
        e: {
          var h = e,
            v = l;
          switch (((p = t), (y = n), v.tag)) {
            case 1:
              if (((h = v.payload), typeof h == 'function')) {
                f = h.call(y, f, p);
                break e;
              }
              f = h;
              break e;
            case 3:
              h.flags = (h.flags & -65537) | 128;
            case 0:
              if (
                ((h = v.payload),
                (p = typeof h == 'function' ? h.call(y, f, p) : h),
                p == null)
              )
                break e;
              f = Q({}, f, p);
              break e;
            case 2:
              Et = !0;
          }
        }
        l.callback !== null &&
          l.lane !== 0 &&
          ((e.flags |= 64),
          (p = o.effects),
          p === null ? (o.effects = [l]) : p.push(l));
      } else
        (y = {
          eventTime: y,
          lane: p,
          tag: l.tag,
          payload: l.payload,
          callback: l.callback,
          next: null,
        }),
          c === null ? ((u = c = y), (a = f)) : (c = c.next = y),
          (s |= p);
      if (((l = l.next), l === null)) {
        if (((l = o.shared.pending), l === null)) break;
        (p = l),
          (l = p.next),
          (p.next = null),
          (o.lastBaseUpdate = p),
          (o.shared.pending = null);
      }
    } while (!0);
    if (
      (c === null && (a = f),
      (o.baseState = a),
      (o.firstBaseUpdate = u),
      (o.lastBaseUpdate = c),
      (t = o.shared.interleaved),
      t !== null)
    ) {
      o = t;
      do (s |= o.lane), (o = o.next);
      while (o !== t);
    } else i === null && (o.shared.lanes = 0);
    (on |= s), (e.lanes = s), (e.memoizedState = f);
  }
}
function ju(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        o = r.callback;
      if (o !== null) {
        if (((r.callback = null), (r = n), typeof o != 'function'))
          throw Error(E(191, o));
        o.call(r);
      }
    }
}
var Jr = {},
  lt = Mt(Jr),
  br = Mt(Jr),
  Dr = Mt(Jr);
function Yt(e) {
  if (e === Jr) throw Error(E(174));
  return e;
}
function xa(e, t) {
  switch ((M(Dr, t), M(br, e), M(lt, Jr), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Qs(null, '');
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = Qs(t, e));
  }
  V(lt), M(lt, t);
}
function Mn() {
  V(lt), V(br), V(Dr);
}
function Td(e) {
  Yt(Dr.current);
  var t = Yt(lt.current),
    n = Qs(t, e.type);
  t !== n && (M(br, e), M(lt, n));
}
function Ca(e) {
  br.current === e && (V(lt), V(br));
}
var H = Mt(0);
function ri(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === '$?' || n.data === '$!')
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var vs = [];
function Ra() {
  for (var e = 0; e < vs.length; e++)
    vs[e]._workInProgressVersionPrimary = null;
  vs.length = 0;
}
var $o = _t.ReactCurrentDispatcher,
  ws = _t.ReactCurrentBatchConfig,
  rn = 0,
  W = null,
  Z = null,
  te = null,
  oi = !1,
  yr = !1,
  Ar = 0,
  Og = 0;
function ue() {
  throw Error(E(321));
}
function Oa(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!Je(e[n], t[n])) return !1;
  return !0;
}
function Pa(e, t, n, r, o, i) {
  if (
    ((rn = i),
    (W = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    ($o.current = e === null || e.memoizedState === null ? Lg : $g),
    (e = n(r, o)),
    yr)
  ) {
    i = 0;
    do {
      if (((yr = !1), (Ar = 0), 25 <= i)) throw Error(E(301));
      (i += 1),
        (te = Z = null),
        (t.updateQueue = null),
        ($o.current = Fg),
        (e = n(r, o));
    } while (yr);
  }
  if (
    (($o.current = ii),
    (t = Z !== null && Z.next !== null),
    (rn = 0),
    (te = Z = W = null),
    (oi = !1),
    t)
  )
    throw Error(E(300));
  return e;
}
function Na() {
  var e = Ar !== 0;
  return (Ar = 0), e;
}
function rt() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return te === null ? (W.memoizedState = te = e) : (te = te.next = e), te;
}
function Ve() {
  if (Z === null) {
    var e = W.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = Z.next;
  var t = te === null ? W.memoizedState : te.next;
  if (t !== null) (te = t), (Z = e);
  else {
    if (e === null) throw Error(E(310));
    (Z = e),
      (e = {
        memoizedState: Z.memoizedState,
        baseState: Z.baseState,
        baseQueue: Z.baseQueue,
        queue: Z.queue,
        next: null,
      }),
      te === null ? (W.memoizedState = te = e) : (te = te.next = e);
  }
  return te;
}
function Ur(e, t) {
  return typeof t == 'function' ? t(e) : t;
}
function _s(e) {
  var t = Ve(),
    n = t.queue;
  if (n === null) throw Error(E(311));
  n.lastRenderedReducer = e;
  var r = Z,
    o = r.baseQueue,
    i = n.pending;
  if (i !== null) {
    if (o !== null) {
      var s = o.next;
      (o.next = i.next), (i.next = s);
    }
    (r.baseQueue = o = i), (n.pending = null);
  }
  if (o !== null) {
    (i = o.next), (r = r.baseState);
    var l = (s = null),
      a = null,
      u = i;
    do {
      var c = u.lane;
      if ((rn & c) === c)
        a !== null &&
          (a = a.next =
            {
              lane: 0,
              action: u.action,
              hasEagerState: u.hasEagerState,
              eagerState: u.eagerState,
              next: null,
            }),
          (r = u.hasEagerState ? u.eagerState : e(r, u.action));
      else {
        var f = {
          lane: c,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null,
        };
        a === null ? ((l = a = f), (s = r)) : (a = a.next = f),
          (W.lanes |= c),
          (on |= c);
      }
      u = u.next;
    } while (u !== null && u !== i);
    a === null ? (s = r) : (a.next = l),
      Je(r, t.memoizedState) || (Ee = !0),
      (t.memoizedState = r),
      (t.baseState = s),
      (t.baseQueue = a),
      (n.lastRenderedState = r);
  }
  if (((e = n.interleaved), e !== null)) {
    o = e;
    do (i = o.lane), (W.lanes |= i), (on |= i), (o = o.next);
    while (o !== e);
  } else o === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Ss(e) {
  var t = Ve(),
    n = t.queue;
  if (n === null) throw Error(E(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    o = n.pending,
    i = t.memoizedState;
  if (o !== null) {
    n.pending = null;
    var s = (o = o.next);
    do (i = e(i, s.action)), (s = s.next);
    while (s !== o);
    Je(i, t.memoizedState) || (Ee = !0),
      (t.memoizedState = i),
      t.baseQueue === null && (t.baseState = i),
      (n.lastRenderedState = i);
  }
  return [i, r];
}
function Ld() {}
function $d(e, t) {
  var n = W,
    r = Ve(),
    o = t(),
    i = !Je(r.memoizedState, o);
  if (
    (i && ((r.memoizedState = o), (Ee = !0)),
    (r = r.queue),
    Ta(Dd.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || i || (te !== null && te.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      jr(9, bd.bind(null, n, r, o, t), void 0, null),
      ne === null)
    )
      throw Error(E(349));
    rn & 30 || Fd(n, t, o);
  }
  return o;
}
function Fd(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = W.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (W.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function bd(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), Ad(t) && Ud(e);
}
function Dd(e, t, n) {
  return n(function () {
    Ad(t) && Ud(e);
  });
}
function Ad(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Je(e, n);
  } catch {
    return !0;
  }
}
function Ud(e) {
  var t = yt(e, 1);
  t !== null && Ye(t, e, 1, -1);
}
function Iu(e) {
  var t = rt();
  return (
    typeof e == 'function' && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ur,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = Tg.bind(null, W, e)),
    [t.memoizedState, e]
  );
}
function jr(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = W.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (W.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function jd() {
  return Ve().memoizedState;
}
function Fo(e, t, n, r) {
  var o = rt();
  (W.flags |= e),
    (o.memoizedState = jr(1 | t, n, void 0, r === void 0 ? null : r));
}
function Li(e, t, n, r) {
  var o = Ve();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (Z !== null) {
    var s = Z.memoizedState;
    if (((i = s.destroy), r !== null && Oa(r, s.deps))) {
      o.memoizedState = jr(t, n, i, r);
      return;
    }
  }
  (W.flags |= e), (o.memoizedState = jr(1 | t, n, i, r));
}
function zu(e, t) {
  return Fo(8390656, 8, e, t);
}
function Ta(e, t) {
  return Li(2048, 8, e, t);
}
function Id(e, t) {
  return Li(4, 2, e, t);
}
function zd(e, t) {
  return Li(4, 4, e, t);
}
function Md(e, t) {
  if (typeof t == 'function')
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function Bd(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null), Li(4, 4, Md.bind(null, t, e), n)
  );
}
function La() {}
function Vd(e, t) {
  var n = Ve();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Oa(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function Kd(e, t) {
  var n = Ve();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Oa(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function Hd(e, t, n) {
  return rn & 21
    ? (Je(n, t) || ((n = Yf()), (W.lanes |= n), (on |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (Ee = !0)), (e.memoizedState = n));
}
function Pg(e, t) {
  var n = I;
  (I = n !== 0 && 4 > n ? n : 4), e(!0);
  var r = ws.transition;
  ws.transition = {};
  try {
    e(!1), t();
  } finally {
    (I = n), (ws.transition = r);
  }
}
function Wd() {
  return Ve().memoizedState;
}
function Ng(e, t, n) {
  var r = Dt(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    Qd(e))
  )
    qd(t, n);
  else if (((n = Pd(e, t, n, r)), n !== null)) {
    var o = ge();
    Ye(n, e, r, o), Xd(n, t, r);
  }
}
function Tg(e, t, n) {
  var r = Dt(e),
    o = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Qd(e)) qd(t, o);
  else {
    var i = e.alternate;
    if (
      e.lanes === 0 &&
      (i === null || i.lanes === 0) &&
      ((i = t.lastRenderedReducer), i !== null)
    )
      try {
        var s = t.lastRenderedState,
          l = i(s, n);
        if (((o.hasEagerState = !0), (o.eagerState = l), Je(l, s))) {
          var a = t.interleaved;
          a === null
            ? ((o.next = o), ka(t))
            : ((o.next = a.next), (a.next = o)),
            (t.interleaved = o);
          return;
        }
      } catch {
      } finally {
      }
    (n = Pd(e, t, o, r)),
      n !== null && ((o = ge()), Ye(n, e, r, o), Xd(n, t, r));
  }
}
function Qd(e) {
  var t = e.alternate;
  return e === W || (t !== null && t === W);
}
function qd(e, t) {
  yr = oi = !0;
  var n = e.pending;
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t);
}
function Xd(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), aa(e, n);
  }
}
var ii = {
    readContext: Be,
    useCallback: ue,
    useContext: ue,
    useEffect: ue,
    useImperativeHandle: ue,
    useInsertionEffect: ue,
    useLayoutEffect: ue,
    useMemo: ue,
    useReducer: ue,
    useRef: ue,
    useState: ue,
    useDebugValue: ue,
    useDeferredValue: ue,
    useTransition: ue,
    useMutableSource: ue,
    useSyncExternalStore: ue,
    useId: ue,
    unstable_isNewReconciler: !1,
  },
  Lg = {
    readContext: Be,
    useCallback: function (e, t) {
      return (rt().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: Be,
    useEffect: zu,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        Fo(4194308, 4, Md.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return Fo(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return Fo(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = rt();
      return (
        (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e
      );
    },
    useReducer: function (e, t, n) {
      var r = rt();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = Ng.bind(null, W, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = rt();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: Iu,
    useDebugValue: La,
    useDeferredValue: function (e) {
      return (rt().memoizedState = e);
    },
    useTransition: function () {
      var e = Iu(!1),
        t = e[0];
      return (e = Pg.bind(null, e[1])), (rt().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = W,
        o = rt();
      if (K) {
        if (n === void 0) throw Error(E(407));
        n = n();
      } else {
        if (((n = t()), ne === null)) throw Error(E(349));
        rn & 30 || Fd(r, t, n);
      }
      o.memoizedState = n;
      var i = { value: n, getSnapshot: t };
      return (
        (o.queue = i),
        zu(Dd.bind(null, r, i, e), [e]),
        (r.flags |= 2048),
        jr(9, bd.bind(null, r, i, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = rt(),
        t = ne.identifierPrefix;
      if (K) {
        var n = ft,
          r = ct;
        (n = (r & ~(1 << (32 - Xe(r) - 1))).toString(32) + n),
          (t = ':' + t + 'R' + n),
          (n = Ar++),
          0 < n && (t += 'H' + n.toString(32)),
          (t += ':');
      } else (n = Og++), (t = ':' + t + 'r' + n.toString(32) + ':');
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  $g = {
    readContext: Be,
    useCallback: Vd,
    useContext: Be,
    useEffect: Ta,
    useImperativeHandle: Bd,
    useInsertionEffect: Id,
    useLayoutEffect: zd,
    useMemo: Kd,
    useReducer: _s,
    useRef: jd,
    useState: function () {
      return _s(Ur);
    },
    useDebugValue: La,
    useDeferredValue: function (e) {
      var t = Ve();
      return Hd(t, Z.memoizedState, e);
    },
    useTransition: function () {
      var e = _s(Ur)[0],
        t = Ve().memoizedState;
      return [e, t];
    },
    useMutableSource: Ld,
    useSyncExternalStore: $d,
    useId: Wd,
    unstable_isNewReconciler: !1,
  },
  Fg = {
    readContext: Be,
    useCallback: Vd,
    useContext: Be,
    useEffect: Ta,
    useImperativeHandle: Bd,
    useInsertionEffect: Id,
    useLayoutEffect: zd,
    useMemo: Kd,
    useReducer: Ss,
    useRef: jd,
    useState: function () {
      return Ss(Ur);
    },
    useDebugValue: La,
    useDeferredValue: function (e) {
      var t = Ve();
      return Z === null ? (t.memoizedState = e) : Hd(t, Z.memoizedState, e);
    },
    useTransition: function () {
      var e = Ss(Ur)[0],
        t = Ve().memoizedState;
      return [e, t];
    },
    useMutableSource: Ld,
    useSyncExternalStore: $d,
    useId: Wd,
    unstable_isNewReconciler: !1,
  };
function He(e, t) {
  if (e && e.defaultProps) {
    (t = Q({}, t)), (e = e.defaultProps);
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function hl(e, t, n, r) {
  (t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : Q({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n);
}
var $i = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? fn(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = ge(),
      o = Dt(e),
      i = pt(r, o);
    (i.payload = t),
      n != null && (i.callback = n),
      (t = Ft(e, i, o)),
      t !== null && (Ye(t, e, o, r), Lo(t, e, o));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = ge(),
      o = Dt(e),
      i = pt(r, o);
    (i.tag = 1),
      (i.payload = t),
      n != null && (i.callback = n),
      (t = Ft(e, i, o)),
      t !== null && (Ye(t, e, o, r), Lo(t, e, o));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = ge(),
      r = Dt(e),
      o = pt(n, r);
    (o.tag = 2),
      t != null && (o.callback = t),
      (t = Ft(e, o, r)),
      t !== null && (Ye(t, e, r, n), Lo(t, e, r));
  },
};
function Mu(e, t, n, r, o, i, s) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == 'function'
      ? e.shouldComponentUpdate(r, i, s)
      : t.prototype && t.prototype.isPureReactComponent
        ? !Tr(n, r) || !Tr(o, i)
        : !0
  );
}
function Yd(e, t, n) {
  var r = !1,
    o = It,
    i = t.contextType;
  return (
    typeof i == 'object' && i !== null
      ? (i = Be(i))
      : ((o = Ce(t) ? tn : pe.current),
        (r = t.contextTypes),
        (i = (r = r != null) ? jn(e, o) : It)),
    (t = new t(n, i)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = $i),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = o),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    t
  );
}
function Bu(e, t, n, r) {
  (e = t.state),
    typeof t.componentWillReceiveProps == 'function' &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && $i.enqueueReplaceState(t, t.state, null);
}
function ml(e, t, n, r) {
  var o = e.stateNode;
  (o.props = n), (o.state = e.memoizedState), (o.refs = {}), Ea(e);
  var i = t.contextType;
  typeof i == 'object' && i !== null
    ? (o.context = Be(i))
    : ((i = Ce(t) ? tn : pe.current), (o.context = jn(e, i))),
    (o.state = e.memoizedState),
    (i = t.getDerivedStateFromProps),
    typeof i == 'function' && (hl(e, t, i, n), (o.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == 'function' ||
      typeof o.getSnapshotBeforeUpdate == 'function' ||
      (typeof o.UNSAFE_componentWillMount != 'function' &&
        typeof o.componentWillMount != 'function') ||
      ((t = o.state),
      typeof o.componentWillMount == 'function' && o.componentWillMount(),
      typeof o.UNSAFE_componentWillMount == 'function' &&
        o.UNSAFE_componentWillMount(),
      t !== o.state && $i.enqueueReplaceState(o, o.state, null),
      ni(e, n, o, r),
      (o.state = e.memoizedState)),
    typeof o.componentDidMount == 'function' && (e.flags |= 4194308);
}
function Bn(e, t) {
  try {
    var n = '',
      r = t;
    do (n += lm(r)), (r = r.return);
    while (r);
    var o = n;
  } catch (i) {
    o =
      `
Error generating stack: ` +
      i.message +
      `
` +
      i.stack;
  }
  return { value: e, source: t, stack: o, digest: null };
}
function ks(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function gl(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var bg = typeof WeakMap == 'function' ? WeakMap : Map;
function Jd(e, t, n) {
  (n = pt(-1, n)), (n.tag = 3), (n.payload = { element: null });
  var r = t.value;
  return (
    (n.callback = function () {
      li || ((li = !0), (Rl = r)), gl(e, t);
    }),
    n
  );
}
function Gd(e, t, n) {
  (n = pt(-1, n)), (n.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == 'function') {
    var o = t.value;
    (n.payload = function () {
      return r(o);
    }),
      (n.callback = function () {
        gl(e, t);
      });
  }
  var i = e.stateNode;
  return (
    i !== null &&
      typeof i.componentDidCatch == 'function' &&
      (n.callback = function () {
        gl(e, t),
          typeof r != 'function' &&
            (bt === null ? (bt = new Set([this])) : bt.add(this));
        var s = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: s !== null ? s : '',
        });
      }),
    n
  );
}
function Vu(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new bg();
    var o = new Set();
    r.set(t, o);
  } else (o = r.get(t)), o === void 0 && ((o = new Set()), r.set(t, o));
  o.has(n) || (o.add(n), (e = qg.bind(null, e, t, n)), t.then(e, e));
}
function Ku(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Hu(e, t, n, r, o) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = o), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = pt(-1, 1)), (t.tag = 2), Ft(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var Dg = _t.ReactCurrentOwner,
  Ee = !1;
function me(e, t, n, r) {
  t.child = e === null ? Od(t, null, n, r) : zn(t, e.child, n, r);
}
function Wu(e, t, n, r, o) {
  n = n.render;
  var i = t.ref;
  return (
    Dn(t, o),
    (r = Pa(e, t, n, r, i, o)),
    (n = Na()),
    e !== null && !Ee
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~o),
        vt(e, t, o))
      : (K && n && ga(t), (t.flags |= 1), me(e, t, r, o), t.child)
  );
}
function Qu(e, t, n, r, o) {
  if (e === null) {
    var i = n.type;
    return typeof i == 'function' &&
      !Ia(i) &&
      i.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = i), Zd(e, t, i, r, o))
      : ((e = Uo(n.type, null, r, t, t.mode, o)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((i = e.child), !(e.lanes & o))) {
    var s = i.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : Tr), n(s, r) && e.ref === t.ref)
    )
      return vt(e, t, o);
  }
  return (
    (t.flags |= 1),
    (e = At(i, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function Zd(e, t, n, r, o) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (Tr(i, r) && e.ref === t.ref)
      if (((Ee = !1), (t.pendingProps = r = i), (e.lanes & o) !== 0))
        e.flags & 131072 && (Ee = !0);
      else return (t.lanes = e.lanes), vt(e, t, o);
  }
  return yl(e, t, n, r, o);
}
function ep(e, t, n) {
  var r = t.pendingProps,
    o = r.children,
    i = e !== null ? e.memoizedState : null;
  if (r.mode === 'hidden')
    if (!(t.mode & 1))
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        M(Tn, Te),
        (Te |= n);
    else {
      if (!(n & 1073741824))
        return (
          (e = i !== null ? i.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          M(Tn, Te),
          (Te |= e),
          null
        );
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = i !== null ? i.baseLanes : n),
        M(Tn, Te),
        (Te |= r);
    }
  else
    i !== null ? ((r = i.baseLanes | n), (t.memoizedState = null)) : (r = n),
      M(Tn, Te),
      (Te |= r);
  return me(e, t, o, n), t.child;
}
function tp(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function yl(e, t, n, r, o) {
  var i = Ce(n) ? tn : pe.current;
  return (
    (i = jn(t, i)),
    Dn(t, o),
    (n = Pa(e, t, n, r, i, o)),
    (r = Na()),
    e !== null && !Ee
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~o),
        vt(e, t, o))
      : (K && r && ga(t), (t.flags |= 1), me(e, t, n, o), t.child)
  );
}
function qu(e, t, n, r, o) {
  if (Ce(n)) {
    var i = !0;
    Jo(t);
  } else i = !1;
  if ((Dn(t, o), t.stateNode === null))
    bo(e, t), Yd(t, n, r), ml(t, n, r, o), (r = !0);
  else if (e === null) {
    var s = t.stateNode,
      l = t.memoizedProps;
    s.props = l;
    var a = s.context,
      u = n.contextType;
    typeof u == 'object' && u !== null
      ? (u = Be(u))
      : ((u = Ce(n) ? tn : pe.current), (u = jn(t, u)));
    var c = n.getDerivedStateFromProps,
      f =
        typeof c == 'function' ||
        typeof s.getSnapshotBeforeUpdate == 'function';
    f ||
      (typeof s.UNSAFE_componentWillReceiveProps != 'function' &&
        typeof s.componentWillReceiveProps != 'function') ||
      ((l !== r || a !== u) && Bu(t, s, r, u)),
      (Et = !1);
    var p = t.memoizedState;
    (s.state = p),
      ni(t, r, s, o),
      (a = t.memoizedState),
      l !== r || p !== a || xe.current || Et
        ? (typeof c == 'function' && (hl(t, n, c, r), (a = t.memoizedState)),
          (l = Et || Mu(t, n, l, r, p, a, u))
            ? (f ||
                (typeof s.UNSAFE_componentWillMount != 'function' &&
                  typeof s.componentWillMount != 'function') ||
                (typeof s.componentWillMount == 'function' &&
                  s.componentWillMount(),
                typeof s.UNSAFE_componentWillMount == 'function' &&
                  s.UNSAFE_componentWillMount()),
              typeof s.componentDidMount == 'function' && (t.flags |= 4194308))
            : (typeof s.componentDidMount == 'function' && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = a)),
          (s.props = r),
          (s.state = a),
          (s.context = u),
          (r = l))
        : (typeof s.componentDidMount == 'function' && (t.flags |= 4194308),
          (r = !1));
  } else {
    (s = t.stateNode),
      Nd(e, t),
      (l = t.memoizedProps),
      (u = t.type === t.elementType ? l : He(t.type, l)),
      (s.props = u),
      (f = t.pendingProps),
      (p = s.context),
      (a = n.contextType),
      typeof a == 'object' && a !== null
        ? (a = Be(a))
        : ((a = Ce(n) ? tn : pe.current), (a = jn(t, a)));
    var y = n.getDerivedStateFromProps;
    (c =
      typeof y == 'function' ||
      typeof s.getSnapshotBeforeUpdate == 'function') ||
      (typeof s.UNSAFE_componentWillReceiveProps != 'function' &&
        typeof s.componentWillReceiveProps != 'function') ||
      ((l !== f || p !== a) && Bu(t, s, r, a)),
      (Et = !1),
      (p = t.memoizedState),
      (s.state = p),
      ni(t, r, s, o);
    var h = t.memoizedState;
    l !== f || p !== h || xe.current || Et
      ? (typeof y == 'function' && (hl(t, n, y, r), (h = t.memoizedState)),
        (u = Et || Mu(t, n, u, r, p, h, a) || !1)
          ? (c ||
              (typeof s.UNSAFE_componentWillUpdate != 'function' &&
                typeof s.componentWillUpdate != 'function') ||
              (typeof s.componentWillUpdate == 'function' &&
                s.componentWillUpdate(r, h, a),
              typeof s.UNSAFE_componentWillUpdate == 'function' &&
                s.UNSAFE_componentWillUpdate(r, h, a)),
            typeof s.componentDidUpdate == 'function' && (t.flags |= 4),
            typeof s.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
          : (typeof s.componentDidUpdate != 'function' ||
              (l === e.memoizedProps && p === e.memoizedState) ||
              (t.flags |= 4),
            typeof s.getSnapshotBeforeUpdate != 'function' ||
              (l === e.memoizedProps && p === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = h)),
        (s.props = r),
        (s.state = h),
        (s.context = a),
        (r = u))
      : (typeof s.componentDidUpdate != 'function' ||
          (l === e.memoizedProps && p === e.memoizedState) ||
          (t.flags |= 4),
        typeof s.getSnapshotBeforeUpdate != 'function' ||
          (l === e.memoizedProps && p === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return vl(e, t, n, r, i, o);
}
function vl(e, t, n, r, o, i) {
  tp(e, t);
  var s = (t.flags & 128) !== 0;
  if (!r && !s) return o && Fu(t, n, !1), vt(e, t, i);
  (r = t.stateNode), (Dg.current = t);
  var l =
    s && typeof n.getDerivedStateFromError != 'function' ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && s
      ? ((t.child = zn(t, e.child, null, i)), (t.child = zn(t, null, l, i)))
      : me(e, t, l, i),
    (t.memoizedState = r.state),
    o && Fu(t, n, !0),
    t.child
  );
}
function np(e) {
  var t = e.stateNode;
  t.pendingContext
    ? $u(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && $u(e, t.context, !1),
    xa(e, t.containerInfo);
}
function Xu(e, t, n, r, o) {
  return In(), va(o), (t.flags |= 256), me(e, t, n, r), t.child;
}
var wl = { dehydrated: null, treeContext: null, retryLane: 0 };
function _l(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function rp(e, t, n) {
  var r = t.pendingProps,
    o = H.current,
    i = !1,
    s = (t.flags & 128) !== 0,
    l;
  if (
    ((l = s) ||
      (l = e !== null && e.memoizedState === null ? !1 : (o & 2) !== 0),
    l
      ? ((i = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (o |= 1),
    M(H, o & 1),
    e === null)
  )
    return (
      dl(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === '$!'
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((s = r.children),
          (e = r.fallback),
          i
            ? ((r = t.mode),
              (i = t.child),
              (s = { mode: 'hidden', children: s }),
              !(r & 1) && i !== null
                ? ((i.childLanes = 0), (i.pendingProps = s))
                : (i = Di(s, r, 0, null)),
              (e = Zt(e, r, n, null)),
              (i.return = t),
              (e.return = t),
              (i.sibling = e),
              (t.child = i),
              (t.child.memoizedState = _l(n)),
              (t.memoizedState = wl),
              e)
            : $a(t, s))
    );
  if (((o = e.memoizedState), o !== null && ((l = o.dehydrated), l !== null)))
    return Ag(e, t, s, r, l, o, n);
  if (i) {
    (i = r.fallback), (s = t.mode), (o = e.child), (l = o.sibling);
    var a = { mode: 'hidden', children: r.children };
    return (
      !(s & 1) && t.child !== o
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = a),
          (t.deletions = null))
        : ((r = At(o, a)), (r.subtreeFlags = o.subtreeFlags & 14680064)),
      l !== null ? (i = At(l, i)) : ((i = Zt(i, s, n, null)), (i.flags |= 2)),
      (i.return = t),
      (r.return = t),
      (r.sibling = i),
      (t.child = r),
      (r = i),
      (i = t.child),
      (s = e.child.memoizedState),
      (s =
        s === null
          ? _l(n)
          : {
              baseLanes: s.baseLanes | n,
              cachePool: null,
              transitions: s.transitions,
            }),
      (i.memoizedState = s),
      (i.childLanes = e.childLanes & ~n),
      (t.memoizedState = wl),
      r
    );
  }
  return (
    (i = e.child),
    (e = i.sibling),
    (r = At(i, { mode: 'visible', children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function $a(e, t) {
  return (
    (t = Di({ mode: 'visible', children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function _o(e, t, n, r) {
  return (
    r !== null && va(r),
    zn(t, e.child, null, n),
    (e = $a(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function Ag(e, t, n, r, o, i, s) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = ks(Error(E(422)))), _o(e, t, s, r))
      : t.memoizedState !== null
        ? ((t.child = e.child), (t.flags |= 128), null)
        : ((i = r.fallback),
          (o = t.mode),
          (r = Di({ mode: 'visible', children: r.children }, o, 0, null)),
          (i = Zt(i, o, s, null)),
          (i.flags |= 2),
          (r.return = t),
          (i.return = t),
          (r.sibling = i),
          (t.child = r),
          t.mode & 1 && zn(t, e.child, null, s),
          (t.child.memoizedState = _l(s)),
          (t.memoizedState = wl),
          i);
  if (!(t.mode & 1)) return _o(e, t, s, null);
  if (o.data === '$!') {
    if (((r = o.nextSibling && o.nextSibling.dataset), r)) var l = r.dgst;
    return (r = l), (i = Error(E(419))), (r = ks(i, r, void 0)), _o(e, t, s, r);
  }
  if (((l = (s & e.childLanes) !== 0), Ee || l)) {
    if (((r = ne), r !== null)) {
      switch (s & -s) {
        case 4:
          o = 2;
          break;
        case 16:
          o = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          o = 32;
          break;
        case 536870912:
          o = 268435456;
          break;
        default:
          o = 0;
      }
      (o = o & (r.suspendedLanes | s) ? 0 : o),
        o !== 0 &&
          o !== i.retryLane &&
          ((i.retryLane = o), yt(e, o), Ye(r, e, o, -1));
    }
    return ja(), (r = ks(Error(E(421)))), _o(e, t, s, r);
  }
  return o.data === '$?'
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = Xg.bind(null, e)),
      (o._reactRetry = t),
      null)
    : ((e = i.treeContext),
      (Le = $t(o.nextSibling)),
      ($e = t),
      (K = !0),
      (Qe = null),
      e !== null &&
        ((je[Ie++] = ct),
        (je[Ie++] = ft),
        (je[Ie++] = nn),
        (ct = e.id),
        (ft = e.overflow),
        (nn = t)),
      (t = $a(t, r.children)),
      (t.flags |= 4096),
      t);
}
function Yu(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), pl(e.return, t, n);
}
function Es(e, t, n, r, o) {
  var i = e.memoizedState;
  i === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: o,
      })
    : ((i.isBackwards = t),
      (i.rendering = null),
      (i.renderingStartTime = 0),
      (i.last = r),
      (i.tail = n),
      (i.tailMode = o));
}
function op(e, t, n) {
  var r = t.pendingProps,
    o = r.revealOrder,
    i = r.tail;
  if ((me(e, t, r.children, n), (r = H.current), r & 2))
    (r = (r & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Yu(e, n, t);
        else if (e.tag === 19) Yu(e, n, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  if ((M(H, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (o) {
      case 'forwards':
        for (n = t.child, o = null; n !== null; )
          (e = n.alternate),
            e !== null && ri(e) === null && (o = n),
            (n = n.sibling);
        (n = o),
          n === null
            ? ((o = t.child), (t.child = null))
            : ((o = n.sibling), (n.sibling = null)),
          Es(t, !1, o, n, i);
        break;
      case 'backwards':
        for (n = null, o = t.child, t.child = null; o !== null; ) {
          if (((e = o.alternate), e !== null && ri(e) === null)) {
            t.child = o;
            break;
          }
          (e = o.sibling), (o.sibling = n), (n = o), (o = e);
        }
        Es(t, !0, n, null, i);
        break;
      case 'together':
        Es(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function bo(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function vt(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (on |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(E(153));
  if (t.child !== null) {
    for (
      e = t.child, n = At(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      (e = e.sibling), (n = n.sibling = At(e, e.pendingProps)), (n.return = t);
    n.sibling = null;
  }
  return t.child;
}
function Ug(e, t, n) {
  switch (t.tag) {
    case 3:
      np(t), In();
      break;
    case 5:
      Td(t);
      break;
    case 1:
      Ce(t.type) && Jo(t);
      break;
    case 4:
      xa(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        o = t.memoizedProps.value;
      M(ei, r._currentValue), (r._currentValue = o);
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (M(H, H.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
            ? rp(e, t, n)
            : (M(H, H.current & 1),
              (e = vt(e, t, n)),
              e !== null ? e.sibling : null);
      M(H, H.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return op(e, t, n);
        t.flags |= 128;
      }
      if (
        ((o = t.memoizedState),
        o !== null &&
          ((o.rendering = null), (o.tail = null), (o.lastEffect = null)),
        M(H, H.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), ep(e, t, n);
  }
  return vt(e, t, n);
}
var ip, Sl, sp, lp;
ip = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
};
Sl = function () {};
sp = function (e, t, n, r) {
  var o = e.memoizedProps;
  if (o !== r) {
    (e = t.stateNode), Yt(lt.current);
    var i = null;
    switch (n) {
      case 'input':
        (o = Vs(e, o)), (r = Vs(e, r)), (i = []);
        break;
      case 'select':
        (o = Q({}, o, { value: void 0 })),
          (r = Q({}, r, { value: void 0 })),
          (i = []);
        break;
      case 'textarea':
        (o = Ws(e, o)), (r = Ws(e, r)), (i = []);
        break;
      default:
        typeof o.onClick != 'function' &&
          typeof r.onClick == 'function' &&
          (e.onclick = Xo);
    }
    qs(n, r);
    var s;
    n = null;
    for (u in o)
      if (!r.hasOwnProperty(u) && o.hasOwnProperty(u) && o[u] != null)
        if (u === 'style') {
          var l = o[u];
          for (s in l) l.hasOwnProperty(s) && (n || (n = {}), (n[s] = ''));
        } else
          u !== 'dangerouslySetInnerHTML' &&
            u !== 'children' &&
            u !== 'suppressContentEditableWarning' &&
            u !== 'suppressHydrationWarning' &&
            u !== 'autoFocus' &&
            (Er.hasOwnProperty(u)
              ? i || (i = [])
              : (i = i || []).push(u, null));
    for (u in r) {
      var a = r[u];
      if (
        ((l = o != null ? o[u] : void 0),
        r.hasOwnProperty(u) && a !== l && (a != null || l != null))
      )
        if (u === 'style')
          if (l) {
            for (s in l)
              !l.hasOwnProperty(s) ||
                (a && a.hasOwnProperty(s)) ||
                (n || (n = {}), (n[s] = ''));
            for (s in a)
              a.hasOwnProperty(s) &&
                l[s] !== a[s] &&
                (n || (n = {}), (n[s] = a[s]));
          } else n || (i || (i = []), i.push(u, n)), (n = a);
        else
          u === 'dangerouslySetInnerHTML'
            ? ((a = a ? a.__html : void 0),
              (l = l ? l.__html : void 0),
              a != null && l !== a && (i = i || []).push(u, a))
            : u === 'children'
              ? (typeof a != 'string' && typeof a != 'number') ||
                (i = i || []).push(u, '' + a)
              : u !== 'suppressContentEditableWarning' &&
                u !== 'suppressHydrationWarning' &&
                (Er.hasOwnProperty(u)
                  ? (a != null && u === 'onScroll' && B('scroll', e),
                    i || l === a || (i = []))
                  : (i = i || []).push(u, a));
    }
    n && (i = i || []).push('style', n);
    var u = i;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
lp = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function rr(e, t) {
  if (!K)
    switch (e.tailMode) {
      case 'hidden':
        t = e.tail;
        for (var n = null; t !== null; )
          t.alternate !== null && (n = t), (t = t.sibling);
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case 'collapsed':
        n = e.tail;
        for (var r = null; n !== null; )
          n.alternate !== null && (r = n), (n = n.sibling);
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function ce(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var o = e.child; o !== null; )
      (n |= o.lanes | o.childLanes),
        (r |= o.subtreeFlags & 14680064),
        (r |= o.flags & 14680064),
        (o.return = e),
        (o = o.sibling);
  else
    for (o = e.child; o !== null; )
      (n |= o.lanes | o.childLanes),
        (r |= o.subtreeFlags),
        (r |= o.flags),
        (o.return = e),
        (o = o.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function jg(e, t, n) {
  var r = t.pendingProps;
  switch ((ya(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return ce(t), null;
    case 1:
      return Ce(t.type) && Yo(), ce(t), null;
    case 3:
      return (
        (r = t.stateNode),
        Mn(),
        V(xe),
        V(pe),
        Ra(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (vo(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), Qe !== null && (Nl(Qe), (Qe = null)))),
        Sl(e, t),
        ce(t),
        null
      );
    case 5:
      Ca(t);
      var o = Yt(Dr.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        sp(e, t, n, r, o),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(E(166));
          return ce(t), null;
        }
        if (((e = Yt(lt.current)), vo(t))) {
          (r = t.stateNode), (n = t.type);
          var i = t.memoizedProps;
          switch (((r[ot] = t), (r[Fr] = i), (e = (t.mode & 1) !== 0), n)) {
            case 'dialog':
              B('cancel', r), B('close', r);
              break;
            case 'iframe':
            case 'object':
            case 'embed':
              B('load', r);
              break;
            case 'video':
            case 'audio':
              for (o = 0; o < cr.length; o++) B(cr[o], r);
              break;
            case 'source':
              B('error', r);
              break;
            case 'img':
            case 'image':
            case 'link':
              B('error', r), B('load', r);
              break;
            case 'details':
              B('toggle', r);
              break;
            case 'input':
              iu(r, i), B('invalid', r);
              break;
            case 'select':
              (r._wrapperState = { wasMultiple: !!i.multiple }),
                B('invalid', r);
              break;
            case 'textarea':
              lu(r, i), B('invalid', r);
          }
          qs(n, i), (o = null);
          for (var s in i)
            if (i.hasOwnProperty(s)) {
              var l = i[s];
              s === 'children'
                ? typeof l == 'string'
                  ? r.textContent !== l &&
                    (i.suppressHydrationWarning !== !0 &&
                      yo(r.textContent, l, e),
                    (o = ['children', l]))
                  : typeof l == 'number' &&
                    r.textContent !== '' + l &&
                    (i.suppressHydrationWarning !== !0 &&
                      yo(r.textContent, l, e),
                    (o = ['children', '' + l]))
                : Er.hasOwnProperty(s) &&
                  l != null &&
                  s === 'onScroll' &&
                  B('scroll', r);
            }
          switch (n) {
            case 'input':
              ao(r), su(r, i, !0);
              break;
            case 'textarea':
              ao(r), au(r);
              break;
            case 'select':
            case 'option':
              break;
            default:
              typeof i.onClick == 'function' && (r.onclick = Xo);
          }
          (r = o), (t.updateQueue = r), r !== null && (t.flags |= 4);
        } else {
          (s = o.nodeType === 9 ? o : o.ownerDocument),
            e === 'http://www.w3.org/1999/xhtml' && (e = Df(n)),
            e === 'http://www.w3.org/1999/xhtml'
              ? n === 'script'
                ? ((e = s.createElement('div')),
                  (e.innerHTML = '<script><\/script>'),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == 'string'
                  ? (e = s.createElement(n, { is: r.is }))
                  : ((e = s.createElement(n)),
                    n === 'select' &&
                      ((s = e),
                      r.multiple
                        ? (s.multiple = !0)
                        : r.size && (s.size = r.size)))
              : (e = s.createElementNS(e, n)),
            (e[ot] = t),
            (e[Fr] = r),
            ip(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((s = Xs(n, r)), n)) {
              case 'dialog':
                B('cancel', e), B('close', e), (o = r);
                break;
              case 'iframe':
              case 'object':
              case 'embed':
                B('load', e), (o = r);
                break;
              case 'video':
              case 'audio':
                for (o = 0; o < cr.length; o++) B(cr[o], e);
                o = r;
                break;
              case 'source':
                B('error', e), (o = r);
                break;
              case 'img':
              case 'image':
              case 'link':
                B('error', e), B('load', e), (o = r);
                break;
              case 'details':
                B('toggle', e), (o = r);
                break;
              case 'input':
                iu(e, r), (o = Vs(e, r)), B('invalid', e);
                break;
              case 'option':
                o = r;
                break;
              case 'select':
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (o = Q({}, r, { value: void 0 })),
                  B('invalid', e);
                break;
              case 'textarea':
                lu(e, r), (o = Ws(e, r)), B('invalid', e);
                break;
              default:
                o = r;
            }
            qs(n, o), (l = o);
            for (i in l)
              if (l.hasOwnProperty(i)) {
                var a = l[i];
                i === 'style'
                  ? jf(e, a)
                  : i === 'dangerouslySetInnerHTML'
                    ? ((a = a ? a.__html : void 0), a != null && Af(e, a))
                    : i === 'children'
                      ? typeof a == 'string'
                        ? (n !== 'textarea' || a !== '') && xr(e, a)
                        : typeof a == 'number' && xr(e, '' + a)
                      : i !== 'suppressContentEditableWarning' &&
                        i !== 'suppressHydrationWarning' &&
                        i !== 'autoFocus' &&
                        (Er.hasOwnProperty(i)
                          ? a != null && i === 'onScroll' && B('scroll', e)
                          : a != null && na(e, i, a, s));
              }
            switch (n) {
              case 'input':
                ao(e), su(e, r, !1);
                break;
              case 'textarea':
                ao(e), au(e);
                break;
              case 'option':
                r.value != null && e.setAttribute('value', '' + jt(r.value));
                break;
              case 'select':
                (e.multiple = !!r.multiple),
                  (i = r.value),
                  i != null
                    ? Ln(e, !!r.multiple, i, !1)
                    : r.defaultValue != null &&
                      Ln(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof o.onClick == 'function' && (e.onclick = Xo);
            }
            switch (n) {
              case 'button':
              case 'input':
              case 'select':
              case 'textarea':
                r = !!r.autoFocus;
                break e;
              case 'img':
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return ce(t), null;
    case 6:
      if (e && t.stateNode != null) lp(e, t, e.memoizedProps, r);
      else {
        if (typeof r != 'string' && t.stateNode === null) throw Error(E(166));
        if (((n = Yt(Dr.current)), Yt(lt.current), vo(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[ot] = t),
            (i = r.nodeValue !== n) && ((e = $e), e !== null))
          )
            switch (e.tag) {
              case 3:
                yo(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  yo(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          i && (t.flags |= 4);
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[ot] = t),
            (t.stateNode = r);
      }
      return ce(t), null;
    case 13:
      if (
        (V(H),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (K && Le !== null && t.mode & 1 && !(t.flags & 128))
          Cd(), In(), (t.flags |= 98560), (i = !1);
        else if (((i = vo(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!i) throw Error(E(318));
            if (
              ((i = t.memoizedState),
              (i = i !== null ? i.dehydrated : null),
              !i)
            )
              throw Error(E(317));
            i[ot] = t;
          } else
            In(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
          ce(t), (i = !1);
        } else Qe !== null && (Nl(Qe), (Qe = null)), (i = !0);
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || H.current & 1 ? ee === 0 && (ee = 3) : ja())),
          t.updateQueue !== null && (t.flags |= 4),
          ce(t),
          null);
    case 4:
      return (
        Mn(), Sl(e, t), e === null && Lr(t.stateNode.containerInfo), ce(t), null
      );
    case 10:
      return Sa(t.type._context), ce(t), null;
    case 17:
      return Ce(t.type) && Yo(), ce(t), null;
    case 19:
      if ((V(H), (i = t.memoizedState), i === null)) return ce(t), null;
      if (((r = (t.flags & 128) !== 0), (s = i.rendering), s === null))
        if (r) rr(i, !1);
        else {
          if (ee !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((s = ri(e)), s !== null)) {
                for (
                  t.flags |= 128,
                    rr(i, !1),
                    r = s.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (i = n),
                    (e = r),
                    (i.flags &= 14680066),
                    (s = i.alternate),
                    s === null
                      ? ((i.childLanes = 0),
                        (i.lanes = e),
                        (i.child = null),
                        (i.subtreeFlags = 0),
                        (i.memoizedProps = null),
                        (i.memoizedState = null),
                        (i.updateQueue = null),
                        (i.dependencies = null),
                        (i.stateNode = null))
                      : ((i.childLanes = s.childLanes),
                        (i.lanes = s.lanes),
                        (i.child = s.child),
                        (i.subtreeFlags = 0),
                        (i.deletions = null),
                        (i.memoizedProps = s.memoizedProps),
                        (i.memoizedState = s.memoizedState),
                        (i.updateQueue = s.updateQueue),
                        (i.type = s.type),
                        (e = s.dependencies),
                        (i.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling);
                return M(H, (H.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          i.tail !== null &&
            X() > Vn &&
            ((t.flags |= 128), (r = !0), rr(i, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = ri(s)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              rr(i, !0),
              i.tail === null && i.tailMode === 'hidden' && !s.alternate && !K)
            )
              return ce(t), null;
          } else
            2 * X() - i.renderingStartTime > Vn &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), rr(i, !1), (t.lanes = 4194304));
        i.isBackwards
          ? ((s.sibling = t.child), (t.child = s))
          : ((n = i.last),
            n !== null ? (n.sibling = s) : (t.child = s),
            (i.last = s));
      }
      return i.tail !== null
        ? ((t = i.tail),
          (i.rendering = t),
          (i.tail = t.sibling),
          (i.renderingStartTime = X()),
          (t.sibling = null),
          (n = H.current),
          M(H, r ? (n & 1) | 2 : n & 1),
          t)
        : (ce(t), null);
    case 22:
    case 23:
      return (
        Ua(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? Te & 1073741824 && (ce(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : ce(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(E(156, t.tag));
}
function Ig(e, t) {
  switch ((ya(t), t.tag)) {
    case 1:
      return (
        Ce(t.type) && Yo(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        Mn(),
        V(xe),
        V(pe),
        Ra(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return Ca(t), null;
    case 13:
      if ((V(H), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(E(340));
        In();
      }
      return (
        (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return V(H), null;
    case 4:
      return Mn(), null;
    case 10:
      return Sa(t.type._context), null;
    case 22:
    case 23:
      return Ua(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var So = !1,
  fe = !1,
  zg = typeof WeakSet == 'function' ? WeakSet : Set,
  N = null;
function Nn(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == 'function')
      try {
        n(null);
      } catch (r) {
        q(e, t, r);
      }
    else n.current = null;
}
function kl(e, t, n) {
  try {
    n();
  } catch (r) {
    q(e, t, r);
  }
}
var Ju = !1;
function Mg(e, t) {
  if (((il = Wo), (e = dd()), ma(e))) {
    if ('selectionStart' in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var o = r.anchorOffset,
            i = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, i.nodeType;
          } catch {
            n = null;
            break e;
          }
          var s = 0,
            l = -1,
            a = -1,
            u = 0,
            c = 0,
            f = e,
            p = null;
          t: for (;;) {
            for (
              var y;
              f !== n || (o !== 0 && f.nodeType !== 3) || (l = s + o),
                f !== i || (r !== 0 && f.nodeType !== 3) || (a = s + r),
                f.nodeType === 3 && (s += f.nodeValue.length),
                (y = f.firstChild) !== null;

            )
              (p = f), (f = y);
            for (;;) {
              if (f === e) break t;
              if (
                (p === n && ++u === o && (l = s),
                p === i && ++c === r && (a = s),
                (y = f.nextSibling) !== null)
              )
                break;
              (f = p), (p = f.parentNode);
            }
            f = y;
          }
          n = l === -1 || a === -1 ? null : { start: l, end: a };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (sl = { focusedElem: e, selectionRange: n }, Wo = !1, N = t; N !== null; )
    if (((t = N), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (N = e);
    else
      for (; N !== null; ) {
        t = N;
        try {
          var h = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (h !== null) {
                  var v = h.memoizedProps,
                    w = h.memoizedState,
                    m = t.stateNode,
                    d = m.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? v : He(t.type, v),
                      w
                    );
                  m.__reactInternalSnapshotBeforeUpdate = d;
                }
                break;
              case 3:
                var g = t.stateNode.containerInfo;
                g.nodeType === 1
                  ? (g.textContent = '')
                  : g.nodeType === 9 &&
                    g.documentElement &&
                    g.removeChild(g.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(E(163));
            }
        } catch (_) {
          q(t, t.return, _);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (N = e);
          break;
        }
        N = t.return;
      }
  return (h = Ju), (Ju = !1), h;
}
function vr(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var o = (r = r.next);
    do {
      if ((o.tag & e) === e) {
        var i = o.destroy;
        (o.destroy = void 0), i !== void 0 && kl(t, n, i);
      }
      o = o.next;
    } while (o !== r);
  }
}
function Fi(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function El(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == 'function' ? t(e) : (t.current = e);
  }
}
function ap(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), ap(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[ot], delete t[Fr], delete t[ul], delete t[Eg], delete t[xg])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function up(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Gu(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || up(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function xl(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = Xo));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (xl(e, t, n), e = e.sibling; e !== null; ) xl(e, t, n), (e = e.sibling);
}
function Cl(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Cl(e, t, n), e = e.sibling; e !== null; ) Cl(e, t, n), (e = e.sibling);
}
var ie = null,
  We = !1;
function St(e, t, n) {
  for (n = n.child; n !== null; ) cp(e, t, n), (n = n.sibling);
}
function cp(e, t, n) {
  if (st && typeof st.onCommitFiberUnmount == 'function')
    try {
      st.onCommitFiberUnmount(Ci, n);
    } catch {}
  switch (n.tag) {
    case 5:
      fe || Nn(n, t);
    case 6:
      var r = ie,
        o = We;
      (ie = null),
        St(e, t, n),
        (ie = r),
        (We = o),
        ie !== null &&
          (We
            ? ((e = ie),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : ie.removeChild(n.stateNode));
      break;
    case 18:
      ie !== null &&
        (We
          ? ((e = ie),
            (n = n.stateNode),
            e.nodeType === 8
              ? gs(e.parentNode, n)
              : e.nodeType === 1 && gs(e, n),
            Pr(e))
          : gs(ie, n.stateNode));
      break;
    case 4:
      (r = ie),
        (o = We),
        (ie = n.stateNode.containerInfo),
        (We = !0),
        St(e, t, n),
        (ie = r),
        (We = o);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !fe &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        o = r = r.next;
        do {
          var i = o,
            s = i.destroy;
          (i = i.tag),
            s !== void 0 && (i & 2 || i & 4) && kl(n, t, s),
            (o = o.next);
        } while (o !== r);
      }
      St(e, t, n);
      break;
    case 1:
      if (
        !fe &&
        (Nn(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == 'function')
      )
        try {
          (r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount();
        } catch (l) {
          q(n, t, l);
        }
      St(e, t, n);
      break;
    case 21:
      St(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((fe = (r = fe) || n.memoizedState !== null), St(e, t, n), (fe = r))
        : St(e, t, n);
      break;
    default:
      St(e, t, n);
  }
}
function Zu(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new zg()),
      t.forEach(function (r) {
        var o = Yg.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(o, o));
      });
  }
}
function Ke(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var o = n[r];
      try {
        var i = e,
          s = t,
          l = s;
        e: for (; l !== null; ) {
          switch (l.tag) {
            case 5:
              (ie = l.stateNode), (We = !1);
              break e;
            case 3:
              (ie = l.stateNode.containerInfo), (We = !0);
              break e;
            case 4:
              (ie = l.stateNode.containerInfo), (We = !0);
              break e;
          }
          l = l.return;
        }
        if (ie === null) throw Error(E(160));
        cp(i, s, o), (ie = null), (We = !1);
        var a = o.alternate;
        a !== null && (a.return = null), (o.return = null);
      } catch (u) {
        q(o, t, u);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) fp(t, e), (t = t.sibling);
}
function fp(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((Ke(t, e), tt(e), r & 4)) {
        try {
          vr(3, e, e.return), Fi(3, e);
        } catch (v) {
          q(e, e.return, v);
        }
        try {
          vr(5, e, e.return);
        } catch (v) {
          q(e, e.return, v);
        }
      }
      break;
    case 1:
      Ke(t, e), tt(e), r & 512 && n !== null && Nn(n, n.return);
      break;
    case 5:
      if (
        (Ke(t, e),
        tt(e),
        r & 512 && n !== null && Nn(n, n.return),
        e.flags & 32)
      ) {
        var o = e.stateNode;
        try {
          xr(o, '');
        } catch (v) {
          q(e, e.return, v);
        }
      }
      if (r & 4 && ((o = e.stateNode), o != null)) {
        var i = e.memoizedProps,
          s = n !== null ? n.memoizedProps : i,
          l = e.type,
          a = e.updateQueue;
        if (((e.updateQueue = null), a !== null))
          try {
            l === 'input' && i.type === 'radio' && i.name != null && Ff(o, i),
              Xs(l, s);
            var u = Xs(l, i);
            for (s = 0; s < a.length; s += 2) {
              var c = a[s],
                f = a[s + 1];
              c === 'style'
                ? jf(o, f)
                : c === 'dangerouslySetInnerHTML'
                  ? Af(o, f)
                  : c === 'children'
                    ? xr(o, f)
                    : na(o, c, f, u);
            }
            switch (l) {
              case 'input':
                Ks(o, i);
                break;
              case 'textarea':
                bf(o, i);
                break;
              case 'select':
                var p = o._wrapperState.wasMultiple;
                o._wrapperState.wasMultiple = !!i.multiple;
                var y = i.value;
                y != null
                  ? Ln(o, !!i.multiple, y, !1)
                  : p !== !!i.multiple &&
                    (i.defaultValue != null
                      ? Ln(o, !!i.multiple, i.defaultValue, !0)
                      : Ln(o, !!i.multiple, i.multiple ? [] : '', !1));
            }
            o[Fr] = i;
          } catch (v) {
            q(e, e.return, v);
          }
      }
      break;
    case 6:
      if ((Ke(t, e), tt(e), r & 4)) {
        if (e.stateNode === null) throw Error(E(162));
        (o = e.stateNode), (i = e.memoizedProps);
        try {
          o.nodeValue = i;
        } catch (v) {
          q(e, e.return, v);
        }
      }
      break;
    case 3:
      if (
        (Ke(t, e), tt(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          Pr(t.containerInfo);
        } catch (v) {
          q(e, e.return, v);
        }
      break;
    case 4:
      Ke(t, e), tt(e);
      break;
    case 13:
      Ke(t, e),
        tt(e),
        (o = e.child),
        o.flags & 8192 &&
          ((i = o.memoizedState !== null),
          (o.stateNode.isHidden = i),
          !i ||
            (o.alternate !== null && o.alternate.memoizedState !== null) ||
            (Da = X())),
        r & 4 && Zu(e);
      break;
    case 22:
      if (
        ((c = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((fe = (u = fe) || c), Ke(t, e), (fe = u)) : Ke(t, e),
        tt(e),
        r & 8192)
      ) {
        if (
          ((u = e.memoizedState !== null),
          (e.stateNode.isHidden = u) && !c && e.mode & 1)
        )
          for (N = e, c = e.child; c !== null; ) {
            for (f = N = c; N !== null; ) {
              switch (((p = N), (y = p.child), p.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  vr(4, p, p.return);
                  break;
                case 1:
                  Nn(p, p.return);
                  var h = p.stateNode;
                  if (typeof h.componentWillUnmount == 'function') {
                    (r = p), (n = p.return);
                    try {
                      (t = r),
                        (h.props = t.memoizedProps),
                        (h.state = t.memoizedState),
                        h.componentWillUnmount();
                    } catch (v) {
                      q(r, n, v);
                    }
                  }
                  break;
                case 5:
                  Nn(p, p.return);
                  break;
                case 22:
                  if (p.memoizedState !== null) {
                    tc(f);
                    continue;
                  }
              }
              y !== null ? ((y.return = p), (N = y)) : tc(f);
            }
            c = c.sibling;
          }
        e: for (c = null, f = e; ; ) {
          if (f.tag === 5) {
            if (c === null) {
              c = f;
              try {
                (o = f.stateNode),
                  u
                    ? ((i = o.style),
                      typeof i.setProperty == 'function'
                        ? i.setProperty('display', 'none', 'important')
                        : (i.display = 'none'))
                    : ((l = f.stateNode),
                      (a = f.memoizedProps.style),
                      (s =
                        a != null && a.hasOwnProperty('display')
                          ? a.display
                          : null),
                      (l.style.display = Uf('display', s)));
              } catch (v) {
                q(e, e.return, v);
              }
            }
          } else if (f.tag === 6) {
            if (c === null)
              try {
                f.stateNode.nodeValue = u ? '' : f.memoizedProps;
              } catch (v) {
                q(e, e.return, v);
              }
          } else if (
            ((f.tag !== 22 && f.tag !== 23) ||
              f.memoizedState === null ||
              f === e) &&
            f.child !== null
          ) {
            (f.child.return = f), (f = f.child);
            continue;
          }
          if (f === e) break e;
          for (; f.sibling === null; ) {
            if (f.return === null || f.return === e) break e;
            c === f && (c = null), (f = f.return);
          }
          c === f && (c = null), (f.sibling.return = f.return), (f = f.sibling);
        }
      }
      break;
    case 19:
      Ke(t, e), tt(e), r & 4 && Zu(e);
      break;
    case 21:
      break;
    default:
      Ke(t, e), tt(e);
  }
}
function tt(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (up(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(E(160));
      }
      switch (r.tag) {
        case 5:
          var o = r.stateNode;
          r.flags & 32 && (xr(o, ''), (r.flags &= -33));
          var i = Gu(e);
          Cl(e, i, o);
          break;
        case 3:
        case 4:
          var s = r.stateNode.containerInfo,
            l = Gu(e);
          xl(e, l, s);
          break;
        default:
          throw Error(E(161));
      }
    } catch (a) {
      q(e, e.return, a);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Bg(e, t, n) {
  (N = e), dp(e);
}
function dp(e, t, n) {
  for (var r = (e.mode & 1) !== 0; N !== null; ) {
    var o = N,
      i = o.child;
    if (o.tag === 22 && r) {
      var s = o.memoizedState !== null || So;
      if (!s) {
        var l = o.alternate,
          a = (l !== null && l.memoizedState !== null) || fe;
        l = So;
        var u = fe;
        if (((So = s), (fe = a) && !u))
          for (N = o; N !== null; )
            (s = N),
              (a = s.child),
              s.tag === 22 && s.memoizedState !== null
                ? nc(o)
                : a !== null
                  ? ((a.return = s), (N = a))
                  : nc(o);
        for (; i !== null; ) (N = i), dp(i), (i = i.sibling);
        (N = o), (So = l), (fe = u);
      }
      ec(e);
    } else
      o.subtreeFlags & 8772 && i !== null ? ((i.return = o), (N = i)) : ec(e);
  }
}
function ec(e) {
  for (; N !== null; ) {
    var t = N;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              fe || Fi(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !fe)
                if (n === null) r.componentDidMount();
                else {
                  var o =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : He(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    o,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var i = t.updateQueue;
              i !== null && ju(t, i, r);
              break;
            case 3:
              var s = t.updateQueue;
              if (s !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                ju(t, s, n);
              }
              break;
            case 5:
              var l = t.stateNode;
              if (n === null && t.flags & 4) {
                n = l;
                var a = t.memoizedProps;
                switch (t.type) {
                  case 'button':
                  case 'input':
                  case 'select':
                  case 'textarea':
                    a.autoFocus && n.focus();
                    break;
                  case 'img':
                    a.src && (n.src = a.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var u = t.alternate;
                if (u !== null) {
                  var c = u.memoizedState;
                  if (c !== null) {
                    var f = c.dehydrated;
                    f !== null && Pr(f);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(E(163));
          }
        fe || (t.flags & 512 && El(t));
      } catch (p) {
        q(t, t.return, p);
      }
    }
    if (t === e) {
      N = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      (n.return = t.return), (N = n);
      break;
    }
    N = t.return;
  }
}
function tc(e) {
  for (; N !== null; ) {
    var t = N;
    if (t === e) {
      N = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      (n.return = t.return), (N = n);
      break;
    }
    N = t.return;
  }
}
function nc(e) {
  for (; N !== null; ) {
    var t = N;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Fi(4, t);
          } catch (a) {
            q(t, n, a);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == 'function') {
            var o = t.return;
            try {
              r.componentDidMount();
            } catch (a) {
              q(t, o, a);
            }
          }
          var i = t.return;
          try {
            El(t);
          } catch (a) {
            q(t, i, a);
          }
          break;
        case 5:
          var s = t.return;
          try {
            El(t);
          } catch (a) {
            q(t, s, a);
          }
      }
    } catch (a) {
      q(t, t.return, a);
    }
    if (t === e) {
      N = null;
      break;
    }
    var l = t.sibling;
    if (l !== null) {
      (l.return = t.return), (N = l);
      break;
    }
    N = t.return;
  }
}
var Vg = Math.ceil,
  si = _t.ReactCurrentDispatcher,
  Fa = _t.ReactCurrentOwner,
  Me = _t.ReactCurrentBatchConfig,
  j = 0,
  ne = null,
  Y = null,
  se = 0,
  Te = 0,
  Tn = Mt(0),
  ee = 0,
  Ir = null,
  on = 0,
  bi = 0,
  ba = 0,
  wr = null,
  ke = null,
  Da = 0,
  Vn = 1 / 0,
  at = null,
  li = !1,
  Rl = null,
  bt = null,
  ko = !1,
  Ot = null,
  ai = 0,
  _r = 0,
  Ol = null,
  Do = -1,
  Ao = 0;
function ge() {
  return j & 6 ? X() : Do !== -1 ? Do : (Do = X());
}
function Dt(e) {
  return e.mode & 1
    ? j & 2 && se !== 0
      ? se & -se
      : Rg.transition !== null
        ? (Ao === 0 && (Ao = Yf()), Ao)
        : ((e = I),
          e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : rd(e.type))),
          e)
    : 1;
}
function Ye(e, t, n, r) {
  if (50 < _r) throw ((_r = 0), (Ol = null), Error(E(185)));
  qr(e, n, r),
    (!(j & 2) || e !== ne) &&
      (e === ne && (!(j & 2) && (bi |= n), ee === 4 && Ct(e, se)),
      Re(e, r),
      n === 1 && j === 0 && !(t.mode & 1) && ((Vn = X() + 500), Ti && Bt()));
}
function Re(e, t) {
  var n = e.callbackNode;
  Rm(e, t);
  var r = Ho(e, e === ne ? se : 0);
  if (r === 0)
    n !== null && fu(n), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && fu(n), t === 1))
      e.tag === 0 ? Cg(rc.bind(null, e)) : kd(rc.bind(null, e)),
        Sg(function () {
          !(j & 6) && Bt();
        }),
        (n = null);
    else {
      switch (Jf(r)) {
        case 1:
          n = la;
          break;
        case 4:
          n = qf;
          break;
        case 16:
          n = Ko;
          break;
        case 536870912:
          n = Xf;
          break;
        default:
          n = Ko;
      }
      n = _p(n, pp.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function pp(e, t) {
  if (((Do = -1), (Ao = 0), j & 6)) throw Error(E(327));
  var n = e.callbackNode;
  if (An() && e.callbackNode !== n) return null;
  var r = Ho(e, e === ne ? se : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = ui(e, r);
  else {
    t = r;
    var o = j;
    j |= 2;
    var i = mp();
    (ne !== e || se !== t) && ((at = null), (Vn = X() + 500), Gt(e, t));
    do
      try {
        Wg();
        break;
      } catch (l) {
        hp(e, l);
      }
    while (!0);
    _a(),
      (si.current = i),
      (j = o),
      Y !== null ? (t = 0) : ((ne = null), (se = 0), (t = ee));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((o = el(e)), o !== 0 && ((r = o), (t = Pl(e, o)))), t === 1)
    )
      throw ((n = Ir), Gt(e, 0), Ct(e, r), Re(e, X()), n);
    if (t === 6) Ct(e, r);
    else {
      if (
        ((o = e.current.alternate),
        !(r & 30) &&
          !Kg(o) &&
          ((t = ui(e, r)),
          t === 2 && ((i = el(e)), i !== 0 && ((r = i), (t = Pl(e, i)))),
          t === 1))
      )
        throw ((n = Ir), Gt(e, 0), Ct(e, r), Re(e, X()), n);
      switch (((e.finishedWork = o), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(E(345));
        case 2:
          Wt(e, ke, at);
          break;
        case 3:
          if (
            (Ct(e, r), (r & 130023424) === r && ((t = Da + 500 - X()), 10 < t))
          ) {
            if (Ho(e, 0) !== 0) break;
            if (((o = e.suspendedLanes), (o & r) !== r)) {
              ge(), (e.pingedLanes |= e.suspendedLanes & o);
              break;
            }
            e.timeoutHandle = al(Wt.bind(null, e, ke, at), t);
            break;
          }
          Wt(e, ke, at);
          break;
        case 4:
          if ((Ct(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, o = -1; 0 < r; ) {
            var s = 31 - Xe(r);
            (i = 1 << s), (s = t[s]), s > o && (o = s), (r &= ~i);
          }
          if (
            ((r = o),
            (r = X() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                  ? 480
                  : 1080 > r
                    ? 1080
                    : 1920 > r
                      ? 1920
                      : 3e3 > r
                        ? 3e3
                        : 4320 > r
                          ? 4320
                          : 1960 * Vg(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = al(Wt.bind(null, e, ke, at), r);
            break;
          }
          Wt(e, ke, at);
          break;
        case 5:
          Wt(e, ke, at);
          break;
        default:
          throw Error(E(329));
      }
    }
  }
  return Re(e, X()), e.callbackNode === n ? pp.bind(null, e) : null;
}
function Pl(e, t) {
  var n = wr;
  return (
    e.current.memoizedState.isDehydrated && (Gt(e, t).flags |= 256),
    (e = ui(e, t)),
    e !== 2 && ((t = ke), (ke = n), t !== null && Nl(t)),
    e
  );
}
function Nl(e) {
  ke === null ? (ke = e) : ke.push.apply(ke, e);
}
function Kg(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var o = n[r],
            i = o.getSnapshot;
          o = o.value;
          try {
            if (!Je(i(), o)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      (n.return = t), (t = n);
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function Ct(e, t) {
  for (
    t &= ~ba,
      t &= ~bi,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - Xe(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function rc(e) {
  if (j & 6) throw Error(E(327));
  An();
  var t = Ho(e, 0);
  if (!(t & 1)) return Re(e, X()), null;
  var n = ui(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = el(e);
    r !== 0 && ((t = r), (n = Pl(e, r)));
  }
  if (n === 1) throw ((n = Ir), Gt(e, 0), Ct(e, t), Re(e, X()), n);
  if (n === 6) throw Error(E(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    Wt(e, ke, at),
    Re(e, X()),
    null
  );
}
function Aa(e, t) {
  var n = j;
  j |= 1;
  try {
    return e(t);
  } finally {
    (j = n), j === 0 && ((Vn = X() + 500), Ti && Bt());
  }
}
function sn(e) {
  Ot !== null && Ot.tag === 0 && !(j & 6) && An();
  var t = j;
  j |= 1;
  var n = Me.transition,
    r = I;
  try {
    if (((Me.transition = null), (I = 1), e)) return e();
  } finally {
    (I = r), (Me.transition = n), (j = t), !(j & 6) && Bt();
  }
}
function Ua() {
  (Te = Tn.current), V(Tn);
}
function Gt(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), _g(n)), Y !== null))
    for (n = Y.return; n !== null; ) {
      var r = n;
      switch ((ya(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && Yo();
          break;
        case 3:
          Mn(), V(xe), V(pe), Ra();
          break;
        case 5:
          Ca(r);
          break;
        case 4:
          Mn();
          break;
        case 13:
          V(H);
          break;
        case 19:
          V(H);
          break;
        case 10:
          Sa(r.type._context);
          break;
        case 22:
        case 23:
          Ua();
      }
      n = n.return;
    }
  if (
    ((ne = e),
    (Y = e = At(e.current, null)),
    (se = Te = t),
    (ee = 0),
    (Ir = null),
    (ba = bi = on = 0),
    (ke = wr = null),
    Xt !== null)
  ) {
    for (t = 0; t < Xt.length; t++)
      if (((n = Xt[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var o = r.next,
          i = n.pending;
        if (i !== null) {
          var s = i.next;
          (i.next = o), (r.next = s);
        }
        n.pending = r;
      }
    Xt = null;
  }
  return e;
}
function hp(e, t) {
  do {
    var n = Y;
    try {
      if ((_a(), ($o.current = ii), oi)) {
        for (var r = W.memoizedState; r !== null; ) {
          var o = r.queue;
          o !== null && (o.pending = null), (r = r.next);
        }
        oi = !1;
      }
      if (
        ((rn = 0),
        (te = Z = W = null),
        (yr = !1),
        (Ar = 0),
        (Fa.current = null),
        n === null || n.return === null)
      ) {
        (ee = 1), (Ir = t), (Y = null);
        break;
      }
      e: {
        var i = e,
          s = n.return,
          l = n,
          a = t;
        if (
          ((t = se),
          (l.flags |= 32768),
          a !== null && typeof a == 'object' && typeof a.then == 'function')
        ) {
          var u = a,
            c = l,
            f = c.tag;
          if (!(c.mode & 1) && (f === 0 || f === 11 || f === 15)) {
            var p = c.alternate;
            p
              ? ((c.updateQueue = p.updateQueue),
                (c.memoizedState = p.memoizedState),
                (c.lanes = p.lanes))
              : ((c.updateQueue = null), (c.memoizedState = null));
          }
          var y = Ku(s);
          if (y !== null) {
            (y.flags &= -257),
              Hu(y, s, l, i, t),
              y.mode & 1 && Vu(i, u, t),
              (t = y),
              (a = u);
            var h = t.updateQueue;
            if (h === null) {
              var v = new Set();
              v.add(a), (t.updateQueue = v);
            } else h.add(a);
            break e;
          } else {
            if (!(t & 1)) {
              Vu(i, u, t), ja();
              break e;
            }
            a = Error(E(426));
          }
        } else if (K && l.mode & 1) {
          var w = Ku(s);
          if (w !== null) {
            !(w.flags & 65536) && (w.flags |= 256),
              Hu(w, s, l, i, t),
              va(Bn(a, l));
            break e;
          }
        }
        (i = a = Bn(a, l)),
          ee !== 4 && (ee = 2),
          wr === null ? (wr = [i]) : wr.push(i),
          (i = s);
        do {
          switch (i.tag) {
            case 3:
              (i.flags |= 65536), (t &= -t), (i.lanes |= t);
              var m = Jd(i, a, t);
              Uu(i, m);
              break e;
            case 1:
              l = a;
              var d = i.type,
                g = i.stateNode;
              if (
                !(i.flags & 128) &&
                (typeof d.getDerivedStateFromError == 'function' ||
                  (g !== null &&
                    typeof g.componentDidCatch == 'function' &&
                    (bt === null || !bt.has(g))))
              ) {
                (i.flags |= 65536), (t &= -t), (i.lanes |= t);
                var _ = Gd(i, l, t);
                Uu(i, _);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      yp(n);
    } catch (k) {
      (t = k), Y === n && n !== null && (Y = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function mp() {
  var e = si.current;
  return (si.current = ii), e === null ? ii : e;
}
function ja() {
  (ee === 0 || ee === 3 || ee === 2) && (ee = 4),
    ne === null || (!(on & 268435455) && !(bi & 268435455)) || Ct(ne, se);
}
function ui(e, t) {
  var n = j;
  j |= 2;
  var r = mp();
  (ne !== e || se !== t) && ((at = null), Gt(e, t));
  do
    try {
      Hg();
      break;
    } catch (o) {
      hp(e, o);
    }
  while (!0);
  if ((_a(), (j = n), (si.current = r), Y !== null)) throw Error(E(261));
  return (ne = null), (se = 0), ee;
}
function Hg() {
  for (; Y !== null; ) gp(Y);
}
function Wg() {
  for (; Y !== null && !ym(); ) gp(Y);
}
function gp(e) {
  var t = wp(e.alternate, e, Te);
  (e.memoizedProps = e.pendingProps),
    t === null ? yp(e) : (Y = t),
    (Fa.current = null);
}
function yp(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = Ig(n, t)), n !== null)) {
        (n.flags &= 32767), (Y = n);
        return;
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (ee = 6), (Y = null);
        return;
      }
    } else if (((n = jg(n, t, Te)), n !== null)) {
      Y = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      Y = t;
      return;
    }
    Y = t = e;
  } while (t !== null);
  ee === 0 && (ee = 5);
}
function Wt(e, t, n) {
  var r = I,
    o = Me.transition;
  try {
    (Me.transition = null), (I = 1), Qg(e, t, n, r);
  } finally {
    (Me.transition = o), (I = r);
  }
  return null;
}
function Qg(e, t, n, r) {
  do An();
  while (Ot !== null);
  if (j & 6) throw Error(E(327));
  n = e.finishedWork;
  var o = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(E(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var i = n.lanes | n.childLanes;
  if (
    (Om(e, i),
    e === ne && ((Y = ne = null), (se = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      ko ||
      ((ko = !0),
      _p(Ko, function () {
        return An(), null;
      })),
    (i = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || i)
  ) {
    (i = Me.transition), (Me.transition = null);
    var s = I;
    I = 1;
    var l = j;
    (j |= 4),
      (Fa.current = null),
      Mg(e, n),
      fp(n, e),
      pg(sl),
      (Wo = !!il),
      (sl = il = null),
      (e.current = n),
      Bg(n),
      vm(),
      (j = l),
      (I = s),
      (Me.transition = i);
  } else e.current = n;
  if (
    (ko && ((ko = !1), (Ot = e), (ai = o)),
    (i = e.pendingLanes),
    i === 0 && (bt = null),
    Sm(n.stateNode),
    Re(e, X()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (o = t[n]), r(o.value, { componentStack: o.stack, digest: o.digest });
  if (li) throw ((li = !1), (e = Rl), (Rl = null), e);
  return (
    ai & 1 && e.tag !== 0 && An(),
    (i = e.pendingLanes),
    i & 1 ? (e === Ol ? _r++ : ((_r = 0), (Ol = e))) : (_r = 0),
    Bt(),
    null
  );
}
function An() {
  if (Ot !== null) {
    var e = Jf(ai),
      t = Me.transition,
      n = I;
    try {
      if (((Me.transition = null), (I = 16 > e ? 16 : e), Ot === null))
        var r = !1;
      else {
        if (((e = Ot), (Ot = null), (ai = 0), j & 6)) throw Error(E(331));
        var o = j;
        for (j |= 4, N = e.current; N !== null; ) {
          var i = N,
            s = i.child;
          if (N.flags & 16) {
            var l = i.deletions;
            if (l !== null) {
              for (var a = 0; a < l.length; a++) {
                var u = l[a];
                for (N = u; N !== null; ) {
                  var c = N;
                  switch (c.tag) {
                    case 0:
                    case 11:
                    case 15:
                      vr(8, c, i);
                  }
                  var f = c.child;
                  if (f !== null) (f.return = c), (N = f);
                  else
                    for (; N !== null; ) {
                      c = N;
                      var p = c.sibling,
                        y = c.return;
                      if ((ap(c), c === u)) {
                        N = null;
                        break;
                      }
                      if (p !== null) {
                        (p.return = y), (N = p);
                        break;
                      }
                      N = y;
                    }
                }
              }
              var h = i.alternate;
              if (h !== null) {
                var v = h.child;
                if (v !== null) {
                  h.child = null;
                  do {
                    var w = v.sibling;
                    (v.sibling = null), (v = w);
                  } while (v !== null);
                }
              }
              N = i;
            }
          }
          if (i.subtreeFlags & 2064 && s !== null) (s.return = i), (N = s);
          else
            e: for (; N !== null; ) {
              if (((i = N), i.flags & 2048))
                switch (i.tag) {
                  case 0:
                  case 11:
                  case 15:
                    vr(9, i, i.return);
                }
              var m = i.sibling;
              if (m !== null) {
                (m.return = i.return), (N = m);
                break e;
              }
              N = i.return;
            }
        }
        var d = e.current;
        for (N = d; N !== null; ) {
          s = N;
          var g = s.child;
          if (s.subtreeFlags & 2064 && g !== null) (g.return = s), (N = g);
          else
            e: for (s = d; N !== null; ) {
              if (((l = N), l.flags & 2048))
                try {
                  switch (l.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Fi(9, l);
                  }
                } catch (k) {
                  q(l, l.return, k);
                }
              if (l === s) {
                N = null;
                break e;
              }
              var _ = l.sibling;
              if (_ !== null) {
                (_.return = l.return), (N = _);
                break e;
              }
              N = l.return;
            }
        }
        if (
          ((j = o), Bt(), st && typeof st.onPostCommitFiberRoot == 'function')
        )
          try {
            st.onPostCommitFiberRoot(Ci, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      (I = n), (Me.transition = t);
    }
  }
  return !1;
}
function oc(e, t, n) {
  (t = Bn(n, t)),
    (t = Jd(e, t, 1)),
    (e = Ft(e, t, 1)),
    (t = ge()),
    e !== null && (qr(e, 1, t), Re(e, t));
}
function q(e, t, n) {
  if (e.tag === 3) oc(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        oc(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == 'function' ||
          (typeof r.componentDidCatch == 'function' &&
            (bt === null || !bt.has(r)))
        ) {
          (e = Bn(n, e)),
            (e = Gd(t, e, 1)),
            (t = Ft(t, e, 1)),
            (e = ge()),
            t !== null && (qr(t, 1, e), Re(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function qg(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t),
    (t = ge()),
    (e.pingedLanes |= e.suspendedLanes & n),
    ne === e &&
      (se & n) === n &&
      (ee === 4 || (ee === 3 && (se & 130023424) === se && 500 > X() - Da)
        ? Gt(e, 0)
        : (ba |= n)),
    Re(e, t);
}
function vp(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = fo), (fo <<= 1), !(fo & 130023424) && (fo = 4194304))
      : (t = 1));
  var n = ge();
  (e = yt(e, t)), e !== null && (qr(e, t, n), Re(e, n));
}
function Xg(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), vp(e, n);
}
function Yg(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        o = e.memoizedState;
      o !== null && (n = o.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(E(314));
  }
  r !== null && r.delete(t), vp(e, n);
}
var wp;
wp = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || xe.current) Ee = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return (Ee = !1), Ug(e, t, n);
      Ee = !!(e.flags & 131072);
    }
  else (Ee = !1), K && t.flags & 1048576 && Ed(t, Zo, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      bo(e, t), (e = t.pendingProps);
      var o = jn(t, pe.current);
      Dn(t, n), (o = Pa(null, t, r, e, o, n));
      var i = Na();
      return (
        (t.flags |= 1),
        typeof o == 'object' &&
        o !== null &&
        typeof o.render == 'function' &&
        o.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            Ce(r) ? ((i = !0), Jo(t)) : (i = !1),
            (t.memoizedState =
              o.state !== null && o.state !== void 0 ? o.state : null),
            Ea(t),
            (o.updater = $i),
            (t.stateNode = o),
            (o._reactInternals = t),
            ml(t, r, e, n),
            (t = vl(null, t, r, !0, i, n)))
          : ((t.tag = 0), K && i && ga(t), me(null, t, o, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (bo(e, t),
          (e = t.pendingProps),
          (o = r._init),
          (r = o(r._payload)),
          (t.type = r),
          (o = t.tag = Gg(r)),
          (e = He(r, e)),
          o)
        ) {
          case 0:
            t = yl(null, t, r, e, n);
            break e;
          case 1:
            t = qu(null, t, r, e, n);
            break e;
          case 11:
            t = Wu(null, t, r, e, n);
            break e;
          case 14:
            t = Qu(null, t, r, He(r.type, e), n);
            break e;
        }
        throw Error(E(306, r, ''));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : He(r, o)),
        yl(e, t, r, o, n)
      );
    case 1:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : He(r, o)),
        qu(e, t, r, o, n)
      );
    case 3:
      e: {
        if ((np(t), e === null)) throw Error(E(387));
        (r = t.pendingProps),
          (i = t.memoizedState),
          (o = i.element),
          Nd(e, t),
          ni(t, r, null, n);
        var s = t.memoizedState;
        if (((r = s.element), i.isDehydrated))
          if (
            ((i = {
              element: r,
              isDehydrated: !1,
              cache: s.cache,
              pendingSuspenseBoundaries: s.pendingSuspenseBoundaries,
              transitions: s.transitions,
            }),
            (t.updateQueue.baseState = i),
            (t.memoizedState = i),
            t.flags & 256)
          ) {
            (o = Bn(Error(E(423)), t)), (t = Xu(e, t, r, n, o));
            break e;
          } else if (r !== o) {
            (o = Bn(Error(E(424)), t)), (t = Xu(e, t, r, n, o));
            break e;
          } else
            for (
              Le = $t(t.stateNode.containerInfo.firstChild),
                $e = t,
                K = !0,
                Qe = null,
                n = Od(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if ((In(), r === o)) {
            t = vt(e, t, n);
            break e;
          }
          me(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        Td(t),
        e === null && dl(t),
        (r = t.type),
        (o = t.pendingProps),
        (i = e !== null ? e.memoizedProps : null),
        (s = o.children),
        ll(r, o) ? (s = null) : i !== null && ll(r, i) && (t.flags |= 32),
        tp(e, t),
        me(e, t, s, n),
        t.child
      );
    case 6:
      return e === null && dl(t), null;
    case 13:
      return rp(e, t, n);
    case 4:
      return (
        xa(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = zn(t, null, r, n)) : me(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : He(r, o)),
        Wu(e, t, r, o, n)
      );
    case 7:
      return me(e, t, t.pendingProps, n), t.child;
    case 8:
      return me(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return me(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (o = t.pendingProps),
          (i = t.memoizedProps),
          (s = o.value),
          M(ei, r._currentValue),
          (r._currentValue = s),
          i !== null)
        )
          if (Je(i.value, s)) {
            if (i.children === o.children && !xe.current) {
              t = vt(e, t, n);
              break e;
            }
          } else
            for (i = t.child, i !== null && (i.return = t); i !== null; ) {
              var l = i.dependencies;
              if (l !== null) {
                s = i.child;
                for (var a = l.firstContext; a !== null; ) {
                  if (a.context === r) {
                    if (i.tag === 1) {
                      (a = pt(-1, n & -n)), (a.tag = 2);
                      var u = i.updateQueue;
                      if (u !== null) {
                        u = u.shared;
                        var c = u.pending;
                        c === null
                          ? (a.next = a)
                          : ((a.next = c.next), (c.next = a)),
                          (u.pending = a);
                      }
                    }
                    (i.lanes |= n),
                      (a = i.alternate),
                      a !== null && (a.lanes |= n),
                      pl(i.return, n, t),
                      (l.lanes |= n);
                    break;
                  }
                  a = a.next;
                }
              } else if (i.tag === 10) s = i.type === t.type ? null : i.child;
              else if (i.tag === 18) {
                if (((s = i.return), s === null)) throw Error(E(341));
                (s.lanes |= n),
                  (l = s.alternate),
                  l !== null && (l.lanes |= n),
                  pl(s, n, t),
                  (s = i.sibling);
              } else s = i.child;
              if (s !== null) s.return = i;
              else
                for (s = i; s !== null; ) {
                  if (s === t) {
                    s = null;
                    break;
                  }
                  if (((i = s.sibling), i !== null)) {
                    (i.return = s.return), (s = i);
                    break;
                  }
                  s = s.return;
                }
              i = s;
            }
        me(e, t, o.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (o = t.type),
        (r = t.pendingProps.children),
        Dn(t, n),
        (o = Be(o)),
        (r = r(o)),
        (t.flags |= 1),
        me(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (o = He(r, t.pendingProps)),
        (o = He(r.type, o)),
        Qu(e, t, r, o, n)
      );
    case 15:
      return Zd(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : He(r, o)),
        bo(e, t),
        (t.tag = 1),
        Ce(r) ? ((e = !0), Jo(t)) : (e = !1),
        Dn(t, n),
        Yd(t, r, o),
        ml(t, r, o, n),
        vl(null, t, r, !0, e, n)
      );
    case 19:
      return op(e, t, n);
    case 22:
      return ep(e, t, n);
  }
  throw Error(E(156, t.tag));
};
function _p(e, t) {
  return Qf(e, t);
}
function Jg(e, t, n, r) {
  (this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function ze(e, t, n, r) {
  return new Jg(e, t, n, r);
}
function Ia(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function Gg(e) {
  if (typeof e == 'function') return Ia(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === oa)) return 11;
    if (e === ia) return 14;
  }
  return 2;
}
function At(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = ze(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function Uo(e, t, n, r, o, i) {
  var s = 2;
  if (((r = e), typeof e == 'function')) Ia(e) && (s = 1);
  else if (typeof e == 'string') s = 5;
  else
    e: switch (e) {
      case _n:
        return Zt(n.children, o, i, t);
      case ra:
        (s = 8), (o |= 8);
        break;
      case Is:
        return (
          (e = ze(12, n, t, o | 2)), (e.elementType = Is), (e.lanes = i), e
        );
      case zs:
        return (e = ze(13, n, t, o)), (e.elementType = zs), (e.lanes = i), e;
      case Ms:
        return (e = ze(19, n, t, o)), (e.elementType = Ms), (e.lanes = i), e;
      case Tf:
        return Di(n, o, i, t);
      default:
        if (typeof e == 'object' && e !== null)
          switch (e.$$typeof) {
            case Pf:
              s = 10;
              break e;
            case Nf:
              s = 9;
              break e;
            case oa:
              s = 11;
              break e;
            case ia:
              s = 14;
              break e;
            case kt:
              (s = 16), (r = null);
              break e;
          }
        throw Error(E(130, e == null ? e : typeof e, ''));
    }
  return (
    (t = ze(s, n, t, o)), (t.elementType = e), (t.type = r), (t.lanes = i), t
  );
}
function Zt(e, t, n, r) {
  return (e = ze(7, e, r, t)), (e.lanes = n), e;
}
function Di(e, t, n, r) {
  return (
    (e = ze(22, e, r, t)),
    (e.elementType = Tf),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function xs(e, t, n) {
  return (e = ze(6, e, null, t)), (e.lanes = n), e;
}
function Cs(e, t, n) {
  return (
    (t = ze(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function Zg(e, t, n, r, o) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = is(0)),
    (this.expirationTimes = is(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = is(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = o),
    (this.mutableSourceEagerHydrationData = null);
}
function za(e, t, n, r, o, i, s, l, a) {
  return (
    (e = new Zg(e, t, n, l, a)),
    t === 1 ? ((t = 1), i === !0 && (t |= 8)) : (t = 0),
    (i = ze(3, null, null, t)),
    (e.current = i),
    (i.stateNode = e),
    (i.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    Ea(i),
    e
  );
}
function ey(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: wn,
    key: r == null ? null : '' + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function Sp(e) {
  if (!e) return It;
  e = e._reactInternals;
  e: {
    if (fn(e) !== e || e.tag !== 1) throw Error(E(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Ce(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(E(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Ce(n)) return Sd(e, n, t);
  }
  return t;
}
function kp(e, t, n, r, o, i, s, l, a) {
  return (
    (e = za(n, r, !0, e, o, i, s, l, a)),
    (e.context = Sp(null)),
    (n = e.current),
    (r = ge()),
    (o = Dt(n)),
    (i = pt(r, o)),
    (i.callback = t ?? null),
    Ft(n, i, o),
    (e.current.lanes = o),
    qr(e, o, r),
    Re(e, r),
    e
  );
}
function Ai(e, t, n, r) {
  var o = t.current,
    i = ge(),
    s = Dt(o);
  return (
    (n = Sp(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = pt(i, s)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = Ft(o, t, s)),
    e !== null && (Ye(e, o, s, i), Lo(e, o, s)),
    s
  );
}
function ci(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function ic(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Ma(e, t) {
  ic(e, t), (e = e.alternate) && ic(e, t);
}
function ty() {
  return null;
}
var Ep =
  typeof reportError == 'function'
    ? reportError
    : function (e) {
        console.error(e);
      };
function Ba(e) {
  this._internalRoot = e;
}
Ui.prototype.render = Ba.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(E(409));
  Ai(e, t, null, null);
};
Ui.prototype.unmount = Ba.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    sn(function () {
      Ai(null, e, null, null);
    }),
      (t[gt] = null);
  }
};
function Ui(e) {
  this._internalRoot = e;
}
Ui.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = ed();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < xt.length && t !== 0 && t < xt[n].priority; n++);
    xt.splice(n, 0, e), n === 0 && nd(e);
  }
};
function Va(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function ji(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== ' react-mount-point-unstable '))
  );
}
function sc() {}
function ny(e, t, n, r, o) {
  if (o) {
    if (typeof r == 'function') {
      var i = r;
      r = function () {
        var u = ci(s);
        i.call(u);
      };
    }
    var s = kp(t, r, e, 0, null, !1, !1, '', sc);
    return (
      (e._reactRootContainer = s),
      (e[gt] = s.current),
      Lr(e.nodeType === 8 ? e.parentNode : e),
      sn(),
      s
    );
  }
  for (; (o = e.lastChild); ) e.removeChild(o);
  if (typeof r == 'function') {
    var l = r;
    r = function () {
      var u = ci(a);
      l.call(u);
    };
  }
  var a = za(e, 0, !1, null, null, !1, !1, '', sc);
  return (
    (e._reactRootContainer = a),
    (e[gt] = a.current),
    Lr(e.nodeType === 8 ? e.parentNode : e),
    sn(function () {
      Ai(t, a, n, r);
    }),
    a
  );
}
function Ii(e, t, n, r, o) {
  var i = n._reactRootContainer;
  if (i) {
    var s = i;
    if (typeof o == 'function') {
      var l = o;
      o = function () {
        var a = ci(s);
        l.call(a);
      };
    }
    Ai(t, s, e, o);
  } else s = ny(n, t, e, o, r);
  return ci(s);
}
Gf = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = ur(t.pendingLanes);
        n !== 0 &&
          (aa(t, n | 1), Re(t, X()), !(j & 6) && ((Vn = X() + 500), Bt()));
      }
      break;
    case 13:
      sn(function () {
        var r = yt(e, 1);
        if (r !== null) {
          var o = ge();
          Ye(r, e, 1, o);
        }
      }),
        Ma(e, 1);
  }
};
ua = function (e) {
  if (e.tag === 13) {
    var t = yt(e, 134217728);
    if (t !== null) {
      var n = ge();
      Ye(t, e, 134217728, n);
    }
    Ma(e, 134217728);
  }
};
Zf = function (e) {
  if (e.tag === 13) {
    var t = Dt(e),
      n = yt(e, t);
    if (n !== null) {
      var r = ge();
      Ye(n, e, t, r);
    }
    Ma(e, t);
  }
};
ed = function () {
  return I;
};
td = function (e, t) {
  var n = I;
  try {
    return (I = e), t();
  } finally {
    I = n;
  }
};
Js = function (e, t, n) {
  switch (t) {
    case 'input':
      if ((Ks(e, n), (t = n.name), n.type === 'radio' && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            'input[name=' + JSON.stringify('' + t) + '][type="radio"]'
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var o = Ni(r);
            if (!o) throw Error(E(90));
            $f(r), Ks(r, o);
          }
        }
      }
      break;
    case 'textarea':
      bf(e, n);
      break;
    case 'select':
      (t = n.value), t != null && Ln(e, !!n.multiple, t, !1);
  }
};
Mf = Aa;
Bf = sn;
var ry = { usingClientEntryPoint: !1, Events: [Yr, xn, Ni, If, zf, Aa] },
  or = {
    findFiberByHostInstance: qt,
    bundleType: 0,
    version: '18.3.1',
    rendererPackageName: 'react-dom',
  },
  oy = {
    bundleType: or.bundleType,
    version: or.version,
    rendererPackageName: or.rendererPackageName,
    rendererConfig: or.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: _t.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = Hf(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: or.findFiberByHostInstance || ty,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: '18.3.1-next-f1338f8080-20240426',
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
  var Eo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Eo.isDisabled && Eo.supportsFiber)
    try {
      (Ci = Eo.inject(oy)), (st = Eo);
    } catch {}
}
Ae.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ry;
Ae.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Va(t)) throw Error(E(200));
  return ey(e, t, null, n);
};
Ae.createRoot = function (e, t) {
  if (!Va(e)) throw Error(E(299));
  var n = !1,
    r = '',
    o = Ep;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (o = t.onRecoverableError)),
    (t = za(e, 1, !1, null, null, n, !1, r, o)),
    (e[gt] = t.current),
    Lr(e.nodeType === 8 ? e.parentNode : e),
    new Ba(t)
  );
};
Ae.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == 'function'
      ? Error(E(188))
      : ((e = Object.keys(e).join(',')), Error(E(268, e)));
  return (e = Hf(t)), (e = e === null ? null : e.stateNode), e;
};
Ae.flushSync = function (e) {
  return sn(e);
};
Ae.hydrate = function (e, t, n) {
  if (!ji(t)) throw Error(E(200));
  return Ii(null, e, t, !0, n);
};
Ae.hydrateRoot = function (e, t, n) {
  if (!Va(e)) throw Error(E(405));
  var r = (n != null && n.hydratedSources) || null,
    o = !1,
    i = '',
    s = Ep;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (o = !0),
      n.identifierPrefix !== void 0 && (i = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (s = n.onRecoverableError)),
    (t = kp(t, null, e, 1, n ?? null, o, !1, i, s)),
    (e[gt] = t.current),
    Lr(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (o = n._getVersion),
        (o = o(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, o])
          : t.mutableSourceEagerHydrationData.push(n, o);
  return new Ui(t);
};
Ae.render = function (e, t, n) {
  if (!ji(t)) throw Error(E(200));
  return Ii(null, e, t, !1, n);
};
Ae.unmountComponentAtNode = function (e) {
  if (!ji(e)) throw Error(E(40));
  return e._reactRootContainer
    ? (sn(function () {
        Ii(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[gt] = null);
        });
      }),
      !0)
    : !1;
};
Ae.unstable_batchedUpdates = Aa;
Ae.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!ji(n)) throw Error(E(200));
  if (e == null || e._reactInternals === void 0) throw Error(E(38));
  return Ii(e, t, n, !1, r);
};
Ae.version = '18.3.1-next-f1338f8080-20240426';
function xp() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(xp);
    } catch (e) {
      console.error(e);
    }
}
xp(), (xf.exports = Ae);
var Cp = xf.exports;
const AR = ql(Cp);
var Rp,
  lc = Cp;
(Rp = lc.createRoot), lc.hydrateRoot;
var iy = {};
/**
 * @license React
 * use-sync-external-store-with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Gr = P;
function sy(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var ly = typeof Object.is == 'function' ? Object.is : sy,
  ay = Gr.useSyncExternalStore,
  uy = Gr.useRef,
  cy = Gr.useEffect,
  fy = Gr.useMemo,
  dy = Gr.useDebugValue;
iy.useSyncExternalStoreWithSelector = function (e, t, n, r, o) {
  var i = uy(null);
  if (i.current === null) {
    var s = { hasValue: !1, value: null };
    i.current = s;
  } else s = i.current;
  i = fy(
    function () {
      function a(y) {
        if (!u) {
          if (((u = !0), (c = y), (y = r(y)), o !== void 0 && s.hasValue)) {
            var h = s.value;
            if (o(h, y)) return (f = h);
          }
          return (f = y);
        }
        if (((h = f), ly(c, y))) return h;
        var v = r(y);
        return o !== void 0 && o(h, v) ? h : ((c = y), (f = v));
      }
      var u = !1,
        c,
        f,
        p = n === void 0 ? null : n;
      return [
        function () {
          return a(t());
        },
        p === null
          ? void 0
          : function () {
              return a(p());
            },
      ];
    },
    [t, n, r, o]
  );
  var l = ay(e, i[0], i[1]);
  return (
    cy(
      function () {
        (s.hasValue = !0), (s.value = l);
      },
      [l]
    ),
    dy(l),
    l
  );
};
var dt = 'default' in Us ? Zl : Us,
  ac = Symbol.for('react-redux-context'),
  uc = typeof globalThis < 'u' ? globalThis : {};
function py() {
  if (!dt.createContext) return {};
  const e = uc[ac] ?? (uc[ac] = new Map());
  let t = e.get(dt.createContext);
  return t || ((t = dt.createContext(null)), e.set(dt.createContext, t)), t;
}
var hy = py();
function my(e) {
  e();
}
function gy() {
  let e = null,
    t = null;
  return {
    clear() {
      (e = null), (t = null);
    },
    notify() {
      my(() => {
        let n = e;
        for (; n; ) n.callback(), (n = n.next);
      });
    },
    get() {
      const n = [];
      let r = e;
      for (; r; ) n.push(r), (r = r.next);
      return n;
    },
    subscribe(n) {
      let r = !0;
      const o = (t = { callback: n, next: null, prev: t });
      return (
        o.prev ? (o.prev.next = o) : (e = o),
        function () {
          !r ||
            e === null ||
            ((r = !1),
            o.next ? (o.next.prev = o.prev) : (t = o.prev),
            o.prev ? (o.prev.next = o.next) : (e = o.next));
        }
      );
    },
  };
}
var cc = { notify() {}, get: () => [] };
function yy(e, t) {
  let n,
    r = cc,
    o = 0,
    i = !1;
  function s(v) {
    c();
    const w = r.subscribe(v);
    let m = !1;
    return () => {
      m || ((m = !0), w(), f());
    };
  }
  function l() {
    r.notify();
  }
  function a() {
    h.onStateChange && h.onStateChange();
  }
  function u() {
    return i;
  }
  function c() {
    o++, n || ((n = e.subscribe(a)), (r = gy()));
  }
  function f() {
    o--, n && o === 0 && (n(), (n = void 0), r.clear(), (r = cc));
  }
  function p() {
    i || ((i = !0), c());
  }
  function y() {
    i && ((i = !1), f());
  }
  const h = {
    addNestedSub: s,
    notifyNestedSubs: l,
    handleChangeWrapper: a,
    isSubscribed: u,
    trySubscribe: p,
    tryUnsubscribe: y,
    getListeners: () => r,
  };
  return h;
}
var vy =
    typeof window < 'u' &&
    typeof window.document < 'u' &&
    typeof window.document.createElement < 'u',
  wy = typeof navigator < 'u' && navigator.product === 'ReactNative',
  _y = vy || wy ? dt.useLayoutEffect : dt.useEffect;
function Sy({
  store: e,
  context: t,
  children: n,
  serverState: r,
  stabilityCheck: o = 'once',
  identityFunctionCheck: i = 'once',
}) {
  const s = dt.useMemo(() => {
      const u = yy(e);
      return {
        store: e,
        subscription: u,
        getServerState: r ? () => r : void 0,
        stabilityCheck: o,
        identityFunctionCheck: i,
      };
    }, [e, r, o, i]),
    l = dt.useMemo(() => e.getState(), [e]);
  _y(() => {
    const { subscription: u } = s;
    return (
      (u.onStateChange = u.notifyNestedSubs),
      u.trySubscribe(),
      l !== e.getState() && u.notifyNestedSubs(),
      () => {
        u.tryUnsubscribe(), (u.onStateChange = void 0);
      }
    );
  }, [s, l]);
  const a = t || hy;
  return dt.createElement(a.Provider, { value: s }, n);
}
var ky = Sy;
function oe(e) {
  return `Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var Ey = (typeof Symbol == 'function' && Symbol.observable) || '@@observable',
  fc = Ey,
  Rs = () => Math.random().toString(36).substring(7).split('').join('.'),
  xy = {
    INIT: `@@redux/INIT${Rs()}`,
    REPLACE: `@@redux/REPLACE${Rs()}`,
    PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${Rs()}`,
  },
  fi = xy;
function Ka(e) {
  if (typeof e != 'object' || e === null) return !1;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; ) t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t || Object.getPrototypeOf(e) === null;
}
function Op(e, t, n) {
  if (typeof e != 'function') throw new Error(oe(2));
  if (
    (typeof t == 'function' && typeof n == 'function') ||
    (typeof n == 'function' && typeof arguments[3] == 'function')
  )
    throw new Error(oe(0));
  if (
    (typeof t == 'function' && typeof n > 'u' && ((n = t), (t = void 0)),
    typeof n < 'u')
  ) {
    if (typeof n != 'function') throw new Error(oe(1));
    return n(Op)(e, t);
  }
  let r = e,
    o = t,
    i = new Map(),
    s = i,
    l = 0,
    a = !1;
  function u() {
    s === i &&
      ((s = new Map()),
      i.forEach((w, m) => {
        s.set(m, w);
      }));
  }
  function c() {
    if (a) throw new Error(oe(3));
    return o;
  }
  function f(w) {
    if (typeof w != 'function') throw new Error(oe(4));
    if (a) throw new Error(oe(5));
    let m = !0;
    u();
    const d = l++;
    return (
      s.set(d, w),
      function () {
        if (m) {
          if (a) throw new Error(oe(6));
          (m = !1), u(), s.delete(d), (i = null);
        }
      }
    );
  }
  function p(w) {
    if (!Ka(w)) throw new Error(oe(7));
    if (typeof w.type > 'u') throw new Error(oe(8));
    if (typeof w.type != 'string') throw new Error(oe(17));
    if (a) throw new Error(oe(9));
    try {
      (a = !0), (o = r(o, w));
    } finally {
      a = !1;
    }
    return (
      (i = s).forEach(d => {
        d();
      }),
      w
    );
  }
  function y(w) {
    if (typeof w != 'function') throw new Error(oe(10));
    (r = w), p({ type: fi.REPLACE });
  }
  function h() {
    const w = f;
    return {
      subscribe(m) {
        if (typeof m != 'object' || m === null) throw new Error(oe(11));
        function d() {
          const _ = m;
          _.next && _.next(c());
        }
        return d(), { unsubscribe: w(d) };
      },
      [fc]() {
        return this;
      },
    };
  }
  return (
    p({ type: fi.INIT }),
    { dispatch: p, subscribe: f, getState: c, replaceReducer: y, [fc]: h }
  );
}
function Cy(e) {
  Object.keys(e).forEach(t => {
    const n = e[t];
    if (typeof n(void 0, { type: fi.INIT }) > 'u') throw new Error(oe(12));
    if (typeof n(void 0, { type: fi.PROBE_UNKNOWN_ACTION() }) > 'u')
      throw new Error(oe(13));
  });
}
function Ry(e) {
  const t = Object.keys(e),
    n = {};
  for (let i = 0; i < t.length; i++) {
    const s = t[i];
    typeof e[s] == 'function' && (n[s] = e[s]);
  }
  const r = Object.keys(n);
  let o;
  try {
    Cy(n);
  } catch (i) {
    o = i;
  }
  return function (s = {}, l) {
    if (o) throw o;
    let a = !1;
    const u = {};
    for (let c = 0; c < r.length; c++) {
      const f = r[c],
        p = n[f],
        y = s[f],
        h = p(y, l);
      if (typeof h > 'u') throw (l && l.type, new Error(oe(14)));
      (u[f] = h), (a = a || h !== y);
    }
    return (a = a || r.length !== Object.keys(s).length), a ? u : s;
  };
}
function di(...e) {
  return e.length === 0
    ? t => t
    : e.length === 1
      ? e[0]
      : e.reduce(
          (t, n) =>
            (...r) =>
              t(n(...r))
        );
}
function Oy(...e) {
  return t => (n, r) => {
    const o = t(n, r);
    let i = () => {
      throw new Error(oe(15));
    };
    const s = { getState: o.getState, dispatch: (a, ...u) => i(a, ...u) },
      l = e.map(a => a(s));
    return (i = di(...l)(o.dispatch)), { ...o, dispatch: i };
  };
}
function Py(e) {
  return Ka(e) && 'type' in e && typeof e.type == 'string';
}
var Pp = Symbol.for('immer-nothing'),
  dc = Symbol.for('immer-draftable'),
  be = Symbol.for('immer-state');
function qe(e, ...t) {
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var Kn = Object.getPrototypeOf;
function ln(e) {
  return !!e && !!e[be];
}
function wt(e) {
  var t;
  return e
    ? Np(e) ||
        Array.isArray(e) ||
        !!e[dc] ||
        !!((t = e.constructor) != null && t[dc]) ||
        Mi(e) ||
        Bi(e)
    : !1;
}
var Ny = Object.prototype.constructor.toString();
function Np(e) {
  if (!e || typeof e != 'object') return !1;
  const t = Kn(e);
  if (t === null) return !0;
  const n = Object.hasOwnProperty.call(t, 'constructor') && t.constructor;
  return n === Object
    ? !0
    : typeof n == 'function' && Function.toString.call(n) === Ny;
}
function pi(e, t) {
  zi(e) === 0
    ? Reflect.ownKeys(e).forEach(n => {
        t(n, e[n], e);
      })
    : e.forEach((n, r) => t(r, n, e));
}
function zi(e) {
  const t = e[be];
  return t ? t.type_ : Array.isArray(e) ? 1 : Mi(e) ? 2 : Bi(e) ? 3 : 0;
}
function Tl(e, t) {
  return zi(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function Tp(e, t, n) {
  const r = zi(e);
  r === 2 ? e.set(t, n) : r === 3 ? e.add(n) : (e[t] = n);
}
function Ty(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function Mi(e) {
  return e instanceof Map;
}
function Bi(e) {
  return e instanceof Set;
}
function Qt(e) {
  return e.copy_ || e.base_;
}
function Ll(e, t) {
  if (Mi(e)) return new Map(e);
  if (Bi(e)) return new Set(e);
  if (Array.isArray(e)) return Array.prototype.slice.call(e);
  const n = Np(e);
  if (t === !0 || (t === 'class_only' && !n)) {
    const r = Object.getOwnPropertyDescriptors(e);
    delete r[be];
    let o = Reflect.ownKeys(r);
    for (let i = 0; i < o.length; i++) {
      const s = o[i],
        l = r[s];
      l.writable === !1 && ((l.writable = !0), (l.configurable = !0)),
        (l.get || l.set) &&
          (r[s] = {
            configurable: !0,
            writable: !0,
            enumerable: l.enumerable,
            value: e[s],
          });
    }
    return Object.create(Kn(e), r);
  } else {
    const r = Kn(e);
    if (r !== null && n) return { ...e };
    const o = Object.create(r);
    return Object.assign(o, e);
  }
}
function Ha(e, t = !1) {
  return (
    Vi(e) ||
      ln(e) ||
      !wt(e) ||
      (zi(e) > 1 && (e.set = e.add = e.clear = e.delete = Ly),
      Object.freeze(e),
      t && Object.entries(e).forEach(([n, r]) => Ha(r, !0))),
    e
  );
}
function Ly() {
  qe(2);
}
function Vi(e) {
  return Object.isFrozen(e);
}
var $y = {};
function an(e) {
  const t = $y[e];
  return t || qe(0, e), t;
}
var zr;
function Lp() {
  return zr;
}
function Fy(e, t) {
  return {
    drafts_: [],
    parent_: e,
    immer_: t,
    canAutoFreeze_: !0,
    unfinalizedDrafts_: 0,
  };
}
function pc(e, t) {
  t &&
    (an('Patches'),
    (e.patches_ = []),
    (e.inversePatches_ = []),
    (e.patchListener_ = t));
}
function $l(e) {
  Fl(e), e.drafts_.forEach(by), (e.drafts_ = null);
}
function Fl(e) {
  e === zr && (zr = e.parent_);
}
function hc(e) {
  return (zr = Fy(zr, e));
}
function by(e) {
  const t = e[be];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : (t.revoked_ = !0);
}
function mc(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const n = t.drafts_[0];
  return (
    e !== void 0 && e !== n
      ? (n[be].modified_ && ($l(t), qe(4)),
        wt(e) && ((e = hi(t, e)), t.parent_ || mi(t, e)),
        t.patches_ &&
          an('Patches').generateReplacementPatches_(
            n[be].base_,
            e,
            t.patches_,
            t.inversePatches_
          ))
      : (e = hi(t, n, [])),
    $l(t),
    t.patches_ && t.patchListener_(t.patches_, t.inversePatches_),
    e !== Pp ? e : void 0
  );
}
function hi(e, t, n) {
  if (Vi(t)) return t;
  const r = t[be];
  if (!r) return pi(t, (o, i) => gc(e, r, t, o, i, n)), t;
  if (r.scope_ !== e) return t;
  if (!r.modified_) return mi(e, r.base_, !0), r.base_;
  if (!r.finalized_) {
    (r.finalized_ = !0), r.scope_.unfinalizedDrafts_--;
    const o = r.copy_;
    let i = o,
      s = !1;
    r.type_ === 3 && ((i = new Set(o)), o.clear(), (s = !0)),
      pi(i, (l, a) => gc(e, r, o, l, a, n, s)),
      mi(e, o, !1),
      n &&
        e.patches_ &&
        an('Patches').generatePatches_(r, n, e.patches_, e.inversePatches_);
  }
  return r.copy_;
}
function gc(e, t, n, r, o, i, s) {
  if (ln(o)) {
    const l =
        i && t && t.type_ !== 3 && !Tl(t.assigned_, r) ? i.concat(r) : void 0,
      a = hi(e, o, l);
    if ((Tp(n, r, a), ln(a))) e.canAutoFreeze_ = !1;
    else return;
  } else s && n.add(o);
  if (wt(o) && !Vi(o)) {
    if (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1) return;
    hi(e, o),
      (!t || !t.scope_.parent_) &&
        typeof r != 'symbol' &&
        Object.prototype.propertyIsEnumerable.call(n, r) &&
        mi(e, o);
  }
}
function mi(e, t, n = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && Ha(t, n);
}
function Dy(e, t) {
  const n = Array.isArray(e),
    r = {
      type_: n ? 1 : 0,
      scope_: t ? t.scope_ : Lp(),
      modified_: !1,
      finalized_: !1,
      assigned_: {},
      parent_: t,
      base_: e,
      draft_: null,
      copy_: null,
      revoke_: null,
      isManual_: !1,
    };
  let o = r,
    i = Wa;
  n && ((o = [r]), (i = Mr));
  const { revoke: s, proxy: l } = Proxy.revocable(o, i);
  return (r.draft_ = l), (r.revoke_ = s), l;
}
var Wa = {
    get(e, t) {
      if (t === be) return e;
      const n = Qt(e);
      if (!Tl(n, t)) return Ay(e, n, t);
      const r = n[t];
      return e.finalized_ || !wt(r)
        ? r
        : r === Os(e.base_, t)
          ? (Ps(e), (e.copy_[t] = Dl(r, e)))
          : r;
    },
    has(e, t) {
      return t in Qt(e);
    },
    ownKeys(e) {
      return Reflect.ownKeys(Qt(e));
    },
    set(e, t, n) {
      const r = $p(Qt(e), t);
      if (r != null && r.set) return r.set.call(e.draft_, n), !0;
      if (!e.modified_) {
        const o = Os(Qt(e), t),
          i = o == null ? void 0 : o[be];
        if (i && i.base_ === n)
          return (e.copy_[t] = n), (e.assigned_[t] = !1), !0;
        if (Ty(n, o) && (n !== void 0 || Tl(e.base_, t))) return !0;
        Ps(e), bl(e);
      }
      return (
        (e.copy_[t] === n && (n !== void 0 || t in e.copy_)) ||
          (Number.isNaN(n) && Number.isNaN(e.copy_[t])) ||
          ((e.copy_[t] = n), (e.assigned_[t] = !0)),
        !0
      );
    },
    deleteProperty(e, t) {
      return (
        Os(e.base_, t) !== void 0 || t in e.base_
          ? ((e.assigned_[t] = !1), Ps(e), bl(e))
          : delete e.assigned_[t],
        e.copy_ && delete e.copy_[t],
        !0
      );
    },
    getOwnPropertyDescriptor(e, t) {
      const n = Qt(e),
        r = Reflect.getOwnPropertyDescriptor(n, t);
      return (
        r && {
          writable: !0,
          configurable: e.type_ !== 1 || t !== 'length',
          enumerable: r.enumerable,
          value: n[t],
        }
      );
    },
    defineProperty() {
      qe(11);
    },
    getPrototypeOf(e) {
      return Kn(e.base_);
    },
    setPrototypeOf() {
      qe(12);
    },
  },
  Mr = {};
pi(Wa, (e, t) => {
  Mr[e] = function () {
    return (arguments[0] = arguments[0][0]), t.apply(this, arguments);
  };
});
Mr.deleteProperty = function (e, t) {
  return Mr.set.call(this, e, t, void 0);
};
Mr.set = function (e, t, n) {
  return Wa.set.call(this, e[0], t, n, e[0]);
};
function Os(e, t) {
  const n = e[be];
  return (n ? Qt(n) : e)[t];
}
function Ay(e, t, n) {
  var o;
  const r = $p(t, n);
  return r
    ? 'value' in r
      ? r.value
      : (o = r.get) == null
        ? void 0
        : o.call(e.draft_)
    : void 0;
}
function $p(e, t) {
  if (!(t in e)) return;
  let n = Kn(e);
  for (; n; ) {
    const r = Object.getOwnPropertyDescriptor(n, t);
    if (r) return r;
    n = Kn(n);
  }
}
function bl(e) {
  e.modified_ || ((e.modified_ = !0), e.parent_ && bl(e.parent_));
}
function Ps(e) {
  e.copy_ || (e.copy_ = Ll(e.base_, e.scope_.immer_.useStrictShallowCopy_));
}
var Uy = class {
  constructor(e) {
    (this.autoFreeze_ = !0),
      (this.useStrictShallowCopy_ = !1),
      (this.produce = (t, n, r) => {
        if (typeof t == 'function' && typeof n != 'function') {
          const i = n;
          n = t;
          const s = this;
          return function (a = i, ...u) {
            return s.produce(a, c => n.call(this, c, ...u));
          };
        }
        typeof n != 'function' && qe(6),
          r !== void 0 && typeof r != 'function' && qe(7);
        let o;
        if (wt(t)) {
          const i = hc(this),
            s = Dl(t, void 0);
          let l = !0;
          try {
            (o = n(s)), (l = !1);
          } finally {
            l ? $l(i) : Fl(i);
          }
          return pc(i, r), mc(o, i);
        } else if (!t || typeof t != 'object') {
          if (
            ((o = n(t)),
            o === void 0 && (o = t),
            o === Pp && (o = void 0),
            this.autoFreeze_ && Ha(o, !0),
            r)
          ) {
            const i = [],
              s = [];
            an('Patches').generateReplacementPatches_(t, o, i, s), r(i, s);
          }
          return o;
        } else qe(1, t);
      }),
      (this.produceWithPatches = (t, n) => {
        if (typeof t == 'function')
          return (s, ...l) => this.produceWithPatches(s, a => t(a, ...l));
        let r, o;
        return [
          this.produce(t, n, (s, l) => {
            (r = s), (o = l);
          }),
          r,
          o,
        ];
      }),
      typeof (e == null ? void 0 : e.autoFreeze) == 'boolean' &&
        this.setAutoFreeze(e.autoFreeze),
      typeof (e == null ? void 0 : e.useStrictShallowCopy) == 'boolean' &&
        this.setUseStrictShallowCopy(e.useStrictShallowCopy);
  }
  createDraft(e) {
    wt(e) || qe(8), ln(e) && (e = jy(e));
    const t = hc(this),
      n = Dl(e, void 0);
    return (n[be].isManual_ = !0), Fl(t), n;
  }
  finishDraft(e, t) {
    const n = e && e[be];
    (!n || !n.isManual_) && qe(9);
    const { scope_: r } = n;
    return pc(r, t), mc(void 0, r);
  }
  setAutoFreeze(e) {
    this.autoFreeze_ = e;
  }
  setUseStrictShallowCopy(e) {
    this.useStrictShallowCopy_ = e;
  }
  applyPatches(e, t) {
    let n;
    for (n = t.length - 1; n >= 0; n--) {
      const o = t[n];
      if (o.path.length === 0 && o.op === 'replace') {
        e = o.value;
        break;
      }
    }
    n > -1 && (t = t.slice(n + 1));
    const r = an('Patches').applyPatches_;
    return ln(e) ? r(e, t) : this.produce(e, o => r(o, t));
  }
};
function Dl(e, t) {
  const n = Mi(e)
    ? an('MapSet').proxyMap_(e, t)
    : Bi(e)
      ? an('MapSet').proxySet_(e, t)
      : Dy(e, t);
  return (t ? t.scope_ : Lp()).drafts_.push(n), n;
}
function jy(e) {
  return ln(e) || qe(10, e), Fp(e);
}
function Fp(e) {
  if (!wt(e) || Vi(e)) return e;
  const t = e[be];
  let n;
  if (t) {
    if (!t.modified_) return t.base_;
    (t.finalized_ = !0), (n = Ll(e, t.scope_.immer_.useStrictShallowCopy_));
  } else n = Ll(e, !0);
  return (
    pi(n, (r, o) => {
      Tp(n, r, Fp(o));
    }),
    t && (t.finalized_ = !1),
    n
  );
}
var De = new Uy(),
  bp = De.produce;
De.produceWithPatches.bind(De);
De.setAutoFreeze.bind(De);
De.setUseStrictShallowCopy.bind(De);
De.applyPatches.bind(De);
De.createDraft.bind(De);
De.finishDraft.bind(De);
function Dp(e) {
  return ({ dispatch: n, getState: r }) =>
    o =>
    i =>
      typeof i == 'function' ? i(n, r, e) : o(i);
}
var Iy = Dp(),
  zy = Dp,
  My =
    typeof window < 'u' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : function () {
          if (arguments.length !== 0)
            return typeof arguments[0] == 'object'
              ? di
              : di.apply(null, arguments);
        },
  By = e => e && typeof e.match == 'function';
function Sr(e, t) {
  function n(...r) {
    if (t) {
      let o = t(...r);
      if (!o) throw new Error(ht(0));
      return {
        type: e,
        payload: o.payload,
        ...('meta' in o && { meta: o.meta }),
        ...('error' in o && { error: o.error }),
      };
    }
    return { type: e, payload: r[0] };
  }
  return (
    (n.toString = () => `${e}`),
    (n.type = e),
    (n.match = r => Py(r) && r.type === e),
    n
  );
}
var Ap = class fr extends Array {
  constructor(...t) {
    super(...t), Object.setPrototypeOf(this, fr.prototype);
  }
  static get [Symbol.species]() {
    return fr;
  }
  concat(...t) {
    return super.concat.apply(this, t);
  }
  prepend(...t) {
    return t.length === 1 && Array.isArray(t[0])
      ? new fr(...t[0].concat(this))
      : new fr(...t.concat(this));
  }
};
function yc(e) {
  return wt(e) ? bp(e, () => {}) : e;
}
function vc(e, t, n) {
  return e.has(t) ? e.get(t) : e.set(t, n(t)).get(t);
}
function Vy(e) {
  return typeof e == 'boolean';
}
var Ky = () =>
    function (t) {
      const {
        thunk: n = !0,
        immutableCheck: r = !0,
        serializableCheck: o = !0,
        actionCreatorCheck: i = !0,
      } = t ?? {};
      let s = new Ap();
      return n && (Vy(n) ? s.push(Iy) : s.push(zy(n.extraArgument))), s;
    },
  Hy = 'RTK_autoBatch',
  wc = e => t => {
    setTimeout(t, e);
  },
  Wy =
    (e = { type: 'raf' }) =>
    t =>
    (...n) => {
      const r = t(...n);
      let o = !0,
        i = !1,
        s = !1;
      const l = new Set(),
        a =
          e.type === 'tick'
            ? queueMicrotask
            : e.type === 'raf'
              ? typeof window < 'u' && window.requestAnimationFrame
                ? window.requestAnimationFrame
                : wc(10)
              : e.type === 'callback'
                ? e.queueNotification
                : wc(e.timeout),
        u = () => {
          (s = !1), i && ((i = !1), l.forEach(c => c()));
        };
      return Object.assign({}, r, {
        subscribe(c) {
          const f = () => o && c(),
            p = r.subscribe(f);
          return (
            l.add(c),
            () => {
              p(), l.delete(c);
            }
          );
        },
        dispatch(c) {
          var f;
          try {
            return (
              (o = !((f = c == null ? void 0 : c.meta) != null && f[Hy])),
              (i = !o),
              i && (s || ((s = !0), a(u))),
              r.dispatch(c)
            );
          } finally {
            o = !0;
          }
        },
      });
    },
  Qy = e =>
    function (n) {
      const { autoBatch: r = !0 } = n ?? {};
      let o = new Ap(e);
      return r && o.push(Wy(typeof r == 'object' ? r : void 0)), o;
    };
function qy(e) {
  const t = Ky(),
    {
      reducer: n = void 0,
      middleware: r,
      devTools: o = !0,
      preloadedState: i = void 0,
      enhancers: s = void 0,
    } = e || {};
  let l;
  if (typeof n == 'function') l = n;
  else if (Ka(n)) l = Ry(n);
  else throw new Error(ht(1));
  let a;
  typeof r == 'function' ? (a = r(t)) : (a = t());
  let u = di;
  o && (u = My({ trace: !1, ...(typeof o == 'object' && o) }));
  const c = Oy(...a),
    f = Qy(c);
  let p = typeof s == 'function' ? s(f) : f();
  const y = u(...p);
  return Op(l, i, y);
}
function Up(e) {
  const t = {},
    n = [];
  let r;
  const o = {
    addCase(i, s) {
      const l = typeof i == 'string' ? i : i.type;
      if (!l) throw new Error(ht(28));
      if (l in t) throw new Error(ht(29));
      return (t[l] = s), o;
    },
    addMatcher(i, s) {
      return n.push({ matcher: i, reducer: s }), o;
    },
    addDefaultCase(i) {
      return (r = i), o;
    },
  };
  return e(o), [t, n, r];
}
function Xy(e) {
  return typeof e == 'function';
}
function Yy(e, t) {
  let [n, r, o] = Up(t),
    i;
  if (Xy(e)) i = () => yc(e());
  else {
    const l = yc(e);
    i = () => l;
  }
  function s(l = i(), a) {
    let u = [
      n[a.type],
      ...r.filter(({ matcher: c }) => c(a)).map(({ reducer: c }) => c),
    ];
    return (
      u.filter(c => !!c).length === 0 && (u = [o]),
      u.reduce((c, f) => {
        if (f)
          if (ln(c)) {
            const y = f(c, a);
            return y === void 0 ? c : y;
          } else {
            if (wt(c)) return bp(c, p => f(p, a));
            {
              const p = f(c, a);
              if (p === void 0) {
                if (c === null) return c;
                throw Error(
                  'A case reducer on a non-draftable value must not return undefined'
                );
              }
              return p;
            }
          }
        return c;
      }, l)
    );
  }
  return (s.getInitialState = i), s;
}
var Jy = (e, t) => (By(e) ? e.match(t) : e(t));
function Gy(...e) {
  return t => e.some(n => Jy(n, t));
}
var Zy = 'ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW',
  ev = (e = 21) => {
    let t = '',
      n = e;
    for (; n--; ) t += Zy[(Math.random() * 64) | 0];
    return t;
  },
  tv = ['name', 'message', 'stack', 'code'],
  Ns = class {
    constructor(e, t) {
      Zi(this, '_type');
      (this.payload = e), (this.meta = t);
    }
  },
  _c = class {
    constructor(e, t) {
      Zi(this, '_type');
      (this.payload = e), (this.meta = t);
    }
  },
  nv = e => {
    if (typeof e == 'object' && e !== null) {
      const t = {};
      for (const n of tv) typeof e[n] == 'string' && (t[n] = e[n]);
      return t;
    }
    return { message: String(e) };
  },
  rv = (() => {
    function e(t, n, r) {
      const o = Sr(t + '/fulfilled', (a, u, c, f) => ({
          payload: a,
          meta: {
            ...(f || {}),
            arg: c,
            requestId: u,
            requestStatus: 'fulfilled',
          },
        })),
        i = Sr(t + '/pending', (a, u, c) => ({
          payload: void 0,
          meta: {
            ...(c || {}),
            arg: u,
            requestId: a,
            requestStatus: 'pending',
          },
        })),
        s = Sr(t + '/rejected', (a, u, c, f, p) => ({
          payload: f,
          error: ((r && r.serializeError) || nv)(a || 'Rejected'),
          meta: {
            ...(p || {}),
            arg: c,
            requestId: u,
            rejectedWithValue: !!f,
            requestStatus: 'rejected',
            aborted: (a == null ? void 0 : a.name) === 'AbortError',
            condition: (a == null ? void 0 : a.name) === 'ConditionError',
          },
        }));
      function l(a) {
        return (u, c, f) => {
          const p = r != null && r.idGenerator ? r.idGenerator(a) : ev(),
            y = new AbortController();
          let h, v;
          function w(d) {
            (v = d), y.abort();
          }
          const m = (async function () {
            var _, k;
            let d;
            try {
              let C =
                (_ = r == null ? void 0 : r.condition) == null
                  ? void 0
                  : _.call(r, a, { getState: c, extra: f });
              if ((iv(C) && (C = await C), C === !1 || y.signal.aborted))
                throw {
                  name: 'ConditionError',
                  message: 'Aborted due to condition callback returning false.',
                };
              const R = new Promise((x, L) => {
                (h = () => {
                  L({ name: 'AbortError', message: v || 'Aborted' });
                }),
                  y.signal.addEventListener('abort', h);
              });
              u(
                i(
                  p,
                  a,
                  (k = r == null ? void 0 : r.getPendingMeta) == null
                    ? void 0
                    : k.call(
                        r,
                        { requestId: p, arg: a },
                        { getState: c, extra: f }
                      )
                )
              ),
                (d = await Promise.race([
                  R,
                  Promise.resolve(
                    n(a, {
                      dispatch: u,
                      getState: c,
                      extra: f,
                      requestId: p,
                      signal: y.signal,
                      abort: w,
                      rejectWithValue: (x, L) => new Ns(x, L),
                      fulfillWithValue: (x, L) => new _c(x, L),
                    })
                  ).then(x => {
                    if (x instanceof Ns) throw x;
                    return x instanceof _c
                      ? o(x.payload, p, a, x.meta)
                      : o(x, p, a);
                  }),
                ]));
            } catch (C) {
              d =
                C instanceof Ns ? s(null, p, a, C.payload, C.meta) : s(C, p, a);
            } finally {
              h && y.signal.removeEventListener('abort', h);
            }
            return (
              (r &&
                !r.dispatchConditionRejection &&
                s.match(d) &&
                d.meta.condition) ||
                u(d),
              d
            );
          })();
          return Object.assign(m, {
            abort: w,
            requestId: p,
            arg: a,
            unwrap() {
              return m.then(ov);
            },
          });
        };
      }
      return Object.assign(l, {
        pending: i,
        rejected: s,
        fulfilled: o,
        settled: Gy(s, o),
        typePrefix: t,
      });
    }
    return (e.withTypes = () => e), e;
  })();
function ov(e) {
  if (e.meta && e.meta.rejectedWithValue) throw e.payload;
  if (e.error) throw e.error;
  return e.payload;
}
function iv(e) {
  return e !== null && typeof e == 'object' && typeof e.then == 'function';
}
var sv = Symbol.for('rtk-slice-createasyncthunk');
function lv(e, t) {
  return `${e}/${t}`;
}
function av({ creators: e } = {}) {
  var n;
  const t = (n = e == null ? void 0 : e.asyncThunk) == null ? void 0 : n[sv];
  return function (o) {
    const { name: i, reducerPath: s = i } = o;
    if (!i) throw new Error(ht(11));
    typeof process < 'u';
    const l =
        (typeof o.reducers == 'function' ? o.reducers(fv()) : o.reducers) || {},
      a = Object.keys(l),
      u = {
        sliceCaseReducersByName: {},
        sliceCaseReducersByType: {},
        actionCreators: {},
        sliceMatchers: [],
      },
      c = {
        addCase(g, _) {
          const k = typeof g == 'string' ? g : g.type;
          if (!k) throw new Error(ht(12));
          if (k in u.sliceCaseReducersByType) throw new Error(ht(13));
          return (u.sliceCaseReducersByType[k] = _), c;
        },
        addMatcher(g, _) {
          return u.sliceMatchers.push({ matcher: g, reducer: _ }), c;
        },
        exposeAction(g, _) {
          return (u.actionCreators[g] = _), c;
        },
        exposeCaseReducer(g, _) {
          return (u.sliceCaseReducersByName[g] = _), c;
        },
      };
    a.forEach(g => {
      const _ = l[g],
        k = {
          reducerName: g,
          type: lv(i, g),
          createNotation: typeof o.reducers == 'function',
        };
      pv(_) ? mv(k, _, c, t) : dv(k, _, c);
    });
    function f() {
      const [g = {}, _ = [], k = void 0] =
          typeof o.extraReducers == 'function'
            ? Up(o.extraReducers)
            : [o.extraReducers],
        C = { ...g, ...u.sliceCaseReducersByType };
      return Yy(o.initialState, R => {
        for (let x in C) R.addCase(x, C[x]);
        for (let x of u.sliceMatchers) R.addMatcher(x.matcher, x.reducer);
        for (let x of _) R.addMatcher(x.matcher, x.reducer);
        k && R.addDefaultCase(k);
      });
    }
    const p = g => g,
      y = new Map();
    let h;
    function v(g, _) {
      return h || (h = f()), h(g, _);
    }
    function w() {
      return h || (h = f()), h.getInitialState();
    }
    function m(g, _ = !1) {
      function k(R) {
        let x = R[g];
        return typeof x > 'u' && _ && (x = w()), x;
      }
      function C(R = p) {
        const x = vc(y, _, () => new WeakMap());
        return vc(x, R, () => {
          const L = {};
          for (const [T, he] of Object.entries(o.selectors ?? {}))
            L[T] = uv(he, R, w, _);
          return L;
        });
      }
      return {
        reducerPath: g,
        getSelectors: C,
        get selectors() {
          return C(k);
        },
        selectSlice: k,
      };
    }
    const d = {
      name: i,
      reducer: v,
      actions: u.actionCreators,
      caseReducers: u.sliceCaseReducersByName,
      getInitialState: w,
      ...m(s),
      injectInto(g, { reducerPath: _, ...k } = {}) {
        const C = _ ?? s;
        return (
          g.inject({ reducerPath: C, reducer: v }, k), { ...d, ...m(C, !0) }
        );
      },
    };
    return d;
  };
}
function uv(e, t, n, r) {
  function o(i, ...s) {
    let l = t(i);
    return typeof l > 'u' && r && (l = n()), e(l, ...s);
  }
  return (o.unwrapped = e), o;
}
var cv = av();
function fv() {
  function e(t, n) {
    return { _reducerDefinitionType: 'asyncThunk', payloadCreator: t, ...n };
  }
  return (
    (e.withTypes = () => e),
    {
      reducer(t) {
        return Object.assign(
          {
            [t.name](...n) {
              return t(...n);
            },
          }[t.name],
          { _reducerDefinitionType: 'reducer' }
        );
      },
      preparedReducer(t, n) {
        return {
          _reducerDefinitionType: 'reducerWithPrepare',
          prepare: t,
          reducer: n,
        };
      },
      asyncThunk: e,
    }
  );
}
function dv({ type: e, reducerName: t, createNotation: n }, r, o) {
  let i, s;
  if ('reducer' in r) {
    if (n && !hv(r)) throw new Error(ht(17));
    (i = r.reducer), (s = r.prepare);
  } else i = r;
  o.addCase(e, i)
    .exposeCaseReducer(t, i)
    .exposeAction(t, s ? Sr(e, s) : Sr(e));
}
function pv(e) {
  return e._reducerDefinitionType === 'asyncThunk';
}
function hv(e) {
  return e._reducerDefinitionType === 'reducerWithPrepare';
}
function mv({ type: e, reducerName: t }, n, r, o) {
  if (!o) throw new Error(ht(18));
  const {
      payloadCreator: i,
      fulfilled: s,
      pending: l,
      rejected: a,
      settled: u,
      options: c,
    } = n,
    f = o(e, i, c);
  r.exposeAction(t, f),
    s && r.addCase(f.fulfilled, s),
    l && r.addCase(f.pending, l),
    a && r.addCase(f.rejected, a),
    u && r.addMatcher(f.settled, u),
    r.exposeCaseReducer(t, {
      fulfilled: s || xo,
      pending: l || xo,
      rejected: a || xo,
      settled: u || xo,
    });
}
function xo() {}
function ht(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
function jp(e, t) {
  return function () {
    return e.apply(t, arguments);
  };
}
const { toString: gv } = Object.prototype,
  { getPrototypeOf: Qa } = Object,
  { iterator: Ki, toStringTag: Ip } = Symbol,
  Hi = (e => t => {
    const n = gv.call(t);
    return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  Ge = e => ((e = e.toLowerCase()), t => Hi(t) === e),
  Wi = e => t => typeof t === e,
  { isArray: qn } = Array,
  Br = Wi('undefined');
function Zr(e) {
  return (
    e !== null &&
    !Br(e) &&
    e.constructor !== null &&
    !Br(e.constructor) &&
    Oe(e.constructor.isBuffer) &&
    e.constructor.isBuffer(e)
  );
}
const zp = Ge('ArrayBuffer');
function yv(e) {
  let t;
  return (
    typeof ArrayBuffer < 'u' && ArrayBuffer.isView
      ? (t = ArrayBuffer.isView(e))
      : (t = e && e.buffer && zp(e.buffer)),
    t
  );
}
const vv = Wi('string'),
  Oe = Wi('function'),
  Mp = Wi('number'),
  eo = e => e !== null && typeof e == 'object',
  wv = e => e === !0 || e === !1,
  jo = e => {
    if (Hi(e) !== 'object') return !1;
    const t = Qa(e);
    return (
      (t === null ||
        t === Object.prototype ||
        Object.getPrototypeOf(t) === null) &&
      !(Ip in e) &&
      !(Ki in e)
    );
  },
  _v = e => {
    if (!eo(e) || Zr(e)) return !1;
    try {
      return (
        Object.keys(e).length === 0 &&
        Object.getPrototypeOf(e) === Object.prototype
      );
    } catch {
      return !1;
    }
  },
  Sv = Ge('Date'),
  kv = Ge('File'),
  Ev = Ge('Blob'),
  xv = Ge('FileList'),
  Cv = e => eo(e) && Oe(e.pipe),
  Rv = e => {
    let t;
    return (
      e &&
      ((typeof FormData == 'function' && e instanceof FormData) ||
        (Oe(e.append) &&
          ((t = Hi(e)) === 'formdata' ||
            (t === 'object' &&
              Oe(e.toString) &&
              e.toString() === '[object FormData]'))))
    );
  },
  Ov = Ge('URLSearchParams'),
  [Pv, Nv, Tv, Lv] = ['ReadableStream', 'Request', 'Response', 'Headers'].map(
    Ge
  ),
  $v = e =>
    e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
function to(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > 'u') return;
  let r, o;
  if ((typeof e != 'object' && (e = [e]), qn(e)))
    for (r = 0, o = e.length; r < o; r++) t.call(null, e[r], r, e);
  else {
    if (Zr(e)) return;
    const i = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
      s = i.length;
    let l;
    for (r = 0; r < s; r++) (l = i[r]), t.call(null, e[l], l, e);
  }
}
function Bp(e, t) {
  if (Zr(e)) return null;
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length,
    o;
  for (; r-- > 0; ) if (((o = n[r]), t === o.toLowerCase())) return o;
  return null;
}
const Jt =
    typeof globalThis < 'u'
      ? globalThis
      : typeof self < 'u'
        ? self
        : typeof window < 'u'
          ? window
          : global,
  Vp = e => !Br(e) && e !== Jt;
function Al() {
  const { caseless: e } = (Vp(this) && this) || {},
    t = {},
    n = (r, o) => {
      const i = (e && Bp(t, o)) || o;
      jo(t[i]) && jo(r)
        ? (t[i] = Al(t[i], r))
        : jo(r)
          ? (t[i] = Al({}, r))
          : qn(r)
            ? (t[i] = r.slice())
            : (t[i] = r);
    };
  for (let r = 0, o = arguments.length; r < o; r++)
    arguments[r] && to(arguments[r], n);
  return t;
}
const Fv = (e, t, n, { allOwnKeys: r } = {}) => (
    to(
      t,
      (o, i) => {
        n && Oe(o) ? (e[i] = jp(o, n)) : (e[i] = o);
      },
      { allOwnKeys: r }
    ),
    e
  ),
  bv = e => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
  Dv = (e, t, n, r) => {
    (e.prototype = Object.create(t.prototype, r)),
      (e.prototype.constructor = e),
      Object.defineProperty(e, 'super', { value: t.prototype }),
      n && Object.assign(e.prototype, n);
  },
  Av = (e, t, n, r) => {
    let o, i, s;
    const l = {};
    if (((t = t || {}), e == null)) return t;
    do {
      for (o = Object.getOwnPropertyNames(e), i = o.length; i-- > 0; )
        (s = o[i]), (!r || r(s, e, t)) && !l[s] && ((t[s] = e[s]), (l[s] = !0));
      e = n !== !1 && Qa(e);
    } while (e && (!n || n(e, t)) && e !== Object.prototype);
    return t;
  },
  Uv = (e, t, n) => {
    (e = String(e)),
      (n === void 0 || n > e.length) && (n = e.length),
      (n -= t.length);
    const r = e.indexOf(t, n);
    return r !== -1 && r === n;
  },
  jv = e => {
    if (!e) return null;
    if (qn(e)) return e;
    let t = e.length;
    if (!Mp(t)) return null;
    const n = new Array(t);
    for (; t-- > 0; ) n[t] = e[t];
    return n;
  },
  Iv = (
    e => t =>
      e && t instanceof e
  )(typeof Uint8Array < 'u' && Qa(Uint8Array)),
  zv = (e, t) => {
    const r = (e && e[Ki]).call(e);
    let o;
    for (; (o = r.next()) && !o.done; ) {
      const i = o.value;
      t.call(e, i[0], i[1]);
    }
  },
  Mv = (e, t) => {
    let n;
    const r = [];
    for (; (n = e.exec(t)) !== null; ) r.push(n);
    return r;
  },
  Bv = Ge('HTMLFormElement'),
  Vv = e =>
    e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (n, r, o) {
      return r.toUpperCase() + o;
    }),
  Sc = (
    ({ hasOwnProperty: e }) =>
    (t, n) =>
      e.call(t, n)
  )(Object.prototype),
  Kv = Ge('RegExp'),
  Kp = (e, t) => {
    const n = Object.getOwnPropertyDescriptors(e),
      r = {};
    to(n, (o, i) => {
      let s;
      (s = t(o, i, e)) !== !1 && (r[i] = s || o);
    }),
      Object.defineProperties(e, r);
  },
  Hv = e => {
    Kp(e, (t, n) => {
      if (Oe(e) && ['arguments', 'caller', 'callee'].indexOf(n) !== -1)
        return !1;
      const r = e[n];
      if (Oe(r)) {
        if (((t.enumerable = !1), 'writable' in t)) {
          t.writable = !1;
          return;
        }
        t.set ||
          (t.set = () => {
            throw Error("Can not rewrite read-only method '" + n + "'");
          });
      }
    });
  },
  Wv = (e, t) => {
    const n = {},
      r = o => {
        o.forEach(i => {
          n[i] = !0;
        });
      };
    return qn(e) ? r(e) : r(String(e).split(t)), n;
  },
  Qv = () => {},
  qv = (e, t) => (e != null && Number.isFinite((e = +e)) ? e : t);
function Xv(e) {
  return !!(e && Oe(e.append) && e[Ip] === 'FormData' && e[Ki]);
}
const Yv = e => {
    const t = new Array(10),
      n = (r, o) => {
        if (eo(r)) {
          if (t.indexOf(r) >= 0) return;
          if (Zr(r)) return r;
          if (!('toJSON' in r)) {
            t[o] = r;
            const i = qn(r) ? [] : {};
            return (
              to(r, (s, l) => {
                const a = n(s, o + 1);
                !Br(a) && (i[l] = a);
              }),
              (t[o] = void 0),
              i
            );
          }
        }
        return r;
      };
    return n(e, 0);
  },
  Jv = Ge('AsyncFunction'),
  Gv = e => e && (eo(e) || Oe(e)) && Oe(e.then) && Oe(e.catch),
  Hp = ((e, t) =>
    e
      ? setImmediate
      : t
        ? ((n, r) => (
            Jt.addEventListener(
              'message',
              ({ source: o, data: i }) => {
                o === Jt && i === n && r.length && r.shift()();
              },
              !1
            ),
            o => {
              r.push(o), Jt.postMessage(n, '*');
            }
          ))(`axios@${Math.random()}`, [])
        : n => setTimeout(n))(
    typeof setImmediate == 'function',
    Oe(Jt.postMessage)
  ),
  Zv =
    typeof queueMicrotask < 'u'
      ? queueMicrotask.bind(Jt)
      : (typeof process < 'u' && process.nextTick) || Hp,
  e0 = e => e != null && Oe(e[Ki]),
  S = {
    isArray: qn,
    isArrayBuffer: zp,
    isBuffer: Zr,
    isFormData: Rv,
    isArrayBufferView: yv,
    isString: vv,
    isNumber: Mp,
    isBoolean: wv,
    isObject: eo,
    isPlainObject: jo,
    isEmptyObject: _v,
    isReadableStream: Pv,
    isRequest: Nv,
    isResponse: Tv,
    isHeaders: Lv,
    isUndefined: Br,
    isDate: Sv,
    isFile: kv,
    isBlob: Ev,
    isRegExp: Kv,
    isFunction: Oe,
    isStream: Cv,
    isURLSearchParams: Ov,
    isTypedArray: Iv,
    isFileList: xv,
    forEach: to,
    merge: Al,
    extend: Fv,
    trim: $v,
    stripBOM: bv,
    inherits: Dv,
    toFlatObject: Av,
    kindOf: Hi,
    kindOfTest: Ge,
    endsWith: Uv,
    toArray: jv,
    forEachEntry: zv,
    matchAll: Mv,
    isHTMLForm: Bv,
    hasOwnProperty: Sc,
    hasOwnProp: Sc,
    reduceDescriptors: Kp,
    freezeMethods: Hv,
    toObjectSet: Wv,
    toCamelCase: Vv,
    noop: Qv,
    toFiniteNumber: qv,
    findKey: Bp,
    global: Jt,
    isContextDefined: Vp,
    isSpecCompliantForm: Xv,
    toJSONObject: Yv,
    isAsyncFn: Jv,
    isThenable: Gv,
    setImmediate: Hp,
    asap: Zv,
    isIterable: e0,
  };
function b(e, t, n, r, o) {
  Error.call(this),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack),
    (this.message = e),
    (this.name = 'AxiosError'),
    t && (this.code = t),
    n && (this.config = n),
    r && (this.request = r),
    o && ((this.response = o), (this.status = o.status ? o.status : null));
}
S.inherits(b, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: S.toJSONObject(this.config),
      code: this.code,
      status: this.status,
    };
  },
});
const Wp = b.prototype,
  Qp = {};
[
  'ERR_BAD_OPTION_VALUE',
  'ERR_BAD_OPTION',
  'ECONNABORTED',
  'ETIMEDOUT',
  'ERR_NETWORK',
  'ERR_FR_TOO_MANY_REDIRECTS',
  'ERR_DEPRECATED',
  'ERR_BAD_RESPONSE',
  'ERR_BAD_REQUEST',
  'ERR_CANCELED',
  'ERR_NOT_SUPPORT',
  'ERR_INVALID_URL',
].forEach(e => {
  Qp[e] = { value: e };
});
Object.defineProperties(b, Qp);
Object.defineProperty(Wp, 'isAxiosError', { value: !0 });
b.from = (e, t, n, r, o, i) => {
  const s = Object.create(Wp);
  return (
    S.toFlatObject(
      e,
      s,
      function (a) {
        return a !== Error.prototype;
      },
      l => l !== 'isAxiosError'
    ),
    b.call(s, e.message, t, n, r, o),
    (s.cause = e),
    (s.name = e.name),
    i && Object.assign(s, i),
    s
  );
};
const t0 = null;
function Ul(e) {
  return S.isPlainObject(e) || S.isArray(e);
}
function qp(e) {
  return S.endsWith(e, '[]') ? e.slice(0, -2) : e;
}
function kc(e, t, n) {
  return e
    ? e
        .concat(t)
        .map(function (o, i) {
          return (o = qp(o)), !n && i ? '[' + o + ']' : o;
        })
        .join(n ? '.' : '')
    : t;
}
function n0(e) {
  return S.isArray(e) && !e.some(Ul);
}
const r0 = S.toFlatObject(S, {}, null, function (t) {
  return /^is[A-Z]/.test(t);
});
function Qi(e, t, n) {
  if (!S.isObject(e)) throw new TypeError('target must be an object');
  (t = t || new FormData()),
    (n = S.toFlatObject(
      n,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (v, w) {
        return !S.isUndefined(w[v]);
      }
    ));
  const r = n.metaTokens,
    o = n.visitor || c,
    i = n.dots,
    s = n.indexes,
    a = (n.Blob || (typeof Blob < 'u' && Blob)) && S.isSpecCompliantForm(t);
  if (!S.isFunction(o)) throw new TypeError('visitor must be a function');
  function u(h) {
    if (h === null) return '';
    if (S.isDate(h)) return h.toISOString();
    if (S.isBoolean(h)) return h.toString();
    if (!a && S.isBlob(h))
      throw new b('Blob is not supported. Use a Buffer instead.');
    return S.isArrayBuffer(h) || S.isTypedArray(h)
      ? a && typeof Blob == 'function'
        ? new Blob([h])
        : Buffer.from(h)
      : h;
  }
  function c(h, v, w) {
    let m = h;
    if (h && !w && typeof h == 'object') {
      if (S.endsWith(v, '{}'))
        (v = r ? v : v.slice(0, -2)), (h = JSON.stringify(h));
      else if (
        (S.isArray(h) && n0(h)) ||
        ((S.isFileList(h) || S.endsWith(v, '[]')) && (m = S.toArray(h)))
      )
        return (
          (v = qp(v)),
          m.forEach(function (g, _) {
            !(S.isUndefined(g) || g === null) &&
              t.append(
                s === !0 ? kc([v], _, i) : s === null ? v : v + '[]',
                u(g)
              );
          }),
          !1
        );
    }
    return Ul(h) ? !0 : (t.append(kc(w, v, i), u(h)), !1);
  }
  const f = [],
    p = Object.assign(r0, {
      defaultVisitor: c,
      convertValue: u,
      isVisitable: Ul,
    });
  function y(h, v) {
    if (!S.isUndefined(h)) {
      if (f.indexOf(h) !== -1)
        throw Error('Circular reference detected in ' + v.join('.'));
      f.push(h),
        S.forEach(h, function (m, d) {
          (!(S.isUndefined(m) || m === null) &&
            o.call(t, m, S.isString(d) ? d.trim() : d, v, p)) === !0 &&
            y(m, v ? v.concat(d) : [d]);
        }),
        f.pop();
    }
  }
  if (!S.isObject(e)) throw new TypeError('data must be an object');
  return y(e), t;
}
function Ec(e) {
  const t = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+',
    '%00': '\0',
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (r) {
    return t[r];
  });
}
function qa(e, t) {
  (this._pairs = []), e && Qi(e, this, t);
}
const Xp = qa.prototype;
Xp.append = function (t, n) {
  this._pairs.push([t, n]);
};
Xp.toString = function (t) {
  const n = t
    ? function (r) {
        return t.call(this, r, Ec);
      }
    : Ec;
  return this._pairs
    .map(function (o) {
      return n(o[0]) + '=' + n(o[1]);
    }, '')
    .join('&');
};
function o0(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']');
}
function Yp(e, t, n) {
  if (!t) return e;
  const r = (n && n.encode) || o0;
  S.isFunction(n) && (n = { serialize: n });
  const o = n && n.serialize;
  let i;
  if (
    (o
      ? (i = o(t, n))
      : (i = S.isURLSearchParams(t) ? t.toString() : new qa(t, n).toString(r)),
    i)
  ) {
    const s = e.indexOf('#');
    s !== -1 && (e = e.slice(0, s)),
      (e += (e.indexOf('?') === -1 ? '?' : '&') + i);
  }
  return e;
}
class xc {
  constructor() {
    this.handlers = [];
  }
  use(t, n, r) {
    return (
      this.handlers.push({
        fulfilled: t,
        rejected: n,
        synchronous: r ? r.synchronous : !1,
        runWhen: r ? r.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(t) {
    S.forEach(this.handlers, function (r) {
      r !== null && t(r);
    });
  }
}
const Jp = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  i0 = typeof URLSearchParams < 'u' ? URLSearchParams : qa,
  s0 = typeof FormData < 'u' ? FormData : null,
  l0 = typeof Blob < 'u' ? Blob : null,
  a0 = {
    isBrowser: !0,
    classes: { URLSearchParams: i0, FormData: s0, Blob: l0 },
    protocols: ['http', 'https', 'file', 'blob', 'url', 'data'],
  },
  Xa = typeof window < 'u' && typeof document < 'u',
  jl = (typeof navigator == 'object' && navigator) || void 0,
  u0 =
    Xa &&
    (!jl || ['ReactNative', 'NativeScript', 'NS'].indexOf(jl.product) < 0),
  c0 =
    typeof WorkerGlobalScope < 'u' &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == 'function',
  f0 = (Xa && window.location.href) || 'http://localhost',
  d0 = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        hasBrowserEnv: Xa,
        hasStandardBrowserEnv: u0,
        hasStandardBrowserWebWorkerEnv: c0,
        navigator: jl,
        origin: f0,
      },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  de = { ...d0, ...a0 };
function p0(e, t) {
  return Qi(e, new de.classes.URLSearchParams(), {
    visitor: function (n, r, o, i) {
      return de.isNode && S.isBuffer(n)
        ? (this.append(r, n.toString('base64')), !1)
        : i.defaultVisitor.apply(this, arguments);
    },
    ...t,
  });
}
function h0(e) {
  return S.matchAll(/\w+|\[(\w*)]/g, e).map(t =>
    t[0] === '[]' ? '' : t[1] || t[0]
  );
}
function m0(e) {
  const t = {},
    n = Object.keys(e);
  let r;
  const o = n.length;
  let i;
  for (r = 0; r < o; r++) (i = n[r]), (t[i] = e[i]);
  return t;
}
function Gp(e) {
  function t(n, r, o, i) {
    let s = n[i++];
    if (s === '__proto__') return !0;
    const l = Number.isFinite(+s),
      a = i >= n.length;
    return (
      (s = !s && S.isArray(o) ? o.length : s),
      a
        ? (S.hasOwnProp(o, s) ? (o[s] = [o[s], r]) : (o[s] = r), !l)
        : ((!o[s] || !S.isObject(o[s])) && (o[s] = []),
          t(n, r, o[s], i) && S.isArray(o[s]) && (o[s] = m0(o[s])),
          !l)
    );
  }
  if (S.isFormData(e) && S.isFunction(e.entries)) {
    const n = {};
    return (
      S.forEachEntry(e, (r, o) => {
        t(h0(r), o, n, 0);
      }),
      n
    );
  }
  return null;
}
function g0(e, t, n) {
  if (S.isString(e))
    try {
      return (t || JSON.parse)(e), S.trim(e);
    } catch (r) {
      if (r.name !== 'SyntaxError') throw r;
    }
  return (0, JSON.stringify)(e);
}
const no = {
  transitional: Jp,
  adapter: ['xhr', 'http', 'fetch'],
  transformRequest: [
    function (t, n) {
      const r = n.getContentType() || '',
        o = r.indexOf('application/json') > -1,
        i = S.isObject(t);
      if ((i && S.isHTMLForm(t) && (t = new FormData(t)), S.isFormData(t)))
        return o ? JSON.stringify(Gp(t)) : t;
      if (
        S.isArrayBuffer(t) ||
        S.isBuffer(t) ||
        S.isStream(t) ||
        S.isFile(t) ||
        S.isBlob(t) ||
        S.isReadableStream(t)
      )
        return t;
      if (S.isArrayBufferView(t)) return t.buffer;
      if (S.isURLSearchParams(t))
        return (
          n.setContentType(
            'application/x-www-form-urlencoded;charset=utf-8',
            !1
          ),
          t.toString()
        );
      let l;
      if (i) {
        if (r.indexOf('application/x-www-form-urlencoded') > -1)
          return p0(t, this.formSerializer).toString();
        if ((l = S.isFileList(t)) || r.indexOf('multipart/form-data') > -1) {
          const a = this.env && this.env.FormData;
          return Qi(
            l ? { 'files[]': t } : t,
            a && new a(),
            this.formSerializer
          );
        }
      }
      return i || o ? (n.setContentType('application/json', !1), g0(t)) : t;
    },
  ],
  transformResponse: [
    function (t) {
      const n = this.transitional || no.transitional,
        r = n && n.forcedJSONParsing,
        o = this.responseType === 'json';
      if (S.isResponse(t) || S.isReadableStream(t)) return t;
      if (t && S.isString(t) && ((r && !this.responseType) || o)) {
        const s = !(n && n.silentJSONParsing) && o;
        try {
          return JSON.parse(t);
        } catch (l) {
          if (s)
            throw l.name === 'SyntaxError'
              ? b.from(l, b.ERR_BAD_RESPONSE, this, null, this.response)
              : l;
        }
      }
      return t;
    },
  ],
  timeout: 0,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: de.classes.FormData, Blob: de.classes.Blob },
  validateStatus: function (t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': void 0,
    },
  },
};
S.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], e => {
  no.headers[e] = {};
});
const y0 = S.toObjectSet([
    'age',
    'authorization',
    'content-length',
    'content-type',
    'etag',
    'expires',
    'from',
    'host',
    'if-modified-since',
    'if-unmodified-since',
    'last-modified',
    'location',
    'max-forwards',
    'proxy-authorization',
    'referer',
    'retry-after',
    'user-agent',
  ]),
  v0 = e => {
    const t = {};
    let n, r, o;
    return (
      e &&
        e
          .split(
            `
`
          )
          .forEach(function (s) {
            (o = s.indexOf(':')),
              (n = s.substring(0, o).trim().toLowerCase()),
              (r = s.substring(o + 1).trim()),
              !(!n || (t[n] && y0[n])) &&
                (n === 'set-cookie'
                  ? t[n]
                    ? t[n].push(r)
                    : (t[n] = [r])
                  : (t[n] = t[n] ? t[n] + ', ' + r : r));
          }),
      t
    );
  },
  Cc = Symbol('internals');
function ir(e) {
  return e && String(e).trim().toLowerCase();
}
function Io(e) {
  return e === !1 || e == null ? e : S.isArray(e) ? e.map(Io) : String(e);
}
function w0(e) {
  const t = Object.create(null),
    n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; (r = n.exec(e)); ) t[r[1]] = r[2];
  return t;
}
const _0 = e => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Ts(e, t, n, r, o) {
  if (S.isFunction(r)) return r.call(this, t, n);
  if ((o && (t = n), !!S.isString(t))) {
    if (S.isString(r)) return t.indexOf(r) !== -1;
    if (S.isRegExp(r)) return r.test(t);
  }
}
function S0(e) {
  return e
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function k0(e, t) {
  const n = S.toCamelCase(' ' + t);
  ['get', 'set', 'has'].forEach(r => {
    Object.defineProperty(e, r + n, {
      value: function (o, i, s) {
        return this[r].call(this, t, o, i, s);
      },
      configurable: !0,
    });
  });
}
class Pe {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const o = this;
    function i(l, a, u) {
      const c = ir(a);
      if (!c) throw new Error('header name must be a non-empty string');
      const f = S.findKey(o, c);
      (!f || o[f] === void 0 || u === !0 || (u === void 0 && o[f] !== !1)) &&
        (o[f || a] = Io(l));
    }
    const s = (l, a) => S.forEach(l, (u, c) => i(u, c, a));
    if (S.isPlainObject(t) || t instanceof this.constructor) s(t, n);
    else if (S.isString(t) && (t = t.trim()) && !_0(t)) s(v0(t), n);
    else if (S.isObject(t) && S.isIterable(t)) {
      let l = {},
        a,
        u;
      for (const c of t) {
        if (!S.isArray(c))
          throw TypeError('Object iterator must return a key-value pair');
        l[(u = c[0])] = (a = l[u])
          ? S.isArray(a)
            ? [...a, c[1]]
            : [a, c[1]]
          : c[1];
      }
      s(l, n);
    } else t != null && i(n, t, r);
    return this;
  }
  get(t, n) {
    if (((t = ir(t)), t)) {
      const r = S.findKey(this, t);
      if (r) {
        const o = this[r];
        if (!n) return o;
        if (n === !0) return w0(o);
        if (S.isFunction(n)) return n.call(this, o, r);
        if (S.isRegExp(n)) return n.exec(o);
        throw new TypeError('parser must be boolean|regexp|function');
      }
    }
  }
  has(t, n) {
    if (((t = ir(t)), t)) {
      const r = S.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || Ts(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let o = !1;
    function i(s) {
      if (((s = ir(s)), s)) {
        const l = S.findKey(r, s);
        l && (!n || Ts(r, r[l], l, n)) && (delete r[l], (o = !0));
      }
    }
    return S.isArray(t) ? t.forEach(i) : i(t), o;
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length,
      o = !1;
    for (; r--; ) {
      const i = n[r];
      (!t || Ts(this, this[i], i, t, !0)) && (delete this[i], (o = !0));
    }
    return o;
  }
  normalize(t) {
    const n = this,
      r = {};
    return (
      S.forEach(this, (o, i) => {
        const s = S.findKey(r, i);
        if (s) {
          (n[s] = Io(o)), delete n[i];
          return;
        }
        const l = t ? S0(i) : String(i).trim();
        l !== i && delete n[i], (n[l] = Io(o)), (r[l] = !0);
      }),
      this
    );
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = Object.create(null);
    return (
      S.forEach(this, (r, o) => {
        r != null && r !== !1 && (n[o] = t && S.isArray(r) ? r.join(', ') : r);
      }),
      n
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ': ' + n).join(`
`);
  }
  getSetCookie() {
    return this.get('set-cookie') || [];
  }
  get [Symbol.toStringTag]() {
    return 'AxiosHeaders';
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const r = new this(t);
    return n.forEach(o => r.set(o)), r;
  }
  static accessor(t) {
    const r = (this[Cc] = this[Cc] = { accessors: {} }).accessors,
      o = this.prototype;
    function i(s) {
      const l = ir(s);
      r[l] || (k0(o, s), (r[l] = !0));
    }
    return S.isArray(t) ? t.forEach(i) : i(t), this;
  }
}
Pe.accessor([
  'Content-Type',
  'Content-Length',
  'Accept',
  'Accept-Encoding',
  'User-Agent',
  'Authorization',
]);
S.reduceDescriptors(Pe.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(r) {
      this[n] = r;
    },
  };
});
S.freezeMethods(Pe);
function Ls(e, t) {
  const n = this || no,
    r = t || n,
    o = Pe.from(r.headers);
  let i = r.data;
  return (
    S.forEach(e, function (l) {
      i = l.call(n, i, o.normalize(), t ? t.status : void 0);
    }),
    o.normalize(),
    i
  );
}
function Zp(e) {
  return !!(e && e.__CANCEL__);
}
function Xn(e, t, n) {
  b.call(this, e ?? 'canceled', b.ERR_CANCELED, t, n),
    (this.name = 'CanceledError');
}
S.inherits(Xn, b, { __CANCEL__: !0 });
function eh(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status)
    ? e(n)
    : t(
        new b(
          'Request failed with status code ' + n.status,
          [b.ERR_BAD_REQUEST, b.ERR_BAD_RESPONSE][
            Math.floor(n.status / 100) - 4
          ],
          n.config,
          n.request,
          n
        )
      );
}
function E0(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return (t && t[1]) || '';
}
function x0(e, t) {
  e = e || 10;
  const n = new Array(e),
    r = new Array(e);
  let o = 0,
    i = 0,
    s;
  return (
    (t = t !== void 0 ? t : 1e3),
    function (a) {
      const u = Date.now(),
        c = r[i];
      s || (s = u), (n[o] = a), (r[o] = u);
      let f = i,
        p = 0;
      for (; f !== o; ) (p += n[f++]), (f = f % e);
      if (((o = (o + 1) % e), o === i && (i = (i + 1) % e), u - s < t)) return;
      const y = c && u - c;
      return y ? Math.round((p * 1e3) / y) : void 0;
    }
  );
}
function C0(e, t) {
  let n = 0,
    r = 1e3 / t,
    o,
    i;
  const s = (u, c = Date.now()) => {
    (n = c), (o = null), i && (clearTimeout(i), (i = null)), e(...u);
  };
  return [
    (...u) => {
      const c = Date.now(),
        f = c - n;
      f >= r
        ? s(u, c)
        : ((o = u),
          i ||
            (i = setTimeout(() => {
              (i = null), s(o);
            }, r - f)));
    },
    () => o && s(o),
  ];
}
const gi = (e, t, n = 3) => {
    let r = 0;
    const o = x0(50, 250);
    return C0(i => {
      const s = i.loaded,
        l = i.lengthComputable ? i.total : void 0,
        a = s - r,
        u = o(a),
        c = s <= l;
      r = s;
      const f = {
        loaded: s,
        total: l,
        progress: l ? s / l : void 0,
        bytes: a,
        rate: u || void 0,
        estimated: u && l && c ? (l - s) / u : void 0,
        event: i,
        lengthComputable: l != null,
        [t ? 'download' : 'upload']: !0,
      };
      e(f);
    }, n);
  },
  Rc = (e, t) => {
    const n = e != null;
    return [r => t[0]({ lengthComputable: n, total: e, loaded: r }), t[1]];
  },
  Oc =
    e =>
    (...t) =>
      S.asap(() => e(...t)),
  R0 = de.hasStandardBrowserEnv
    ? ((e, t) => n => (
        (n = new URL(n, de.origin)),
        e.protocol === n.protocol &&
          e.host === n.host &&
          (t || e.port === n.port)
      ))(
        new URL(de.origin),
        de.navigator && /(msie|trident)/i.test(de.navigator.userAgent)
      )
    : () => !0,
  O0 = de.hasStandardBrowserEnv
    ? {
        write(e, t, n, r, o, i) {
          const s = [e + '=' + encodeURIComponent(t)];
          S.isNumber(n) && s.push('expires=' + new Date(n).toGMTString()),
            S.isString(r) && s.push('path=' + r),
            S.isString(o) && s.push('domain=' + o),
            i === !0 && s.push('secure'),
            (document.cookie = s.join('; '));
        },
        read(e) {
          const t = document.cookie.match(
            new RegExp('(^|;\\s*)(' + e + ')=([^;]*)')
          );
          return t ? decodeURIComponent(t[3]) : null;
        },
        remove(e) {
          this.write(e, '', Date.now() - 864e5);
        },
      }
    : {
        write() {},
        read() {
          return null;
        },
        remove() {},
      };
function P0(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function N0(e, t) {
  return t ? e.replace(/\/?\/$/, '') + '/' + t.replace(/^\/+/, '') : e;
}
function th(e, t, n) {
  let r = !P0(t);
  return e && (r || n == !1) ? N0(e, t) : t;
}
const Pc = e => (e instanceof Pe ? { ...e } : e);
function un(e, t) {
  t = t || {};
  const n = {};
  function r(u, c, f, p) {
    return S.isPlainObject(u) && S.isPlainObject(c)
      ? S.merge.call({ caseless: p }, u, c)
      : S.isPlainObject(c)
        ? S.merge({}, c)
        : S.isArray(c)
          ? c.slice()
          : c;
  }
  function o(u, c, f, p) {
    if (S.isUndefined(c)) {
      if (!S.isUndefined(u)) return r(void 0, u, f, p);
    } else return r(u, c, f, p);
  }
  function i(u, c) {
    if (!S.isUndefined(c)) return r(void 0, c);
  }
  function s(u, c) {
    if (S.isUndefined(c)) {
      if (!S.isUndefined(u)) return r(void 0, u);
    } else return r(void 0, c);
  }
  function l(u, c, f) {
    if (f in t) return r(u, c);
    if (f in e) return r(void 0, u);
  }
  const a = {
    url: i,
    method: i,
    data: i,
    baseURL: s,
    transformRequest: s,
    transformResponse: s,
    paramsSerializer: s,
    timeout: s,
    timeoutMessage: s,
    withCredentials: s,
    withXSRFToken: s,
    adapter: s,
    responseType: s,
    xsrfCookieName: s,
    xsrfHeaderName: s,
    onUploadProgress: s,
    onDownloadProgress: s,
    decompress: s,
    maxContentLength: s,
    maxBodyLength: s,
    beforeRedirect: s,
    transport: s,
    httpAgent: s,
    httpsAgent: s,
    cancelToken: s,
    socketPath: s,
    responseEncoding: s,
    validateStatus: l,
    headers: (u, c, f) => o(Pc(u), Pc(c), f, !0),
  };
  return (
    S.forEach(Object.keys({ ...e, ...t }), function (c) {
      const f = a[c] || o,
        p = f(e[c], t[c], c);
      (S.isUndefined(p) && f !== l) || (n[c] = p);
    }),
    n
  );
}
const nh = e => {
    const t = un({}, e);
    let {
      data: n,
      withXSRFToken: r,
      xsrfHeaderName: o,
      xsrfCookieName: i,
      headers: s,
      auth: l,
    } = t;
    (t.headers = s = Pe.from(s)),
      (t.url = Yp(
        th(t.baseURL, t.url, t.allowAbsoluteUrls),
        e.params,
        e.paramsSerializer
      )),
      l &&
        s.set(
          'Authorization',
          'Basic ' +
            btoa(
              (l.username || '') +
                ':' +
                (l.password ? unescape(encodeURIComponent(l.password)) : '')
            )
        );
    let a;
    if (S.isFormData(n)) {
      if (de.hasStandardBrowserEnv || de.hasStandardBrowserWebWorkerEnv)
        s.setContentType(void 0);
      else if ((a = s.getContentType()) !== !1) {
        const [u, ...c] = a
          ? a
              .split(';')
              .map(f => f.trim())
              .filter(Boolean)
          : [];
        s.setContentType([u || 'multipart/form-data', ...c].join('; '));
      }
    }
    if (
      de.hasStandardBrowserEnv &&
      (r && S.isFunction(r) && (r = r(t)), r || (r !== !1 && R0(t.url)))
    ) {
      const u = o && i && O0.read(i);
      u && s.set(o, u);
    }
    return t;
  },
  T0 = typeof XMLHttpRequest < 'u',
  L0 =
    T0 &&
    function (e) {
      return new Promise(function (n, r) {
        const o = nh(e);
        let i = o.data;
        const s = Pe.from(o.headers).normalize();
        let { responseType: l, onUploadProgress: a, onDownloadProgress: u } = o,
          c,
          f,
          p,
          y,
          h;
        function v() {
          y && y(),
            h && h(),
            o.cancelToken && o.cancelToken.unsubscribe(c),
            o.signal && o.signal.removeEventListener('abort', c);
        }
        let w = new XMLHttpRequest();
        w.open(o.method.toUpperCase(), o.url, !0), (w.timeout = o.timeout);
        function m() {
          if (!w) return;
          const g = Pe.from(
              'getAllResponseHeaders' in w && w.getAllResponseHeaders()
            ),
            k = {
              data:
                !l || l === 'text' || l === 'json'
                  ? w.responseText
                  : w.response,
              status: w.status,
              statusText: w.statusText,
              headers: g,
              config: e,
              request: w,
            };
          eh(
            function (R) {
              n(R), v();
            },
            function (R) {
              r(R), v();
            },
            k
          ),
            (w = null);
        }
        'onloadend' in w
          ? (w.onloadend = m)
          : (w.onreadystatechange = function () {
              !w ||
                w.readyState !== 4 ||
                (w.status === 0 &&
                  !(w.responseURL && w.responseURL.indexOf('file:') === 0)) ||
                setTimeout(m);
            }),
          (w.onabort = function () {
            w &&
              (r(new b('Request aborted', b.ECONNABORTED, e, w)), (w = null));
          }),
          (w.onerror = function () {
            r(new b('Network Error', b.ERR_NETWORK, e, w)), (w = null);
          }),
          (w.ontimeout = function () {
            let _ = o.timeout
              ? 'timeout of ' + o.timeout + 'ms exceeded'
              : 'timeout exceeded';
            const k = o.transitional || Jp;
            o.timeoutErrorMessage && (_ = o.timeoutErrorMessage),
              r(
                new b(
                  _,
                  k.clarifyTimeoutError ? b.ETIMEDOUT : b.ECONNABORTED,
                  e,
                  w
                )
              ),
              (w = null);
          }),
          i === void 0 && s.setContentType(null),
          'setRequestHeader' in w &&
            S.forEach(s.toJSON(), function (_, k) {
              w.setRequestHeader(k, _);
            }),
          S.isUndefined(o.withCredentials) ||
            (w.withCredentials = !!o.withCredentials),
          l && l !== 'json' && (w.responseType = o.responseType),
          u && (([p, h] = gi(u, !0)), w.addEventListener('progress', p)),
          a &&
            w.upload &&
            (([f, y] = gi(a)),
            w.upload.addEventListener('progress', f),
            w.upload.addEventListener('loadend', y)),
          (o.cancelToken || o.signal) &&
            ((c = g => {
              w &&
                (r(!g || g.type ? new Xn(null, e, w) : g),
                w.abort(),
                (w = null));
            }),
            o.cancelToken && o.cancelToken.subscribe(c),
            o.signal &&
              (o.signal.aborted ? c() : o.signal.addEventListener('abort', c)));
        const d = E0(o.url);
        if (d && de.protocols.indexOf(d) === -1) {
          r(new b('Unsupported protocol ' + d + ':', b.ERR_BAD_REQUEST, e));
          return;
        }
        w.send(i || null);
      });
    },
  $0 = (e, t) => {
    const { length: n } = (e = e ? e.filter(Boolean) : []);
    if (t || n) {
      let r = new AbortController(),
        o;
      const i = function (u) {
        if (!o) {
          (o = !0), l();
          const c = u instanceof Error ? u : this.reason;
          r.abort(
            c instanceof b ? c : new Xn(c instanceof Error ? c.message : c)
          );
        }
      };
      let s =
        t &&
        setTimeout(() => {
          (s = null), i(new b(`timeout ${t} of ms exceeded`, b.ETIMEDOUT));
        }, t);
      const l = () => {
        e &&
          (s && clearTimeout(s),
          (s = null),
          e.forEach(u => {
            u.unsubscribe
              ? u.unsubscribe(i)
              : u.removeEventListener('abort', i);
          }),
          (e = null));
      };
      e.forEach(u => u.addEventListener('abort', i));
      const { signal: a } = r;
      return (a.unsubscribe = () => S.asap(l)), a;
    }
  },
  F0 = function* (e, t) {
    let n = e.byteLength;
    if (n < t) {
      yield e;
      return;
    }
    let r = 0,
      o;
    for (; r < n; ) (o = r + t), yield e.slice(r, o), (r = o);
  },
  b0 = async function* (e, t) {
    for await (const n of D0(e)) yield* F0(n, t);
  },
  D0 = async function* (e) {
    if (e[Symbol.asyncIterator]) {
      yield* e;
      return;
    }
    const t = e.getReader();
    try {
      for (;;) {
        const { done: n, value: r } = await t.read();
        if (n) break;
        yield r;
      }
    } finally {
      await t.cancel();
    }
  },
  Nc = (e, t, n, r) => {
    const o = b0(e, t);
    let i = 0,
      s,
      l = a => {
        s || ((s = !0), r && r(a));
      };
    return new ReadableStream(
      {
        async pull(a) {
          try {
            const { done: u, value: c } = await o.next();
            if (u) {
              l(), a.close();
              return;
            }
            let f = c.byteLength;
            if (n) {
              let p = (i += f);
              n(p);
            }
            a.enqueue(new Uint8Array(c));
          } catch (u) {
            throw (l(u), u);
          }
        },
        cancel(a) {
          return l(a), o.return();
        },
      },
      { highWaterMark: 2 }
    );
  },
  qi =
    typeof fetch == 'function' &&
    typeof Request == 'function' &&
    typeof Response == 'function',
  rh = qi && typeof ReadableStream == 'function',
  A0 =
    qi &&
    (typeof TextEncoder == 'function'
      ? (
          e => t =>
            e.encode(t)
        )(new TextEncoder())
      : async e => new Uint8Array(await new Response(e).arrayBuffer())),
  oh = (e, ...t) => {
    try {
      return !!e(...t);
    } catch {
      return !1;
    }
  },
  U0 =
    rh &&
    oh(() => {
      let e = !1;
      const t = new Request(de.origin, {
        body: new ReadableStream(),
        method: 'POST',
        get duplex() {
          return (e = !0), 'half';
        },
      }).headers.has('Content-Type');
      return e && !t;
    }),
  Tc = 64 * 1024,
  Il = rh && oh(() => S.isReadableStream(new Response('').body)),
  yi = { stream: Il && (e => e.body) };
qi &&
  (e => {
    ['text', 'arrayBuffer', 'blob', 'formData', 'stream'].forEach(t => {
      !yi[t] &&
        (yi[t] = S.isFunction(e[t])
          ? n => n[t]()
          : (n, r) => {
              throw new b(
                `Response type '${t}' is not supported`,
                b.ERR_NOT_SUPPORT,
                r
              );
            });
    });
  })(new Response());
const j0 = async e => {
    if (e == null) return 0;
    if (S.isBlob(e)) return e.size;
    if (S.isSpecCompliantForm(e))
      return (
        await new Request(de.origin, { method: 'POST', body: e }).arrayBuffer()
      ).byteLength;
    if (S.isArrayBufferView(e) || S.isArrayBuffer(e)) return e.byteLength;
    if ((S.isURLSearchParams(e) && (e = e + ''), S.isString(e)))
      return (await A0(e)).byteLength;
  },
  I0 = async (e, t) => {
    const n = S.toFiniteNumber(e.getContentLength());
    return n ?? j0(t);
  },
  z0 =
    qi &&
    (async e => {
      let {
        url: t,
        method: n,
        data: r,
        signal: o,
        cancelToken: i,
        timeout: s,
        onDownloadProgress: l,
        onUploadProgress: a,
        responseType: u,
        headers: c,
        withCredentials: f = 'same-origin',
        fetchOptions: p,
      } = nh(e);
      u = u ? (u + '').toLowerCase() : 'text';
      let y = $0([o, i && i.toAbortSignal()], s),
        h;
      const v =
        y &&
        y.unsubscribe &&
        (() => {
          y.unsubscribe();
        });
      let w;
      try {
        if (
          a &&
          U0 &&
          n !== 'get' &&
          n !== 'head' &&
          (w = await I0(c, r)) !== 0
        ) {
          let k = new Request(t, { method: 'POST', body: r, duplex: 'half' }),
            C;
          if (
            (S.isFormData(r) &&
              (C = k.headers.get('content-type')) &&
              c.setContentType(C),
            k.body)
          ) {
            const [R, x] = Rc(w, gi(Oc(a)));
            r = Nc(k.body, Tc, R, x);
          }
        }
        S.isString(f) || (f = f ? 'include' : 'omit');
        const m = 'credentials' in Request.prototype;
        h = new Request(t, {
          ...p,
          signal: y,
          method: n.toUpperCase(),
          headers: c.normalize().toJSON(),
          body: r,
          duplex: 'half',
          credentials: m ? f : void 0,
        });
        let d = await fetch(h, p);
        const g = Il && (u === 'stream' || u === 'response');
        if (Il && (l || (g && v))) {
          const k = {};
          ['status', 'statusText', 'headers'].forEach(L => {
            k[L] = d[L];
          });
          const C = S.toFiniteNumber(d.headers.get('content-length')),
            [R, x] = (l && Rc(C, gi(Oc(l), !0))) || [];
          d = new Response(
            Nc(d.body, Tc, R, () => {
              x && x(), v && v();
            }),
            k
          );
        }
        u = u || 'text';
        let _ = await yi[S.findKey(yi, u) || 'text'](d, e);
        return (
          !g && v && v(),
          await new Promise((k, C) => {
            eh(k, C, {
              data: _,
              headers: Pe.from(d.headers),
              status: d.status,
              statusText: d.statusText,
              config: e,
              request: h,
            });
          })
        );
      } catch (m) {
        throw (
          (v && v(),
          m && m.name === 'TypeError' && /Load failed|fetch/i.test(m.message)
            ? Object.assign(new b('Network Error', b.ERR_NETWORK, e, h), {
                cause: m.cause || m,
              })
            : b.from(m, m && m.code, e, h))
        );
      }
    }),
  zl = { http: t0, xhr: L0, fetch: z0 };
S.forEach(zl, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, 'name', { value: t });
    } catch {}
    Object.defineProperty(e, 'adapterName', { value: t });
  }
});
const Lc = e => `- ${e}`,
  M0 = e => S.isFunction(e) || e === null || e === !1,
  ih = {
    getAdapter: e => {
      e = S.isArray(e) ? e : [e];
      const { length: t } = e;
      let n, r;
      const o = {};
      for (let i = 0; i < t; i++) {
        n = e[i];
        let s;
        if (
          ((r = n),
          !M0(n) && ((r = zl[(s = String(n)).toLowerCase()]), r === void 0))
        )
          throw new b(`Unknown adapter '${s}'`);
        if (r) break;
        o[s || '#' + i] = r;
      }
      if (!r) {
        const i = Object.entries(o).map(
          ([l, a]) =>
            `adapter ${l} ` +
            (a === !1
              ? 'is not supported by the environment'
              : 'is not available in the build')
        );
        let s = t
          ? i.length > 1
            ? `since :
` +
              i.map(Lc).join(`
`)
            : ' ' + Lc(i[0])
          : 'as no adapter specified';
        throw new b(
          'There is no suitable adapter to dispatch the request ' + s,
          'ERR_NOT_SUPPORT'
        );
      }
      return r;
    },
    adapters: zl,
  };
function $s(e) {
  if (
    (e.cancelToken && e.cancelToken.throwIfRequested(),
    e.signal && e.signal.aborted)
  )
    throw new Xn(null, e);
}
function $c(e) {
  return (
    $s(e),
    (e.headers = Pe.from(e.headers)),
    (e.data = Ls.call(e, e.transformRequest)),
    ['post', 'put', 'patch'].indexOf(e.method) !== -1 &&
      e.headers.setContentType('application/x-www-form-urlencoded', !1),
    ih
      .getAdapter(e.adapter || no.adapter)(e)
      .then(
        function (r) {
          return (
            $s(e),
            (r.data = Ls.call(e, e.transformResponse, r)),
            (r.headers = Pe.from(r.headers)),
            r
          );
        },
        function (r) {
          return (
            Zp(r) ||
              ($s(e),
              r &&
                r.response &&
                ((r.response.data = Ls.call(
                  e,
                  e.transformResponse,
                  r.response
                )),
                (r.response.headers = Pe.from(r.response.headers)))),
            Promise.reject(r)
          );
        }
      )
  );
}
const sh = '1.11.0',
  Xi = {};
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(
  (e, t) => {
    Xi[e] = function (r) {
      return typeof r === e || 'a' + (t < 1 ? 'n ' : ' ') + e;
    };
  }
);
const Fc = {};
Xi.transitional = function (t, n, r) {
  function o(i, s) {
    return (
      '[Axios v' +
      sh +
      "] Transitional option '" +
      i +
      "'" +
      s +
      (r ? '. ' + r : '')
    );
  }
  return (i, s, l) => {
    if (t === !1)
      throw new b(
        o(s, ' has been removed' + (n ? ' in ' + n : '')),
        b.ERR_DEPRECATED
      );
    return (
      n &&
        !Fc[s] &&
        ((Fc[s] = !0),
        console.warn(
          o(
            s,
            ' has been deprecated since v' +
              n +
              ' and will be removed in the near future'
          )
        )),
      t ? t(i, s, l) : !0
    );
  };
};
Xi.spelling = function (t) {
  return (n, r) => (console.warn(`${r} is likely a misspelling of ${t}`), !0);
};
function B0(e, t, n) {
  if (typeof e != 'object')
    throw new b('options must be an object', b.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let o = r.length;
  for (; o-- > 0; ) {
    const i = r[o],
      s = t[i];
    if (s) {
      const l = e[i],
        a = l === void 0 || s(l, i, e);
      if (a !== !0)
        throw new b('option ' + i + ' must be ' + a, b.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0) throw new b('Unknown option ' + i, b.ERR_BAD_OPTION);
  }
}
const zo = { assertOptions: B0, validators: Xi },
  nt = zo.validators;
class en {
  constructor(t) {
    (this.defaults = t || {}),
      (this.interceptors = { request: new xc(), response: new xc() });
  }
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (r) {
      if (r instanceof Error) {
        let o = {};
        Error.captureStackTrace
          ? Error.captureStackTrace(o)
          : (o = new Error());
        const i = o.stack ? o.stack.replace(/^.+\n/, '') : '';
        try {
          r.stack
            ? i &&
              !String(r.stack).endsWith(i.replace(/^.+\n.+\n/, '')) &&
              (r.stack +=
                `
` + i)
            : (r.stack = i);
        } catch {}
      }
      throw r;
    }
  }
  _request(t, n) {
    typeof t == 'string' ? ((n = n || {}), (n.url = t)) : (n = t || {}),
      (n = un(this.defaults, n));
    const { transitional: r, paramsSerializer: o, headers: i } = n;
    r !== void 0 &&
      zo.assertOptions(
        r,
        {
          silentJSONParsing: nt.transitional(nt.boolean),
          forcedJSONParsing: nt.transitional(nt.boolean),
          clarifyTimeoutError: nt.transitional(nt.boolean),
        },
        !1
      ),
      o != null &&
        (S.isFunction(o)
          ? (n.paramsSerializer = { serialize: o })
          : zo.assertOptions(
              o,
              { encode: nt.function, serialize: nt.function },
              !0
            )),
      n.allowAbsoluteUrls !== void 0 ||
        (this.defaults.allowAbsoluteUrls !== void 0
          ? (n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
          : (n.allowAbsoluteUrls = !0)),
      zo.assertOptions(
        n,
        {
          baseUrl: nt.spelling('baseURL'),
          withXsrfToken: nt.spelling('withXSRFToken'),
        },
        !0
      ),
      (n.method = (n.method || this.defaults.method || 'get').toLowerCase());
    let s = i && S.merge(i.common, i[n.method]);
    i &&
      S.forEach(
        ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
        h => {
          delete i[h];
        }
      ),
      (n.headers = Pe.concat(s, i));
    const l = [];
    let a = !0;
    this.interceptors.request.forEach(function (v) {
      (typeof v.runWhen == 'function' && v.runWhen(n) === !1) ||
        ((a = a && v.synchronous), l.unshift(v.fulfilled, v.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function (v) {
      u.push(v.fulfilled, v.rejected);
    });
    let c,
      f = 0,
      p;
    if (!a) {
      const h = [$c.bind(this), void 0];
      for (
        h.unshift(...l), h.push(...u), p = h.length, c = Promise.resolve(n);
        f < p;

      )
        c = c.then(h[f++], h[f++]);
      return c;
    }
    p = l.length;
    let y = n;
    for (f = 0; f < p; ) {
      const h = l[f++],
        v = l[f++];
      try {
        y = h(y);
      } catch (w) {
        v.call(this, w);
        break;
      }
    }
    try {
      c = $c.call(this, y);
    } catch (h) {
      return Promise.reject(h);
    }
    for (f = 0, p = u.length; f < p; ) c = c.then(u[f++], u[f++]);
    return c;
  }
  getUri(t) {
    t = un(this.defaults, t);
    const n = th(t.baseURL, t.url, t.allowAbsoluteUrls);
    return Yp(n, t.params, t.paramsSerializer);
  }
}
S.forEach(['delete', 'get', 'head', 'options'], function (t) {
  en.prototype[t] = function (n, r) {
    return this.request(
      un(r || {}, { method: t, url: n, data: (r || {}).data })
    );
  };
});
S.forEach(['post', 'put', 'patch'], function (t) {
  function n(r) {
    return function (i, s, l) {
      return this.request(
        un(l || {}, {
          method: t,
          headers: r ? { 'Content-Type': 'multipart/form-data' } : {},
          url: i,
          data: s,
        })
      );
    };
  }
  (en.prototype[t] = n()), (en.prototype[t + 'Form'] = n(!0));
});
class Ya {
  constructor(t) {
    if (typeof t != 'function')
      throw new TypeError('executor must be a function.');
    let n;
    this.promise = new Promise(function (i) {
      n = i;
    });
    const r = this;
    this.promise.then(o => {
      if (!r._listeners) return;
      let i = r._listeners.length;
      for (; i-- > 0; ) r._listeners[i](o);
      r._listeners = null;
    }),
      (this.promise.then = o => {
        let i;
        const s = new Promise(l => {
          r.subscribe(l), (i = l);
        }).then(o);
        return (
          (s.cancel = function () {
            r.unsubscribe(i);
          }),
          s
        );
      }),
      t(function (i, s, l) {
        r.reason || ((r.reason = new Xn(i, s, l)), n(r.reason));
      });
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : (this._listeners = [t]);
  }
  unsubscribe(t) {
    if (!this._listeners) return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  toAbortSignal() {
    const t = new AbortController(),
      n = r => {
        t.abort(r);
      };
    return (
      this.subscribe(n),
      (t.signal.unsubscribe = () => this.unsubscribe(n)),
      t.signal
    );
  }
  static source() {
    let t;
    return {
      token: new Ya(function (o) {
        t = o;
      }),
      cancel: t,
    };
  }
}
function V0(e) {
  return function (n) {
    return e.apply(null, n);
  };
}
function K0(e) {
  return S.isObject(e) && e.isAxiosError === !0;
}
const Ml = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};
Object.entries(Ml).forEach(([e, t]) => {
  Ml[t] = e;
});
function lh(e) {
  const t = new en(e),
    n = jp(en.prototype.request, t);
  return (
    S.extend(n, en.prototype, t, { allOwnKeys: !0 }),
    S.extend(n, t, null, { allOwnKeys: !0 }),
    (n.create = function (o) {
      return lh(un(e, o));
    }),
    n
  );
}
const G = lh(no);
G.Axios = en;
G.CanceledError = Xn;
G.CancelToken = Ya;
G.isCancel = Zp;
G.VERSION = sh;
G.toFormData = Qi;
G.AxiosError = b;
G.Cancel = G.CanceledError;
G.all = function (t) {
  return Promise.all(t);
};
G.spread = V0;
G.isAxiosError = K0;
G.mergeConfig = un;
G.AxiosHeaders = Pe;
G.formToJSON = e => Gp(S.isHTMLForm(e) ? new FormData(e) : e);
G.getAdapter = ih.getAdapter;
G.HttpStatusCode = Ml;
G.default = G;
const H0 = 'https://travel-trucks-pet01-1.onrender.com',
  Fs = rv('campers/getCampers', async (e = 'en', { rejectWithValue: t }) => {
    try {
      const n = `${H0}/campers?lang=${e}`,
        o = (await G.get(n)).data;
      return Array.isArray(o) ? o : t('Incorrect data format from API');
    } catch (n) {
      return t(n.message);
    }
  }),
  W0 = cv({
    name: 'campers',
    initialState: { items: [], loading: !1, error: null, currentCamper: null },
    reducers: {
      setCamper: (e, t) => {
        e.currentCamper = t.payload;
      },
    },
    extraReducers: e => {
      e.addCase(Fs.pending, t => {
        (t.loading = !0), (t.error = null);
      })
        .addCase(Fs.fulfilled, (t, n) => {
          (t.loading = !1), (t.items = n.payload);
        })
        .addCase(Fs.rejected, (t, n) => {
          (t.loading = !1), (t.error = n.payload);
        });
    },
  }),
  Q0 = W0.reducer,
  q0 = qy({ reducer: { campers: Q0 }, devTools: !1 }),
  X0 = 'modulepreload',
  Y0 = function (e) {
    return '/' + e;
  },
  bc = {},
  J0 = function (t, n, r) {
    let o = Promise.resolve();
    if (n && n.length > 0) {
      document.getElementsByTagName('link');
      const s = document.querySelector('meta[property=csp-nonce]'),
        l =
          (s == null ? void 0 : s.nonce) ||
          (s == null ? void 0 : s.getAttribute('nonce'));
      o = Promise.allSettled(
        n.map(a => {
          if (((a = Y0(a)), a in bc)) return;
          bc[a] = !0;
          const u = a.endsWith('.css'),
            c = u ? '[rel="stylesheet"]' : '';
          if (document.querySelector(`link[href="${a}"]${c}`)) return;
          const f = document.createElement('link');
          if (
            ((f.rel = u ? 'stylesheet' : X0),
            u || (f.as = 'script'),
            (f.crossOrigin = ''),
            (f.href = a),
            l && f.setAttribute('nonce', l),
            document.head.appendChild(f),
            u)
          )
            return new Promise((p, y) => {
              f.addEventListener('load', p),
                f.addEventListener('error', () =>
                  y(new Error(`Unable to preload CSS for ${a}`))
                );
            });
        })
      );
    }
    function i(s) {
      const l = new Event('vite:preloadError', { cancelable: !0 });
      if (((l.payload = s), window.dispatchEvent(l), !l.defaultPrevented))
        throw s;
    }
    return o.then(s => {
      for (const l of s || []) l.status === 'rejected' && i(l.reason);
      return t().catch(i);
    });
  };
/**
 * @remix-run/router v1.21.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Vr() {
  return (
    (Vr = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Vr.apply(this, arguments)
  );
}
var Pt;
(function (e) {
  (e.Pop = 'POP'), (e.Push = 'PUSH'), (e.Replace = 'REPLACE');
})(Pt || (Pt = {}));
const Dc = 'popstate';
function G0(e) {
  e === void 0 && (e = {});
  function t(r, o) {
    let { pathname: i, search: s, hash: l } = r.location;
    return Bl(
      '',
      { pathname: i, search: s, hash: l },
      (o.state && o.state.usr) || null,
      (o.state && o.state.key) || 'default'
    );
  }
  function n(r, o) {
    return typeof o == 'string' ? o : vi(o);
  }
  return e1(t, n, null, e);
}
function J(e, t) {
  if (e === !1 || e === null || typeof e > 'u') throw new Error(t);
}
function ah(e, t) {
  if (!e) {
    typeof console < 'u' && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function Z0() {
  return Math.random().toString(36).substr(2, 8);
}
function Ac(e, t) {
  return { usr: e.state, key: e.key, idx: t };
}
function Bl(e, t, n, r) {
  return (
    n === void 0 && (n = null),
    Vr(
      { pathname: typeof e == 'string' ? e : e.pathname, search: '', hash: '' },
      typeof t == 'string' ? Yn(t) : t,
      { state: n, key: (t && t.key) || r || Z0() }
    )
  );
}
function vi(e) {
  let { pathname: t = '/', search: n = '', hash: r = '' } = e;
  return (
    n && n !== '?' && (t += n.charAt(0) === '?' ? n : '?' + n),
    r && r !== '#' && (t += r.charAt(0) === '#' ? r : '#' + r),
    t
  );
}
function Yn(e) {
  let t = {};
  if (e) {
    let n = e.indexOf('#');
    n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
    let r = e.indexOf('?');
    r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))),
      e && (t.pathname = e);
  }
  return t;
}
function e1(e, t, n, r) {
  r === void 0 && (r = {});
  let { window: o = document.defaultView, v5Compat: i = !1 } = r,
    s = o.history,
    l = Pt.Pop,
    a = null,
    u = c();
  u == null && ((u = 0), s.replaceState(Vr({}, s.state, { idx: u }), ''));
  function c() {
    return (s.state || { idx: null }).idx;
  }
  function f() {
    l = Pt.Pop;
    let w = c(),
      m = w == null ? null : w - u;
    (u = w), a && a({ action: l, location: v.location, delta: m });
  }
  function p(w, m) {
    l = Pt.Push;
    let d = Bl(v.location, w, m);
    u = c() + 1;
    let g = Ac(d, u),
      _ = v.createHref(d);
    try {
      s.pushState(g, '', _);
    } catch (k) {
      if (k instanceof DOMException && k.name === 'DataCloneError') throw k;
      o.location.assign(_);
    }
    i && a && a({ action: l, location: v.location, delta: 1 });
  }
  function y(w, m) {
    l = Pt.Replace;
    let d = Bl(v.location, w, m);
    u = c();
    let g = Ac(d, u),
      _ = v.createHref(d);
    s.replaceState(g, '', _),
      i && a && a({ action: l, location: v.location, delta: 0 });
  }
  function h(w) {
    let m = o.location.origin !== 'null' ? o.location.origin : o.location.href,
      d = typeof w == 'string' ? w : vi(w);
    return (
      (d = d.replace(/ $/, '%20')),
      J(
        m,
        'No window.location.(origin|href) available to create URL for href: ' +
          d
      ),
      new URL(d, m)
    );
  }
  let v = {
    get action() {
      return l;
    },
    get location() {
      return e(o, s);
    },
    listen(w) {
      if (a) throw new Error('A history only accepts one active listener');
      return (
        o.addEventListener(Dc, f),
        (a = w),
        () => {
          o.removeEventListener(Dc, f), (a = null);
        }
      );
    },
    createHref(w) {
      return t(o, w);
    },
    createURL: h,
    encodeLocation(w) {
      let m = h(w);
      return { pathname: m.pathname, search: m.search, hash: m.hash };
    },
    push: p,
    replace: y,
    go(w) {
      return s.go(w);
    },
  };
  return v;
}
var Uc;
(function (e) {
  (e.data = 'data'),
    (e.deferred = 'deferred'),
    (e.redirect = 'redirect'),
    (e.error = 'error');
})(Uc || (Uc = {}));
function t1(e, t, n) {
  return n === void 0 && (n = '/'), n1(e, t, n, !1);
}
function n1(e, t, n, r) {
  let o = typeof t == 'string' ? Yn(t) : t,
    i = Ja(o.pathname || '/', n);
  if (i == null) return null;
  let s = uh(e);
  r1(s);
  let l = null;
  for (let a = 0; l == null && a < s.length; ++a) {
    let u = h1(i);
    l = d1(s[a], u, r);
  }
  return l;
}
function uh(e, t, n, r) {
  t === void 0 && (t = []), n === void 0 && (n = []), r === void 0 && (r = '');
  let o = (i, s, l) => {
    let a = {
      relativePath: l === void 0 ? i.path || '' : l,
      caseSensitive: i.caseSensitive === !0,
      childrenIndex: s,
      route: i,
    };
    a.relativePath.startsWith('/') &&
      (J(
        a.relativePath.startsWith(r),
        'Absolute route path "' +
          a.relativePath +
          '" nested under path ' +
          ('"' + r + '" is not valid. An absolute child route path ') +
          'must start with the combined path of all its parent routes.'
      ),
      (a.relativePath = a.relativePath.slice(r.length)));
    let u = Ut([r, a.relativePath]),
      c = n.concat(a);
    i.children &&
      i.children.length > 0 &&
      (J(
        i.index !== !0,
        'Index routes must not have child routes. Please remove ' +
          ('all child routes from route path "' + u + '".')
      ),
      uh(i.children, t, c, u)),
      !(i.path == null && !i.index) &&
        t.push({ path: u, score: c1(u, i.index), routesMeta: c });
  };
  return (
    e.forEach((i, s) => {
      var l;
      if (i.path === '' || !((l = i.path) != null && l.includes('?'))) o(i, s);
      else for (let a of ch(i.path)) o(i, s, a);
    }),
    t
  );
}
function ch(e) {
  let t = e.split('/');
  if (t.length === 0) return [];
  let [n, ...r] = t,
    o = n.endsWith('?'),
    i = n.replace(/\?$/, '');
  if (r.length === 0) return o ? [i, ''] : [i];
  let s = ch(r.join('/')),
    l = [];
  return (
    l.push(...s.map(a => (a === '' ? i : [i, a].join('/')))),
    o && l.push(...s),
    l.map(a => (e.startsWith('/') && a === '' ? '/' : a))
  );
}
function r1(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : f1(
          t.routesMeta.map(r => r.childrenIndex),
          n.routesMeta.map(r => r.childrenIndex)
        )
  );
}
const o1 = /^:[\w-]+$/,
  i1 = 3,
  s1 = 2,
  l1 = 1,
  a1 = 10,
  u1 = -2,
  jc = e => e === '*';
function c1(e, t) {
  let n = e.split('/'),
    r = n.length;
  return (
    n.some(jc) && (r += u1),
    t && (r += s1),
    n
      .filter(o => !jc(o))
      .reduce((o, i) => o + (o1.test(i) ? i1 : i === '' ? l1 : a1), r)
  );
}
function f1(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, o) => r === t[o])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function d1(e, t, n) {
  let { routesMeta: r } = e,
    o = {},
    i = '/',
    s = [];
  for (let l = 0; l < r.length; ++l) {
    let a = r[l],
      u = l === r.length - 1,
      c = i === '/' ? t : t.slice(i.length) || '/',
      f = Ic(
        { path: a.relativePath, caseSensitive: a.caseSensitive, end: u },
        c
      ),
      p = a.route;
    if (
      (!f &&
        u &&
        n &&
        !r[r.length - 1].route.index &&
        (f = Ic(
          { path: a.relativePath, caseSensitive: a.caseSensitive, end: !1 },
          c
        )),
      !f)
    )
      return null;
    Object.assign(o, f.params),
      s.push({
        params: o,
        pathname: Ut([i, f.pathname]),
        pathnameBase: v1(Ut([i, f.pathnameBase])),
        route: p,
      }),
      f.pathnameBase !== '/' && (i = Ut([i, f.pathnameBase]));
  }
  return s;
}
function Ic(e, t) {
  typeof e == 'string' && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, r] = p1(e.path, e.caseSensitive, e.end),
    o = t.match(n);
  if (!o) return null;
  let i = o[0],
    s = i.replace(/(.)\/+$/, '$1'),
    l = o.slice(1);
  return {
    params: r.reduce((u, c, f) => {
      let { paramName: p, isOptional: y } = c;
      if (p === '*') {
        let v = l[f] || '';
        s = i.slice(0, i.length - v.length).replace(/(.)\/+$/, '$1');
      }
      const h = l[f];
      return (
        y && !h ? (u[p] = void 0) : (u[p] = (h || '').replace(/%2F/g, '/')), u
      );
    }, {}),
    pathname: i,
    pathnameBase: s,
    pattern: e,
  };
}
function p1(e, t, n) {
  t === void 0 && (t = !1),
    n === void 0 && (n = !0),
    ah(
      e === '*' || !e.endsWith('*') || e.endsWith('/*'),
      'Route path "' +
        e +
        '" will be treated as if it were ' +
        ('"' + e.replace(/\*$/, '/*') + '" because the `*` character must ') +
        'always follow a `/` in the pattern. To get rid of this warning, ' +
        ('please change the route path to "' + e.replace(/\*$/, '/*') + '".')
    );
  let r = [],
    o =
      '^' +
      e
        .replace(/\/*\*?$/, '')
        .replace(/^\/*/, '/')
        .replace(/[\\.*+^${}|()[\]]/g, '\\$&')
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (s, l, a) => (
            r.push({ paramName: l, isOptional: a != null }),
            a ? '/?([^\\/]+)?' : '/([^\\/]+)'
          )
        );
  return (
    e.endsWith('*')
      ? (r.push({ paramName: '*' }),
        (o += e === '*' || e === '/*' ? '(.*)$' : '(?:\\/(.+)|\\/*)$'))
      : n
        ? (o += '\\/*$')
        : e !== '' && e !== '/' && (o += '(?:(?=\\/|$))'),
    [new RegExp(o, t ? void 0 : 'i'), r]
  );
}
function h1(e) {
  try {
    return e
      .split('/')
      .map(t => decodeURIComponent(t).replace(/\//g, '%2F'))
      .join('/');
  } catch (t) {
    return (
      ah(
        !1,
        'The URL path "' +
          e +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ('encoding (' + t + ').')
      ),
      e
    );
  }
}
function Ja(e, t) {
  if (t === '/') return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith('/') ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && r !== '/' ? null : e.slice(n) || '/';
}
function m1(e, t) {
  t === void 0 && (t = '/');
  let {
    pathname: n,
    search: r = '',
    hash: o = '',
  } = typeof e == 'string' ? Yn(e) : e;
  return {
    pathname: n ? (n.startsWith('/') ? n : g1(n, t)) : t,
    search: w1(r),
    hash: _1(o),
  };
}
function g1(e, t) {
  let n = t.replace(/\/+$/, '').split('/');
  return (
    e.split('/').forEach(o => {
      o === '..' ? n.length > 1 && n.pop() : o !== '.' && n.push(o);
    }),
    n.length > 1 ? n.join('/') : '/'
  );
}
function bs(e, t, n, r) {
  return (
    "Cannot include a '" +
    e +
    "' character in a manually specified " +
    ('`to.' +
      t +
      '` field [' +
      JSON.stringify(r) +
      '].  Please separate it out to the ') +
    ('`to.' + n + '` field. Alternatively you may provide the full path as ') +
    'a string in <Link to="..."> and the router will parse it for you.'
  );
}
function y1(e) {
  return e.filter(
    (t, n) => n === 0 || (t.route.path && t.route.path.length > 0)
  );
}
function fh(e, t) {
  let n = y1(e);
  return t
    ? n.map((r, o) => (o === n.length - 1 ? r.pathname : r.pathnameBase))
    : n.map(r => r.pathnameBase);
}
function dh(e, t, n, r) {
  r === void 0 && (r = !1);
  let o;
  typeof e == 'string'
    ? (o = Yn(e))
    : ((o = Vr({}, e)),
      J(
        !o.pathname || !o.pathname.includes('?'),
        bs('?', 'pathname', 'search', o)
      ),
      J(
        !o.pathname || !o.pathname.includes('#'),
        bs('#', 'pathname', 'hash', o)
      ),
      J(!o.search || !o.search.includes('#'), bs('#', 'search', 'hash', o)));
  let i = e === '' || o.pathname === '',
    s = i ? '/' : o.pathname,
    l;
  if (s == null) l = n;
  else {
    let f = t.length - 1;
    if (!r && s.startsWith('..')) {
      let p = s.split('/');
      for (; p[0] === '..'; ) p.shift(), (f -= 1);
      o.pathname = p.join('/');
    }
    l = f >= 0 ? t[f] : '/';
  }
  let a = m1(o, l),
    u = s && s !== '/' && s.endsWith('/'),
    c = (i || s === '.') && n.endsWith('/');
  return !a.pathname.endsWith('/') && (u || c) && (a.pathname += '/'), a;
}
const Ut = e => e.join('/').replace(/\/\/+/g, '/'),
  v1 = e => e.replace(/\/+$/, '').replace(/^\/*/, '/'),
  w1 = e => (!e || e === '?' ? '' : e.startsWith('?') ? e : '?' + e),
  _1 = e => (!e || e === '#' ? '' : e.startsWith('#') ? e : '#' + e);
function S1(e) {
  return (
    e != null &&
    typeof e.status == 'number' &&
    typeof e.statusText == 'string' &&
    typeof e.internal == 'boolean' &&
    'data' in e
  );
}
const ph = ['post', 'put', 'patch', 'delete'];
new Set(ph);
const k1 = ['get', ...ph];
new Set(k1);
/**
 * React Router v6.28.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Kr() {
  return (
    (Kr = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Kr.apply(this, arguments)
  );
}
const Ga = P.createContext(null),
  E1 = P.createContext(null),
  dn = P.createContext(null),
  Yi = P.createContext(null),
  pn = P.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
  hh = P.createContext(null);
function x1(e, t) {
  let { relative: n } = t === void 0 ? {} : t;
  ro() || J(!1);
  let { basename: r, navigator: o } = P.useContext(dn),
    { hash: i, pathname: s, search: l } = gh(e, { relative: n }),
    a = s;
  return (
    r !== '/' && (a = s === '/' ? r : Ut([r, s])),
    o.createHref({ pathname: a, search: l, hash: i })
  );
}
function ro() {
  return P.useContext(Yi) != null;
}
function Ji() {
  return ro() || J(!1), P.useContext(Yi).location;
}
function mh(e) {
  P.useContext(dn).static || P.useLayoutEffect(e);
}
function C1() {
  let { isDataRoute: e } = P.useContext(pn);
  return e ? j1() : R1();
}
function R1() {
  ro() || J(!1);
  let e = P.useContext(Ga),
    { basename: t, future: n, navigator: r } = P.useContext(dn),
    { matches: o } = P.useContext(pn),
    { pathname: i } = Ji(),
    s = JSON.stringify(fh(o, n.v7_relativeSplatPath)),
    l = P.useRef(!1);
  return (
    mh(() => {
      l.current = !0;
    }),
    P.useCallback(
      function (u, c) {
        if ((c === void 0 && (c = {}), !l.current)) return;
        if (typeof u == 'number') {
          r.go(u);
          return;
        }
        let f = dh(u, JSON.parse(s), i, c.relative === 'path');
        e == null &&
          t !== '/' &&
          (f.pathname = f.pathname === '/' ? t : Ut([t, f.pathname])),
          (c.replace ? r.replace : r.push)(f, c.state, c);
      },
      [t, r, s, i, e]
    )
  );
}
function gh(e, t) {
  let { relative: n } = t === void 0 ? {} : t,
    { future: r } = P.useContext(dn),
    { matches: o } = P.useContext(pn),
    { pathname: i } = Ji(),
    s = JSON.stringify(fh(o, r.v7_relativeSplatPath));
  return P.useMemo(() => dh(e, JSON.parse(s), i, n === 'path'), [e, s, i, n]);
}
function O1(e, t) {
  return P1(e, t);
}
function P1(e, t, n, r) {
  ro() || J(!1);
  let { navigator: o } = P.useContext(dn),
    { matches: i } = P.useContext(pn),
    s = i[i.length - 1],
    l = s ? s.params : {};
  s && s.pathname;
  let a = s ? s.pathnameBase : '/';
  s && s.route;
  let u = Ji(),
    c;
  if (t) {
    var f;
    let w = typeof t == 'string' ? Yn(t) : t;
    a === '/' || ((f = w.pathname) != null && f.startsWith(a)) || J(!1),
      (c = w);
  } else c = u;
  let p = c.pathname || '/',
    y = p;
  if (a !== '/') {
    let w = a.replace(/^\//, '').split('/');
    y = '/' + p.replace(/^\//, '').split('/').slice(w.length).join('/');
  }
  let h = t1(e, { pathname: y }),
    v = F1(
      h &&
        h.map(w =>
          Object.assign({}, w, {
            params: Object.assign({}, l, w.params),
            pathname: Ut([
              a,
              o.encodeLocation
                ? o.encodeLocation(w.pathname).pathname
                : w.pathname,
            ]),
            pathnameBase:
              w.pathnameBase === '/'
                ? a
                : Ut([
                    a,
                    o.encodeLocation
                      ? o.encodeLocation(w.pathnameBase).pathname
                      : w.pathnameBase,
                  ]),
          })
        ),
      i,
      n,
      r
    );
  return t && v
    ? P.createElement(
        Yi.Provider,
        {
          value: {
            location: Kr(
              {
                pathname: '/',
                search: '',
                hash: '',
                state: null,
                key: 'default',
              },
              c
            ),
            navigationType: Pt.Pop,
          },
        },
        v
      )
    : v;
}
function N1() {
  let e = U1(),
    t = S1(e)
      ? e.status + ' ' + e.statusText
      : e instanceof Error
        ? e.message
        : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    o = { padding: '0.5rem', backgroundColor: 'rgba(200,200,200, 0.5)' };
  return P.createElement(
    P.Fragment,
    null,
    P.createElement('h2', null, 'Unexpected Application Error!'),
    P.createElement('h3', { style: { fontStyle: 'italic' } }, t),
    n ? P.createElement('pre', { style: o }, n) : null,
    null
  );
}
const T1 = P.createElement(N1, null);
class L1 extends P.Component {
  constructor(t) {
    super(t),
      (this.state = {
        location: t.location,
        revalidation: t.revalidation,
        error: t.error,
      });
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  static getDerivedStateFromProps(t, n) {
    return n.location !== t.location ||
      (n.revalidation !== 'idle' && t.revalidation === 'idle')
      ? { error: t.error, location: t.location, revalidation: t.revalidation }
      : {
          error: t.error !== void 0 ? t.error : n.error,
          location: n.location,
          revalidation: t.revalidation || n.revalidation,
        };
  }
  componentDidCatch(t, n) {
    console.error(
      'React Router caught the following error during render',
      t,
      n
    );
  }
  render() {
    return this.state.error !== void 0
      ? P.createElement(
          pn.Provider,
          { value: this.props.routeContext },
          P.createElement(hh.Provider, {
            value: this.state.error,
            children: this.props.component,
          })
        )
      : this.props.children;
  }
}
function $1(e) {
  let { routeContext: t, match: n, children: r } = e,
    o = P.useContext(Ga);
  return (
    o &&
      o.static &&
      o.staticContext &&
      (n.route.errorElement || n.route.ErrorBoundary) &&
      (o.staticContext._deepestRenderedBoundaryId = n.route.id),
    P.createElement(pn.Provider, { value: t }, r)
  );
}
function F1(e, t, n, r) {
  var o;
  if (
    (t === void 0 && (t = []),
    n === void 0 && (n = null),
    r === void 0 && (r = null),
    e == null)
  ) {
    var i;
    if (!n) return null;
    if (n.errors) e = n.matches;
    else if (
      (i = r) != null &&
      i.v7_partialHydration &&
      t.length === 0 &&
      !n.initialized &&
      n.matches.length > 0
    )
      e = n.matches;
    else return null;
  }
  let s = e,
    l = (o = n) == null ? void 0 : o.errors;
  if (l != null) {
    let c = s.findIndex(
      f => f.route.id && (l == null ? void 0 : l[f.route.id]) !== void 0
    );
    c >= 0 || J(!1), (s = s.slice(0, Math.min(s.length, c + 1)));
  }
  let a = !1,
    u = -1;
  if (n && r && r.v7_partialHydration)
    for (let c = 0; c < s.length; c++) {
      let f = s[c];
      if (
        ((f.route.HydrateFallback || f.route.hydrateFallbackElement) && (u = c),
        f.route.id)
      ) {
        let { loaderData: p, errors: y } = n,
          h =
            f.route.loader &&
            p[f.route.id] === void 0 &&
            (!y || y[f.route.id] === void 0);
        if (f.route.lazy || h) {
          (a = !0), u >= 0 ? (s = s.slice(0, u + 1)) : (s = [s[0]]);
          break;
        }
      }
    }
  return s.reduceRight((c, f, p) => {
    let y,
      h = !1,
      v = null,
      w = null;
    n &&
      ((y = l && f.route.id ? l[f.route.id] : void 0),
      (v = f.route.errorElement || T1),
      a &&
        (u < 0 && p === 0
          ? ((h = !0), (w = null))
          : u === p &&
            ((h = !0), (w = f.route.hydrateFallbackElement || null))));
    let m = t.concat(s.slice(0, p + 1)),
      d = () => {
        let g;
        return (
          y
            ? (g = v)
            : h
              ? (g = w)
              : f.route.Component
                ? (g = P.createElement(f.route.Component, null))
                : f.route.element
                  ? (g = f.route.element)
                  : (g = c),
          P.createElement($1, {
            match: f,
            routeContext: { outlet: c, matches: m, isDataRoute: n != null },
            children: g,
          })
        );
      };
    return n && (f.route.ErrorBoundary || f.route.errorElement || p === 0)
      ? P.createElement(L1, {
          location: n.location,
          revalidation: n.revalidation,
          component: v,
          error: y,
          children: d(),
          routeContext: { outlet: null, matches: m, isDataRoute: !0 },
        })
      : d();
  }, null);
}
var yh = (function (e) {
    return (
      (e.UseBlocker = 'useBlocker'),
      (e.UseRevalidator = 'useRevalidator'),
      (e.UseNavigateStable = 'useNavigate'),
      e
    );
  })(yh || {}),
  wi = (function (e) {
    return (
      (e.UseBlocker = 'useBlocker'),
      (e.UseLoaderData = 'useLoaderData'),
      (e.UseActionData = 'useActionData'),
      (e.UseRouteError = 'useRouteError'),
      (e.UseNavigation = 'useNavigation'),
      (e.UseRouteLoaderData = 'useRouteLoaderData'),
      (e.UseMatches = 'useMatches'),
      (e.UseRevalidator = 'useRevalidator'),
      (e.UseNavigateStable = 'useNavigate'),
      (e.UseRouteId = 'useRouteId'),
      e
    );
  })(wi || {});
function b1(e) {
  let t = P.useContext(Ga);
  return t || J(!1), t;
}
function D1(e) {
  let t = P.useContext(E1);
  return t || J(!1), t;
}
function A1(e) {
  let t = P.useContext(pn);
  return t || J(!1), t;
}
function vh(e) {
  let t = A1(),
    n = t.matches[t.matches.length - 1];
  return n.route.id || J(!1), n.route.id;
}
function U1() {
  var e;
  let t = P.useContext(hh),
    n = D1(wi.UseRouteError),
    r = vh(wi.UseRouteError);
  return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[r];
}
function j1() {
  let { router: e } = b1(yh.UseNavigateStable),
    t = vh(wi.UseNavigateStable),
    n = P.useRef(!1);
  return (
    mh(() => {
      n.current = !0;
    }),
    P.useCallback(
      function (o, i) {
        i === void 0 && (i = {}),
          n.current &&
            (typeof o == 'number'
              ? e.navigate(o)
              : e.navigate(o, Kr({ fromRouteId: t }, i)));
      },
      [e, t]
    )
  );
}
const zc = {};
function I1(e, t) {
  zc[t] || ((zc[t] = !0), console.warn(t));
}
const Mc = (e, t, n) =>
  I1(
    e,
    '⚠️ React Router Future Flag Warning: ' +
      t +
      '. ' +
      ('You can use the `' + e + '` future flag to opt-in early. ') +
      ('For more information, see ' + n + '.')
  );
function z1(e, t) {
  (e != null && e.v7_startTransition) ||
    Mc(
      'v7_startTransition',
      'React Router will begin wrapping state updates in `React.startTransition` in v7',
      'https://reactrouter.com/v6/upgrading/future#v7_starttransition'
    ),
    !(e != null && e.v7_relativeSplatPath) &&
      !t &&
      Mc(
        'v7_relativeSplatPath',
        'Relative route resolution within Splat routes is changing in v7',
        'https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath'
      );
}
function wh(e) {
  J(!1);
}
function M1(e) {
  let {
    basename: t = '/',
    children: n = null,
    location: r,
    navigationType: o = Pt.Pop,
    navigator: i,
    static: s = !1,
    future: l,
  } = e;
  ro() && J(!1);
  let a = t.replace(/^\/*/, '/'),
    u = P.useMemo(
      () => ({
        basename: a,
        navigator: i,
        static: s,
        future: Kr({ v7_relativeSplatPath: !1 }, l),
      }),
      [a, l, i, s]
    );
  typeof r == 'string' && (r = Yn(r));
  let {
      pathname: c = '/',
      search: f = '',
      hash: p = '',
      state: y = null,
      key: h = 'default',
    } = r,
    v = P.useMemo(() => {
      let w = Ja(c, a);
      return w == null
        ? null
        : {
            location: { pathname: w, search: f, hash: p, state: y, key: h },
            navigationType: o,
          };
    }, [a, c, f, p, y, h, o]);
  return v == null
    ? null
    : P.createElement(
        dn.Provider,
        { value: u },
        P.createElement(Yi.Provider, { children: n, value: v })
      );
}
function B1(e) {
  let { children: t, location: n } = e;
  return O1(Vl(t), n);
}
new Promise(() => {});
function Vl(e, t) {
  t === void 0 && (t = []);
  let n = [];
  return (
    P.Children.forEach(e, (r, o) => {
      if (!P.isValidElement(r)) return;
      let i = [...t, o];
      if (r.type === P.Fragment) {
        n.push.apply(n, Vl(r.props.children, i));
        return;
      }
      r.type !== wh && J(!1), !r.props.index || !r.props.children || J(!1);
      let s = {
        id: r.props.id || i.join('-'),
        caseSensitive: r.props.caseSensitive,
        element: r.props.element,
        Component: r.props.Component,
        index: r.props.index,
        path: r.props.path,
        loader: r.props.loader,
        action: r.props.action,
        errorElement: r.props.errorElement,
        ErrorBoundary: r.props.ErrorBoundary,
        hasErrorBoundary:
          r.props.ErrorBoundary != null || r.props.errorElement != null,
        shouldRevalidate: r.props.shouldRevalidate,
        handle: r.props.handle,
        lazy: r.props.lazy,
      };
      r.props.children && (s.children = Vl(r.props.children, i)), n.push(s);
    }),
    n
  );
}
/**
 * React Router DOM v6.28.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Kl() {
  return (
    (Kl = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Kl.apply(this, arguments)
  );
}
function V1(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    o,
    i;
  for (i = 0; i < r.length; i++)
    (o = r[i]), !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
function K1(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function H1(e, t) {
  return e.button === 0 && (!t || t === '_self') && !K1(e);
}
const W1 = [
    'onClick',
    'relative',
    'reloadDocument',
    'replace',
    'state',
    'target',
    'to',
    'preventScrollReset',
    'viewTransition',
  ],
  Q1 = '6';
try {
  window.__reactRouterVersion = Q1;
} catch {}
const q1 = 'startTransition',
  Bc = Us[q1];
function X1(e) {
  let { basename: t, children: n, future: r, window: o } = e,
    i = P.useRef();
  i.current == null && (i.current = G0({ window: o, v5Compat: !0 }));
  let s = i.current,
    [l, a] = P.useState({ action: s.action, location: s.location }),
    { v7_startTransition: u } = r || {},
    c = P.useCallback(
      f => {
        u && Bc ? Bc(() => a(f)) : a(f);
      },
      [a, u]
    );
  return (
    P.useLayoutEffect(() => s.listen(c), [s, c]),
    P.useEffect(() => z1(r), [r]),
    P.createElement(M1, {
      basename: t,
      children: n,
      location: l.location,
      navigationType: l.action,
      navigator: s,
      future: r,
    })
  );
}
const Y1 =
    typeof window < 'u' &&
    typeof window.document < 'u' &&
    typeof window.document.createElement < 'u',
  J1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  UR = P.forwardRef(function (t, n) {
    let {
        onClick: r,
        relative: o,
        reloadDocument: i,
        replace: s,
        state: l,
        target: a,
        to: u,
        preventScrollReset: c,
        viewTransition: f,
      } = t,
      p = V1(t, W1),
      { basename: y } = P.useContext(dn),
      h,
      v = !1;
    if (typeof u == 'string' && J1.test(u) && ((h = u), Y1))
      try {
        let g = new URL(window.location.href),
          _ = u.startsWith('//') ? new URL(g.protocol + u) : new URL(u),
          k = Ja(_.pathname, y);
        _.origin === g.origin && k != null
          ? (u = k + _.search + _.hash)
          : (v = !0);
      } catch {}
    let w = x1(u, { relative: o }),
      m = G1(u, {
        replace: s,
        state: l,
        target: a,
        preventScrollReset: c,
        relative: o,
        viewTransition: f,
      });
    function d(g) {
      r && r(g), g.defaultPrevented || m(g);
    }
    return P.createElement(
      'a',
      Kl({}, p, { href: h || w, onClick: v || i ? r : d, ref: n, target: a })
    );
  });
var Vc;
(function (e) {
  (e.UseScrollRestoration = 'useScrollRestoration'),
    (e.UseSubmit = 'useSubmit'),
    (e.UseSubmitFetcher = 'useSubmitFetcher'),
    (e.UseFetcher = 'useFetcher'),
    (e.useViewTransitionState = 'useViewTransitionState');
})(Vc || (Vc = {}));
var Kc;
(function (e) {
  (e.UseFetcher = 'useFetcher'),
    (e.UseFetchers = 'useFetchers'),
    (e.UseScrollRestoration = 'useScrollRestoration');
})(Kc || (Kc = {}));
function G1(e, t) {
  let {
      target: n,
      replace: r,
      state: o,
      preventScrollReset: i,
      relative: s,
      viewTransition: l,
    } = t === void 0 ? {} : t,
    a = C1(),
    u = Ji(),
    c = gh(e, { relative: s });
  return P.useCallback(
    f => {
      if (H1(f, n)) {
        f.preventDefault();
        let p = r !== void 0 ? r : vi(u) === vi(c);
        a(e, {
          replace: p,
          state: o,
          preventScrollReset: i,
          relative: s,
          viewTransition: l,
        });
      }
    },
    [u, a, c, r, o, n, e, i, s, l]
  );
}
var Z1 = {
  cm: !0,
  mm: !0,
  in: !0,
  px: !0,
  pt: !0,
  pc: !0,
  em: !0,
  ex: !0,
  ch: !0,
  rem: !0,
  vw: !0,
  vh: !0,
  vmin: !0,
  vmax: !0,
  '%': !0,
};
function ew(e) {
  if (typeof e == 'number') return { value: e, unit: 'px' };
  var t,
    n = (e.match(/^[0-9.]*/) || '').toString();
  n.includes('.') ? (t = parseFloat(n)) : (t = parseInt(n, 10));
  var r = (e.match(/[^0-9]*$/) || '').toString();
  return Z1[r]
    ? { value: t, unit: r }
    : (console.warn(
        'React Spinners: '
          .concat(e, ' is not a valid css value. Defaulting to ')
          .concat(t, 'px.')
      ),
      { value: t, unit: 'px' });
}
function Hc(e) {
  var t = ew(e);
  return ''.concat(t.value).concat(t.unit);
}
var tw = function (e, t, n) {
    var r = 'react-spinners-'.concat(e, '-').concat(n);
    if (typeof window > 'u' || !window.document) return r;
    var o = document.createElement('style');
    document.head.appendChild(o);
    var i = o.sheet,
      s = `
    @keyframes `
        .concat(
          r,
          ` {
      `
        )
        .concat(
          t,
          `
    }
  `
        );
    return i && i.insertRule(s, 0), r;
  },
  _i = function () {
    return (
      (_i =
        Object.assign ||
        function (e) {
          for (var t, n = 1, r = arguments.length; n < r; n++) {
            t = arguments[n];
            for (var o in t)
              Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
          }
          return e;
        }),
      _i.apply(this, arguments)
    );
  },
  nw = function (e, t) {
    var n = {};
    for (var r in e)
      Object.prototype.hasOwnProperty.call(e, r) &&
        t.indexOf(r) < 0 &&
        (n[r] = e[r]);
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
        t.indexOf(r[o]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
          (n[r[o]] = e[r[o]]);
    return n;
  },
  rw = tw(
    'ClipLoader',
    '0% {transform: rotate(0deg) scale(1)} 50% {transform: rotate(180deg) scale(0.8)} 100% {transform: rotate(360deg) scale(1)}',
    'clip'
  );
function ow(e) {
  var t = e.loading,
    n = t === void 0 ? !0 : t,
    r = e.color,
    o = r === void 0 ? '#000000' : r,
    i = e.speedMultiplier,
    s = i === void 0 ? 1 : i,
    l = e.cssOverride,
    a = l === void 0 ? {} : l,
    u = e.size,
    c = u === void 0 ? 35 : u,
    f = nw(e, ['loading', 'color', 'speedMultiplier', 'cssOverride', 'size']),
    p = _i(
      {
        background: 'transparent !important',
        width: Hc(c),
        height: Hc(c),
        borderRadius: '100%',
        border: '2px solid',
        borderTopColor: o,
        borderBottomColor: 'transparent',
        borderLeftColor: o,
        borderRightColor: o,
        display: 'inline-block',
        animation: ''.concat(rw, ' ').concat(0.75 / s, 's 0s infinite linear'),
        animationFillMode: 'both',
      },
      a
    );
  return n ? P.createElement('span', _i({ style: p }, f)) : null;
}
const Wc = {
  'loader-container': '_loader-container_3qva9_1',
  'loader-overlay': '_loader-overlay_3qva9_14',
};
var _h = { exports: {} },
  iw = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED',
  sw = iw,
  lw = sw;
function Sh() {}
function kh() {}
kh.resetWarningCache = Sh;
var aw = function () {
  function e(r, o, i, s, l, a) {
    if (a !== lw) {
      var u = new Error(
        'Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types'
      );
      throw ((u.name = 'Invariant Violation'), u);
    }
  }
  e.isRequired = e;
  function t() {
    return e;
  }
  var n = {
    array: e,
    bigint: e,
    bool: e,
    func: e,
    number: e,
    object: e,
    string: e,
    symbol: e,
    any: e,
    arrayOf: t,
    element: e,
    elementType: e,
    instanceOf: t,
    node: e,
    objectOf: t,
    oneOf: t,
    oneOfType: t,
    shape: t,
    exact: t,
    checkPropTypes: kh,
    resetWarningCache: Sh,
  };
  return (n.PropTypes = n), n;
};
_h.exports = aw();
var uw = _h.exports;
const Ds = ql(uw),
  Eh = ({ type: e, color: t = 'var(--color-blue)', size: n = 50 }) => {
    const r = e === 'overlay' ? Wc['loader-overlay'] : Wc['loader-container'];
    return Se.jsx('div', {
      className: r,
      children: Se.jsx(ow, { color: t, size: n }),
    });
  };
Eh.propTypes = {
  type: Ds.oneOf(['container', 'overlay']).isRequired,
  color: Ds.string,
  size: Ds.number,
};
const cw = P.lazy(() =>
  J0(() => import('./Home-C9NcnHLG.js'), __vite__mapDeps([0, 1]))
);
function fw() {
  return Se.jsx(X1, {
    children: Se.jsx('main', {
      className: 'page-fade',
      children: Se.jsx(P.Suspense, {
        fallback: Se.jsx(Eh, { type: 'container' }),
        children: Se.jsx(B1, {
          children: Se.jsx(wh, { path: '/', element: Se.jsx(cw, {}) }),
        }),
      }),
    }),
  });
}
const F = e => typeof e == 'string',
  sr = () => {
    let e, t;
    const n = new Promise((r, o) => {
      (e = r), (t = o);
    });
    return (n.resolve = e), (n.reject = t), n;
  },
  Qc = e => (e == null ? '' : '' + e),
  dw = (e, t, n) => {
    e.forEach(r => {
      t[r] && (n[r] = t[r]);
    });
  },
  pw = /###/g,
  qc = e => (e && e.indexOf('###') > -1 ? e.replace(pw, '.') : e),
  Xc = e => !e || F(e),
  kr = (e, t, n) => {
    const r = F(t) ? t.split('.') : t;
    let o = 0;
    for (; o < r.length - 1; ) {
      if (Xc(e)) return {};
      const i = qc(r[o]);
      !e[i] && n && (e[i] = new n()),
        Object.prototype.hasOwnProperty.call(e, i) ? (e = e[i]) : (e = {}),
        ++o;
    }
    return Xc(e) ? {} : { obj: e, k: qc(r[o]) };
  },
  Yc = (e, t, n) => {
    const { obj: r, k: o } = kr(e, t, Object);
    if (r !== void 0 || t.length === 1) {
      r[o] = n;
      return;
    }
    let i = t[t.length - 1],
      s = t.slice(0, t.length - 1),
      l = kr(e, s, Object);
    for (; l.obj === void 0 && s.length; )
      (i = `${s[s.length - 1]}.${i}`),
        (s = s.slice(0, s.length - 1)),
        (l = kr(e, s, Object)),
        l != null &&
          l.obj &&
          typeof l.obj[`${l.k}.${i}`] < 'u' &&
          (l.obj = void 0);
    l.obj[`${l.k}.${i}`] = n;
  },
  hw = (e, t, n, r) => {
    const { obj: o, k: i } = kr(e, t, Object);
    (o[i] = o[i] || []), o[i].push(n);
  },
  Si = (e, t) => {
    const { obj: n, k: r } = kr(e, t);
    if (n && Object.prototype.hasOwnProperty.call(n, r)) return n[r];
  },
  mw = (e, t, n) => {
    const r = Si(e, n);
    return r !== void 0 ? r : Si(t, n);
  },
  xh = (e, t, n) => {
    for (const r in t)
      r !== '__proto__' &&
        r !== 'constructor' &&
        (r in e
          ? F(e[r]) ||
            e[r] instanceof String ||
            F(t[r]) ||
            t[r] instanceof String
            ? n && (e[r] = t[r])
            : xh(e[r], t[r], n)
          : (e[r] = t[r]));
    return e;
  },
  gn = e => e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
var gw = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
};
const yw = e => (F(e) ? e.replace(/[&<>"'\/]/g, t => gw[t]) : e);
class vw {
  constructor(t) {
    (this.capacity = t), (this.regExpMap = new Map()), (this.regExpQueue = []);
  }
  getRegExp(t) {
    const n = this.regExpMap.get(t);
    if (n !== void 0) return n;
    const r = new RegExp(t);
    return (
      this.regExpQueue.length === this.capacity &&
        this.regExpMap.delete(this.regExpQueue.shift()),
      this.regExpMap.set(t, r),
      this.regExpQueue.push(t),
      r
    );
  }
}
const ww = [' ', ',', '?', '!', ';'],
  _w = new vw(20),
  Sw = (e, t, n) => {
    (t = t || ''), (n = n || '');
    const r = ww.filter(s => t.indexOf(s) < 0 && n.indexOf(s) < 0);
    if (r.length === 0) return !0;
    const o = _w.getRegExp(
      `(${r.map(s => (s === '?' ? '\\?' : s)).join('|')})`
    );
    let i = !o.test(e);
    if (!i) {
      const s = e.indexOf(n);
      s > 0 && !o.test(e.substring(0, s)) && (i = !0);
    }
    return i;
  },
  Hl = (e, t, n = '.') => {
    if (!e) return;
    if (e[t]) return Object.prototype.hasOwnProperty.call(e, t) ? e[t] : void 0;
    const r = t.split(n);
    let o = e;
    for (let i = 0; i < r.length; ) {
      if (!o || typeof o != 'object') return;
      let s,
        l = '';
      for (let a = i; a < r.length; ++a)
        if ((a !== i && (l += n), (l += r[a]), (s = o[l]), s !== void 0)) {
          if (
            ['string', 'number', 'boolean'].indexOf(typeof s) > -1 &&
            a < r.length - 1
          )
            continue;
          i += a - i + 1;
          break;
        }
      o = s;
    }
    return o;
  },
  Hr = e => (e == null ? void 0 : e.replace('_', '-')),
  kw = {
    type: 'logger',
    log(e) {
      this.output('log', e);
    },
    warn(e) {
      this.output('warn', e);
    },
    error(e) {
      this.output('error', e);
    },
    output(e, t) {
      var n, r;
      (r =
        (n = console == null ? void 0 : console[e]) == null
          ? void 0
          : n.apply) == null || r.call(n, console, t);
    },
  };
class ki {
  constructor(t, n = {}) {
    this.init(t, n);
  }
  init(t, n = {}) {
    (this.prefix = n.prefix || 'i18next:'),
      (this.logger = t || kw),
      (this.options = n),
      (this.debug = n.debug);
  }
  log(...t) {
    return this.forward(t, 'log', '', !0);
  }
  warn(...t) {
    return this.forward(t, 'warn', '', !0);
  }
  error(...t) {
    return this.forward(t, 'error', '');
  }
  deprecate(...t) {
    return this.forward(t, 'warn', 'WARNING DEPRECATED: ', !0);
  }
  forward(t, n, r, o) {
    return o && !this.debug
      ? null
      : (F(t[0]) && (t[0] = `${r}${this.prefix} ${t[0]}`), this.logger[n](t));
  }
  create(t) {
    return new ki(this.logger, {
      prefix: `${this.prefix}:${t}:`,
      ...this.options,
    });
  }
  clone(t) {
    return (
      (t = t || this.options),
      (t.prefix = t.prefix || this.prefix),
      new ki(this.logger, t)
    );
  }
}
var it = new ki();
class Gi {
  constructor() {
    this.observers = {};
  }
  on(t, n) {
    return (
      t.split(' ').forEach(r => {
        this.observers[r] || (this.observers[r] = new Map());
        const o = this.observers[r].get(n) || 0;
        this.observers[r].set(n, o + 1);
      }),
      this
    );
  }
  off(t, n) {
    if (this.observers[t]) {
      if (!n) {
        delete this.observers[t];
        return;
      }
      this.observers[t].delete(n);
    }
  }
  emit(t, ...n) {
    this.observers[t] &&
      Array.from(this.observers[t].entries()).forEach(([o, i]) => {
        for (let s = 0; s < i; s++) o(...n);
      }),
      this.observers['*'] &&
        Array.from(this.observers['*'].entries()).forEach(([o, i]) => {
          for (let s = 0; s < i; s++) o.apply(o, [t, ...n]);
        });
  }
}
class Jc extends Gi {
  constructor(t, n = { ns: ['translation'], defaultNS: 'translation' }) {
    super(),
      (this.data = t || {}),
      (this.options = n),
      this.options.keySeparator === void 0 && (this.options.keySeparator = '.'),
      this.options.ignoreJSONStructure === void 0 &&
        (this.options.ignoreJSONStructure = !0);
  }
  addNamespaces(t) {
    this.options.ns.indexOf(t) < 0 && this.options.ns.push(t);
  }
  removeNamespaces(t) {
    const n = this.options.ns.indexOf(t);
    n > -1 && this.options.ns.splice(n, 1);
  }
  getResource(t, n, r, o = {}) {
    var u, c;
    const i =
        o.keySeparator !== void 0 ? o.keySeparator : this.options.keySeparator,
      s =
        o.ignoreJSONStructure !== void 0
          ? o.ignoreJSONStructure
          : this.options.ignoreJSONStructure;
    let l;
    t.indexOf('.') > -1
      ? (l = t.split('.'))
      : ((l = [t, n]),
        r &&
          (Array.isArray(r)
            ? l.push(...r)
            : F(r) && i
              ? l.push(...r.split(i))
              : l.push(r)));
    const a = Si(this.data, l);
    return (
      !a &&
        !n &&
        !r &&
        t.indexOf('.') > -1 &&
        ((t = l[0]), (n = l[1]), (r = l.slice(2).join('.'))),
      a || !s || !F(r)
        ? a
        : Hl(
            (c = (u = this.data) == null ? void 0 : u[t]) == null
              ? void 0
              : c[n],
            r,
            i
          )
    );
  }
  addResource(t, n, r, o, i = { silent: !1 }) {
    const s =
      i.keySeparator !== void 0 ? i.keySeparator : this.options.keySeparator;
    let l = [t, n];
    r && (l = l.concat(s ? r.split(s) : r)),
      t.indexOf('.') > -1 && ((l = t.split('.')), (o = n), (n = l[1])),
      this.addNamespaces(n),
      Yc(this.data, l, o),
      i.silent || this.emit('added', t, n, r, o);
  }
  addResources(t, n, r, o = { silent: !1 }) {
    for (const i in r)
      (F(r[i]) || Array.isArray(r[i])) &&
        this.addResource(t, n, i, r[i], { silent: !0 });
    o.silent || this.emit('added', t, n, r);
  }
  addResourceBundle(t, n, r, o, i, s = { silent: !1, skipCopy: !1 }) {
    let l = [t, n];
    t.indexOf('.') > -1 && ((l = t.split('.')), (o = r), (r = n), (n = l[1])),
      this.addNamespaces(n);
    let a = Si(this.data, l) || {};
    s.skipCopy || (r = JSON.parse(JSON.stringify(r))),
      o ? xh(a, r, i) : (a = { ...a, ...r }),
      Yc(this.data, l, a),
      s.silent || this.emit('added', t, n, r);
  }
  removeResourceBundle(t, n) {
    this.hasResourceBundle(t, n) && delete this.data[t][n],
      this.removeNamespaces(n),
      this.emit('removed', t, n);
  }
  hasResourceBundle(t, n) {
    return this.getResource(t, n) !== void 0;
  }
  getResourceBundle(t, n) {
    return n || (n = this.options.defaultNS), this.getResource(t, n);
  }
  getDataByLanguage(t) {
    return this.data[t];
  }
  hasLanguageSomeTranslations(t) {
    const n = this.getDataByLanguage(t);
    return !!((n && Object.keys(n)) || []).find(
      o => n[o] && Object.keys(n[o]).length > 0
    );
  }
  toJSON() {
    return this.data;
  }
}
var Ch = {
  processors: {},
  addPostProcessor(e) {
    this.processors[e.name] = e;
  },
  handle(e, t, n, r, o) {
    return (
      e.forEach(i => {
        var s;
        t =
          ((s = this.processors[i]) == null ? void 0 : s.process(t, n, r, o)) ??
          t;
      }),
      t
    );
  },
};
const Rh = Symbol('i18next/PATH_KEY');
function Ew() {
  const e = [],
    t = Object.create(null);
  let n;
  return (
    (t.get = (r, o) => {
      var i;
      return (
        (i = n == null ? void 0 : n.revoke) == null || i.call(n),
        o === Rh ? e : (e.push(o), (n = Proxy.revocable(r, t)), n.proxy)
      );
    }),
    Proxy.revocable(Object.create(null), t).proxy
  );
}
function Wl(e, t) {
  const { [Rh]: n } = e(Ew());
  return n.join((t == null ? void 0 : t.keySeparator) ?? '.');
}
const Gc = {},
  Zc = e => !F(e) && typeof e != 'boolean' && typeof e != 'number';
class Ei extends Gi {
  constructor(t, n = {}) {
    super(),
      dw(
        [
          'resourceStore',
          'languageUtils',
          'pluralResolver',
          'interpolator',
          'backendConnector',
          'i18nFormat',
          'utils',
        ],
        t,
        this
      ),
      (this.options = n),
      this.options.keySeparator === void 0 && (this.options.keySeparator = '.'),
      (this.logger = it.create('translator'));
  }
  changeLanguage(t) {
    t && (this.language = t);
  }
  exists(t, n = { interpolation: {} }) {
    const r = { ...n };
    if (t == null) return !1;
    const o = this.resolve(t, r);
    return (o == null ? void 0 : o.res) !== void 0;
  }
  extractFromKey(t, n) {
    let r = n.nsSeparator !== void 0 ? n.nsSeparator : this.options.nsSeparator;
    r === void 0 && (r = ':');
    const o =
      n.keySeparator !== void 0 ? n.keySeparator : this.options.keySeparator;
    let i = n.ns || this.options.defaultNS || [];
    const s = r && t.indexOf(r) > -1,
      l =
        !this.options.userDefinedKeySeparator &&
        !n.keySeparator &&
        !this.options.userDefinedNsSeparator &&
        !n.nsSeparator &&
        !Sw(t, r, o);
    if (s && !l) {
      const a = t.match(this.interpolator.nestingRegexp);
      if (a && a.length > 0) return { key: t, namespaces: F(i) ? [i] : i };
      const u = t.split(r);
      (r !== o || (r === o && this.options.ns.indexOf(u[0]) > -1)) &&
        (i = u.shift()),
        (t = u.join(o));
    }
    return { key: t, namespaces: F(i) ? [i] : i };
  }
  translate(t, n, r) {
    let o = typeof n == 'object' ? { ...n } : n;
    if (
      (typeof o != 'object' &&
        this.options.overloadTranslationOptionHandler &&
        (o = this.options.overloadTranslationOptionHandler(arguments)),
      typeof o == 'object' && (o = { ...o }),
      o || (o = {}),
      t == null)
    )
      return '';
    typeof t == 'function' && (t = Wl(t, { ...this.options, ...o })),
      Array.isArray(t) || (t = [String(t)]);
    const i =
        o.returnDetails !== void 0
          ? o.returnDetails
          : this.options.returnDetails,
      s =
        o.keySeparator !== void 0 ? o.keySeparator : this.options.keySeparator,
      { key: l, namespaces: a } = this.extractFromKey(t[t.length - 1], o),
      u = a[a.length - 1];
    let c = o.nsSeparator !== void 0 ? o.nsSeparator : this.options.nsSeparator;
    c === void 0 && (c = ':');
    const f = o.lng || this.language,
      p = o.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if ((f == null ? void 0 : f.toLowerCase()) === 'cimode')
      return p
        ? i
          ? {
              res: `${u}${c}${l}`,
              usedKey: l,
              exactUsedKey: l,
              usedLng: f,
              usedNS: u,
              usedParams: this.getUsedParamsDetails(o),
            }
          : `${u}${c}${l}`
        : i
          ? {
              res: l,
              usedKey: l,
              exactUsedKey: l,
              usedLng: f,
              usedNS: u,
              usedParams: this.getUsedParamsDetails(o),
            }
          : l;
    const y = this.resolve(t, o);
    let h = y == null ? void 0 : y.res;
    const v = (y == null ? void 0 : y.usedKey) || l,
      w = (y == null ? void 0 : y.exactUsedKey) || l,
      m = ['[object Number]', '[object Function]', '[object RegExp]'],
      d = o.joinArrays !== void 0 ? o.joinArrays : this.options.joinArrays,
      g = !this.i18nFormat || this.i18nFormat.handleAsObject,
      _ = o.count !== void 0 && !F(o.count),
      k = Ei.hasDefaultValue(o),
      C = _ ? this.pluralResolver.getSuffix(f, o.count, o) : '',
      R =
        o.ordinal && _
          ? this.pluralResolver.getSuffix(f, o.count, { ordinal: !1 })
          : '',
      x = _ && !o.ordinal && o.count === 0,
      L =
        (x && o[`defaultValue${this.options.pluralSeparator}zero`]) ||
        o[`defaultValue${C}`] ||
        o[`defaultValue${R}`] ||
        o.defaultValue;
    let T = h;
    g && !h && k && (T = L);
    const he = Zc(T),
      Vt = Object.prototype.toString.apply(T);
    if (g && T && he && m.indexOf(Vt) < 0 && !(F(d) && Array.isArray(T))) {
      if (!o.returnObjects && !this.options.returnObjects) {
        this.options.returnedObjectHandler ||
          this.logger.warn(
            'accessing an object - but returnObjects options is not enabled!'
          );
        const ae = this.options.returnedObjectHandler
          ? this.options.returnedObjectHandler(v, T, { ...o, ns: a })
          : `key '${l} (${this.language})' returned an object instead of string.`;
        return i
          ? ((y.res = ae), (y.usedParams = this.getUsedParamsDetails(o)), y)
          : ae;
      }
      if (s) {
        const ae = Array.isArray(T),
          we = ae ? [] : {},
          oo = ae ? w : v;
        for (const _e in T)
          if (Object.prototype.hasOwnProperty.call(T, _e)) {
            const Ne = `${oo}${s}${_e}`;
            k && !h
              ? (we[_e] = this.translate(Ne, {
                  ...o,
                  defaultValue: Zc(L) ? L[_e] : void 0,
                  joinArrays: !1,
                  ns: a,
                }))
              : (we[_e] = this.translate(Ne, { ...o, joinArrays: !1, ns: a })),
              we[_e] === Ne && (we[_e] = T[_e]);
          }
        h = we;
      }
    } else if (g && F(d) && Array.isArray(h))
      (h = h.join(d)), h && (h = this.extendTranslation(h, t, o, r));
    else {
      let ae = !1,
        we = !1;
      !this.isValidLookup(h) && k && ((ae = !0), (h = L)),
        this.isValidLookup(h) || ((we = !0), (h = l));
      const _e =
          (o.missingKeyNoValueFallbackToKey ||
            this.options.missingKeyNoValueFallbackToKey) &&
          we
            ? void 0
            : h,
        Ne = k && L !== h && this.options.updateMissing;
      if (we || ae || Ne) {
        if (
          (this.logger.log(
            Ne ? 'updateKey' : 'missingKey',
            f,
            u,
            l,
            Ne ? L : h
          ),
          s)
        ) {
          const U = this.resolve(l, { ...o, keySeparator: !1 });
          U &&
            U.res &&
            this.logger.warn(
              'Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.'
            );
        }
        let O = [];
        const $ = this.languageUtils.getFallbackCodes(
          this.options.fallbackLng,
          o.lng || this.language
        );
        if (this.options.saveMissingTo === 'fallback' && $ && $[0])
          for (let U = 0; U < $.length; U++) O.push($[U]);
        else
          this.options.saveMissingTo === 'all'
            ? (O = this.languageUtils.toResolveHierarchy(
                o.lng || this.language
              ))
            : O.push(o.lng || this.language);
        const D = (U, z, Ze) => {
          var hn;
          const et = k && Ze !== h ? Ze : _e;
          this.options.missingKeyHandler
            ? this.options.missingKeyHandler(U, u, z, et, Ne, o)
            : (hn = this.backendConnector) != null &&
              hn.saveMissing &&
              this.backendConnector.saveMissing(U, u, z, et, Ne, o),
            this.emit('missingKey', U, u, z, h);
        };
        this.options.saveMissing &&
          (this.options.saveMissingPlurals && _
            ? O.forEach(U => {
                const z = this.pluralResolver.getSuffixes(U, o);
                x &&
                  o[`defaultValue${this.options.pluralSeparator}zero`] &&
                  z.indexOf(`${this.options.pluralSeparator}zero`) < 0 &&
                  z.push(`${this.options.pluralSeparator}zero`),
                  z.forEach(Ze => {
                    D([U], l + Ze, o[`defaultValue${Ze}`] || L);
                  });
              })
            : D(O, l, L));
      }
      (h = this.extendTranslation(h, t, o, y, r)),
        we &&
          h === l &&
          this.options.appendNamespaceToMissingKey &&
          (h = `${u}${c}${l}`),
        (we || ae) &&
          this.options.parseMissingKeyHandler &&
          (h = this.options.parseMissingKeyHandler(
            this.options.appendNamespaceToMissingKey ? `${u}${c}${l}` : l,
            ae ? h : void 0,
            o
          ));
    }
    return i
      ? ((y.res = h), (y.usedParams = this.getUsedParamsDetails(o)), y)
      : h;
  }
  extendTranslation(t, n, r, o, i) {
    var a, u;
    if ((a = this.i18nFormat) != null && a.parse)
      t = this.i18nFormat.parse(
        t,
        { ...this.options.interpolation.defaultVariables, ...r },
        r.lng || this.language || o.usedLng,
        o.usedNS,
        o.usedKey,
        { resolved: o }
      );
    else if (!r.skipInterpolation) {
      r.interpolation &&
        this.interpolator.init({
          ...r,
          interpolation: { ...this.options.interpolation, ...r.interpolation },
        });
      const c =
        F(t) &&
        (((u = r == null ? void 0 : r.interpolation) == null
          ? void 0
          : u.skipOnVariables) !== void 0
          ? r.interpolation.skipOnVariables
          : this.options.interpolation.skipOnVariables);
      let f;
      if (c) {
        const y = t.match(this.interpolator.nestingRegexp);
        f = y && y.length;
      }
      let p = r.replace && !F(r.replace) ? r.replace : r;
      if (
        (this.options.interpolation.defaultVariables &&
          (p = { ...this.options.interpolation.defaultVariables, ...p }),
        (t = this.interpolator.interpolate(
          t,
          p,
          r.lng || this.language || o.usedLng,
          r
        )),
        c)
      ) {
        const y = t.match(this.interpolator.nestingRegexp),
          h = y && y.length;
        f < h && (r.nest = !1);
      }
      !r.lng && o && o.res && (r.lng = this.language || o.usedLng),
        r.nest !== !1 &&
          (t = this.interpolator.nest(
            t,
            (...y) =>
              (i == null ? void 0 : i[0]) === y[0] && !r.context
                ? (this.logger.warn(
                    `It seems you are nesting recursively key: ${y[0]} in key: ${n[0]}`
                  ),
                  null)
                : this.translate(...y, n),
            r
          )),
        r.interpolation && this.interpolator.reset();
    }
    const s = r.postProcess || this.options.postProcess,
      l = F(s) ? [s] : s;
    return (
      t != null &&
        l != null &&
        l.length &&
        r.applyPostProcessor !== !1 &&
        (t = Ch.handle(
          l,
          t,
          n,
          this.options && this.options.postProcessPassResolved
            ? {
                i18nResolved: {
                  ...o,
                  usedParams: this.getUsedParamsDetails(r),
                },
                ...r,
              }
            : r,
          this
        )),
      t
    );
  }
  resolve(t, n = {}) {
    let r, o, i, s, l;
    return (
      F(t) && (t = [t]),
      t.forEach(a => {
        if (this.isValidLookup(r)) return;
        const u = this.extractFromKey(a, n),
          c = u.key;
        o = c;
        let f = u.namespaces;
        this.options.fallbackNS && (f = f.concat(this.options.fallbackNS));
        const p = n.count !== void 0 && !F(n.count),
          y = p && !n.ordinal && n.count === 0,
          h =
            n.context !== void 0 &&
            (F(n.context) || typeof n.context == 'number') &&
            n.context !== '',
          v = n.lngs
            ? n.lngs
            : this.languageUtils.toResolveHierarchy(
                n.lng || this.language,
                n.fallbackLng
              );
        f.forEach(w => {
          var m, d;
          this.isValidLookup(r) ||
            ((l = w),
            !Gc[`${v[0]}-${w}`] &&
              (m = this.utils) != null &&
              m.hasLoadedNamespace &&
              !((d = this.utils) != null && d.hasLoadedNamespace(l)) &&
              ((Gc[`${v[0]}-${w}`] = !0),
              this.logger.warn(
                `key "${o}" for languages "${v.join(', ')}" won't get resolved as namespace "${l}" was not yet loaded`,
                'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!'
              )),
            v.forEach(g => {
              var C;
              if (this.isValidLookup(r)) return;
              s = g;
              const _ = [c];
              if ((C = this.i18nFormat) != null && C.addLookupKeys)
                this.i18nFormat.addLookupKeys(_, c, g, w, n);
              else {
                let R;
                p && (R = this.pluralResolver.getSuffix(g, n.count, n));
                const x = `${this.options.pluralSeparator}zero`,
                  L = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
                if (
                  (p &&
                    (n.ordinal &&
                      R.indexOf(L) === 0 &&
                      _.push(c + R.replace(L, this.options.pluralSeparator)),
                    _.push(c + R),
                    y && _.push(c + x)),
                  h)
                ) {
                  const T = `${c}${this.options.contextSeparator || '_'}${n.context}`;
                  _.push(T),
                    p &&
                      (n.ordinal &&
                        R.indexOf(L) === 0 &&
                        _.push(T + R.replace(L, this.options.pluralSeparator)),
                      _.push(T + R),
                      y && _.push(T + x));
                }
              }
              let k;
              for (; (k = _.pop()); )
                this.isValidLookup(r) ||
                  ((i = k), (r = this.getResource(g, w, k, n)));
            }));
        });
      }),
      { res: r, usedKey: o, exactUsedKey: i, usedLng: s, usedNS: l }
    );
  }
  isValidLookup(t) {
    return (
      t !== void 0 &&
      !(!this.options.returnNull && t === null) &&
      !(!this.options.returnEmptyString && t === '')
    );
  }
  getResource(t, n, r, o = {}) {
    var i;
    return (i = this.i18nFormat) != null && i.getResource
      ? this.i18nFormat.getResource(t, n, r, o)
      : this.resourceStore.getResource(t, n, r, o);
  }
  getUsedParamsDetails(t = {}) {
    const n = [
        'defaultValue',
        'ordinal',
        'context',
        'replace',
        'lng',
        'lngs',
        'fallbackLng',
        'ns',
        'keySeparator',
        'nsSeparator',
        'returnObjects',
        'returnDetails',
        'joinArrays',
        'postProcess',
        'interpolation',
      ],
      r = t.replace && !F(t.replace);
    let o = r ? t.replace : t;
    if (
      (r && typeof t.count < 'u' && (o.count = t.count),
      this.options.interpolation.defaultVariables &&
        (o = { ...this.options.interpolation.defaultVariables, ...o }),
      !r)
    ) {
      o = { ...o };
      for (const i of n) delete o[i];
    }
    return o;
  }
  static hasDefaultValue(t) {
    const n = 'defaultValue';
    for (const r in t)
      if (
        Object.prototype.hasOwnProperty.call(t, r) &&
        n === r.substring(0, n.length) &&
        t[r] !== void 0
      )
        return !0;
    return !1;
  }
}
class ef {
  constructor(t) {
    (this.options = t),
      (this.supportedLngs = this.options.supportedLngs || !1),
      (this.logger = it.create('languageUtils'));
  }
  getScriptPartFromCode(t) {
    if (((t = Hr(t)), !t || t.indexOf('-') < 0)) return null;
    const n = t.split('-');
    return n.length === 2 || (n.pop(), n[n.length - 1].toLowerCase() === 'x')
      ? null
      : this.formatLanguageCode(n.join('-'));
  }
  getLanguagePartFromCode(t) {
    if (((t = Hr(t)), !t || t.indexOf('-') < 0)) return t;
    const n = t.split('-');
    return this.formatLanguageCode(n[0]);
  }
  formatLanguageCode(t) {
    if (F(t) && t.indexOf('-') > -1) {
      let n;
      try {
        n = Intl.getCanonicalLocales(t)[0];
      } catch {}
      return (
        n && this.options.lowerCaseLng && (n = n.toLowerCase()),
        n || (this.options.lowerCaseLng ? t.toLowerCase() : t)
      );
    }
    return this.options.cleanCode || this.options.lowerCaseLng
      ? t.toLowerCase()
      : t;
  }
  isSupportedCode(t) {
    return (
      (this.options.load === 'languageOnly' ||
        this.options.nonExplicitSupportedLngs) &&
        (t = this.getLanguagePartFromCode(t)),
      !this.supportedLngs ||
        !this.supportedLngs.length ||
        this.supportedLngs.indexOf(t) > -1
    );
  }
  getBestMatchFromCodes(t) {
    if (!t) return null;
    let n;
    return (
      t.forEach(r => {
        if (n) return;
        const o = this.formatLanguageCode(r);
        (!this.options.supportedLngs || this.isSupportedCode(o)) && (n = o);
      }),
      !n &&
        this.options.supportedLngs &&
        t.forEach(r => {
          if (n) return;
          const o = this.getScriptPartFromCode(r);
          if (this.isSupportedCode(o)) return (n = o);
          const i = this.getLanguagePartFromCode(r);
          if (this.isSupportedCode(i)) return (n = i);
          n = this.options.supportedLngs.find(s => {
            if (s === i) return s;
            if (
              !(s.indexOf('-') < 0 && i.indexOf('-') < 0) &&
              ((s.indexOf('-') > 0 &&
                i.indexOf('-') < 0 &&
                s.substring(0, s.indexOf('-')) === i) ||
                (s.indexOf(i) === 0 && i.length > 1))
            )
              return s;
          });
        }),
      n || (n = this.getFallbackCodes(this.options.fallbackLng)[0]),
      n
    );
  }
  getFallbackCodes(t, n) {
    if (!t) return [];
    if (
      (typeof t == 'function' && (t = t(n)),
      F(t) && (t = [t]),
      Array.isArray(t))
    )
      return t;
    if (!n) return t.default || [];
    let r = t[n];
    return (
      r || (r = t[this.getScriptPartFromCode(n)]),
      r || (r = t[this.formatLanguageCode(n)]),
      r || (r = t[this.getLanguagePartFromCode(n)]),
      r || (r = t.default),
      r || []
    );
  }
  toResolveHierarchy(t, n) {
    const r = this.getFallbackCodes(
        (n === !1 ? [] : n) || this.options.fallbackLng || [],
        t
      ),
      o = [],
      i = s => {
        s &&
          (this.isSupportedCode(s)
            ? o.push(s)
            : this.logger.warn(
                `rejecting language code not found in supportedLngs: ${s}`
              ));
      };
    return (
      F(t) && (t.indexOf('-') > -1 || t.indexOf('_') > -1)
        ? (this.options.load !== 'languageOnly' &&
            i(this.formatLanguageCode(t)),
          this.options.load !== 'languageOnly' &&
            this.options.load !== 'currentOnly' &&
            i(this.getScriptPartFromCode(t)),
          this.options.load !== 'currentOnly' &&
            i(this.getLanguagePartFromCode(t)))
        : F(t) && i(this.formatLanguageCode(t)),
      r.forEach(s => {
        o.indexOf(s) < 0 && i(this.formatLanguageCode(s));
      }),
      o
    );
  }
}
const tf = { zero: 0, one: 1, two: 2, few: 3, many: 4, other: 5 },
  nf = {
    select: e => (e === 1 ? 'one' : 'other'),
    resolvedOptions: () => ({ pluralCategories: ['one', 'other'] }),
  };
class xw {
  constructor(t, n = {}) {
    (this.languageUtils = t),
      (this.options = n),
      (this.logger = it.create('pluralResolver')),
      (this.pluralRulesCache = {});
  }
  addRule(t, n) {
    this.rules[t] = n;
  }
  clearCache() {
    this.pluralRulesCache = {};
  }
  getRule(t, n = {}) {
    const r = Hr(t === 'dev' ? 'en' : t),
      o = n.ordinal ? 'ordinal' : 'cardinal',
      i = JSON.stringify({ cleanedCode: r, type: o });
    if (i in this.pluralRulesCache) return this.pluralRulesCache[i];
    let s;
    try {
      s = new Intl.PluralRules(r, { type: o });
    } catch {
      if (!Intl)
        return (
          this.logger.error('No Intl support, please use an Intl polyfill!'), nf
        );
      if (!t.match(/-|_/)) return nf;
      const a = this.languageUtils.getLanguagePartFromCode(t);
      s = this.getRule(a, n);
    }
    return (this.pluralRulesCache[i] = s), s;
  }
  needsPlural(t, n = {}) {
    let r = this.getRule(t, n);
    return (
      r || (r = this.getRule('dev', n)),
      (r == null ? void 0 : r.resolvedOptions().pluralCategories.length) > 1
    );
  }
  getPluralFormsOfKey(t, n, r = {}) {
    return this.getSuffixes(t, r).map(o => `${n}${o}`);
  }
  getSuffixes(t, n = {}) {
    let r = this.getRule(t, n);
    return (
      r || (r = this.getRule('dev', n)),
      r
        ? r
            .resolvedOptions()
            .pluralCategories.sort((o, i) => tf[o] - tf[i])
            .map(
              o =>
                `${this.options.prepend}${n.ordinal ? `ordinal${this.options.prepend}` : ''}${o}`
            )
        : []
    );
  }
  getSuffix(t, n, r = {}) {
    const o = this.getRule(t, r);
    return o
      ? `${this.options.prepend}${r.ordinal ? `ordinal${this.options.prepend}` : ''}${o.select(n)}`
      : (this.logger.warn(`no plural rule found for: ${t}`),
        this.getSuffix('dev', n, r));
  }
}
const rf = (e, t, n, r = '.', o = !0) => {
    let i = mw(e, t, n);
    return (
      !i && o && F(n) && ((i = Hl(e, n, r)), i === void 0 && (i = Hl(t, n, r))),
      i
    );
  },
  As = e => e.replace(/\$/g, '$$$$');
class Cw {
  constructor(t = {}) {
    var n;
    (this.logger = it.create('interpolator')),
      (this.options = t),
      (this.format =
        ((n = t == null ? void 0 : t.interpolation) == null
          ? void 0
          : n.format) || (r => r)),
      this.init(t);
  }
  init(t = {}) {
    t.interpolation || (t.interpolation = { escapeValue: !0 });
    const {
      escape: n,
      escapeValue: r,
      useRawValueToEscape: o,
      prefix: i,
      prefixEscaped: s,
      suffix: l,
      suffixEscaped: a,
      formatSeparator: u,
      unescapeSuffix: c,
      unescapePrefix: f,
      nestingPrefix: p,
      nestingPrefixEscaped: y,
      nestingSuffix: h,
      nestingSuffixEscaped: v,
      nestingOptionsSeparator: w,
      maxReplaces: m,
      alwaysFormat: d,
    } = t.interpolation;
    (this.escape = n !== void 0 ? n : yw),
      (this.escapeValue = r !== void 0 ? r : !0),
      (this.useRawValueToEscape = o !== void 0 ? o : !1),
      (this.prefix = i ? gn(i) : s || '{{'),
      (this.suffix = l ? gn(l) : a || '}}'),
      (this.formatSeparator = u || ','),
      (this.unescapePrefix = c ? '' : f || '-'),
      (this.unescapeSuffix = this.unescapePrefix ? '' : c || ''),
      (this.nestingPrefix = p ? gn(p) : y || gn('$t(')),
      (this.nestingSuffix = h ? gn(h) : v || gn(')')),
      (this.nestingOptionsSeparator = w || ','),
      (this.maxReplaces = m || 1e3),
      (this.alwaysFormat = d !== void 0 ? d : !1),
      this.resetRegExp();
  }
  reset() {
    this.options && this.init(this.options);
  }
  resetRegExp() {
    const t = (n, r) =>
      (n == null ? void 0 : n.source) === r
        ? ((n.lastIndex = 0), n)
        : new RegExp(r, 'g');
    (this.regexp = t(this.regexp, `${this.prefix}(.+?)${this.suffix}`)),
      (this.regexpUnescape = t(
        this.regexpUnescape,
        `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`
      )),
      (this.nestingRegexp = t(
        this.nestingRegexp,
        `${this.nestingPrefix}((?:[^()"']+|"[^"]*"|'[^']*'|\\((?:[^()]|"[^"]*"|'[^']*')*\\))*?)${this.nestingSuffix}`
      ));
  }
  interpolate(t, n, r, o) {
    var y;
    let i, s, l;
    const a =
        (this.options &&
          this.options.interpolation &&
          this.options.interpolation.defaultVariables) ||
        {},
      u = h => {
        if (h.indexOf(this.formatSeparator) < 0) {
          const d = rf(
            n,
            a,
            h,
            this.options.keySeparator,
            this.options.ignoreJSONStructure
          );
          return this.alwaysFormat
            ? this.format(d, void 0, r, { ...o, ...n, interpolationkey: h })
            : d;
        }
        const v = h.split(this.formatSeparator),
          w = v.shift().trim(),
          m = v.join(this.formatSeparator).trim();
        return this.format(
          rf(
            n,
            a,
            w,
            this.options.keySeparator,
            this.options.ignoreJSONStructure
          ),
          m,
          r,
          { ...o, ...n, interpolationkey: w }
        );
      };
    this.resetRegExp();
    const c =
        (o == null ? void 0 : o.missingInterpolationHandler) ||
        this.options.missingInterpolationHandler,
      f =
        ((y = o == null ? void 0 : o.interpolation) == null
          ? void 0
          : y.skipOnVariables) !== void 0
          ? o.interpolation.skipOnVariables
          : this.options.interpolation.skipOnVariables;
    return (
      [
        { regex: this.regexpUnescape, safeValue: h => As(h) },
        {
          regex: this.regexp,
          safeValue: h => (this.escapeValue ? As(this.escape(h)) : As(h)),
        },
      ].forEach(h => {
        for (l = 0; (i = h.regex.exec(t)); ) {
          const v = i[1].trim();
          if (((s = u(v)), s === void 0))
            if (typeof c == 'function') {
              const m = c(t, i, o);
              s = F(m) ? m : '';
            } else if (o && Object.prototype.hasOwnProperty.call(o, v)) s = '';
            else if (f) {
              s = i[0];
              continue;
            } else
              this.logger.warn(
                `missed to pass in variable ${v} for interpolating ${t}`
              ),
                (s = '');
          else !F(s) && !this.useRawValueToEscape && (s = Qc(s));
          const w = h.safeValue(s);
          if (
            ((t = t.replace(i[0], w)),
            f
              ? ((h.regex.lastIndex += s.length),
                (h.regex.lastIndex -= i[0].length))
              : (h.regex.lastIndex = 0),
            l++,
            l >= this.maxReplaces)
          )
            break;
        }
      }),
      t
    );
  }
  nest(t, n, r = {}) {
    let o, i, s;
    const l = (a, u) => {
      const c = this.nestingOptionsSeparator;
      if (a.indexOf(c) < 0) return a;
      const f = a.split(new RegExp(`${c}[ ]*{`));
      let p = `{${f[1]}`;
      (a = f[0]), (p = this.interpolate(p, s));
      const y = p.match(/'/g),
        h = p.match(/"/g);
      ((((y == null ? void 0 : y.length) ?? 0) % 2 === 0 && !h) ||
        h.length % 2 !== 0) &&
        (p = p.replace(/'/g, '"'));
      try {
        (s = JSON.parse(p)), u && (s = { ...u, ...s });
      } catch (v) {
        return (
          this.logger.warn(
            `failed parsing options string in nesting for key ${a}`,
            v
          ),
          `${a}${c}${p}`
        );
      }
      return (
        s.defaultValue &&
          s.defaultValue.indexOf(this.prefix) > -1 &&
          delete s.defaultValue,
        a
      );
    };
    for (; (o = this.nestingRegexp.exec(t)); ) {
      let a = [];
      (s = { ...r }),
        (s = s.replace && !F(s.replace) ? s.replace : s),
        (s.applyPostProcessor = !1),
        delete s.defaultValue;
      const u = /{.*}/.test(o[1])
        ? o[1].lastIndexOf('}') + 1
        : o[1].indexOf(this.formatSeparator);
      if (
        (u !== -1 &&
          ((a = o[1]
            .slice(u)
            .split(this.formatSeparator)
            .map(c => c.trim())
            .filter(Boolean)),
          (o[1] = o[1].slice(0, u))),
        (i = n(l.call(this, o[1].trim(), s), s)),
        i && o[0] === t && !F(i))
      )
        return i;
      F(i) || (i = Qc(i)),
        i ||
          (this.logger.warn(`missed to resolve ${o[1]} for nesting ${t}`),
          (i = '')),
        a.length &&
          (i = a.reduce(
            (c, f) =>
              this.format(c, f, r.lng, { ...r, interpolationkey: o[1].trim() }),
            i.trim()
          )),
        (t = t.replace(o[0], i)),
        (this.regexp.lastIndex = 0);
    }
    return t;
  }
}
const Rw = e => {
    let t = e.toLowerCase().trim();
    const n = {};
    if (e.indexOf('(') > -1) {
      const r = e.split('(');
      t = r[0].toLowerCase().trim();
      const o = r[1].substring(0, r[1].length - 1);
      t === 'currency' && o.indexOf(':') < 0
        ? n.currency || (n.currency = o.trim())
        : t === 'relativetime' && o.indexOf(':') < 0
          ? n.range || (n.range = o.trim())
          : o.split(';').forEach(s => {
              if (s) {
                const [l, ...a] = s.split(':'),
                  u = a
                    .join(':')
                    .trim()
                    .replace(/^'+|'+$/g, ''),
                  c = l.trim();
                n[c] || (n[c] = u),
                  u === 'false' && (n[c] = !1),
                  u === 'true' && (n[c] = !0),
                  isNaN(u) || (n[c] = parseInt(u, 10));
              }
            });
    }
    return { formatName: t, formatOptions: n };
  },
  of = e => {
    const t = {};
    return (n, r, o) => {
      let i = o;
      o &&
        o.interpolationkey &&
        o.formatParams &&
        o.formatParams[o.interpolationkey] &&
        o[o.interpolationkey] &&
        (i = { ...i, [o.interpolationkey]: void 0 });
      const s = r + JSON.stringify(i);
      let l = t[s];
      return l || ((l = e(Hr(r), o)), (t[s] = l)), l(n);
    };
  },
  Ow = e => (t, n, r) => e(Hr(n), r)(t);
class Pw {
  constructor(t = {}) {
    (this.logger = it.create('formatter')), (this.options = t), this.init(t);
  }
  init(t, n = { interpolation: {} }) {
    this.formatSeparator = n.interpolation.formatSeparator || ',';
    const r = n.cacheInBuiltFormats ? of : Ow;
    this.formats = {
      number: r((o, i) => {
        const s = new Intl.NumberFormat(o, { ...i });
        return l => s.format(l);
      }),
      currency: r((o, i) => {
        const s = new Intl.NumberFormat(o, { ...i, style: 'currency' });
        return l => s.format(l);
      }),
      datetime: r((o, i) => {
        const s = new Intl.DateTimeFormat(o, { ...i });
        return l => s.format(l);
      }),
      relativetime: r((o, i) => {
        const s = new Intl.RelativeTimeFormat(o, { ...i });
        return l => s.format(l, i.range || 'day');
      }),
      list: r((o, i) => {
        const s = new Intl.ListFormat(o, { ...i });
        return l => s.format(l);
      }),
    };
  }
  add(t, n) {
    this.formats[t.toLowerCase().trim()] = n;
  }
  addCached(t, n) {
    this.formats[t.toLowerCase().trim()] = of(n);
  }
  format(t, n, r, o = {}) {
    const i = n.split(this.formatSeparator);
    if (
      i.length > 1 &&
      i[0].indexOf('(') > 1 &&
      i[0].indexOf(')') < 0 &&
      i.find(l => l.indexOf(')') > -1)
    ) {
      const l = i.findIndex(a => a.indexOf(')') > -1);
      i[0] = [i[0], ...i.splice(1, l)].join(this.formatSeparator);
    }
    return i.reduce((l, a) => {
      var f;
      const { formatName: u, formatOptions: c } = Rw(a);
      if (this.formats[u]) {
        let p = l;
        try {
          const y =
              ((f = o == null ? void 0 : o.formatParams) == null
                ? void 0
                : f[o.interpolationkey]) || {},
            h = y.locale || y.lng || o.locale || o.lng || r;
          p = this.formats[u](l, h, { ...c, ...o, ...y });
        } catch (y) {
          this.logger.warn(y);
        }
        return p;
      } else this.logger.warn(`there was no format function for ${u}`);
      return l;
    }, t);
  }
}
const Nw = (e, t) => {
  e.pending[t] !== void 0 && (delete e.pending[t], e.pendingCount--);
};
class Tw extends Gi {
  constructor(t, n, r, o = {}) {
    var i, s;
    super(),
      (this.backend = t),
      (this.store = n),
      (this.services = r),
      (this.languageUtils = r.languageUtils),
      (this.options = o),
      (this.logger = it.create('backendConnector')),
      (this.waitingReads = []),
      (this.maxParallelReads = o.maxParallelReads || 10),
      (this.readingCalls = 0),
      (this.maxRetries = o.maxRetries >= 0 ? o.maxRetries : 5),
      (this.retryTimeout = o.retryTimeout >= 1 ? o.retryTimeout : 350),
      (this.state = {}),
      (this.queue = []),
      (s = (i = this.backend) == null ? void 0 : i.init) == null ||
        s.call(i, r, o.backend, o);
  }
  queueLoad(t, n, r, o) {
    const i = {},
      s = {},
      l = {},
      a = {};
    return (
      t.forEach(u => {
        let c = !0;
        n.forEach(f => {
          const p = `${u}|${f}`;
          !r.reload && this.store.hasResourceBundle(u, f)
            ? (this.state[p] = 2)
            : this.state[p] < 0 ||
              (this.state[p] === 1
                ? s[p] === void 0 && (s[p] = !0)
                : ((this.state[p] = 1),
                  (c = !1),
                  s[p] === void 0 && (s[p] = !0),
                  i[p] === void 0 && (i[p] = !0),
                  a[f] === void 0 && (a[f] = !0)));
        }),
          c || (l[u] = !0);
      }),
      (Object.keys(i).length || Object.keys(s).length) &&
        this.queue.push({
          pending: s,
          pendingCount: Object.keys(s).length,
          loaded: {},
          errors: [],
          callback: o,
        }),
      {
        toLoad: Object.keys(i),
        pending: Object.keys(s),
        toLoadLanguages: Object.keys(l),
        toLoadNamespaces: Object.keys(a),
      }
    );
  }
  loaded(t, n, r) {
    const o = t.split('|'),
      i = o[0],
      s = o[1];
    n && this.emit('failedLoading', i, s, n),
      !n &&
        r &&
        this.store.addResourceBundle(i, s, r, void 0, void 0, { skipCopy: !0 }),
      (this.state[t] = n ? -1 : 2),
      n && r && (this.state[t] = 0);
    const l = {};
    this.queue.forEach(a => {
      hw(a.loaded, [i], s),
        Nw(a, t),
        n && a.errors.push(n),
        a.pendingCount === 0 &&
          !a.done &&
          (Object.keys(a.loaded).forEach(u => {
            l[u] || (l[u] = {});
            const c = a.loaded[u];
            c.length &&
              c.forEach(f => {
                l[u][f] === void 0 && (l[u][f] = !0);
              });
          }),
          (a.done = !0),
          a.errors.length ? a.callback(a.errors) : a.callback());
    }),
      this.emit('loaded', l),
      (this.queue = this.queue.filter(a => !a.done));
  }
  read(t, n, r, o = 0, i = this.retryTimeout, s) {
    if (!t.length) return s(null, {});
    if (this.readingCalls >= this.maxParallelReads) {
      this.waitingReads.push({
        lng: t,
        ns: n,
        fcName: r,
        tried: o,
        wait: i,
        callback: s,
      });
      return;
    }
    this.readingCalls++;
    const l = (u, c) => {
        if ((this.readingCalls--, this.waitingReads.length > 0)) {
          const f = this.waitingReads.shift();
          this.read(f.lng, f.ns, f.fcName, f.tried, f.wait, f.callback);
        }
        if (u && c && o < this.maxRetries) {
          setTimeout(() => {
            this.read.call(this, t, n, r, o + 1, i * 2, s);
          }, i);
          return;
        }
        s(u, c);
      },
      a = this.backend[r].bind(this.backend);
    if (a.length === 2) {
      try {
        const u = a(t, n);
        u && typeof u.then == 'function'
          ? u.then(c => l(null, c)).catch(l)
          : l(null, u);
      } catch (u) {
        l(u);
      }
      return;
    }
    return a(t, n, l);
  }
  prepareLoading(t, n, r = {}, o) {
    if (!this.backend)
      return (
        this.logger.warn(
          'No backend was added via i18next.use. Will not load resources.'
        ),
        o && o()
      );
    F(t) && (t = this.languageUtils.toResolveHierarchy(t)), F(n) && (n = [n]);
    const i = this.queueLoad(t, n, r, o);
    if (!i.toLoad.length) return i.pending.length || o(), null;
    i.toLoad.forEach(s => {
      this.loadOne(s);
    });
  }
  load(t, n, r) {
    this.prepareLoading(t, n, {}, r);
  }
  reload(t, n, r) {
    this.prepareLoading(t, n, { reload: !0 }, r);
  }
  loadOne(t, n = '') {
    const r = t.split('|'),
      o = r[0],
      i = r[1];
    this.read(o, i, 'read', void 0, void 0, (s, l) => {
      s &&
        this.logger.warn(
          `${n}loading namespace ${i} for language ${o} failed`,
          s
        ),
        !s &&
          l &&
          this.logger.log(`${n}loaded namespace ${i} for language ${o}`, l),
        this.loaded(t, s, l);
    });
  }
  saveMissing(t, n, r, o, i, s = {}, l = () => {}) {
    var a, u, c, f, p;
    if (
      (u = (a = this.services) == null ? void 0 : a.utils) != null &&
      u.hasLoadedNamespace &&
      !(
        (f = (c = this.services) == null ? void 0 : c.utils) != null &&
        f.hasLoadedNamespace(n)
      )
    ) {
      this.logger.warn(
        `did not save key "${r}" as the namespace "${n}" was not yet loaded`,
        'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!'
      );
      return;
    }
    if (!(r == null || r === '')) {
      if ((p = this.backend) != null && p.create) {
        const y = { ...s, isUpdate: i },
          h = this.backend.create.bind(this.backend);
        if (h.length < 6)
          try {
            let v;
            h.length === 5 ? (v = h(t, n, r, o, y)) : (v = h(t, n, r, o)),
              v && typeof v.then == 'function'
                ? v.then(w => l(null, w)).catch(l)
                : l(null, v);
          } catch (v) {
            l(v);
          }
        else h(t, n, r, o, l, y);
      }
      !t || !t[0] || this.store.addResource(t[0], n, r, o);
    }
  }
}
const sf = () => ({
    debug: !1,
    initAsync: !0,
    ns: ['translation'],
    defaultNS: ['translation'],
    fallbackLng: ['dev'],
    fallbackNS: !1,
    supportedLngs: !1,
    nonExplicitSupportedLngs: !1,
    load: 'all',
    preload: !1,
    simplifyPluralSuffix: !0,
    keySeparator: '.',
    nsSeparator: ':',
    pluralSeparator: '_',
    contextSeparator: '_',
    partialBundledLanguages: !1,
    saveMissing: !1,
    updateMissing: !1,
    saveMissingTo: 'fallback',
    saveMissingPlurals: !0,
    missingKeyHandler: !1,
    missingInterpolationHandler: !1,
    postProcess: !1,
    postProcessPassResolved: !1,
    returnNull: !1,
    returnEmptyString: !0,
    returnObjects: !1,
    joinArrays: !1,
    returnedObjectHandler: !1,
    parseMissingKeyHandler: !1,
    appendNamespaceToMissingKey: !1,
    appendNamespaceToCIMode: !1,
    overloadTranslationOptionHandler: e => {
      let t = {};
      if (
        (typeof e[1] == 'object' && (t = e[1]),
        F(e[1]) && (t.defaultValue = e[1]),
        F(e[2]) && (t.tDescription = e[2]),
        typeof e[2] == 'object' || typeof e[3] == 'object')
      ) {
        const n = e[3] || e[2];
        Object.keys(n).forEach(r => {
          t[r] = n[r];
        });
      }
      return t;
    },
    interpolation: {
      escapeValue: !0,
      format: e => e,
      prefix: '{{',
      suffix: '}}',
      formatSeparator: ',',
      unescapePrefix: '-',
      nestingPrefix: '$t(',
      nestingSuffix: ')',
      nestingOptionsSeparator: ',',
      maxReplaces: 1e3,
      skipOnVariables: !0,
    },
    cacheInBuiltFormats: !0,
  }),
  lf = e => {
    var t, n;
    return (
      F(e.ns) && (e.ns = [e.ns]),
      F(e.fallbackLng) && (e.fallbackLng = [e.fallbackLng]),
      F(e.fallbackNS) && (e.fallbackNS = [e.fallbackNS]),
      ((n = (t = e.supportedLngs) == null ? void 0 : t.indexOf) == null
        ? void 0
        : n.call(t, 'cimode')) < 0 &&
        (e.supportedLngs = e.supportedLngs.concat(['cimode'])),
      typeof e.initImmediate == 'boolean' && (e.initAsync = e.initImmediate),
      e
    );
  },
  Co = () => {},
  Lw = e => {
    Object.getOwnPropertyNames(Object.getPrototypeOf(e)).forEach(n => {
      typeof e[n] == 'function' && (e[n] = e[n].bind(e));
    });
  };
class Wr extends Gi {
  constructor(t = {}, n) {
    if (
      (super(),
      (this.options = lf(t)),
      (this.services = {}),
      (this.logger = it),
      (this.modules = { external: [] }),
      Lw(this),
      n && !this.isInitialized && !t.isClone)
    ) {
      if (!this.options.initAsync) return this.init(t, n), this;
      setTimeout(() => {
        this.init(t, n);
      }, 0);
    }
  }
  init(t = {}, n) {
    (this.isInitializing = !0),
      typeof t == 'function' && ((n = t), (t = {})),
      t.defaultNS == null &&
        t.ns &&
        (F(t.ns)
          ? (t.defaultNS = t.ns)
          : t.ns.indexOf('translation') < 0 && (t.defaultNS = t.ns[0]));
    const r = sf();
    (this.options = { ...r, ...this.options, ...lf(t) }),
      (this.options.interpolation = {
        ...r.interpolation,
        ...this.options.interpolation,
      }),
      t.keySeparator !== void 0 &&
        (this.options.userDefinedKeySeparator = t.keySeparator),
      t.nsSeparator !== void 0 &&
        (this.options.userDefinedNsSeparator = t.nsSeparator);
    const o = u => (u ? (typeof u == 'function' ? new u() : u) : null);
    if (!this.options.isClone) {
      this.modules.logger
        ? it.init(o(this.modules.logger), this.options)
        : it.init(null, this.options);
      let u;
      this.modules.formatter ? (u = this.modules.formatter) : (u = Pw);
      const c = new ef(this.options);
      this.store = new Jc(this.options.resources, this.options);
      const f = this.services;
      (f.logger = it),
        (f.resourceStore = this.store),
        (f.languageUtils = c),
        (f.pluralResolver = new xw(c, {
          prepend: this.options.pluralSeparator,
          simplifyPluralSuffix: this.options.simplifyPluralSuffix,
        })),
        this.options.interpolation.format &&
          this.options.interpolation.format !== r.interpolation.format &&
          this.logger.deprecate(
            'init: you are still using the legacy format function, please use the new approach: https://www.i18next.com/translation-function/formatting'
          ),
        u &&
          (!this.options.interpolation.format ||
            this.options.interpolation.format === r.interpolation.format) &&
          ((f.formatter = o(u)),
          f.formatter.init && f.formatter.init(f, this.options),
          (this.options.interpolation.format = f.formatter.format.bind(
            f.formatter
          ))),
        (f.interpolator = new Cw(this.options)),
        (f.utils = { hasLoadedNamespace: this.hasLoadedNamespace.bind(this) }),
        (f.backendConnector = new Tw(
          o(this.modules.backend),
          f.resourceStore,
          f,
          this.options
        )),
        f.backendConnector.on('*', (y, ...h) => {
          this.emit(y, ...h);
        }),
        this.modules.languageDetector &&
          ((f.languageDetector = o(this.modules.languageDetector)),
          f.languageDetector.init &&
            f.languageDetector.init(f, this.options.detection, this.options)),
        this.modules.i18nFormat &&
          ((f.i18nFormat = o(this.modules.i18nFormat)),
          f.i18nFormat.init && f.i18nFormat.init(this)),
        (this.translator = new Ei(this.services, this.options)),
        this.translator.on('*', (y, ...h) => {
          this.emit(y, ...h);
        }),
        this.modules.external.forEach(y => {
          y.init && y.init(this);
        });
    }
    if (
      ((this.format = this.options.interpolation.format),
      n || (n = Co),
      this.options.fallbackLng &&
        !this.services.languageDetector &&
        !this.options.lng)
    ) {
      const u = this.services.languageUtils.getFallbackCodes(
        this.options.fallbackLng
      );
      u.length > 0 && u[0] !== 'dev' && (this.options.lng = u[0]);
    }
    !this.services.languageDetector &&
      !this.options.lng &&
      this.logger.warn(
        'init: no languageDetector is used and no lng is defined'
      ),
      [
        'getResource',
        'hasResourceBundle',
        'getResourceBundle',
        'getDataByLanguage',
      ].forEach(u => {
        this[u] = (...c) => this.store[u](...c);
      }),
      [
        'addResource',
        'addResources',
        'addResourceBundle',
        'removeResourceBundle',
      ].forEach(u => {
        this[u] = (...c) => (this.store[u](...c), this);
      });
    const l = sr(),
      a = () => {
        const u = (c, f) => {
          (this.isInitializing = !1),
            this.isInitialized &&
              !this.initializedStoreOnce &&
              this.logger.warn(
                'init: i18next is already initialized. You should call init just once!'
              ),
            (this.isInitialized = !0),
            this.options.isClone ||
              this.logger.log('initialized', this.options),
            this.emit('initialized', this.options),
            l.resolve(f),
            n(c, f);
        };
        if (this.languages && !this.isInitialized)
          return u(null, this.t.bind(this));
        this.changeLanguage(this.options.lng, u);
      };
    return (
      this.options.resources || !this.options.initAsync
        ? a()
        : setTimeout(a, 0),
      l
    );
  }
  loadResources(t, n = Co) {
    var i, s;
    let r = n;
    const o = F(t) ? t : this.language;
    if (
      (typeof t == 'function' && (r = t),
      !this.options.resources || this.options.partialBundledLanguages)
    ) {
      if (
        (o == null ? void 0 : o.toLowerCase()) === 'cimode' &&
        (!this.options.preload || this.options.preload.length === 0)
      )
        return r();
      const l = [],
        a = u => {
          if (!u || u === 'cimode') return;
          this.services.languageUtils.toResolveHierarchy(u).forEach(f => {
            f !== 'cimode' && l.indexOf(f) < 0 && l.push(f);
          });
        };
      o
        ? a(o)
        : this.services.languageUtils
            .getFallbackCodes(this.options.fallbackLng)
            .forEach(c => a(c)),
        (s = (i = this.options.preload) == null ? void 0 : i.forEach) == null ||
          s.call(i, u => a(u)),
        this.services.backendConnector.load(l, this.options.ns, u => {
          !u &&
            !this.resolvedLanguage &&
            this.language &&
            this.setResolvedLanguage(this.language),
            r(u);
        });
    } else r(null);
  }
  reloadResources(t, n, r) {
    const o = sr();
    return (
      typeof t == 'function' && ((r = t), (t = void 0)),
      typeof n == 'function' && ((r = n), (n = void 0)),
      t || (t = this.languages),
      n || (n = this.options.ns),
      r || (r = Co),
      this.services.backendConnector.reload(t, n, i => {
        o.resolve(), r(i);
      }),
      o
    );
  }
  use(t) {
    if (!t)
      throw new Error(
        'You are passing an undefined module! Please check the object you are passing to i18next.use()'
      );
    if (!t.type)
      throw new Error(
        'You are passing a wrong module! Please check the object you are passing to i18next.use()'
      );
    return (
      t.type === 'backend' && (this.modules.backend = t),
      (t.type === 'logger' || (t.log && t.warn && t.error)) &&
        (this.modules.logger = t),
      t.type === 'languageDetector' && (this.modules.languageDetector = t),
      t.type === 'i18nFormat' && (this.modules.i18nFormat = t),
      t.type === 'postProcessor' && Ch.addPostProcessor(t),
      t.type === 'formatter' && (this.modules.formatter = t),
      t.type === '3rdParty' && this.modules.external.push(t),
      this
    );
  }
  setResolvedLanguage(t) {
    if (!(!t || !this.languages) && !(['cimode', 'dev'].indexOf(t) > -1)) {
      for (let n = 0; n < this.languages.length; n++) {
        const r = this.languages[n];
        if (
          !(['cimode', 'dev'].indexOf(r) > -1) &&
          this.store.hasLanguageSomeTranslations(r)
        ) {
          this.resolvedLanguage = r;
          break;
        }
      }
      !this.resolvedLanguage &&
        this.languages.indexOf(t) < 0 &&
        this.store.hasLanguageSomeTranslations(t) &&
        ((this.resolvedLanguage = t), this.languages.unshift(t));
    }
  }
  changeLanguage(t, n) {
    this.isLanguageChangingTo = t;
    const r = sr();
    this.emit('languageChanging', t);
    const o = l => {
        (this.language = l),
          (this.languages = this.services.languageUtils.toResolveHierarchy(l)),
          (this.resolvedLanguage = void 0),
          this.setResolvedLanguage(l);
      },
      i = (l, a) => {
        a
          ? this.isLanguageChangingTo === t &&
            (o(a),
            this.translator.changeLanguage(a),
            (this.isLanguageChangingTo = void 0),
            this.emit('languageChanged', a),
            this.logger.log('languageChanged', a))
          : (this.isLanguageChangingTo = void 0),
          r.resolve((...u) => this.t(...u)),
          n && n(l, (...u) => this.t(...u));
      },
      s = l => {
        var c, f;
        !t && !l && this.services.languageDetector && (l = []);
        const a = F(l) ? l : l && l[0],
          u = this.store.hasLanguageSomeTranslations(a)
            ? a
            : this.services.languageUtils.getBestMatchFromCodes(F(l) ? [l] : l);
        u &&
          (this.language || o(u),
          this.translator.language || this.translator.changeLanguage(u),
          (f =
            (c = this.services.languageDetector) == null
              ? void 0
              : c.cacheUserLanguage) == null || f.call(c, u)),
          this.loadResources(u, p => {
            i(p, u);
          });
      };
    return (
      !t &&
      this.services.languageDetector &&
      !this.services.languageDetector.async
        ? s(this.services.languageDetector.detect())
        : !t &&
            this.services.languageDetector &&
            this.services.languageDetector.async
          ? this.services.languageDetector.detect.length === 0
            ? this.services.languageDetector.detect().then(s)
            : this.services.languageDetector.detect(s)
          : s(t),
      r
    );
  }
  getFixedT(t, n, r) {
    const o = (i, s, ...l) => {
      let a;
      typeof s != 'object'
        ? (a = this.options.overloadTranslationOptionHandler([i, s].concat(l)))
        : (a = { ...s }),
        (a.lng = a.lng || o.lng),
        (a.lngs = a.lngs || o.lngs),
        (a.ns = a.ns || o.ns),
        a.keyPrefix !== '' && (a.keyPrefix = a.keyPrefix || r || o.keyPrefix);
      const u = this.options.keySeparator || '.';
      let c;
      return (
        a.keyPrefix && Array.isArray(i)
          ? (c = i.map(
              f => (
                typeof f == 'function' &&
                  (f = Wl(f, { ...this.options, ...s })),
                `${a.keyPrefix}${u}${f}`
              )
            ))
          : (typeof i == 'function' && (i = Wl(i, { ...this.options, ...s })),
            (c = a.keyPrefix ? `${a.keyPrefix}${u}${i}` : i)),
        this.t(c, a)
      );
    };
    return F(t) ? (o.lng = t) : (o.lngs = t), (o.ns = n), (o.keyPrefix = r), o;
  }
  t(...t) {
    var n;
    return (n = this.translator) == null ? void 0 : n.translate(...t);
  }
  exists(...t) {
    var n;
    return (n = this.translator) == null ? void 0 : n.exists(...t);
  }
  setDefaultNamespace(t) {
    this.options.defaultNS = t;
  }
  hasLoadedNamespace(t, n = {}) {
    if (!this.isInitialized)
      return (
        this.logger.warn(
          'hasLoadedNamespace: i18next was not initialized',
          this.languages
        ),
        !1
      );
    if (!this.languages || !this.languages.length)
      return (
        this.logger.warn(
          'hasLoadedNamespace: i18n.languages were undefined or empty',
          this.languages
        ),
        !1
      );
    const r = n.lng || this.resolvedLanguage || this.languages[0],
      o = this.options ? this.options.fallbackLng : !1,
      i = this.languages[this.languages.length - 1];
    if (r.toLowerCase() === 'cimode') return !0;
    const s = (l, a) => {
      const u = this.services.backendConnector.state[`${l}|${a}`];
      return u === -1 || u === 0 || u === 2;
    };
    if (n.precheck) {
      const l = n.precheck(this, s);
      if (l !== void 0) return l;
    }
    return !!(
      this.hasResourceBundle(r, t) ||
      !this.services.backendConnector.backend ||
      (this.options.resources && !this.options.partialBundledLanguages) ||
      (s(r, t) && (!o || s(i, t)))
    );
  }
  loadNamespaces(t, n) {
    const r = sr();
    return this.options.ns
      ? (F(t) && (t = [t]),
        t.forEach(o => {
          this.options.ns.indexOf(o) < 0 && this.options.ns.push(o);
        }),
        this.loadResources(o => {
          r.resolve(), n && n(o);
        }),
        r)
      : (n && n(), Promise.resolve());
  }
  loadLanguages(t, n) {
    const r = sr();
    F(t) && (t = [t]);
    const o = this.options.preload || [],
      i = t.filter(
        s => o.indexOf(s) < 0 && this.services.languageUtils.isSupportedCode(s)
      );
    return i.length
      ? ((this.options.preload = o.concat(i)),
        this.loadResources(s => {
          r.resolve(), n && n(s);
        }),
        r)
      : (n && n(), Promise.resolve());
  }
  dir(t) {
    var o, i;
    if (
      (t ||
        (t =
          this.resolvedLanguage ||
          (((o = this.languages) == null ? void 0 : o.length) > 0
            ? this.languages[0]
            : this.language)),
      !t)
    )
      return 'rtl';
    try {
      const s = new Intl.Locale(t);
      if (s && s.getTextInfo) {
        const l = s.getTextInfo();
        if (l && l.direction) return l.direction;
      }
    } catch {}
    const n = [
        'ar',
        'shu',
        'sqr',
        'ssh',
        'xaa',
        'yhd',
        'yud',
        'aao',
        'abh',
        'abv',
        'acm',
        'acq',
        'acw',
        'acx',
        'acy',
        'adf',
        'ads',
        'aeb',
        'aec',
        'afb',
        'ajp',
        'apc',
        'apd',
        'arb',
        'arq',
        'ars',
        'ary',
        'arz',
        'auz',
        'avl',
        'ayh',
        'ayl',
        'ayn',
        'ayp',
        'bbz',
        'pga',
        'he',
        'iw',
        'ps',
        'pbt',
        'pbu',
        'pst',
        'prp',
        'prd',
        'ug',
        'ur',
        'ydd',
        'yds',
        'yih',
        'ji',
        'yi',
        'hbo',
        'men',
        'xmn',
        'fa',
        'jpr',
        'peo',
        'pes',
        'prs',
        'dv',
        'sam',
        'ckb',
      ],
      r =
        ((i = this.services) == null ? void 0 : i.languageUtils) ||
        new ef(sf());
    return t.toLowerCase().indexOf('-latn') > 1
      ? 'ltr'
      : n.indexOf(r.getLanguagePartFromCode(t)) > -1 ||
          t.toLowerCase().indexOf('-arab') > 1
        ? 'rtl'
        : 'ltr';
  }
  static createInstance(t = {}, n) {
    return new Wr(t, n);
  }
  cloneInstance(t = {}, n = Co) {
    const r = t.forkResourceStore;
    r && delete t.forkResourceStore;
    const o = { ...this.options, ...t, isClone: !0 },
      i = new Wr(o);
    if (
      ((t.debug !== void 0 || t.prefix !== void 0) &&
        (i.logger = i.logger.clone(t)),
      ['store', 'services', 'language'].forEach(l => {
        i[l] = this[l];
      }),
      (i.services = { ...this.services }),
      (i.services.utils = { hasLoadedNamespace: i.hasLoadedNamespace.bind(i) }),
      r)
    ) {
      const l = Object.keys(this.store.data).reduce(
        (a, u) => (
          (a[u] = { ...this.store.data[u] }),
          (a[u] = Object.keys(a[u]).reduce(
            (c, f) => ((c[f] = { ...a[u][f] }), c),
            a[u]
          )),
          a
        ),
        {}
      );
      (i.store = new Jc(l, o)), (i.services.resourceStore = i.store);
    }
    return (
      (i.translator = new Ei(i.services, o)),
      i.translator.on('*', (l, ...a) => {
        i.emit(l, ...a);
      }),
      i.init(o, n),
      (i.translator.options = o),
      (i.translator.backendConnector.services.utils = {
        hasLoadedNamespace: i.hasLoadedNamespace.bind(i),
      }),
      i
    );
  }
  toJSON() {
    return {
      options: this.options,
      store: this.store,
      language: this.language,
      languages: this.languages,
      resolvedLanguage: this.resolvedLanguage,
    };
  }
}
const re = Wr.createInstance();
re.createInstance = Wr.createInstance;
re.createInstance;
re.dir;
re.init;
re.loadResources;
re.reloadResources;
re.use;
re.changeLanguage;
re.getFixedT;
re.t;
re.exists;
re.setDefaultNamespace;
re.hasLoadedNamespace;
re.loadNamespaces;
re.loadLanguages;
const $w =
    /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g,
  Fw = {
    '&amp;': '&',
    '&#38;': '&',
    '&lt;': '<',
    '&#60;': '<',
    '&gt;': '>',
    '&#62;': '>',
    '&apos;': "'",
    '&#39;': "'",
    '&quot;': '"',
    '&#34;': '"',
    '&nbsp;': ' ',
    '&#160;': ' ',
    '&copy;': '©',
    '&#169;': '©',
    '&reg;': '®',
    '&#174;': '®',
    '&hellip;': '…',
    '&#8230;': '…',
    '&#x2F;': '/',
    '&#47;': '/',
  },
  bw = e => Fw[e],
  Dw = e => e.replace($w, bw);
let Ql = {
  bindI18n: 'languageChanged',
  bindI18nStore: '',
  transEmptyNodeValue: '',
  transSupportBasicHtmlNodes: !0,
  transWrapTextNodes: '',
  transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p'],
  useSuspense: !0,
  unescape: Dw,
};
const Aw = (e = {}) => {
    Ql = { ...Ql, ...e };
  },
  jR = () => Ql;
let Oh;
const Uw = e => {
    Oh = e;
  },
  IR = () => Oh,
  jw = {
    type: '3rdParty',
    init(e) {
      Aw(e.options.react), Uw(e);
    },
  },
  { slice: Iw, forEach: zw } = [];
function Mw(e) {
  return (
    zw.call(Iw.call(arguments, 1), t => {
      if (t) for (const n in t) e[n] === void 0 && (e[n] = t[n]);
    }),
    e
  );
}
function Bw(e) {
  return typeof e != 'string'
    ? !1
    : [
        /<\s*script.*?>/i,
        /<\s*\/\s*script\s*>/i,
        /<\s*img.*?on\w+\s*=/i,
        /<\s*\w+\s*on\w+\s*=.*?>/i,
        /javascript\s*:/i,
        /vbscript\s*:/i,
        /expression\s*\(/i,
        /eval\s*\(/i,
        /alert\s*\(/i,
        /document\.cookie/i,
        /document\.write\s*\(/i,
        /window\.location/i,
        /innerHTML/i,
      ].some(n => n.test(e));
}
const af = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/,
  Vw = function (e, t) {
    const r =
        arguments.length > 2 && arguments[2] !== void 0
          ? arguments[2]
          : { path: '/' },
      o = encodeURIComponent(t);
    let i = `${e}=${o}`;
    if (r.maxAge > 0) {
      const s = r.maxAge - 0;
      if (Number.isNaN(s)) throw new Error('maxAge should be a Number');
      i += `; Max-Age=${Math.floor(s)}`;
    }
    if (r.domain) {
      if (!af.test(r.domain)) throw new TypeError('option domain is invalid');
      i += `; Domain=${r.domain}`;
    }
    if (r.path) {
      if (!af.test(r.path)) throw new TypeError('option path is invalid');
      i += `; Path=${r.path}`;
    }
    if (r.expires) {
      if (typeof r.expires.toUTCString != 'function')
        throw new TypeError('option expires is invalid');
      i += `; Expires=${r.expires.toUTCString()}`;
    }
    if (
      (r.httpOnly && (i += '; HttpOnly'),
      r.secure && (i += '; Secure'),
      r.sameSite)
    )
      switch (
        typeof r.sameSite == 'string' ? r.sameSite.toLowerCase() : r.sameSite
      ) {
        case !0:
          i += '; SameSite=Strict';
          break;
        case 'lax':
          i += '; SameSite=Lax';
          break;
        case 'strict':
          i += '; SameSite=Strict';
          break;
        case 'none':
          i += '; SameSite=None';
          break;
        default:
          throw new TypeError('option sameSite is invalid');
      }
    return r.partitioned && (i += '; Partitioned'), i;
  },
  uf = {
    create(e, t, n, r) {
      let o =
        arguments.length > 4 && arguments[4] !== void 0
          ? arguments[4]
          : { path: '/', sameSite: 'strict' };
      n &&
        ((o.expires = new Date()),
        o.expires.setTime(o.expires.getTime() + n * 60 * 1e3)),
        r && (o.domain = r),
        (document.cookie = Vw(e, t, o));
    },
    read(e) {
      const t = `${e}=`,
        n = document.cookie.split(';');
      for (let r = 0; r < n.length; r++) {
        let o = n[r];
        for (; o.charAt(0) === ' '; ) o = o.substring(1, o.length);
        if (o.indexOf(t) === 0) return o.substring(t.length, o.length);
      }
      return null;
    },
    remove(e, t) {
      this.create(e, '', -1, t);
    },
  };
var Kw = {
    name: 'cookie',
    lookup(e) {
      let { lookupCookie: t } = e;
      if (t && typeof document < 'u') return uf.read(t) || void 0;
    },
    cacheUserLanguage(e, t) {
      let {
        lookupCookie: n,
        cookieMinutes: r,
        cookieDomain: o,
        cookieOptions: i,
      } = t;
      n && typeof document < 'u' && uf.create(n, e, r, o, i);
    },
  },
  Hw = {
    name: 'querystring',
    lookup(e) {
      var r;
      let { lookupQuerystring: t } = e,
        n;
      if (typeof window < 'u') {
        let { search: o } = window.location;
        !window.location.search &&
          ((r = window.location.hash) == null ? void 0 : r.indexOf('?')) > -1 &&
          (o = window.location.hash.substring(
            window.location.hash.indexOf('?')
          ));
        const s = o.substring(1).split('&');
        for (let l = 0; l < s.length; l++) {
          const a = s[l].indexOf('=');
          a > 0 && s[l].substring(0, a) === t && (n = s[l].substring(a + 1));
        }
      }
      return n;
    },
  },
  Ww = {
    name: 'hash',
    lookup(e) {
      var o;
      let { lookupHash: t, lookupFromHashIndex: n } = e,
        r;
      if (typeof window < 'u') {
        const { hash: i } = window.location;
        if (i && i.length > 2) {
          const s = i.substring(1);
          if (t) {
            const l = s.split('&');
            for (let a = 0; a < l.length; a++) {
              const u = l[a].indexOf('=');
              u > 0 &&
                l[a].substring(0, u) === t &&
                (r = l[a].substring(u + 1));
            }
          }
          if (r) return r;
          if (!r && n > -1) {
            const l = i.match(/\/([a-zA-Z-]*)/g);
            return Array.isArray(l)
              ? (o = l[typeof n == 'number' ? n : 0]) == null
                ? void 0
                : o.replace('/', '')
              : void 0;
          }
        }
      }
      return r;
    },
  };
let yn = null;
const cf = () => {
  if (yn !== null) return yn;
  try {
    if (((yn = typeof window < 'u' && window.localStorage !== null), !yn))
      return !1;
    const e = 'i18next.translate.boo';
    window.localStorage.setItem(e, 'foo'), window.localStorage.removeItem(e);
  } catch {
    yn = !1;
  }
  return yn;
};
var Qw = {
  name: 'localStorage',
  lookup(e) {
    let { lookupLocalStorage: t } = e;
    if (t && cf()) return window.localStorage.getItem(t) || void 0;
  },
  cacheUserLanguage(e, t) {
    let { lookupLocalStorage: n } = t;
    n && cf() && window.localStorage.setItem(n, e);
  },
};
let vn = null;
const ff = () => {
  if (vn !== null) return vn;
  try {
    if (((vn = typeof window < 'u' && window.sessionStorage !== null), !vn))
      return !1;
    const e = 'i18next.translate.boo';
    window.sessionStorage.setItem(e, 'foo'),
      window.sessionStorage.removeItem(e);
  } catch {
    vn = !1;
  }
  return vn;
};
var qw = {
    name: 'sessionStorage',
    lookup(e) {
      let { lookupSessionStorage: t } = e;
      if (t && ff()) return window.sessionStorage.getItem(t) || void 0;
    },
    cacheUserLanguage(e, t) {
      let { lookupSessionStorage: n } = t;
      n && ff() && window.sessionStorage.setItem(n, e);
    },
  },
  Xw = {
    name: 'navigator',
    lookup(e) {
      const t = [];
      if (typeof navigator < 'u') {
        const { languages: n, userLanguage: r, language: o } = navigator;
        if (n) for (let i = 0; i < n.length; i++) t.push(n[i]);
        r && t.push(r), o && t.push(o);
      }
      return t.length > 0 ? t : void 0;
    },
  },
  Yw = {
    name: 'htmlTag',
    lookup(e) {
      let { htmlTag: t } = e,
        n;
      const r = t || (typeof document < 'u' ? document.documentElement : null);
      return (
        r &&
          typeof r.getAttribute == 'function' &&
          (n = r.getAttribute('lang')),
        n
      );
    },
  },
  Jw = {
    name: 'path',
    lookup(e) {
      var o;
      let { lookupFromPathIndex: t } = e;
      if (typeof window > 'u') return;
      const n = window.location.pathname.match(/\/([a-zA-Z-]*)/g);
      return Array.isArray(n)
        ? (o = n[typeof t == 'number' ? t : 0]) == null
          ? void 0
          : o.replace('/', '')
        : void 0;
    },
  },
  Gw = {
    name: 'subdomain',
    lookup(e) {
      var o, i;
      let { lookupFromSubdomainIndex: t } = e;
      const n = typeof t == 'number' ? t + 1 : 1,
        r =
          typeof window < 'u' &&
          ((i = (o = window.location) == null ? void 0 : o.hostname) == null
            ? void 0
            : i.match(
                /^(\w{2,5})\.(([a-z0-9-]{1,63}\.[a-z]{2,6})|localhost)/i
              ));
      if (r) return r[n];
    },
  };
let Ph = !1;
try {
  document.cookie, (Ph = !0);
} catch {}
const Nh = [
  'querystring',
  'cookie',
  'localStorage',
  'sessionStorage',
  'navigator',
  'htmlTag',
];
Ph || Nh.splice(1, 1);
const Zw = () => ({
  order: Nh,
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  lookupSessionStorage: 'i18nextLng',
  caches: ['localStorage'],
  excludeCacheFor: ['cimode'],
  convertDetectedLanguage: e => e,
});
class Th {
  constructor(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    (this.type = 'languageDetector'), (this.detectors = {}), this.init(t, n);
  }
  init() {
    let t =
        arguments.length > 0 && arguments[0] !== void 0
          ? arguments[0]
          : { languageUtils: {} },
      n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    (this.services = t),
      (this.options = Mw(n, this.options || {}, Zw())),
      typeof this.options.convertDetectedLanguage == 'string' &&
        this.options.convertDetectedLanguage.indexOf('15897') > -1 &&
        (this.options.convertDetectedLanguage = o => o.replace('-', '_')),
      this.options.lookupFromUrlIndex &&
        (this.options.lookupFromPathIndex = this.options.lookupFromUrlIndex),
      (this.i18nOptions = r),
      this.addDetector(Kw),
      this.addDetector(Hw),
      this.addDetector(Qw),
      this.addDetector(qw),
      this.addDetector(Xw),
      this.addDetector(Yw),
      this.addDetector(Jw),
      this.addDetector(Gw),
      this.addDetector(Ww);
  }
  addDetector(t) {
    return (this.detectors[t.name] = t), this;
  }
  detect() {
    let t =
        arguments.length > 0 && arguments[0] !== void 0
          ? arguments[0]
          : this.options.order,
      n = [];
    return (
      t.forEach(r => {
        if (this.detectors[r]) {
          let o = this.detectors[r].lookup(this.options);
          o && typeof o == 'string' && (o = [o]), o && (n = n.concat(o));
        }
      }),
      (n = n
        .filter(r => r != null && !Bw(r))
        .map(r => this.options.convertDetectedLanguage(r))),
      this.services &&
      this.services.languageUtils &&
      this.services.languageUtils.getBestMatchFromCodes
        ? n
        : n.length > 0
          ? n[0]
          : null
    );
  }
  cacheUserLanguage(t) {
    let n =
      arguments.length > 1 && arguments[1] !== void 0
        ? arguments[1]
        : this.options.caches;
    n &&
      ((this.options.excludeCacheFor &&
        this.options.excludeCacheFor.indexOf(t) > -1) ||
        n.forEach(r => {
          this.detectors[r] &&
            this.detectors[r].cacheUserLanguage(t, this.options);
        }));
  }
}
Th.type = 'languageDetector';
const e_ = 'View Now',
  t_ = 'Show more',
  n_ = 'Load more',
  r_ = 'Up',
  o_ = 'Send',
  i_ = 'Sending...',
  s_ = 'Submit',
  l_ = 'Visit us',
  a_ = 'Submiting...',
  u_ = {
    view_button: e_,
    show_button: t_,
    load_button: n_,
    up_button: r_,
    send_button: o_,
    sending_button: i_,
    submit_button: s_,
    buttons: l_,
    submiting_button: a_,
  },
  c_ = 'Our history',
  f_ =
    'Coffee Comfort started with one small dream about the perfect cup of coffee. And today our coffee is not just a drink. It is your mood, a conversation, silence or the beginning of something new.',
  d_ = 'Selected beans',
  p_ = 'We use direct supplies from plantations in Ethiopia and Brazil.',
  h_ = 'Hand Roasted',
  m_ = 'We control every degree to reveal the taste.',
  g_ = 'The magic of cooking',
  y_ =
    'We prepare coffee with care so that each cup is exactly the one you need right now.',
  v_ = 'Beas',
  w_ = 'Roasting',
  __ = 'Magic',
  S_ = {
    title: c_,
    history: f_,
    select: d_,
    beans: p_,
    roast: h_,
    roasting: m_,
    cook: g_,
    cooking: y_,
    circle_big: v_,
    circle_small: w_,
    circle_medium: __,
  },
  k_ = 'No campers available.',
  E_ = { noCampersMessage: k_ },
  x_ = 'Campers of your dreams',
  C_ = 'You can find everything you want in our catalog',
  R_ = { hero_title: x_, hero_content: C_ },
  O_ = 'Location',
  P_ = 'Filters',
  N_ = 'Filter out',
  T_ = 'Clear Filters',
  L_ = 'No campers available matching your criteria.',
  $_ = {
    location_title: O_,
    filters_title: P_,
    filter_out_button: N_,
    clear_filters_button: T_,
    no_campers_message: L_,
  },
  F_ = 'Book a table now',
  b_ = 'Choose an atmosphere zone',
  D_ = { window: 'View-zone', lounge: 'Lounge-zone', work: 'Work-zone' },
  A_ = 'Name',
  U_ = 'Your name',
  j_ = 'Email',
  I_ = 'example@gmail.com',
  z_ = 'Phone',
  M_ = '+380XXXXXXXXX',
  B_ = 'Reservation Date',
  V_ = 'Start date, time',
  K_ = 'Comment',
  H_ = 'Your wishes',
  W_ = 'Success!',
  Q_ = 'Your table is booked. We will call you back soon.',
  q_ = 'Send',
  X_ = {
    required: 'Please fill in the field.',
    name_length: 'The name must be between 2 and 20 characters.',
    invalid_email: 'Incorrect email format.',
    email_too_long: 'Email is too long.',
    invalid_phone: 'Incorrect phone number format.',
    invalid_end_date:
      'End date and time must be after the start date and time.',
    comment_too_long: 'The comment must be up to 150 characters long.',
  },
  Y_ = {
    title: F_,
    choose_atmosphere: b_,
    zones: D_,
    name_label: A_,
    name_placeholder: U_,
    email_label: j_,
    email_placeholder: I_,
    phone_label: z_,
    phone_placeholder: M_,
    date_label: B_,
    booking_start_date_placeholder: V_,
    comment_label: K_,
    comment_placeholder: H_,
    success_title: W_,
    success_message: Q_,
    send: q_,
    errors: X_,
  },
  J_ = 'Submit your review now',
  G_ = '  Stay connected! We are always ready to help you.',
  Z_ = 'Name',
  eS = 'Email',
  tS = 'Comment',
  nS = 'Your message',
  rS = {
    required: 'Please fill in the field.',
    name_length: 'The name must be between 2 and 20 characters.',
    invalid_email: 'Incorrect email format.',
    email_too_long: 'Email is too long.',
    rating: 'Please rate',
    comment_too_long: 'The comment must be up to 150 characters long.',
  },
  oS = {
    title: J_,
    text: G_,
    name_label: Z_,
    email_label: eS,
    comment_label: tS,
    comment_placeholder: nS,
    errors: rS,
  },
  iS = 'Menu',
  sS = 'About us',
  lS = 'Gallery',
  aS = 'Contacts',
  uS = 'Book a table',
  cS = {
    nav_menu: iS,
    nav_about: sS,
    nav_gallery: lS,
    nav_cotacts: aS,
    cta_booking: uS,
  },
  fS = 'Our coffee creates your mood',
  dS = 'Freshly roasted coffee and signature desserts daily',
  pS = 'View menu',
  hS = 'Visit us',
  mS = { title: fS, subtitle: dS, menu_buttons: pS, contacts_buttons: hS },
  gS = 'Our menu',
  yS = 'Every sip is a ritual that unites people',
  vS = { all: 'All', drinks: 'Drinks', bakery: 'Baking' },
  wS = {
    americano: {
      name: 'Americano',
      desc: 'Classic black coffee based on espresso.',
      price: '45 UAN',
    },
    flat_white: {
      name: 'Flat White',
      desc: 'A rich taste of double espresso with velvety milk.',
      price: '75 UAN',
    },
    cappuccino: {
      name: 'Cappuccino',
      desc: 'A classic espresso-based coffee drink with the addition of steamed milk.',
      price: '70 UAN',
    },
    croissant: {
      name: 'Croissant',
      desc: 'Classic French pastries with a crispy crust.',
      price: '55 UAN',
    },
    cheesecake: {
      name: 'Cheesecake',
      desc: 'An exquisite dessert with a crispy biscuit base and a delicate cream cheese filling.',
      price: '75 UAN',
    },
    pancakes: {
      name: 'Pancakes',
      desc: 'Golden shortcrust pastry, fried in a hot pan.',
      price: '65 UAN',
    },
  },
  _S = { top: 'TOP' },
  SS = { menu_title: gS, menu_subtitle: yS, categories: vS, items: wS, ui: _S },
  kS = 'Gallery of our comfort',
  ES = 'Every detail is created for your inspiration',
  xS = 'Close',
  CS = {
    interior1: 'Cozy corner',
    coffee: 'Fresh cappuccino',
    interior2: 'Seat by the window',
    pastry: 'Freshly baked croissant',
    barista: 'Barista at work',
    details: 'Coffee shop details',
  },
  RS = { title: kS, subtitle: ES, close_label: xS, images: CS },
  OS = 'What Customers Say',
  PS = 'Loading',
  NS = 'Show more',
  TS = 'Collapse',
  LS = 'Want to see more reviews?',
  $S = 'Read all reviews on Google',
  FS = {
    title: OS,
    loading: PS,
    show_more: NS,
    show_less: TS,
    google_cta: LS,
    read_on_google: $S,
  },
  bS = 'Your opinion',
  DS = 'Your name (2-20 characters)',
  AS = 'Your comment (max. 150 characters)...',
  US = 'Send',
  jS = {
    required: 'Please fill in the field.',
    name_length: 'The name must be between 2 and 20 characters.',
    comment_too_long: 'The comment must be up to 150 characters long.',
    rating_required: 'Please provide a star rating.',
  },
  IS = {
    title: bS,
    name_placeholder: DS,
    comment_placeholder: AS,
    send: US,
    errors: jS,
  },
  zS = 'Visit Us',
  MS = '12 Kavova St., Kyiv',
  BS = 'Mon-Sun: 08:00 -21:00',
  VS = { title: zS, address: MS, hours: BS },
  KS = 'Our address',
  HS = '12 Coffee St, Kyiv',
  WS = 'Mon-Sun: 08:00 - 21:00',
  QS = 'Feedback',
  qS = 'Request a call',
  XS = 'We are on social media',
  YS = 'Leave a review',
  JS = 'Your opinion',
  GS = 'Coffee House.',
  ZS = 'All rights reserved.',
  ek = {
    title_address: KS,
    address: HS,
    hours: WS,
    title_callback: QS,
    request_call: qS,
    title_socials: XS,
    leave_review: YS,
    title_review: JS,
    copy: GS,
    rights: ZS,
  },
  tk = 'About us',
  nk =
    'We are TravelTrucks — a company specializing in modern camper rentals for comfortable travel across Ukraine.',
  rk = 'TravelTrucks was founded in 2024.',
  ok = 'Our fleet includes 24 campers ranging from Economy to Premium class.',
  ik = 'We operate in Kyiv, Odesa, Kharkiv, Sumy, Poltava, Dnipro, and Lviv.',
  sk = 'The TravelTrucks team consists of young, energetic individuals.',
  lk =
    'Booking the camper you want is easy — just give us a call or leave a request on our website!',
  ak = {
    title: tk,
    paragraph_1: nk,
    paragraph_2: rk,
    paragraph_3: ok,
    paragraph_4: ik,
    paragraph_5: sk,
    paragraph_6: lk,
  },
  uk = 'Our services',
  ck =
    'Our services include camper rental, technical support on the road, route advice, and additional equipment.',
  fk = 'You can rent a car with or without a driver.',
  dk = 'A car delivery service to a specified location is possible.',
  pk = 'The entire fleet is insured with CASCO and OSAGO.',
  hk =
    'Technical support is available 24/7. You can always call if you have any problems with your car or service.',
  mk = 'If the car breaks down, we will replace it instantly.',
  gk = {
    title: uk,
    paragraph_1: ck,
    paragraph_2: fk,
    paragraph_3: dk,
    paragraph_4: pk,
    paragraph_5: hk,
    paragraph_6: mk,
  },
  yk = 'Prices',
  vk = 'Prices depend on the model and length of rental.',
  wk = 'Discounts for rentals of a week or more.',
  _k = 'Payments in national currency.',
  Sk =
    'Advance payment. The deposit is paid separately from the payment, before the start of the rental.',
  kk =
    'In case of early return, a payment of 30% for the remaining days will be withheld, the difference will be refunded.',
  Ek = {
    title: yk,
    paragraph_1: vk,
    paragraph_2: wk,
    paragraph_3: _k,
    paragraph_4: Sk,
    paragraph_5: kk,
  },
  xk = 'Contacts',
  Ck = 'City',
  Rk = 'infotraveltrucks@gmail.com',
  Ok = [
    { city: 'Kyiv', street: 'Kyivska St., 1', phone: '067-123-45-67' },
    { city: 'Odesa', street: 'Odeska St., 2', phone: '067-123-45-68' },
    { city: 'Poltava', street: 'Poltavska St., 3', phone: '067-123-45-69' },
    { city: 'Kharkiv', street: 'Kharkivska St., 4', phone: '067-123-45-70' },
    { city: 'Dnipro', street: 'Dniprovska St., 5', phone: '067-123-45-71' },
    { city: 'Sumy', street: 'Sumska St., 6', phone: '067-123-45-72' },
    { city: 'Lviv', street: 'Lvivska St., 7', phone: '067-123-45-73' },
  ],
  Pk = {
    title: xk,
    'info.address': 'Please find our addresses and contact details below.',
    'info.working_hours': 'Our customer support operates 24/7.',
    city_label: Ck,
    main_email: Rk,
    addresses: Ok,
  },
  Nk = 'All locations',
  Tk = {
    'Ukraine, Kyiv': 'Ukraine, Kyiv',
    'Ukraine, Poltava': 'Ukraine, Poltava',
    'Ukraine, Dnipro': 'Ukraine, Dnipro',
    'Ukraine, Odesa': 'Ukraine, Odesa',
    'Ukraine, Kharkiv': 'Ukraine, Kharkiv',
    'Ukraine, Sumy': 'Ukraine, Sumy',
    'Ukraine, Lviv': 'Ukraine, Lviv',
  },
  Lk = { all_locations: Nk, locations: Tk },
  $k = 'Rating',
  Fk = { rating: $k },
  bk = '€',
  Dk = '({{count}} reviews)',
  Ak = '({{count}} reviews)',
  Uk = '({{count}} reviews)',
  jk = '({{count}} reviews)',
  Ik = '0 (0 reviews)',
  zk = {
    currency_symbol: bk,
    reviews_count_one: Dk,
    reviews_count_few: Ak,
    reviews_count_many: Uk,
    reviews_count_other: jk,
    no_reviews: Ik,
  },
  Mk = 'Adults',
  Bk = 'Automatic',
  Vk = 'Gas',
  Kk = 'Beds',
  Hk = 'AC',
  Wk = 'Bathroom',
  Qk = 'Kitchen',
  qk = 'TV',
  Xk = 'Radio',
  Yk = 'Refrigerator',
  Jk = 'Microwave',
  Gk = 'Gas',
  Zk = 'Water',
  eE = {
    label_adults: Mk,
    label_transmission: Bk,
    label_engine: Vk,
    label_beds: Kk,
    label_ac: Hk,
    label_bathroom: Wk,
    label_kitchen: Qk,
    label_tv: qk,
    label_radio: Xk,
    label_refrigerator: Yk,
    label_microwave: Jk,
    label_gas: Gk,
    label_water: Zk,
  },
  tE = 'An error occurred:',
  nE = 'Retry download',
  rE = 'Camper not found',
  oE = 'Error loading camper',
  iE = 'Camper ID not specified',
  sE = 'Error adding review and updating data',
  lE = 'Error sending feedback',
  aE = 'Error',
  uE = {
    error_message: tE,
    retry_button: nE,
    error_camperNotFound: rE,
    error_loadingCamper: oE,
    error_idNotSpecified: iE,
    error_addingReview: sE,
    error_sendingFeedback: lE,
    error_generic: aE,
  },
  cE = 'Camper not found.',
  fE = { camperNotFound: cE },
  dE = 'No reviews yet.',
  pE = { message_noReviewsYet: dE },
  hE = 'Close',
  mE = { button_close: hE },
  gE = 'Переглянути',
  yE = 'Показати більше',
  vE = 'Завантажити ще',
  wE = 'Вгору',
  _E = 'Надіслати',
  SE = 'Надсилання...',
  kE = 'Відправити',
  EE = 'Завітати до нас',
  xE = 'Відправлення...',
  CE = {
    view_button: gE,
    show_button: yE,
    load_button: vE,
    up_button: wE,
    send_button: _E,
    sending_button: SE,
    submit_button: kE,
    buttons: EE,
    submiting_button: xE,
  },
  RE = 'Наша історія',
  OE =
    'Coffee Comfort почався з однієї маленької мрії про ідеальну чашку кави. А сьогодні наша кава — це не просто напій. Це ваш настрій, розмова, тиша або початок чогось нового.',
  PE = 'Відбірні зерна',
  NE = 'Ми використовуємо прямі поставки з плантацій Ефіопії та Бразилії.',
  TE = 'Ручне обсмаження',
  LE = 'Ми контролюємо кожен градус, щоб розкрити смак.',
  $E = 'Магія приготування',
  FE =
    'Ми готуємо каву з турботою, щоб кожна чашка була саме такою, яка вам потрібна саме зараз.',
  bE = 'Зерна',
  DE = 'Обсмаження',
  AE = 'магія',
  UE = {
    title: RE,
    history: OE,
    select: PE,
    beans: NE,
    roast: TE,
    roasting: LE,
    cook: $E,
    cooking: FE,
    circle_big: bE,
    circle_small: DE,
    circle_medium: AE,
  },
  jE = 'Немає вільних кемперів.',
  IE = { noCampersMessage: jE },
  zE = 'Кемпери вашої мрії',
  ME = 'Ви можете знайти все, що хочете, у нашому каталозі',
  BE = { hero_title: zE, hero_content: ME },
  VE = 'Локація',
  KE = 'Фільтри',
  HE = 'Відфільтрувати',
  WE = 'Очистити фільтри',
  QE = 'Немає кемперів, що відповідають вашим критеріям.',
  qE = {
    location_title: VE,
    filters_title: KE,
    filter_out_button: HE,
    clear_filters_button: WE,
    no_campers_message: QE,
  },
  XE = 'Забронюйте столик зараз',
  YE = ' Виберіть атмосферну зону',
  JE = {
    window: 'Панорамна зона',
    lounge: 'Зона релаксу',
    work: 'Робоча зона',
  },
  GE = "Ім'я",
  ZE = "Ваше ім'я",
  ex = 'Email',
  tx = 'example@gmail.com',
  nx = 'Телефон',
  rx = '+380XXXXXXXXX',
  ox = 'Дата  бронювання',
  ix = 'Оберіть дату та час',
  sx = 'Коментар',
  lx = 'Ваші побажання...',
  ax = 'Успіх!',
  ux = 'Ваш столик заброньовано. Ми вам скоро передзвонимо.',
  cx = 'Надіслати',
  fx = {
    required: 'Будь ласка, заповніть поле.',
    name_length: 'Ім’я має бути від 2 до 20 символів.',
    invalid_email: 'Невірний формат електронної пошти.',
    email_too_long: 'Електронна пошта занадто довга.',
    invalid_phone: 'Невірний формат номера телефону.',
    invalid_end_date: 'Дата закінчення має бути пізніше дати початку.',
    comment_too_long: 'Коментар має бути не більше 150 символів.',
  },
  dx = {
    title: XE,
    choose_atmosphere: YE,
    zones: JE,
    name_label: GE,
    name_placeholder: ZE,
    email_label: ex,
    email_placeholder: tx,
    phone_label: nx,
    phone_placeholder: rx,
    date_label: ox,
    booking_start_date_placeholder: ix,
    comment_label: sx,
    comment_placeholder: lx,
    success_title: ax,
    success_message: ux,
    send: cx,
    errors: fx,
  },
  px = 'Надішліть свій відгук зараз',
  hx = "Залишайтеся на зв'язку! Ми завжди готові вам допомогти.",
  mx = "Ім'я",
  gx = 'Електронна пошта',
  yx = 'Коментар',
  vx = 'Ваше повідомлення',
  wx = {
    required: 'Будь ласка, заповніть поле.',
    name_length: "Ім'я має містити від 2 до 20 символів.",
    invalid_email: 'Неправильний формат електронної пошти.',
    email_too_long: 'Електронна пошта занадто довга.',
    rating: 'Будь ласка, оцініть',
    comment_too_long: 'Коментар має містити до 150 символів.',
  },
  _x = {
    title: px,
    text: hx,
    name_label: mx,
    email_label: gx,
    comment_label: yx,
    comment_placeholder: vx,
    errors: wx,
  },
  Sx = 'Меню',
  kx = 'Про нас',
  Ex = 'Галерея',
  xx = 'Контакти',
  Cx = 'Забронювати стіл',
  Rx = {
    nav_menu: Sx,
    nav_about: kx,
    nav_gallery: Ex,
    nav_contacts: xx,
    cta_booking: Cx,
  },
  Ox = 'Наша кава створює ваш настрій',
  Px = 'Свіжообсмажена кава та авторські десерти щодня',
  Nx = 'Переглянути меню',
  Tx = 'Завітати до нас',
  Lx = { title: Ox, subtitle: Px, menu_buttons: Nx, contacts_buttons: Tx },
  $x = 'Наше меню',
  Fx = "Кожен ковток це ритуал, який об'єднує людей",
  bx = { all: 'Все', drinks: 'Напої', bakery: 'Випічка' },
  Dx = {
    americano: {
      name: 'Американо',
      desc: 'Класична чорна кава на онові еспресо.',
      price: '45 грн',
    },
    flat_white: {
      name: 'Флет Вайт',
      desc: 'Насичений смак подвійного еспресо з оксамитовим молоком.',
      price: '75 грн',
    },
    cappuccino: {
      name: 'Капучино',
      desc: 'Класичний кавовий напій на основі еспресо з додаванням збитого парою молока.',
      price: '70 грн',
    },
    croissant: {
      name: 'Круасан',
      desc: 'Класична французька випічка з хрусткою скоринкою.',
      price: '55 грн',
    },
    cheesecake: {
      name: 'Чізкейк',
      desc: 'Вишуканий десерт із хрусткою основою з печива та  начинкою з вершкового сиру.',
      price: '75 грн',
    },
    pancakes: {
      name: 'Млинці',
      desc: 'Золотисті коржики з рідкого тіста, смажені на гарячій пательні.',
      price: '65 грн',
    },
  },
  Ax = { top: 'ТОП' },
  Ux = { menu_title: $x, menu_subtitle: Fx, categories: bx, items: Dx, ui: Ax },
  jx = 'Галерея нашого затишку',
  Ix = 'Кожна деталь створена для вашого натхнення',
  zx = 'Закрити',
  Mx = {
    interior1: 'Затишний куточок',
    coffee: 'Свіже капучино',
    interior2: 'Місце біля вікна',
    pastry: 'Свіжоспечений круасан',
    barista: 'Бариста за роботою',
    details: "Деталі кав'ярні",
  },
  Bx = { title: jx, subtitle: Ix, close_label: zx, images: Mx },
  Vx = 'Що кажуть клієнти',
  Kx = 'Завантаження',
  Hx = 'Показати ще',
  Wx = 'Згорнути',
  Qx = 'Хочете побачити більше відгуків?',
  qx = 'Читати всі відгуки в Google',
  Xx = {
    title: Vx,
    loading: Kx,
    show_more: Hx,
    show_less: Wx,
    google_cta: Qx,
    read_on_google: qx,
  },
  Yx = 'Ваша думка',
  Jx = "Ваше ім'я (2-20 симв.)",
  Gx = 'Ваш відгук (макс. 150 симв.)...',
  Zx = 'Надіслати',
  eC = {
    required: 'Будь ласка, заповніть поле.',
    name_length: 'Ім’я має бути від 2 до 20 символів.',
    comment_too_long: 'Коментар має бути не більше 150 символів.',
    rating_required: 'Будь ласка, поставте оцінку зірочками.',
  },
  tC = {
    title: Yx,
    name_placeholder: Jx,
    comment_placeholder: Gx,
    send: Zx,
    errors: eC,
  },
  nC = 'Відвідайте нас',
  rC = 'вул.Кавова,12, Київ',
  oC = 'Пн-Нд: 08:00 -21:00',
  iC = { title: nC, address: rC, hours: oC },
  sC = 'Наша адреса',
  lC = 'вул. Кавова, 12, Київ',
  aC = 'Пн-Нд: 08:00 - 21:00',
  uC = "Зворотній зв'язок",
  cC = 'Замовити  дзвінок',
  fC = 'Ми в соцмережах',
  dC = 'Залишити  відгук',
  pC = 'Ваша  думка',
  hC = "Кав'ярня.",
  mC = 'Усі права захищені.',
  gC = {
    title_address: sC,
    address: lC,
    hours: aC,
    title_callback: uC,
    request_call: cC,
    title_socials: fC,
    leave_review: dC,
    title_review: pC,
    copy: hC,
    rights: mC,
  },
  yC = 'Про нас',
  vC =
    'Ми — TravelTrucks — компанія, що спеціалізується на оренді сучасних кемперів для комфортних подорожей по Україні.',
  wC = 'Компанія TravelTrucks була заснована у 2024 році.',
  _C = 'Наш автопарк налічує 24 кемпери класу від економ до преміум.',
  SC = 'Ми працюємо в Києві, Одесі, Харкові, Сумах, Полтаві, Дніпрі та Львові.',
  kC = 'Команда TravelTrucks складається з молодих, енергійних людей.',
  EC =
    'Забронювати потрібний вам кемпер легко — просто зателефонуйте нам або залиште заявку на нашому сайті!',
  xC = {
    title: yC,
    paragraph_1: vC,
    paragraph_2: wC,
    paragraph_3: _C,
    paragraph_4: SC,
    paragraph_5: kC,
    paragraph_6: EC,
  },
  CC = 'Наші послуги',
  RC =
    'Наші послуги включають оренду кемперів, технічну підтримку в дорозі, консультації щодо маршруту та додаткове обладнання.',
  OC = 'Ви можете орендувати автомобіль з водієм або без нього.',
  PC = 'Можлива доставка автомобіля до вказаного місця.',
  NC = 'Весь автопарк застрахований за системами КАСКО та ОСАГО.',
  TC =
    'Технічна підтримка доступна цілодобово. Ви завжди можете зателефонувати, якщо у вас виникнуть проблеми з вашим автомобілем або сервісом.',
  LC = 'Якщо машина зламається, ми негайно її замінимо.',
  $C = {
    title: CC,
    paragraph_1: RC,
    paragraph_2: OC,
    paragraph_3: PC,
    paragraph_4: NC,
    paragraph_5: TC,
    paragraph_6: LC,
  },
  FC = 'Ціни',
  bC = 'Ціни залежать від моделі та терміну оренди.',
  DC = 'Знижки при оренді на тиждень і більше.',
  AC = 'Платежі в національній валюті.',
  UC =
    'Авансовий платіж. Застава сплачується окремо від оплати, до початку оренди.',
  jC =
    'У разі дострокового повернення буде утримано платіж у розмірі 30% за решту днів, різницю буде повернуто.',
  IC = {
    title: FC,
    paragraph_1: bC,
    paragraph_2: DC,
    paragraph_3: AC,
    paragraph_4: UC,
    paragraph_5: jC,
  },
  zC = 'Контакти',
  MC = 'Місто',
  BC = 'infotraveltrucks@gmail.com',
  VC = [
    { city: 'Київ', street: 'вул. Київська, 1', phone: '067-123-45-67' },
    { city: 'Одеса', street: 'вул. Одеська, 2', phone: '067-123-45-68' },
    { city: 'Полтава', street: 'вул. Полтавська, 3', phone: '067-123-45-69' },
    { city: 'Харків', street: 'вул. Харківська, 4', phone: '067-123-45-70' },
    { city: 'Дніпро', street: 'вул. Дніпровська, 5', phone: '067-123-45-71' },
    { city: 'Суми', street: 'вул. Сумська, 6', phone: '067-123-45-72' },
    { city: 'Львів', street: 'вул. Львівська, 7', phone: '067-123-45-73' },
  ],
  KC = {
    title: zC,
    'info.address': 'Нижче ви знайдете наші адреси та контактні дані.',
    'info.working_hours': 'Наша служба підтримки працює цілодобово.',
    city_label: MC,
    main_email: BC,
    addresses: VC,
  },
  HC = 'Всі локації',
  WC = {
    'Ukraine, Kyiv': 'Україна, Київ',
    'Ukraine, Poltava': 'Україна, Полтава',
    'Ukraine, Dnipro': 'Україна, Дніпро',
    'Ukraine, Odesa': 'Україна, Одеса',
    'Ukraine, Kharkiv': 'Україна, Харків',
    'Ukraine, Sumy': 'Україна, Суми',
    'Ukraine, Lviv': 'Україна, Львів',
  },
  QC = { all_locations: HC, locations: WC },
  qC = 'Рейтинг',
  XC = { rating: qC },
  YC = '₴',
  JC = '({{count}} відгук)',
  GC = '({{count}} відгуки)',
  ZC = '({{count}} відгуків)',
  eR = '({{count}} відгуку)',
  tR = '0 (0 відгуків)',
  nR = {
    currency_symbol: YC,
    reviews_count_one: JC,
    reviews_count_few: GC,
    reviews_count_many: ZC,
    reviews_count_other: eR,
    no_reviews: tR,
  },
  rR = 'Місця',
  oR = 'Автомат',
  iR = 'Газ',
  sR = 'Ліжка',
  lR = 'Клімат',
  aR = 'Ванна',
  uR = 'Кухня',
  cR = 'ТБ',
  fR = 'Радіо',
  dR = 'Холод',
  pR = 'Мікрохвильовка',
  hR = 'Газ',
  mR = 'Вода',
  gR = {
    label_adults: rR,
    label_transmission: oR,
    label_engine: iR,
    label_beds: sR,
    label_ac: lR,
    label_bathroom: aR,
    label_kitchen: uR,
    label_tv: cR,
    label_radio: fR,
    label_refrigerator: dR,
    label_microwave: pR,
    label_gas: hR,
    label_water: mR,
  },
  yR = 'Сталася помилка:',
  vR = 'Повторити завантаження',
  wR = 'Кемпер не знайдено',
  _R = 'Помилка завантаження кемпера',
  SR = 'ID кемпера не вказано',
  kR = 'Помилка додавання відгуку та оновлення даних',
  ER = 'Помилка надсилання відгуку',
  xR = 'Помилка',
  CR = {
    error_message: yR,
    retry_button: vR,
    error_camperNotFound: wR,
    error_loadingCamper: _R,
    error_idNotSpecified: SR,
    error_addingReview: kR,
    error_sendingFeedback: ER,
    error_generic: xR,
  },
  RR = 'Кемпер не знайдено.',
  OR = { camperNotFound: RR },
  PR = 'Поки що немає відгуків.',
  NR = { message_noReviewsYet: PR },
  TR = 'Закрити',
  LR = { button_close: TR },
  $R = { m: 'm', l: 'l', km: 'km', l_per_100km: 'l/100km' },
  FR = { m: 'м', l: 'л', km: 'км', l_per_100km: 'л/100км' },
  df = {
    en: {
      button: u_,
      about_us: S_,
      card_list: E_,
      home: R_,
      catalog: $_,
      form_booking: Y_,
      form_reviews: oS,
      header: cS,
      hero: mS,
      menu: SS,
      gallery: RS,
      reviews: FS,
      review_modal: IS,
      contacts: VS,
      footer: ek,
      about_modal: ak,
      services_modal: gk,
      prices_modal: Ek,
      contacts_modal: Pk,
      filter_location: Lk,
      star_rating: Fk,
      card: zk,
      feature_icon: eE,
      units: $R,
      error_component: uE,
      content_details: fE,
      content_reviews: pE,
      full_screen_image_modal: mE,
    },
    uk: {
      button: CE,
      about_us: UE,
      card_list: IE,
      home: BE,
      catalog: qE,
      form_booking: dx,
      form_reviews: _x,
      header: Rx,
      hero: Lx,
      menu: Ux,
      gallery: Bx,
      reviews: Xx,
      review_modal: tC,
      contacts: iC,
      footer: gC,
      about_modal: xC,
      services_modal: $C,
      prices_modal: IC,
      contacts_modal: KC,
      filter_location: QC,
      star_rating: XC,
      card: nR,
      feature_icon: gR,
      units: FR,
      error_component: CR,
      content_details: OR,
      content_reviews: NR,
      full_screen_image_modal: LR,
    },
  };
re.use(Th)
  .use(jw)
  .init({
    resources: df,
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'cookie', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: !1 },
    ns: Object.keys(df.en),
    defaultNS: 'home',
  });
document.documentElement.lang = re.language;
re.on('languageChanged', e => {
  document.documentElement.lang = e;
});
const bR = Rp(document.getElementById('root'));
bR.render(
  Se.jsx(Zl.StrictMode, {
    children: Se.jsx(ky, {
      store: q0,
      children: Se.jsx(P.Suspense, {
        fallback: Se.jsx('div', { children: 'Loading...' }),
        children: Se.jsx(fw, {}),
      }),
    }),
  })
);
export {
  UR as L,
  Ds as P,
  Us as R,
  IR as a,
  G as b,
  Cp as c,
  Zl as d,
  AR as e,
  jR as g,
  Se as j,
  P as r,
  C1 as u,
};
