/**
 * local用コンフィグファイル
 * @type {String}
 */
angular.module(appName).constant('APP_CONF',{
	urlBase: 'http://localhost:8080/newton/',
	imageFolderPath: 'http://localhost:8080/newton/app/images/',
	importFaqTemplateFilePath: 'http://localhost:8080/newton/app/files/template.xlsx',
	columnTitleFaq: "FAQ",
	columnTitleImportFaq: "FAQ一括登録",
	columnTitleNotification: "お知らせ",
	columnTitleManual: "マニュアル",
	labelImportance: "重要度",
	buttonLabelCreateNotification: "新しいお知らせを登録する",
	buttonLabelClear: "クリア",
	buttonLabelSubmit: "登録",
	buttonLabelSubmitting: "登録中",
	buttonLabelUpdate: "更新",
	buttonLabelUpdating: "更新中",
	buttonLabelSend: "送信",
	buttonLabelSending: "送信中",
	buttonLabelUseful: "役に立った",
	buttonLabelModifyReq: "修正依頼",
	buttonLabelEdit: "編集",
	buttonLabelDelete: "削除",
	buttonLabelClose: "閉じる",
	buttonLabelIsRead: "既読にする",
	columnLabelPreview: "プレビュー",
	iconLabelCreateNotification: "新規お知らせ",
	iconLabelTag: "タグ追加",
	iconLabelAddFaq: "FAQ追加",
	iconLabelImportFaq: "一括登録",
	iconLabelTerm: "用語集",
	headerLabelCreateNotification: "新規お知らせ"
});