Frontend Starter Kit
====================

- node.js >= 12.0.0
- npm >= 6.14.9

## Setup
```
npm install
npm run dev
npm start
```

## Scripts
- `start` 開発開始（監視）
- `dev` ビルド（開発）
- `stg` ビルド（ステージング）
- `prd` ビルド（本番）
- `lint` ソースチェック
- `sharePage` シェア用ダミーページ作成
- `data` ページ作成用のjsonデータをGoogleスプレッドシートから作成

## Style design
[FLOCSS](https://github.com/hiloki/flocss)をベースに設計しています。  
Block、Element、Modifierはそれぞれ`_`、`-`で接続します。
```
Block_Element
Block_Element-Modifier
```
独自ルールとして各ページでのみ使用するstyleについては  
プレフィックスをつけず各ページclassのセレクタを用います。
```
.page-id {
  .title {}
}
```

## JavaScript design
ES2016をベースとします。  
ライブラリはWebpackに含めず`libs.js`にまとめます。  
まとめるライブラリは`config.js`の`paths.script.libs`で設定します。  
ビルド時、Prettierによりコードを整形します。

## JavaScript document
[JSDoc 3](https://github.com/jsdoc3/jsdoc)を使用しています。  
ローカルサーバ起動時は`${contentPath}/doc/jsdoc/`で確認できます。

## Mock
APIや画像のダミーは`/src/mock/`以下を利用します。
（ビルドファイルに不要なファイルを含めないようにするためです。）
`/dummy/`以下をリクエストした場合`/src/mock/assets/`以下がレスポンスされます。
`/api/`以下をリクエストした場合`/src/mock/apiServer.js`で設定した内容がレスポンスされます。

## Static file
`.htaccess`など静的ファイルは`/src/static/`以下へ保存します。
`/src/static/`以下はディレクトリごと`/dist/`へコピーされます。

## Share page
シェアに利用するリダイレクトするだけのページを作成します。
テンプレートファイルは`/src/views/parts/_shareTemplate.ejs`です。
設定ファイルは`/src/views/_share_page_list.js`です。

### data script
以下の手順で事前にGoogle Sheets APIを利用可能にしてください。（初回のみ）

1. [Google Developers Console](https://console.developers.google.com/flows/enableapi?apiid=sheets.googleapis.com&hl=ja)へアクセスしプロジェクトの選択もしくは作成し 「続行」→「認証情報に進む」とクリックします。  
   （作成する場合は任意のプロジェクト名でOKです）
2. 「プロジェクトに資格情報を追加」ページで、「キャンセル」をクリックします。
3. 「認証情報を作成」プルダウンで「OAuth クライアント ID」を選択し、次の画面で「同意画面を設定」をクリックします。
4. 「メールアドレス」を自身のGoogleアカウント、「ユーザーに表示するサービス名」を任意（**ページ作成用など）に入力し「保存」をクリックします。
5. 「アプリケーションの種類」は「その他」を選択し、「名前」は任意（**ページ作成用など）に入力し「作成」をクリックします。
6. 認証情報ページで5で入力した名前の右にあるダウンロードをクリックしJSONファイルをダウンロードします。
7. ダウンロードしたJSONファイルを`./tools/client_secret.json`へ保存します。
8. コマンド`npm run data`を実行します。
9. CLIに「Authorize this app by visiting this url:: ...」と表示されるのでアクセスし、アカウントを選択後、「許可」をクリックします。  
   表示されるコードをCLIへ入力してください。入力後`./tools/credentials.json`ファイルが作成されます。

[Node.js Quickstart | Sheets API](https://developers.google.com/sheets/api/quickstart/nodejs?hl=ja)

## Thanks
- [ohagip](https://github.com/ohagip/)
