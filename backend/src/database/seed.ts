import db, { initDb } from './db';

interface VocabEntry {
  japanese: string;
  hiragana: string;
  romaji: string;
  german: string;
  category: string;
  example_jp?: string;
  example_de?: string;
}

const vocabulary: VocabEntry[] = [

  // ═══════════════════════════════════════════════════════
  // WEGBESCHREIBUNG
  // ═══════════════════════════════════════════════════════
  { japanese: 'すみません', hiragana: 'すみません', romaji: 'Sumimasen', german: 'Entschuldigung', category: 'Wegbeschreibung', example_jp: 'すみません、駅はどこですか？', example_de: 'Entschuldigung, wo ist der Bahnhof?' },
  { japanese: 'どこ', hiragana: 'どこ', romaji: 'Doko', german: 'wo', category: 'Wegbeschreibung', example_jp: 'トイレはどこですか？', example_de: 'Wo ist die Toilette?' },
  { japanese: '右', hiragana: 'みぎ', romaji: 'Migi', german: 'rechts', category: 'Wegbeschreibung', example_jp: '右に曲がってください。', example_de: 'Bitte biegen Sie rechts ab.' },
  { japanese: '左', hiragana: 'ひだり', romaji: 'Hidari', german: 'links', category: 'Wegbeschreibung', example_jp: '左に曲がります。', example_de: 'Ich biege links ab.' },
  { japanese: 'まっすぐ', hiragana: 'まっすぐ', romaji: 'Massugu', german: 'geradeaus', category: 'Wegbeschreibung', example_jp: 'まっすぐ行ってください。', example_de: 'Bitte gehen Sie geradeaus.' },
  { japanese: '前', hiragana: 'まえ', romaji: 'Mae', german: 'vorne / vor', category: 'Wegbeschreibung', example_jp: '駅の前にあります。', example_de: 'Es ist vor dem Bahnhof.' },
  { japanese: '後ろ', hiragana: 'うしろ', romaji: 'Ushiro', german: 'hinten / hinter', category: 'Wegbeschreibung', example_jp: '後ろを見てください。', example_de: 'Bitte schauen Sie nach hinten.' },
  { japanese: '交差点', hiragana: 'こうさてん', romaji: 'Kousaten', german: 'Kreuzung', category: 'Wegbeschreibung', example_jp: '交差点を右に曲がります。', example_de: 'An der Kreuzung biege ich rechts ab.' },
  { japanese: '角', hiragana: 'かど', romaji: 'Kado', german: 'Ecke', category: 'Wegbeschreibung', example_jp: '角を左に曲がります。', example_de: 'An der Ecke biege ich links ab.' },
  { japanese: '信号', hiragana: 'しんごう', romaji: 'Shingou', german: 'Ampel', category: 'Wegbeschreibung', example_jp: '信号を渡ります。', example_de: 'Ich überquere die Ampel.' },
  { japanese: '道', hiragana: 'みち', romaji: 'Michi', german: 'Straße / Weg', category: 'Wegbeschreibung', example_jp: 'この道を行ってください。', example_de: 'Bitte gehen Sie diese Straße entlang.' },
  { japanese: '地図', hiragana: 'ちず', romaji: 'Chizu', german: 'Karte / Stadtplan', category: 'Wegbeschreibung', example_jp: '地図を見てください。', example_de: 'Bitte schauen Sie auf die Karte.' },
  { japanese: '近い', hiragana: 'ちかい', romaji: 'Chikai', german: 'nah / in der Nähe', category: 'Wegbeschreibung', example_jp: '駅は近いです。', example_de: 'Der Bahnhof ist nah.' },
  { japanese: '遠い', hiragana: 'とおい', romaji: 'Tooi', german: 'weit / entfernt', category: 'Wegbeschreibung', example_jp: '学校は遠いです。', example_de: 'Die Schule ist weit.' },
  { japanese: '駅', hiragana: 'えき', romaji: 'Eki', german: 'Bahnhof', category: 'Wegbeschreibung', example_jp: '駅はどこですか？', example_de: 'Wo ist der Bahnhof?' },
  { japanese: '出口', hiragana: 'でぐち', romaji: 'Deguchi', german: 'Ausgang', category: 'Wegbeschreibung', example_jp: '出口はどこですか？', example_de: 'Wo ist der Ausgang?' },
  { japanese: '入口', hiragana: 'いりぐち', romaji: 'Iriguchi', german: 'Eingang', category: 'Wegbeschreibung', example_jp: '入口はあそこです。', example_de: 'Der Eingang ist dort drüben.' },
  { japanese: 'バス停', hiragana: 'バスてい', romaji: 'Basu-tei', german: 'Bushaltestelle', category: 'Wegbeschreibung', example_jp: 'バス停はどこですか？', example_de: 'Wo ist die Bushaltestelle?' },
  { japanese: '曲がる', hiragana: 'まがる', romaji: 'Magaru', german: 'abbiegen', category: 'Wegbeschreibung', example_jp: '右に曲がります。', example_de: 'Ich biege rechts ab.' },
  { japanese: '渡る', hiragana: 'わたる', romaji: 'Wataru', german: 'überqueren', category: 'Wegbeschreibung', example_jp: '道を渡ります。', example_de: 'Ich überquere die Straße.' },
  { japanese: '歩く', hiragana: 'あるく', romaji: 'Aruku', german: 'Zu Fuß gehen', category: 'Wegbeschreibung', example_jp: '駅まで歩きます。', example_de: 'Ich gehe zum Bahnhof zu Fuß.' },
  { japanese: '〜分かかります', hiragana: 'ふんかかります', romaji: '~fun kakarimasu', german: 'Es dauert ~ Minuten', category: 'Wegbeschreibung', example_jp: '五分かかります。', example_de: 'Es dauert fünf Minuten.' },
  { japanese: '分かりません', hiragana: 'わかりません', romaji: 'Wakarimasen', german: 'Ich weiß es nicht', category: 'Wegbeschreibung', example_jp: '道が分かりません。', example_de: 'Ich kenne den Weg nicht.' },
  { japanese: 'この辺', hiragana: 'このへん', romaji: 'Kono hen', german: 'In dieser Gegend', category: 'Wegbeschreibung', example_jp: 'この辺に店がありますか？', example_de: 'Gibt es hier in der Gegend ein Geschäft?' },
  { japanese: '〜の前', hiragana: 'のまえ', romaji: '~no mae', german: 'Vor ~', category: 'Wegbeschreibung', example_jp: '駅の前に来てください。', example_de: 'Bitte kommen Sie vor den Bahnhof.' },
  { japanese: '〜の隣', hiragana: 'のとなり', romaji: '~no tonari', german: 'Neben ~', category: 'Wegbeschreibung', example_jp: '銀行の隣にあります。', example_de: 'Es ist neben der Bank.' },
  { japanese: '地下鉄', hiragana: 'ちかてつ', romaji: 'Chikatetsu', german: 'U-Bahn', category: 'Wegbeschreibung', example_jp: '地下鉄で行きます。', example_de: 'Ich fahre mit der U-Bahn.' },
  { japanese: 'タクシー', hiragana: 'タクシー', romaji: 'Takushii', german: 'Taxi', category: 'Wegbeschreibung', example_jp: 'タクシーに乗ります。', example_de: 'Ich steige in ein Taxi ein.' },
  { japanese: 'すみません、〜はどこですか？', hiragana: 'すみません、〜はどこですか？', romaji: 'Sumimasen, ~ wa doko desu ka?', german: 'Entschuldigung, wo ist ~?', category: 'Wegbeschreibung', example_jp: 'すみません、駅はどこですか？', example_de: 'Entschuldigung, wo ist der Bahnhof?' },
  { japanese: 'まっすぐ行ってください。', hiragana: 'まっすぐいってください。', romaji: 'Massugu itte kudasai.', german: 'Bitte gehen Sie geradeaus.', category: 'Wegbeschreibung', example_jp: 'まっすぐ行ってください。', example_de: 'Bitte gehen Sie geradeaus.' },
  { japanese: '左に曲がってください。', hiragana: 'ひだりにまがってください。', romaji: 'Hidari ni magatte kudasai.', german: 'Bitte biegen Sie links ab.', category: 'Wegbeschreibung', example_jp: '左に曲がってください。', example_de: 'Bitte biegen Sie links ab.' },
  { japanese: 'ここから歩いて五分です。', hiragana: 'ここからあるいてごふんです。', romaji: 'Koko kara aruite gofun desu.', german: 'Von hier aus sind es fünf Minuten zu Fuß.', category: 'Wegbeschreibung', example_jp: 'ここから歩いて五分です。', example_de: 'Von hier aus sind es fünf Minuten zu Fuß.' },
  { japanese: '駅はこの近くにありますか？', hiragana: 'えきはこのちかくにありますか？', romaji: 'Eki wa kono chikaku ni arimasu ka?', german: 'Ist der Bahnhof in der Nähe?', category: 'Wegbeschreibung', example_jp: '駅はこの近くにありますか？', example_de: 'Ist der Bahnhof in der Nähe?' },
  { japanese: 'すみません、道に迷いました。', hiragana: 'すみません、みちにまよいました。', romaji: 'Sumimasen, michi ni mayoimashita.', german: 'Entschuldigung, ich habe mich verlaufen.', category: 'Wegbeschreibung', example_jp: 'すみません、道に迷いました。', example_de: 'Entschuldigung, ich habe mich verlaufen.' },

  // ═══════════════════════════════════════════════════════
  // RESTAURANT
  // ═══════════════════════════════════════════════════════
  { japanese: 'レストラン', hiragana: 'レストラン', romaji: 'Resutoran', german: 'Restaurant', category: 'Restaurant', example_jp: 'レストランで食べます。', example_de: 'Ich esse im Restaurant.' },
  { japanese: '食堂', hiragana: 'しょくどう', romaji: 'Shokudou', german: 'Speisesaal / Kantine', category: 'Restaurant', example_jp: '食堂でご飯を食べます。', example_de: 'Ich esse in der Kantine.' },
  { japanese: '席', hiragana: 'せき', romaji: 'Seki', german: 'Platz / Sitzplatz', category: 'Restaurant', example_jp: '席はありますか？', example_de: 'Gibt es einen freien Platz?' },
  { japanese: 'メニュー', hiragana: 'メニュー', romaji: 'Menyuu', german: 'Menü / Speisekarte', category: 'Restaurant', example_jp: 'メニューをください。', example_de: 'Bitte geben Sie mir die Speisekarte.' },
  { japanese: '注文', hiragana: 'ちゅうもん', romaji: 'Chuumon', german: 'Bestellung', category: 'Restaurant', example_jp: '注文をします。', example_de: 'Ich gebe eine Bestellung auf.' },
  { japanese: 'お会計', hiragana: 'おかいけい', romaji: 'Okaikei', german: 'Rechnung', category: 'Restaurant', example_jp: 'お会計をください。', example_de: 'Bitte die Rechnung.' },
  { japanese: '予約', hiragana: 'よやく', romaji: 'Yoyaku', german: 'Reservierung', category: 'Restaurant', example_jp: '予約をしています。', example_de: 'Ich habe eine Reservierung.' },
  { japanese: 'お箸', hiragana: 'おはし', romaji: 'Ohashi', german: 'Stäbchen', category: 'Restaurant', example_jp: 'お箸を使います。', example_de: 'Ich benutze Stäbchen.' },
  { japanese: 'スプーン', hiragana: 'スプーン', romaji: 'Supuun', german: 'Löffel', category: 'Restaurant', example_jp: 'スプーンをください。', example_de: 'Bitte geben Sie mir einen Löffel.' },
  { japanese: 'フォーク', hiragana: 'フォーク', romaji: 'Fooku', german: 'Gabel', category: 'Restaurant', example_jp: 'フォークはありますか？', example_de: 'Haben Sie eine Gabel?' },
  { japanese: 'すし', hiragana: 'すし', romaji: 'Sushi', german: 'Sushi', category: 'Restaurant', example_jp: 'すしを食べます。', example_de: 'Ich esse Sushi.' },
  { japanese: 'ラーメン', hiragana: 'ラーメン', romaji: 'Raamen', german: 'Ramen (Nudelsuppe)', category: 'Restaurant', example_jp: 'ラーメンを食べます。', example_de: 'Ich esse Ramen.' },
  { japanese: 'うどん', hiragana: 'うどん', romaji: 'Udon', german: 'Udon-Nudeln', category: 'Restaurant', example_jp: 'うどんが好きです。', example_de: 'Ich mag Udon-Nudeln.' },
  { japanese: 'そば', hiragana: 'そば', romaji: 'Soba', german: 'Buchweizennudeln', category: 'Restaurant', example_jp: 'そばを食べます。', example_de: 'Ich esse Soba.' },
  { japanese: '天ぷら', hiragana: 'てんぷら', romaji: 'Tenpura', german: 'Tempura', category: 'Restaurant', example_jp: '天ぷらはおいしいです。', example_de: 'Tempura ist lecker.' },
  { japanese: 'カレー', hiragana: 'カレー', romaji: 'Karee', german: 'Curry', category: 'Restaurant', example_jp: 'カレーを食べます。', example_de: 'Ich esse Curry.' },
  { japanese: '刺身', hiragana: 'さしみ', romaji: 'Sashimi', german: 'Sashimi (roher Fisch)', category: 'Restaurant', example_jp: '刺身が好きです。', example_de: 'Ich mag Sashimi.' },
  { japanese: '餃子', hiragana: 'ぎょうざ', romaji: 'Gyouza', german: 'Gyoza (Teigtaschen)', category: 'Restaurant', example_jp: '餃子を食べます。', example_de: 'Ich esse Gyoza.' },
  { japanese: 'ご飯', hiragana: 'ごはん', romaji: 'Gohan', german: 'Reis / Mahlzeit', category: 'Restaurant', example_jp: 'ご飯を食べます。', example_de: 'Ich esse Reis.' },
  { japanese: 'パン', hiragana: 'パン', romaji: 'Pan', german: 'Brot', category: 'Restaurant', example_jp: 'パンを食べます。', example_de: 'Ich esse Brot.' },
  { japanese: '肉', hiragana: 'にく', romaji: 'Niku', german: 'Fleisch', category: 'Restaurant', example_jp: '肉が好きです。', example_de: 'Ich mag Fleisch.' },
  { japanese: '魚', hiragana: 'さかな', romaji: 'Sakana', german: 'Fisch', category: 'Restaurant', example_jp: '魚を食べます。', example_de: 'Ich esse Fisch.' },
  { japanese: '野菜', hiragana: 'やさい', romaji: 'Yasai', german: 'Gemüse', category: 'Restaurant', example_jp: '野菜を食べます。', example_de: 'Ich esse Gemüse.' },
  { japanese: '卵', hiragana: 'たまご', romaji: 'Tamago', german: 'Ei', category: 'Restaurant', example_jp: '卵を食べます。', example_de: 'Ich esse ein Ei.' },
  { japanese: 'お水', hiragana: 'おみず', romaji: 'Omizu', german: 'Wasser', category: 'Restaurant', example_jp: 'お水をください。', example_de: 'Bitte geben Sie mir Wasser.' },
  { japanese: 'お茶', hiragana: 'おちゃ', romaji: 'Ocha', german: 'Tee', category: 'Restaurant', example_jp: 'お茶を飲みます。', example_de: 'Ich trinke Tee.' },
  { japanese: 'コーヒー', hiragana: 'コーヒー', romaji: 'Koohii', german: 'Kaffee', category: 'Restaurant', example_jp: 'コーヒーを飲みます。', example_de: 'Ich trinke Kaffee.' },
  { japanese: 'ビール', hiragana: 'ビール', romaji: 'Biiru', german: 'Bier', category: 'Restaurant', example_jp: 'ビールを飲みます。', example_de: 'Ich trinke Bier.' },
  { japanese: 'ジュース', hiragana: 'ジュース', romaji: 'Juusu', german: 'Saft', category: 'Restaurant', example_jp: 'ジュースを飲みます。', example_de: 'Ich trinke Saft.' },
  { japanese: 'おいしい', hiragana: 'おいしい', romaji: 'Oishii', german: 'lecker / köstlich', category: 'Restaurant', example_jp: 'この料理はおいしいです。', example_de: 'Dieses Gericht ist lecker.' },
  { japanese: '辛い', hiragana: 'からい', romaji: 'Karai', german: 'scharf (Geschmack)', category: 'Restaurant', example_jp: 'カレーは辛いです。', example_de: 'Das Curry ist scharf.' },
  { japanese: '甘い', hiragana: 'あまい', romaji: 'Amai', german: 'süß', category: 'Restaurant', example_jp: 'ケーキは甘いです。', example_de: 'Der Kuchen ist süß.' },
  { japanese: '熱い', hiragana: 'あつい', romaji: 'Atsui', german: 'heiß (Speise/Getränk)', category: 'Restaurant', example_jp: 'お茶は熱いです。', example_de: 'Der Tee ist heiß.' },
  { japanese: '冷たい', hiragana: 'つめたい', romaji: 'Tsumetai', german: 'kalt (Speise/Getränk)', category: 'Restaurant', example_jp: '水は冷たいです。', example_de: 'Das Wasser ist kalt.' },
  { japanese: '食べる', hiragana: 'たべる', romaji: 'Taberu', german: 'essen', category: 'Restaurant', example_jp: 'ご飯を食べる。', example_de: 'Ich esse Reis.' },
  { japanese: '飲む', hiragana: 'のむ', romaji: 'Nomu', german: 'trinken', category: 'Restaurant', example_jp: '水を飲む。', example_de: 'Ich trinke Wasser.' },
  { japanese: '一人です。席はありますか？', hiragana: 'ひとりです。せきはありますか？', romaji: 'Hitori desu. Seki wa arimasu ka?', german: 'Ich bin allein. Gibt es einen Platz?', category: 'Restaurant', example_jp: '一人です。席はありますか？', example_de: 'Ich bin allein. Gibt es einen Platz?' },
  { japanese: '〜をください。', hiragana: 'をください', romaji: '~ wo kudasai.', german: 'Geben Sie mir bitte ~.', category: 'Restaurant', example_jp: 'お水をください。', example_de: 'Bitte geben Sie mir Wasser.' },
  { japanese: 'お会計をお願いします。', hiragana: 'おかいけいをおねがいします。', romaji: 'Okaikei wo onegaishimasu.', german: 'Die Rechnung bitte.', category: 'Restaurant', example_jp: 'お会計をお願いします。', example_de: 'Die Rechnung bitte.' },
  { japanese: 'これはとてもおいしいです！', hiragana: 'これはとてもおいしいです！', romaji: 'Kore wa totemo oishii desu!', german: 'Das ist sehr lecker!', category: 'Restaurant', example_jp: 'これはとてもおいしいです！', example_de: 'Das ist sehr lecker!' },
  { japanese: 'アレルギーがあります。', hiragana: 'アレルギーがあります。', romaji: 'Arerugii ga arimasu.', german: 'Ich habe eine Allergie.', category: 'Restaurant', example_jp: 'アレルギーがあります。', example_de: 'Ich habe eine Allergie.' },

  // ═══════════════════════════════════════════════════════
  // EINKAUFEN
  // ═══════════════════════════════════════════════════════
  { japanese: '店', hiragana: 'みせ', romaji: 'Mise', german: 'Geschäft / Laden', category: 'Einkaufen', example_jp: 'あの店に行きます。', example_de: 'Ich gehe zu jenem Laden.' },
  { japanese: 'スーパー', hiragana: 'スーパー', romaji: 'Suupaa', german: 'Supermarkt', category: 'Einkaufen', example_jp: 'スーパーで買います。', example_de: 'Ich kaufe im Supermarkt.' },
  { japanese: 'デパート', hiragana: 'デパート', romaji: 'Depaato', german: 'Kaufhaus', category: 'Einkaufen', example_jp: 'デパートに行きます。', example_de: 'Ich gehe ins Kaufhaus.' },
  { japanese: 'コンビニ', hiragana: 'コンビニ', romaji: 'Konbini', german: 'Convenience Store', category: 'Einkaufen', example_jp: 'コンビニで買います。', example_de: 'Ich kaufe im Convenience Store.' },
  { japanese: '値段', hiragana: 'ねだん', romaji: 'Nedan', german: 'Preis', category: 'Einkaufen', example_jp: '値段はいくらですか？', example_de: 'Was ist der Preis?' },
  { japanese: 'お金', hiragana: 'おかね', romaji: 'Okane', german: 'Geld', category: 'Einkaufen', example_jp: 'お金がありません。', example_de: 'Ich habe kein Geld.' },
  { japanese: '円', hiragana: 'えん', romaji: 'En', german: 'Yen', category: 'Einkaufen', example_jp: '百円です。', example_de: 'Es kostet hundert Yen.' },
  { japanese: '高い', hiragana: 'たかい', romaji: 'Takai', german: 'teuer', category: 'Einkaufen', example_jp: 'この服は高いです。', example_de: 'Diese Kleidung ist teuer.' },
  { japanese: '安い', hiragana: 'やすい', romaji: 'Yasui', german: 'günstig / billig', category: 'Einkaufen', example_jp: 'この店は安いです。', example_de: 'Dieser Laden ist günstig.' },
  { japanese: '大きい', hiragana: 'おおきい', romaji: 'Ookii', german: 'groß', category: 'Einkaufen', example_jp: 'この bag は大きいです。', example_de: 'Diese Tasche ist groß.' },
  { japanese: '小さい', hiragana: 'ちいさい', romaji: 'Chiisai', german: 'klein', category: 'Einkaufen', example_jp: 'もっと小さいですか？', example_de: 'Haben Sie etwas Kleineres?' },
  { japanese: '買う', hiragana: 'かう', romaji: 'Kau', german: 'kaufen', category: 'Einkaufen', example_jp: '服を買います。', example_de: 'Ich kaufe Kleidung.' },
  { japanese: '売る', hiragana: 'うる', romaji: 'Uru', german: 'verkaufen', category: 'Einkaufen', example_jp: '本を売ります。', example_de: 'Ich verkaufe ein Buch.' },
  { japanese: '払う', hiragana: 'はらう', romaji: 'Harau', german: 'bezahlen', category: 'Einkaufen', example_jp: 'お金を払います。', example_de: 'Ich bezahle.' },
  { japanese: '探す', hiragana: 'さがす', romaji: 'Sagasu', german: 'suchen', category: 'Einkaufen', example_jp: '赤い服を探します。', example_de: 'Ich suche rote Kleidung.' },
  { japanese: 'レシート', hiragana: 'レシート', romaji: 'Reshiito', german: 'Kassenbon / Quittung', category: 'Einkaufen', example_jp: 'レシートをください。', example_de: 'Bitte geben Sie mir den Kassenbon.' },
  { japanese: '袋', hiragana: 'ふくろ', romaji: 'Fukuro', german: 'Beutel / Tüte', category: 'Einkaufen', example_jp: '袋をください。', example_de: 'Bitte geben Sie mir eine Tüte.' },
  { japanese: 'セール', hiragana: 'セール', romaji: 'Seeru', german: 'Schlussverkauf / Sale', category: 'Einkaufen', example_jp: 'セールをしています。', example_de: 'Es findet ein Sale statt.' },
  { japanese: '赤', hiragana: 'あか', romaji: 'Aka', german: 'rot', category: 'Einkaufen', example_jp: '赤い服が好きです。', example_de: 'Ich mag rote Kleidung.' },
  { japanese: '青', hiragana: 'あお', romaji: 'Ao', german: 'blau', category: 'Einkaufen', example_jp: '青いシャツはありますか？', example_de: 'Haben Sie ein blaues Hemd?' },
  { japanese: '白', hiragana: 'しろ', romaji: 'Shiro', german: 'weiß', category: 'Einkaufen', example_jp: '白い服を買います。', example_de: 'Ich kaufe weiße Kleidung.' },
  { japanese: '黒', hiragana: 'くろ', romaji: 'Kuro', german: 'schwarz', category: 'Einkaufen', example_jp: '黒いバッグです。', example_de: 'Es ist eine schwarze Tasche.' },
  { japanese: '黄色', hiragana: 'きいろ', romaji: 'Kiiro', german: 'gelb', category: 'Einkaufen', example_jp: '黄色い花があります。', example_de: 'Es gibt gelbe Blumen.' },
  { japanese: '緑', hiragana: 'みどり', romaji: 'Midori', german: 'grün', category: 'Einkaufen', example_jp: '緑のシャツです。', example_de: 'Es ist ein grünes Hemd.' },
  { japanese: 'これはいくらですか？', hiragana: 'これはいくらですか？', romaji: 'Kore wa ikura desu ka?', german: 'Wie viel kostet das?', category: 'Einkaufen', example_jp: 'これはいくらですか？', example_de: 'Wie viel kostet das?' },
  { japanese: '〜はありますか？', hiragana: 'はありますか？', romaji: '~ wa arimasu ka?', german: 'Haben Sie ~?', category: 'Einkaufen', example_jp: '青いシャツはありますか？', example_de: 'Haben Sie ein blaues Hemd?' },
  { japanese: 'カードで払えますか？', hiragana: 'カードではらえますか？', romaji: 'Kaado de haraemasu ka?', german: 'Kann ich mit Karte bezahlen?', category: 'Einkaufen', example_jp: 'カードで払えますか？', example_de: 'Kann ich mit Karte bezahlen?' },
  { japanese: 'ちょっと考えます。', hiragana: 'ちょっとかんがえます。', romaji: 'Chotto kangaemasu.', german: 'Ich überlege es mir kurz.', category: 'Einkaufen', example_jp: 'ちょっと考えます。', example_de: 'Ich überlege es mir kurz.' },
  { japanese: 'これをください。', hiragana: 'これをください。', romaji: 'Kore wo kudasai.', german: 'Das hier bitte.', category: 'Einkaufen', example_jp: 'これをください。', example_de: 'Das hier bitte.' },

  // ═══════════════════════════════════════════════════════
  // KENNENLERNEN
  // ═══════════════════════════════════════════════════════
  { japanese: 'はじめまして', hiragana: 'はじめまして', romaji: 'Hajimemashite', german: 'Schön, Sie kennenzulernen', category: 'Kennenlernen', example_jp: 'はじめまして、田中です。', example_de: 'Schön, Sie kennenzulernen. Ich bin Tanaka.' },
  { japanese: 'よろしくお願いします', hiragana: 'よろしくおねがいします', romaji: 'Yoroshiku onegaishimasu', german: 'Freut mich (höflich)', category: 'Kennenlernen', example_jp: 'よろしくお願いします。', example_de: 'Freut mich, Sie kennenzulernen.' },
  { japanese: '名前', hiragana: 'なまえ', romaji: 'Namae', german: 'Name', category: 'Kennenlernen', example_jp: '名前は何ですか？', example_de: 'Wie ist Ihr Name?' },
  { japanese: '国', hiragana: 'くに', romaji: 'Kuni', german: 'Land / Heimatland', category: 'Kennenlernen', example_jp: 'どの国から来ましたか？', example_de: 'Aus welchem Land kommen Sie?' },
  { japanese: '日本', hiragana: 'にほん', romaji: 'Nihon', german: 'Japan', category: 'Kennenlernen', example_jp: '日本に住んでいます。', example_de: 'Ich wohne in Japan.' },
  { japanese: 'ドイツ', hiragana: 'ドイツ', romaji: 'Doitsu', german: 'Deutschland', category: 'Kennenlernen', example_jp: 'ドイツから来ました。', example_de: 'Ich komme aus Deutschland.' },
  { japanese: '仕事', hiragana: 'しごと', romaji: 'Shigoto', german: 'Arbeit / Beruf', category: 'Kennenlernen', example_jp: '仕事は何ですか？', example_de: 'Was ist Ihr Beruf?' },
  { japanese: '会社員', hiragana: 'かいしゃいん', romaji: 'Kaishain', german: 'Angestellter', category: 'Kennenlernen', example_jp: '私は会社員です。', example_de: 'Ich bin Angestellter.' },
  { japanese: '学生', hiragana: 'がくせい', romaji: 'Gakusei', german: 'Student / Schüler', category: 'Kennenlernen', example_jp: '私は学生です。', example_de: 'Ich bin Student.' },
  { japanese: '先生', hiragana: 'せんせい', romaji: 'Sensei', german: 'Lehrer / Sensei', category: 'Kennenlernen', example_jp: '先生は親切だ。', example_de: 'Der Lehrer ist freundlich.' },
  { japanese: '年齢', hiragana: 'ねんれい', romaji: 'Nenrei', german: 'Alter', category: 'Kennenlernen', example_jp: '年齢はいくつですか？', example_de: 'Wie alt sind Sie?' },
  { japanese: '〜歳', hiragana: 'さい', romaji: '~sai', german: '~ Jahre alt', category: 'Kennenlernen', example_jp: '二十歳です。', example_de: 'Ich bin zwanzig Jahre alt.' },
  { japanese: '趣味', hiragana: 'しゅみ', romaji: 'Shumi', german: 'Hobby', category: 'Kennenlernen', example_jp: '趣味は何ですか？', example_de: 'Was sind Ihre Hobbys?' },
  { japanese: '住む', hiragana: 'すむ', romaji: 'Sumu', german: 'wohnen / leben', category: 'Kennenlernen', example_jp: '東京に住んでいます。', example_de: 'Ich wohne in Tokio.' },
  { japanese: '来る', hiragana: 'くる', romaji: 'Kuru', german: 'kommen', category: 'Kennenlernen', example_jp: '友達が来ます。', example_de: 'Ein Freund kommt.' },
  { japanese: 'どちらから', hiragana: 'どちらから', romaji: 'Dochira kara', german: 'Woher (höflich)', category: 'Kennenlernen', example_jp: 'どちらからですか？', example_de: 'Woher kommen Sie?' },
  { japanese: 'ありがとうございます', hiragana: 'ありがとうございます', romaji: 'Arigatou gozaimasu', german: 'Vielen Dank', category: 'Kennenlernen', example_jp: 'ありがとうございます。', example_de: 'Vielen Dank.' },
  { japanese: 'どうぞ', hiragana: 'どうぞ', romaji: 'Douzo', german: 'Bitte / Hier bitte', category: 'Kennenlernen', example_jp: 'どうぞ、座ってください。', example_de: 'Bitte, setzen Sie sich.' },
  { japanese: 'そうです', hiragana: 'そうです', romaji: 'Sou desu', german: 'Ja, genau / Das stimmt', category: 'Kennenlernen', example_jp: 'そうです、学生です。', example_de: 'Ja, genau, ich bin Student.' },
  { japanese: '違います', hiragana: 'ちがいます', romaji: 'Chigaimasu', german: 'Das ist falsch / Nein', category: 'Kennenlernen', example_jp: '違います、私は先生です。', example_de: 'Nein, ich bin Lehrer.' },
  { japanese: 'もう一度', hiragana: 'もういちど', romaji: 'Mou ichido', german: 'Noch einmal', category: 'Kennenlernen', example_jp: 'もう一度言ってください。', example_de: 'Bitte sagen Sie das noch einmal.' },
  { japanese: 'ゆっくり', hiragana: 'ゆっくり', romaji: 'Yukkuri', german: 'langsam', category: 'Kennenlernen', example_jp: 'ゆっくり話してください。', example_de: 'Bitte sprechen Sie langsam.' },
  { japanese: '日本語', hiragana: 'にほんご', romaji: 'Nihongo', german: 'Japanisch (Sprache)', category: 'Kennenlernen', example_jp: '日本語を話します。', example_de: 'Ich spreche Japanisch.' },
  { japanese: 'お名前は何ですか？', hiragana: 'おなまえはなんですか？', romaji: 'Onamae wa nan desu ka?', german: 'Wie heißen Sie?', category: 'Kennenlernen', example_jp: 'お名前は何ですか？', example_de: 'Wie heißen Sie?' },
  { japanese: 'どちらからですか？', hiragana: 'どちらからですか？', romaji: 'Dochira kara desu ka?', german: 'Woher kommen Sie?', category: 'Kennenlernen', example_jp: 'どちらからですか？', example_de: 'Woher kommen Sie?' },
  { japanese: 'お仕事は何ですか？', hiragana: 'おしごとはなんですか？', romaji: 'Oshigoto wa nan desu ka?', german: 'Was machen Sie beruflich?', category: 'Kennenlernen', example_jp: 'お仕事は何ですか？', example_de: 'Was machen Sie beruflich?' },
  { japanese: 'ドイツから来ました。', hiragana: 'ドイツからきました。', romaji: 'Doitsu kara kimashita.', german: 'Ich komme aus Deutschland.', category: 'Kennenlernen', example_jp: 'ドイツから来ました。', example_de: 'Ich komme aus Deutschland.' },
  { japanese: '日本語を少し話せます。', hiragana: 'にほんごをすこしはなせます。', romaji: 'Nihongo wo sukoshi hanasemasu.', german: 'Ich spreche ein bisschen Japanisch.', category: 'Kennenlernen', example_jp: '日本語を少し話せます。', example_de: 'Ich spreche ein bisschen Japanisch.' },

  // ═══════════════════════════════════════════════════════
  // MUSEUM
  // ═══════════════════════════════════════════════════════
  { japanese: '博物館', hiragana: 'はくぶつかん', romaji: 'Hakubutsukan', german: 'Museum', category: 'Museum', example_jp: '博物館に行きます。', example_de: 'Ich gehe ins Museum.' },
  { japanese: '美術館', hiragana: 'びじゅつかん', romaji: 'Bijutsukan', german: 'Kunstmuseum', category: 'Museum', example_jp: '美術館に行きます。', example_de: 'Ich gehe ins Kunstmuseum.' },
  { japanese: 'チケット', hiragana: 'チケット', romaji: 'Chiketto', german: 'Ticket / Eintrittskarte', category: 'Museum', example_jp: 'チケットを買います。', example_de: 'Ich kaufe ein Ticket.' },
  { japanese: '入場料', hiragana: 'にゅうじょうりょう', romaji: 'Nyuujouryou', german: 'Eintrittspreis', category: 'Museum', example_jp: '入場料はいくらですか？', example_de: 'Wie viel kostet der Eintritt?' },
  { japanese: '大人', hiragana: 'おとな', romaji: 'Otona', german: 'Erwachsener', category: 'Museum', example_jp: '大人一枚ください。', example_de: 'Ein Erwachsenenticket bitte.' },
  { japanese: '子供', hiragana: 'こども', romaji: 'Kodomo', german: 'Kind', category: 'Museum', example_jp: '子供は無料ですか？', example_de: 'Ist es für Kinder kostenlos?' },
  { japanese: '写真', hiragana: 'しゃしん', romaji: 'Shashin', german: 'Foto', category: 'Museum', example_jp: '写真を撮ります。', example_de: 'Ich mache ein Foto.' },
  { japanese: '禁止', hiragana: 'きんし', romaji: 'Kinshi', german: 'verboten', category: 'Museum', example_jp: '写真禁止です。', example_de: 'Fotografieren ist verboten.' },
  { japanese: '展示', hiragana: 'てんじ', romaji: 'Tenji', german: 'Ausstellung', category: 'Museum', example_jp: '展示を見ます。', example_de: 'Ich schaue mir die Ausstellung an.' },
  { japanese: '案内', hiragana: 'あんない', romaji: 'Annai', german: 'Führung / Information', category: 'Museum', example_jp: '案内をください。', example_de: 'Bitte geben Sie mir Informationen.' },
  { japanese: 'パンフレット', hiragana: 'パンフレット', romaji: 'Panfuretto', german: 'Broschüre / Flyer', category: 'Museum', example_jp: 'パンフレットはありますか？', example_de: 'Haben Sie eine Broschüre?' },
  { japanese: 'トイレ', hiragana: 'トイレ', romaji: 'Toire', german: 'Toilette', category: 'Museum', example_jp: 'トイレはどこですか？', example_de: 'Wo ist die Toilette?' },
  { japanese: '開く', hiragana: 'あく', romaji: 'Aku', german: 'öffnen / geöffnet sein', category: 'Museum', example_jp: '今、開いていますか？', example_de: 'Ist es jetzt geöffnet?' },
  { japanese: '閉まる', hiragana: 'しまる', romaji: 'Shimaru', german: 'schließen / geschlossen sein', category: 'Museum', example_jp: '今日は閉まっています。', example_de: 'Heute ist es geschlossen.' },
  { japanese: '面白い', hiragana: 'おもしろい', romaji: 'Omoshiroi', german: 'interessant', category: 'Museum', example_jp: 'この展示は面白いです。', example_de: 'Diese Ausstellung ist interessant.' },
  { japanese: '素晴らしい', hiragana: 'すばらしい', romaji: 'Subarashii', german: 'wunderbar / großartig', category: 'Museum', example_jp: 'この絵は素晴らしいです。', example_de: 'Dieses Bild ist wunderbar.' },
  { japanese: '何時まで', hiragana: 'なんじまで', romaji: 'Nanji made', german: 'Bis wie viel Uhr', category: 'Museum', example_jp: '何時まで開いていますか？', example_de: 'Bis wie viel Uhr haben Sie geöffnet?' },
  { japanese: 'チケットを一枚ください。', hiragana: 'チケットをいちまいください。', romaji: 'Chiketto wo ichimai kudasai.', german: 'Ein Ticket bitte.', category: 'Museum', example_jp: 'チケットを一枚ください。', example_de: 'Ein Ticket bitte.' },
  { japanese: '大人二枚お願いします。', hiragana: 'おとなにまいおねがいします。', romaji: 'Otona nimai onegaishimasu.', german: 'Zwei Erwachsenentickets bitte.', category: 'Museum', example_jp: '大人二枚お願いします。', example_de: 'Zwei Erwachsenentickets bitte.' },
  { japanese: '写真を撮ってもいいですか？', hiragana: 'しゃしんをとってもいいですか？', romaji: 'Shashin wo totte mo ii desu ka?', german: 'Darf ich fotografieren?', category: 'Museum', example_jp: '写真を撮ってもいいですか？', example_de: 'Darf ich fotografieren?' },
  { japanese: '何時まで開いていますか？', hiragana: 'なんじまであいていますか？', romaji: 'Nanji made aite imasu ka?', german: 'Bis wie viel Uhr haben Sie geöffnet?', category: 'Museum', example_jp: '何時まで開いていますか？', example_de: 'Bis wie viel Uhr haben Sie geöffnet?' },

  // ═══════════════════════════════════════════════════════
  // HOTEL
  // ═══════════════════════════════════════════════════════
  { japanese: 'ホテル', hiragana: 'ホテル', romaji: 'Hoteru', german: 'Hotel', category: 'Hotel', example_jp: 'ホテルに泊まります。', example_de: 'Ich übernachte im Hotel.' },
  { japanese: '旅館', hiragana: 'りょかん', romaji: 'Ryokan', german: 'Japanisches Gasthaus', category: 'Hotel', example_jp: '旅館に泊まります。', example_de: 'Ich übernachte im Ryokan.' },
  { japanese: '部屋', hiragana: 'へや', romaji: 'Heya', german: 'Zimmer', category: 'Hotel', example_jp: '部屋はきれいです。', example_de: 'Das Zimmer ist schön.' },
  { japanese: 'チェックイン', hiragana: 'チェックイン', romaji: 'Chekkuin', german: 'Check-in', category: 'Hotel', example_jp: 'チェックインをします。', example_de: 'Ich checke ein.' },
  { japanese: 'チェックアウト', hiragana: 'チェックアウト', romaji: 'Chekkuauto', german: 'Check-out', category: 'Hotel', example_jp: 'チェックアウトします。', example_de: 'Ich checke aus.' },
  { japanese: '予約', hiragana: 'よやく', romaji: 'Yoyaku', german: 'Reservierung / Buchung', category: 'Hotel', example_jp: '予約をしています。', example_de: 'Ich habe eine Reservierung.' },
  { japanese: '鍵', hiragana: 'かぎ', romaji: 'Kagi', german: 'Schlüssel', category: 'Hotel', example_jp: '鍵をください。', example_de: 'Bitte geben Sie mir den Schlüssel.' },
  { japanese: '朝食', hiragana: 'ちょうしょく', romaji: 'Choushoku', german: 'Frühstück', category: 'Hotel', example_jp: '朝食を食べます。', example_de: 'Ich esse Frühstück.' },
  { japanese: 'フロント', hiragana: 'フロント', romaji: 'Furonto', german: 'Rezeption', category: 'Hotel', example_jp: 'フロントに行きます。', example_de: 'Ich gehe zur Rezeption.' },
  { japanese: 'エレベーター', hiragana: 'エレベーター', romaji: 'Erebeetaa', german: 'Aufzug', category: 'Hotel', example_jp: 'エレベーターに乗ります。', example_de: 'Ich fahre mit dem Aufzug.' },
  { japanese: '一泊', hiragana: 'いっぱく', romaji: 'Ippaku', german: 'Eine Nacht', category: 'Hotel', example_jp: '一泊します。', example_de: 'Ich übernachte eine Nacht.' },
  { japanese: 'シャワー', hiragana: 'シャワー', romaji: 'Shawaa', german: 'Dusche', category: 'Hotel', example_jp: 'シャワーを浴びます。', example_de: 'Ich dusche.' },
  { japanese: 'タオル', hiragana: 'タオル', romaji: 'Taoru', german: 'Handtuch', category: 'Hotel', example_jp: 'タオルをください。', example_de: 'Bitte geben Sie mir ein Handtuch.' },
  { japanese: '静か', hiragana: 'しずか', romaji: 'Shizuka', german: 'ruhig', category: 'Hotel', example_jp: '部屋は静かです。', example_de: 'Das Zimmer ist ruhig.' },
  { japanese: '広い', hiragana: 'ひろい', romaji: 'Hiroi', german: 'geräumig / weit', category: 'Hotel', example_jp: '部屋は広いです。', example_de: 'Das Zimmer ist geräumig.' },
  { japanese: '泊まる', hiragana: 'とまる', romaji: 'Tomaru', german: 'übernachten', category: 'Hotel', example_jp: 'ホテルに泊まります。', example_de: 'Ich übernachte im Hotel.' },
  { japanese: 'チェックインをお願いします。', hiragana: 'チェックインをおねがいします。', romaji: 'Chekkuin wo onegaishimasu.', german: 'Ich möchte einchecken.', category: 'Hotel', example_jp: 'チェックインをお願いします。', example_de: 'Ich möchte einchecken.' },
  { japanese: '〜という名前で予約しています。', hiragana: 'というなまえでよやくしています。', romaji: '~ to iu namae de yoyaku shite imasu.', german: 'Ich habe eine Reservierung unter dem Namen ~.', category: 'Hotel', example_jp: '田中という名前で予約しています。', example_de: 'Ich habe eine Reservierung unter dem Namen Tanaka.' },
  { japanese: '朝食は何時ですか？', hiragana: 'ちょうしょくはなんじですか？', romaji: 'Choushoku wa nanji desu ka?', german: 'Um wie viel Uhr ist das Frühstück?', category: 'Hotel', example_jp: '朝食は何時ですか？', example_de: 'Um wie viel Uhr ist das Frühstück?' },
  { japanese: '鍵をなくしました。', hiragana: 'かぎをなくしました。', romaji: 'Kagi wo nakushimashita.', german: 'Ich habe meinen Schlüssel verloren.', category: 'Hotel', example_jp: '鍵をなくしました。', example_de: 'Ich habe meinen Schlüssel verloren.' },
  { japanese: '一泊いくらですか？', hiragana: 'いっぱくいくらですか？', romaji: 'Ippaku ikura desu ka?', german: 'Was kostet eine Nacht?', category: 'Hotel', example_jp: '一泊いくらですか？', example_de: 'Was kostet eine Nacht?' },

  // ═══════════════════════════════════════════════════════
  // FLUGHAFEN
  // ═══════════════════════════════════════════════════════
  { japanese: '空港', hiragana: 'くうこう', romaji: 'Kuukou', german: 'Flughafen', category: 'Flughafen', example_jp: '空港に行きます。', example_de: 'Ich gehe zum Flughafen.' },
  { japanese: '飛行機', hiragana: 'ひこうき', romaji: 'Hikouki', german: 'Flugzeug', category: 'Flughafen', example_jp: '飛行機に乗ります。', example_de: 'Ich steige ins Flugzeug ein.' },
  { japanese: 'パスポート', hiragana: 'パスポート', romaji: 'Pasupooto', german: 'Reisepass', category: 'Flughafen', example_jp: 'パスポートを見せます。', example_de: 'Ich zeige meinen Pass.' },
  { japanese: '搭乗券', hiragana: 'とうじょうけん', romaji: 'Toujouken', german: 'Bordkarte', category: 'Flughafen', example_jp: '搭乗券を持っています。', example_de: 'Ich habe die Bordkarte.' },
  { japanese: '荷物', hiragana: 'にもつ', romaji: 'Nimotsu', german: 'Gepäck', category: 'Flughafen', example_jp: '荷物は重いです。', example_de: 'Das Gepäck ist schwer.' },
  { japanese: '手荷物', hiragana: 'てにもつ', romaji: 'Tenimotsu', german: 'Handgepäck', category: 'Flughafen', example_jp: '手荷物はここです。', example_de: 'Das Handgepäck ist hier.' },
  { japanese: '出発', hiragana: 'しゅっぱつ', romaji: 'Shuppatsu', german: 'Abflug / Abfahrt', category: 'Flughafen', example_jp: '出発は何時ですか？', example_de: 'Um wie viel Uhr ist der Abflug?' },
  { japanese: '到着', hiragana: 'とうちゃく', romaji: 'Touchaku', german: 'Ankunft', category: 'Flughafen', example_jp: '到着は何時ですか？', example_de: 'Um wie viel Uhr ist die Ankunft?' },
  { japanese: 'ゲート', hiragana: 'ゲート', romaji: 'Geeto', german: 'Gate', category: 'Flughafen', example_jp: 'ゲートはどこですか？', example_de: 'Wo ist das Gate?' },
  { japanese: '税関', hiragana: 'ぜいかん', romaji: 'Zeikan', german: 'Zoll', category: 'Flughafen', example_jp: '税関に行きます。', example_de: 'Ich gehe zum Zoll.' },
  { japanese: '乗り継ぎ', hiragana: 'のりつぎ', romaji: 'Noritsugi', german: 'Umstieg / Transit', category: 'Flughafen', example_jp: '乗り継ぎがあります。', example_de: 'Ich habe einen Umstieg.' },
  { japanese: '遅延', hiragana: 'ちえん', romaji: 'Chien', german: 'Verspätung', category: 'Flughafen', example_jp: '遅延があります。', example_de: 'Es gibt eine Verspätung.' },
  { japanese: '乗る', hiragana: 'のる', romaji: 'Noru', german: 'einsteigen / nehmen', category: 'Flughafen', example_jp: '飛行機に乗ります。', example_de: 'Ich steige ins Flugzeug ein.' },
  { japanese: '降りる', hiragana: 'おりる', romaji: 'Oriru', german: 'aussteigen', category: 'Flughafen', example_jp: '飛行機から降ります。', example_de: 'Ich steige aus dem Flugzeug aus.' },
  { japanese: '確認する', hiragana: 'かくにんする', romaji: 'Kakunin suru', german: 'bestätigen / überprüfen', category: 'Flughafen', example_jp: 'チケットを確認します。', example_de: 'Ich überprüfe das Ticket.' },
  { japanese: 'パスポートを見せてください。', hiragana: 'パスポートをみせてください。', romaji: 'Pasupooto wo misete kudasai.', german: 'Zeigen Sie bitte Ihren Pass.', category: 'Flughafen', example_jp: 'パスポートを見せてください。', example_de: 'Zeigen Sie bitte Ihren Pass.' },
  { japanese: '何番ゲートですか？', hiragana: 'なんばんゲートですか？', romaji: 'Nanban geeto desu ka?', german: 'Welches Gate ist es?', category: 'Flughafen', example_jp: '何番ゲートですか？', example_de: 'Welches Gate ist es?' },
  { japanese: '荷物を預けてください。', hiragana: 'にもつをあずけてください。', romaji: 'Nimotsu wo azukete kudasai.', german: 'Bitte geben Sie Ihr Gepäck auf.', category: 'Flughafen', example_jp: '荷物を預けてください。', example_de: 'Bitte geben Sie Ihr Gepäck auf.' },
  { japanese: 'フライトは遅延しています。', hiragana: 'フライトはちえんしています。', romaji: 'Furaito wa chien shite imasu.', german: 'Der Flug hat Verspätung.', category: 'Flughafen', example_jp: 'フライトは遅延しています。', example_de: 'Der Flug hat Verspätung.' },
  { japanese: '搭乗は何時ですか？', hiragana: 'とうじょうはなんじですか？', romaji: 'Toujou wa nanji desu ka?', german: 'Um wie viel Uhr ist das Boarding?', category: 'Flughafen', example_jp: '搭乗は何時ですか？', example_de: 'Um wie viel Uhr ist das Boarding?' },

  // ═══════════════════════════════════════════════════════
  // BAHNHOF
  // ═══════════════════════════════════════════════════════
  { japanese: '駅', hiragana: 'えき', romaji: 'Eki', german: 'Bahnhof', category: 'Bahnhof', example_jp: '駅に行きます。', example_de: 'Ich gehe zum Bahnhof.' },
  { japanese: '電車', hiragana: 'でんしゃ', romaji: 'Densha', german: 'Zug / U-Bahn', category: 'Bahnhof', example_jp: '電車に乗ります。', example_de: 'Ich fahre mit dem Zug.' },
  { japanese: '切符', hiragana: 'きっぷ', romaji: 'Kippu', german: 'Fahrkarte / Ticket', category: 'Bahnhof', example_jp: '切符を買います。', example_de: 'Ich kaufe eine Fahrkarte.' },
  { japanese: 'ホーム', hiragana: 'ホーム', romaji: 'Hoomu', german: 'Bahnsteig', category: 'Bahnhof', example_jp: 'ホームはどこですか？', example_de: 'Wo ist der Bahnsteig?' },
  { japanese: '乗り換え', hiragana: 'のりかえ', romaji: 'Norikae', german: 'Umstieg / Umsteigen', category: 'Bahnhof', example_jp: '乗り換えがあります。', example_de: 'Es gibt einen Umstieg.' },
  { japanese: '急行', hiragana: 'きゅうこう', romaji: 'Kyuukou', german: 'Schnellzug / Express', category: 'Bahnhof', example_jp: '急行に乗ります。', example_de: 'Ich fahre mit dem Schnellzug.' },
  { japanese: '普通', hiragana: 'ふつう', romaji: 'Futsuu', german: 'Nahverkehrszug / Normal', category: 'Bahnhof', example_jp: '普通電車に乗ります。', example_de: 'Ich fahre mit dem Nahverkehrszug.' },
  { japanese: '新幹線', hiragana: 'しんかんせん', romaji: 'Shinkansen', german: 'Shinkansen (Hochgeschwindigkeitszug)', category: 'Bahnhof', example_jp: '新幹線に乗ります。', example_de: 'Ich fahre mit dem Shinkansen.' },
  { japanese: '終電', hiragana: 'しゅうでん', romaji: 'Shuuden', german: 'Letzter Zug', category: 'Bahnhof', example_jp: '終電は何時ですか？', example_de: 'Wann fährt der letzte Zug?' },
  { japanese: '〜行き', hiragana: 'ゆき', romaji: '~yuki', german: 'Richtung ~ / nach ~', category: 'Bahnhof', example_jp: '東京行きです。', example_de: 'Es geht nach Tokio.' },
  { japanese: '改札', hiragana: 'かいさつ', romaji: 'Kaisatsu', german: 'Sperre / Ticketkontrolle', category: 'Bahnhof', example_jp: '改札を出ます。', example_de: 'Ich verlasse die Sperre.' },
  { japanese: '路線', hiragana: 'ろせん', romaji: 'Rosen', german: 'Linie / Strecke', category: 'Bahnhof', example_jp: 'この路線に乗ります。', example_de: 'Ich fahre auf dieser Linie.' },
  { japanese: '待つ', hiragana: 'まつ', romaji: 'Matsu', german: 'warten', category: 'Bahnhof', example_jp: '電車を待ちます。', example_de: 'Ich warte auf den Zug.' },
  { japanese: '乗る', hiragana: 'のる', romaji: 'Noru', german: 'einsteigen', category: 'Bahnhof', example_jp: '電車に乗ります。', example_de: 'Ich steige in den Zug ein.' },
  { japanese: '降りる', hiragana: 'おりる', romaji: 'Oriru', german: 'aussteigen', category: 'Bahnhof', example_jp: '次の駅で降ります。', example_de: 'Ich steige an der nächsten Station aus.' },
  { japanese: '〜まで切符を一枚ください。', hiragana: 'まできっぷをいちまいください。', romaji: '~ made kippu wo ichimai kudasai.', german: 'Eine Fahrkarte nach ~ bitte.', category: 'Bahnhof', example_jp: '東京まで切符を一枚ください。', example_de: 'Eine Fahrkarte nach Tokio bitte.' },
  { japanese: '何番ホームですか？', hiragana: 'なんばんホームですか？', romaji: 'Nanban hoomu desu ka?', german: 'Welcher Bahnsteig ist es?', category: 'Bahnhof', example_jp: '何番ホームですか？', example_de: 'Welcher Bahnsteig ist es?' },
  { japanese: '次の電車は何時ですか？', hiragana: 'つぎのでんしゃはなんじですか？', romaji: 'Tsugi no densha wa nanji desu ka?', german: 'Wann kommt der nächste Zug?', category: 'Bahnhof', example_jp: '次の電車は何時ですか？', example_de: 'Wann kommt der nächste Zug?' },
  { japanese: 'この電車は〜に止まりますか？', hiragana: 'このでんしゃはにとまりますか？', romaji: 'Kono densha wa ~ ni tomarimasu ka?', german: 'Hält dieser Zug in ~?', category: 'Bahnhof', example_jp: 'この電車は東京に止まりますか？', example_de: 'Hält dieser Zug in Tokio?' },
  { japanese: 'どこで乗り換えますか？', hiragana: 'どこでのりかえますか？', romaji: 'Doko de norikaemasu ka?', german: 'Wo muss ich umsteigen?', category: 'Bahnhof', example_jp: 'どこで乗り換えますか？', example_de: 'Wo muss ich umsteigen?' },

  // ═══════════════════════════════════════════════════════
  // KLEIDUNG
  // ═══════════════════════════════════════════════════════
  { japanese: 'シャツ', hiragana: 'シャツ', romaji: 'Shatsu', german: 'Hemd / Shirt', category: 'Kleidung', example_jp: '白いシャツを着ます。', example_de: 'Ich ziehe ein weißes Hemd an.' },
  { japanese: 'Tシャツ', hiragana: 'ティーシャツ', romaji: 'Tii-shatsu', german: 'T-Shirt', category: 'Kleidung', example_jp: 'TシャツはМサイズです。', example_de: 'Das T-Shirt ist Größe M.' },
  { japanese: 'ズボン', hiragana: 'ズボン', romaji: 'Zubon', german: 'Hose', category: 'Kleidung', example_jp: '黒いズボンを履きます。', example_de: 'Ich ziehe eine schwarze Hose an.' },
  { japanese: 'スカート', hiragana: 'スカート', romaji: 'Sukaato', german: 'Rock', category: 'Kleidung', example_jp: '青いスカートが好きです。', example_de: 'Ich mag den blauen Rock.' },
  { japanese: 'ドレス', hiragana: 'ドレス', romaji: 'Doresu', german: 'Kleid', category: 'Kleidung', example_jp: '赤いドレスを着ます。', example_de: 'Ich ziehe ein rotes Kleid an.' },
  { japanese: 'コート', hiragana: 'コート', romaji: 'Kooto', german: 'Mantel', category: 'Kleidung', example_jp: 'コートを着ます。', example_de: 'Ich ziehe einen Mantel an.' },
  { japanese: 'ジャケット', hiragana: 'ジャケット', romaji: 'Jaketto', german: 'Jacke', category: 'Kleidung', example_jp: 'ジャケットを着ます。', example_de: 'Ich ziehe eine Jacke an.' },
  { japanese: 'セーター', hiragana: 'セーター', romaji: 'Seetaa', german: 'Pullover / Strickjacke', category: 'Kleidung', example_jp: 'セーターを着ます。', example_de: 'Ich ziehe einen Pullover an.' },
  { japanese: '靴', hiragana: 'くつ', romaji: 'Kutsu', german: 'Schuhe', category: 'Kleidung', example_jp: '靴を履きます。', example_de: 'Ich ziehe Schuhe an.' },
  { japanese: '靴下', hiragana: 'くつした', romaji: 'Kutsushita', german: 'Socken', category: 'Kleidung', example_jp: '白い靴下を履きます。', example_de: 'Ich ziehe weiße Socken an.' },
  { japanese: '帽子', hiragana: 'ぼうし', romaji: 'Boushi', german: 'Hut / Mütze', category: 'Kleidung', example_jp: '帽子をかぶります。', example_de: 'Ich setze einen Hut auf.' },
  { japanese: 'バッグ', hiragana: 'バッグ', romaji: 'Baggu', german: 'Tasche', category: 'Kleidung', example_jp: '黒いバッグを買います。', example_de: 'Ich kaufe eine schwarze Tasche.' },
  { japanese: '手袋', hiragana: 'てぶくろ', romaji: 'Tebukuro', german: 'Handschuhe', category: 'Kleidung', example_jp: '手袋をします。', example_de: 'Ich ziehe Handschuhe an.' },
  { japanese: 'マフラー', hiragana: 'マフラー', romaji: 'Mafuraa', german: 'Schal', category: 'Kleidung', example_jp: 'マフラーをします。', example_de: 'Ich trage einen Schal.' },
  { japanese: 'サイズ', hiragana: 'サイズ', romaji: 'Saizu', german: 'Größe', category: 'Kleidung', example_jp: 'サイズはМです。', example_de: 'Die Größe ist M.' },
  { japanese: '着る', hiragana: 'きる', romaji: 'Kiru', german: 'anziehen (Oberteil)', category: 'Kleidung', example_jp: 'シャツを着ます。', example_de: 'Ich ziehe ein Hemd an.' },
  { japanese: '履く', hiragana: 'はく', romaji: 'Haku', german: 'anziehen (Hose/Schuhe)', category: 'Kleidung', example_jp: '靴を履きます。', example_de: 'Ich ziehe Schuhe an.' },
  { japanese: '脱ぐ', hiragana: 'ぬぐ', romaji: 'Nugu', german: 'ausziehen', category: 'Kleidung', example_jp: 'コートを脱ぎます。', example_de: 'Ich ziehe den Mantel aus.' },
  { japanese: '似合う', hiragana: 'にあう', romaji: 'Niau', german: 'stehen / gut passen', category: 'Kleidung', example_jp: 'その服が似合います。', example_de: 'Diese Kleidung steht Ihnen gut.' },
  { japanese: '茶色', hiragana: 'ちゃいろ', romaji: 'Chairo', german: 'braun', category: 'Kleidung', example_jp: '茶色い靴があります。', example_de: 'Es gibt braune Schuhe.' },
  { japanese: 'ピンク', hiragana: 'ピンク', romaji: 'Pinku', german: 'rosa / pink', category: 'Kleidung', example_jp: 'ピンクの服が好きです。', example_de: 'Ich mag rosa Kleidung.' },
  { japanese: '紫', hiragana: 'むらさき', romaji: 'Murasaki', german: 'lila / violett', category: 'Kleidung', example_jp: '紫のドレスです。', example_de: 'Es ist ein lilafarbenes Kleid.' },
  { japanese: '試着してもいいですか？', hiragana: 'しちゃくしてもいいですか？', romaji: 'Shichaku shite mo ii desu ka?', german: 'Darf ich das anprobieren?', category: 'Kleidung', example_jp: '試着してもいいですか？', example_de: 'Darf ich das anprobieren?' },
  { japanese: 'Mサイズはありますか？', hiragana: 'えむサイズはありますか？', romaji: 'Emu saizu wa arimasu ka?', german: 'Haben Sie das in Größe M?', category: 'Kleidung', example_jp: 'Мサイズはありますか？', example_de: 'Haben Sie das in Größe M?' },
  { japanese: 'ちょっと大きすぎます。', hiragana: 'ちょっとおおきすぎます。', romaji: 'Chotto ooki sugimasu.', german: 'Es ist etwas zu groß.', category: 'Kleidung', example_jp: 'ちょっと大きすぎます。', example_de: 'Es ist etwas zu groß.' },
  { japanese: 'この色が好きです。', hiragana: 'このいろがすきです。', romaji: 'Kono iro ga suki desu.', german: 'Diese Farbe gefällt mir.', category: 'Kleidung', example_jp: 'この色が好きです。', example_de: 'Diese Farbe gefällt mir.' },

  // ═══════════════════════════════════════════════════════
  // ARZT
  // ═══════════════════════════════════════════════════════
  { japanese: '病院', hiragana: 'びょういん', romaji: 'Byouin', german: 'Krankenhaus', category: 'Arzt', example_jp: '病院に行きます。', example_de: 'Ich gehe ins Krankenhaus.' },
  { japanese: '医者', hiragana: 'いしゃ', romaji: 'Isha', german: 'Arzt', category: 'Arzt', example_jp: '医者に見せます。', example_de: 'Ich gehe zum Arzt.' },
  { japanese: '看護師', hiragana: 'かんごし', romaji: 'Kangoshi', german: 'Krankenschwester / Pfleger', category: 'Arzt', example_jp: '看護師が来ます。', example_de: 'Die Krankenschwester kommt.' },
  { japanese: '薬', hiragana: 'くすり', romaji: 'Kusuri', german: 'Medizin / Arznei', category: 'Arzt', example_jp: '薬を飲みます。', example_de: 'Ich nehme Medizin.' },
  { japanese: '頭', hiragana: 'あたま', romaji: 'Atama', german: 'Kopf', category: 'Arzt', example_jp: '頭が痛いです。', example_de: 'Ich habe Kopfschmerzen.' },
  { japanese: '目', hiragana: 'め', romaji: 'Me', german: 'Auge', category: 'Arzt', example_jp: '目が痛いです。', example_de: 'Mein Auge tut weh.' },
  { japanese: '耳', hiragana: 'みみ', romaji: 'Mimi', german: 'Ohr', category: 'Arzt', example_jp: '耳が痛いです。', example_de: 'Mein Ohr tut weh.' },
  { japanese: '鼻', hiragana: 'はな', romaji: 'Hana', german: 'Nase', category: 'Arzt', example_jp: '鼻水が出ます。', example_de: 'Meine Nase läuft.' },
  { japanese: '口', hiragana: 'くち', romaji: 'Kuchi', german: 'Mund', category: 'Arzt', example_jp: '口を開けてください。', example_de: 'Bitte öffnen Sie den Mund.' },
  { japanese: '歯', hiragana: 'は', romaji: 'Ha', german: 'Zahn', category: 'Arzt', example_jp: '歯が痛いです。', example_de: 'Ich habe Zahnschmerzen.' },
  { japanese: '首', hiragana: 'くび', romaji: 'Kubi', german: 'Hals / Nacken', category: 'Arzt', example_jp: '首が痛いです。', example_de: 'Mein Hals tut weh.' },
  { japanese: '肩', hiragana: 'かた', romaji: 'Kata', german: 'Schulter', category: 'Arzt', example_jp: '肩が痛いです。', example_de: 'Meine Schulter tut weh.' },
  { japanese: 'お腹', hiragana: 'おなか', romaji: 'Onaka', german: 'Bauch', category: 'Arzt', example_jp: 'お腹が痛いです。', example_de: 'Ich habe Bauchschmerzen.' },
  { japanese: '背中', hiragana: 'せなか', romaji: 'Senaka', german: 'Rücken', category: 'Arzt', example_jp: '背中が痛いです。', example_de: 'Mein Rücken tut weh.' },
  { japanese: '足', hiragana: 'あし', romaji: 'Ashi', german: 'Fuß / Bein', category: 'Arzt', example_jp: '足が痛いです。', example_de: 'Mein Fuß tut weh.' },
  { japanese: '手', hiragana: 'て', romaji: 'Te', german: 'Hand', category: 'Arzt', example_jp: '手を洗います。', example_de: 'Ich wasche meine Hände.' },
  { japanese: '痛い', hiragana: 'いたい', romaji: 'Itai', german: 'schmerzhaft / es tut weh', category: 'Arzt', example_jp: '頭が痛いです。', example_de: 'Ich habe Kopfschmerzen.' },
  { japanese: '熱', hiragana: 'ねつ', romaji: 'Netsu', german: 'Fieber', category: 'Arzt', example_jp: '熱があります。', example_de: 'Ich habe Fieber.' },
  { japanese: '風邪', hiragana: 'かぜ', romaji: 'Kaze', german: 'Erkältung', category: 'Arzt', example_jp: '風邪をひきました。', example_de: 'Ich habe mich erkältet.' },
  { japanese: '咳', hiragana: 'せき', romaji: 'Seki', german: 'Husten', category: 'Arzt', example_jp: '咳が出ます。', example_de: 'Ich huste.' },
  { japanese: '鼻水', hiragana: 'はなみず', romaji: 'Hanamizu', german: 'Schnupfen / Laufende Nase', category: 'Arzt', example_jp: '鼻水が出ます。', example_de: 'Meine Nase läuft.' },
  { japanese: '頭痛', hiragana: 'ずつう', romaji: 'Zutsuu', german: 'Kopfschmerzen', category: 'Arzt', example_jp: '頭痛があります。', example_de: 'Ich habe Kopfschmerzen.' },
  { japanese: '腹痛', hiragana: 'ふくつう', romaji: 'Fukutsuu', german: 'Bauchschmerzen', category: 'Arzt', example_jp: '腹痛があります。', example_de: 'Ich habe Bauchschmerzen.' },
  { japanese: '保険', hiragana: 'ほけん', romaji: 'Hoken', german: 'Versicherung', category: 'Arzt', example_jp: '保険がありますか？', example_de: 'Haben Sie eine Versicherung?' },
  { japanese: '救急', hiragana: 'きゅうきゅう', romaji: 'Kyuukyuu', german: 'Notfall / Erste Hilfe', category: 'Arzt', example_jp: '救急を呼んでください。', example_de: 'Rufen Sie bitte den Notarzt.' },
  { japanese: '治る', hiragana: 'なおる', romaji: 'Naoru', german: 'gesund werden / heilen', category: 'Arzt', example_jp: '早く治ります。', example_de: 'Ich werde schnell gesund.' },
  { japanese: '〜が痛いです。', hiragana: 'がいたいです。', romaji: '~ ga itai desu.', german: '~ tut mir weh.', category: 'Arzt', example_jp: '頭が痛いです。', example_de: 'Mein Kopf tut weh.' },
  { japanese: '熱があります。', hiragana: 'ねつがあります。', romaji: 'Netsu ga arimasu.', german: 'Ich habe Fieber.', category: 'Arzt', example_jp: '熱があります。', example_de: 'Ich habe Fieber.' },
  { japanese: '薬をください。', hiragana: 'くすりをください。', romaji: 'Kusuri wo kudasai.', german: 'Geben Sie mir bitte Medizin.', category: 'Arzt', example_jp: '薬をください。', example_de: 'Geben Sie mir bitte Medizin.' },
  { japanese: '保険証はありますか？', hiragana: 'ほけんしょうはありますか？', romaji: 'Hokenshou wa arimasu ka?', german: 'Haben Sie Ihre Versicherungskarte?', category: 'Arzt', example_jp: '保険証はありますか？', example_de: 'Haben Sie Ihre Versicherungskarte?' },
  { japanese: '早く良くなってください。', hiragana: 'はやくよくなってください。', romaji: 'Hayaku yoku natte kudasai.', german: 'Werden Sie schnell wieder gesund.', category: 'Arzt', example_jp: '早く良くなってください。', example_de: 'Werden Sie schnell wieder gesund.' },

  // ═══════════════════════════════════════════════════════
  // SMALLTALK
  // ═══════════════════════════════════════════════════════
  { japanese: 'お元気ですか？', hiragana: 'おげんきですか？', romaji: 'Ogenki desu ka?', german: 'Wie geht es Ihnen?', category: 'Smalltalk', example_jp: 'お元気ですか？', example_de: 'Wie geht es Ihnen?' },
  { japanese: '元気です', hiragana: 'げんきです', romaji: 'Genki desu', german: 'Mir geht es gut', category: 'Smalltalk', example_jp: '元気です、ありがとう。', example_de: 'Mir geht es gut, danke.' },
  { japanese: 'まあまあです', hiragana: 'まあまあです', romaji: 'Maa maa desu', german: 'So lala / Geht so', category: 'Smalltalk', example_jp: 'まあまあです。', example_de: 'Es geht so.' },
  { japanese: '忙しい', hiragana: 'いそがしい', romaji: 'Isogashii', german: 'beschäftigt / busy', category: 'Smalltalk', example_jp: '今日は忙しいです。', example_de: 'Heute bin ich beschäftigt.' },
  { japanese: '暇', hiragana: 'ひま', romaji: 'Hima', german: 'frei / Zeit haben', category: 'Smalltalk', example_jp: '今日は暇です。', example_de: 'Heute habe ich Zeit.' },
  { japanese: '最近', hiragana: 'さいきん', romaji: 'Saikin', german: 'neuerdings / letztens', category: 'Smalltalk', example_jp: '最近どうですか？', example_de: 'Wie geht es Ihnen in letzter Zeit?' },
  { japanese: 'そうですね', hiragana: 'そうですね', romaji: 'Sou desu ne', german: 'Das stimmt / Ja, wirklich', category: 'Smalltalk', example_jp: 'そうですね、そう思います。', example_de: 'Das stimmt, das denke ich auch.' },
  { japanese: '本当に', hiragana: 'ほんとうに', romaji: 'Hontou ni', german: 'wirklich / tatsächlich', category: 'Smalltalk', example_jp: '本当においしいです。', example_de: 'Es ist wirklich lecker.' },
  { japanese: 'なるほど', hiragana: 'なるほど', romaji: 'Naruhodo', german: 'Ach so / Verstehe', category: 'Smalltalk', example_jp: 'なるほど、分かりました。', example_de: 'Ach so, ich verstehe.' },
  { japanese: 'すごい', hiragana: 'すごい', romaji: 'Sugoi', german: 'toll / wow / großartig', category: 'Smalltalk', example_jp: 'すごいですね！', example_de: 'Das ist toll!' },
  { japanese: 'いいですね', hiragana: 'いいですね', romaji: 'Ii desu ne', german: 'Das ist schön / Prima', category: 'Smalltalk', example_jp: 'いいですね！', example_de: 'Das ist schön!' },
  { japanese: '好き', hiragana: 'すき', romaji: 'Suki', german: 'mögen / gefällt mir', category: 'Smalltalk', example_jp: '音楽が好きです。', example_de: 'Ich mag Musik.' },
  { japanese: '嫌い', hiragana: 'きらい', romaji: 'Kirai', german: 'nicht mögen', category: 'Smalltalk', example_jp: '魚が嫌いです。', example_de: 'Ich mag keinen Fisch.' },
  { japanese: '得意', hiragana: 'とくい', romaji: 'Tokui', german: 'gut können / Stärke', category: 'Smalltalk', example_jp: '日本語が得意です。', example_de: 'Ich bin gut in Japanisch.' },
  { japanese: '苦手', hiragana: 'にがて', romaji: 'Nigate', german: 'Schwäche / nicht gut können', category: 'Smalltalk', example_jp: '料理が苦手です。', example_de: 'Ich bin nicht gut im Kochen.' },
  { japanese: '映画', hiragana: 'えいが', romaji: 'Eiga', german: 'Film / Kino', category: 'Smalltalk', example_jp: '映画が好きです。', example_de: 'Ich mag Filme.' },
  { japanese: '音楽', hiragana: 'おんがく', romaji: 'Ongaku', german: 'Musik', category: 'Smalltalk', example_jp: '音楽を聞きます。', example_de: 'Ich höre Musik.' },
  { japanese: '旅行', hiragana: 'りょこう', romaji: 'Ryokou', german: 'Reise', category: 'Smalltalk', example_jp: '旅行が好きです。', example_de: 'Ich mag Reisen.' },
  { japanese: 'スポーツ', hiragana: 'スポーツ', romaji: 'Supootsu', german: 'Sport', category: 'Smalltalk', example_jp: 'スポーツをします。', example_de: 'Ich treibe Sport.' },
  { japanese: '読書', hiragana: 'どくしょ', romaji: 'Dokusho', german: 'Lesen (Hobby)', category: 'Smalltalk', example_jp: '読書が好きです。', example_de: 'Ich lese gerne.' },
  { japanese: '趣味は何ですか？', hiragana: 'しゅみはなんですか？', romaji: 'Shumi wa nan desu ka?', german: 'Was sind Ihre Hobbys?', category: 'Smalltalk', example_jp: '趣味は何ですか？', example_de: 'Was sind Ihre Hobbys?' },
  { japanese: '日本語が上手ですね。', hiragana: 'にほんごがじょうずですね。', romaji: 'Nihongo ga jouzu desu ne.', german: 'Ihr Japanisch ist sehr gut.', category: 'Smalltalk', example_jp: '日本語が上手ですね。', example_de: 'Ihr Japanisch ist sehr gut.' },
  { japanese: '日本は初めてですか？', hiragana: 'にほんははじめてですか？', romaji: 'Nihon wa hajimete desu ka?', german: 'Ist das Ihr erster Besuch in Japan?', category: 'Smalltalk', example_jp: '日本は初めてですか？', example_de: 'Ist das Ihr erster Besuch in Japan?' },
  { japanese: '日本の食べ物は好きですか？', hiragana: 'にほんのたべものはすきですか？', romaji: 'Nihon no tabemono wa suki desu ka?', german: 'Mögen Sie japanisches Essen?', category: 'Smalltalk', example_jp: '日本の食べ物は好きですか？', example_de: 'Mögen Sie japanisches Essen?' },

  // ═══════════════════════════════════════════════════════
  // ZAHLEN
  // ═══════════════════════════════════════════════════════
  { japanese: '零 / ゼロ', hiragana: 'れい / ゼロ', romaji: 'Rei / Zero', german: 'Null', category: 'Zahlen', example_jp: 'ゼロから始めます。', example_de: 'Ich fange bei Null an.' },
  { japanese: '一', hiragana: 'いち', romaji: 'Ichi', german: 'Eins', category: 'Zahlen', example_jp: '一つください。', example_de: 'Bitte geben Sie mir eines.' },
  { japanese: '二', hiragana: 'に', romaji: 'Ni', german: 'Zwei', category: 'Zahlen', example_jp: '二つあります。', example_de: 'Es gibt zwei davon.' },
  { japanese: '三', hiragana: 'さん', romaji: 'San', german: 'Drei', category: 'Zahlen', example_jp: '三人います。', example_de: 'Es sind drei Personen da.' },
  { japanese: '四', hiragana: 'し / よん', romaji: 'Shi / Yon', german: 'Vier', category: 'Zahlen', example_jp: '四時に来ます。', example_de: 'Ich komme um vier Uhr.' },
  { japanese: '五', hiragana: 'ご', romaji: 'Go', german: 'Fünf', category: 'Zahlen', example_jp: '五分かかります。', example_de: 'Es dauert fünf Minuten.' },
  { japanese: '六', hiragana: 'ろく', romaji: 'Roku', german: 'Sechs', category: 'Zahlen', example_jp: '六時に起きます。', example_de: 'Ich stehe um sechs Uhr auf.' },
  { japanese: '七', hiragana: 'しち / なな', romaji: 'Shichi / Nana', german: 'Sieben', category: 'Zahlen', example_jp: '七つあります。', example_de: 'Es gibt sieben davon.' },
  { japanese: '八', hiragana: 'はち', romaji: 'Hachi', german: 'Acht', category: 'Zahlen', example_jp: '八時に寝ます。', example_de: 'Ich gehe um acht Uhr schlafen.' },
  { japanese: '九', hiragana: 'く / きゅう', romaji: 'Ku / Kyuu', german: 'Neun', category: 'Zahlen', example_jp: '九つ食べます。', example_de: 'Ich esse neun davon.' },
  { japanese: '十', hiragana: 'じゅう', romaji: 'Juu', german: 'Zehn', category: 'Zahlen', example_jp: '十人います。', example_de: 'Es sind zehn Personen da.' },
  { japanese: '百', hiragana: 'ひゃく', romaji: 'Hyaku', german: 'Hundert', category: 'Zahlen', example_jp: '百円です。', example_de: 'Es kostet hundert Yen.' },
  { japanese: '千', hiragana: 'せん', romaji: 'Sen', german: 'Tausend', category: 'Zahlen', example_jp: '千円あります。', example_de: 'Ich habe tausend Yen.' },
  { japanese: '万', hiragana: 'まん', romaji: 'Man', german: 'Zehntausend', category: 'Zahlen', example_jp: '一万円です。', example_de: 'Es kostet zehntausend Yen.' },
  { japanese: '〜枚', hiragana: 'まい', romaji: '~mai', german: '~ Stück (flach: Papier, Ticket)', category: 'Zahlen', example_jp: '三枚ください。', example_de: 'Bitte geben Sie mir drei Stück.' },
  { japanese: '〜本', hiragana: 'ほん', romaji: '~hon', german: '~ Stück (lang: Flasche, Stift)', category: 'Zahlen', example_jp: 'ペンを二本買います。', example_de: 'Ich kaufe zwei Stifte.' },
  { japanese: '〜杯', hiragana: 'はい', romaji: '~hai', german: '~ Becher / Gläser', category: 'Zahlen', example_jp: 'コーヒーを一杯飲みます。', example_de: 'Ich trinke eine Tasse Kaffee.' },
  { japanese: '〜匹', hiragana: 'ひき', romaji: '~hiki', german: '~ Tiere (klein)', category: 'Zahlen', example_jp: '猫が二匹います。', example_de: 'Es gibt zwei Katzen.' },
  { japanese: '〜台', hiragana: 'だい', romaji: '~dai', german: '~ Fahrzeuge / Geräte', category: 'Zahlen', example_jp: '車が一台あります。', example_de: 'Es gibt ein Auto.' },
  { japanese: '〜冊', hiragana: 'さつ', romaji: '~satsu', german: '~ Bücher / Hefte', category: 'Zahlen', example_jp: '本を三冊読みます。', example_de: 'Ich lese drei Bücher.' },
  { japanese: '〜人', hiragana: 'にん', romaji: '~nin', german: '~ Personen', category: 'Zahlen', example_jp: '三人で食べます。', example_de: 'Wir essen zu dritt.' },
  { japanese: '〜個', hiragana: 'こ', romaji: '~ko', german: '~ Stück (allgemein)', category: 'Zahlen', example_jp: 'りんごを二個買います。', example_de: 'Ich kaufe zwei Äpfel.' },
  { japanese: 'いくら', hiragana: 'いくら', romaji: 'Ikura', german: 'Wie viel (Geld)', category: 'Zahlen', example_jp: 'いくらですか？', example_de: 'Wie viel kostet das?' },
  { japanese: 'いくつ', hiragana: 'いくつ', romaji: 'Ikutsu', german: 'Wie viele', category: 'Zahlen', example_jp: 'いくつありますか？', example_de: 'Wie viele gibt es?' },
  { japanese: '全部でいくらですか？', hiragana: 'ぜんぶでいくらですか？', romaji: 'Zenbu de ikura desu ka?', german: 'Wie viel kostet das insgesamt?', category: 'Zahlen', example_jp: '全部でいくらですか？', example_de: 'Wie viel kostet das insgesamt?' },
  { japanese: '三枚ください。', hiragana: 'さんまいください。', romaji: 'Sanmai kudasai.', german: 'Drei Stück bitte.', category: 'Zahlen', example_jp: '三枚ください。', example_de: 'Drei Stück bitte.' },

  // ═══════════════════════════════════════════════════════
  // UHRZEIT
  // ═══════════════════════════════════════════════════════
  { japanese: '〜時', hiragana: 'じ', romaji: '~ji', german: '~ Uhr', category: 'Uhrzeit', example_jp: '三時に来ます。', example_de: 'Ich komme um drei Uhr.' },
  { japanese: '〜分', hiragana: 'ふん / ぷん', romaji: '~fun / ~pun', german: '~ Minuten', category: 'Uhrzeit', example_jp: '五分待ってください。', example_de: 'Bitte warten Sie fünf Minuten.' },
  { japanese: '午前', hiragana: 'ごぜん', romaji: 'Gozen', german: 'Vormittag / AM', category: 'Uhrzeit', example_jp: '午前九時に起きます。', example_de: 'Ich stehe um neun Uhr morgens auf.' },
  { japanese: '午後', hiragana: 'ごご', romaji: 'Gogo', german: 'Nachmittag / PM', category: 'Uhrzeit', example_jp: '午後に出かけます。', example_de: 'Ich gehe nachmittags aus.' },
  { japanese: '半', hiragana: 'はん', romaji: 'Han', german: 'Halb (z.B. 3:30)', category: 'Uhrzeit', example_jp: '三時半です。', example_de: 'Es ist halb vier.' },
  { japanese: '今', hiragana: 'いま', romaji: 'Ima', german: 'jetzt', category: 'Uhrzeit', example_jp: '今何時ですか？', example_de: 'Wie viel Uhr ist es jetzt?' },
  { japanese: '朝', hiragana: 'あさ', romaji: 'Asa', german: 'Morgen (Tageszeit)', category: 'Uhrzeit', example_jp: '朝ご飯を食べます。', example_de: 'Ich esse morgens.' },
  { japanese: '昼', hiragana: 'ひる', romaji: 'Hiru', german: 'Mittag', category: 'Uhrzeit', example_jp: '昼に食べます。', example_de: 'Ich esse mittags.' },
  { japanese: '夕方', hiragana: 'ゆうがた', romaji: 'Yuugata', german: 'Abend (früher Abend)', category: 'Uhrzeit', example_jp: '夕方に帰ります。', example_de: 'Ich komme am frühen Abend nach Hause.' },
  { japanese: '夜', hiragana: 'よる', romaji: 'Yoru', german: 'Nacht / Abend', category: 'Uhrzeit', example_jp: '夜に寝ます。', example_de: 'Ich schlafe nachts.' },
  { japanese: '〜時に', hiragana: 'じに', romaji: '~ji ni', german: 'Um ~ Uhr', category: 'Uhrzeit', example_jp: '八時に起きます。', example_de: 'Ich stehe um acht Uhr auf.' },
  { japanese: '〜時ごろ', hiragana: 'じごろ', romaji: '~ji goro', german: 'Gegen ~ Uhr', category: 'Uhrzeit', example_jp: '三時ごろ来ます。', example_de: 'Ich komme gegen drei Uhr.' },
  { japanese: '何時', hiragana: 'なんじ', romaji: 'Nanji', german: 'Wie viel Uhr', category: 'Uhrzeit', example_jp: '何時ですか？', example_de: 'Wie viel Uhr ist es?' },
  { japanese: '今、何時ですか？', hiragana: 'いま、なんじですか？', romaji: 'Ima, nanji desu ka?', german: 'Wie viel Uhr ist es jetzt?', category: 'Uhrzeit', example_jp: '今、何時ですか？', example_de: 'Wie viel Uhr ist es jetzt?' },
  { japanese: '三時半です。', hiragana: 'さんじはんです。', romaji: 'Sanji han desu.', german: 'Es ist halb vier (3:30).', category: 'Uhrzeit', example_jp: '三時半です。', example_de: 'Es ist halb vier (3:30).' },
  { japanese: '午後六時に会いましょう。', hiragana: 'ごごろくじにあいましょう。', romaji: 'Gogo rokuji ni aimashou.', german: 'Treffen wir uns um 18 Uhr.', category: 'Uhrzeit', example_jp: '午後六時に会いましょう。', example_de: 'Treffen wir uns um 18 Uhr.' },

  // ═══════════════════════════════════════════════════════
  // DATUM
  // ═══════════════════════════════════════════════════════
  { japanese: '今日', hiragana: 'きょう', romaji: 'Kyou', german: 'heute', category: 'Datum', example_jp: '今日は月曜日です。', example_de: 'Heute ist Montag.' },
  { japanese: '明日', hiragana: 'あした', romaji: 'Ashita', german: 'morgen', category: 'Datum', example_jp: '明日また来ます。', example_de: 'Ich komme morgen wieder.' },
  { japanese: '昨日', hiragana: 'きのう', romaji: 'Kinou', german: 'Gestern', category: 'Datum', example_jp: '昨日映画を見ました。', example_de: 'Gestern habe ich einen Film geschaut.' },
  { japanese: '今週', hiragana: 'こんしゅう', romaji: 'Konshuu', german: 'Diese Woche', category: 'Datum', example_jp: '今週は忙しいです。', example_de: 'Diese Woche bin ich beschäftigt.' },
  { japanese: '来週', hiragana: 'らいしゅう', romaji: 'Raishuu', german: 'Nächste Woche', category: 'Datum', example_jp: '来週会いましょう。', example_de: 'Treffen wir uns nächste Woche.' },
  { japanese: '先週', hiragana: 'せんしゅう', romaji: 'Senshuu', german: 'Letzte Woche', category: 'Datum', example_jp: '先週日本に来ました。', example_de: 'Letzte Woche bin ich nach Japan gekommen.' },
  { japanese: '今月', hiragana: 'こんげつ', romaji: 'Kongetsu', german: 'Diesen Monat', category: 'Datum', example_jp: '今月は三月です。', example_de: 'Diesen Monat ist März.' },
  { japanese: '来月', hiragana: 'らいげつ', romaji: 'Raigetsu', german: 'Nächsten Monat', category: 'Datum', example_jp: '来月旅行します。', example_de: 'Nächsten Monat reise ich.' },
  { japanese: '今年', hiragana: 'ことし', romaji: 'Kotoshi', german: 'Dieses Jahr', category: 'Datum', example_jp: '今年学校に入ります。', example_de: 'Dieses Jahr trete ich in die Schule ein.' },
  { japanese: '来年', hiragana: 'らいねん', romaji: 'Rainen', german: 'Nächstes Jahr', category: 'Datum', example_jp: '来年日本に行きます。', example_de: 'Nächstes Jahr fahre ich nach Japan.' },
  { japanese: '一月', hiragana: 'いちがつ', romaji: 'Ichigatsu', german: 'Januar', category: 'Datum', example_jp: '一月は寒いです。', example_de: 'Der Januar ist kalt.' },
  { japanese: '二月', hiragana: 'にがつ', romaji: 'Nigatsu', german: 'Februar', category: 'Datum', example_jp: '二月に来ます。', example_de: 'Ich komme im Februar.' },
  { japanese: '三月', hiragana: 'さんがつ', romaji: 'Sangatsu', german: 'März', category: 'Datum', example_jp: '三月に花見をします。', example_de: 'Im März gehen wir Kirschblüten anschauen.' },
  { japanese: '四月', hiragana: 'しがつ', romaji: 'Shigatsu', german: 'April', category: 'Datum', example_jp: '四月に学校が始まります。', example_de: 'Im April beginnt die Schule.' },
  { japanese: '五月', hiragana: 'ごがつ', romaji: 'Gogatsu', german: 'Mai', category: 'Datum', example_jp: '五月は暖かいです。', example_de: 'Der Mai ist warm.' },
  { japanese: '六月', hiragana: 'ろくがつ', romaji: 'Rokugatsu', german: 'Juni', category: 'Datum', example_jp: '六月は雨が多いです。', example_de: 'Im Juni gibt es viel Regen.' },
  { japanese: '七月', hiragana: 'しちがつ', romaji: 'Shichigatsu', german: 'Juli', category: 'Datum', example_jp: '七月は暑いです。', example_de: 'Der Juli ist heiß.' },
  { japanese: '八月', hiragana: 'はちがつ', romaji: 'Hachigatsu', german: 'August', category: 'Datum', example_jp: '八月に海に行きます。', example_de: 'Im August gehe ich ans Meer.' },
  { japanese: '九月', hiragana: 'くがつ', romaji: 'Kugatsu', german: 'September', category: 'Datum', example_jp: '九月に学校が始まります。', example_de: 'Im September beginnt die Schule.' },
  { japanese: '十月', hiragana: 'じゅうがつ', romaji: 'Juugatsu', german: 'Oktober', category: 'Datum', example_jp: '十月は涼しいです。', example_de: 'Der Oktober ist kühl.' },
  { japanese: '十一月', hiragana: 'じゅういちがつ', romaji: 'Juuichigatsu', german: 'November', category: 'Datum', example_jp: '十一月は寒くなります。', example_de: 'Im November wird es kalt.' },
  { japanese: '十二月', hiragana: 'じゅうにがつ', romaji: 'Juunigatsu', german: 'Dezember', category: 'Datum', example_jp: '十二月は寒いです。', example_de: 'Der Dezember ist kalt.' },
  { japanese: '誕生日', hiragana: 'たんじょうび', romaji: 'Tanjoubi', german: 'Geburtstag', category: 'Datum', example_jp: '誕生日おめでとう！', example_de: 'Herzlichen Glückwunsch zum Geburtstag!' },
  { japanese: '今日は何日ですか？', hiragana: 'きょうはなんにちですか？', romaji: 'Kyou wa nan nichi desu ka?', german: 'Der Wievielte ist heute?', category: 'Datum', example_jp: '今日は何日ですか？', example_de: 'Der Wievielte ist heute?' },
  { japanese: '誕生日はいつですか？', hiragana: 'たんじょうびはいつですか？', romaji: 'Tanjoubi wa itsu desu ka?', german: 'Wann haben Sie Geburtstag?', category: 'Datum', example_jp: '誕生日はいつですか？', example_de: 'Wann haben Sie Geburtstag?' },

  // ═══════════════════════════════════════════════════════
  // WOCHENTAGE
  // ═══════════════════════════════════════════════════════
  { japanese: '月曜日', hiragana: 'げつようび', romaji: 'Getsuyoubi', german: 'Montag', category: 'Wochentage', example_jp: '月曜日に学校に行きます。', example_de: 'Am Montag gehe ich zur Schule.' },
  { japanese: '火曜日', hiragana: 'かようび', romaji: 'Kayoubi', german: 'Dienstag', category: 'Wochentage', example_jp: '火曜日は仕事があります。', example_de: 'Am Dienstag habe ich Arbeit.' },
  { japanese: '水曜日', hiragana: 'すいようび', romaji: 'Suiyoubi', german: 'Mittwoch', category: 'Wochentage', example_jp: '水曜日に会います。', example_de: 'Wir treffen uns am Mittwoch.' },
  { japanese: '木曜日', hiragana: 'もくようび', romaji: 'Mokuyoubi', german: 'Donnerstag', category: 'Wochentage', example_jp: '木曜日に来ます。', example_de: 'Ich komme am Donnerstag.' },
  { japanese: '金曜日', hiragana: 'きんようび', romaji: 'Kin\'youbi', german: 'Freitag', category: 'Wochentage', example_jp: '金曜日に映画を見ます。', example_de: 'Am Freitag schaue ich einen Film.' },
  { japanese: '土曜日', hiragana: 'どようび', romaji: 'Doyoubi', german: 'Samstag', category: 'Wochentage', example_jp: '土曜日は休みです。', example_de: 'Am Samstag bin ich frei.' },
  { japanese: '日曜日', hiragana: 'にちようび', romaji: 'Nichiyoubi', german: 'Sonntag', category: 'Wochentage', example_jp: '日曜日は家にいます。', example_de: 'Am Sonntag bin ich zu Hause.' },
  { japanese: '週末', hiragana: 'しゅうまつ', romaji: 'Shuumatsu', german: 'Wochenende', category: 'Wochentage', example_jp: '週末に旅行します。', example_de: 'Ich reise am Wochenende.' },
  { japanese: '平日', hiragana: 'へいじつ', romaji: 'Heijitsu', german: 'Werktag', category: 'Wochentage', example_jp: '平日は仕事があります。', example_de: 'An Werktagen habe ich Arbeit.' },
  { japanese: '休み', hiragana: 'やすみ', romaji: 'Yasumi', german: 'frei / Urlaub / Pause', category: 'Wochentage', example_jp: '明日は休みです。', example_de: 'Morgen bin ich frei.' },
  { japanese: '毎週', hiragana: 'まいしゅう', romaji: 'Maishuu', german: 'Jede Woche', category: 'Wochentage', example_jp: '毎週日曜日に会います。', example_de: 'Wir treffen uns jeden Sonntag.' },
  { japanese: '今日は何曜日ですか？', hiragana: 'きょうはなんようびですか？', romaji: 'Kyou wa nan youbi desu ka?', german: 'Welcher Wochentag ist heute?', category: 'Wochentage', example_jp: '今日は何曜日ですか？', example_de: 'Welcher Wochentag ist heute?' },
  { japanese: '金曜日に映画を見ます。', hiragana: 'きんようびにえいがをみます。', romaji: 'Kin\'youbi ni eiga wo mimasu.', german: 'Am Freitag schaue ich einen Film.', category: 'Wochentage', example_jp: '金曜日に映画を見ます。', example_de: 'Am Freitag schaue ich einen Film.' },
  { japanese: '土曜日と日曜日は休みです。', hiragana: 'どようびとにちようびはやすみです。', romaji: 'Doyoubi to nichiyoubi wa yasumi desu.', german: 'Samstag und Sonntag sind frei.', category: 'Wochentage', example_jp: '土曜日と日曜日は休みです。', example_de: 'Samstag und Sonntag sind frei.' },

  // ═══════════════════════════════════════════════════════
  // ZEITDAUER
  // ═══════════════════════════════════════════════════════
  { japanese: '〜時間', hiragana: 'じかん', romaji: '~jikan', german: '~ Stunden', category: 'Zeitdauer', example_jp: '三時間かかります。', example_de: 'Es dauert drei Stunden.' },
  { japanese: '〜分', hiragana: 'ふん / ぷん', romaji: '~fun / ~pun', german: '~ Minuten', category: 'Zeitdauer', example_jp: '五分かかります。', example_de: 'Es dauert fünf Minuten.' },
  { japanese: '〜秒', hiragana: 'びょう', romaji: '~byou', german: '~ Sekunden', category: 'Zeitdauer', example_jp: '十秒待ちます。', example_de: 'Ich warte zehn Sekunden.' },
  { japanese: '〜日間', hiragana: 'にちかん', romaji: '~nichikan', german: '~ Tage (Dauer)', category: 'Zeitdauer', example_jp: '三日間います。', example_de: 'Ich bin drei Tage da.' },
  { japanese: '〜週間', hiragana: 'しゅうかん', romaji: '~shuukan', german: '~ Wochen', category: 'Zeitdauer', example_jp: '二週間かかります。', example_de: 'Es dauert zwei Wochen.' },
  { japanese: '〜ヶ月', hiragana: 'かげつ', romaji: '~kagetsu', german: '~ Monate', category: 'Zeitdauer', example_jp: '三ヶ月日本に住みます。', example_de: 'Ich wohne drei Monate in Japan.' },
  { japanese: '〜年間', hiragana: 'ねんかん', romaji: '~nenkan', german: '~ Jahre (Dauer)', category: 'Zeitdauer', example_jp: '二年間日本語を習います。', example_de: 'Ich lerne zwei Jahre Japanisch.' },
  { japanese: 'どのくらい', hiragana: 'どのくらい', romaji: 'Dono kurai', german: 'Wie lange / Wie viel', category: 'Zeitdauer', example_jp: 'どのくらいかかりますか？', example_de: 'Wie lange dauert es?' },
  { japanese: 'かかる', hiragana: 'かかる', romaji: 'Kakaru', german: 'dauern / kosten', category: 'Zeitdauer', example_jp: '五分かかります。', example_de: 'Es dauert fünf Minuten.' },
  { japanese: 'まだ', hiragana: 'まだ', romaji: 'Mada', german: 'Noch / Immer noch', category: 'Zeitdauer', example_jp: 'まだ食べています。', example_de: 'Ich esse noch.' },
  { japanese: 'もう', hiragana: 'もう', romaji: 'Mou', german: 'Schon / Bereits', category: 'Zeitdauer', example_jp: 'もう食べました。', example_de: 'Ich habe schon gegessen.' },
  { japanese: 'ずっと', hiragana: 'ずっと', romaji: 'Zutto', german: 'Die ganze Zeit / Immer', category: 'Zeitdauer', example_jp: 'ずっと待っています。', example_de: 'Ich warte die ganze Zeit.' },
  { japanese: 'しばらく', hiragana: 'しばらく', romaji: 'Shibaraku', german: 'Eine Weile', category: 'Zeitdauer', example_jp: 'しばらく待ってください。', example_de: 'Bitte warten Sie eine Weile.' },
  { japanese: 'どのくらいかかりますか？', hiragana: 'どのくらいかかりますか？', romaji: 'Dono kurai kakarimasu ka?', german: 'Wie lange dauert es?', category: 'Zeitdauer', example_jp: 'どのくらいかかりますか？', example_de: 'Wie lange dauert es?' },
  { japanese: '三時間かかります。', hiragana: 'さんじかんかかります。', romaji: 'Sanjikan kakarimasu.', german: 'Es dauert drei Stunden.', category: 'Zeitdauer', example_jp: '三時間かかります。', example_de: 'Es dauert drei Stunden.' },
  { japanese: '五分待ってください。', hiragana: 'ごふんまってください。', romaji: 'Gofun matte kudasai.', german: 'Bitte warten Sie fünf Minuten.', category: 'Zeitdauer', example_jp: '五分待ってください。', example_de: 'Bitte warten Sie fünf Minuten.' },

  // ═══════════════════════════════════════════════════════
  // FAMILIE
  // ═══════════════════════════════════════════════════════
  { japanese: '家族', hiragana: 'かぞく', romaji: 'Kazoku', german: 'Familie', category: 'Familie', example_jp: '家族が好きです。', example_de: 'Ich mag meine Familie.' },
  { japanese: '両親', hiragana: 'りょうしん', romaji: 'Ryoushin', german: 'Eltern', category: 'Familie', example_jp: '両親は東京にいます。', example_de: 'Meine Eltern sind in Tokio.' },
  { japanese: '父', hiragana: 'ちち', romaji: 'Chichi', german: 'Vater (eigener)', category: 'Familie', example_jp: '父は会社員です。', example_de: 'Mein Vater ist Angestellter.' },
  { japanese: 'お父さん', hiragana: 'おとうさん', romaji: 'Otousan', german: 'Vater (angesprochen)', category: 'Familie', example_jp: 'お父さんは元気ですか？', example_de: 'Ist Ihr Vater wohlauf?' },
  { japanese: '母', hiragana: 'はは', romaji: 'Haha', german: 'Mutter (eigene)', category: 'Familie', example_jp: '母は先生です。', example_de: 'Meine Mutter ist Lehrerin.' },
  { japanese: 'お母さん', hiragana: 'おかあさん', romaji: 'Okaasan', german: 'Mutter (angesprochen)', category: 'Familie', example_jp: 'お母さんが来ます。', example_de: 'Ihre Mutter kommt.' },
  { japanese: '兄', hiragana: 'あに', romaji: 'Ani', german: 'Älterer Bruder (eigener)', category: 'Familie', example_jp: '兄は大学生です。', example_de: 'Mein älterer Bruder ist Student.' },
  { japanese: 'お兄さん', hiragana: 'おにいさん', romaji: 'Oniisan', german: 'Älterer Bruder (angesprochen)', category: 'Familie', example_jp: 'お兄さんはどこですか？', example_de: 'Wo ist Ihr älterer Bruder?' },
  { japanese: '姉', hiragana: 'あね', romaji: 'Ane', german: 'Ältere Schwester (eigene)', category: 'Familie', example_jp: '姉は医者です。', example_de: 'Meine ältere Schwester ist Ärztin.' },
  { japanese: 'お姉さん', hiragana: 'おねえさん', romaji: 'Oneesan', german: 'Ältere Schwester (angesprochen)', category: 'Familie', example_jp: 'お姉さんは親切です。', example_de: 'Ihre ältere Schwester ist freundlich.' },
  { japanese: '弟', hiragana: 'おとうと', romaji: 'Otouto', german: 'Jüngerer Bruder', category: 'Familie', example_jp: '弟は小学生です。', example_de: 'Mein jüngerer Bruder geht in die Grundschule.' },
  { japanese: '妹', hiragana: 'いもうと', romaji: 'Imouto', german: 'Jüngere Schwester', category: 'Familie', example_jp: '妹が生まれました。', example_de: 'Meine jüngere Schwester wurde geboren.' },
  { japanese: '祖父', hiragana: 'そふ', romaji: 'Sofu', german: 'Großvater (eigener)', category: 'Familie', example_jp: '祖父は八十歳です。', example_de: 'Mein Großvater ist achtzig Jahre alt.' },
  { japanese: 'おじいさん', hiragana: 'おじいさん', romaji: 'Ojiisan', german: 'Großvater (angesprochen)', category: 'Familie', example_jp: 'おじいさんは元気ですか？', example_de: 'Ist Ihr Großvater wohlauf?' },
  { japanese: '祖母', hiragana: 'そぼ', romaji: 'Sobo', german: 'Großmutter (eigene)', category: 'Familie', example_jp: '祖母は七十歳です。', example_de: 'Meine Großmutter ist siebzig Jahre alt.' },
  { japanese: 'おばあさん', hiragana: 'おばあさん', romaji: 'Obaasan', german: 'Großmutter (angesprochen)', category: 'Familie', example_jp: 'おばあさんは元気ですか？', example_de: 'Ist Ihre Großmutter wohlauf?' },
  { japanese: '夫', hiragana: 'おっと', romaji: 'Otto', german: 'Ehemann (eigener)', category: 'Familie', example_jp: '夫は会社員です。', example_de: 'Mein Ehemann ist Angestellter.' },
  { japanese: '妻', hiragana: 'つま', romaji: 'Tsuma', german: 'Ehefrau (eigene)', category: 'Familie', example_jp: '妻は先生です。', example_de: 'Meine Ehefrau ist Lehrerin.' },
  { japanese: '子供', hiragana: 'こども', romaji: 'Kodomo', german: 'Kind / Kinder', category: 'Familie', example_jp: '子供が二人います。', example_de: 'Ich habe zwei Kinder.' },
  { japanese: '息子', hiragana: 'むすこ', romaji: 'Musuko', german: 'Sohn', category: 'Familie', example_jp: '息子は学生です。', example_de: 'Mein Sohn ist Student.' },
  { japanese: '娘', hiragana: 'むすめ', romaji: 'Musume', german: 'Tochter', category: 'Familie', example_jp: '娘は小学生です。', example_de: 'Meine Tochter geht in die Grundschule.' },
  { japanese: '家族は何人ですか？', hiragana: 'かぞくはなんにんですか？', romaji: 'Kazoku wa nannin desu ka?', german: 'Wie viele Personen hat Ihre Familie?', category: 'Familie', example_jp: '家族は何人ですか？', example_de: 'Wie viele Personen hat Ihre Familie?' },
  { japanese: '兄は大学生です。', hiragana: 'あにはだいがくせいです。', romaji: 'Ani wa daigakusei desu.', german: 'Mein älterer Bruder ist Student.', category: 'Familie', example_jp: '兄は大学生です。', example_de: 'Mein älterer Bruder ist Student.' },
  { japanese: '両親は東京に住んでいます。', hiragana: 'りょうしんはとうきょうにすんでいます。', romaji: 'Ryoushin wa Toukyou ni sunde imasu.', german: 'Meine Eltern wohnen in Tokio.', category: 'Familie', example_jp: '両親は東京に住んでいます。', example_de: 'Meine Eltern wohnen in Tokio.' },
  { japanese: '妹は小学生です。', hiragana: 'いもうとはしょうがくせいです。', romaji: 'Imouto wa shougakusei desu.', german: 'Meine jüngere Schwester geht in die Grundschule.', category: 'Familie', example_jp: '妹は小学生です。', example_de: 'Meine jüngere Schwester geht in die Grundschule.' },

  // ═══════════════════════════════════════════════════════
  // GEFÜHLE
  // ═══════════════════════════════════════════════════════
  { japanese: '嬉しい', hiragana: 'うれしい', romaji: 'Ureshii', german: 'froh / glücklich', category: 'Gefühle', example_jp: '今日は嬉しいです。', example_de: 'Heute bin ich froh.' },
  { japanese: '悲しい', hiragana: 'かなしい', romaji: 'Kanashii', german: 'traurig', category: 'Gefühle', example_jp: '悲しいです。', example_de: 'Ich bin traurig.' },
  { japanese: '楽しい', hiragana: 'たのしい', romaji: 'Tanoshii', german: 'spaßig / fröhlich', category: 'Gefühle', example_jp: '旅行は楽しいです。', example_de: 'Die Reise macht Spaß.' },
  { japanese: '怖い', hiragana: 'こわい', romaji: 'Kowai', german: 'beängstigend / Angst haben', category: 'Gefühle', example_jp: 'この映画は怖いです。', example_de: 'Dieser Film ist gruselig.' },
  { japanese: '怒る', hiragana: 'おこる', romaji: 'Okoru', german: 'wütend sein / ärgerlich', category: 'Gefühle', example_jp: '先生が怒ります。', example_de: 'Der Lehrer wird wütend.' },
  { japanese: '驚く', hiragana: 'おどろく', romaji: 'Odoroku', german: 'überrascht sein', category: 'Gefühle', example_jp: 'びっくりして驚きます。', example_de: 'Ich bin überrascht.' },
  { japanese: '恥ずかしい', hiragana: 'はずかしい', romaji: 'Hazukashii', german: 'verlegen / peinlich', category: 'Gefühle', example_jp: '恥ずかしいです。', example_de: 'Ich bin verlegen.' },
  { japanese: '寂しい', hiragana: 'さびしい', romaji: 'Sabishii', german: 'einsam', category: 'Gefühle', example_jp: '寂しいです。', example_de: 'Ich bin einsam.' },
  { japanese: '心配', hiragana: 'しんぱい', romaji: 'Shinpai', german: 'Sorge / Besorgnis', category: 'Gefühle', example_jp: '心配しないでください。', example_de: 'Machen Sie sich keine Sorgen.' },
  { japanese: '大好き', hiragana: 'だいすき', romaji: 'Daisuki', german: 'sehr mögen / lieben', category: 'Gefühle', example_jp: '音楽が大好きです。', example_de: 'Ich liebe Musik.' },
  { japanese: '大嫌い', hiragana: 'だいきらい', romaji: 'Daikirai', german: 'sehr hassen', category: 'Gefühle', example_jp: '野菜が大嫌いです。', example_de: 'Ich hasse Gemüse.' },
  { japanese: '疲れた', hiragana: 'つかれた', romaji: 'Tsukareta', german: 'müde / erschöpft', category: 'Gefühle', example_jp: '今日は疲れました。', example_de: 'Heute bin ich müde.' },
  { japanese: '眠い', hiragana: 'ねむい', romaji: 'Nemui', german: 'schläfrig', category: 'Gefühle', example_jp: '眠いです。', example_de: 'Ich bin schläfrig.' },
  { japanese: '元気', hiragana: 'げんき', romaji: 'Genki', german: 'munter / wohlauf', category: 'Gefühle', example_jp: '元気ですか？', example_de: 'Wie geht es Ihnen?' },
  { japanese: '大丈夫', hiragana: 'だいじょうぶ', romaji: 'Daijoubu', german: 'In Ordnung / Alles gut', category: 'Gefühle', example_jp: '大丈夫ですか？', example_de: 'Ist alles in Ordnung?' },
  { japanese: '頑張る', hiragana: 'がんばる', romaji: 'Ganbaru', german: 'sich anstrengen / weitermachen', category: 'Gefühle', example_jp: '毎日頑張ります。', example_de: 'Ich strenge mich jeden Tag an.' },
  { japanese: 'びっくりした', hiragana: 'びっくりした', romaji: 'Bikkuri shita', german: 'erschrocken / überrascht', category: 'Gefühle', example_jp: 'びっくりしました！', example_de: 'Ich bin erschrocken!' },
  { japanese: 'ストレスがある', hiragana: 'ストレスがある', romaji: 'Sutoresu ga aru', german: 'gestresst sein', category: 'Gefühle', example_jp: 'ストレスがあります。', example_de: 'Ich bin gestresst.' },
  { japanese: '今日はとても疲れました。', hiragana: 'きょうはとてもつかれました。', romaji: 'Kyou wa totemo tsukaremashita.', german: 'Heute bin ich sehr müde.', category: 'Gefühle', example_jp: '今日はとても疲れました。', example_de: 'Heute bin ich sehr müde.' },
  { japanese: '試験が心配です。', hiragana: 'しけんがしんぱいです。', romaji: 'Shiken ga shinpai desu.', german: 'Ich mache mir Sorgen um die Prüfung.', category: 'Gefühle', example_jp: '試験が心配です。', example_de: 'Ich mache mir Sorgen um die Prüfung.' },
  { japanese: 'この映画はとても怖かったです。', hiragana: 'このえいがはとてもこわかったです。', romaji: 'Kono eiga wa totemo kowakatta desu.', german: 'Dieser Film war sehr gruselig.', category: 'Gefühle', example_jp: 'この映画はとても怖かったです。', example_de: 'Dieser Film war sehr gruselig.' },
  { japanese: '頑張ってください！', hiragana: 'がんばってください！', romaji: 'Ganbatte kudasai!', german: 'Geben Sie Ihr Bestes! / Viel Erfolg!', category: 'Gefühle', example_jp: '頑張ってください！', example_de: 'Geben Sie Ihr Bestes!' },

  // ═══════════════════════════════════════════════════════
  // WETTER
  // ═══════════════════════════════════════════════════════
  { japanese: '天気', hiragana: 'てんき', romaji: 'Tenki', german: 'Wetter', category: 'Wetter', example_jp: '今日は天気がいいです。', example_de: 'Heute ist das Wetter schön.' },
  { japanese: '晴れ', hiragana: 'はれ', romaji: 'Hare', german: 'sonnig / klar', category: 'Wetter', example_jp: '今日は晴れです。', example_de: 'Heute ist es sonnig.' },
  { japanese: '曇り', hiragana: 'くもり', romaji: 'Kumori', german: 'bewölkt', category: 'Wetter', example_jp: '今日は曇りです。', example_de: 'Heute ist es bewölkt.' },
  { japanese: '雨', hiragana: 'あめ', romaji: 'Ame', german: 'Regen', category: 'Wetter', example_jp: '雨が降ります。', example_de: 'Es regnet.' },
  { japanese: '雪', hiragana: 'ゆき', romaji: 'Yuki', german: 'Schnee', category: 'Wetter', example_jp: '雪が降ります。', example_de: 'Es schneit.' },
  { japanese: '風', hiragana: 'かぜ', romaji: 'Kaze', german: 'Wind', category: 'Wetter', example_jp: '風が強いです。', example_de: 'Der Wind ist stark.' },
  { japanese: '台風', hiragana: 'たいふう', romaji: 'Taifuu', german: 'Taifun', category: 'Wetter', example_jp: '台風が来ます。', example_de: 'Ein Taifun kommt.' },
  { japanese: '雷', hiragana: 'かみなり', romaji: 'Kaminari', german: 'Donner / Blitz', category: 'Wetter', example_jp: '雷が鳴ります。', example_de: 'Es donnert.' },
  { japanese: '暑い', hiragana: 'あつい', romaji: 'Atsui', german: 'heiß', category: 'Wetter', example_jp: '今日は暑いです。', example_de: 'Heute ist es heiß.' },
  { japanese: '寒い', hiragana: 'さむい', romaji: 'Samui', german: 'kalt', category: 'Wetter', example_jp: '今日は寒いです。', example_de: 'Heute ist es kalt.' },
  { japanese: '涼しい', hiragana: 'すずしい', romaji: 'Suzushii', german: 'kühl', category: 'Wetter', example_jp: '今日は涼しいです。', example_de: 'Heute ist es kühl.' },
  { japanese: '暖かい', hiragana: 'あたたかい', romaji: 'Atatakai', german: 'warm', category: 'Wetter', example_jp: '春は暖かいです。', example_de: 'Der Frühling ist warm.' },
  { japanese: '傘', hiragana: 'かさ', romaji: 'Kasa', german: 'Regenschirm', category: 'Wetter', example_jp: '傘を持ちます。', example_de: 'Ich nehme einen Regenschirm mit.' },
  { japanese: '天気予報', hiragana: 'てんきよほう', romaji: 'Tenki yohou', german: 'Wettervorhersage', category: 'Wetter', example_jp: '天気予報を見ます。', example_de: 'Ich schaue mir die Wettervorhersage an.' },
  { japanese: '春', hiragana: 'はる', romaji: 'Haru', german: 'Frühling', category: 'Wetter', example_jp: '春は暖かいです。', example_de: 'Der Frühling ist warm.' },
  { japanese: '夏', hiragana: 'なつ', romaji: 'Natsu', german: 'Sommer', category: 'Wetter', example_jp: '夏は暑いです。', example_de: 'Der Sommer ist heiß.' },
  { japanese: '秋', hiragana: 'あき', romaji: 'Aki', german: 'Herbst', category: 'Wetter', example_jp: '秋は涼しいです。', example_de: 'Der Herbst ist kühl.' },
  { japanese: '冬', hiragana: 'ふゆ', romaji: 'Fuyu', german: 'Winter', category: 'Wetter', example_jp: '冬は寒いです。', example_de: 'Der Winter ist kalt.' },
  { japanese: '気温', hiragana: 'きおん', romaji: 'Kion', german: 'Temperatur / Lufttemperatur', category: 'Wetter', example_jp: '今日の気温は高いです。', example_de: 'Die heutige Temperatur ist hoch.' },
  { japanese: '今日はいい天気ですね。', hiragana: 'きょうはいいてんきですね。', romaji: 'Kyou wa ii tenki desu ne.', german: 'Heute ist schönes Wetter, nicht wahr?', category: 'Wetter', example_jp: '今日はいい天気ですね。', example_de: 'Heute ist schönes Wetter, nicht wahr?' },
  { japanese: '明日は雨が降るかもしれません。', hiragana: 'あしたはあめがふるかもしれません。', romaji: 'Ashita wa ame ga furu kamo shiremasen.', german: 'Morgen könnte es regnen.', category: 'Wetter', example_jp: '明日は雨が降るかもしれません。', example_de: 'Morgen könnte es regnen.' },
  { japanese: '傘を持ってきてください。', hiragana: 'かさをもってきてください。', romaji: 'Kasa wo motte kite kudasai.', german: 'Bringen Sie bitte einen Regenschirm mit.', category: 'Wetter', example_jp: '傘を持ってきてください。', example_de: 'Bringen Sie bitte einen Regenschirm mit.' },
  { japanese: '今日はとても暑いですね。', hiragana: 'きょうはとてもあついですね。', romaji: 'Kyou wa totemo atsui desu ne.', german: 'Heute ist es sehr heiß, nicht wahr?', category: 'Wetter', example_jp: '今日はとても暑いですね。', example_de: 'Heute ist es sehr heiß, nicht wahr?' },
  { japanese: '強い', hiragana: 'つよい', romaji: 'Tsuyoi', german: 'stark', category: 'Wetter', example_jp: '風が強いです。', example_de: 'Der Wind ist stark.' },
  { japanese: '弱い', hiragana: 'よわい', romaji: 'Yowai', german: 'schwach / sanft', category: 'Wetter', example_jp: '風が弱いです。', example_de: 'Der Wind ist schwach.' },
  { japanese: '蒸し暑い', hiragana: 'むしあつい', romaji: 'Mushiatsui', german: 'schwül', category: 'Wetter', example_jp: '今日は蒸し暑いです。', example_de: 'Heute ist es schwül.' },
  { japanese: '空', hiragana: 'そら', romaji: 'Sora', german: 'Himmel', category: 'Wetter', example_jp: '空が青いです。', example_de: 'Der Himmel ist blau.' },
  { japanese: '霧', hiragana: 'きり', romaji: 'Kiri', german: 'Nebel', category: 'Wetter', example_jp: '霧が出ています。', example_de: 'Es ist neblig.' },

  // ═══════════════════════════════════════════════════════
  // ERGÄNZUNGEN: Verben, Adjektive & Substantive
  // ═══════════════════════════════════════════════════════

  // — Kennenlernen: Begrüßungen & Abschied —
  { japanese: 'おはようございます', hiragana: 'おはようございます', romaji: 'Ohayou gozaimasu', german: 'Guten Morgen (höflich)', category: 'Kennenlernen', example_jp: 'おはようございます！', example_de: 'Guten Morgen!' },
  { japanese: 'こんにちは', hiragana: 'こんにちは', romaji: 'Konnichiwa', german: 'Guten Tag / Hallo', category: 'Kennenlernen', example_jp: 'こんにちは、元気ですか？', example_de: 'Hallo, wie geht es Ihnen?' },
  { japanese: 'こんばんは', hiragana: 'こんばんは', romaji: 'Konbanwa', german: 'Guten Abend', category: 'Kennenlernen', example_jp: 'こんばんは！', example_de: 'Guten Abend!' },
  { japanese: 'おやすみなさい', hiragana: 'おやすみなさい', romaji: 'Oyasumi nasai', german: 'Gute Nacht', category: 'Kennenlernen', example_jp: 'おやすみなさい！', example_de: 'Gute Nacht!' },
  { japanese: 'さようなら', hiragana: 'さようなら', romaji: 'Sayounara', german: 'Auf Wiedersehen', category: 'Kennenlernen', example_jp: 'さようなら、また来ます。', example_de: 'Auf Wiedersehen, ich komme wieder.' },
  { japanese: 'じゃあね', hiragana: 'じゃあね', romaji: 'Jaa ne', german: 'Tschüss / Bis bald', category: 'Kennenlernen', example_jp: 'じゃあね、また明日！', example_de: 'Tschüss, bis morgen!' },
  { japanese: 'ごめんなさい', hiragana: 'ごめんなさい', romaji: 'Gomen nasai', german: 'Es tut mir leid', category: 'Kennenlernen', example_jp: 'ごめんなさい、遅れました。', example_de: 'Es tut mir leid, ich habe mich verspätet.' },
  { japanese: 'いただきます', hiragana: 'いただきます', romaji: 'Itadakimasu', german: 'Mahlzeit (vor dem Essen)', category: 'Kennenlernen', example_jp: 'いただきます！', example_de: 'Guten Appetit! (vor dem Essen)' },
  { japanese: 'ごちそうさまでした', hiragana: 'ごちそうさまでした', romaji: 'Gochisousama deshita', german: 'Danke für das Essen', category: 'Kennenlernen', example_jp: 'ごちそうさまでした！', example_de: 'Danke für das Essen!' },
  { japanese: 'いってきます', hiragana: 'いってきます', romaji: 'Ittekimasu', german: 'Ich gehe jetzt (Abschied zu Hause)', category: 'Kennenlernen', example_jp: 'いってきます！', example_de: 'Ich gehe jetzt!' },
  { japanese: 'ただいま', hiragana: 'ただいま', romaji: 'Tadaima', german: 'Ich bin zurück', category: 'Kennenlernen', example_jp: 'ただいま！', example_de: 'Ich bin zurück!' },
  { japanese: '若い', hiragana: 'わかい', romaji: 'Wakai', german: 'jung', category: 'Kennenlernen', example_jp: '若い人が来ます。', example_de: 'Ein junger Mensch kommt.' },
  { japanese: '親切', hiragana: 'しんせつ', romaji: 'Shinsetsu', german: 'freundlich / nett', category: 'Kennenlernen', example_jp: '先生は親切です。', example_de: 'Der Lehrer ist freundlich.' },
  { japanese: '上手', hiragana: 'じょうず', romaji: 'Jouzu', german: 'gut in etwas (Können)', category: 'Kennenlernen', example_jp: '日本語が上手ですね。', example_de: 'Ihr Japanisch ist gut.' },
  { japanese: '下手', hiragana: 'へた', romaji: 'Heta', german: 'schlecht in etwas (Können)', category: 'Kennenlernen', example_jp: '料理が下手です。', example_de: 'Ich bin schlecht im Kochen.' },
  { japanese: '会う', hiragana: 'あう', romaji: 'Au', german: 'treffen / begegnen', category: 'Kennenlernen', example_jp: '友達に会います。', example_de: 'Ich treffe einen Freund.' },

  // — Restaurant: Adjektive & Verben —
  { japanese: '苦い', hiragana: 'にがい', romaji: 'Nigai', german: 'bitter', category: 'Restaurant', example_jp: 'コーヒーは苦いです。', example_de: 'Der Kaffee ist bitter.' },
  { japanese: '塩辛い', hiragana: 'しおからい', romaji: 'Shiokarai', german: 'salzig', category: 'Restaurant', example_jp: 'この料理は塩辛いです。', example_de: 'Dieses Gericht ist salzig.' },
  { japanese: '酸っぱい', hiragana: 'すっぱい', romaji: 'Suppai', german: 'sauer', category: 'Restaurant', example_jp: 'レモンは酸っぱいです。', example_de: 'Die Zitrone ist sauer.' },
  { japanese: 'まずい', hiragana: 'まずい', romaji: 'Mazui', german: 'nicht lecker', category: 'Restaurant', example_jp: 'この料理はまずいです。', example_de: 'Dieses Gericht schmeckt nicht.' },
  { japanese: '注文する', hiragana: 'ちゅうもんする', romaji: 'Chuumon suru', german: 'bestellen', category: 'Restaurant', example_jp: 'ラーメンを注文します。', example_de: 'Ich bestelle Ramen.' },
  { japanese: '座る', hiragana: 'すわる', romaji: 'Suwaru', german: 'sich setzen / sitzen', category: 'Restaurant', example_jp: 'ここに座ります。', example_de: 'Ich setze mich hier hin.' },
  { japanese: '料理', hiragana: 'りょうり', romaji: 'Ryouri', german: 'Gericht / Kochen', category: 'Restaurant', example_jp: 'この料理はおいしいです。', example_de: 'Dieses Gericht ist lecker.' },
  { japanese: '昼食', hiragana: 'ちゅうしょく', romaji: 'Chuushoku', german: 'Mittagessen', category: 'Restaurant', example_jp: '昼食を食べます。', example_de: 'Ich esse Mittagessen.' },
  { japanese: '夕食', hiragana: 'ゆうしょく', romaji: 'Yuushoku', german: 'Abendessen', category: 'Restaurant', example_jp: '夕食を食べます。', example_de: 'Ich esse Abendessen.' },
  { japanese: '果物', hiragana: 'くだもの', romaji: 'Kudamono', german: 'Obst', category: 'Restaurant', example_jp: '果物を食べます。', example_de: 'Ich esse Obst.' },
  { japanese: 'コップ', hiragana: 'コップ', romaji: 'Koppu', german: 'Glas / Becher', category: 'Restaurant', example_jp: 'コップに水を入れます。', example_de: 'Ich gieße Wasser ins Glas.' },
  { japanese: '皿', hiragana: 'さら', romaji: 'Sara', german: 'Teller', category: 'Restaurant', example_jp: '皿に料理を出します。', example_de: 'Ich serviere das Essen auf dem Teller.' },
  { japanese: '塩', hiragana: 'しお', romaji: 'Shio', german: 'Salz', category: 'Restaurant', example_jp: '塩をください。', example_de: 'Bitte geben Sie mir Salz.' },
  { japanese: '砂糖', hiragana: 'さとう', romaji: 'Satou', german: 'Zucker', category: 'Restaurant', example_jp: '砂糖を入れます。', example_de: 'Ich gebe Zucker hinein.' },

  // — Einkaufen: Adjektive & Verben —
  { japanese: '新しい', hiragana: 'あたらしい', romaji: 'Atarashii', german: 'neu', category: 'Einkaufen', example_jp: '新しい服を買います。', example_de: 'Ich kaufe neue Kleidung.' },
  { japanese: '古い', hiragana: 'ふるい', romaji: 'Furui', german: 'alt (Dinge)', category: 'Einkaufen', example_jp: '古い本を売ります。', example_de: 'Ich verkaufe alte Bücher.' },
  { japanese: 'かわいい', hiragana: 'かわいい', romaji: 'Kawaii', german: 'Niedlich / Süß', category: 'Einkaufen', example_jp: 'かわいいバッグです。', example_de: 'Es ist eine niedliche Tasche.' },
  { japanese: 'きれい', hiragana: 'きれい', romaji: 'Kirei', german: 'schön / sauber', category: 'Einkaufen', example_jp: 'きれいな花です。', example_de: 'Es ist eine schöne Blume.' },
  { japanese: '重い', hiragana: 'おもい', romaji: 'Omoi', german: 'schwer', category: 'Einkaufen', example_jp: 'この荷物は重いです。', example_de: 'Dieses Gepäck ist schwer.' },
  { japanese: '軽い', hiragana: 'かるい', romaji: 'Karui', german: 'leicht', category: 'Einkaufen', example_jp: 'この bag は軽いです。', example_de: 'Diese Tasche ist leicht.' },
  { japanese: '試す', hiragana: 'ためす', romaji: 'Tamesu', german: 'ausprobieren', category: 'Einkaufen', example_jp: '試してもいいですか？', example_de: 'Darf ich das ausprobieren?' },
  { japanese: '見せる', hiragana: 'みせる', romaji: 'Miseru', german: 'zeigen', category: 'Einkaufen', example_jp: '見せてください。', example_de: 'Bitte zeigen Sie mir das.' },
  { japanese: '市場', hiragana: 'いちば', romaji: 'Ichiba', german: 'Markt', category: 'Einkaufen', example_jp: '市場に行きます。', example_de: 'Ich gehe auf den Markt.' },

  // — Hotel: Adjektive & Verben —
  { japanese: '狭い', hiragana: 'せまい', romaji: 'Semai', german: 'eng / klein (Raum)', category: 'Hotel', example_jp: '部屋は狭いです。', example_de: 'Das Zimmer ist eng.' },
  { japanese: '便利', hiragana: 'べんり', romaji: 'Benri', german: 'praktisch / bequem', category: 'Hotel', example_jp: 'このホテルは便利です。', example_de: 'Dieses Hotel ist praktisch.' },
  { japanese: '不便', hiragana: 'ふべん', romaji: 'Fuben', german: 'unpraktisch', category: 'Hotel', example_jp: 'ここは不便です。', example_de: 'Es ist hier unpraktisch.' },
  { japanese: 'うるさい', hiragana: 'うるさい', romaji: 'Urusai', german: 'laut / nervig', category: 'Hotel', example_jp: '部屋がうるさいです。', example_de: 'Das Zimmer ist laut.' },
  { japanese: '起きる', hiragana: 'おきる', romaji: 'Okiru', german: 'aufwachen / aufstehen', category: 'Hotel', example_jp: '七時に起きます。', example_de: 'Ich stehe um sieben Uhr auf.' },
  { japanese: '寝る', hiragana: 'ねる', romaji: 'Neru', german: 'Schlafen / Ins Bett gehen', category: 'Hotel', example_jp: '十時に寝ます。', example_de: 'Ich gehe um zehn Uhr schlafen.' },
  { japanese: '開ける', hiragana: 'あける', romaji: 'Akeru', german: 'öffnen / aufmachen', category: 'Hotel', example_jp: '窓を開けます。', example_de: 'Ich öffne das Fenster.' },
  { japanese: '閉める', hiragana: 'しめる', romaji: 'Shimeru', german: 'schließen / zumachen', category: 'Hotel', example_jp: 'ドアを閉めます。', example_de: 'Ich schließe die Tür.' },
  { japanese: 'お風呂', hiragana: 'おふろ', romaji: 'Ofuro', german: 'Bad / Badewanne', category: 'Hotel', example_jp: 'お風呂に入ります。', example_de: 'Ich nehme ein Bad.' },

  // — Flughafen: Adjektive & Verben —
  { japanese: '速い', hiragana: 'はやい', romaji: 'Hayai', german: 'schnell', category: 'Flughafen', example_jp: '飛行機は速いです。', example_de: 'Das Flugzeug ist schnell.' },
  { japanese: '遅い', hiragana: 'おそい', romaji: 'Osoi', german: 'langsam / spät', category: 'Flughafen', example_jp: 'バスは遅いです。', example_de: 'Der Bus ist langsam.' },
  { japanese: '飛ぶ', hiragana: 'とぶ', romaji: 'Tobu', german: 'fliegen', category: 'Flughafen', example_jp: '鳥が飛びます。', example_de: 'Der Vogel fliegt.' },

  // — Bahnhof: Verben & Transportmittel —
  { japanese: '着く', hiragana: 'つく', romaji: 'Tsuku', german: 'ankommen', category: 'Bahnhof', example_jp: '駅に着きます。', example_de: 'Ich komme am Bahnhof an.' },
  { japanese: '出発する', hiragana: 'しゅっぱつする', romaji: 'Shuppatsu suru', german: 'abfahren / abreisen', category: 'Bahnhof', example_jp: '電車が出発します。', example_de: 'Der Zug fährt ab.' },
  { japanese: '乗り換える', hiragana: 'のりかえる', romaji: 'Norikaeru', german: 'umsteigen', category: 'Bahnhof', example_jp: 'ここで乗り換えます。', example_de: 'Ich steige hier um.' },
  { japanese: '車', hiragana: 'くるま', romaji: 'Kuruma', german: 'Auto / Fahrzeug', category: 'Bahnhof', example_jp: '車で行きます。', example_de: 'Ich fahre mit dem Auto.' },
  { japanese: 'バス', hiragana: 'バス', romaji: 'Basu', german: 'Bus', category: 'Bahnhof', example_jp: 'バスに乗ります。', example_de: 'Ich steige in den Bus ein.' },

  // — Arzt: Adjektive, Verben & Substantive —
  { japanese: 'ひどい', hiragana: 'ひどい', romaji: 'Hidoi', german: 'schlimm / schrecklich', category: 'Arzt', example_jp: '頭痛がひどいです。', example_de: 'Die Kopfschmerzen sind schlimm.' },
  { japanese: 'だるい', hiragana: 'だるい', romaji: 'Darui', german: 'schlapp / erschöpft', category: 'Arzt', example_jp: '体がだるいです。', example_de: 'Ich fühle mich schlapp.' },
  { japanese: '洗う', hiragana: 'あらう', romaji: 'Arau', german: 'waschen', category: 'Arzt', example_jp: '手を洗います。', example_de: 'Ich wasche meine Hände.' },
  { japanese: '休む', hiragana: 'やすむ', romaji: 'Yasumu', german: 'ausruhen / pausieren', category: 'Arzt', example_jp: '今日は休みます。', example_de: 'Heute ruhe ich mich aus.' },
  { japanese: '病気', hiragana: 'びょうき', romaji: 'Byouki', german: 'Krankheit / krank sein', category: 'Arzt', example_jp: '病気になりました。', example_de: 'Ich bin krank geworden.' },
  { japanese: '薬局', hiragana: 'やっきょく', romaji: 'Yakkyoku', german: 'Apotheke', category: 'Arzt', example_jp: '薬局に行きます。', example_de: 'Ich gehe zur Apotheke.' },
  { japanese: 'けが', hiragana: 'けが', romaji: 'Kega', german: 'Verletzung', category: 'Arzt', example_jp: 'けがをしました。', example_de: 'Ich habe mich verletzt.' },
  { japanese: '体', hiragana: 'からだ', romaji: 'Karada', german: 'Körper', category: 'Arzt', example_jp: '体が痛いです。', example_de: 'Mein Körper tut weh.' },
  { japanese: '指', hiragana: 'ゆび', romaji: 'Yubi', german: 'Finger', category: 'Arzt', example_jp: '指が痛いです。', example_de: 'Mein Finger tut weh.' },

  // — Smalltalk: Adjektive & Substantive —
  { japanese: '難しい', hiragana: 'むずかしい', romaji: 'Muzukashii', german: 'schwierig', category: 'Smalltalk', example_jp: '日本語は難しいです。', example_de: 'Japanisch ist schwierig.' },
  { japanese: '簡単', hiragana: 'かんたん', romaji: 'Kantan', german: 'einfach / leicht', category: 'Smalltalk', example_jp: 'この問題は簡単です。', example_de: 'Diese Aufgabe ist einfach.' },
  { japanese: 'いい', hiragana: 'いい', romaji: 'Ii', german: 'gut / in Ordnung', category: 'Smalltalk', example_jp: 'いい天気ですね。', example_de: 'Schönes Wetter, oder?' },
  { japanese: '悪い', hiragana: 'わるい', romaji: 'Warui', german: 'schlecht / böse', category: 'Smalltalk', example_jp: '天気が悪いです。', example_de: 'Das Wetter ist schlecht.' },
  { japanese: '大切', hiragana: 'たいせつ', romaji: 'Taisetsu', german: 'wichtig / wertvoll', category: 'Smalltalk', example_jp: '友達は大切です。', example_de: 'Freunde sind wichtig.' },
  { japanese: '正しい', hiragana: 'ただしい', romaji: 'Tadashii', german: 'richtig / korrekt', category: 'Smalltalk', example_jp: 'この答えは正しいです。', example_de: 'Diese Antwort ist richtig.' },
  { japanese: '変', hiragana: 'へん', romaji: 'Hen', german: 'seltsam / komisch', category: 'Smalltalk', example_jp: '変な人がいます。', example_de: 'Da ist eine seltsame Person.' },
  { japanese: '映画館', hiragana: 'えいがかん', romaji: 'Eigakan', german: 'Kino', category: 'Smalltalk', example_jp: '映画館に行きます。', example_de: 'Ich gehe ins Kino.' },

  // — Datum: Ergänzungen —
  { japanese: '去年', hiragana: 'きょねん', romaji: 'Kyonen', german: 'letztes Jahr', category: 'Datum', example_jp: '去年日本に来ました。', example_de: 'Letztes Jahr bin ich nach Japan gekommen.' },
  { japanese: 'おととい', hiragana: 'おととい', romaji: 'Ototoi', german: 'vorgestern', category: 'Datum', example_jp: 'おとといは月曜日でした。', example_de: 'Vorgestern war Montag.' },
  { japanese: 'あさって', hiragana: 'あさって', romaji: 'Asatte', german: 'übermorgen', category: 'Datum', example_jp: 'あさって来てください。', example_de: 'Bitte kommen Sie übermorgen.' },

  // — Zeitdauer: Ergänzungen —
  { japanese: 'すぐに', hiragana: 'すぐに', romaji: 'Sugu ni', german: 'sofort / gleich', category: 'Zeitdauer', example_jp: 'すぐに来ます。', example_de: 'Ich komme sofort.' },
  { japanese: 'もうすぐ', hiragana: 'もうすぐ', romaji: 'Mousugu', german: 'bald', category: 'Zeitdauer', example_jp: 'もうすぐ来ます。', example_de: 'Ich komme bald.' },
  { japanese: 'たまに', hiragana: 'たまに', romaji: 'Tama ni', german: 'manchmal / gelegentlich', category: 'Zeitdauer', example_jp: 'たまに映画を見ます。', example_de: 'Manchmal schaue ich einen Film.' },

  // — Familie: Ergänzungen —
  { japanese: 'おじ', hiragana: 'おじ', romaji: 'Oji', german: 'Onkel', category: 'Familie', example_jp: 'おじが来ます。', example_de: 'Mein Onkel kommt.' },
  { japanese: 'おば', hiragana: 'おば', romaji: 'Oba', german: 'Tante', category: 'Familie', example_jp: 'おばは親切です。', example_de: 'Meine Tante ist freundlich.' },
  { japanese: 'ご主人', hiragana: 'ごしゅじん', romaji: 'Goshujin', german: 'Ehemann (angesprochen)', category: 'Familie', example_jp: 'ご主人はどこですか？', example_de: 'Wo ist Ihr Mann?' },
  { japanese: '奥さん', hiragana: 'おくさん', romaji: 'Okusan', german: 'Ehefrau (angesprochen)', category: 'Familie', example_jp: '奥さんは元気ですか？', example_de: 'Ist Ihre Frau wohlauf?' },
  { japanese: '友達', hiragana: 'ともだち', romaji: 'Tomodachi', german: 'Freund(in)', category: 'Familie', example_jp: '友達と遊びます。', example_de: 'Ich spiele mit Freunden.' },

  // — Gefühle: Ergänzungen —
  { japanese: '満足', hiragana: 'まんぞく', romaji: 'Manzoku', german: 'zufrieden', category: 'Gefühle', example_jp: '満足しています。', example_de: 'Ich bin zufrieden.' },
  { japanese: '不安', hiragana: 'ふあん', romaji: 'Fuan', german: 'beunruhigt / ängstlich', category: 'Gefühle', example_jp: '不安があります。', example_de: 'Ich bin beunruhigt.' },
  { japanese: '緊張', hiragana: 'きんちょう', romaji: 'Kinchou', german: 'nervös / angespannt', category: 'Gefühle', example_jp: '緊張しています。', example_de: 'Ich bin nervös.' },
  { japanese: '安心', hiragana: 'あんしん', romaji: 'Anshin', german: 'erleichtert / beruhigt', category: 'Gefühle', example_jp: '安心しました。', example_de: 'Ich bin erleichtert.' },

  // — Museum: Ergänzungen —
  { japanese: '神社', hiragana: 'じんじゃ', romaji: 'Jinja', german: 'Schrein', category: 'Museum', example_jp: '神社に行きます。', example_de: 'Ich gehe zum Schrein.' },
  { japanese: 'お寺', hiragana: 'おてら', romaji: 'Otera', german: 'Tempel', category: 'Museum', example_jp: 'お寺を見ます。', example_de: 'Ich schaue mir den Tempel an.' },
  { japanese: '入場', hiragana: 'にゅうじょう', romaji: 'Nyuujou', german: 'Einlass / Eintritt', category: 'Museum', example_jp: '入場は無料です。', example_de: 'Der Eintritt ist kostenlos.' },

  // — Wegbeschreibung: Ergänzungen —
  { japanese: '上', hiragana: 'うえ', romaji: 'Ue', german: 'oben / über', category: 'Wegbeschreibung', example_jp: '机の上にあります。', example_de: 'Es liegt auf dem Schreibtisch.' },
  { japanese: '下', hiragana: 'した', romaji: 'Shita', german: 'unten / unter', category: 'Wegbeschreibung', example_jp: '机の下にあります。', example_de: 'Es liegt unter dem Schreibtisch.' },
  { japanese: '中', hiragana: 'なか', romaji: 'Naka', german: 'Drin / Innen / Mitte', category: 'Wegbeschreibung', example_jp: '箱の中にあります。', example_de: 'Es ist in der Schachtel.' },
  { japanese: '外', hiragana: 'そと', romaji: 'Soto', german: 'Draußen / Außen', category: 'Wegbeschreibung', example_jp: '外に出ます。', example_de: 'Ich gehe nach draußen.' },
  { japanese: '東', hiragana: 'ひがし', romaji: 'Higashi', german: 'Osten', category: 'Wegbeschreibung', example_jp: '東に行きます。', example_de: 'Ich gehe nach Osten.' },
  { japanese: '西', hiragana: 'にし', romaji: 'Nishi', german: 'Westen', category: 'Wegbeschreibung', example_jp: '西に行きます。', example_de: 'Ich gehe nach Westen.' },
  { japanese: '南', hiragana: 'みなみ', romaji: 'Minami', german: 'Süden', category: 'Wegbeschreibung', example_jp: '南に行きます。', example_de: 'Ich gehe nach Süden.' },
  { japanese: '北', hiragana: 'きた', romaji: 'Kita', german: 'Norden', category: 'Wegbeschreibung', example_jp: '北に行きます。', example_de: 'Ich gehe nach Norden.' },
  { japanese: '教える', hiragana: 'おしえる', romaji: 'Oshieru', german: 'zeigen / erklären / lehren', category: 'Wegbeschreibung', example_jp: '道を教えてください。', example_de: 'Bitte zeigen Sie mir den Weg.' },
  { japanese: '見つける', hiragana: 'みつける', romaji: 'Mitsukeru', german: 'finden', category: 'Wegbeschreibung', example_jp: '駅を見つけます。', example_de: 'Ich finde den Bahnhof.' },
  { japanese: '帰る', hiragana: 'かえる', romaji: 'Kaeru', german: 'zurückkehren / nach Hause gehen', category: 'Wegbeschreibung', example_jp: '家に帰ります。', example_de: 'Ich gehe nach Hause.' },
  { japanese: '街', hiragana: 'まち', romaji: 'Machi', german: 'Stadt / Stadtgebiet', category: 'Wegbeschreibung', example_jp: '街を歩きます。', example_de: 'Ich gehe durch die Stadt.' },

  // ═══════════════════════════════════════════════════════
  // KERNVERBEN (JLPT N5)
  // ═══════════════════════════════════════════════════════
  { japanese: '行く', hiragana: 'いく', romaji: 'Iku', german: 'gehen', category: 'Wegbeschreibung', example_jp: '学校に行く。', example_de: 'Ich gehe zur Schule.' },
  { japanese: '来る', hiragana: 'くる', romaji: 'Kuru', german: 'kommen', category: 'Wegbeschreibung', example_jp: '友達が来る。', example_de: 'Ein Freund kommt.' },
  { japanese: '見る', hiragana: 'みる', romaji: 'Miru', german: 'sehen / anschauen', category: 'Smalltalk', example_jp: '映画を見る。', example_de: 'Ich schaue einen Film.' },
  { japanese: '聞く', hiragana: 'きく', romaji: 'Kiku', german: 'hören / fragen', category: 'Schule', example_jp: '音楽を聞く。', example_de: 'Ich höre Musik.' },
  { japanese: '話す', hiragana: 'はなす', romaji: 'Hanasu', german: 'sprechen / reden', category: 'Kennenlernen', example_jp: '日本語を話す。', example_de: 'Ich spreche Japanisch.' },
  { japanese: '書く', hiragana: 'かく', romaji: 'Kaku', german: 'schreiben', category: 'Schule', example_jp: '手紙を書く。', example_de: 'Ich schreibe einen Brief.' },
  { japanese: '読む', hiragana: 'よむ', romaji: 'Yomu', german: 'lesen', category: 'Schule', example_jp: '本を読む。', example_de: 'Ich lese ein Buch.' },
  { japanese: '使う', hiragana: 'つかう', romaji: 'Tsukau', german: 'benutzen / verwenden', category: 'Zuhause', example_jp: 'お箸を使います。', example_de: 'Ich benutze Stäbchen.' },
  { japanese: '作る', hiragana: 'つくる', romaji: 'Tsukuru', german: 'machen / herstellen', category: 'Zuhause', example_jp: '料理を作ります。', example_de: 'Ich koche Essen.' },
  { japanese: '持つ', hiragana: 'もつ', romaji: 'Motsu', german: 'halten / tragen / besitzen', category: 'Einkaufen', example_jp: '荷物を持ちます。', example_de: 'Ich trage das Gepäck.' },
  { japanese: '立つ', hiragana: 'たつ', romaji: 'Tatsu', german: 'stehen / aufstehen', category: 'Natur', example_jp: 'ここに立ちます。', example_de: 'Ich stehe hier.' },
  { japanese: '走る', hiragana: 'はしる', romaji: 'Hashiru', german: 'laufen / rennen', category: 'Natur', example_jp: '公園で走ります。', example_de: 'Ich laufe im Park.' },
  { japanese: '泳ぐ', hiragana: 'およぐ', romaji: 'Oyogu', german: 'schwimmen', category: 'Natur', example_jp: '海で泳ぎます。', example_de: 'Ich schwimme im Meer.' },
  { japanese: '借りる', hiragana: 'かりる', romaji: 'Kariru', german: 'leihen (von jmd.)', category: 'Schule', example_jp: '本を借ります。', example_de: 'Ich leihe ein Buch.' },
  { japanese: '貸す', hiragana: 'かす', romaji: 'Kasu', german: 'verleihen (an jmd.)', category: 'Schule', example_jp: '本を貸します。', example_de: 'Ich verleihe ein Buch.' },
  { japanese: '知る', hiragana: 'しる', romaji: 'Shiru', german: 'wissen / kennen', category: 'Smalltalk', example_jp: 'あの人を知っています。', example_de: 'Ich kenne diese Person.' },
  { japanese: '分かる', hiragana: 'わかる', romaji: 'Wakaru', german: 'verstehen / wissen', category: 'Schule', example_jp: '日本語が分かります。', example_de: 'Ich verstehe Japanisch.' },
  { japanese: '出かける', hiragana: 'でかける', romaji: 'Dekakeru', german: 'ausgehen / weggehen', category: 'Smalltalk', example_jp: '今日は出かけます。', example_de: 'Heute gehe ich aus.' },
  { japanese: '勉強する', hiragana: 'べんきょうする', romaji: 'Benkyou suru', german: 'lernen / studieren', category: 'Schule', example_jp: '日本語を勉強します。', example_de: 'Ich lerne Japanisch.' },
  { japanese: '働く', hiragana: 'はたらく', romaji: 'Hataraku', german: 'arbeiten', category: 'Kennenlernen', example_jp: '毎日働きます。', example_de: 'Ich arbeite jeden Tag.' },
  { japanese: '電話する', hiragana: 'でんわする', romaji: 'Denwa suru', german: 'anrufen', category: 'Kennenlernen', example_jp: '母に電話します。', example_de: 'Ich rufe meine Mutter an.' },
  { japanese: 'あげる', hiragana: 'あげる', romaji: 'Ageru', german: 'geben (an jmd.)', category: 'Smalltalk', example_jp: 'プレゼントをあげます。', example_de: 'Ich gebe ein Geschenk.' },
  { japanese: 'もらう', hiragana: 'もらう', romaji: 'Morau', german: 'bekommen / erhalten', category: 'Smalltalk', example_jp: '本をもらいます。', example_de: 'Ich bekomme ein Buch.' },
  { japanese: '送る', hiragana: 'おくる', romaji: 'Okuru', german: 'schicken / senden', category: 'Smalltalk', example_jp: '手紙を送ります。', example_de: 'Ich schicke einen Brief.' },
  { japanese: '出る', hiragana: 'でる', romaji: 'Deru', german: 'herauskommen / ausgehen', category: 'Wegbeschreibung', example_jp: '部屋から出ます。', example_de: 'Ich verlasse das Zimmer.' },
  { japanese: '入る', hiragana: 'はいる', romaji: 'Hairu', german: 'hineingehen / eintreten', category: 'Wegbeschreibung', example_jp: '部屋に入ります。', example_de: 'Ich betrete das Zimmer.' },
  { japanese: '切る', hiragana: 'きる', romaji: 'Kiru', german: 'schneiden', category: 'Zuhause', example_jp: '野菜を切ります。', example_de: 'Ich schneide Gemüse.' },
  { japanese: '忘れる', hiragana: 'わすれる', romaji: 'Wasureru', german: 'vergessen', category: 'Schule', example_jp: '名前を忘れます。', example_de: 'Ich vergesse den Namen.' },
  { japanese: '覚える', hiragana: 'おぼえる', romaji: 'Oboeru', german: 'sich merken / einprägen', category: 'Schule', example_jp: '単語を覚えます。', example_de: 'Ich präge mir Vokabeln ein.' },
  { japanese: '急ぐ', hiragana: 'いそぐ', romaji: 'Isogu', german: 'sich beeilen', category: 'Bahnhof', example_jp: '急ぎます。', example_de: 'Ich beeile mich.' },
  { japanese: '遊ぶ', hiragana: 'あそぶ', romaji: 'Asobu', german: 'spielen / ausgehen', category: 'Natur', example_jp: '公園で遊びます。', example_de: 'Ich spiele im Park.' },
  { japanese: '泣く', hiragana: 'なく', romaji: 'Naku', german: 'weinen', category: 'Gefühle', example_jp: '悲しくて泣きます。', example_de: 'Ich weine vor Traurigkeit.' },
  { japanese: '笑う', hiragana: 'わらう', romaji: 'Warau', german: 'lachen', category: 'Gefühle', example_jp: 'みんなが笑います。', example_de: 'Alle lachen.' },
  { japanese: '手伝う', hiragana: 'てつだう', romaji: 'Tetsudau', german: 'helfen / unterstützen', category: 'Smalltalk', example_jp: '手伝いますか？', example_de: 'Kann ich helfen?' },
  { japanese: '始まる', hiragana: 'はじまる', romaji: 'Hajimaru', german: 'beginnen / anfangen (intrans.)', category: 'Zeitdauer', example_jp: '映画が始まります。', example_de: 'Der Film beginnt.' },
  { japanese: '始める', hiragana: 'はじめる', romaji: 'Hajimeru', german: 'beginnen / starten (trans.)', category: 'Zeitdauer', example_jp: '勉強を始めます。', example_de: 'Ich beginne mit dem Lernen.' },
  { japanese: '終わる', hiragana: 'おわる', romaji: 'Owaru', german: 'enden / aufhören', category: 'Zeitdauer', example_jp: '仕事が終わります。', example_de: 'Die Arbeit endet.' },
  { japanese: '歌う', hiragana: 'うたう', romaji: 'Utau', german: 'singen', category: 'Smalltalk', example_jp: '歌を歌います。', example_de: 'Ich singe ein Lied.' },
  { japanese: '習う', hiragana: 'ならう', romaji: 'Narau', german: 'lernen / üben', category: 'Schule', example_jp: '日本語を習います。', example_de: 'Ich lerne Japanisch.' },
  { japanese: '料理する', hiragana: 'りょうりする', romaji: 'Ryouri suru', german: 'kochen', category: 'Zuhause', example_jp: '夕食を料理します。', example_de: 'Ich koche das Abendessen.' },
  { japanese: '掃除する', hiragana: 'そうじする', romaji: 'Souji suru', german: 'putzen / aufräumen', category: 'Zuhause', example_jp: '部屋を掃除します。', example_de: 'Ich putze das Zimmer.' },
  { japanese: '洗濯する', hiragana: 'せんたくする', romaji: 'Sentaku suru', german: 'Wäsche waschen', category: 'Zuhause', example_jp: '洗濯をします。', example_de: 'Ich wasche die Wäsche.' },
  { japanese: '運動する', hiragana: 'うんどうする', romaji: 'Undou suru', german: 'Sport treiben', category: 'Natur', example_jp: '毎日運動します。', example_de: 'Ich treibe jeden Tag Sport.' },
  { japanese: '散歩する', hiragana: 'さんぽする', romaji: 'Sanpo suru', german: 'spazieren gehen', category: 'Natur', example_jp: '公園で散歩します。', example_de: 'Ich spaziere im Park.' },
  { japanese: '結婚する', hiragana: 'けっこんする', romaji: 'Kekkon suru', german: 'heiraten', category: 'Familie', example_jp: '来年結婚します。', example_de: 'Nächstes Jahr heirate ich.' },
  { japanese: '卒業する', hiragana: 'そつぎょうする', romaji: 'Sotsugyou suru', german: 'abschließen / graduieren', category: 'Schule', example_jp: '大学を卒業します。', example_de: 'Ich schließe die Universität ab.' },
  { japanese: '入学する', hiragana: 'にゅうがくする', romaji: 'Nyuugaku suru', german: 'einschreiben / aufgenommen werden', category: 'Schule', example_jp: '大学に入学します。', example_de: 'Ich schreibe mich an der Universität ein.' },

  // ═══════════════════════════════════════════════════════
  // KERNADJEKTIVE (JLPT N5)
  // ═══════════════════════════════════════════════════════
  { japanese: '長い', hiragana: 'ながい', romaji: 'Nagai', german: 'lang', category: 'Kleidung', example_jp: 'この道は長いです。', example_de: 'Diese Straße ist lang.' },
  { japanese: '短い', hiragana: 'みじかい', romaji: 'Mijikai', german: 'kurz', category: 'Kleidung', example_jp: 'このスカートは短いです。', example_de: 'Dieser Rock ist kurz.' },
  { japanese: '多い', hiragana: 'おおい', romaji: 'Ooi', german: 'viel / viele', category: 'Zahlen', example_jp: '人が多いです。', example_de: 'Es sind viele Menschen da.' },
  { japanese: '少ない', hiragana: 'すくない', romaji: 'Sukunai', german: 'wenig / wenige', category: 'Zahlen', example_jp: '時間が少ないです。', example_de: 'Die Zeit ist knapp.' },
  { japanese: '同じ', hiragana: 'おなじ', romaji: 'Onaji', german: 'gleich / derselbe', category: 'Smalltalk', example_jp: '同じ服を着ています。', example_de: 'Ich trage dieselbe Kleidung.' },
  { japanese: '違う', hiragana: 'ちがう', romaji: 'Chigau', german: 'anders / falsch sein', category: 'Smalltalk', example_jp: '色が違います。', example_de: 'Die Farbe ist anders.' },
  { japanese: '優しい', hiragana: 'やさしい', romaji: 'Yasashii', german: 'nett / sanft / einfach', category: 'Gefühle', example_jp: '先生は優しいです。', example_de: 'Der Lehrer ist nett.' },
  { japanese: '明るい', hiragana: 'あかるい', romaji: 'Akarui', german: 'hell / heiter', category: 'Zuhause', example_jp: '部屋が明るいです。', example_de: 'Das Zimmer ist hell.' },
  { japanese: '暗い', hiragana: 'くらい', romaji: 'Kurai', german: 'dunkel / finster', category: 'Zuhause', example_jp: '夜は暗いです。', example_de: 'Nachts ist es dunkel.' },
  { japanese: '有名', hiragana: 'ゆうめい', romaji: 'Yuumei', german: 'berühmt', category: 'Smalltalk', example_jp: 'この人は有名です。', example_de: 'Diese Person ist berühmt.' },
  { japanese: '危ない', hiragana: 'あぶない', romaji: 'Abunai', german: 'gefährlich', category: 'Wegbeschreibung', example_jp: '危ないです！', example_de: 'Es ist gefährlich!' },
  { japanese: '汚い', hiragana: 'きたない', romaji: 'Kitanai', german: 'schmutzig / unordentlich', category: 'Zuhause', example_jp: '部屋が汚いです。', example_de: 'Das Zimmer ist schmutzig.' },
  { japanese: 'かっこいい', hiragana: 'かっこいい', romaji: 'Kakkoi', german: 'cool / gutaussehend', category: 'Kennenlernen', example_jp: 'かっこいい人です。', example_de: 'Das ist eine coole Person.' },
  { japanese: '美しい', hiragana: 'うつくしい', romaji: 'Utsukushii', german: 'schön / wunderschön', category: 'Natur', example_jp: 'この花は美しいです。', example_de: 'Diese Blume ist wunderschön.' },
  { japanese: '薄い', hiragana: 'うすい', romaji: 'Usui', german: 'dünn / hell (Farbe)', category: 'Kleidung', example_jp: '薄い青いシャツです。', example_de: 'Es ist ein hellblaues Hemd.' },
  { japanese: '太い', hiragana: 'ふとい', romaji: 'Futoi', german: 'dick / fett', category: 'Kleidung', example_jp: 'この木は太いです。', example_de: 'Dieser Baum ist dick.' },
  { japanese: '細い', hiragana: 'ほそい', romaji: 'Hosoi', german: 'dünn / schlank', category: 'Kleidung', example_jp: '細いズボンです。', example_de: 'Es ist eine schmale Hose.' },
  { japanese: '大事', hiragana: 'だいじ', romaji: 'Daiji', german: 'wichtig / wertvoll', category: 'Smalltalk', example_jp: '大事なことです。', example_de: 'Das ist eine wichtige Sache.' },

  // ═══════════════════════════════════════════════════════
  // KERNSUBSTANTIVE & ALLTAG (JLPT N5)
  // ═══════════════════════════════════════════════════════
  { japanese: '電話', hiragana: 'でんわ', romaji: 'Denwa', german: 'Telefon', category: 'Kennenlernen', example_jp: '電話をします。', example_de: 'Ich rufe an.' },
  { japanese: '手紙', hiragana: 'てがみ', romaji: 'Tegami', german: 'Brief', category: 'Smalltalk', example_jp: '手紙を書きます。', example_de: 'Ich schreibe einen Brief.' },
  { japanese: '新聞', hiragana: 'しんぶん', romaji: 'Shinbun', german: 'Zeitung', category: 'Zuhause', example_jp: '新聞を読みます。', example_de: 'Ich lese die Zeitung.' },
  { japanese: 'テレビ', hiragana: 'テレビ', romaji: 'Terebi', german: 'Fernseher', category: 'Zuhause', example_jp: 'テレビを見ます。', example_de: 'Ich schaue Fernsehen.' },
  { japanese: '時計', hiragana: 'とけい', romaji: 'Tokei', german: 'Uhr', category: 'Uhrzeit', example_jp: '時計を見ます。', example_de: 'Ich schaue auf die Uhr.' },
  { japanese: '自転車', hiragana: 'じてんしゃ', romaji: 'Jitensha', german: 'Fahrrad', category: 'Bahnhof', example_jp: '自転車に乗ります。', example_de: 'Ich fahre Fahrrad.' },
  { japanese: '大学', hiragana: 'だいがく', romaji: 'Daigaku', german: 'Universität', category: 'Schule', example_jp: '大学に行きます。', example_de: 'Ich gehe zur Universität.' },
  { japanese: '銀行', hiragana: 'ぎんこう', romaji: 'Ginkou', german: 'Bank', category: 'Wegbeschreibung', example_jp: '銀行に行きます。', example_de: 'Ich gehe zur Bank.' },
  { japanese: '郵便局', hiragana: 'ゆうびんきょく', romaji: 'Yuubinkyoku', german: 'Post / Postamt', category: 'Wegbeschreibung', example_jp: '郵便局に行きます。', example_de: 'Ich gehe zur Post.' },
  { japanese: '台所', hiragana: 'だいどころ', romaji: 'Daidokoro', german: 'Küche', category: 'Zuhause', example_jp: '台所で料理します。', example_de: 'Ich koche in der Küche.' },
  { japanese: '机', hiragana: 'つくえ', romaji: 'Tsukue', german: 'Schreibtisch', category: 'Zuhause', example_jp: '机の上に本があります。', example_de: 'Auf dem Schreibtisch liegt ein Buch.' },
  { japanese: '椅子', hiragana: 'いす', romaji: 'Isu', german: 'Stuhl', category: 'Zuhause', example_jp: '椅子に座ります。', example_de: 'Ich setze mich auf den Stuhl.' },
  { japanese: 'ドア', hiragana: 'ドア', romaji: 'Doa', german: 'Tür', category: 'Zuhause', example_jp: 'ドアを開けます。', example_de: 'Ich öffne die Tür.' },
  { japanese: '窓', hiragana: 'まど', romaji: 'Mado', german: 'Fenster', category: 'Zuhause', example_jp: '窓を開けます。', example_de: 'Ich öffne das Fenster.' },
  { japanese: 'アパート', hiragana: 'アパート', romaji: 'Apaato', german: 'Wohnung / Apartment', category: 'Zuhause', example_jp: 'アパートに住んでいます。', example_de: 'Ich wohne in einem Apartment.' },
  { japanese: '鉛筆', hiragana: 'えんぴつ', romaji: 'Enpitsu', german: 'Bleistift', category: 'Schule', example_jp: '鉛筆で書きます。', example_de: 'Ich schreibe mit dem Bleistift.' },
  { japanese: 'ノート', hiragana: 'ノート', romaji: 'Nooto', german: 'Heft / Notizbuch', category: 'Schule', example_jp: 'ノートに書きます。', example_de: 'Ich schreibe ins Heft.' },
  { japanese: '辞書', hiragana: 'じしょ', romaji: 'Jisho', german: 'Wörterbuch', category: 'Schule', example_jp: '辞書を使います。', example_de: 'Ich benutze ein Wörterbuch.' },
  { japanese: '財布', hiragana: 'さいふ', romaji: 'Saifu', german: 'Geldbörse / Portemonnaie', category: 'Einkaufen', example_jp: '財布を持っています。', example_de: 'Ich habe eine Geldbörse.' },
  { japanese: '試験', hiragana: 'しけん', romaji: 'Shiken', german: 'Prüfung / Test', category: 'Schule', example_jp: '試験があります。', example_de: 'Ich habe eine Prüfung.' },
  { japanese: '宿題', hiragana: 'しゅくだい', romaji: 'Shukudai', german: 'Hausaufgaben', category: 'Schule', example_jp: '宿題をします。', example_de: 'Ich mache die Hausaufgaben.' },
  { japanese: '教室', hiragana: 'きょうしつ', romaji: 'Kyoushitsu', german: 'Klassenzimmer', category: 'Schule', example_jp: '教室に入ります。', example_de: 'Ich betrete das Klassenzimmer.' },
  { japanese: '毎日', hiragana: 'まいにち', romaji: 'Mainichi', german: 'Jeden Tag / Täglich', category: 'Datum', example_jp: '毎日学校に行きます。', example_de: 'Ich gehe jeden Tag zur Schule.' },
  { japanese: '毎朝', hiragana: 'まいあさ', romaji: 'Maiasa', german: 'Jeden Morgen', category: 'Datum', example_jp: '毎朝ご飯を食べます。', example_de: 'Ich esse jeden Morgen.' },
  { japanese: '毎晩', hiragana: 'まいばん', romaji: 'Maiban', german: 'Jeden Abend', category: 'Datum', example_jp: '毎晩本を読みます。', example_de: 'Ich lese jeden Abend ein Buch.' },
  { japanese: '今朝', hiragana: 'けさ', romaji: 'Kesa', german: 'Heute Morgen', category: 'Datum', example_jp: '今朝早く起きました。', example_de: 'Heute Morgen bin ich früh aufgestanden.' },
  { japanese: '今夜', hiragana: 'こんや', romaji: 'Konya', german: 'Heute Nacht / Heute Abend', category: 'Datum', example_jp: '今夜映画を見ます。', example_de: 'Heute Abend schaue ich einen Film.' },
  { japanese: '言葉', hiragana: 'ことば', romaji: 'Kotoba', german: 'Wort / Sprache', category: 'Schule', example_jp: '新しい言葉を覚えます。', example_de: 'Ich lerne neue Wörter.' },
  { japanese: '声', hiragana: 'こえ', romaji: 'Koe', german: 'Stimme', category: 'Schule', example_jp: '声が大きいです。', example_de: 'Die Stimme ist laut.' },
  { japanese: '気持ち', hiragana: 'きもち', romaji: 'Kimochi', german: 'Gefühl / Befindlichkeit', category: 'Gefühle', example_jp: '気持ちはいいです。', example_de: 'Das Gefühl ist gut.' },
  { japanese: '意味', hiragana: 'いみ', romaji: 'Imi', german: 'Bedeutung', category: 'Schule', example_jp: 'この言葉の意味は何ですか？', example_de: 'Was bedeutet dieses Wort?' },
  { japanese: '問題', hiragana: 'もんだい', romaji: 'Mondai', german: 'Problem / Aufgabe', category: 'Schule', example_jp: '問題があります。', example_de: 'Es gibt ein Problem.' },
  { japanese: '答え', hiragana: 'こたえ', romaji: 'Kotae', german: 'Antwort', category: 'Schule', example_jp: '答えを書きます。', example_de: 'Ich schreibe die Antwort.' },
  { japanese: '質問', hiragana: 'しつもん', romaji: 'Shitsumon', german: 'Frage', category: 'Schule', example_jp: '質問があります。', example_de: 'Ich habe eine Frage.' },

  // — Fragewörter & Demonstrativa —
  { japanese: 'これ', hiragana: 'これ', romaji: 'Kore', german: 'Das hier / Dieses (nah)', category: 'Smalltalk', example_jp: 'これは何ですか？', example_de: 'Was ist das hier?' },
  { japanese: 'それ', hiragana: 'それ', romaji: 'Sore', german: 'Das da / Jenes (beim Anderen)', category: 'Smalltalk', example_jp: 'それはいくらですか？', example_de: 'Wie viel kostet das?' },
  { japanese: 'あれ', hiragana: 'あれ', romaji: 'Are', german: 'Das dort / Jenes (fern)', category: 'Smalltalk', example_jp: 'あれは何ですか？', example_de: 'Was ist das dort?' },
  { japanese: 'そこ', hiragana: 'そこ', romaji: 'Soko', german: 'Dort / Da (beim Anderen)', category: 'Wegbeschreibung', example_jp: 'そこに行きます。', example_de: 'Ich gehe dort hin.' },
  { japanese: 'あそこ', hiragana: 'あそこ', romaji: 'Asoko', german: 'Dort drüben (fern)', category: 'Wegbeschreibung', example_jp: 'あそこに店があります。', example_de: 'Dort drüben ist ein Laden.' },
  { japanese: '誰', hiragana: 'だれ', romaji: 'Dare', german: 'Wer', category: 'Kennenlernen', example_jp: 'あの人は誰ですか？', example_de: 'Wer ist diese Person?' },
  { japanese: 'いつ', hiragana: 'いつ', romaji: 'Itsu', german: 'wann', category: 'Datum', example_jp: 'いつ来ますか？', example_de: 'Wann kommen Sie?' },
  { japanese: 'なぜ', hiragana: 'なぜ', romaji: 'Naze', german: 'warum', category: 'Smalltalk', example_jp: 'なぜですか？', example_de: 'Warum?' },
  { japanese: 'どう', hiragana: 'どう', romaji: 'Dou', german: 'wie (Zustand/Meinung)', category: 'Smalltalk', example_jp: 'どうですか？', example_de: 'Wie ist es?' },
  { japanese: 'どれ', hiragana: 'どれ', romaji: 'Dore', german: 'welches (von mehreren)', category: 'Einkaufen', example_jp: 'どれがいいですか？', example_de: 'Welches ist gut?' },
  { japanese: '何', hiragana: 'なに / なん', romaji: 'Nani / Nan', german: 'was', category: 'Smalltalk', example_jp: '何を食べますか？', example_de: 'Was essen Sie?' },

  // ═══════════════════════════════════════════════════════
  // RESTAURANT: Ergänzungen
  // ═══════════════════════════════════════════════════════
  { japanese: 'おかし', hiragana: 'おかし', romaji: 'Okashi', german: 'Süßigkeiten', category: 'Restaurant', example_jp: 'おかしを食べます。', example_de: 'Ich esse Süßigkeiten.' },
  { japanese: 'お酒', hiragana: 'おさけ', romaji: 'Osake', german: 'Sake / Alkohol', category: 'Restaurant', example_jp: 'お酒を飲みます。', example_de: 'Ich trinke Sake.' },
  { japanese: 'おにぎり', hiragana: 'おにぎり', romaji: 'Onigiri', german: 'Onigiri (Reisball)', category: 'Restaurant', example_jp: 'おにぎりを食べます。', example_de: 'Ich esse Onigiri.' },
  { japanese: 'おべんとう', hiragana: 'おべんとう', romaji: 'Obentou', german: 'Bentō', category: 'Restaurant', example_jp: 'おべんとうを食べます。', example_de: 'Ich esse mein Bentō.' },
  { japanese: 'カップ', hiragana: 'カップ', romaji: 'Kappu', german: 'Tasse (cup)', category: 'Restaurant', example_jp: 'カップにコーヒーを入れます。', example_de: 'Ich gieße Kaffee in die Tasse.' },
  { japanese: 'きっさてん', hiragana: 'きっさてん', romaji: 'Kissaten', german: 'Teehaus / Café', category: 'Restaurant', example_jp: 'きっさてんに行きます。', example_de: 'Ich gehe ins Café.' },
  { japanese: 'ケーキ', hiragana: 'ケーキ', romaji: 'Keeki', german: 'Kuchen', category: 'Restaurant', example_jp: 'ケーキを食べます。', example_de: 'Ich esse Kuchen.' },
  { japanese: 'こうちゃ', hiragana: 'こうちゃ', romaji: 'Koucha', german: 'schwarzer Tee', category: 'Restaurant', example_jp: 'こうちゃを飲みます。', example_de: 'Ich trinke schwarzen Tee.' },
  { japanese: 'しょうゆ', hiragana: 'しょうゆ', romaji: 'Shouyu', german: 'Sojasoße', category: 'Restaurant', example_jp: 'しょうゆをつけます。', example_de: 'Ich tauche es in Sojasoße.' },
  { japanese: 'しょくどう', hiragana: 'しょくどう', romaji: 'Shokudou', german: 'Speisezimmer / Kantine', category: 'Restaurant', example_jp: 'しょくどうで食べます。', example_de: 'Ich esse in der Kantine.' },
  { japanese: 'ちゃわん', hiragana: 'ちゃわん', romaji: 'Chawan', german: 'Schüssel / Reisschüssel', category: 'Restaurant', example_jp: 'ちゃわんにご飯を入れます。', example_de: 'Ich gebe Reis in die Schüssel.' },
  { japanese: 'のみもの', hiragana: 'のみもの', romaji: 'Nomimono', german: 'Getränk', category: 'Restaurant', example_jp: 'のみものは何にしますか？', example_de: 'Was möchten Sie trinken?' },
  { japanese: 'バター', hiragana: 'バター', romaji: 'Bataa', german: 'Butter', category: 'Restaurant', example_jp: 'パンにバターを塗ります。', example_de: 'Ich streiche Butter aufs Brot.' },
  { japanese: 'ばんごはん', hiragana: 'ばんごはん', romaji: 'Bangohan', german: 'Abendessen', category: 'Restaurant', example_jp: 'ばんごはんを食べます。', example_de: 'Ich esse Abendessen.' },
  { japanese: 'ひるごはん', hiragana: 'ひるごはん', romaji: 'Hirugohan', german: 'Mittagessen', category: 'Restaurant', example_jp: 'ひるごはんを食べます。', example_de: 'Ich esse Mittagessen.' },
  { japanese: 'ぶたにく', hiragana: 'ぶたにく', romaji: 'Butaniku', german: 'Schweinefleisch', category: 'Restaurant', example_jp: 'ぶたにくを食べます。', example_de: 'Ich esse Schweinefleisch.' },
  { japanese: 'みず', hiragana: 'みず', romaji: 'Mizu', german: 'Wasser', category: 'Restaurant', example_jp: 'みずを飲む。', example_de: 'Ich trinke Wasser.' },
  { japanese: 'りんご', hiragana: 'りんご', romaji: 'Ringo', german: 'Apfel', category: 'Restaurant', example_jp: 'りんごを食べます。', example_de: 'Ich esse einen Apfel.' },
  { japanese: 'ナイフ', hiragana: 'ナイフ', romaji: 'Naifu', german: 'Messer', category: 'Restaurant', example_jp: 'ナイフで切ります。', example_de: 'Ich schneide mit dem Messer.' },
  { japanese: 'とりにく', hiragana: 'とりにく', romaji: 'Toriniku', german: 'Geflügelfleisch', category: 'Restaurant', example_jp: 'とりにくを食べます。', example_de: 'Ich esse Hühnerfleisch.' },
  { japanese: 'ぬるい', hiragana: 'ぬるい', romaji: 'Nurui', german: 'lauwarm', category: 'Restaurant', example_jp: 'お茶がぬるいです。', example_de: 'Der Tee ist lauwarm.' },
  { japanese: 'ゆうはん', hiragana: 'ゆうはん', romaji: 'Yuuhan', german: 'Abendessen (umgangssprachlich)', category: 'Restaurant', example_jp: 'ゆうはんを食べます。', example_de: 'Ich esse Abendessen.' },
  { japanese: 'ぎゅうにく', hiragana: 'ぎゅうにく', romaji: 'Gyuuniku', german: 'Rindfleisch', category: 'Restaurant', example_jp: 'ぎゅうにくを食べます。', example_de: 'Ich esse Rindfleisch.' },
  { japanese: 'ぎゅうにゅう', hiragana: 'ぎゅうにゅう', romaji: 'Gyuunyuu', german: 'Milch', category: 'Restaurant', example_jp: 'ぎゅうにゅうを飲みます。', example_de: 'Ich trinke Milch.' },

  // ═══════════════════════════════════════════════════════
  // KLEIDUNG: Ergänzungen
  // ═══════════════════════════════════════════════════════
  { japanese: 'ハンカチ', hiragana: 'ハンカチ', romaji: 'Hankachi', german: 'Taschentuch', category: 'Kleidung', example_jp: 'ハンカチを持ちます。', example_de: 'Ich nehme ein Taschentuch mit.' },
  { japanese: 'ふく', hiragana: 'ふく', romaji: 'Fuku', german: 'Kleidung (allgemein)', category: 'Kleidung', example_jp: 'ふくを着ます。', example_de: 'Ich ziehe Kleidung an.' },
  { japanese: 'ようふく', hiragana: 'ようふく', romaji: 'Youfuku', german: 'westliche Kleidung', category: 'Kleidung', example_jp: 'ようふくを買います。', example_de: 'Ich kaufe westliche Kleidung.' },
  { japanese: 'うわぎ', hiragana: 'うわぎ', romaji: 'Uwagi', german: 'Jacke / Sakko', category: 'Kleidung', example_jp: 'うわぎを着ます。', example_de: 'Ich ziehe eine Jacke an.' },

  // ═══════════════════════════════════════════════════════
  // KENNENLERNEN: Ergänzungen
  // ═══════════════════════════════════════════════════════
  { japanese: 'えいご', hiragana: 'えいご', romaji: 'Eigo', german: 'Englisch', category: 'Kennenlernen', example_jp: 'えいごを話します。', example_de: 'Ich spreche Englisch.' },
  { japanese: 'おとこ', hiragana: 'おとこ', romaji: 'Otoko', german: 'Mann', category: 'Kennenlernen', example_jp: 'あのおとこは父です。', example_de: 'Jener Mann ist mein Vater.' },
  { japanese: 'おんな', hiragana: 'おんな', romaji: 'Onna', german: 'Frau', category: 'Kennenlernen', example_jp: 'あのおんなは母です。', example_de: 'Jene Frau ist meine Mutter.' },
  { japanese: 'がいこく', hiragana: 'がいこく', romaji: 'Gaikoku', german: 'Ausland', category: 'Kennenlernen', example_jp: 'がいこくへ行きます。', example_de: 'Ich gehe ins Ausland.' },
  { japanese: 'がいこくじん', hiragana: 'がいこくじん', romaji: 'Gaikokujin', german: 'Ausländer', category: 'Kennenlernen', example_jp: 'がいこくじんです。', example_de: 'Ich bin Ausländer.' },
  { japanese: 'どういたしまして', hiragana: 'どういたしまして', romaji: 'Dou itashimashite', german: 'Gern geschehen / Bitte sehr', category: 'Kennenlernen', example_jp: 'どういたしまして。', example_de: 'Gern geschehen.' },
  { japanese: 'ひと', hiragana: 'ひと', romaji: 'Hito', german: 'Mensch / Person', category: 'Kennenlernen', example_jp: 'あのひとは誰ですか。', example_de: 'Wer ist diese Person?' },
  { japanese: 'りゅうがくせい', hiragana: 'りゅうがくせい', romaji: 'Ryuugakusei', german: 'Austauschstudent', category: 'Kennenlernen', example_jp: 'わたしはりゅうがくせいです。', example_de: 'Ich bin Austauschstudent.' },
  { japanese: 'いらっしゃいませ', hiragana: 'いらっしゃいませ', romaji: 'Irasshaimase', german: 'Willkommen (in Laden/Restaurant)', category: 'Kennenlernen', example_jp: 'いらっしゃいませ！', example_de: 'Herzlich willkommen!' },

  // ═══════════════════════════════════════════════════════
  // HOTEL: Ergänzungen
  // ═══════════════════════════════════════════════════════
  { japanese: 'エアコン', hiragana: 'エアコン', romaji: 'Eakon', german: 'Klimaanlage', category: 'Hotel', example_jp: 'エアコンをつけます。', example_de: 'Ich schalte die Klimaanlage ein.' },
  { japanese: 'でんき', hiragana: 'でんき', romaji: 'Denki', german: 'elektrisches Licht / Strom', category: 'Hotel', example_jp: 'でんきをつけます。', example_de: 'Ich mache das Licht an.' },
  { japanese: 'げんかん', hiragana: 'げんかん', romaji: 'Genkan', german: 'Eingangsbereich (Hausflur)', category: 'Hotel', example_jp: 'げんかんで待ちます。', example_de: 'Ich warte im Eingangsbereich.' },
  { japanese: 'せっけん', hiragana: 'せっけん', romaji: 'Sekken', german: 'Seife', category: 'Hotel', example_jp: 'せっけんで洗います。', example_de: 'Ich wasche mit Seife.' },
  { japanese: 'せんたく', hiragana: 'せんたく', romaji: 'Sentaku', german: 'Wäsche waschen', category: 'Hotel', example_jp: 'せんたくをします。', example_de: 'Ich wasche Wäsche.' },
  { japanese: 'ろうか', hiragana: 'ろうか', romaji: 'Rouka', german: 'Korridor / Flur', category: 'Hotel', example_jp: 'ろうかを歩きます。', example_de: 'Ich gehe den Flur entlang.' },

  // ═══════════════════════════════════════════════════════
  // MUSEUM: Ergänzungen
  // ═══════════════════════════════════════════════════════
  { japanese: 'え', hiragana: 'え', romaji: 'E', german: 'Bild / Gemälde', category: 'Museum', example_jp: 'きれいなえです。', example_de: 'Das ist ein schönes Gemälde.' },
  { japanese: 'きょうと', hiragana: 'きょうと', romaji: 'Kyouto', german: 'Kioto', category: 'Museum', example_jp: 'きょうとへ行きます。', example_de: 'Ich fahre nach Kyoto.' },

  // ═══════════════════════════════════════════════════════
  // DATUM: Ergänzungen
  // ═══════════════════════════════════════════════════════
  { japanese: 'カレンダー', hiragana: 'カレンダー', romaji: 'Karendaa', german: 'Kalender', category: 'Datum', example_jp: 'カレンダーを見ます。', example_de: 'Ich schaue auf den Kalender.' },
  { japanese: 'たんじょうび', hiragana: 'たんじょうび', romaji: 'Tanjoubi', german: 'Geburtstag', category: 'Datum', example_jp: 'たんじょうびはいつですか。', example_de: 'Wann ist Ihr Geburtstag?' },
  { japanese: 'まいつき', hiragana: 'まいつき', romaji: 'Maitsuki', german: 'jeden Monat', category: 'Datum', example_jp: 'まいつき来ます。', example_de: 'Ich komme jeden Monat.' },
  { japanese: 'まいとし', hiragana: 'まいとし', romaji: 'Maitoshi', german: 'jedes Jahr', category: 'Datum', example_jp: 'まいとし日本へ行きます。', example_de: 'Ich fahre jedes Jahr nach Japan.' },
  { japanese: 'まいしゅう', hiragana: 'まいしゅう', romaji: 'Maishuu', german: 'jede Woche', category: 'Datum', example_jp: 'まいしゅう勉強します。', example_de: 'Ich lerne jede Woche.' },
  { japanese: 'おととし', hiragana: 'おととし', romaji: 'Ototoshi', german: 'vorletztes Jahr', category: 'Datum', example_jp: 'おととし日本へ行きました。', example_de: 'Vorletztes Jahr fuhr ich nach Japan.' },
  { japanese: 'ゆうべ', hiragana: 'ゆうべ', romaji: 'Yuube', german: 'gestern Abend / letzte Nacht', category: 'Datum', example_jp: 'ゆうべ食べました。', example_de: 'Gestern Abend habe ich gegessen.' },

  // ═══════════════════════════════════════════════════════
  // ZEITDAUER: Ergänzungen
  // ═══════════════════════════════════════════════════════
  { japanese: 'ときどき', hiragana: 'ときどき', romaji: 'Tokidoki', german: 'manchmal', category: 'Zeitdauer', example_jp: 'ときどき映画を見ます。', example_de: 'Manchmal schaue ich Filme.' },

  // ═══════════════════════════════════════════════════════
  // WEGBESCHREIBUNG: Ergänzungen
  // ═══════════════════════════════════════════════════════
  { japanese: 'となり', hiragana: 'となり', romaji: 'Tonari', german: 'Nachbarschaft / Nebenan', category: 'Wegbeschreibung', example_jp: 'となりに店があります。', example_de: 'Nebenan gibt es ein Geschäft.' },
  { japanese: 'はし', hiragana: 'はし', romaji: 'Hashi', german: 'Brücke', category: 'Wegbeschreibung', example_jp: 'はしを渡ります。', example_de: 'Ich überquere die Brücke.' },
  { japanese: 'よこ', hiragana: 'よこ', romaji: 'Yoko', german: 'Seite / daneben', category: 'Wegbeschreibung', example_jp: 'よこに立ちます。', example_de: 'Ich stehe daneben.' },
  { japanese: 'のぼる', hiragana: 'のぼる', romaji: 'Noboru', german: 'hochsteigen / besteigen', category: 'Wegbeschreibung', example_jp: '山をのぼります。', example_de: 'Ich besteige einen Berg.' },
  { japanese: 'とまる', hiragana: 'とまる', romaji: 'Tomaru', german: 'halten / anhalten', category: 'Wegbeschreibung', example_jp: 'バスがとまります。', example_de: 'Der Bus hält.' },

  // ═══════════════════════════════════════════════════════
  // SMALLTALK: Ergänzungen
  // ═══════════════════════════════════════════════════════
  { japanese: 'ギター', hiragana: 'ギター', romaji: 'Gitaa', german: 'Gitarre', category: 'Smalltalk', example_jp: 'ギターを弾きます。', example_de: 'Ich spiele Gitarre.' },
  { japanese: 'パーティー', hiragana: 'パーティー', romaji: 'Paatii', german: 'Party', category: 'Smalltalk', example_jp: 'パーティーへ行きます。', example_de: 'Ich gehe zur Party.' },

  // ═══════════════════════════════════════════════════════
  // ARZT: Ergänzungen
  // ═══════════════════════════════════════════════════════
  { japanese: 'めがね', hiragana: 'めがね', romaji: 'Megane', german: 'Brille', category: 'Arzt', example_jp: 'めがねをかけます。', example_de: 'Ich setze die Brille auf.' },
  { japanese: 'みがく', hiragana: 'みがく', romaji: 'Migaku', german: 'putzen / polieren (Zähne putzen)', category: 'Arzt', example_jp: '歯をみがきます。', example_de: 'Ich putze die Zähne.' },

  // ═══════════════════════════════════════════════════════
  // SONSTIGES: Ergänzungen
  // ═══════════════════════════════════════════════════════
  { japanese: 'ある', hiragana: 'ある', romaji: 'Aru', german: 'haben / existieren / es gibt', category: 'Smalltalk', example_jp: '本がここにあります。', example_de: 'Das Buch ist hier.' },
  { japanese: 'いう', hiragana: 'いう', romaji: 'Iu', german: 'sagen', category: 'Smalltalk', example_jp: '名前をいいます。', example_de: 'Ich sage den Namen.' },
  { japanese: 'いえ', hiragana: 'いえ', romaji: 'Ie', german: 'Haus', category: 'Zuhause', example_jp: 'いえに帰ります。', example_de: 'Ich gehe nach Hause.' },
  { japanese: 'いっしょ', hiragana: 'いっしょ', romaji: 'Issho', german: 'zusammen / gemeinsam', category: 'Kennenlernen', example_jp: 'いっしょに行きます。', example_de: 'Wir gehen zusammen.' },
  { japanese: 'いつも', hiragana: 'いつも', romaji: 'Itsumo', german: 'immer', category: 'Zeitdauer', example_jp: 'いつも早く起きます。', example_de: 'Ich stehe immer früh auf.' },
  { japanese: 'いろ', hiragana: 'いろ', romaji: 'Iro', german: 'Farbe', category: 'Kleidung', example_jp: 'いろは何ですか。', example_de: 'Welche Farbe ist das?' },
  { japanese: 'いろいろ', hiragana: 'いろいろ', romaji: 'Iroiro', german: 'verschiedene / allerlei', category: 'Einkaufen', example_jp: 'いろいろ買います。', example_de: 'Ich kaufe allerlei.' },
  { japanese: 'うた', hiragana: 'うた', romaji: 'Uta', german: 'Lied / Song', category: 'Smalltalk', example_jp: 'うたを歌います。', example_de: 'Ich singe ein Lied.' },
  { japanese: 'うまれる', hiragana: 'うまれる', romaji: 'Umareru', german: 'geboren werden', category: 'Gefühle', example_jp: '日本でうまれました。', example_de: 'Ich wurde in Japan geboren.' },
  { japanese: 'えらぶ', hiragana: 'えらぶ', romaji: 'Erabu', german: 'auswählen / wählen', category: 'Einkaufen', example_jp: '服をえらびます。', example_de: 'Ich wähle Kleidung aus.' },
  { japanese: 'おく', hiragana: 'おく', romaji: 'Oku', german: 'hinstellen / hinlegen', category: 'Zuhause', example_jp: '本をおきます。', example_de: 'Ich lege das Buch hin.' },
  { japanese: 'おとこのこ', hiragana: 'おとこのこ', romaji: 'Otoko no ko', german: 'Junge', category: 'Familie', example_jp: 'おとこのこがいます。', example_de: 'Da ist ein Junge.' },
  { japanese: 'おんなのこ', hiragana: 'おんなのこ', romaji: 'Onna no ko', german: 'Mädchen', category: 'Familie', example_jp: 'おんなのこがいます。', example_de: 'Da ist ein Mädchen.' },
  { japanese: 'かいもの', hiragana: 'かいもの', romaji: 'Kaimono', german: 'Einkauf', category: 'Einkaufen', example_jp: 'かいものをします。', example_de: 'Ich gehe einkaufen.' },
  { japanese: 'かえす', hiragana: 'かえす', romaji: 'Kaesu', german: 'zurückgeben', category: 'Schule', example_jp: '本をかえします。', example_de: 'Ich gebe das Buch zurück.' },
  { japanese: 'かける', hiragana: 'かける', romaji: 'Kakeru', german: 'aufhängen / anrufen / telefonieren', category: 'Smalltalk', example_jp: '電話をかけます。', example_de: 'Ich rufe an.' },
  { japanese: 'カタカナ', hiragana: 'カタカナ', romaji: 'Katakana', german: 'Katakana', category: 'Schule', example_jp: 'カタカナを書きます。', example_de: 'Ich schreibe Katakana.' },
  { japanese: 'かてい', hiragana: 'かてい', romaji: 'Katei', german: 'Familie / Haushalt', category: 'Familie', example_jp: 'かていがあります。', example_de: 'Ich habe eine Familie.' },
  { japanese: 'かばん', hiragana: 'かばん', romaji: 'Kaban', german: 'Tasche / Koffer', category: 'Einkaufen', example_jp: 'かばんを買います。', example_de: 'Ich kaufe eine Tasche.' },
  { japanese: 'かみ', hiragana: 'かみ', romaji: 'Kami', german: 'Papier', category: 'Schule', example_jp: 'かみに書きます。', example_de: 'Ich schreibe auf Papier.' },
  { japanese: 'かんがえる', hiragana: 'かんがえる', romaji: 'Kangaeru', german: 'nachdenken / überlegen', category: 'Schule', example_jp: 'よくかんがえます。', example_de: 'Ich denke gut nach.' },
  { japanese: 'かんじ', hiragana: 'かんじ', romaji: 'Kanji', german: 'Kanji', category: 'Schule', example_jp: 'かんじを読みます。', example_de: 'Ich lese Kanji.' },
  { japanese: 'きって', hiragana: 'きって', romaji: 'Kitte', german: 'Briefmarke', category: 'Smalltalk', example_jp: 'きってを買います。', example_de: 'Ich kaufe eine Briefmarke.' },
  { japanese: 'こと', hiragana: 'こと', romaji: 'Koto', german: 'Ding / Sache / Angelegenheit', category: 'Smalltalk', example_jp: 'そのことを聞きます。', example_de: 'Ich frage nach der Sache.' },
  { japanese: 'こまる', hiragana: 'こまる', romaji: 'Komaru', german: 'in Schwierigkeiten sein', category: 'Gefühle', example_jp: 'とてもこまります。', example_de: 'Ich bin sehr in Schwierigkeiten.' },
  { japanese: 'こんばん', hiragana: 'こんばん', romaji: 'Konban', german: 'heute Abend', category: 'Datum', example_jp: 'こんばん食べます。', example_de: 'Heute Abend esse ich.' },
  { japanese: 'さいご', hiragana: 'さいご', romaji: 'Saigo', german: 'letzte / zuletzt', category: 'Zeitdauer', example_jp: 'さいごにします。', example_de: 'Ich mache es zuletzt.' },
  { japanese: 'さき', hiragana: 'さき', romaji: 'Saki', german: 'vorher / zuerst / Zukunft', category: 'Zeitdauer', example_jp: 'さきに行きます。', example_de: 'Ich gehe zuerst.' },
  { japanese: 'さく', hiragana: 'さく', romaji: 'Saku', german: 'blühen', category: 'Natur', example_jp: '花がさきます。', example_de: 'Die Blume blüht.' },
  { japanese: 'しかし', hiragana: 'しかし', romaji: 'Shikashi', german: 'aber / jedoch', category: 'Smalltalk', example_jp: 'しかし高いです。', example_de: 'Aber es ist teuer.' },
  { japanese: 'じかん', hiragana: 'じかん', romaji: 'Jikan', german: 'Zeit', category: 'Uhrzeit', example_jp: 'じかんがあります。', example_de: 'Ich habe Zeit.' },
  { japanese: 'じどうしゃ', hiragana: 'じどうしゃ', romaji: 'Jidousha', german: 'Auto (formal)', category: 'Bahnhof', example_jp: 'じどうしゃで行きます。', example_de: 'Ich fahre mit dem Auto.' },
  { japanese: 'じぶん', hiragana: 'じぶん', romaji: 'Jibun', german: 'selbst / ich', category: 'Kennenlernen', example_jp: 'じぶんでします。', example_de: 'Ich mache es selbst.' },
  { japanese: 'じょうぶ', hiragana: 'じょうぶ', romaji: 'Joubu', german: 'robust / strapazierfähig', category: 'Kleidung', example_jp: 'じょうぶな靴です。', example_de: 'Das sind robuste Schuhe.' },
  { japanese: 'せいと', hiragana: 'せいと', romaji: 'Seito', german: 'Schüler', category: 'Schule', example_jp: 'せいとが来ます。', example_de: 'Der Schüler kommt.' },
  { japanese: 'そちら', hiragana: 'そちら', romaji: 'Sochira', german: 'dort hin / jene Seite', category: 'Wegbeschreibung', example_jp: 'そちらへどうぞ。', example_de: 'Bitte dort entlang.' },
  { japanese: 'たいへん', hiragana: 'たいへん', romaji: 'Taihen', german: 'sehr / schwierig / schrecklich', category: 'Gefühle', example_jp: 'たいへんですね。', example_de: 'Das ist schlimm.' },
  { japanese: 'たてもの', hiragana: 'たてもの', romaji: 'Tatemono', german: 'Gebäude', category: 'Wegbeschreibung', example_jp: 'たてものの前です。', example_de: 'Es ist vor dem Gebäude.' },
  { japanese: 'たのむ', hiragana: 'たのむ', romaji: 'Tanomu', german: 'bitten / bestellen', category: 'Restaurant', example_jp: '水をたのみます。', example_de: 'Ich bestelle Wasser.' },
  { japanese: 'たべもの', hiragana: 'たべもの', romaji: 'Tabemono', german: 'Essen / Lebensmittel', category: 'Restaurant', example_jp: 'たべものが好きです。', example_de: 'Ich mag Essen.' },
  { japanese: 'ちょうど', hiragana: 'ちょうど', romaji: 'Choudo', german: 'genau / gerade', category: 'Zeitdauer', example_jp: 'ちょうど三時です。', example_de: 'Es ist genau drei Uhr.' },
  { japanese: 'つぎ', hiragana: 'つぎ', romaji: 'Tsugi', german: 'nächste / der/die Nächste', category: 'Zeitdauer', example_jp: 'つぎの駅です。', example_de: 'Das ist die nächste Station.' },
  { japanese: 'つける', hiragana: 'つける', romaji: 'Tsukeru', german: 'einschalten / anbringen', category: 'Zuhause', example_jp: '電気をつけます。', example_de: 'Ich schalte das Licht ein.' },
  { japanese: 'つまらない', hiragana: 'つまらない', romaji: 'Tsumaranai', german: 'langweilig', category: 'Gefühle', example_jp: 'つまらないです。', example_de: 'Es ist langweilig.' },
  { japanese: 'できる', hiragana: 'できる', romaji: 'Dekiru', german: 'können / fertig sein', category: 'Schule', example_jp: '日本語ができます。', example_de: 'Ich kann Japanisch.' },
  { japanese: 'でんわばんごう', hiragana: 'でんわばんごう', romaji: 'Denwa bangou', german: 'Telefonnummer', category: 'Kennenlernen', example_jp: 'でんわばんごうは何ですか。', example_de: 'Was ist Ihre Telefonnummer?' },
  { japanese: 'どうして', hiragana: 'どうして', romaji: 'Doushite', german: 'warum / weshalb', category: 'Smalltalk', example_jp: 'どうして来ませんか。', example_de: 'Warum kommen Sie nicht?' },
  { japanese: 'どうぶつ', hiragana: 'どうぶつ', romaji: 'Doubutsu', german: 'Tier', category: 'Natur', example_jp: 'どうぶつが好きです。', example_de: 'Ich mag Tiere.' },
  { japanese: 'ところ', hiragana: 'ところ', romaji: 'Tokoro', german: 'Ort / Stelle', category: 'Wegbeschreibung', example_jp: 'いいところです。', example_de: 'Das ist ein schöner Ort.' },
  { japanese: 'とる', hiragana: 'とる', romaji: 'Toru', german: 'nehmen / greifen', category: 'Einkaufen', example_jp: 'これをとります。', example_de: 'Ich nehme das hier.' },
  { japanese: 'ない', hiragana: 'ない', romaji: 'Nai', german: 'nicht existieren / kein', category: 'Smalltalk', example_jp: 'お金がないです。', example_de: 'Ich habe kein Geld.' },
  { japanese: 'なくす', hiragana: 'なくす', romaji: 'Nakusu', german: 'verlieren / verschwinden lassen', category: 'Smalltalk', example_jp: '鍵をなくします。', example_de: 'Ich verliere den Schlüssel.' },
  { japanese: 'なる', hiragana: 'なる', romaji: 'Naru', german: 'werden', category: 'Smalltalk', example_jp: '医者になります。', example_de: 'Ich werde Arzt.' },
  { japanese: 'にぎやか', hiragana: 'にぎやか', romaji: 'Nigiyaka', german: 'lebhaft / belebt', category: 'Smalltalk', example_jp: 'にぎやかな町です。', example_de: 'Das ist eine lebhafte Stadt.' },
  { japanese: 'ニュース', hiragana: 'ニュース', romaji: 'Nyuusu', german: 'Nachrichten', category: 'Smalltalk', example_jp: 'ニュースを見ます。', example_de: 'Ich schaue Nachrichten.' },
  { japanese: 'にわ', hiragana: 'にわ', romaji: 'Niwa', german: 'Garten', category: 'Zuhause', example_jp: 'にわに花があります。', example_de: 'Im Garten gibt es Blumen.' },
  { japanese: 'はがき', hiragana: 'はがき', romaji: 'Hagaki', german: 'Postkarte', category: 'Smalltalk', example_jp: 'はがきを送ります。', example_de: 'Ich schicke eine Postkarte.' },
  { japanese: 'はこ', hiragana: 'はこ', romaji: 'Hako', german: 'Kasten / Schachtel', category: 'Zuhause', example_jp: 'はこに入れます。', example_de: 'Ich lege es in die Schachtel.' },
  { japanese: 'はなし', hiragana: 'はなし', romaji: 'Hanashi', german: 'Geschichte / Gespräch', category: 'Smalltalk', example_jp: 'はなしを聞きます。', example_de: 'Ich höre das Gespräch.' },
  { japanese: 'はやい', hiragana: 'はやい', romaji: 'Hayai', german: 'früh / frühzeitig', category: 'Uhrzeit', example_jp: 'はやく起きます。', example_de: 'Ich stehe früh auf.' },
  { japanese: 'ひく', hiragana: 'ひく', romaji: 'Hiku', german: 'ziehen', category: 'Sonstiges', example_jp: 'ドアをひきます。', example_de: 'Ich ziehe die Tür auf.' },
  { japanese: 'ひくい', hiragana: 'ひくい', romaji: 'Hikui', german: 'niedrig', category: 'Wegbeschreibung', example_jp: 'ひくい山です。', example_de: 'Das ist ein niedriger Berg.' },
  { japanese: 'ひとり', hiragana: 'ひとり', romaji: 'Hitori', german: 'eine Person / allein', category: 'Kennenlernen', example_jp: 'ひとりで行きます。', example_de: 'Ich gehe allein.' },
  { japanese: 'プール', hiragana: 'プール', romaji: 'Puuru', german: 'Pool / Schwimmbad', category: 'Natur', example_jp: 'プールで泳ぎます。', example_de: 'Ich schwimme im Pool.' },
  { japanese: 'ほか', hiragana: 'ほか', romaji: 'Hoka', german: 'anderes / sonst', category: 'Smalltalk', example_jp: 'ほかにありますか。', example_de: 'Gibt es noch etwas anderes?' },
  { japanese: 'ぼく', hiragana: 'ぼく', romaji: 'Boku', german: 'ich (männlich, informell)', category: 'Kennenlernen', example_jp: 'ぼくは学生です。', example_de: 'Ich bin Student.' },
  { japanese: 'ほしい', hiragana: 'ほしい', romaji: 'Hoshii', german: 'wünschen / wollen', category: 'Gefühle', example_jp: 'ほしいです。', example_de: 'Ich möchte das haben.' },
  { japanese: 'ポスト', hiragana: 'ポスト', romaji: 'Posuto', german: 'Briefkasten', category: 'Wegbeschreibung', example_jp: 'ポストに入れます。', example_de: 'Ich werfe es in den Briefkasten.' },
  { japanese: 'ほんだな', hiragana: 'ほんだな', romaji: 'Hondana', german: 'Bücherregal', category: 'Zuhause', example_jp: 'ほんだなに本があります。', example_de: 'Im Regal gibt es Bücher.' },
  { japanese: 'ほんとう', hiragana: 'ほんとう', romaji: 'Hontou', german: 'wirklich / wahr', category: 'Smalltalk', example_jp: 'ほんとうですか。', example_de: 'Wirklich?' },
  { japanese: 'また', hiragana: 'また', romaji: 'Mata', german: 'wieder / auch', category: 'Smalltalk', example_jp: 'またきます。', example_de: 'Ich komme wieder.' },
  { japanese: 'まるい', hiragana: 'まるい', romaji: 'Marui', german: 'rund', category: 'Sonstiges', example_jp: 'まるいボールです。', example_de: 'Das ist ein runder Ball.' },
  { japanese: 'みなさん', hiragana: 'みなさん', romaji: 'Minasan', german: 'meine Damen und Herren / alle', category: 'Kennenlernen', example_jp: 'みなさんこんにちは。', example_de: 'Guten Tag, alle zusammen.' },
  { japanese: 'もの', hiragana: 'もの', romaji: 'Mono', german: 'Ding / Sache', category: 'Smalltalk', example_jp: 'このものは何ですか。', example_de: 'Was ist dieses Ding?' },
  { japanese: 'よく', hiragana: 'よく', romaji: 'Yoku', german: 'oft / gut / gründlich', category: 'Smalltalk', example_jp: 'よく来ます。', example_de: 'Ich komme oft.' },
  { japanese: 'よぶ', hiragana: 'よぶ', romaji: 'Yobu', german: 'rufen / einladen', category: 'Smalltalk', example_jp: '友達をよびます。', example_de: 'Ich lade einen Freund ein.' },
  { japanese: 'ラジオ', hiragana: 'ラジオ', romaji: 'Rajio', german: 'Radio', category: 'Smalltalk', example_jp: 'ラジオを聞きます。', example_de: 'Ich höre Radio.' },
  { japanese: 'りっぱ', hiragana: 'りっぱ', romaji: 'Rippa', german: 'herrlich / prächtig', category: 'Smalltalk', example_jp: 'りっぱな建物です。', example_de: 'Das ist ein prächtiges Gebäude.' },
  { japanese: 'れいぞうこ', hiragana: 'れいぞうこ', romaji: 'Reizouko', german: 'Kühlschrank', category: 'Zuhause', example_jp: 'れいぞうこに入れます。', example_de: 'Ich lege es in den Kühlschrank.' },
  { japanese: 'れんしゅうする', hiragana: 'れんしゅうする', romaji: 'Renshuu suru', german: 'üben', category: 'Schule', example_jp: '毎日れんしゅうします。', example_de: 'Ich übe jeden Tag.' },
  { japanese: 'わたし', hiragana: 'わたし', romaji: 'Watashi', german: 'ich', category: 'Kennenlernen', example_jp: 'わたしは田中です。', example_de: 'Ich bin Tanaka.' },
  { japanese: 'わたす', hiragana: 'わたす', romaji: 'Watasu', german: 'übergeben / überreichen', category: 'Smalltalk', example_jp: '手紙をわたします。', example_de: 'Ich übergebe den Brief.' },
  { japanese: 'する', hiragana: 'する', romaji: 'Suru', german: 'machen / tun', category: 'Smalltalk', example_jp: '勉強をします。', example_de: 'Ich lerne.' },
  { japanese: 'いる', hiragana: 'いる', romaji: 'Iru', german: 'sein / vorhanden sein (belebte Wesen)', category: 'Smalltalk', example_jp: '猫がいます。', example_de: 'Da ist eine Katze.' },
  { japanese: 'ええ', hiragana: 'ええ', romaji: 'Ee', german: 'ja (informell)', category: 'Smalltalk', example_jp: 'ええ、そうです。', example_de: 'Ja, das stimmt.' },
  { japanese: 'おす', hiragana: 'おす', romaji: 'Osu', german: 'drücken', category: 'Zuhause', example_jp: 'ボタンをおします。', example_de: 'Ich drücke den Knopf.' },
  { japanese: 'こうばん', hiragana: 'こうばん', romaji: 'Kouban', german: 'Polizeiwache', category: 'Wegbeschreibung', example_jp: 'こうばんはどこですか。', example_de: 'Wo ist die Polizeiwache?' },
  { japanese: 'そうじ', hiragana: 'そうじ', romaji: 'Souji', german: 'Saubermachen / Putzen', category: 'Zuhause', example_jp: 'そうじをします。', example_de: 'Ich putze.' },
  { japanese: 'たぶん', hiragana: 'たぶん', romaji: 'Tabun', german: 'vielleicht / wahrscheinlich', category: 'Smalltalk', example_jp: 'たぶん来ます。', example_de: 'Er kommt wahrscheinlich.' },
  { japanese: 'だんだん', hiragana: 'だんだん', romaji: 'Dandan', german: 'nach und nach / allmählich', category: 'Zeitdauer', example_jp: 'だんだん上手になります。', example_de: 'Ich werde allmählich besser.' },
  { japanese: 'なつやすみ', hiragana: 'なつやすみ', romaji: 'Natsuyasumi', german: 'Sommerferien', category: 'Natur', example_jp: 'なつやすみに行きます。', example_de: 'Ich fahre in den Sommerferien.' },

  // ═══════════════════════════════════════════════════════
  // SONSTIGES
  // ═══════════════════════════════════════════════════════
  { japanese: 'はい', hiragana: 'はい', romaji: 'Hai', german: 'ja', category: 'Smalltalk', example_jp: 'はい、そうです。', example_de: 'Ja, das stimmt.' },
  { japanese: 'いいえ', hiragana: 'いいえ', romaji: 'Iie', german: 'nein', category: 'Smalltalk', example_jp: 'いいえ、ちがいます。', example_de: 'Nein, das ist falsch.' },
  { japanese: 'ちょっと', hiragana: 'ちょっと', romaji: 'Chotto', german: 'ein bisschen / kurz', category: 'Smalltalk', example_jp: 'ちょっと待ってください。', example_de: 'Warten Sie bitte einen Moment.' },
  { japanese: 'とても', hiragana: 'とても', romaji: 'Totemo', german: 'sehr', category: 'Smalltalk', example_jp: 'とても好きです。', example_de: 'Ich mag es sehr.' },
  { japanese: 'もう少し', hiragana: 'もうすこし', romaji: 'Mou sukoshi', german: 'noch etwas / ein bisschen mehr', category: 'Smalltalk', example_jp: 'もう少し待ちます。', example_de: 'Ich warte noch etwas.' },
  { japanese: 'たくさん', hiragana: 'たくさん', romaji: 'Takusan', german: 'viel / viele', category: 'Smalltalk', example_jp: 'たくさん食べます。', example_de: 'Ich esse viel.' },
  { japanese: 'あまり〜ない', hiragana: 'あまりない', romaji: 'Amari ~nai', german: 'nicht sehr ~ / kaum ~', category: 'Smalltalk', example_jp: 'あまり好きじゃない。', example_de: 'Ich mag es nicht sehr.' },
  { japanese: '全部', hiragana: 'ぜんぶ', romaji: 'Zenbu', german: 'alles / insgesamt', category: 'Smalltalk', example_jp: '全部食べました。', example_de: 'Ich habe alles gegessen.' },
  { japanese: 'だけ', hiragana: 'だけ', romaji: 'Dake', german: 'nur / lediglich', category: 'Smalltalk', example_jp: '一つだけください。', example_de: 'Bitte nur eines.' },
  { japanese: 'でも', hiragana: 'でも', romaji: 'Demo', german: 'aber / jedoch', category: 'Smalltalk', example_jp: 'でも高いです。', example_de: 'Aber es ist teuer.' },
  { japanese: 'だから', hiragana: 'だから', romaji: 'Dakara', german: 'deshalb / daher', category: 'Smalltalk', example_jp: 'だから行きません。', example_de: 'Deshalb gehe ich nicht.' },
  { japanese: 'そして', hiragana: 'そして', romaji: 'Soshite', german: 'und dann / außerdem', category: 'Smalltalk', example_jp: 'そして帰ります。', example_de: 'Und dann gehe ich nach Hause.' },
  { japanese: 'または', hiragana: 'または', romaji: 'Mata wa', german: 'oder', category: 'Smalltalk', example_jp: 'コーヒーまたはお茶。', example_de: 'Kaffee oder Tee.' },
  { japanese: '犬', hiragana: 'いぬ', romaji: 'Inu', german: 'Hund', category: 'Natur', example_jp: '犬がいます。', example_de: 'Da ist ein Hund.' },
  { japanese: '猫', hiragana: 'ねこ', romaji: 'Neko', german: 'Katze', category: 'Natur', example_jp: '猫が好きです。', example_de: 'Ich mag Katzen.' },
  { japanese: '鳥', hiragana: 'とり', romaji: 'Tori', german: 'Vogel', category: 'Natur', example_jp: '鳥が飛びます。', example_de: 'Der Vogel fliegt.' },
  { japanese: '魚', hiragana: 'さかな', romaji: 'Sakana', german: 'Fisch', category: 'Natur', example_jp: '魚を食べます。', example_de: 'Ich esse Fisch.' },
  { japanese: '山', hiragana: 'やま', romaji: 'Yama', german: 'Berg', category: 'Natur', example_jp: '山へ行きます。', example_de: 'Ich gehe in die Berge.' },
  { japanese: '川', hiragana: 'かわ', romaji: 'Kawa', german: 'Fluss', category: 'Natur', example_jp: '川で泳ぎます。', example_de: 'Ich schwimme im Fluss.' },
  { japanese: '海', hiragana: 'うみ', romaji: 'Umi', german: 'Meer', category: 'Natur', example_jp: '海が好きです。', example_de: 'Ich mag das Meer.' },
  { japanese: '花', hiragana: 'はな', romaji: 'Hana', german: 'Blume', category: 'Natur', example_jp: '花がきれいです。', example_de: 'Die Blume ist schön.' },
  { japanese: '木', hiragana: 'き', romaji: 'Ki', german: 'Baum', category: 'Natur', example_jp: '木があります。', example_de: 'Da ist ein Baum.' },
  { japanese: '学校', hiragana: 'がっこう', romaji: 'Gakkou', german: 'Schule', category: 'Schule', example_jp: '学校へ行きます。', example_de: 'Ich gehe zur Schule.' },
  { japanese: '図書館', hiragana: 'としょかん', romaji: 'Toshokan', german: 'Bibliothek', category: 'Schule', example_jp: '図書館で読みます。', example_de: 'Ich lese in der Bibliothek.' },
  { japanese: '公園', hiragana: 'こうえん', romaji: 'Kouen', german: 'Park', category: 'Natur', example_jp: '公園を歩きます。', example_de: 'Ich spaziere im Park.' },
  { japanese: '会社', hiragana: 'かいしゃ', romaji: 'Kaisha', german: 'Firma / Unternehmen', category: 'Kennenlernen', example_jp: '会社へ行きます。', example_de: 'Ich gehe zur Arbeit.' },
  { japanese: '本', hiragana: 'ほん', romaji: 'Hon', german: 'Buch', category: 'Schule', example_jp: '本を読みます。', example_de: 'Ich lese ein Buch.' },
  { japanese: 'ペン', hiragana: 'ペン', romaji: 'Pen', german: 'Stift', category: 'Schule', example_jp: 'ペンで書きます。', example_de: 'Ich schreibe mit dem Stift.' },
  { japanese: 'スマホ', hiragana: 'スマホ', romaji: 'Sumaho', german: 'Smartphone', category: 'Zuhause', example_jp: 'スマホを使います。', example_de: 'Ich benutze das Smartphone.' },
  { japanese: 'パソコン', hiragana: 'パソコン', romaji: 'Pasokon', german: 'Computer', category: 'Zuhause', example_jp: 'パソコンで仕事します。', example_de: 'Ich arbeite am Computer.' },
  { japanese: 'わかりました。ありがとうございます。', hiragana: 'わかりました。ありがとうございます。', romaji: 'Wakarimashita. Arigatou gozaimasu.', german: 'Verstanden. Vielen Dank.', category: 'Smalltalk', example_jp: 'わかりました。ありがとうございます。', example_de: 'Verstanden. Vielen Dank.' },
  { japanese: 'もう一度言ってください。', hiragana: 'もういちどいってください。', romaji: 'Mou ichido itte kudasai.', german: 'Sagen Sie das bitte noch einmal.', category: 'Smalltalk', example_jp: 'もう一度言ってください。', example_de: 'Sagen Sie das bitte noch einmal.' },
  { japanese: 'ゆっくり話してください。', hiragana: 'ゆっくりはなしてください。', romaji: 'Yukkuri hanashite kudasai.', german: 'Bitte sprechen Sie langsamer.', category: 'Smalltalk', example_jp: 'ゆっくり話してください。', example_de: 'Bitte sprechen Sie langsamer.' },
];

export async function seed(): Promise<void> {
  await initDb();

  // V2 migration: old category structure detected → truncate and re-seed
  // Only checks categories that NO LONGER EXIST in the new structure
  const hasLegacy = await db.execute(
    "SELECT COUNT(*) as c FROM vocabulary WHERE category IN ('Begrüßung','Essen','Getränke','Körper','Orte','Verkehr','Tiere','Farben','Adjektive','Verben','Grundwörter','Wohnung','Gesundheit','Kanji','Monate','Zeit')"
  );
  if (Number(hasLegacy.rows[0]?.c ?? 0) > 0) {
    await db.execute('DELETE FROM progress');
    await db.execute('DELETE FROM vocabulary');
    console.log('🌸 V2: Alte Kategorien erkannt — lade neue Kategorienstruktur...');
  }

  // V3 migration: reorganized Sonstiges into proper categories (Schule, Zuhause, Natur, …)
  const hasV2Sonstiges = await db.execute(
    "SELECT COUNT(*) as c FROM vocabulary WHERE category = 'Sonstiges' AND japanese = '学校'"
  );
  if (Number(hasV2Sonstiges.rows[0]?.c ?? 0) > 0) {
    await db.execute('DELETE FROM progress');
    await db.execute('DELETE FROM vocabulary');
    console.log('🌸 V3: Kategorien neu geordnet — lade aktualisierte Struktur...');
  }

  // V4 migration: KERNVERBEN/KERNADJEKTIVE properly categorized (行く→Wegbeschreibung, etc.)
  const hasV3Sonstiges = await db.execute(
    "SELECT COUNT(*) as c FROM vocabulary WHERE category = 'Sonstiges' AND japanese = '行く'"
  );
  if (Number(hasV3Sonstiges.rows[0]?.c ?? 0) > 0) {
    await db.execute('DELETE FROM progress');
    await db.execute('DELETE FROM vocabulary');
    console.log('🌸 V4: Kernverben und Kernadjektive neu kategorisiert...');
  }

  // V5 migration: German translations corrected (only nouns capitalized)
  const hasOldGerman = await db.execute(
    "SELECT COUNT(*) as c FROM vocabulary WHERE japanese = '行く' AND german = 'Gehen'"
  );
  if (Number(hasOldGerman.rows[0]?.c ?? 0) > 0) {
    await db.execute('DELETE FROM progress');
    await db.execute('DELETE FROM vocabulary');
    console.log('🌸 V5: Deutsche Übersetzungen korrigiert (nur Substantive groß)...');
  }

  // Incremental insert — skip if (japanese, category) already exists
  let added = 0;
  for (const entry of vocabulary) {
    const exists = await db.execute({
      sql: 'SELECT id FROM vocabulary WHERE japanese = ? AND category = ?',
      args: [entry.japanese, entry.category],
    });
    if (exists.rows.length === 0) {
      const result = await db.execute({
        sql: `INSERT INTO vocabulary (japanese, hiragana, romaji, german, category, example_jp, example_de) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        args: [entry.japanese, entry.hiragana, entry.romaji, entry.german, entry.category, entry.example_jp ?? null, entry.example_de ?? null],
      });
      await db.execute({
        sql: `INSERT OR IGNORE INTO progress (vocabulary_id, score, review_count, next_review) VALUES (?, 0, 0, datetime('now'))`,
        args: [result.lastInsertRowid ?? 0],
      });
      added++;
    } else if (entry.example_jp) {
      // Update sentences for existing entries without wiping progress
      await db.execute({
        sql: `UPDATE vocabulary SET example_jp = ?, example_de = ? WHERE japanese = ? AND category = ? AND example_jp IS NULL`,
        args: [entry.example_jp, entry.example_de ?? null, entry.japanese, entry.category],
      });
    }
  }

  const total = (await db.execute('SELECT COUNT(*) as c FROM vocabulary')).rows[0]?.c;
  console.log(`🌸 ${added} neue Einträge hinzugefügt. Gesamt: ${total}.`);
}
