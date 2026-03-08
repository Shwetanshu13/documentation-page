import Link from "next/link";
import CodeBlock from "../../components/CodeBlock";

export const metadata = {
  title: "C++ STL & DSA Cheatsheet | My Documentation",
  description:
    "Frequently used C++ STL syntax and competitive programming data structures (DSU, segment tree, Fenwick, PBDS)",
};

export default function CppCheatsheetPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link
            href="/"
            className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="doc-container">
        <h1 className="doc-title">🧠 C++ STL Syntax (CP / LeetCode) + Advanced DS</h1>

        <p className="doc-text">
          A practical cheatsheet for the most frequently used STL patterns and common advanced data structures.
          Copy/paste-friendly, optimized for competitive programming.
        </p>

        <div className="doc-divider" />

        <div className="part-header">🧩 Basics / Template</div>

        <section className="doc-section">
          <h2 className="doc-step">Fast IO + Common Includes</h2>
          <CodeBlock
            language="cpp"
            code={`#include <bits/stdc++.h>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  // code
  return 0;
}`}
          />
          <div className="info-box">
            <p className="text-blue-800 dark:text-blue-200">
              💡 For LeetCode, you usually don&apos;t need <code className="code-inline">main()</code>. For CP, you do.
            </p>
          </div>
        </section>

        <section className="doc-section">
          <h2 className="doc-step">Handy Type Aliases</h2>
          <CodeBlock
            language="cpp"
            code={`using ll = long long;
using pii = pair<int,int>;
using pll = pair<long long,long long>;

// vectors
using vi = vector<int>;
using vll = vector<long long>;
        using vpii = vector<pair<int,int>>;`}
          />
        </section>

        <div className="doc-divider" />

        <div className="part-header">📦 Core STL Containers</div>

        <section className="doc-section">
          <h2 className="doc-step">vector (insert / erase / traverse)</h2>
          <CodeBlock
            language="cpp"
            code={`vector<int> a;

// push / pop
a.push_back(10);
a.pop_back();

// size / empty
int n = (int)a.size();
bool e = a.empty();

// access
int first = a[0];
int last = a.back();

// traversal
for (int x : a) {
  // use x
}
for (int i = 0; i < (int)a.size(); i++) {
  // a[i]
}

// insert at position
// inserts before iterator
a.insert(a.begin() + 2, 99);

// erase at position
a.erase(a.begin() + 2);

// erase range [l, r)
a.erase(a.begin() + 2, a.begin() + 5);

// remove all occurrences of value (erase-remove idiom)
a.erase(remove(a.begin(), a.end(), 5), a.end());

// unique (after sort) to deduplicate
sort(a.begin(), a.end());
a.erase(unique(a.begin(), a.end()), a.end());`}
          />
          <div className="warning-box">
            <p className="text-amber-800 dark:text-amber-200">
              ⚠️ <code className="code-inline">erase</code> invalidates iterators after the erased position.
            </p>
          </div>
        </section>

        <section className="doc-section">
          <h2 className="doc-step">string (common ops)</h2>
          <CodeBlock
            language="cpp"
            code={`string s = "hello";

s.push_back('!');
s.pop_back();

// substring
string t = s.substr(1, 3); // from index 1 length 3

// find
size_t pos = s.find("ell");
if (pos != string::npos) {
  // found
}

// concat
s += " world";

// char to int digit
int d = s[0] - '0';

// to lower
for (char &c : s) c = (char)tolower(c);

// split by space (simple)
stringstream ss(s);
vector<string> parts;
for (string w; ss >> w; ) parts.push_back(w);`}
          />
        </section>

        <section className="doc-section">
          <h2 className="doc-step">pair / tuple</h2>
          <CodeBlock
            language="cpp"
            code={`pair<int,int> p = {3, 7};
int x = p.first;
int y = p.second;

auto [a, b] = p; // structured bindings

tuple<int,int,int> tp = {1, 2, 3};
int i = get<0>(tp);

// sorting vector of pairs by default: first then second
vector<pair<int,int>> vp = {{2,5},{1,9},{2,1}};
sort(vp.begin(), vp.end());`}
          />
        </section>

        <div className="doc-divider" />

        <div className="part-header">🔍 Algorithms You Use Daily</div>

        <section className="doc-section">
          <h2 className="doc-step">sort / custom comparator</h2>
          <CodeBlock
            language="cpp"
            code={`vector<int> a = {5, 1, 7};
sort(a.begin(), a.end());
sort(a.rbegin(), a.rend()); // descending

vector<pair<int,int>> v = {{1,5},{1,2},{2,3}};

// custom: sort by second ascending, then first descending
sort(v.begin(), v.end(), [](const auto& A, const auto& B) {
  if (A.second != B.second) return A.second < B.second;
  return A.first > B.first;
});`}
          />
        </section>

        <section className="doc-section">
          <h2 className="doc-step">binary search helpers (lower_bound / upper_bound)</h2>
          <CodeBlock
            language="cpp"
            code={`vector<int> a = {1, 2, 2, 5, 9};

// first index with value >= x
int x = 2;
auto it1 = lower_bound(a.begin(), a.end(), x);
int idx1 = (int)(it1 - a.begin());

// first index with value > x
auto it2 = upper_bound(a.begin(), a.end(), x);
int idx2 = (int)(it2 - a.begin());

// count occurrences of x
int cnt = (int)(upper_bound(a.begin(), a.end(), x) - lower_bound(a.begin(), a.end(), x));

// existence check
bool exists = binary_search(a.begin(), a.end(), x);`}
          />
        </section>

        <div className="doc-divider" />

        <div className="part-header">🧱 set / map (ordered, tree-based)</div>

        <section className="doc-section">
          <h2 className="doc-step">set (insert / erase / find / bounds)</h2>
          <CodeBlock
            language="cpp"
            code={`set<int> st;

st.insert(10);
st.insert(5);

// find
auto it = st.find(10);
if (it != st.end()) {
  // found
}

// erase by value (safe)
st.erase(10);

// erase by iterator
if (!st.empty()) st.erase(st.begin());

// traversal (ascending)
for (int x : st) {
  // x
}

// lower_bound: first >= x
auto lb = st.lower_bound(7);

// upper_bound: first > x
auto ub = st.upper_bound(7);

// predecessor / successor pattern
if (lb != st.begin()) {
  auto prevIt = prev(lb);
}
if (lb != st.end()) {
  auto nextIt = lb;
}`}
          />
        </section>

        <section className="doc-section">
          <h2 className="doc-step">multiset (duplicates)</h2>
          <CodeBlock
            language="cpp"
            code={`multiset<int> ms;
ms.insert(5);
ms.insert(5);

// erase ONE occurrence
auto it = ms.find(5);
if (it != ms.end()) ms.erase(it);

// erase ALL occurrences
ms.erase(5);

// get min / max
int mn = *ms.begin();
int mx = *ms.rbegin();`}
          />
        </section>

        <section className="doc-section">
          <h2 className="doc-step">map / unordered_map (counts, frequency)</h2>
          <CodeBlock
            language="cpp"
            code={`map<string,int> mp;           // ordered (log n)
unordered_map<string,int> um;  // average O(1)

mp["a"]++;
mp["b"] += 10;

// existence without inserting (important)
if (mp.find("x") != mp.end()) {
  // exists
}

// traversal
for (auto &[k, v] : mp) {
  // k, v
}

// erase
mp.erase("a");

// max frequency pattern
int best = 0;
for (auto &[k, v] : mp) best = max(best, v);

// performance tips for unordered_map
unordered_map<int,int> cnt;
cnt.reserve(1 << 20);
cnt.max_load_factor(0.7);`}
          />
          <div className="warning-box">
            <p className="text-amber-800 dark:text-amber-200">
              ⚠️ On some judges, <code className="code-inline">unordered_map</code> can be hacked.
              If you see TLE, switch to <code className="code-inline">map</code> or add a custom hash.
            </p>
          </div>
        </section>

        <div className="doc-divider" />

        <div className="part-header">🧺 priority_queue (max-heap / min-heap / pairs)</div>

        <section className="doc-section">
          <h2 className="doc-step">Basic heaps</h2>
          <CodeBlock
            language="cpp"
            code={`// max-heap (default)
priority_queue<int> pq;
pq.push(5);
pq.push(1);
int top = pq.top(); // 5
pq.pop();

// min-heap
priority_queue<int, vector<int>, greater<int>> minpq;
minpq.push(5);
minpq.push(1);
int mn = minpq.top(); // 1`}
          />
        </section>

        <section className="doc-section">
          <h2 className="doc-step">priority_queue of pairs</h2>
          <CodeBlock
            language="cpp"
            code={`// max-heap by first, then second (default pair ordering)
priority_queue<pair<int,int>> pqp;
pqp.push({3, 10});
pqp.push({5, 1});

// min-heap by first, then second
priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> minpqp;
minpqp.push({3, 10});
minpqp.push({5, 1});

// common pattern: store (dist, node) for Dijkstra
using P = pair<long long,int>;
priority_queue<P, vector<P>, greater<P>> pq;
// pq.push({dist, node});`}
          />
        </section>

        <section className="doc-section">
          <h2 className="doc-step">Custom comparator (struct)</h2>
          <CodeBlock
            language="cpp"
            code={`struct Node {
  int a, b;
};

struct Cmp {
  bool operator()(const Node& x, const Node& y) const {
    // return true if x has LOWER priority than y
    // example: smallest a first
    if (x.a != y.a) return x.a > y.a; // min-heap by a
    return x.b > y.b;
  }
};

priority_queue<Node, vector<Node>, Cmp> pq;`}
          />
        </section>

        <div className="doc-divider" />

        <div className="part-header">🌲 Trees & Graph Helpers</div>

        <section className="doc-section">
          <h2 className="doc-step">Adjacency list (graph)</h2>
          <CodeBlock
            language="cpp"
            code={`int n, m;
vector<vector<int>> g(n);

// add edge u->v (0-indexed)
g[u].push_back(v);

// undirected
g[u].push_back(v);
g[v].push_back(u);

// weighted graph
vector<vector<pair<int,int>>> wg(n);
// wg[u].push_back({v, w});`}
          />
        </section>

        <section className="doc-section">
          <h2 className="doc-step">DFS / BFS (quick patterns)</h2>
          <CodeBlock
            language="cpp"
            code={`// BFS
vector<int> dist(n, -1);
queue<int> q;
dist[src] = 0;
q.push(src);
while (!q.empty()) {
  int u = q.front(); q.pop();
  for (int v : g[u]) {
    if (dist[v] != -1) continue;
    dist[v] = dist[u] + 1;
    q.push(v);
  }
}

// DFS (recursive)
vector<int> vis(n, 0);
function<void(int)> dfs = [&](int u) {
  vis[u] = 1;
  for (int v : g[u]) if (!vis[v]) dfs(v);
};
// dfs(src);`}
          />
        </section>

        <div className="doc-divider" />

        <div className="part-header">⚙️ Advanced Data Structures</div>

        <section className="doc-section">
          <h2 className="doc-step">Disjoint Set Union (DSU / Union-Find)</h2>
          <CodeBlock
            language="cpp"
            code={`struct DSU {
  vector<int> p, sz;
  DSU(int n=0) { init(n); }
  void init(int n) {
    p.resize(n);
    sz.assign(n, 1);
    iota(p.begin(), p.end(), 0);
  }
  int find(int x) {
    if (p[x] == x) return x;
    return p[x] = find(p[x]);
  }
  bool unite(int a, int b) {
    a = find(a); b = find(b);
    if (a == b) return false;
    if (sz[a] < sz[b]) swap(a, b);
    p[b] = a;
    sz[a] += sz[b];
    return true;
  }
  bool same(int a, int b) { return find(a) == find(b); }
  };`}
          />
          <p className="doc-text">
            Typical use: Kruskal MST, connected components, dynamic connectivity.
          </p>
        </section>

        <section className="doc-section">
          <h2 className="doc-step">Fenwick Tree (BIT) — prefix sums</h2>
          <CodeBlock
            language="cpp"
            code={`struct Fenwick {
  int n;
  vector<long long> bit;
  Fenwick(int n=0) { init(n); }
  void init(int n_) {
    n = n_;
    bit.assign(n + 1, 0);
  }
  void add(int idx, long long val) { // 0-indexed external
    for (int i = idx + 1; i <= n; i += i & -i) bit[i] += val;
  }
  long long sumPrefix(int idx) { // sum [0..idx]
    long long res = 0;
    for (int i = idx + 1; i > 0; i -= i & -i) res += bit[i];
    return res;
  }
  long long sumRange(int l, int r) { // sum [l..r]
    if (l > r) return 0;
    return sumPrefix(r) - (l ? sumPrefix(l - 1) : 0);
  }
  };`}
          />
          <div className="info-box">
            <p className="text-blue-800 dark:text-blue-200">
              💡 Great for: point update + prefix/range sum, inversion count, coordinate compression + BIT.
            </p>
          </div>
        </section>

        <section className="doc-section">
          <h2 className="doc-step">Segment Tree (range query + point update)</h2>
          <CodeBlock
            language="cpp"
            code={`struct SegTree {
  int n;
  vector<long long> st;
  SegTree(int n=0) { init(n); }

  void init(int n_) {
    n = 1;
    while (n < n_) n <<= 1;
    st.assign(2 * n, 0);
  }

  // point set: a[pos] = val
  void setVal(int pos, long long val) {
    int p = pos + n;
    st[p] = val;
    for (p >>= 1; p >= 1; p >>= 1) {
      st[p] = st[p << 1] + st[p << 1 | 1]; // sum
    }
  }

  // range sum query on [l, r)
  long long query(int l, int r) {
    long long res = 0;
    for (l += n, r += n; l < r; l >>= 1, r >>= 1) {
      if (l & 1) res += st[l++];
      if (r & 1) res += st[--r];
    }
    return res;
  }
};`}
          />
          <p className="doc-text">
            Swap the merge operation (<code className="code-inline">+</code>) for min/max/gcd, etc.
          </p>
        </section>

        <section className="doc-section">
          <h2 className="doc-step">Segment Tree (lazy propagation) — range add + range sum</h2>
          <CodeBlock
            language="cpp"
            code={`struct LazySeg {
  int n;
  vector<long long> st, lazy;
  LazySeg(int n=0) { init(n); }

  void init(int n_) {
    n = 1;
    while (n < n_) n <<= 1;
    st.assign(2 * n, 0);
    lazy.assign(2 * n, 0);
  }

  void push(int p, int len) {
    if (lazy[p] == 0) return;
    long long v = lazy[p];
    st[p] += v * len;
    if (p < n) {
      lazy[p << 1] += v;
      lazy[p << 1 | 1] += v;
    }
    lazy[p] = 0;
  }

  void rangeAdd(int l, int r, long long val) { rangeAdd(1, 0, n, l, r, val); }
  void rangeAdd(int p, int tl, int tr, int l, int r, long long val) {
    push(p, tr - tl);
    if (r <= tl || tr <= l) return;
    if (l <= tl && tr <= r) {
      lazy[p] += val;
      push(p, tr - tl);
      return;
    }
    int tm = (tl + tr) >> 1;
    rangeAdd(p << 1, tl, tm, l, r, val);
    rangeAdd(p << 1 | 1, tm, tr, l, r, val);
    st[p] = st[p << 1] + st[p << 1 | 1];
  }

  long long rangeSum(int l, int r) { return rangeSum(1, 0, n, l, r); }
  long long rangeSum(int p, int tl, int tr, int l, int r) {
    push(p, tr - tl);
    if (r <= tl || tr <= l) return 0;
    if (l <= tl && tr <= r) return st[p];
    int tm = (tl + tr) >> 1;
    return rangeSum(p << 1, tl, tm, l, r) + rangeSum(p << 1 | 1, tm, tr, l, r);
  }
};`}
          />
        </section>

        <section className="doc-section">
          <h2 className="doc-step">PBDS (order statistics tree) — kth / order_of_key</h2>
          <p className="doc-text">
            Useful when you need an ordered set with indexing.
          </p>
          <CodeBlock
            language="cpp"
            code={`#include <ext/pb_ds/assoc_container.hpp>
#include <ext/pb_ds/tree_policy.hpp>
using namespace __gnu_pbds;

// ordered_set
// supports: find_by_order(k) => iterator to k-th (0-indexed)
// order_of_key(x) => count of elements strictly less than x

template <class T>
using ordered_set = tree<T, null_type, less<T>, rb_tree_tag, tree_order_statistics_node_update>;

ordered_set<int> os;
os.insert(10);
os.insert(20);

int k0 = *os.find_by_order(0); // 10
int cntLess20 = os.order_of_key(20); // 1

// For duplicates, use pair (value, unique_id)
ordered_set<pair<int,int>> ods;
int uid = 0;
ods.insert({5, uid++});
ods.insert({5, uid++});`}
          />
          <div className="warning-box">
            <p className="text-amber-800 dark:text-amber-200">
              ⚠️ PBDS is GCC-specific; works on most CP judges, not on all platforms.
            </p>
          </div>
        </section>

        <div className="doc-divider" />

        <section className="doc-section">
          <h2 className="doc-step">✅ Quick Checklist (what you usually need)</h2>
          <ul className="doc-list">
            <li>Vectors: erase-remove, unique after sort, bounds on sorted arrays</li>
            <li>Maps/Sets: <code className="code-inline">lower_bound</code>, <code className="code-inline">upper_bound</code>, predecessor/successor</li>
            <li>Heaps: min-heap with <code className="code-inline">greater&lt;&gt;</code>, pair heap for Dijkstra</li>
            <li>DSU: union-find for components / Kruskal</li>
            <li>Fenwick/SegTree: range queries + updates</li>
          </ul>
        </section>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-12">
        <div className="max-w-4xl mx-auto px-6 py-6 text-center text-zinc-500 dark:text-zinc-500 text-sm">
          Personal Documentation Hub
        </div>
      </footer>
    </div>
  );
}
