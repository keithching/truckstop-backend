# 継続的デリバリー スプリント

[Google ドキュメント：継続的デリバリー スプリント](https://docs.google.com/document/d/e/2PACX-1vQVtp9n9MrKClksKOnvqW7MoHBgnIS4gGwgFH2hTTXcTwmwTugWFR4iWbr_HCrv9dyNnLT-HzCqlp_s/pub)

[Heroku CD パイプラインの補足ノート](https://docs.google.com/document/d/e/2PACX-1vRwv9ewl2uP6zDSiDu55JDBZUrVu9Tpialw_prIACSdaWD-HTmAckx3gLJ8UKLMXrbAewccLvNAtbLG/pub)

プロジェクトインセプションのミーティング

- [EN](https://www.infoq.com/articles/project-inception-meeting/)
- [JA](https://www.infoq.com/jp/articles/project-inception-meeting/?itm_source=infoq_en&itm_medium=link_on_en_item&itm_campaign=item_in_other_langs)

## ⚠️ Heroku セットアップに関する注意事項 ⚠️

Heroku 上にデプロイしたアプリケーションが Heroku Postgres データベースに接続するためには、SSLで通信を行う必要があります。
そのため、Heroku の環境変数に下記の設定を追加して、SSL通信を有効にしてください。

```
PGSSLMODE=no-verify
```

データベース接続時にクエリパラメータをデータベースURLに追加して、SSL通信を有効にする方法もあります。
詳しくは下記のドキュメントをご覧ください。

- [Connecting to Heroku Postgres Databases from Outside of Heroku](https://devcenter.heroku.com/articles/connecting-to-heroku-postgres-databases-from-outside-of-heroku#ssl)
- [Connecting in Node.js](https://devcenter.heroku.com/articles/heroku-postgresql#connecting-in-node-js)