/* Motion Atlas / A source-grounded, interactive field guide. */
const CATEGORIES = [
  { id: 'all', name: 'すべての動き', en: 'ALL MOTIONS', symbol: '◈' },
  { id: 'opening', name: 'オープニング演出', en: 'OPENING', symbol: '✳' },
  { id: 'hover', name: 'ホバー・反応', en: 'FEEDBACK', symbol: '↗' },
  { id: 'entrance', name: '表示・画面切替', en: 'TRANSITIONS', symbol: '◫' },
  { id: 'scroll', name: 'スクロール操作', en: 'SCROLL', symbol: '↕' },
];

const ITEMS = [
  {id:'book-cover',cat:'opening',v:1,en:'3D Book Cover Flip',jp:'3D表紙フリップ',trigger:'ページ初回表示',tech:'3D transform / keyframes',duration:'1.2s + 0.25s',demo:'book',
    desc:'本の表紙がY軸を中心に約178度回転し、内側のページを見せる導入演出。',why:'「索引を開く」というサイトのメタファーを直感的に表現する。',src:'V1–V3 · src/index.css',sel:'.intro-cover / @keyframes intro-cover-open',detail:'perspective: 1500px、transform-origin: left center、backface-visibility: hiddenを併用。MaterialのContainer Transformではなく、物体の3D回転です。',code:'@keyframes intro-cover-open {\n  0%,12% { transform: rotateY(0) }\n  100%  { transform: rotateY(-178deg) }\n}'},
  {id:'page-turn',cat:'opening',v:1,en:'3D Page Turn',jp:'3Dページターン（ページめくり）',trigger:'オープニング中盤',tech:'3D transform / keyframes',duration:'1.0s + 0.65s',demo:'leaf',
    desc:'表紙の後に紙の1枚が続いて回転。複数レイヤーで「本らしい奥行き」を作る。',why:'静的な画面切替に物理的な文脈を与える。',src:'V1–V3 · src/index.css',sel:'.intro-leaf / @keyframes intro-page-turn',detail:'transform-origin を左辺に取り、rotateY(-174deg)まで動かしています。',code:'@keyframes intro-page-turn {\n  0%,10% { transform: rotateY(0) }\n  100%   { transform: rotateY(-174deg) }\n}'},
  {id:'book-settle',cat:'opening',v:1,en:'Translate & Rotate Settle',jp:'回転・移動による整列アニメーション',trigger:'オープニング開始',tech:'translate / rotate / easing',duration:'1.4s + 0.2s',demo:'settle',
    desc:'左にずれ、少し傾いた本が中央の正位置へとゆっくり収まる。',why:'場面の始まりに自然な重みと着地感を加える。',src:'V1–V3 · src/index.css',sel:'@keyframes intro-book-settle',detail:'cubic-bezier(.22,.7,.25,1) の減速カーブ。スマートフォンには移動量を小さくした専用キーフレームがあります。',code:'from { transform: translateX(-115px) rotate(-4deg) }\nto   { transform: translateX(0) rotate(0) }'},
  {id:'stagger-intro',cat:'opening',v:1,en:'Staggered Reveal',jp:'スタッガード・リビール（時間差表示）',trigger:'本が開いた直後',tech:'opacity / translateY / delay',duration:'0.35s × 3',demo:'staggerIntro',
    desc:'本の中の教員リストが行ごとに少し遅れてフェードアップする。',why:'情報の流れに視線を沿わせ、1項目ずつ認識しやすくする。',src:'V1–V3 · src/index.css',sel:'.intro-teacher / nth-of-type(3,4)',detail:'各行の animation-delay が1.25s → 1.4s → 1.55sと増えます。',code:'.intro-teacher { animation: intro-record .35s ease both; animation-delay: 1.25s }\n.intro-teacher:nth-of-type(3) { animation-delay: 1.4s }'},
  {id:'caption-rise',cat:'opening',v:1,en:'Text Fade Up',jp:'テキストのフェードアップ',trigger:'オープニング開始',tech:'opacity / translateY',duration:'0.5s + 0.2s',demo:'caption',
    desc:'「下にスクロールして、ページの先へ。」という案内テキストが数px浮き上がりながら現れる。',why:'操作方法の案内を穏やかに注目させる。',src:'V1–V3 · src/index.css',sel:'.intro-message / intro-record',detail:'本の中のリストと同じキーフレームを、異なる時間設定で再利用しています。',code:'@keyframes intro-record {\n  from { opacity: 0; transform: translateY(5px) }\n  to   { opacity: 1; transform: translateY(0) }\n}'},
  {id:'intro-dissolve',cat:'opening',v:1,en:'Overlay Dissolve',jp:'オーバーレイのフェードアウト',trigger:'導入シーケンス終端',tech:'opacity / animation fill',duration:'0.45s + 2.35s',demo:'dissolve',
    desc:'全画面の導入レイヤーを透過させ、背後の通常ページへ移行する。',why:'大きな3D演出から検索画面へ、急な切替を避けてつなぐ。',src:'V1–V3 · src/index.css',sel:'.book-intro / intro-away',detail:'これはOpacityのみのFade。Material Designの画面階層間のShared Axisとは区別できます。',code:'.book-intro { animation: intro-away .45s ease 2.35s both }\n@keyframes intro-away { to { opacity: 0 } }'},
  {id:'fan-hover',cat:'hover',v:1,en:'Fan-out Card Stack',jp:'カードスタックの扇状展開',trigger:'ヒーローアートにホバー',tech:'rotate / translate / easing',duration:'0.6s',demo:'fan',
    desc:'重なった索引カードの角度と位置をずらし、扇のように少し広げる。',why:'平面の装飾に手で触れるような応答性を与える。',src:'V1–V3 · src/index.css',sel:'.artwork:hover .card-front / .card-back',detail:'カードの変形基点はbottom center。パララックスではなく、hoverに反応した個別のtransform transitionです。',code:'.index-card { transition: transform .6s cubic-bezier(.2,.8,.2,1) }\n.artwork:hover .card-front { transform: rotate(-14deg) translate(-5px,0) }'},
  {id:'region-lift',cat:'hover',v:1,en:'Hover Lift',jp:'ホバー時のリフトアップ',trigger:'地域のリンクにホバー',tech:'translateY / transition',duration:'0.18s',demo:'lift',
    desc:'東京都・神奈川県などの地域リンクがわずかに上へ移動する。',why:'押せる領域であることを小さな移動で伝える。',src:'V1–V3 · src/index.css',sel:'.region-links button:hover',detail:'個別ルールはtranslateY(-3px)。ボタン共通のtransition: transform .18sが補間を担当します。',code:'button { transition: background .18s, color .18s, transform .18s }\n.region-links button:hover { transform: translateY(-3px) }'},
  {id:'prefecture-lift',cat:'hover',v:3,en:'Tile Hover Lift',jp:'都道府県タイルの浮き上がり',trigger:'都道府県カードにホバー',tech:'translateY / border tween',duration:'0.2s',demo:'prefecture',
    desc:'都道府県タイルが3px上がり、輪郭の色も緑寄りに変わる。',why:'カード群のうち現在操作している対象を強調する。',src:'V3 · src/archive-bottom.css',sel:'.ab-prefecture:hover / .is-selected',detail:'選択状態でも同じ位置の変化を使うため、ホバーと選択が視覚的につながります。',code:'.ab-prefecture { transition: border-color .2s, transform .2s, background .2s }\n.ab-prefecture:hover { transform: translateY(-3px) }'},
  {id:'new-region-lift',cat:'hover',v:2,en:'Editorial Card Lift',jp:'索引カードのホバーリフト',trigger:'索引ページの地域カード',tech:'translateY / border',duration:'0.18s',demo:'editorialLift',
    desc:'新版の地域カードでも浮上とボーダーの変化を利用している。',why:'関連項目の一覧でクリック可能性を示す。',src:'V2–V3 · src/index-cards.css',sel:'.ic-region-card:hover:not(:disabled)',detail:'index.css のbutton共通transitionが移動を滑らかにします。V3の都道府県タイルとは別コンポーネントです。',code:'.ic-region-card:hover:not(:disabled) {\n  transform: translateY(-3px);\n  border-color: #97ad88;\n}'},
  {id:'old-accent-rail',cat:'hover',v:1,en:'Accent Rail Grow',jp:'アクセントラインの伸長',trigger:'検索結果にホバー・フォーカス',tech:'scaleY / transition',duration:'0.2s',demo:'rail',
    desc:'検索結果の左端にある細い縦線が、中心から上下に伸びる。',why:'行全体を強調しながら文字の読みやすさを保つ。',src:'V1–V3 · src/index.css',sel:'.entry-row:before / :hover / :focus-within',detail:'疑似要素のscaleY(0)→scaleY(1)。キーボードのfocus-withinにも対応。',code:'.entry-row:before { transform: scaleY(0); transition: transform .2s }\n.entry-row:hover:before { transform: scaleY(1) }'},
  {id:'new-accent-rail',cat:'hover',v:2,en:'Accent Rail Expand & Fade',jp:'アクセントラインの拡張・フェードイン',trigger:'新版の索引カードにホバー',tech:'scaleY / opacity / transition',duration:'0.2s',demo:'railNew',
    desc:'新版では縦線が短い状態から伸びると同時に、透明から可視へ変化する。',why:'旧版の強調表現を、より繊細な手触りに拡張している。',src:'V2–V3 · src/index-cards.css',sel:'.ic-index-card:before / :hover / :focus-within',detail:'scaleY(.3) + opacity:0 → scaleY(1) + opacity:1 の複合遷移。',code:'.ic-index-card:before { transform: scaleY(.3); opacity: 0; transition: transform .2s, opacity .2s }'},
  {id:'arrow-nudge',cat:'hover',v:1,en:'Directional Arrow Nudge',jp:'矢印のホバースライド',trigger:'行・見出し・フッターのホバー',tech:'translateX / transition',duration:'0.2s',demo:'arrow',
    desc:'右向き矢印が3〜4px進み、移動先があることを暗示する。',why:'ナビゲーションに方向の意味を追加するマイクロインタラクション。',src:'V1–V3 · src/index.css / V2–V3 · src/index-cards.css / V3 · src/archive-bottom.css',sel:'.entry-go / .ic-title-button > svg / .ab-journal-title > svg / .ab-footer-nav > button > svg',detail:'同一のパターンが検索結果、見出し、更新情報、フッターに再登場します。場所により3pxか4pxです。',code:'.entry-main:hover .entry-go { transform: translateX(4px) }\n.ab-footer-nav > button:hover > svg { transform: translateX(3px) }'},
  {id:'search-focus',cat:'hover',v:1,en:'Focus Ring & Shadow Tween',jp:'フォーカス時の枠・影の変化',trigger:'検索ボックスにフォーカス',tech:'border-color / box-shadow',duration:'0.2s',demo:'focus',
    desc:'検索ボックスの枠色と下方向の影が緑色へなめらかに変化する。',why:'入力できる状態になったことを明確に知らせる。',src:'V1–V3 · src/index.css',sel:'.search-box.is-focused',detail:'キーボードフォーカスと操作状態の視覚フィードバック。空間移動はしません。',code:'.search-box { transition: box-shadow .2s, border .2s }\n.search-box.is-focused { border-color: var(--green); box-shadow: 0 5px 0 #d4dece }'},
  {id:'button-color',cat:'hover',v:1,en:'Color Tween',jp:'ボタンのカラートランジション',trigger:'一般ボタンのホバー',tech:'background / color transition',duration:'0.18s',demo:'color',
    desc:'ボタンの背景色・文字色が一瞬で切り替わらず、短時間で補間される。',why:'気づきやすくも騒がしくない基礎的な操作反応。',src:'V1–V3 · src/index.css',sel:'button / .search-submit:hover / .load-more:hover',detail:'背景と文字の色補間。hoverで色が切り替わる状態変化との違いはtransition指定の有無です。',code:'button { transition: background .18s, color .18s, transform .18s }'},
  {id:'card-emphasis',cat:'hover',v:2,en:'Border & Elevation Accent',jp:'カードの輪郭・影の強調',trigger:'索引カードにホバー・フォーカス',tech:'border-color / box-shadow',duration:'0.2s',demo:'elev',
    desc:'カードの輪郭が濃くなり、下方向に小さな影が付く。',why:'カーソルの対象を構造を崩さずに浮かび上がらせる。',src:'V2–V3 · src/index-cards.css',sel:'.ic-index-card:hover / :focus-within',detail:'同じカード上で左端レールの伸長も同時に発生します。',code:'.ic-index-card { transition: border-color .2s, box-shadow .2s }\n.ic-index-card:hover { box-shadow: 0 5px 0 #233c3505 }'},
  {id:'entry-reveal',cat:'entrance',v:1,en:'Fade & Slide In',jp:'フェード＋スライドイン',trigger:'検索結果の表示',tech:'opacity / translateY',duration:'0.35s',demo:'rise',
    desc:'要素が少し下から上昇しながら不透明になって表示される。',why:'検索結果の出現を唐突に感じさせない基本の入場表現。',src:'V1–V3 · src/index.css',sel:'.entry-row / @keyframes entry-in',detail:'移動は7px。モーダル、詳細ページなどでも同じkeyframesが再利用されます。',code:'@keyframes entry-in {\n  from { opacity:0; transform:translateY(7px) }\n  to   { opacity:1; transform:translateY(0) }\n}'},
  {id:'result-stagger',cat:'entrance',v:1,en:'Staggered List Entrance',jp:'検索結果のスタッガード表示',trigger:'検索結果の一覧描画',tech:'nth-child / animation-delay',duration:'0.35s + 40ms',demo:'staggerResults',
    desc:'1〜3行目のカードに40msずつ遅延を付け、流れるような入り方にする。',why:'一覧をひと塊ではなく順序を持って見せる。',src:'V1–V3 · src/index.css',sel:'.entry-row:nth-child(2/3)',detail:'スタガーは3行目まで明示。さらに後ろの行へ自動的に遅延が増える実装ではありません。',code:'.entry-row:nth-child(2) { animation-delay:40ms }\n.entry-row:nth-child(3) { animation-delay:80ms }'},
  {id:'compare-tray',cat:'entrance',v:1,en:'Bottom Tray Entrance',jp:'比較トレイのスライドイン',trigger:'比較対象を追加',tech:'bottom / opacity keyframes',duration:'0.25s',demo:'tray',
    desc:'下部の固定比較バーが少し低い位置から現れ、選択された項目数を示す。',why:'ページの閲覧を妨げず、次に取れる操作を提示する。',src:'V1–V3 · src/index.css / V2–V3 · src/index-cards.css',sel:'.compare-tray / .ic-compare-tray / @keyframes tray-in',detail:'V2では新しいレイアウトの比較バーにも同じtray-inを利用しています。',code:'@keyframes tray-in {\n  from { opacity:0; bottom:12px }\n  to   { opacity:1; bottom:24px }\n}'},
  {id:'dialog-entrance',cat:'entrance',v:1,en:'Modal Fade Up',jp:'モーダルのフェードアップ',trigger:'詳細・比較ダイアログを開く',tech:'opacity / translateY',duration:'0.22s',demo:'modal',
    desc:'中央のダイアログ本体が7pxほど浮き上がりながら現れる。',why:'画面の主役が背景からモーダルへ移ったことを伝える。',src:'V1–V3 · src/index.css',sel:'.detail-dialog[open]',detail:'背後のbackdrop-filter:blur(4px)は静的な視覚効果であり、ぼかし量そのもののアニメーションではありません。',code:'.detail-dialog[open] { animation: entry-in .22s }\n.detail-dialog::backdrop { backdrop-filter: blur(4px) }'},
  {id:'source-dialog',cat:'entrance',v:2,en:'Source Sheet Reveal',jp:'出典モーダルの出現',trigger:'出典・根拠を開く',tech:'entry-in / overlay',duration:'0.2s',demo:'source',
    desc:'新版で導入された出典表示用のダイアログが、コンパクトなフェードアップで登場。',why:'実データと出典に対する閲覧フローをつなぐ。',src:'V2–V3 · src/index-cards.css',sel:'.ic-source-dialog',detail:'entry-inを0.2sで再利用。後ろのbackdropにはblur(3px)が適用されます。',code:'.ic-source-dialog { animation: entry-in .2s ease }'},
  {id:'detail-page',cat:'entrance',v:2,en:'Page Entrance Transition',jp:'詳細ページの表示トランジション',trigger:'教員・学校の詳細へ移動',tech:'entry-in / page mount',duration:'0.3s',demo:'page',
    desc:'詳細ページ全体が少し上昇しながら出現する画面遷移。',why:'検索一覧から読み込みページへの場面転換を柔らかく見せる。',src:'V2–V3 · src/index-cards.css',sel:'.ic-detail-page',detail:'Material Designの「Container Transform」と異なり、クリック元のカードが変形して引き継がれるわけではありません。',code:'.ic-detail-page { animation: entry-in .3s ease }'},
  {id:'collection-switch',cat:'entrance',v:2,en:'Content Swap Fade-up',jp:'コンテンツ切替のフェードアップ',trigger:'索引ジャンルを変更',tech:'entry-in / remount',duration:'0.25s',demo:'collection',
    desc:'切り替わった索引コンテンツが軽く浮き上がりながら出現する。',why:'ジャンル変更を視覚的に区切る。',src:'V2–V3 · src/index-cards.css',sel:'.ic-collection-content',detail:'フェードスルーを厳密に実装したものではなく、新たな内容の入場演出です。',code:'.ic-collection-content { animation: entry-in .25s }'},
  {id:'prefecture-grid',cat:'entrance',v:3,en:'Grid Content Reveal',jp:'グリッドの順次表示',trigger:'地域タブの切替',tech:'opacity / translateY',duration:'0.24s',demo:'grid',
    desc:'地域タブを切り替えると、4列（狭い画面では2列）のグリッド全体がフェードアップして現れる。カードごとの時間差はない。',why:'情報の切替を感じさせつつ、密度の高いグリッドを安定して見せる。',src:'V3 · src/archive-bottom.css',sel:'.ab-prefecture-grid / @keyframes ab-page-in',detail:'opacity:.4→1、translateY(4px)→0。個々のカードへ時間差は設定されていません。',code:'@keyframes ab-page-in {\n  from { opacity:.4; transform:translateY(4px) }\n  to   { opacity:1; transform:translateY(0) }\n}'},
  {id:'feed-swap',cat:'entrance',v:3,en:'Filtered Feed Reveal',jp:'フィード切替のフェード表示',trigger:'ニュースのフィルターを変更',tech:'ab-page-in',duration:'0.24s',demo:'feed',
    desc:'情報フィードを切り替えた時に、リスト全体が小さくフェードアップする。',why:'絞り込み後の新しい一覧を自然に認識させる。',src:'V3 · src/archive-bottom.css',sel:'.ab-feed-list',detail:'都道府県グリッドと同じab-page-inを使うが、トリガーと表示先は異なります。',code:'.ab-feed-list { animation: ab-page-in .24s ease }'},
  {id:'records-expand',cat:'entrance',v:3,en:'Inline Panel Reveal',jp:'更新履歴の展開表示（ディスクロージャー）',trigger:'「掲載記録を見る」をクリック',tech:'ab-page-in',duration:'0.2s',demo:'records',
    desc:'更新情報の行の下に新しい記録領域が現れ、少し上がりながら表示される。',why:'画面遷移なしで補足情報を読み進められるようにする。',src:'V3 · src/archive-bottom.css',sel:'.ab-records-panel',detail:'高さを連続的に伸ばすアコーディオンではなく、開いた内容自体の入場アニメーションです。',code:'.ab-records-panel { animation: ab-page-in .2s ease }'},
  {id:'load-more',cat:'entrance',v:1,en:'Progressive List Reveal',jp:'追加項目の段階的表示（Load More）',trigger:'「もっと見る」をクリック',tech:'state / entry-in',duration:'0.35s',demo:'load',
    desc:'表示件数が増え、新たに描画されたリスト項目がフェードアップする。',why:'ページ全体を切り替えず、一覧の続きを自然に見せる。',src:'V1–V3 · src/App.tsx / src/index.css',sel:'setLimit(...) / .entry-row',detail:'仕組みはReact側の表示件数変更と、各行に付いたentry-inの組み合わせ。自動無限スクロールとは異なります。',code:'/* 状態更新で行を追加 */\nsetLimit(previous => previous + 3)\n/* 新規行には entry-in が適用 */'},
  {id:'scroll-scrub',cat:'scroll',v:1,en:'Scroll-Scrubbed Timeline',jp:'スクロール連動アニメーション（スクラブ）',trigger:'導入中のホイール・上方向スワイプ',tech:'Web Animations API / rAF',duration:'0–2.8s（操作依存）',demo:'scrub',
    desc:'全アニメーションを1つの再生時刻で管理し、スクロール分だけ時間を加速させる。',why:'「本をめくって先へ進む」行為をスクロール体験と結びつける。',src:'V1–V3 · src/App.tsx',sel:'BookOpening / getAnimations / currentTime / requestAnimationFrame',detail:'純粋なスクロール位置同期（ScrollTimeline）ではありません。通常の時間経過に、ホイール・タッチ移動量から算出したboostを足す独自実装です。',code:'const animations = element.getAnimations({ subtree: true })\nanimations.forEach(a => { a.pause(); a.currentTime = elapsed })\n// wheel / touch から boost を加算'},
  {id:'smooth-scroll',cat:'scroll',v:1,en:'Smooth Anchor Scrolling',jp:'スムースアンカースクロール',trigger:'検索・ナビゲーションリンク',tech:'scroll-behavior / scrollIntoView',duration:'ブラウザ制御',demo:'smooth',
    desc:'結果一覧やページ内セクションへ、急にジャンプせず滑らかに移動する。',why:'同一ページ内の位置関係を保ち、現在地を把握しやすくする。',src:'V1–V3 · src/index.css / src/App.tsx',sel:'html{scroll-behavior:smooth} / scrollIntoView({behavior:"smooth"})',detail:'prefers-reduced-motion時はinstant/autoへ変更しています。',code:'html { scroll-behavior: smooth }\nresultRef.current?.scrollIntoView({ behavior:"smooth", block:"start" })'},
];

// 検索互換: 表示名を変更しても、旧名称で同じ標本を見つけられるようにする。
const LEGACY_JP_NAMES = {
  'page-turn': 'ページめくり',
  'book-settle': '位置と傾きの収束',
  'stagger-intro': '時間差の順次表示',
  'caption-rise': 'コピーのフェードアップ',
  'fan-hover': 'カードの扇状展開',
  'new-region-lift': '地域索引カードのホバー浮上',
  'old-accent-rail': '縦ラインの伸長',
  'new-accent-rail': '縦ラインの拡張＋出現',
  'arrow-nudge': '矢印のスライド',
  'button-color': 'ボタンの色変化',
  'result-stagger': '検索結果の時間差表示',
  'compare-tray': '下部比較トレイの登場',
  'detail-page': '詳細ページの入場トランジション',
  'collection-switch': '索引コンテンツの切替演出',
  'prefecture-grid': '都道府県グリッドの表示',
  'feed-swap': '更新情報フィードの切替',
  'records-expand': '更新履歴パネルの展開表示',
  'load-more': '追加読み込みの順次出現',
  'scroll-scrub': 'スクロール追従の再生制御',
  'smooth-scroll': 'スムーススクロール',
};

const SHORT_NAMES = {opening:'オープニング',hover:'ホバー',entrance:'表示・切替',scroll:'スクロール'};
const ESC = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const loopChip = (label='') => `<span class="specimen-chip">${label || 'LOOP / 体験できます'}</span>`;

function demoMarkup(item) {
  switch(item.demo) {
    case 'book': return `<div class="mini-book"><div class="mini-book-inner"><span>01 / INDEX</span><b>新しい<br>発見へ。</b></div><div class="mini-cover"><span>KYOIN SEARCH</span><b>教員<br>サーチ</b></div></div>`;
    case 'leaf': return `<div class="mini-book leaf-demo"><div class="mini-book-inner"><span>OPENED PAGE</span><b>先生の歩み<br>学校のこと</b></div><div class="mini-leaf"></div></div>`;
    case 'settle': return `<div class="settle-object"><span>THE OPEN INDEX</span><b>ARCHIVE<br>01.</b></div>`;
    case 'staggerIntro': return `<div class="demo-lines intro-lines"><div>01 <span>先生の歩み</span> ↗</div><div>02 <span>学校とのつながり</span> ↗</div><div>03 <span>次の発見</span> ↗</div></div>`;
    case 'caption': return `<div class="caption-object"><small>THE NEXT PAGE</small><b>ページの先へ。</b><span>↓ SCROLL TO EXPLORE</span></div>`;
    case 'dissolve': return `<div class="dissolve-scene"><div class="behind-layer">SEARCH / INDEX<br><strong>次の画面</strong></div><div class="dissolve-overlay">OPENING<br><strong>導入画面</strong></div></div>`;
    case 'fan': return `<div class="fan-stack"><div><span>03</span><b>地域を知る</b></div><div><span>02</span><b>人を知る</b></div><div><span>01</span><b>学校を知る</b></div></div>`;
    case 'lift': return `<div class="lift-object">神奈川県 <b>↗</b><small>EXPLORE AREA</small></div>`;
    case 'prefecture': return `<div class="tile-object"><small>KANAGAWA / 14</small><strong>神奈川</strong><span>27 SCHOOL ENTRIES <b>↗</b></span></div>`;
    case 'editorialLift': return `<div class="editorial-object"><small>REGION INDEX</small><strong>横浜市</strong><div>学校の記録を見る <b>↗</b></div></div>`;
    case 'rail': return `<div class="rail-object"><div class="rail-indicator"></div><span>01</span><strong>横浜市立みなと中学校</strong><b>↗</b></div>`;
    case 'railNew': return `<div class="rail-object rail-new"><div class="rail-indicator"></div><span>02</span><strong>新しい索引カード</strong><b>↗</b></div>`;
    case 'arrow': return `<div class="arrow-object"><span>詳細を見る</span><b>→</b></div>`;
    case 'focus': return `<div class="focus-object"><span>⌕</span><span>学校・教員を検索</span><b>検索</b></div>`;
    case 'color': return `<div class="color-object">条件を絞る <span>↗</span></div>`;
    case 'elev': return `<div class="elev-object"><small>ARCHIVE CARD / 01</small><strong>学校の記録</strong><span>詳しく見る　↗</span></div>`;
    case 'rise': return `<div class="rise-object"><span>学校 / SCHOOL</span><strong>学校データを表示</strong><small>地図・地域・沿革</small></div>`;
    case 'staggerResults': return `<div class="demo-lines result-lines"><div><span>01</span> 横浜市立みなと中学校　↗</div><div><span>02</span> 川崎市立さくら小学校　↗</div><div><span>03</span> 藤沢市立みどり中学校　↗</div></div>`;
    case 'tray': return `<div class="tray-context"><span>SEARCH RESULTS</span><div class="tray-object"><b>02</b> 校を比較 <span>比較を見る ↗</span></div></div>`;
    case 'modal': return `<div class="modal-scrim"><div class="modal-object"><small>DETAIL</small><strong>学校の詳細</strong><span>所在地・学級数・沿革</span></div></div>`;
    case 'source': return `<div class="modal-scrim source-scrim"><div class="source-object"><small>ORIGINAL SOURCE / PDF</small><strong>資料の出典</strong><span>公表資料を確認　↗</span></div></div>`;
    case 'page': return `<div class="page-object"><small>学校・教員 / DETAIL PAGE</small><strong>学校を、知る。</strong><i></i><i></i><i></i></div>`;
    case 'collection': return `<div class="collection-object"><div class="collection-tabs"><span>学校</span><span>教員</span><span>資料</span></div><div class="collection-body"><small>INDEX / PEOPLE</small><strong>索引を切り替える。</strong></div></div>`;
    case 'grid': return `<div class="region-grid-object"><div>神奈川</div><div>東京</div><div>千葉</div><div>埼玉</div></div>`;
    case 'feed': return `<div class="feed-object"><div><small>2026.10</small><strong>教員異動情報を更新</strong><span> ↗</span></div><div><small>2026.09</small><strong>データ公開範囲を変更</strong><span> ↗</span></div></div>`;
    case 'records': return `<div class="records-object"><div>掲載記録 <b>⌄</b></div><section><span>01</span> 関連する公開資料<br><span>02</span> 過去の更新履歴</section></div>`;
    case 'load': return `<div class="load-object"><div>01　最初の検索結果</div><div>02　次の検索結果</div><div class="load-last">03　追加された検索結果</div></div>`;
    case 'scrub': return `<div class="scrub-object"><div class="scrub-cover"><strong>OPEN</strong><span>THE INDEX</span></div><div class="scrub-page">SCROLL TO OPEN</div></div><label class="scrub-control">PROGRESS <input type="range" min="0" max="100" value="35" aria-label="ページめくりの進行度"></label>`;
    case 'smooth': return `<div class="smooth-object"><button type="button" data-scroll-demo>↘ 次のセクションへ</button><div class="smooth-viewport"><div>01 / TOP</div><div>02 / MIDDLE</div><div>03 / TARGET ✓</div></div></div>`;
    default: return `<div class="demo-fallback">MOTION ↗</div>`;
  }
}

let activeCategory = 'all';
let query = '';
let version = 'all';
let paused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const grid = document.getElementById('catalogGrid');
const dialog = document.getElementById('detailDialog');
const detailBody = document.getElementById('detailBody');

function getFiltered() {
  return ITEMS.filter(item => {
    if (activeCategory !== 'all' && item.cat !== activeCategory) return false;
    if (version !== 'all' && String(item.v) !== version) return false;
    const term = query.trim().normalize('NFKC').toLowerCase();
    return !term || [item.jp,item.en,LEGACY_JP_NAMES[item.id] || '',item.desc,item.tech,item.trigger,item.src,item.sel,item.why].join(' ').normalize('NFKC').toLowerCase().includes(term);
  });
}

function renderFilters() {
  document.getElementById('filters').innerHTML = CATEGORIES.map(c => {
    const count = c.id === 'all' ? ITEMS.length : ITEMS.filter(item => item.cat===c.id).length;
    return `<button class="filter-button ${activeCategory===c.id?'active':''}" data-category="${c.id}" type="button" aria-pressed="${activeCategory===c.id}"><span class="filter-symbol">${c.symbol}</span><span>${c.name}<small>${c.en}</small></span><b>${String(count).padStart(2,'0')}</b></button>`;
  }).join('');
}

function render() {
  renderFilters();
  const selected = getFiltered();
  document.getElementById('visibleCount').textContent = String(selected.length).padStart(2,'0');
  document.getElementById('noResults').hidden = selected.length>0;
  document.getElementById('activeFilters').textContent = activeCategory==='all' && version==='all' && !query ? '全モーションを表示しています。デモをホバーまたはタップして体験できます。' : `${selected.length}件の該当項目を表示中。詳細ボタンからコードを確認できます。`;
  grid.innerHTML = selected.map((item, index) => `
    <article class="motion-card" style="--card-index:${index}">
      <div class="card-topline"><span class="card-id">FIG. ${String(ITEMS.indexOf(item)+1).padStart(3,'0')}</span><span class="card-category">${SHORT_NAMES[item.cat]}</span><span class="version-badge">V${item.v}+</span></div>
      <div class="demo-stage demo-${item.demo} ${paused?'demo-paused':''}" data-id="${item.id}" tabindex="0" role="${['scrub','smooth'].includes(item.demo)?'group':'button'}" aria-label="${item.jp}のモーションを試す。ホバーまたはEnterで操作"><div class="demo-back-grid"></div><div class="demo-content">${demoMarkup(item)}</div><span class="demo-hint">${item.demo==='scrub'?'スライダーを操作':item.demo==='smooth'?'ボタンをクリック':'HOVER / TAP TO TRY'}</span></div>
      <div class="card-content"><div class="card-index-line"><span>${ESC(item.en)}</span><span>${item.duration}</span></div><h3>${ESC(item.jp)}</h3><p>${ESC(item.desc)}</p><div class="card-meta"><span>${ESC(item.trigger)}</span><span class="card-meta-dot">·</span><span>${ESC(item.tech)}</span></div></div>
      <div class="card-bottom"><button type="button" class="replay-button" data-replay="${item.id}" aria-label="${item.jp}を再生し直す"><span>↻</span> 再生</button><button type="button" class="detail-button" data-detail="${item.id}">仕組み・コードを見る <span>↗</span></button></div>
    </article>`).join('');
}

function openDetail(id) {
  const item = ITEMS.find(i=>i.id===id);
  if (!item) return;
  detailBody.innerHTML = `<div class="detail-heading"><span class="detail-number">FIG. ${String(ITEMS.indexOf(item)+1).padStart(3,'0')} / ${SHORT_NAMES[item.cat]}</span><h2 id="detailTitle">${ESC(item.jp)}</h2><p>${ESC(item.en)}</p></div>
    <div class="detail-specimen demo-stage demo-${item.demo} ${paused?'demo-paused':''}" data-id="${item.id}" tabindex="0" role="${['scrub','smooth'].includes(item.demo)?'group':'button'}" aria-label="${item.jp}のデモを試す"><div class="demo-back-grid"></div><div class="demo-content">${demoMarkup(item)}</div><span class="demo-hint">HOVER / TAP TO TRY</span></div>
    <div class="detail-description">${ESC(item.desc)}</div>
    <div class="detail-facts"><div><span>TRIGGER</span><strong>${ESC(item.trigger)}</strong></div><div><span>METHOD</span><strong>${ESC(item.tech)}</strong></div><div><span>TIMING</span><strong>${ESC(item.duration)}</strong></div><div><span>FIRST APPEARED</span><strong>V${item.v}</strong></div></div>
    <section class="detail-explain"><h3>使いどころ</h3><p>${ESC(item.why)}</p><h3>コードから分かること</h3><p>${ESC(item.detail)}</p></section>
    <div class="code-head"><span>IMPLEMENTATION NOTE / EXCERPT</span><button type="button" data-copy="${item.id}">コードをコピー ↗</button></div><pre class="source-code"><code>${ESC(item.code)}</code></pre>
    <div class="source-evidence"><span>出典：添付されたZIPの実装コード</span><strong>${ESC(item.src)}</strong><code>${ESC(item.sel)}</code></div>`;
  if (!dialog.open) dialog.showModal();
}

function replayStage(stage) {
  if (!stage || paused) return;
  stage.classList.remove('activated');
  stage.classList.add('reset-animation');
  void stage.offsetWidth;
  stage.classList.remove('reset-animation');
  if (/^(fan|lift|prefecture|editorialLift|rail|railNew|arrow|focus|color|elev)$/.test(stage.dataset.id && ITEMS.find(i=>i.id===stage.dataset.id)?.demo || '')) {
    stage.classList.add('activated');
    window.setTimeout(()=>stage.classList.remove('activated'),1100);
  }
}

document.getElementById('filters').addEventListener('click',e=>{
  const button = e.target.closest('[data-category]');
  if (!button) return;
  activeCategory=button.dataset.category;render();
});
document.getElementById('searchInput').addEventListener('input',e=>{query=e.target.value;render()});
document.getElementById('versionSelect').addEventListener('change',e=>{version=e.target.value;render()});
document.getElementById('resetFilters').addEventListener('click',()=>{activeCategory='all';query='';version='all';document.getElementById('searchInput').value='';document.getElementById('versionSelect').value='all';render()});
document.addEventListener('keydown',e=>{
  if (e.key==='/' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) && !dialog.open) {e.preventDefault();document.getElementById('searchInput').focus()}
});

document.addEventListener('click',e=>{
  const detail = e.target.closest('[data-detail]'); if (detail) {openDetail(detail.dataset.detail);return}
  const replay = e.target.closest('[data-replay]'); if (replay) {replayStage(document.querySelector(`.demo-stage[data-id="${replay.dataset.replay}"]`));return}
  const copy = e.target.closest('[data-copy]'); if (copy) {const item=ITEMS.find(i=>i.id===copy.dataset.copy);if(item && navigator.clipboard?.writeText){navigator.clipboard.writeText(item.code).then(()=>{copy.textContent='コピーしました ✓';window.setTimeout(()=>copy.textContent='コードをコピー ↗',1500)})}return}
  const stage = e.target.closest('.demo-stage');
  if (stage && !e.target.closest('input,button')) replayStage(stage);
  if (e.target.closest('[data-scroll-demo]')) {const parent=e.target.closest('.smooth-object');const viewport=parent.querySelector('.smooth-viewport');viewport.scrollTo({top:viewport.scrollHeight,behavior:paused?'instant':'smooth'});}
});
document.addEventListener('keydown',e=>{if (e.target.classList?.contains('demo-stage') && ['Enter',' '].includes(e.key)){e.preventDefault();replayStage(e.target)}});
document.addEventListener('input',e=>{if (e.target.matches('.scrub-control input')) e.target.closest('.demo-stage').style.setProperty('--scrub',Number(e.target.value)/100)});
document.getElementById('detailClose').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});

const motionToggle = document.getElementById('motionToggle');
function setPaused(next) {
  paused=next;
  document.body.classList.toggle('user-paused',paused);
  document.body.classList.toggle('allow-motion',!paused);
  motionToggle.setAttribute('aria-pressed',String(paused));
  motionToggle.innerHTML=paused?'<span class="toggle-icon">▶</span> 動きを再開':'<span class="toggle-icon">Ⅱ</span> 動きを一時停止';
  document.querySelectorAll('.demo-stage').forEach(stage=>stage.classList.toggle('demo-paused',paused));
}
motionToggle.addEventListener('click',()=>setPaused(!paused));
document.getElementById('heroReplay').addEventListener('click',()=>{
  if (paused) return;
  const scene=document.getElementById('heroBookScene');
  scene.classList.remove('hero-replay');void scene.offsetWidth;scene.classList.add('hero-replay');
});

render();
document.getElementById('heroTotal').textContent=String(ITEMS.length).padStart(2,'0');
document.getElementById('totalCount').textContent=String(ITEMS.length).padStart(2,'0');
setPaused(paused);
