/* works.js — 「活用事例」の一覧データ（ここだけ編集すれば、ナビ・トップに反映されます）
   追加する時は WORKS の末尾に 1 ブロック足すだけ。
   source: 'site' = 自サイト内ページ / 'github' 'zenn' 'note' 'fb' = 外部リンク
   tag   : 'sensor' = IoTセンサー / 'camera' = AIカメラ                          */

window.ARANOVA_TAGS = { sensor: 'IoTセンサー', camera: 'AIカメラ' };

window.ARANOVA_SOURCES = { site: '', github: 'GitHub', zenn: 'Zenn', note: 'note', fb: 'Facebook' };

window.ARANOVA_ICONS = {
  wave:   '<path d="M2 12h3l2-6 4 12 3-9 2 3h6"/>',
  door:   '<path d="M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17"/><path d="M4 21h16"/><circle cx="14.5" cy="12" r=".8"/>',
  thermo: '<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/>',
  pin:    '<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  people: '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M16 5.2a3 3 0 0 1 0 5.6"/><path d="M18 14.3c1.8.9 3 2.7 3 5.7"/>',
  hand:   '<path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V10"/><path d="M12 9.5a1.5 1.5 0 0 1 3 0V11"/><path d="M15 10.5a1.5 1.5 0 0 1 3 0V16a6 6 0 0 1-6 6h-1a6 6 0 0 1-4.6-2.2L4 15.5a1.6 1.6 0 0 1 2.4-2L9 16V11"/>'
};

window.ARANOVA_WORKS = [
  {
    href: 'twelite-cue-iot.html', source: 'site', tag: 'sensor', icon: 'wave',
    title: '振動回数の計測', sub: 'Vibration Sensing',
    desc: '小型無線センサーを実機に取り付け、状態の取得からデータ収集・可視化まで構築しました。'
  },
  {
    href: 'twelite-door-iot.html', source: 'site', tag: 'sensor', icon: 'door',
    title: '開閉回数の計測', sub: 'Open / Close Detection',
    desc: '冷蔵・冷凍庫にセンサーを取り付け、1日の開閉回数をスマートフォンで確認できる形にしました。'
  },
  {
    href: 'twelite-pal-iot.html', source: 'site', tag: 'sensor', icon: 'thermo',
    title: '環境測定', sub: 'Environment Monitoring',
    desc: '夏場の車内に設置し、温度・湿度・照度をGrafanaでリアルタイムに可視化しました。'
  },
  {
    href: 'twelite-location-iot.html', source: 'site', tag: 'sensor', icon: 'pin',
    title: '屋内位置推定', sub: 'Indoor Positioning',
    desc: '電波強度から屋内の大まかな位置を推定し、現在地と移動履歴を確認できる仕組みを検証しました。'
  },
  {
    href: 'peoplecount.html', source: 'site', tag: 'camera', icon: 'people',
    title: '人数測定', sub: 'People Counting',
    desc: '店舗の出入口にAIカメラを導入し、来店人数とPOSデータから購買率を分析しました。'
  },
  {
    href: 'untouch.html', source: 'site', tag: 'camera', icon: 'hand',
    title: '非接触操作', sub: 'Touchless Control',
    desc: '深度カメラで指の動きを検知し、画面に触れずに操作できる仕組みを検証しました。'
  }
  /* 外部リンクの例（使う時はコメントを外す）
  ,{
    href: 'https://zenn.dev/xxxx/articles/xxxx', source: 'zenn', tag: 'sensor', icon: 'wave',
    title: '記事タイトル', sub: 'English sub title',
    desc: '説明文（40〜50字）'
  }
  */
];