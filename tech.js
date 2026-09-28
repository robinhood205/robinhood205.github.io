/* tech.js — 「技術検証」の一覧データ（首頁カード・ナビ・各ページ下部の「他の技術検証」に反映されます）
   追加する時は TECH の末尾に 1 ブロック足すだけ。 */

window.ARANOVA_ICONS = Object.assign(window.ARANOVA_ICONS || {}, {
  chip: '<rect x="6" y="6" width="12" height="12" rx="1.5"/><rect x="9.5" y="9.5" width="5" height="5"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
  doc:  '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><path d="M9 12h6M9 16h6"/>',
  snow: '<path d="M12 2v20M4.9 7l14.2 10M4.9 17L19.1 7"/><path d="M9.5 3.5L12 6l2.5-2.5M9.5 20.5L12 18l2.5 2.5"/>'
});

window.ARANOVA_TECH = [
  {
    href: 'raspberry-pi-offline-iot.html', icon: 'chip',
    title: 'オフラインIoT', sub: 'Raspberry Pi',
    desc: 'インターネットに依存せず、現場内だけで完結するIoTシステムをRaspberry Piで検証しています。'
  },
  {
    href: 'ai-ocr-gcp.html', icon: 'doc',
    title: 'AI × OCR', sub: 'Google Cloud',
    desc: '生成AIで紙や画像の情報を読み取り、データ化する実用的なワークフローを検証しています。'
  },
  {
    href: 'haccp-iot-aws.html', icon: 'snow',
    title: 'HACCP支援IoT', sub: 'AWS',
    desc: '温度などの現場データを収集し、記録と異常通知を支援するIoTシステムを検証しています。'
  }
];
