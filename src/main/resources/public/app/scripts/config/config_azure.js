/**
 * Azure接続時用コンフィグファイル
 * @type {String}
 */
angular.module(appName).constant('APP_CONF', {
	urlBase: 'http://hhfactory.japanwest.cloudapp.azure.com:8080/newton/',
	imageFolderPath: 'http://hhfactory.japanwest.cloudapp.azure.com:8080/app/images/',
	columnTitleFaq: "FAQ",
	columnTitleImportFaq: "FAQ一括登録",
	columnTitleNotification: "お知らせ",
	columnTitleManual: "マニュアル",
	labelImportance: "重要度",
	buttonLabelCreateNotification: "新しいお知らせを登録する",
	buttonLabelSubmit: "登録",
	buttonLabelUpdate: "更新",
	buttonLabelSend: "送信",
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